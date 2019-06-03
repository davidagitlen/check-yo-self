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
		});
		todoListArray = updatedArray;
		this.saveToStorage(todoListArray);
	}

	updateToDo(e) {
		this.urgency = !this.urgency;
	}

	updateTask(e) {
		for (var i = 0; i <this.taskItemArray.length; i++){
			if (this.taskItemArray[i].id == e.target.dataset.id){
				this.taskItemArray[i].checked = !this.taskItemArray[i].checked;
			}
			this.saveToStorage(todoListArray);
		}
	}

}