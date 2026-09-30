export type Player = { number: number; x: number; y: number; name: string };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function createPlayerElement(player: Player) {
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

export function createPlayer(player: Player, parentEl: HTMLDivElement) {
  const playerEl = createPlayerElement(player);
  playerEl.style.left = `${player.x}%`;
  playerEl.style.top = `${player.y}%`;

  playerEl.addEventListener("pointerdown", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest(".player-change, .player-name-input")
    ) {
      return;
    }

    console.log("Pointer down");
    playerEl.setPointerCapture(event.pointerId);
  });

  playerEl.addEventListener("pointermove", (event) => {
    if (!playerEl.hasPointerCapture(event.pointerId)) return;

    const pitchRect = parentEl.getBoundingClientRect();
    const playerRect = playerEl.getBoundingClientRect();

    const playersOffsetX = 0.5 * playerRect.width;
    const playersOffsetY = 0.5 * playerRect.height;

    const x = event.clientX - pitchRect.left - playersOffsetX;
    const y = event.clientY - pitchRect.top - playersOffsetY;
    const clampedX = clamp(x, playersOffsetX, pitchRect.width - playersOffsetX);
    const clampedY = clamp(
      y,
      playersOffsetY,
      pitchRect.height - playersOffsetY,
    );
    playerEl.style.left = `${clampedX}px`;
    playerEl.style.top = `${clampedY}px`;

    console.log(`Moving player to (${x}, ${y})`);
  });

  playerEl.addEventListener("lostpointercapture", () => {
    console.log("Pointer capture lost");
  });

  const playerChangeEl =
    playerEl.querySelector<HTMLButtonElement>(".player-change")!;

  playerChangeEl.addEventListener("click", () => {
    console.log("Changing player name");

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
