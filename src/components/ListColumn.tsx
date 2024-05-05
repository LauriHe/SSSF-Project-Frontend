import {useEffect, useRef, useState} from "react";
import {Card, List} from "../types/APITypes";
import ListRow from "./ListRow";
import {doGraphQLFetch} from "../utils/fetch";
import {
	createCard,
	deleteCard,
	getCardsByList,
	updateList,
} from "../utils/queries";

type ListProps = {
	list: List;
	token: string;
	deleteList: (index: string) => Promise<void>;
};

function ListColumn({list, token, deleteList}: ListProps) {
	const [title, setTitle] = useState<string>(list.title);
	const [cards, setCards] = useState<Card[]>([]);
	const [showListOptions, setShowListOptions] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const toggleListOptions = () => {
		setShowListOptions(!showListOptions);
	};

	const uploadTitle = async () => {
		try {
			const response = await doGraphQLFetch(
				updateList,
				{id: list.id, title: title},
				token,
			);
			setTitle(response.updateList.list.title);
		} catch (error) {
			alert("could not update title");
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist && event.persist();
		setTitle(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			inputRef.current?.blur();
		}
	};

	const fetchCards = async () => {
		try {
			const response = await doGraphQLFetch(
				getCardsByList,
				{listId: list.id},
				token,
			);
			setCards(response.cardsByList);
		} catch (error) {
			console.error("could not fetch cards");
		}
	};

	const addCard = async () => {
		try {
			const response = await doGraphQLFetch(
				createCard,
				{listId: list.id, title: "New Card", content: ""},
				token,
			);
			setCards([...cards, response.createCard.card]);
		} catch (error) {
			alert("could not add card");
		}
	};

	const deleteSingleCard = async (id: string) => {
		try {
			const response = await doGraphQLFetch(deleteCard, {id}, token);
			if (!response.deleteCard) {
				throw new Error("could not delete card");
			}
			setCards(cards.filter((card) => card.id !== id));
		} catch (error) {
			alert("could not delete card");
		}
	};

	useEffect(() => {
		fetchCards();
	}, []);

	return (
		<div className="list">
			<div className="flex gap-[0.2em] relative">
				<input
					className="list-title"
					onChange={handleInputChange}
					onBlur={uploadTitle}
					type="text"
					value={title}
					ref={inputRef}
					onKeyDown={handleKeyDown}
				/>
				<button className="list-options-toggle" onClick={toggleListOptions}>
					<span className="w-fit h-fit">...</span>
				</button>
				{showListOptions && (
					<div className="list-options">
						<button
							className="list-options-button hover:bg-red-500"
							onClick={() => {
								deleteList(list.id);
							}}
						>
							Delete List
						</button>
					</div>
				)}
			</div>
			{cards.map((card, index) => (
				<ListRow
					key={index}
					card={card}
					token={token}
					deleteCard={deleteSingleCard}
				></ListRow>
			))}
			<button className="add-card-button" onClick={addCard}>
				+ Add a card
			</button>
		</div>
	);
}

export default ListColumn;
