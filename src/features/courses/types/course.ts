export type CourseDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

export type CourseStatus =
  | "available"
  | "in_progress"
  | "completed"
  | "locked";

export type LessonStatus =
  | "available"
  | "in_progress"
  | "completed"
  | "locked";

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: CourseDifficulty;
  progress: number;
  status: CourseStatus;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  status: LessonStatus;
  estimatedMinutes: number;
  xpReward: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseCurriculum {
  courseId: string;
  chapters: Chapter[];
}