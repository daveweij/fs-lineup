export type PlayerId = string;
export type Player = { number: number; name: string; id: PlayerId };

const createPlayer = (number: number, name: string): Player => ({
  number,
  name,
  id: name + number,
});

export const players: Player[] = [
  createPlayer(1, "Oliver"),
  createPlayer(2, "Freya"),
  createPlayer(3, "Arthur"),
  createPlayer(4, "Grace"),
  createPlayer(5, "Leo"),
  createPlayer(6, "Poppy"),
  createPlayer(7, "Ethan"),
  createPlayer(8, "Ruby"),
  createPlayer(9, "Theo"),
  createPlayer(10, "Evie"),
  createPlayer(11, "Alfie"),
  createPlayer(12, "Ivy"),
  createPlayer(13, "Noah"),
  createPlayer(14, "Maya"),
  createPlayer(15, "Finn"),
];

export const playersById: Map<PlayerId, Player> = new Map(
  players.map((player) => [player.id, player]),
);
