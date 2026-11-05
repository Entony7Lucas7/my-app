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

import { getLessonById } from "../../features/courses/services/curriculumService";

import type { LessonStatus } from "../../features/courses/types/course";

const lessonStatusLabels: Record<LessonStatus, string> = {
  available: "Disponível",
  in_progress: "Em andamento",
  completed: "Concluída",
  locked: "Bloqueada",
};

export default function LessonScreen() {
  const router = useRouter();

  const { lessonId, courseId } = useLocalSearchParams<{
    lessonId: string;
    courseId: string;
  }>();

  const course = getCourseById(courseId);
  const lessonDetails = getLessonById(courseId, lessonId);

  if (!course || !lessonDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Lição não encontrada
          </Text>

          <Text style={styles.emptyDescription}>
            Não foi possível localizar esta lição neste curso.
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
          >
            <Text style={styles.backButtonText}>
              Voltar
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const { chapter, lesson } = lessonDetails;

  const isLocked = lesson.status === "locked";

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
            ← Voltar para o curso
          </Text>
        </Pressable>

        <View style={styles.headerCard}>
          <Text style={styles.courseName}>
            {course.title}
          </Text>

          <Text style={styles.chapterName}>
            Capítulo {chapter.order} · {chapter.title}
          </Text>

          <Text style={styles.lessonTitle}>
            {lesson.title}
          </Text>

          <Text style={styles.lessonDescription}>
            {lesson.description}
          </Text>

          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>
                DURAÇÃO
              </Text>

              <Text style={styles.metadataValue}>
                {lesson.estimatedMinutes} min
              </Text>
            </View>

            <View style={styles.metadataDivider} />

            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>
                RECOMPENSA
              </Text>

              <Text style={styles.xpValue}>
                +{lesson.xpReward} XP
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.status,
              lesson.status === "completed" && styles.completedStatus,
              isLocked && styles.lockedStatus,
            ]}
          >
            {lessonStatusLabels[lesson.status]}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Conteúdo da lição
        </Text>

        <View style={styles.contentCard}>
          {isLocked ? (
            <>
              <Text style={styles.contentTitle}>
                <Text style={styles.lockIcon}>🔒 </Text>
                Lição bloqueada
              </Text>

              <Text style={styles.contentDescription}>
                Você ainda não pode acessar esta lição.
                Conclua as etapas anteriores para desbloquear
                este conteúdo.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.contentTitle}>
                Sua jornada começa aqui
              </Text>

              <Text style={styles.contentDescription}>
                {lesson.description}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.comingSoonTitle}>
                Material didático
              </Text>

              <Text style={styles.contentDescription}>
                Esta área será utilizada para apresentar
                explicações, exemplos de código Python e
                atividades práticas relacionadas a esta lição.
              </Text>

              <Text style={styles.comingSoon}>
                O conteúdo completo desta lição será desenvolvido
                na próxima etapa.
              </Text>
            </>
          )}
        </View>
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

  courseName: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
  },

  chapterName: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.sm,
  },

  lessonTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: spacing.md,
  },

  lessonDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },

  metadata: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  metadataItem: {
    flex: 1,
  },

  metadataLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "bold",
  },

  metadataValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },

  xpValue: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },

  metadataDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },

  status: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: spacing.md,
  },

  completedStatus: {
    color: colors.success,
  },

  lockedStatus: {
    color: colors.danger,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: spacing.md,
  },

  contentCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
  },

  contentTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "bold",
  },

  contentDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 21,
    marginTop: spacing.sm,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  comingSoonTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },

  comingSoon: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.lg,
    fontStyle: "italic",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 20,
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

  lockIcon: {
    fontSize: 16,
  },
});