import {Dispatch, SetStateAction} from "react";
import {Note} from "../types/APITypes";

type NoteRowProps = {
	note: Note;
	setCurrentNote: Dispatch<SetStateAction<Note | null>>;
};

function NoteRow({note, setCurrentNote}: NoteRowProps) {
	return (
		<div
			className="note-row"
			onClick={() => {
				setCurrentNote(note);
			}}
		>
			{note.title}
		</div>
	);
}

export default NoteRow;
