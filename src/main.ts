import "./style.css";
import pitch from "./assets/pitch.svg?raw";
import { createStarter, type Starter } from "./player";
import { createBench } from "./bench";
import { players } from "./team";

const starters: Starter[] = [
  { playerId: players[0].id, x: 50, y: 91 },
  { playerId: players[1].id, x: 17, y: 75 },
  { playerId: players[2].id, x: 39, y: 75 },
  { playerId: players[3].id, x: 61, y: 75 },
  { playerId: players[4].id, x: 83, y: 75 },
  { playerId: players[5].id, x: 27, y: 50 },
  { playerId: players[6].id, x: 50, y: 50 },
  { playerId: players[7].id, x: 73, y: 50 },
  { playerId: players[8].id, x: 27, y: 20 },
  { playerId: players[9].id, x: 50, y: 20 },
  { playerId: players[10].id, x: 73, y: 20 },
];

const substituteIds = [players[11].id, players[12].id];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="lineup">
    <div class="pitch">
      ${pitch}
    </div>
  </main>
`;

const pitchEl = document.querySelector<HTMLDivElement>(".pitch")!;
starters.forEach((starter) => {
  const playerEl = createStarter(starter, pitchEl);
  if (!playerEl) return;
  pitchEl.appendChild(playerEl);
});

const benchEl = createBench(substituteIds);
if (benchEl) {
  document.querySelector<HTMLElement>(".lineup")!.appendChild(benchEl);
}
