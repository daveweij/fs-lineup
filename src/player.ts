import { playersById, type PlayerId } from "./team";

export type Starter = { playerId: PlayerId; x: number; y: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function createPlayerElement(playerId: PlayerId) {
  const player = playersById.get(playerId);
  if (!player) return null;

  const playerEl = document.createElement("div");
  playerEl.classList.add("player");

  playerEl.innerHTML = `
  <span class="player-avatar">${player.number}</span>
  <span class="player-name-field">
    <span class="player-name"></span>
    <button class="player-change" aria-label="Change player name" type="button">🔄</button>
  </span>
  `;

  const playerNameEl = playerEl.querySelector<HTMLSpanElement>(".player-name")!;
  playerNameEl.textContent = player.name;
  return playerEl;
}

export function createStarter(starter: Starter, pitchEl: HTMLDivElement) {
  const playerEl = createPlayerElement(starter.playerId);
  if (!playerEl) return null;

  playerEl.style.left = `${starter.x}%`;
  playerEl.style.top = `${starter.y}%`;

  playerEl.addEventListener("pointerdown", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest(".player-change, .player-name-input")
    ) {
      return;
    }

    playerEl.setPointerCapture(event.pointerId);
  });

  playerEl.addEventListener("pointermove", (event) => {
    if (!playerEl.hasPointerCapture(event.pointerId)) return;

    const pitchRect = pitchEl.getBoundingClientRect();
    const playerRect = playerEl.getBoundingClientRect();

    const x = event.clientX - pitchRect.left;
    const y = event.clientY - pitchRect.top;
    const clampedX = clamp(
      x,
      0.5 * playerRect.width,
      pitchRect.width - 0.5 * playerRect.width,
    );
    const clampedY = clamp(
      y,
      0.5 * playerRect.height,
      pitchRect.height - 0.5 * playerRect.height,
    );
    playerEl.style.left = `${clampedX}px`;
    playerEl.style.top = `${clampedY}px`;
  });

  const playerChangeEl =
    playerEl.querySelector<HTMLButtonElement>(".player-change")!;

  playerChangeEl.addEventListener("click", () => {
    const nameEl = playerEl.querySelector<HTMLSpanElement>(".player-name");
    if (!nameEl) return;

    const originalPlayerName = nameEl.textContent || "";

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = nameEl.textContent || "";
    inputEl.classList.add("player-name-input");
    nameEl.replaceWith(inputEl);
    inputEl.focus();

    inputEl.addEventListener("blur", () => {
      const newName =
        inputEl.value.trim() !== "" ? inputEl.value.trim() : originalPlayerName;

      const player = playersById.get(starter.playerId);
      if (!player) return;

      player.name = newName;

      nameEl.textContent = player.name;
      inputEl.replaceWith(nameEl);
    });

    inputEl.addEventListener("keydown", (event) => {
      if (event.isComposing) return;
      if (event.key === "Enter") {
        event.preventDefault();
        inputEl.blur();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        inputEl.value = originalPlayerName;
        inputEl.blur();
      }
    });
  });

  return playerEl;
}
