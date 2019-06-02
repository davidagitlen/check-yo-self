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

	deleteFromStorage(targetTodo) {
		var updatedArray = todoListArray.filter(function(arrayItem) {
			if(arrayItem.id !== targetTodo.id) {
				return arrayItem;
			}
		})
		todoListArray = updatedArray;
		this.saveToStorage(todoListArray);
	}

	updateToDo(e) {
		if (e.target.classList.contains('urgent-icon')){
		this.urgency = !this.urgency;
	} if (e.target.classList.contains('check-off-item')){
		
	}
}

	updateTask() {

	}

}