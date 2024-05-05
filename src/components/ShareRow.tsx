import {User} from "../types/APITypes";
import {doGraphQLFetch} from "../utils/fetch";
import {unshareBoard, unshareNoteWithUser} from "../utils/queries";

type ShareRowProps = {
	documentType: "note" | "board";
	documentId: string;
	collaborator: User;
	refresh: () => void;
	token: string;
};

function ShareRow({
	documentType,
	documentId,
	collaborator,
	refresh,
	token,
}: ShareRowProps) {
	const removeCollaborator = async () => {
		try {
			if (documentType === "note") {
				await doGraphQLFetch(
					unshareNoteWithUser,
					{
						noteId: documentId,
						userId: collaborator.id,
					},
					token,
				);
				refresh();
			}
			if (documentType === "board") {
				await doGraphQLFetch(
					unshareBoard,
					{
						boardId: documentId,
						userId: collaborator.id,
					},
					token,
				);
				refresh();
			}
		} catch (error) {
			alert("Could not remove collaborator");
		}
	};

	return (
		<div className="share-modal-row">
			<div className="w-[1fr]">
				<div className="w-fit">{collaborator.user_name}</div>
				<div className="w-fit">{collaborator.email}</div>
			</div>
			<button id="share-modal-remove" onClick={removeCollaborator}>
				Remove
			</button>
		</div>
	);
}

export default ShareRow;
