import {HashRouter, Route, Routes} from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import Notes from "./views/Notes";
import Boards from "./views/Boards";
import Calendar from "./views/Calendar";
import Settings from "./views/Settings";
import Register from "./views/Register";

function App() {
	return (
		<HashRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path="/" element={<Login></Login>} />
				<Route path="/register" element={<Register></Register>} />
				<Route element={<Layout></Layout>}>
					<Route path="/home" element={<Home></Home>} />
					<Route path="/notes" element={<Notes></Notes>} />
					<Route path="/boards" element={<Boards></Boards>} />
					<Route path="/calendar" element={<Calendar></Calendar>} />
					<Route path="/settings" element={<Settings></Settings>} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
