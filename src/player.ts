type Player = { number: number; x: number; y: number; name: string };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function createPlayer(player: Player, parentEl: HTMLDivElement) {
  const playerEl = document.createElement("div");
  playerEl.classList.add("player");
  playerEl.style.left = `${player.x}%`;
  playerEl.style.top = `${player.y}%`;

  playerEl.innerHTML = `
  <span class="player-avatar">${player.number}</span>
  <span class="player-name">${player.name}</span>
  `;

  playerEl.addEventListener("pointerdown", (event) => {
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
    const clampedX = clamp(x, 0, pitchRect.width - playerRect.width);
    const clampedY = clamp(y, 0, pitchRect.height - playerRect.height);
    playerEl.style.left = `${clampedX}px`;
    playerEl.style.top = `${clampedY}px`;

    console.log(`Moving player to (${x}, ${y})`);
  });

  playerEl.addEventListener("lostpointercapture", () => {
    console.log("Pointer capture lost");
  });

  return playerEl;
}
