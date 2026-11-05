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
import { getCurrentPlayer } from "../../features/player/services/playerService";

// ==========================================
// DADOS DEMONSTRATIVOS
// Futuramente serão substituídos pela API.
// ==========================================

const course = {
  title: "Fundamentos de Python",
  category: "PROGRAMAÇÃO • INICIANTE",
  description:
    "Aprenda os fundamentos da programação e prepare-se para enfrentar os desafios da aventura.",
  progress: 50,
};

const dailyMission = {
  title: "Desafio do dia",
  description: "Complete dois exercícios de programação.",
  reward: 30,
  completed: 0,
  total: 2,
};

// ==========================================
// COMPONENTE: BARRA DE PROGRESSO
// ==========================================

type ProgressBarProps = {
  progress: number;
  label: string;
};

function ProgressBar({ progress, label }: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  const progressWidth = `${safeProgress}%` as `${number}%`;

  return (
    <View
      style={styles.progressBackground}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(safeProgress),
      }}
    >
      <View
        style={[
          styles.progressFill,
          { width: progressWidth },
        ]}
      />
    </View>
  );
}

// ==========================================
// COMPONENTE: TÍTULO DE SEÇÃO
// ==========================================

type SectionTitleProps = {
  children: string;
};

function SectionTitle({ children }: SectionTitleProps) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function HomeScreen() {
  const router = useRouter();
  const player = getCurrentPlayer();

  const levelProgress = Math.min(
    100,
    Math.max(0, (player.xp / player.nextLevelXp) * 100)
  );

  const remainingXp = Math.max(
    0,
    player.nextLevelXp - player.xp
  );

  const missionProgress = `${dailyMission.completed} de ${dailyMission.total} exercícios concluídos`;

  const stats = [
    {
      id: "streak",
      icon: "🔥",
      value: `${player.streak} dias`,
      label: "Sequência",
    },
    {
      id: "exercises",
      icon: "⚔️",
      value: String(player.completedExercises),
      label: "Exercícios",
    },
  ];

  function navigateToCourses() {
    router.push("/trilhas");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CABEÇALHO */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.subtitle}>
              Bem-vindo de volta,
            </Text>

            <Text style={styles.title}>
              {player.name}!
            </Text>
          </View>

          <View
            style={styles.avatar}
            accessible
            accessibilityLabel={`Perfil de ${player.name}`}
          >
            <Text style={styles.avatarText}>
              {player.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* NÍVEL E EXPERIÊNCIA */}

        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View>
              <Text style={styles.cardLabel}>
                SEU NÍVEL
              </Text>

              <Text style={styles.level}>
                Nível {player.level}
              </Text>
            </View>

            <Text style={styles.xpText}>
              {player.xp} / {player.nextLevelXp} XP
            </Text>
          </View>

          <ProgressBar
            progress={levelProgress}
            label="Progresso para o próximo nível"
          />

          <Text style={styles.helperText}>
            {remainingXp > 0
              ? `Faltam ${remainingXp} XP para o próximo nível.`
              : "Você alcançou a experiência necessária para avançar!"}
          </Text>
        </View>

        {/* ESTATÍSTICAS */}

        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statIcon}>
                {stat.icon}
              </Text>

              <Text style={styles.statValue}>
                {stat.value}
              </Text>

              <Text style={styles.statLabel}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* CURSO EM ANDAMENTO */}

        <SectionTitle>
          Continue sua jornada
        </SectionTitle>

        <View style={styles.courseCard}>
          <Text style={styles.courseCategory}>
            {course.category}
          </Text>

          <Text style={styles.courseTitle}>
            {course.title}
          </Text>

          <Text style={styles.courseDescription}>
            {course.description}
          </Text>

          <View style={styles.courseProgress}>
            <Text style={styles.helperText}>
              Progresso do curso
            </Text>

            <Text style={styles.coursePercentage}>
              {course.progress}%
            </Text>
          </View>

          <ProgressBar
            progress={course.progress}
            label="Progresso do curso de Python"
          />

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={navigateToCourses}
            accessibilityRole="button"
            accessibilityLabel="Continuar aprendendo Python"
          >
            <Text style={styles.primaryButtonText}>
              Continuar aprendendo
            </Text>
          </Pressable>
        </View>

        {/* MISSÃO DIÁRIA */}

        <SectionTitle>
          Missão diária
        </SectionTitle>

        <View style={styles.missionCard}>
          <View style={styles.missionHeader}>
            <Text style={styles.missionTitle}>
              {dailyMission.title}
            </Text>

            <Text style={styles.reward}>
              +{dailyMission.reward} XP
            </Text>
          </View>

          <Text style={styles.missionDescription}>
            {dailyMission.description}
          </Text>

          <Text style={styles.missionProgress}>
            {missionProgress}
          </Text>

          <ProgressBar
            progress={
              (dailyMission.completed / dailyMission.total) * 100
            }
            label="Progresso da missão diária"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// ESTILIZAÇÃO
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },

  // Cabeçalho

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  headerText: {
    flex: 1,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "bold",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.background,
  },

  // Nível e XP

  levelCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },

  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  cardLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "bold",
  },

  level: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
  },

  xpText: {
    color: colors.text,
    fontWeight: "600",
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

  helperText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.sm,
  },

  // Estatísticas

  statsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },

  statIcon: {
    fontSize: 22,
    marginBottom: spacing.sm,
  },

  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  // Seções

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  // Curso

  courseCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },

  courseCategory: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },

  courseTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },

  courseDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },

  courseProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  coursePercentage: {
    color: colors.text,
    fontWeight: "bold",
  },

  primaryButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },

  primaryButtonPressed: {
    opacity: 0.8,
  },

  primaryButtonText: {
    color: colors.background,
    fontWeight: "bold",
    fontSize: 14,
  },

  // Missão diária

  missionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  missionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  missionTitle: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },

  reward: {
    color: colors.success,
    fontWeight: "bold",
  },

  missionDescription: {
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontSize: 13,
  },

  missionProgress: {
    color: colors.text,
    fontSize: 12,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});