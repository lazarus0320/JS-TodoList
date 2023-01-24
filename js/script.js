const todoInput = document.querySelector('input');
const todo = document.querySelector('.list-group');
const submitBtn = document.getElementById('submitbtn');

let todoList = [];

function setting() {
  loadStorage();
  submitBtn.addEventListener('click', createList);
}
setting();

function loadStorage() {
  const storedTodo = localStorage.getItem('TODO');
  if (storedTodo != null) {
    const myTodoList = JSON.parse(storedTodo);
    myTodoList.forEach((todo) => {
      const { text } = todo;
      const { checked } = todo;
      printTodo(text, checked);
      storeTodo(text, checked);
    });
  }
}

function createList(e) {
  e.preventDefault();
  const todoValue = todoInput.value;
  if (todoValue == '') alert('할 일을 입력해주세요.');
  else {
    printTodo(todoValue, 0);
    storeTodo(todoValue, 0);
    todoInput.value = '';
  }
}

function storeTodo(todoValue, checkValue) {
  const todoListObj = {
    text: todoValue,
    id: todoList.length + 1,
    checked: checkValue,
  };
  todoList.push(todoListObj);
  localStorage.setItem('TODO', JSON.stringify(todoList));
}

function printTodo(todoValue, checkValue) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  delBtn.innerText = '❌';
  delBtn.id = 'delete-btn';
  delBtn.className = 'btn btn-light';
  if (checkValue == 1) {
    span.innerHTML = todoValue;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = todoList.length + 1;
    li.style.color = '#ccc';
    li.style.textDecoration = 'line-through';
    li.classList.add('list-group-item');
    todo.appendChild(li);
  } else {
    span.innerHTML = todoValue;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.classList.add('list-group-item');
    li.id = todoList.length + 1;
    todo.appendChild(li);
  }
  span.addEventListener('click', checkTodo);
  delBtn.addEventListener('click', deleteTodo);
}

function deleteTodo(e) {
  const { target: button } = e;
  const li = button.parentNode;
  todo.removeChild(li);
  todoList = todoList.filter((todo) => todo.id != Number(li.id));
  localStorage.setItem('TODO', JSON.stringify(todoList));
}

function checkTodo(e) {
  const { target: span } = e;
  const li = span.parentNode;
  li.style.color = '#ccc';
  li.style.textDecoration = 'line-through';
  todoList.forEach((currentElement) => {
    if (currentElement.id == Number(li.id)) currentElement.checked = 1;
  });
  localStorage.setItem('TODO', JSON.stringify(todoList));
}
