import "./style.css";
import pitch from "./assets/pitch.svg?raw";
import { createPlayer } from "./player";

const players = [
  { number: 1, x: 45, y: 80, name: "Dave" },
  { number: 9, x: 30, y: 40, name: "Player 9" },
  { number: 10, x: 60, y: 40, name: "Player 10" },
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
