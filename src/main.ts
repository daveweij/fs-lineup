import "./style.css";
import pitch from "./assets/pitch.svg?raw";
import { createPlayer } from "./player";

const players = [
  { number: 1, x: 45, y: 86, name: "Oliver" },
  { number: 2, x: 10, y: 70, name: "Harry" },
  { number: 3, x: 32, y: 70, name: "Jack" },
  { number: 4, x: 54, y: 70, name: "George" },
  { number: 5, x: 76, y: 70, name: "Charlie" },
  { number: 6, x: 20, y: 45, name: "Thomas" },
  { number: 7, x: 43, y: 45, name: "Oscar" },
  { number: 8, x: 66, y: 45, name: "Amelia" },
  { number: 9, x: 20, y: 20, name: "Isla" },
  { number: 10, x: 43, y: 20, name: "Lily" },
  { number: 11, x: 66, y: 20, name: "James" },
];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="pitch">
    ${pitch}
  </main>
`;

const pitchEl = document.querySelector<HTMLDivElement>(".pitch")!;
players.forEach((player) => {
  const playerEl = createPlayer(player, pitchEl);
  pitchEl.appendChild(playerEl);
});
