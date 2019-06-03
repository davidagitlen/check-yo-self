var todoListArray = [];
var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');
var taskTitleInput = document.getElementById('task-title-input');
var itemToAddList = document.getElementById('item-to-add-list');
var itemToAdd = document.getElementById('item-to-add');
var taskItemArea = document.getElementById('item-to-add-list');
var taskItemInput = document.getElementById('task-item-input');
var taskItemButton = document.getElementById('add-task-item');
var makeTaskListButton = document.getElementById('make-task-list');
var clearAllButton = document.getElementById('clear-all-button');
var filterUrgentButton = document.getElementById('filter-urgent-button');
var cardDisplayArea = document.getElementById('card-display-area');
var clearAllButton = document.getElementById('clear-all-button');
var placeholderText = document.getElementById('placeholder-text');
var urgentPlaceholder = document.getElementById('urgent-placeholder');

window.addEventListener('load', handlePageLoad);
searchInput.addEventListener('keyup', handleSearch);
makeTaskListButton.addEventListener('click', createTodoList);
makeTaskListButton.addEventListener('click', handleMakeTaskButton);
taskItemArea.addEventListener('click', deleteTaskItem);
taskItemInput.addEventListener('keyup', handleTaskItemInput)
taskTitleInput.addEventListener('keyup', handleMakeTaskButton);
taskItemButton.addEventListener('click', handleTaskItemAdd);	
clearAllButton.addEventListener('click', handleClearAll);
clearAllButton.addEventListener('click', handleMakeTaskButton);
filterUrgentButton.addEventListener('click', searchUrgent);
cardDisplayArea.addEventListener('click', deleteTodoList);	
cardDisplayArea.addEventListener('click', toggleUrgency);
cardDisplayArea.addEventListener('click', toggleCheck);

function handlePageLoad() {
	refillArray();
	createTaskItemArray();
	repopulateTodoList();
	handleClearAll();
	placeholder();
	urgentPlaceholderOnLoad();
}

function handleTaskListButton() {
	createTodoList();
	handleTaskItemButton();
}

function handleTaskItemAdd(e) {
	e.preventDefault();
	addTaskListItem(e, taskItemInput.value, Date.now(), false);
	disableTaskItemButton();
	disableClearAll();
	disableMakeTaskButton();
}

function handleTaskItemInput(e) {
	disableTaskItemButton();
	disableClearAll();
	disableMakeTaskButton();
}

function handleClearAll(e) {
	clearAll();
	disableClearAll();
	disableMakeTaskButton();
	disableTaskItemButton();
}

function handleMakeTaskButton(e) {
	disableMakeTaskButton();
	disableClearAll();
	disableTaskItemButton();
}

function disableClearAll() {
	var li = document.getElementById('item-to-add')
	var item = document.getElementById('item-to-add-list').contains(li);
	clearAllButton.disabled = !taskTitleInput.value && !item;
}

function disableTaskItemButton() {
	taskItemButton.disabled = !taskItemInput.value;
}

function disableMakeTaskButton() {
	var li = document.getElementById('item-to-add')
	var item = document.getElementById('item-to-add-list').contains(li);
	makeTaskListButton.disabled = !taskTitleInput.value || !item;
}

function createTaskItemArray() {
	localStorage.setItem('taskItemArray', JSON.stringify([]));
}

function placeholder() {
  if (todoListArray.length === 0) {
    placeholderText.classList.remove('hidden');
  } else if (todoListArray.length !== 0) {
    placeholderText.classList.add('hidden');
  }
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
	placeholderText.classList.add('hidden');
	var unchecked = enableDeleteButtons(obj);
	var disabled = unchecked.length === 0 ? '' : 'disabled'; 
	var disabledClass = unchecked.length === 0 ? '' : 'disabled';
	var listItems = createTodoListTaskList(obj.taskItemArray);
	var urgencyPath = obj.urgency ? 'check-yo-self-icons/urgent-active.svg' : 'check-yo-self-icons/urgent.svg';
	var urgentClass = obj.urgency ? 'urgent' : '';
	cardDisplayArea.insertAdjacentHTML('afterbegin', `<article class='todo-list ${urgentClass}' data-id=${obj.id}>
			<header>${obj.title}</header>
			<output>
				${listItems}
			</output>
			<footer>
				<div>
					<img src="${urgencyPath}" class="urgent-icon" id="toggle-urgency">
					<p>URGENT</p>
				</div>
				<div>
					<input type="image" src="check-yo-self-icons/delete.svg" class="delete-icon ${disabledClass}" id="delete-card" ${disabled}>
					<p>DELETE</p>
				</div>
			</footer>			
		</article>`)
}

function addTaskListItem(e, taskText, taskId, checked) {
	e.preventDefault();
	itemToAddList.insertAdjacentHTML('beforeend', 
		`<li id="item-to-add">
		<img src="check-yo-self-icons/delete-list-item.svg" id="form-delete-item" data-id=${taskId}>
		${taskText}
		</li>`);
	fillTaskItemArray(taskText, taskId, checked);
	taskItemInput.value = '';
}

function createTodoListTaskList(array) {
	var listItems = `<ul>`;
	for (var i = 0; i < array.length; i++) {
		var checkedPath = array[i].checked ? 'check-yo-self-icons/checkbox-active.svg' : 'check-yo-self-icons/checkbox.svg';
		var italicClass = array[i].checked ? 'italic' : ''
		listItems += `<li class="potential-task ${italicClass}" id="item-to-add" ><img src="${checkedPath}" class="check-off-item" id="check-off-item" data-id=${array[i].id}>${array[i].text}</li>
		</ul>`
	}
	return listItems;
}

