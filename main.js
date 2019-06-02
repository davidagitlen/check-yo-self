var todoListArray = [];
var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var taskTitleInput = document.getElementById('task-title-input');
var itemToAddList = document.getElementById('item-to-add-list');
var itemToAdd = document.getElementById('item-to-add');
var formDeleteItem = document.getElementById('form-delete-item');
var taskItemArea = document.getElementById('item-to-add-list');
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
taskItemArea.addEventListener('click', deleteTaskItem);
taskItemInput.addEventListener('keyup', handleTaskItemButton);
taskItemButton.addEventListener('click', handleTaskItemAdd);	

function handlePageLoad() {
	refillArray();
	createTaskItemArray();
	repopulateTodoList();
	placeholder();
}

function handleTaskItemAdd(e) {
	e.preventDefault();
	addTaskListItem(e, taskItemInput.value, Date.now(), false);
	handleTaskItemButton();
}

function placeholder() {
  if (todoListArray.length === 0) {
  	cardDisplayArea.insertAdjacentHTML('afterbegin', `<p>Fill out the form at left and hit "Make Task List" to start!</p>`)
	}
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
			return new TodoList(array.title, array.id, array.taskItemArray, array.urgency);
		});
		todoListArray = newArray;
	}
}

function repopulateTodoList() {
	for (var i = 0; i < todoListArray.length; i++) {
		displayTodoList(todoListArray[i]);
	}
}

function fillTaskItemArray(taskText, taskId, checked) {
	var taskItemArray = JSON.parse(localStorage.getItem('taskItemArray'));
	var taskItemArrayObj = {text : taskText, id: taskId, checked: checked}
	taskItemArray.push(taskItemArrayObj);
	localStorage.setItem('taskItemArray', JSON.stringify(taskItemArray));
}

function createTodoList() {
	var newTaskItemArray = JSON.parse(localStorage.getItem('taskItemArray'))
	var todoList = new TodoList(taskTitleInput.value, Date.now(), newTaskItemArray, false);
	todoListArray.push(todoList);
	todoList.saveToStorage(todoListArray);
	taskTitleInput.value = '';
	itemToAddList.innerHTML = '';
	displayTodoList(todoList);
	createTaskItemArray();
}

function displayTodoList(obj) {
	var listItems = createTodoListTaskList(obj.taskItemArray);
	cardDisplayArea.insertAdjacentHTML('afterbegin', `<article data-id=${obj.id}>
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

function addTaskListItem(e, taskText, taskId, checked) {
	e.preventDefault();
	itemToAddList.insertAdjacentHTML('beforeend', `<li id="item-to-add"><img src="check-yo-self-icons/delete-list-item.svg" id="form-delete-item" data-taskid=${taskId}>${taskText}</li>`);
	fillTaskItemArray(taskText, taskId, checked);
	taskItemInput.value = '';
}

function createTodoListTaskList(array) {
	var listItems = `<ul>`;
	for (var i = 0; i < array.length; i++) {
		listItems += `<li class="potential-task" id="item-to-add" ><img src="check-yo-self-icons/checkbox.svg" id="check-off-item">${array[i].text}</li>
		</ul>`
	}
	return listItems;
}

function deleteTaskItem(e) {
	e.target.closest('li').remove();
	filterTaskItemArray(e);
}

function filterTaskItemArray(e) {
	var taskItemArray = JSON.parse(localStorage.getItem('taskItemArray'));
	var filteredTaskItemArray = taskItemArray.filter(function(arrayItem){
		if(arrayItem.id != e.target.dataset.taskid){
			return arrayItem
		}
	})
	taskItemArray = localStorage.setItem('taskItemArray', JSON.stringify(filteredTaskItemArray));
}