// DOM Elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Add new todo
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function(e) {
    if(e.key === "Enter") addTodo();
});

function addTodo() {
    const text = todoInput.value.trim();
    if(text === "") return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
}

// Render todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item" + (todo.completed ? " completed" : "");
        li.dataset.id = todo.id;

        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-buttons">
                <button class="toggle-btn">${todo.completed ? "Undo" : "Complete"}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        todoList.appendChild(li);

        // Button events
        li.querySelector(".toggle-btn").addEventListener("click", () => toggleTodo(todo.id));
        li.querySelector(".edit-btn").addEventListener("click", () => editTodo(todo.id));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteTodo(todo.id));
    });
}

// Toggle complete
function toggleTodo(id) {
    todos = todos.map(todo => {
        if(todo.id === id) todo.completed = !todo.completed;
        return todo;
    });
    saveTodos();
    renderTodos();
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const newText = prompt("Edit task:", todo.text);
    if(newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
    }
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

// Save to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
