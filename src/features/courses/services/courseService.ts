import { mockCourses } from "../data/courses.mock";

import type { Course } from "../types/course";

export function getCourses(): Course[] {
  return mockCourses.map((course) => ({
    ...course,
  }));
}

export function getCourseById(id: string): Course | undefined {
  const course = mockCourses.find((item) => item.id === id);

  return course ? { ...course } : undefined;
}