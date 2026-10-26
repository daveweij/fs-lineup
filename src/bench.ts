import { createPlayerElement } from "./player";
import type { PlayerId } from "./team";

function createBench(substituteIds: PlayerId[]) {
  if (substituteIds.length === 0) return null;

  const benchEl = document.createElement("section");
  benchEl.classList.add("bench");

  substituteIds.forEach((playerId) => {
    const playerEl = createPlayerElement(playerId);
    if (!playerEl) return;

    benchEl.appendChild(playerEl);
  });

  return benchEl;
}

export { createBench };
