import {Card} from "../types/APITypes";
import {useRef, useState} from "react";
import {doGraphQLFetch} from "../utils/fetch";
import {updateCard} from "../utils/queries";

type ListRowProps = {
	card: Card;
	token: string;
	deleteCard: (index: string) => Promise<void>;
};

function ListRow({card, token, deleteCard}: ListRowProps) {
	const initValues = {
		title: card.title,
		content: card.content,
	};
	const [inputs, setInputs] = useState(initValues);
	const [showCardOptions, setShowCardOptions] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);

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
					<div className="list-options top-[2.5em]">
						<button
							className="list-options-button hover:bg-red-500"
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
