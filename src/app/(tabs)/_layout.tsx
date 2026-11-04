import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../../constants/theme";

const getTabIcon = (
  name: keyof typeof Ionicons.glyphMap,
  activeName: keyof typeof Ionicons.glyphMap,
  focused: boolean,
  color: ColorValue,
  size: number
) => (
  <Ionicons
    name={focused ? activeName : name}
    size={size}
    color={typeof color === "number" ? colors.primary : color ?? colors.primary}
    style={styles.icon}
  />
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) =>
            getTabIcon("home-outline", "home", focused, color, size),
        }}
      />

      <Tabs.Screen
        name="trilhas"
        options={{
          title: "Trilhas",
          tabBarIcon: ({ color, size, focused }) =>
            getTabIcon("map-outline", "map", focused, color, size),
        }}
      />

      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color, size, focused }) =>
            getTabIcon("trophy-outline", "trophy", focused, color, size),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) =>
            getTabIcon("person-outline", "person", focused, color, size),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 2,
  },
});