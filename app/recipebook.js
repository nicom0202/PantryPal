import { View, Text, Button } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";

export default function Details() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Grocery Screen</Text>

      <Link href="/home">Go to Home</Link>

      <Button
        title="Go to grocery... again"
        onPress={() => router.push("/grocery")}
      />
      <Button title="Go back" onPress={() => router.back()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}