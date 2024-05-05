import {Route, Routes} from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import Notes from "./views/Notes";
import Settings from "./views/Settings";
import Register from "./views/Register";
import Boards from "./views/Boards";
import SingleBoard from "./views/SingleBoard";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login></Login>} />
			<Route path="/register" element={<Register></Register>} />
			<Route element={<Layout></Layout>}>
				<Route path="/home" element={<Home></Home>} />
				<Route path="/notes" element={<Notes></Notes>} />
				<Route path="/boards" element={<Boards></Boards>} />
				<Route path="/board" element={<SingleBoard></SingleBoard>} />
				<Route path="/settings" element={<Settings></Settings>} />
			</Route>
		</Routes>
	);
}

export default App;
