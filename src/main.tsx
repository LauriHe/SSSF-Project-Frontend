import {HashRouter} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import {LayoutProvider} from "./contexts/LayoutContext";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
	<React.StrictMode>
		<HashRouter>
			<LayoutProvider>
				<App />
			</LayoutProvider>
		</HashRouter>
	</React.StrictMode>,
);
