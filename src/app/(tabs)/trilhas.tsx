import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../constants/theme";

const courses = [
  {
    id: 1,
    title: "Fundamentos de Python",
    description: "Aprenda variáveis, condições, repetições e funções.",
    difficulty: "Iniciante",
    progress: "50%",
    status: "Em andamento",
  },
  {
    id: 2,
    title: "Lógica de Programação",
    description: "Desenvolva seu raciocínio e resolva problemas.",
    difficulty: "Iniciante",
    progress: "0%",
    status: "Disponível",
  },
  {
    id: 3,
    title: "Estruturas de Dados",
    description: "Conheça listas, tuplas, dicionários e conjuntos.",
    difficulty: "Intermediário",
    progress: "0%",
    status: "Bloqueado",
  },
];

export default function TrailsScreen() {
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
          <View key={course.id} style={styles.card}>
            <Text style={styles.difficulty}>
              {course.difficulty}
            </Text>

            <Text style={styles.courseTitle}>
              {course.title}
            </Text>

            <Text style={styles.description}>
              {course.description}
            </Text>

            <View style={styles.footer}>
              <Text style={styles.progress}>
                Progresso: {course.progress}
              </Text>

              <Text
                style={[
                  styles.status,
                  course.status === "Bloqueado" && styles.locked,
                ]}
              >
                {course.status}
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

  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
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
});