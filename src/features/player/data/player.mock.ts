import type { Player, RankingEntry } from "../types/player";

export const mockCurrentPlayer: Player = {
  id: "player-current",
  name: "Aventureiro",
  level: 3,
  xp: 240,
  nextLevelXp: 400,
  streak: 5,
  completedExercises: 12,
};

export const mockRankingPlayers: readonly RankingEntry[] = [
  {
    id: "player-001",
    name: "Mestre do Código",
    xp: 1850,
  },
  {
    id: "player-002",
    name: "Programador Sombrio",
    xp: 1420,
  },
  {
    id: "player-004",
    name: "Aprendiz Arcano",
    xp: 180,
  },
  {
    id: "player-005",
    name: "Guardião da Lógica",
    xp: 120,
  },
];