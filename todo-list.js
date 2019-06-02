class TodoList {
	constructor(title, id, taskItemArray, urgency){
		this.title = title;
		this.id = id;
		this.taskItemArray = taskItemArray;
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