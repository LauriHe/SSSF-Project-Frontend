import {FormEvent, useEffect, useRef, useState} from "react";
import {Note, NoteInput} from "../types/APITypes";
import {createNote, updateNote} from "../utils/queries";
import {doGraphQLFetch} from "../utils/fetch";

type NoteRowProps = {
	note: Note;
	reloadNotes: () => void;
};

function SingleNote({note, reloadNotes}: NoteRowProps) {
	const initValues: NoteInput = {
		title: note.title,
		content: note.content,
	};

	const [inputs, setInputs] = useState(initValues);
	const formRef = useRef<HTMLFormElement>(null);

	const doEditUpload = async (inputs: NoteInput) => {
		try {
			const token = sessionStorage.getItem("token");
			if (!token) {
				throw new Error("no token");
			}
			await doGraphQLFetch(updateNote, {id: note.id, ...inputs}, token);
			reloadNotes();
		} catch (error) {
			if (error instanceof Error && error.message === "no token") {
				alert("no token");
			} else {
				alert("could not edit note");
			}
		}
	};

	const doCreateUpload = async (inputs: NoteInput) => {
		try {
			const token = sessionStorage.getItem("token");
			if (!token) {
				throw new Error("no token");
			}
			await doGraphQLFetch(
				createNote,
				{title: inputs.title, content: inputs.content},
				token,
			);
			reloadNotes();
		} catch (error) {
			if (error instanceof Error && error.message === "no token") {
				alert("no token");
			} else {
				alert("could not create note");
			}
		}
	};

	const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const valid = formRef.current?.checkValidity();
		formRef.current?.reportValidity();
		if (!valid) return;

		if (note.id === "") {
			doCreateUpload(inputs);
		} else {
			doEditUpload(inputs);
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

	useEffect(() => {
		setInputs(note);
	}, [note]);

	return (
		note && (
			<form action="" className="single-note" ref={formRef}>
				<input
					type="text"
					id="note-title"
					name="title"
					value={inputs.title}
					onChange={handleInputChange}
					maxLength={100}
				></input>
				<textarea
					id="note-content"
					name="content"
					rows={100}
					value={inputs.content}
					onChange={handleInputChange}
					maxLength={10000}
				></textarea>
				<button type="submit" onClick={handleSubmit} id="note-save">
					Save
				</button>
			</form>
		)
	);
}

export default SingleNote;
