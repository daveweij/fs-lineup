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
      event.target.closest(".player-change, .player-picker")
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
    const selectionEl = document.createElement("select");
    selectionEl.classList.add("player-picker");
    playersById.forEach((player) => {
      const optionEl = document.createElement("option");
      optionEl.value = player.id;
      optionEl.textContent = player.name;
      if (player.id === starter.playerId) {
        optionEl.selected = true;
      }
      selectionEl.appendChild(optionEl);
    });

    const playerNameEl =
      playerEl.querySelector<HTMLSpanElement>(".player-name-field")!;
    playerNameEl.replaceWith(selectionEl);

    selectionEl.focus();
    selectionEl.showPicker();
    selectionEl.addEventListener("change", () => selectionEl.blur());

    selectionEl.addEventListener("blur", () => {
      const newPlayerId = selectionEl.value;
      const newPlayer = playersById.get(newPlayerId);
      if (!newPlayer) return;

      starter.playerId = newPlayer.id;
      const newPlayerEl = createStarter(starter, pitchEl);
      if (!newPlayerEl) return;

      newPlayerEl.style.left = playerEl.style.left;
      newPlayerEl.style.top = playerEl.style.top;
      playerEl.replaceWith(newPlayerEl);
    });
  });

  return playerEl;
}
