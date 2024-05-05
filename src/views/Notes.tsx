import {useEffect, useState} from "react";
import NoteRow from "../components/NoteRow";
import {Note} from "../types/APITypes";
import SingleNote from "../components/SingleNote";
import {doGraphQLFetch} from "../utils/fetch";
import {
	deleteNote,
	getOwnedNotes,
	getSharedNotes,
	getSingleNote,
} from "../utils/queries";
import {useNavigate} from "react-router-dom";
import ShareRow from "../components/ShareRow";
import ShareForm from "../components/ShareForm";

function Notes() {
	const [currentNote, setCurrentNote] = useState<Note | null>(null);
	const [show, setShow] = useState<"own" | "shared">("own");
	const [ownNotes, setOwnNotes] = useState<Note[]>([]);
	const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
	const [shareOpen, setShareOpen] = useState<boolean>(false);
	const [token, setToken] = useState<string>("");

	const navigate = useNavigate();

	const getOwnedNotesFromApi = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const response = await doGraphQLFetch(getOwnedNotes, {}, token);
			setOwnNotes(response.ownedNotes);
		} catch (error) {
			console.log("could not get own notes");
		}
	};

	const getSharedNotesFromApi = async () => {
		try {
			const token = sessionStorage.getItem("token") || "";
			const response = await doGraphQLFetch(getSharedNotes, {}, token);
			setSharedNotes(response.sharedNotes);
		} catch (error) {
			alert("could not get shared notes");
		}
	};

	const addNewNote = () => {
		setCurrentNote({
			id: "",
			title: "New Note",
			content: "",
			owner: {
				id: "",
				user_name: "",
				email: "",
				filename: "",
			},
			collaborators: [],
		});
	};

	const reloadNotes = () => {
		getOwnedNotesFromApi();
		getSharedNotesFromApi();
	};

	const deleteCurrentNote = async () => {
		try {
			if (confirm("Are you sure you want to delete this note?") === false)
				return;
			await doGraphQLFetch(deleteNote, {id: currentNote?.id}, token);
			setCurrentNote(null);
			reloadNotes();
		} catch (error) {
			alert("could not delete note");
		}
	};

	const refreshCurrentNote = async () => {
		try {
			if (!currentNote) {
				return;
			}
			const response = await doGraphQLFetch(
				getSingleNote,
				{noteId: currentNote.id},
				token,
			);
			setCurrentNote(response.noteById);
			reloadNotes();
		} catch (error) {
			console.log("could not refresh note");
		}
	};

	useEffect(() => {
		const sessionToken = sessionStorage.getItem("token");
		if (sessionToken) {
			setToken(sessionToken);
			getOwnedNotesFromApi();
			getSharedNotesFromApi();
		} else {
			navigate("/");
		}
	}, []);

	return (
		<div className="h-full pl-[4em] flex">
			<div id="note-list">
				<div className="flex gap-[1em]">
					<button
						className={
							show === "own"
								? "bg-blue-400 p-[0.5em] rounded-[0.4em]"
								: "bg-gray-700 p-[0.5em] rounded-[0.4em]"
						}
						onClick={() => {
							setShow("own");
						}}
					>
						own
					</button>
					<button
						className={
							show === "shared"
								? "bg-blue-400 p-[0.5em] rounded-[0.4em]"
								: "bg-gray-700 p-[0.5em] rounded-[0.4em]"
						}
						onClick={() => {
							setShow("shared");
						}}
					>
						shared
					</button>
				</div>
				{show === "own"
					? ownNotes.map((note) => (
							<NoteRow
								note={note}
								setCurrentNote={setCurrentNote}
								key={note.id}
							></NoteRow>
						))
					: sharedNotes.map((note) => (
							<NoteRow
								note={note}
								setCurrentNote={setCurrentNote}
								key={note.id}
							></NoteRow>
						))}
				{show === "own" && (
					<button id="add-note" onClick={addNewNote}>
						+ New Note
					</button>
				)}
			</div>
			<div id="note-container">
				{currentNote && (
					<>
						<SingleNote
							note={currentNote}
							reloadNotes={reloadNotes}
						></SingleNote>
						{show === "own" && (
							<div id="note-options">
								<button
									className="note-option-button hover:bg-blue-400"
									onClick={() => {
										setShareOpen(true);
									}}
								>
									Share
								</button>
								<button
									className="note-option-button hover:bg-red-600"
									onClick={deleteCurrentNote}
								>
									Delete
								</button>
							</div>
						)}
					</>
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
						{currentNote &&
							currentNote.collaborators.map((collaborator) => (
								<ShareRow
									documentType="note"
									documentId={currentNote.id}
									refresh={refreshCurrentNote}
									collaborator={collaborator}
									token={token}
									key={collaborator.id}
								></ShareRow>
							))}
						{currentNote && (
							<ShareForm
								documentType="note"
								documentId={currentNote.id}
								refresh={refreshCurrentNote}
								token={token}
							></ShareForm>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Notes;
