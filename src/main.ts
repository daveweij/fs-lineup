import "./style.css";
import pitch from "./assets/pitch.svg?raw";
import { createPlayer } from "./player";
import { createBench } from "./bench";

const starters = [
  { number: 1, x: 50, y: 91, name: "Oliver" },
  { number: 2, x: 17, y: 75, name: "Harry" },
  { number: 3, x: 39, y: 75, name: "Jack" },
  { number: 4, x: 61, y: 75, name: "George" },
  { number: 5, x: 83, y: 75, name: "Charlie" },
  { number: 6, x: 27, y: 50, name: "Thomas" },
  { number: 7, x: 50, y: 50, name: "Oscar" },
  { number: 8, x: 73, y: 50, name: "Amelia" },
  { number: 9, x: 27, y: 20, name: "Isla" },
  { number: 10, x: 50, y: 20, name: "Lily" },
  { number: 11, x: 73, y: 20, name: "James" },
];

const substitutes = [
  { number: 12, x: 10, y: 50, name: "Mia" },
  { number: 13, x: 90, y: 50, name: "Ella" },
];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="lineup">
    <div class="pitch">
      ${pitch}
    </div>
  </main>
`;

const pitchEl = document.querySelector<HTMLDivElement>(".pitch")!;
starters.forEach((player) => {
  const playerEl = createPlayer(player, pitchEl);
  pitchEl.appendChild(playerEl);
});

const benchEl = createBench(substitutes);
if (benchEl) {
  document.querySelector<HTMLElement>(".lineup")!.appendChild(benchEl);
}
