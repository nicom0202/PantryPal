import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function Layout() {
  return <Stack initialRouteName="home" />;
}