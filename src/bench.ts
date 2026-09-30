import { createPlayerElement, type Player } from "./player";

function createBench(substitutes: Player[]) {
  if (substitutes.length === 0) return null;

  const benchEl = document.createElement("section");
  benchEl.classList.add("bench");

  substitutes.forEach((player) => {
    const playerEl = createPlayerElement(player);
    benchEl.appendChild(playerEl);
  });

  return benchEl;
}

export { createBench };
