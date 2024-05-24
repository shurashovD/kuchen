import React from "react"
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"
import { Provider } from "react-redux"

import { CombinationPage, MeasurePage, PlateConfigPage } from "src/pages";
import { defaultTheme } from "src/theme";
import { appStore } from "src/stores";

function App() {
  return (
		<ThemeProvider theme={defaultTheme}>
			<Provider store={appStore}>
				<BrowserRouter>
					<Routes>
						<Route path="/measure" element={<MeasurePage />} />
						<Route path="/plate-configuration" element={<PlateConfigPage />} />
						<Route path="/combination" element={<CombinationPage />} />
						<Route path="*" element={<Navigate to="/plate-configuration" />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
  )
}



export default App;