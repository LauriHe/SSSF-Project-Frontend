import {useEffect, useState} from "react";
import {Board} from "../types/APITypes";
import {useNavigate} from "react-router-dom";
import {doGraphQLFetch} from "../utils/fetch";
import {createBoard, getOwnedBoards, getSharedBoards} from "../utils/queries";

function Boards() {
	const [show, setShow] = useState<"own" | "shared">("own");
	const [ownBoards, setOwnBoards] = useState<Board[]>([]);
	const [sharedBoards, setSharedBoards] = useState<Board[]>([]);
	const [token, setToken] = useState<string>("");

	const navigate = useNavigate();

	const getOwnBoardsFromApi = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const response = await doGraphQLFetch(getOwnedBoards, {}, token);
			setOwnBoards(response.ownedBoards);
		} catch (error) {
			console.log("could not get own boards");
		}
	};

	const getSharedBoardsFromApi = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const response = await doGraphQLFetch(getSharedBoards, {}, token);
			setSharedBoards(response.sharedBoards);
		} catch (error) {
			alert("could not get shared boards");
		}
	};

	const refreshBoards = async () => {
		getOwnBoardsFromApi();
		getSharedBoardsFromApi();
	};

	const addNewBoard = async () => {
		try {
			const response = await doGraphQLFetch(
				createBoard,
				{title: "New Board"},
				token,
			);
			if (response.createBoard.board) {
				refreshBoards();
				navigate(`/board?id=${response.createBoard.board.id}`);
			} else {
				throw new Error("could not create board");
			}
		} catch (error) {
			console.log(error);
			alert("could not create board");
		}
	};

	useEffect(() => {
		const token = sessionStorage.getItem("token") || "";
		if (token) {
			setToken(token);
			refreshBoards();
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div className="w-full h-full flex justify-center pl-[5em] pt-[1em]">
			<div className="w-[50%] flex flex-wrap content-start gap-[1em]">
				<h1 id="boards-title">Boards</h1>
				<div className="w-full flex justify-center gap-[1em] mb-[2em]">
					<button
						className={
							show === "own"
								? "bg-blue-400 p-[0.5em] rounded-[0.4em]"
								: "bg-gray-700 p-[0.5em] rounded-[0.4em]"
						}
						onClick={() => {
							setShow("own");
						}}
					>
						own
					</button>
					<button
						className={
							show === "shared"
								? "bg-blue-400 p-[0.5em] rounded-[0.4em]"
								: "bg-gray-700 p-[0.5em] rounded-[0.4em]"
						}
						onClick={() => {
							setShow("shared");
						}}
					>
						shared
					</button>
				</div>
				{show === "own" &&
					ownBoards.map((board, index) => (
						<button
							key={index}
							className="board-link"
							onClick={() => {
								navigate(`/board?id=${board.id}`);
							}}
						>
							{board.title}
						</button>
					))}
				{show === "shared" &&
					sharedBoards.map((board, index) => (
						<button
							key={index}
							className="board-link"
							onClick={() => {
								navigate(`/board?id=${board.id}`);
							}}
						>
							{board.title}
						</button>
					))}
				{show === "own" && (
					<button
						className="board-link bg-blue-400 font-bold"
						onClick={addNewBoard}
					>
						+ Add a board
					</button>
				)}
			</div>
		</div>
	);
}

export default Boards;
