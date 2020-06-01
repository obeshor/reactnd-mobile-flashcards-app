import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import Router from "./router";
import { theme } from "./utils/theme";

export default function App() {
	return (
		<StoreProvider store={store}>
			<PaperProvider theme={theme}>
				<Router />
			</PaperProvider>
		</StoreProvider>
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
