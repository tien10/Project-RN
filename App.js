import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const thongBaoNen = Notifications.addNotificationResponseReceivedListener(
      (res) => console.log(res)
    );
    const thongBao = Notifications.addNotificationReceivedListener((tb) =>
      console.log(tb)
    );
    return () => {
      thongBao.remove();
      thongBaoNen.remove();
    };
  }, []);
  const showNotification = () => {
    console.log("showNotification");
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification",
        body: "Notification 01",
      },
      trigger: {
        seconds: 5,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Show Notification" onPress={showNotification} />
      <StatusBar style="auto" />
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
