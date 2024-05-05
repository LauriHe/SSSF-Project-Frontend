import {useState} from "react";
import {doGraphQLFetch} from "../utils/fetch";
import {getUserByName, shareBoard, shareNoteWithUser} from "../utils/queries";

type ShareFormProps = {
	documentType: "note" | "board";
	documentId: string;
	refresh: () => void;
	token: string;
};

function ShareForm({documentType, documentId, refresh, token}: ShareFormProps) {
	const [input, setInput] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const handleSubmit = async () => {
		try {
			const nameResponse = await doGraphQLFetch(
				getUserByName,
				{name: input},
				token,
			);
			if (documentType === "note") {
				await doGraphQLFetch(
					shareNoteWithUser,
					{noteId: documentId, userId: nameResponse.userByName.id},
					token,
				);
				refresh();
			}
			if (documentType === "board") {
				await doGraphQLFetch(
					shareBoard,
					{boardId: documentId, userId: nameResponse.userByName.id},
					token,
				);
				refresh();
			}
		} catch (error) {
			alert("Could not find user");
		}
	};

	return (
		<div className="flex items-end justify-between">
			<div className="flex flex-col gap-[0.3em]">
				<label htmlFor="user_name">Input username to share</label>
				<input
					type="text"
					className="input w-[22em]"
					name="user_name"
					id="share-user-name"
					onChange={handleInputChange}
					value={input}
				/>
			</div>
			<button className="button w-[4em] h-[2.5em]" onClick={handleSubmit}>
				Share
			</button>
		</div>
	);
}

export default ShareForm;