function deleteTaskItem(e) {
	if (e.target.id === 'form-delete-item') {
	e.target.closest('li').remove();
	filterTaskItemArray(e);
	}
	handleMakeTaskButton();
	placeholder();
}

function filterTaskItemArray(e) {
	var taskItemArray = JSON.parse(localStorage.getItem('taskItemArray'));
	var filteredTaskItemArray = taskItemArray.filter(function(arrayItem){
		if(arrayItem.id != e.target.dataset.id){
			return arrayItem
		}
	})
	taskItemArray = localStorage.setItem('taskItemArray', JSON.stringify(filteredTaskItemArray));
}

function clearAll(){
	taskTitleInput.value = '';
	taskItemInput.value = '';
	itemToAddList.innerHTML = '';
	createTaskItemArray();
}

function deleteTodoList(e) {
	if (e.target.classList.contains('delete-icon')) {
		e.target.closest('.todo-list').remove();
		var todoList = getTodoListFromArray(e);
		todoList.deleteFromStorage(todoList);
	}
	placeholder();
}

function getTodoListFromArray(e) {
	var todoListId = e.target.closest('.todo-list').getAttribute('data-id');
	var targetTodoList = findTodoList(todoListId);
	return targetTodoList;
}

function findTodoList(id) {
	return todoListArray.find(function(todo) {
		return todo.id == id;
	});
}

function toggleUrgency(e) {
	if (e.target.classList.contains('urgent-icon')) {
		var targetTodoList = getTodoListFromArray(e);
		targetTodoList.updateToDo(e);
		var urgencyPath = targetTodoList.urgency ? 'check-yo-self-icons/urgent-active.svg' : 'check-yo-self-icons/urgent.svg'
		e.target.setAttribute('src', urgencyPath);
		targetTodoList.saveToStorage(todoListArray);
	 	e.target.closest('article').classList.toggle('urgent');
	}
}

function toggleCheck(e) {
	if(e.target.className === 'check-off-item'){
		var targetTodoList = getTodoListFromArray(e);
		targetTodoList.updateTask(e);
		for (var i = 0; i < targetTodoList.taskItemArray.length; i++){
			if (targetTodoList.taskItemArray[i].id == e.target.dataset.id){
				var checkedPath = targetTodoList.taskItemArray[i].checked ? 'check-yo-self-icons/checkbox-active.svg' : 'check-yo-self-icons/checkbox.svg';
				e.target.setAttribute('src', checkedPath)
			}
			toggleItalics(e);
			targetTodoList.saveToStorage(todoListArray);
		}
		disableDeleteButton(e, targetTodoList);
	}	
}

function toggleItalics(e) {
	if (e.target.closest('li').classList.contains('italic')) {
		e.target.closest('li').classList.remove('italic');
	} else (e.target.closest('li').classList.add('italic'));
}

function disableDeleteButton(e, checkedList) {
	var deleteButton = e.target.closest('.todo-list').querySelector('.delete-icon');
	var uncheckedItemsArray = checkedList.taskItemArray.filter(function(listitem) {
		return listitem.checked === false; 
	})
	deleteButton.disabled = uncheckedItemsArray.length !== 0
	if (uncheckedItemsArray.length === 0) {
		deleteButton.classList.remove('disabled')
	} else {
		deleteButton.classList.add('disabled');
	}
}

function enableDeleteButtons(todoList) {
	for (var i = 0; i < todoList.taskItemArray.length; i++){
		var uncheckedItemsArray = todoList.taskItemArray.filter(function(listitem){
			return listitem.checked === false;
		});
	}
	return uncheckedItemsArray;
}

function handleSearch(e) {
	cardDisplayArea.innerHTML = '';
	var searchText = searchInput.value.toLowerCase();
		searchFilter(e, searchText);
}

function searchFilter(e, searchText) {
	if (filterUrgentButton.classList.contains('search-urgent')){
		var filteredTodos = todoListArray.filter(function(todoList) {
			return (todoList.title.toLowerCase().includes(searchText) && todoList.urgency === true)
		});
		filteredTodos.forEach(function(todoList) {
			displayTodoList(todoList);
		});
	} else {
		var filteredTodos = todoListArray.filter(function(todoList) {
			return (todoList.title.toLowerCase().includes(searchText))
		});
		filteredTodos.forEach(function(todoList) {
			displayTodoList(todoList);
		});
	}
}

function searchUrgent(e) {
	filterUrgentButton.classList.toggle('search-urgent');
	if (e.target.classList.contains('search-urgent')) {
		cardDisplayArea.innerHTML = '';
		var filteredTodos = todoListArray.filter(function(todoList) {
			return (todoList.urgency === true)
		});
		filteredTodos.forEach(function(todoList) {
			displayTodoList(todoList);
		});
		urgentPlaceholderOnSearch(filteredTodos);
	} else if (!e.target.classList.contains('search-urgent')) {
		cardDisplayArea.innerHTML = '';
		repopulateTodoList();
	}
}

function urgentPlaceholderOnLoad() {
	cardDisplayArea.removeChild(urgentPlaceholder);
}

function urgentPlaceholderOnSearch(array) {
	if(array.length === 0) {
		cardDisplayArea.appendChild(urgentPlaceholder);
	}
}