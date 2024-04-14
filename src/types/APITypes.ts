type Note = {
	id: number;
	title: string;
	content: string;
};

type NoteInput = {
	title: string;
	content: string;
};

type Card = {
	title: string;
	description: string;
};

type List = {
	title: string;
	cards: Card[];
};

export type {Note, NoteInput, Card, List};
