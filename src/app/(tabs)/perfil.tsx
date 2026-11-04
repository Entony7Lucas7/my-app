
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../constants/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CABEÇALHO DO PERFIL */}

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <Text style={styles.name}>
            Aventureiro
          </Text>

          <Text style={styles.level}>
            Nível 3 • Aprendiz
          </Text>
        </View>

        {/* ESTATÍSTICAS */}

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>
            Estatísticas
          </Text>

          <View style={styles.statRow}>
            <Text style={styles.label}>
              Experiência total
            </Text>
            <Text style={styles.value}>240 XP</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.label}>
              Dias de sequência
            </Text>
            <Text style={styles.value}>5 dias</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.label}>
              Exercícios concluídos
            </Text>
            <Text style={styles.value}>12</Text>
          </View>

          <View style={[styles.statRow, styles.lastStatRow]}>
            <Text style={styles.label}>
              Cursos em andamento
            </Text>
            <Text style={styles.value}>1</Text>
          </View>
        </View>

        {/* CONQUISTAS */}

        <View style={styles.achievementCard}>
          <Text style={styles.sectionTitle}>
            Conquistas
          </Text>

          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>
              🏆
            </Text>

            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>
                Primeiros passos
              </Text>

              <Text style={styles.label}>
                Complete seu primeiro exercício.
              </Text>
            </View>
          </View>

          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>
              🔥
            </Text>

            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>
                Determinação
              </Text>

              <Text style={styles.label}>
                Estude por cinco dias consecutivos.
              </Text>
            </View>
          </View>
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

  profileHeader: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },

  avatarText: {
    color: colors.background,
    fontSize: 38,
    fontWeight: "bold",
  },

  name: {
    color: colors.text,
    fontSize: 23,
    fontWeight: "bold",
  },

  level: {
    color: colors.primary,
    fontSize: 13,
    marginTop: spacing.xs,
  },

  statsCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: spacing.md,
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  lastStatRow: {
    borderBottomWidth: 0,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  value: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 13,
  },

  achievementCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
  },

  achievement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  achievementIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },

  achievementInfo: {
    flex: 1,
  },

  achievementName: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
});
