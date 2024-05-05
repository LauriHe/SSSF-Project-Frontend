type User = {
	id: string;
	user_name: string;
	email: string;
	filename: string;
};

type ErrorMessage = {
	errors: {
		message: string;
	};
};

type LoginInput = {
	user_name: string;
	password: string;
};

type LoginResponse = {
	login: {
		message: string;
		token: string;
		user: User;
	};
};

type RegisterInput = {
	user_name: string;
	email: string;
	password: string;
	password_repeat: string;
};

type RegisterResponse = {
	register: {
		message: string;
		user: User;
	};
};

type ModifyUserResponse = {
	updateUser: {
		message: string;
		user: User;
	};
};

type UploadResponse = {
	message: string;
	filename: string;
};

type Note = {
	id: string;
	title: string;
	content: string;
	owner: User;
	collaborators: User[];
};

type NoteInput = {
	title: string;
	content: string;
};

type Board = {
	id: string;
	title: string;
	owner: User;
	collaborators: User[];
};

type Card = {
	id: string;
	list: List;
	title: string;
	content: string;
};

type List = {
	id: string;
	board: Board;
	title: string;
};

export type {
	User,
	ErrorMessage,
	LoginInput,
	LoginResponse,
	RegisterInput,
	RegisterResponse,
	ModifyUserResponse,
	UploadResponse,
	Note,
	NoteInput,
	Board,
	Card,
	List,
};
