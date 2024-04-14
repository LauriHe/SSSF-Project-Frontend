import {FormEvent, useEffect, useState} from "react";
import {Note, NoteInput} from "../types/APITypes";

type NoteRowProps = {
	note: Note;
};

function SingleNote({note}: NoteRowProps) {
	const initValues: NoteInput = {
		title: note.title,
		content: note.content,
	};

	const [inputs, setInputs] = useState(initValues);

	const doUpload = (inputs: NoteInput) => {
		console.log(inputs);
	};

	const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
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

	useEffect(() => {
		setInputs(note);
	}, [note]);

	return (
		note && (
			<form action="" className="single-note">
				<input
					type="text"
					id="note-title"
					name="title"
					value={inputs.title}
					onChange={handleInputChange}
				></input>
				<textarea
					id="note-content"
					name="content"
					rows={100}
					value={inputs.content}
					onChange={handleInputChange}
				></textarea>
				<button type="submit" onSubmit={handleSubmit} id="note-save">
					Save
				</button>
			</form>
		)
	);
}

export default SingleNote;
