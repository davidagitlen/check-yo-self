var todoListArray = [];
var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var taskTitleInput = document.getElementById('task-title-input');
var itemToAddList = document.getElementById('item-to-add-list');
var itemToAdd = document.getElementById('item-to-add');
var formDeleteItem = document.getElementById('form-delete-item');
var taskItemInput = document.getElementById('task-item-input');
var taskItemButton = document.getElementById('add-task-item');
var makeTaskListBUtton = document.getElementById('make-task-list');
var clearAllButton = document.getElementById('clear-all-button');
var filterUrgentButton = document.getElementById('filter-urgent-button');
var toggleUrgency = document.getElementById('toggle-urgency');
var deleteCardButton = document.getElementById('delete-card');

function createTodoList() {
	var todoList = new TodoList(taskTitleInput.value, )
}