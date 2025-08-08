import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Button({ onPress, children, flat }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, flat && styles.flat]}>
          <Text style={[styles.text, flat && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    backgroundColor: "#3b82f6",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
  },
  flat: {
    backgroundColor: "transparent",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: "#3b82f6",
  },
});
