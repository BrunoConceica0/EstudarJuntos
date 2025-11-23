import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import HomeIcon from "@/components/icons/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

// Componente customizado para o ícone com círculo animado
const TabBarIcon = ({ name, color, focused, isHome = false }) => {
  const IconComponent = isHome ? HomeIcon : Ionicons;
  const iconProps = isHome ? { size: 28, color } : { name, size: 28, color };

  // Animação para o círculo
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      // Animar quando fica ativo
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animar quando fica inativo
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <View style={styles.iconContainer}>
      <Animated.View
        style={[
          styles.activeCircle,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      />
      <View style={styles.icon}>
        <IconComponent {...iconProps} />
      </View>
    </View>
  );
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={{
        tabBarActiveTintColor: "#F3F4F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#F3F4F6",
          borderTopWidth: 1,
          paddingBottom: insets.bottom + 8,
          paddingTop: 12,
          height: 65 + insets.bottom,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused} isHome={true} />
          ),
        }}
      />

      <Tabs.Screen
        name="Search"
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="search" color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Create"
        options={{
          title: "Doar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="add-circle" color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Messages"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="chatbubble-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person-outline" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  activeCircle: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#3A7DFF",
    opacity: 0.15,
  },
  icon: {
    zIndex: 1,
  },
});
