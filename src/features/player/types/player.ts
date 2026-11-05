export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  completedExercises: number;
}

export interface RankingEntry {
  id: string;
  name: string;
  xp: number;
}

export interface RankedPlayer extends RankingEntry {
  position: number;
}