import { mockCurriculums } from "../data/curriculum.mock";

import type {
  Chapter,
  CourseCurriculum,
  Lesson,
} from "../types/course";

export interface LessonDetails {
  chapter: Chapter;
  lesson: Lesson;
}

export function getCurriculumByCourseId(
  courseId: string
): CourseCurriculum | undefined {
  const curriculum = mockCurriculums.find(
    (item) => item.courseId === courseId
  );

  if (!curriculum) {
    return undefined;
  }

  return {
    ...curriculum,
    chapters: curriculum.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
      })),
    })),
  };
}

export function getLessonById(
  courseId: string,
  lessonId: string
): LessonDetails | undefined {
  const curriculum = getCurriculumByCourseId(courseId);

  if (!curriculum) {
    return undefined;
  }

  for (const chapter of curriculum.chapters) {
    const lesson = chapter.lessons.find(
      (item) => item.id === lessonId
    );

    if (lesson) {
      return {
        chapter,
        lesson,
      };
    }
  }

  return undefined;
}