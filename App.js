import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MyTabs from "./navigation";
import {init} from "./helper/db";

import React from "react";

init().then(()=>{
  console.log("Db initialized successfully");
}).catch(err=>{
  console.log("Db initialized with failure: " + err.message);
});

export default function App() {
  return <MyTabs />;
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
