import {Outlet, useNavigate} from "react-router-dom";
import SvgIcons from "../components/SvgIcons";
import {useEffect} from "react";

function Layout() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<nav>
				<button
					onClick={() => navigate("/notes")}
					aria-label="notes page link"
					id="notes-link"
					className="nav-button"
				>
					<svg>
						<use xlinkHref="#notes-svg" />
					</svg>
					<label htmlFor="notes-link">Notes</label>
				</button>
				<button
					onClick={() => navigate("/boards")}
					aria-label="boards page link"
					id="boards-link"
					className="nav-button"
				>
					<svg>
						<use xlinkHref="#boards-svg" />
					</svg>
					<label htmlFor="boards-link">Boards</label>
				</button>
				<button
					onClick={() => navigate("/settings")}
					aria-label="settings page link"
					id="settings-link"
					className="nav-button"
				>
					<svg>
						<use xlinkHref="#settings-svg" />
					</svg>
					<label htmlFor="settings-link">Settings</label>
				</button>
			</nav>
			<main className="w-full">
				<Outlet></Outlet>
			</main>
			<SvgIcons />
		</>
	);
}

export default Layout;
