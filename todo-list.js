class TodoList {
	constructor(title, id, taskListArray, urgency){
		this.title = title;
		this.id = id;
		this.taskListArray = taskListArray;
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