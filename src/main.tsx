import {HashRouter} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
	<React.StrictMode>
		<HashRouter basename={import.meta.env.BASE_URL}>
			<App />
		</HashRouter>
	</React.StrictMode>,
);
