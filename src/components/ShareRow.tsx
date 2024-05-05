import {useEffect} from "react";
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

	useEffect(() => {
		const fileUrl = import.meta.env.VITE_FILE_URL as string;
		const pictureUrl = fileUrl + "/" + collaborator.filename;
		if (collaborator.filename === "") return;
		const pictureElement: HTMLElement | null = document.querySelector(
			"#profile-picture-share",
		);
		if (pictureElement) {
			pictureElement.style.backgroundImage = `url(${pictureUrl})`;
		}
	}, []);

	return (
		<div className="share-modal-row">
			<div className="flex items-center gap-[1em]">
				<div
					id="profile-picture-share"
					className={"profile-pic bg-[url(./default-profile.jpg)]"}
				></div>
				<div>
					<div className="w-fit">{collaborator.user_name}</div>
					<div className="w-fit">{collaborator.email}</div>
				</div>
			</div>
			<button id="share-modal-remove" onClick={removeCollaborator}>
				Remove
			</button>
		</div>
	);
}

export default ShareRow;
