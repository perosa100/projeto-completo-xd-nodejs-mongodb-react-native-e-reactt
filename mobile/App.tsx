import "react-native-gesture-handler";
import React from "react";
import Routes from "./src/routes/routes";
import { StatusBar } from "react-native";
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}
