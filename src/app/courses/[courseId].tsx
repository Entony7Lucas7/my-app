import { useLocalSearchParams, useRouter } from "expo-router";

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../constants/theme";

import { getCourseById } from "../../features/courses/services/courseService";

import { getCurriculumByCourseId } from "../../features/courses/services/curriculumService";

import type { LessonStatus } from "../../features/courses/types/course";

const lessonStatusLabels: Record<LessonStatus, string> = {
  available: "Disponível",
  in_progress: "Em andamento",
  completed: "Concluída",
  locked: "Bloqueada",
};

export default function CourseDetailsScreen() {
  const router = useRouter();

  const { courseId } = useLocalSearchParams<{
    courseId: string;
  }>();

  const course = getCourseById(courseId);
  const curriculum = getCurriculumByCourseId(courseId);

  function openLesson(lessonId: string) {
    router.push({
      pathname: "/lessons/[lessonId]",
      params: {
        lessonId,
        courseId,
      },
    });
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Curso não encontrado
          </Text>

          <Text style={styles.emptyDescription}>
            Não foi possível localizar este curso.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>
              Voltar
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>
            ← Voltar para trilhas
          </Text>
        </Pressable>

        <View style={styles.headerCard}>
          <Text style={styles.category}>
            CURSO DE PROGRAMAÇÃO
          </Text>

          <Text style={styles.title}>
            {course.title}
          </Text>

          <Text style={styles.description}>
            {course.description}
          </Text>

          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Progresso do curso
            </Text>

            <Text style={styles.progressValue}>
              {course.progress}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(
                    100,
                    Math.max(0, course.progress)
                  )}%`,
                },
              ]}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Conteúdo do curso
        </Text>

        {curriculum ? (
          curriculum.chapters
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((chapter) => {
              const completedLessons = chapter.lessons.filter(
                (lesson) => lesson.status === "completed"
              ).length;

              const totalLessons = chapter.lessons.length;

              return (
                <View
                  key={chapter.id}
                  style={styles.chapterCard}
                >
                  <View style={styles.chapterHeader}>
                    <View style={styles.chapterNumber}>
                      <Text style={styles.chapterNumberText}>
                        {chapter.order}
                      </Text>
                    </View>

                    <View style={styles.chapterInfo}>
                      <Text style={styles.chapterTitle}>
                        {chapter.title}
                      </Text>

                      <Text style={styles.chapterDescription}>
                        {chapter.description}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.chapterProgress}>
                    {completedLessons} de {totalLessons} lições concluídas
                  </Text>

                  {chapter.lessons
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => {
                      const isLocked = lesson.status === "locked";

                      return (
                        <Pressable
                          key={lesson.id}
                          style={({ pressed }) => [
                            styles.lessonCard,
                            pressed && !isLocked && styles.lessonPressed,
                            isLocked && styles.lessonDisabled,
                          ]}
                          onPress={() => openLesson(lesson.id)}
                          disabled={isLocked}
                          accessibilityRole="button"
                          accessibilityLabel={`Abrir lição ${lesson.title}`}
                          accessibilityState={{
                            disabled: isLocked,
                          }}
                        >
                          <View style={styles.lessonInfo}>
                            <Text style={styles.lessonTitle}>
                              {lesson.title}
                            </Text>

                            <Text style={styles.lessonDescription}>
                              {lesson.description}
                            </Text>

                            <Text
                              style={[
                                styles.lessonStatus,
                                lesson.status === "completed" &&
                                  styles.lessonCompleted,
                                isLocked && styles.lessonLocked,
                              ]}
                            >
                              {lessonStatusLabels[lesson.status]}
                            </Text>
                          </View>

                          <View style={styles.lessonReward}>
                            <Text style={styles.lessonTime}>
                              {lesson.estimatedMinutes} min
                            </Text>

                            <Text style={styles.lessonXp}>
                              +{lesson.xpReward} XP
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })}
                </View>
              );
            })
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Conteúdo em preparação
            </Text>

            <Text style={styles.emptyDescription}>
              As lições deste curso ainda estão sendo desenvolvidas.
              Em breve você poderá iniciar sua jornada.
            </Text>
          </View>
        )}
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

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },

  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },

  headerCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },

  category: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },

  title: {
    color: colors.text,
    fontSize: 23,
    fontWeight: "bold",
  },

  description: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.sm,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  progressLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  progressValue: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },

  progressBackground: {
    height: 9,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.full,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: spacing.md,
  },

  chapterCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },

  chapterHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  chapterNumber: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },

  chapterNumberText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "bold",
  },

  chapterInfo: {
    flex: 1,
  },

  chapterTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "bold",
  },

  chapterDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },

  chapterProgress: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },

  lessonCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.md,
  },

  lessonPressed: {
    opacity: 0.7,
  },

  lessonDisabled: {
    opacity: 0.55,
  },

  lessonInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },

  lessonTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "bold",
  },

  lessonDescription: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  lessonStatus: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: spacing.sm,
  },

  lessonCompleted: {
    color: colors.success,
  },

  lessonLocked: {
    color: colors.danger,
  },

  lessonReward: {
    alignItems: "flex-end",
  },

  lessonTime: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  lessonXp: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },

  emptyCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});