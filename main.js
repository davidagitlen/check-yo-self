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
var cardDisplayArea = document.getElementById('card-display-area');

window.addEventListener('load', handlePageLoad)
makeTaskListButton.addEventListener('click', createTodoList);
taskItemInput.addEventListener('keyup', handleTaskItemButton);
taskItemButton.addEventListener('click', handleTaskItemAdd);	

function handlePageLoad() {
	createTaskItemArray();
	refillArray();
}

function handleTaskItemAdd(e) {
	e.preventDefault();
	fillTaskItemArray();
	addTaskListItem(e, taskItemInput.value);
	handleTaskItemButton();
}

function handleTaskItemButton() {
	taskItemButton.disabled = !taskItemInput.value;
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
	var taskItemArrayObj = {text : taskItemInput.value, id: Date.now(), checked: false}
	taskItemArray.push(taskItemArrayObj);
	localStorage.setItem('taskItemArray', JSON.stringify(taskItemArray));
}

function createTodoList() {
	var newTaskItemArray = JSON.parse(localStorage.getItem('taskItemArray'))
	var todoList = new TodoList(taskTitleInput.value, newTaskItemArray, Date.now(), false);
	todoListArray.push(todoList);
	todoList.saveToStorage(todoListArray);
	taskTitleInput.value = '';
	itemToAddList.innerHTML = '';
	displayTodoList(todoList);
}


function displayTodoList(obj) {
	var taskItemArray = JSON.parse(localStorage.getItem('taskItemArray'))
	var listItems = createTodoListTaskList(taskItemArray);
	cardDisplayArea.insertAdjacentHTML('afterbegin', `<article data-id=>
			<header>${obj.title}</header>
			<output>
				${listItems}
			</output>
			<footer>
				<div>
					<img src="check-yo-self-icons/urgent.svg" class="urgent-icon" id="toggle-urgency">
					<p>URGENT</p>
				</div>
				<div>
					<img src="check-yo-self-icons/delete.svg" class="delete-icon" id="delete-card">
					<p>DELETE</p>
				</div>
			</footer>			
		</article>`)
}

function createTodoListTaskList(list) {
	var listItems = `<ul>`;
	for (var i = 0; i < list.length; i++) {
		listItems += `<li id="item-to-add"><img src="check-yo-self-icons/delete-list-item.svg" id="form-delete-item">${list[i].text}</li>`
	}
	return listItems;
}

function addTaskListItem(e, taskText) {
	e.preventDefault();
	itemToAddList.insertAdjacentHTML('beforeend', `<li id="item-to-add"><img src="check-yo-self-icons/delete-list-item.svg" id="form-delete-item">${taskText}</li>`);
	taskItemInput.value = '';
}

