import {useState} from "react";
import ListColumn from "../components/ListColumn";

function Boards() {
	const initLists = [
		{
			title: "To Do",
			cards: [
				{
					title: "Task 1",
					description: "This is a task",
				},
				{
					title: "Task 2",
					description: "This is another task",
				},
				{
					title: "Task 3",
					description: "This is yet another task",
				},
			],
		},
	];

	const [lists, setLists] = useState(initLists);

	const addList = () => {
		setLists([...lists, {title: "New List", cards: []}]);
	};

	const deleteList = (index: number) => {
		setLists(lists.filter((_, i) => i !== index));
	};

	return (
		<div id="board-container">
			{lists.map((list, index) => (
				<ListColumn
					key={index}
					listIndex={index}
					list={list}
					deleteList={deleteList}
				/>
			))}
			<button id="add-list-button" onClick={addList}>
				+ Add a list
			</button>
		</div>
	);
}

export default Boards;
