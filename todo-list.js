class TodoList {
	constructor(title, taskListArray, id, urgency){
		this.title = title;
		this.taskListArray = [];
		this.id = id;
		this.urgency = urgency || false;
	}

	saveToStorage(todoListArray) {
		localStorage.setItem('todoListArray', JSON.stringify(todoListArray));
	}

	deleteFromStorage() {

	}

	updateToDo() {

	}

	updateTask() {

	}

}