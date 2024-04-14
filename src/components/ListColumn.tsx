import {useState} from "react";
import {List} from "../types/APITypes";
import ListRow from "./ListRow";

type ListProps = {
	list: List;
	listIndex: number;
	deleteList: (index: number) => void;
};

function ListColumn({list, listIndex, deleteList}: ListProps) {
	const [title, setTitle] = useState(list.title);
	const [cards, setCards] = useState(list.cards);
	const [showListOptions, setShowListOptions] = useState(false);
	const toggleListOptions = () => {
		setShowListOptions(!showListOptions);
	};

	const uploadTitle = () => {
		console.log(title);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist && event.persist();
		setTitle(event.target.value);
	};

	const addCard = () => {
		setCards([...cards, {title: "New Card", description: ""}]);
	};

	const deleteCard = (index: number) => {
		setCards(cards.filter((_, i) => i !== index));
	};

	return (
		<div className="list">
			<div className="flex gap-[0.2em] relative">
				<input
					className="list-title"
					onChange={handleInputChange}
					onBlur={uploadTitle}
					type="text"
					value={title}
				/>
				<button className="list-options-toggle" onClick={toggleListOptions}>
					<span className="w-fit h-fit">...</span>
				</button>
				{showListOptions && (
					<div className="list-options">
						<button
							className="list-options-button hover:bg-red-500"
							onClick={() => {
								deleteList(listIndex);
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
					cardIndex={index}
					deleteCard={deleteCard}
				></ListRow>
			))}
			<button className="add-card-button" onClick={addCard}>
				+ Add a card
			</button>
		</div>
	);
}

export default ListColumn;
