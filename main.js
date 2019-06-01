var todoListArray = [];
var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var taskTitleInput = document.getElementById('task-title-input');
var itemToAddList = document.getElementById('item-to-add-list');
var itemToAdd = document.getElementById('item-to-add');
var formDeleteItem = document.getElementById('form-delete-item');
var taskItemInput = document.getElementById('task-item-input');
var taskItemButton = document.getElementById('add-task-item');
var makeTaskListButton = document.getElementById('make-task-list');

var clearAllButton = document.getElementById('clear-all-button');
var filterUrgentButton = document.getElementById('filter-urgent-button');
var toggleUrgency = document.getElementById('toggle-urgency');
var deleteCardButton = document.getElementById('delete-card');

window.addEventListener('load', handlePageLoad)
makeTaskListButton.addEventListener('click', createTodoList);
taskItemButton.addEventListener('click', handleTaskItemAdd);

function handlePageLoad() {
	createTaskItemArray();
	refillArray();
}

function handleTaskItemAdd(e) {
	e.preventDefault();
	fillTaskItemArray();
	addTaskListItem(e, taskItemInput.value);
}

function createTaskItemArray() {
	localStorage.setItem('taskItemArray', JSON.stringify([]));
}

function refillArray() {
	if (JSON.parse(localStorage.getItem('todoListArray')) === null) {
		return;
	} else {
		var newArray = JSON.parse(localStorage.getItem('todoListArray')).map(function(array) {
			return new TodoList(array.title, array.taskList, array.id, array.urgency);
		});
		todoListArray = newArray;
	}
}

function fillTaskItemArray() {
	var taskItemArray = JSON.parse(localStorage.getItem('taskItemArray'))
	taskItemArray.push(taskItemInput.value);
	localStorage.setItem('taskItemArray', JSON.stringify(taskItemArray));
}

function createTodoList() {
	var taskItemArray = JSON.parse(localStorage.getItem('taskItemArray'))
	var todoList = new TodoList(taskTitleInput.value, taskItemArray, Date.now(), false);
	todoListArray.push(todoList);
	todoList.saveToStorage(todoListArray);
	taskTitleInput.value = '';
	itemToAddList.innerHTML = '';
}

function addTaskListItem(e, taskText) {
	e.preventDefault();
	itemToAddList.insertAdjacentHTML('afterbegin', `<p id="item-to-add"><img src="check-yo-self-icons/delete-list-item.svg" id="form-delete-item">${taskText}</p>`);
	taskItemInput.value = '';
}