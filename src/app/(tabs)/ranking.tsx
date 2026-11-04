import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../constants/theme";

const players = [
  { id: 1, name: "Mestre do Código", xp: 1850 },
  { id: 2, name: "Programador Sombrio", xp: 1420 },
  { id: 3, name: "Aventureiro", xp: 240 },
  { id: 4, name: "Aprendiz Arcano", xp: 180 },
  { id: 5, name: "Guardião da Lógica", xp: 120 },
];

export default function RankingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Ranking
        </Text>

        <Text style={styles.subtitle}>
          Os aventureiros mais dedicados da jornada.
        </Text>

        {players.map((player, index) => (
          <View
            key={player.id}
            style={[
              styles.playerCard,
              player.name === "Aventureiro" && styles.currentPlayer,
            ]}
          >
            <Text style={styles.position}>
              #{index + 1}
            </Text>

            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>
                {player.name}
              </Text>

              <Text style={styles.playerXp}>
                {player.xp} XP
              </Text>
            </View>
          </View>
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

  playerCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },

  currentPlayer: {
    borderWidth: 1,
    borderColor: colors.primary,
  },

  position: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    width: 45,
  },

  playerInfo: {
    flex: 1,
  },

  playerName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "bold",
  },

  playerXp: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
});