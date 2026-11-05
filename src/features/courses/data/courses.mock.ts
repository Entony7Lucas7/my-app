import type { Course } from "../types/course";

export const mockCourses: readonly Course[] = [
  {
    id: "python-fundamentals",
    title: "Fundamentos de Python",
    description: "Aprenda variáveis, condições, repetições e funções.",
    difficulty: "beginner",
    progress: 50,
    status: "in_progress",
  },
  {
    id: "programming-logic",
    title: "Lógica de Programação",
    description: "Desenvolva seu raciocínio e resolva problemas.",
    difficulty: "beginner",
    progress: 0,
    status: "available",
  },
  {
    id: "data-structures",
    title: "Estruturas de Dados",
    description: "Conheça listas, tuplas, dicionários e conjuntos.",
    difficulty: "intermediate",
    progress: 0,
    status: "locked",
  },
];