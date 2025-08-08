import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ManageExpenses from "./screens/ManageExpenses";
import TabNavigation from "./TabNavigation";
import StoreProvider from "./store/store";

const Stack = createNativeStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case "Recent":
      return "Recent";
    case "AllExpenses":
      return "All Expenses";
    default:
      return "Recent";
  }
}

export default function App() {
  return (
    <>
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#3b82f6" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={({ route, navigation }) => ({
                title: getHeaderTitle(route),
                headerRight: ({ tintColor }) => (
                  <Pressable
                    onPress={() => navigation.navigate("ManageExpenses")}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Ionicons
                      name="add"
                      size={24}
                      color={tintColor}
                      style={{ marginRight: 16 }}
                    />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                title: "Manage Expenses",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
      <StatusBar style="auto" />
    </>
  );
}
