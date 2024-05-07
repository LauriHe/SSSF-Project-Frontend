const getUser = "{users{id user_name email filename}}";

const getSingleUser = `query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    id
    user_name
    email
    filename
  }
}`;

const getUserByName = `query UserByName($name: String!) {
  userByName(user_name: $name) {
    id
    user_name
    email
    filename
  }
}`;

const checkToken = `query CheckToken($token: String!){
  checkToken(token: $token) {
    message
    user {
      id
      user_name
      email
      filename
    }
  }
}`;

const loginUser = `mutation Login($credentials: Credentials!) {
  login(credentials: $credentials) {
    token
    message
    user {
      id
      user_name
      email
      filename
    }
  }
}`;

const postUser = `mutation Mutation($user: UserInput!) {
  register(user: $user) {
    message
    user {
      id
      user_name
      email
      filename
    }
  }
}`;

const putUser = `mutation UpdateUser($user: UserModify!) {
  updateUser(user: $user) {
    message
    user {
      id
      user_name
      email
      filename
    }
  }
}`;

const deleteUser = `mutation DeleteUser {
  deleteUser
}`;

const getSingleNote = `query NoteById($noteId: ID!) {
  noteById(id: $noteId
  ) {
    id
    title
    content
    owner {
      id
      user_name
      email
      filename
    }
    collaborators {
      id
      user_name
      email
      filename
    }
  }
}`;

const getOwnedNotes = `query OwnedNotes {
  ownedNotes {
    id
    title
    content
    owner {
      id
      user_name
      email
      filename
    }
    collaborators {
      id
      user_name
      email
      filename
    }
  }
}`;

const getSharedNotes = `query SharedNotes {
  sharedNotes {
    id
    title
    content
    owner {
      id
      user_name
      email
      filename
    }
    collaborators {
      id
      user_name
      email
      filename
    }
  }
}`;

const createNote = `mutation CreateNote($title: String!, $content: String) {
  createNote(title: $title, content: $content) {
    message
    note {
      id
      title
      content
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const updateNote = `mutation UpdateNote($id: ID!, $title: String!, $content: String) {
  updateNote(id: $id, title: $title, content: $content) {
    message
    note {
      id
      title
      content
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const shareNoteWithUser = `mutation ShareNoteWithUser($noteId: ID!, $userId: ID!) {
  shareNoteWithUser(note_id: $noteId, user_id: $userId) {
    message
    note {
      id
      title
      content
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const unshareNoteWithUser = `mutation UnshareNoteWithUser($noteId: ID!, $userId: ID!) {
  unshareNoteWithUser(note_id: $noteId, user_id: $userId) {
    message
    note {
      id
      title
      content
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const deleteNote = `mutation DeleteNote($id: ID!) {
  deleteNote(id: $id) 
}`;

const getBoard = `query BoardById($boardId: ID!) {
  boardById(id: $boardId) {
    id
    title
    owner {
      id
      user_name
      email
      filename
    }
    collaborators {
      id
      user_name
      email
      filename
    }
  }
}`;

const getOwnedBoards = `{
  ownedBoards {
    id
    title
    owner {
      id
      user_name
      email
      filename
    }
    collaborators {
      id
      user_name
      email
      filename
    }
  }
}`;

const getSharedBoards = `{
  sharedBoards {
    id
    title
    owner {
      id
      user_name
      email
      filename
    }
    collaborators {
      id
      user_name
      email
      filename
    }
  }
}`;

const createBoard = `mutation CreateBoard($title: String!) {
  createBoard(title: $title) {
    message
    board {
      id
      title
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const updateBoard = `mutation UpdateBoard($boardId: ID!, $title: String!) {
  updateBoard(id: $boardId, title: $title) {
    message
    board {
      id
      title
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const deleteBoard = `mutation DeleteBoard($boardId: ID!) {
  deleteBoard(id: $boardId)
}`;

const shareBoard = `mutation ShareBoard($boardId: ID!, $userId: ID!) {
  shareBoardWithUser(board_id: $boardId, user_id: $userId) {
    message
    board {
      id
      title
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const unshareBoard = `mutation UnshareBoard($boardId: ID!, $userId: ID!) {
  unshareBoardWithUser(board_id: $boardId, user_id: $userId) {
    message
    board {
      id
      title
      owner {
        id
        user_name
        email
        filename
      }
      collaborators {
        id
        user_name
        email
        filename
      }
    }
  }
}`;

const getSingleList = `query ListById($listId: ID!) {
  listById(id: $listId) {
    id
    board {
      id
      title
    }
    title
  }
}`;

const getListsByBoard = `query ListsByBoard($boardId: ID!) {
  listsByBoard(board_id: $boardId) {
    id
    board {
      id
      title
    }
    title
  }
}`;

const createList = `mutation CreateList($boardId: ID!, $title: String!) {
  createList(board_id: $boardId, title: $title) {
    message
    list {
      id
      board {
        id
        title
      }
      title
    }
  }
}`;

const updateList = `mutation UpdateList($id: ID!, $title: String!) {
  updateList(id: $id, title: $title) {
    message
    list {
      id
      board {
        id
        title
      }
      title
    }
  }
}`;

const deleteList = `mutation DeleteList($id: ID!) {
  deleteList(id: $id)
}`;

const getSingleCard = `query CardById($cardId: ID!) {
  cardById(id: $cardId) {
    id
    list {
      id
      title
    }
    title
    content
  }
}`;

const getCardsByList = `query CardsByList($listId: ID!) {
  cardsByList(list_id: $listId) {
    id
    list {
      id
      title
    }
    title
    content
  }
}`;

const createCard = `mutation CreateCard($listId: ID!, $title: String!, $content: String) {
  createCard(list_id: $listId, title: $title, content: $content) {
    message
    card {
      id
      list {
        id
        title
      }
      title
      content
    }
  }
}`;

const updateCard = `mutation UpdateCard($id: ID!, $title: String, $content: String) {
  updateCard(id: $id, title: $title, content: $content) {
    message
    card {
      id
      list {
        id
        title
      }
      title
      content
    }
  }
}`;

const moveCard = `mutation MoveCard($id: ID!, $listId: ID!) {
  moveCard(id: $id, list_id: $listId) {
    message
    card {
      id
      list {
        id
        title
      }
      title
      content
    }
  }
}`;

const deleteCard = `mutation DeleteCard($id: ID!) {
  deleteCard(id: $id)
}`;

export {
	getUser,
	getSingleUser,
	getUserByName,
	checkToken,
	loginUser,
	postUser,
	putUser,
	deleteUser,
	getSingleNote,
	getOwnedNotes,
	getSharedNotes,
	createNote,
	updateNote,
	shareNoteWithUser,
	unshareNoteWithUser,
	deleteNote,
	getBoard,
	getOwnedBoards,
	getSharedBoards,
	createBoard,
	updateBoard,
	deleteBoard,
	shareBoard,
	unshareBoard,
	getSingleList,
	getListsByBoard,
	createList,
	updateList,
	deleteList,
	getSingleCard,
	getCardsByList,
	createCard,
	updateCard,
	moveCard,
	deleteCard,
};
