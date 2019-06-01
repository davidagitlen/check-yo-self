class TodoList {
	constructor(title, taskList, id, urgency){
		this.title = title;
		this.taskList = [];
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