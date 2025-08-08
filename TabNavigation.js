import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import RecentScreen from "./screens/RecentScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        headerStyle: { backgroundColor: "#3b82f6" },
        headerTintColor: "white",
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#3b82f6",
          paddingBottom: Platform.OS === "android" ? 32 : 10,
        },
        tabBarInactiveTintColor: "rgba(199, 195, 195, 0.7)",
        sceneStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          title: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
