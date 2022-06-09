import { StyleSheet, View } from "react-native";
import { Reel } from "./components/Reel";

export default function App() {
  return (
    <View style={styles.container}>
      <Reel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
