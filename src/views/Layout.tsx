import {Outlet, useNavigate} from "react-router-dom";
import SvgIcons from "../components/SvgIcons";
import {useContext, useEffect} from "react";
import {doGraphQLFetch} from "../utils/fetch";
import {checkToken} from "../utils/queries";
import {LayoutContext} from "../contexts/LayoutContext";

function Layout() {
	const navigate = useNavigate();

	const {refreshProfilePic} = useContext(LayoutContext) || {};

	const getProfilePic = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const response = await doGraphQLFetch(
				checkToken,
				{token: token},
				token,
			);
			if (response.checkToken.user.filename === "") return;
			const fileUrl = import.meta.env.VITE_FILE_URL as string;
			const pictureUrl = fileUrl + "/" + response.checkToken.user.filename;

			const pictureElement: HTMLElement | null =
				document.querySelector("#profile-picture");
			if (pictureElement) {
				pictureElement.style.backgroundImage = `url(${pictureUrl})`;
			}
		} catch (error) {
			console.log("could not get profile pic");
		}
	};

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			getProfilePic();
		} else {
			navigate("/");
		}
	}, [refreshProfilePic]);

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
					<div
						id="profile-picture"
						className={"profile-pic bg-[url(./default-profile.jpg)]"}
					></div>
					<label htmlFor="settings-link">Account</label>
				</button>
				<button
					onClick={() => {
						sessionStorage.removeItem("token");
						navigate("/");
					}}
					aria-label="logout"
					id="logout-link"
					className="nav-button"
				>
					<svg>
						<use xlinkHref="#logout-svg" />
					</svg>
					<label htmlFor="logout-link">Logout</label>
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
