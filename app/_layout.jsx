import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import HomeIcon from "../interfaces/ISvg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={32} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
