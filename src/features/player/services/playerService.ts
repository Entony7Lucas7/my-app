import {
    mockCurrentPlayer,
    mockRankingPlayers,
} from "../data/player.mock";

import type {
    Player,
    RankedPlayer,
} from "../types/player";

export function getCurrentPlayer(): Player {
  return { ...mockCurrentPlayer };
}

export function getRanking(): RankedPlayer[] {
  const currentPlayer = getCurrentPlayer();

  const rankingEntries = [
    ...mockRankingPlayers,
    {
      id: currentPlayer.id,
      name: currentPlayer.name,
      xp: currentPlayer.xp,
    },
  ];

  return rankingEntries
    .sort((a, b) => b.xp - a.xp)
    .map((player, index) => ({
      ...player,
      position: index + 1,
    }));
}