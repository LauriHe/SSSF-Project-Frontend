import {useState} from "react";
import NoteRow from "../components/NoteRow";
import {Note} from "../types/APITypes";
import SingleNote from "../components/SingleNote";

function Notes() {
	const [currentNote, setCurrentNote] = useState<Note | null>(null);
	const [show, setShow] = useState<"own" | "shared">("own");

	const ownNotes: Note[] = [
		{
			id: 1,
			title: "A very important note",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lectus leo, pulvinar quis rutrum et, tincidunt nec mi. Sed tempus nisi sem, et faucibus dolor rhoncus at. Fusce tempus lectus non sem pretium lacinia. Curabitur sit amet mattis ex. Nunc lacinia semper ante eget ullamcorper. Aliquam et enim a sem suscipit posuere lacinia eget purus. Proin elementum eros sit amet tellus maximus gravida. Suspendisse potenti. Nulla pellentesque, nisl a vulputate commodo, tortor dolor commodo neque, nec maximus odio purus sed ex. Donec in luctus neque, at malesuada velit. Nunc ultricies, purus eu congue ullamcorper, dolor diam mattis neque, vel porta velit nibh sed nulla.",
		},
		{
			id: 2,
			title: "This is a note",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lectus leo, ia. Curabitur siAliquam et enim a sem suscipit posuere lacinia eget purus. Proin elementum eros sit amet tellus maximus gravida. Suspendisse potenti. Nulla pellentesque, nisl a vulputate commodo, tortor dolor commodo neque, nec maximus odio purus sed ex. Donec in luctus neque, at malesuada velit. Nunc ultricies, purus eu congue ullamcorper, dolor diam mattis neque, vel porta velit nibh sed nulla.",
		},
		{
			id: 3,
			title: "Another note",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lectus leo, pulvinar quis rutrum et, tincidunt nec mi. Sed tempus nisi sem, et faucibus dolor rhoncus at. Fusce tempus lectus non sem pretium lacinia. Curabitur sit amet mattis ex. Nunc lacinia semper ante eget ullamcorper. Aliquam et enim a sem suscipit posuere lacinia eget purus. Proin elementum eros sit amet tellus maximus gravida. Suspendisse potenti. Nulla pellentesque, nisl a vulputate commodo, tortor dolor commodo neque, nec maximus odio purus sed ex. Donec in luctus neque, at malesuada velit. Nunc ultricies, purus eu congue ullamcorper, dolor diam mattis neque, vel porta velit nibh sed nulla.",
		},
		{
			id: 4,
			title: "Some note",
			content:
				"Lorem ipsum dolor sit amet, consectempus nisi sem, et faucibus dolor rhoncus at. Fusce tempus lectus",
		},
	];
	const sharedNotes: Note[] = [
		{
			id: 5,
			title: "A shared note",
			content:
				"Sed tempus nisi sem, et faucibus dolor rhoncus at. Fusce tempus lectus non sem pretium lacinia. Curabitur sit amet mattis ex. Nunc lacinia semper ante eget ullamcorper. Aliquam et enim a sem suscipit posuere lacinia eget purus. Proin elementum eros sit amet tellus maximus gravida. Suspendisse potenti. Nulla pellentesque, nisl a vulputate commodo, tortor dolor commodo neque, nec maximus odio purus sed ex. Donec in luctus neque, at malesuada velit. Nunc ultricies, purus eu congue ullamcorper, dolor diam mattis neque, vel porta velit nibh sed nulla.",
		},
	];

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
			</div>
			<div id="note-container">
				{currentNote && <SingleNote note={currentNote}></SingleNote>}
			</div>
		</div>
	);
}

export default Notes;
