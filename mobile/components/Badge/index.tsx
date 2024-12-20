import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

export function Badge({ count }: { count: number }) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    badgeContainer: {
      position: "absolute",
      right: -6,
      top: -3,
      backgroundColor: theme.secondary,
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
}
