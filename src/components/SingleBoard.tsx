import {useEffect, useRef, useState} from "react";
import ListColumn from "./ListColumn";
import {useLocation, useNavigate} from "react-router-dom";
import {Board, List, User} from "../types/APITypes";
import {doGraphQLFetch} from "../utils/fetch";
import {
	checkToken,
	createList,
	deleteBoard,
	deleteList,
	getBoard,
	getListsByBoard,
	updateBoard,
} from "../utils/queries";
import ShareRow from "./ShareRow";
import ShareForm from "./ShareForm";

function SingleBoard() {
	const [user, setUser] = useState<User | null>(null);
	const [board, setBoard] = useState<Board | null>(null);
	const [lists, setLists] = useState<List[]>([]);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const boardID = searchParams.get("id");
	const [token, setToken] = useState<string>("");
	const [shareOpen, setShareOpen] = useState<boolean>(false);
	const [titleInput, setTitleInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			inputRef.current?.blur();
		}
	};

	const uploadTitle = async () => {
		try {
			const response = await doGraphQLFetch(
				updateBoard,
				{boardId: board?.id, title: titleInput},
				token,
			);
			setTitleInput(response.updateBoard.board.title);
		} catch (error) {
			alert("could not update title");
		}
	};

	const fetchUser = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const userResponse = await doGraphQLFetch(
				checkToken,
				{token: token},
				token,
			);
			setUser(userResponse.checkToken.user);
		} catch (error) {
			console.log("could not fetch user");
		}
	};

	const fetchBoard = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const boardResponse = await doGraphQLFetch(
				getBoard,
				{boardId: boardID},
				token,
			);
			setBoard(boardResponse.boardById);
			setTitleInput(boardResponse.boardById.title);
		} catch (error) {
			console.log(error);
			console.log("could not fetch board");
		}
	};

	const fetchLists = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const listResponse = await doGraphQLFetch(
				getListsByBoard,
				{boardId: boardID},
				token,
			);
			setLists(listResponse.listsByBoard);
		} catch (error) {
			console.log(error);
			console.log("could not fetch lists");
		}
	};

	const addList = async () => {
		try {
			const response = await doGraphQLFetch(
				createList,
				{boardId: boardID, title: "New List"},
				token,
			);
			setLists([...lists, response.createList.list]);
		} catch (error) {
			alert("could not create list");
		}
	};

	const deleteSingleList = async (id: string) => {
		try {
			const response = await doGraphQLFetch(deleteList, {id}, token);
			if (!response.deleteList) {
				throw new Error("could not delete list");
			}
			fetchLists();
		} catch (error) {
			alert("could not delete list");
		}
	};

	const deleteSingleBoard = async () => {
		try {
			if (confirm("Are you sure you want to delete this board?") === false)
				return;
			const response = await doGraphQLFetch(
				deleteBoard,
				{boardId: boardID},
				token,
			);
			if (!response.deleteBoard) {
				throw new Error("could not delete board");
			}
			navigate("/boards");
		} catch (error) {
			alert("could not delete board");
		}
	};

	useEffect(() => {
		const token = sessionStorage.getItem("token") || "";
		if (token) {
			setToken(token);
			fetchUser();
			fetchBoard();
			fetchLists();
		} else {
			navigate("/");
		}
	}, []);

	return (
		<div className="pl-[5em] p-[1em] flex flex-col gap-[1em]">
			<div className="flex justify-between">
				<input
					type="text"
					id="board-title"
					name="title"
					className="font-bold text-2xl bg-gray-800"
					value={titleInput}
					onChange={(event) => {
						setTitleInput(event.target.value);
					}}
					ref={inputRef}
					onKeyDown={handleKeyDown}
					onBlur={uploadTitle}
				></input>
				{board?.owner.id === user?.id && (
					<div className="flex gap-[1em]">
						<button
							className="board-option-button hover:bg-blue-400"
							onClick={() => {
								setShareOpen(true);
							}}
						>
							Share
						</button>
						<button
							className="board-option-button hover:bg-red-600"
							onClick={deleteSingleBoard}
						>
							Delete
						</button>
					</div>
				)}
			</div>
			<div className="flex gap-[1em]">
				{lists.map((list, index) => (
					<ListColumn
						key={index}
						list={list}
						token={token}
						deleteList={deleteSingleList}
					/>
				))}
				{board && (
					<button id="add-list-button" onClick={addList}>
						+ Add a list
					</button>
				)}
			</div>
			{shareOpen && (
				<div id="share-modal-container">
					<div id="share-modal">
						<button
							className="button w-[2.5em] hover:bg-red-500 place-self-end"
							onClick={() => {
								setShareOpen(false);
							}}
						>
							X
						</button>
						<p>Currently shared to:</p>
						{board &&
							board.collaborators.map((collaborator) => (
								<ShareRow
									documentType="board"
									documentId={board.id}
									refresh={fetchBoard}
									collaborator={collaborator}
									token={token}
									key={collaborator.id}
								></ShareRow>
							))}
						{board && (
							<ShareForm
								documentType="board"
								documentId={board.id}
								refresh={fetchBoard}
								token={token}
							></ShareForm>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default SingleBoard;
