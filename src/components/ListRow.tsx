import {Card} from "../types/APITypes";
import {useState} from "react";

type ListRowProps = {
	card: Card;
	cardIndex: number;
	deleteCard: (index: number) => void;
};

function ListRow({card, cardIndex, deleteCard}: ListRowProps) {
	const [inputs, setInputs] = useState(card);
	const [showCardOptions, setShowCardOptions] = useState(false);

	const toggleListOptions = () => {
		setShowCardOptions(!showCardOptions);
	};

	const doUpload = (inputs: Card) => {
		console.log(inputs);
	};

	const handleSubmit = () => {
		doUpload(inputs);
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

	return (
		<div className="card">
			<div className="flex gap-[0.2em] relative h-[2.3em]">
				<input
					type="text"
					className="card-title"
					name="title"
					value={inputs.title}
					onChange={handleInputChange}
					onBlur={handleSubmit}
				></input>
				<button
					className="list-options-toggle bg-gray-800 hover:bg-gray-700"
					onClick={toggleListOptions}
				>
					<span className="w-fit h-fit">...</span>
				</button>
				{showCardOptions && (
					<div className="list-options top-[2.5em]">
						<button
							className="list-options-button hover:bg-red-500"
							onClick={() => {
								deleteCard(cardIndex);
							}}
						>
							Delete Card
						</button>
					</div>
				)}
			</div>
			<textarea
				className="card-description"
				name="description"
				rows={2}
				value={inputs.description}
				onChange={handleInputChange}
				onBlur={handleSubmit}
			></textarea>
		</div>
	);
}

export default ListRow;
