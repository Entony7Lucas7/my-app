import { useRouter } from "expo-router";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../constants/theme";

import { getCourses } from "../../features/courses/services/courseService";

import type {
  CourseDifficulty,
  CourseStatus,
} from "../../features/courses/types/course";

const difficultyLabels: Record<CourseDifficulty, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

const statusLabels: Record<CourseStatus, string> = {
  available: "Disponível",
  in_progress: "Em andamento",
  completed: "Concluído",
  locked: "Bloqueado",
};

export default function TrailsScreen() {
  const router = useRouter();
  const courses = getCourses();

  function openCourse(courseId: string) {
    router.push({
      pathname: "/courses/[courseId]",
      params: { courseId },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Trilhas de aprendizagem
        </Text>

        <Text style={styles.subtitle}>
          Escolha uma jornada e desenvolva suas habilidades.
        </Text>

        {courses.map((course) => (
          <Pressable
            key={course.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => openCourse(course.id)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir curso ${course.title}`}
          >
            <Text style={styles.difficulty}>
              {difficultyLabels[course.difficulty]}
            </Text>

            <Text style={styles.courseTitle}>
              {course.title}
            </Text>

            <Text style={styles.description}>
              {course.description}
            </Text>

            <View style={styles.footer}>
              <Text style={styles.progress}>
                Progresso: {course.progress}%
              </Text>

              <Text
                style={[
                  styles.status,
                  course.status === "locked" && styles.locked,
                  course.status === "completed" && styles.completed,
                ]}
              >
                {statusLabels[course.status]}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },

  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },

  cardPressed: {
    opacity: 0.8,
  },

  difficulty: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },

  courseTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.sm,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.lg,
  },

  progress: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  status: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "bold",
  },

  locked: {
    color: colors.danger,
  },

  completed: {
    color: colors.success,
  },
});