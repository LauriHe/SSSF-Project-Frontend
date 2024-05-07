import {Board, Card, List} from "../types/APITypes";
import {useEffect, useRef, useState} from "react";
import {doGraphQLFetch} from "../utils/fetch";
import {getListsByBoard, moveCard, updateCard} from "../utils/queries";

type ListRowProps = {
	card: Card;
	token: string;
	deleteCard: (index: string) => Promise<void>;
	refreshBoard: () => void;
	board: Board | null;
};

function ListRow({card, token, deleteCard, refreshBoard, board}: ListRowProps) {
	const initValues = {
		title: card.title,
		content: card.content,
	};
	const [inputs, setInputs] = useState(initValues);
	const [showCardOptions, setShowCardOptions] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const [lists, setLists] = useState<List[]>([]);
	const [moveCardOpen, setMoveCardOpen] = useState<boolean>(false);

	const handleTitleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			titleRef.current?.blur();
		}
	};

	const handleContentKey = (
		event: React.KeyboardEvent<HTMLTextAreaElement>,
	) => {
		if (event.key === "Enter") {
			contentRef.current?.blur();
		}
	};

	const toggleListOptions = () => {
		setShowCardOptions(!showCardOptions);
	};

	const doUpload = async () => {
		try {
			if (inputs.title === "") {
				alert("Title cannot be empty");
				return;
			}
			if (inputs.title.length > 100) {
				alert("Title cannot be longer than 100 characters");
				return;
			}
			if (inputs.content.length > 5000) {
				alert("Content cannot be longer than 5000 characters");
				return;
			}

			const response = await doGraphQLFetch(
				updateCard,
				{id: card.id, title: inputs.title, content: inputs.content},
				token,
			);
			setInputs({
				title: response.updateCard.card.title,
				content: response.updateCard.card.content,
			});
		} catch (error) {
			alert("could not update card");
		}
	};

	const handleInputChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		event.persist && event.persist();
		setInputs((inputs) => {
			return {
				...inputs,
				[event.target.name]: event.target.value,
			};
		});
	};

	const moveCardToList = async (listId: string) => {
		try {
			const response = await doGraphQLFetch(
				moveCard,
				{id: card.id, listId: listId},
				token,
			);
			if (!response.moveCard) {
				throw new Error("could not move card");
			}
			refreshBoard();
		} catch (error) {
			alert("could not move card");
		}
	};

	const getLists = async () => {
		try {
			if (!board) {
				throw new Error("could not fetch lists");
			}
			const response = await doGraphQLFetch(
				getListsByBoard,
				{boardId: board.id},
				token,
			);
			setLists(response.listsByBoard);
		} catch (error) {
			console.error("could not fetch lists");
		}
	};

	useEffect(() => {
		getLists();
	}, []);

	return (
		<div className="card">
			<div className="flex gap-[0.2em] relative h-[2.3em]">
				<input
					type="text"
					className="card-title"
					name="title"
					value={inputs.title}
					onChange={handleInputChange}
					onBlur={doUpload}
					ref={titleRef}
					onKeyDown={handleTitleKey}
				></input>
				<button
					className="list-options-toggle bg-gray-800 hover:bg-gray-700"
					onClick={toggleListOptions}
				>
					<span className="w-fit h-fit">...</span>
				</button>
				{showCardOptions && (
					<div
						className="list-options top-[2.5em]"
						onMouseLeave={() => {
							setMoveCardOpen(false);
							setShowCardOptions(false);
						}}
					>
						<button
							className="list-options-button hover:bg-gray-800"
							onMouseEnter={() => {
								setMoveCardOpen(true);
							}}
						>
							Move to
						</button>
						{moveCardOpen && (
							<div id="card-move-list">
								{lists.length > 0 ? (
									lists.map((list) => (
										<button
											key={list.id}
											className="list-options-button hover:bg-gray-800"
											onClick={() => {
												moveCardToList(list.id);
											}}
										>
											{list.title}
										</button>
									))
								) : (
									<div>No lists</div>
								)}
							</div>
						)}
						<button
							className="list-options-button hover:bg-red-500"
							onMouseEnter={() => {
								setMoveCardOpen(false);
							}}
							onClick={() => {
								deleteCard(card.id);
							}}
						>
							Delete Card
						</button>
					</div>
				)}
			</div>
			<textarea
				className="card-description"
				name="content"
				rows={2}
				value={inputs.content}
				onChange={handleInputChange}
				onBlur={doUpload}
				ref={contentRef}
				onKeyDown={handleContentKey}
			></textarea>
		</div>
	);
}

export default ListRow;
