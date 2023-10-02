// Model
const model = {
    todos: [],
    addTodo: function(todo) {
        this.todos.push(todo);
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },
    editTodo: function(index, updatedTodo) {
        this.todos[index] = updatedTodo;
    }
};

// View
const view = {
    todoList: document.getElementById("todo-list"),
    renderTodo: function(todo) {
        const todoItem = document.createElement("li");
        todoItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");  // Bootstrap classes

        const todoText = document.createElement("span");
        todoText.textContent = todo;
        todoItem.appendChild(todoText);

        const buttonGroup = document.createElement("div");  // Container for buttons
        buttonGroup.classList.add("btn-group");

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("btn", "btn-outline-primary", "btn-sm", "me-2");  // Bootstrap classes
        buttonGroup.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm");  // Bootstrap classes
        buttonGroup.appendChild(deleteButton);

        editButton.addEventListener("click", function() {
            const input = document.createElement("input");
            input.type = "text";
            input.value = todoText.textContent;
            input.classList.add("form-control");  // Bootstrap class
            todoItem.replaceChild(input, todoText);

            input.addEventListener("blur", function() {
                const index = Array.from(view.todoList.children).indexOf(todoItem);
                model.editTodo(index, input.value);
                todoText.textContent = input.value;
                todoItem.replaceChild(todoText, input);
            });

            input.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    input.blur();
                }
            });
        });

        deleteButton.addEventListener("click", function() {
            const index = Array.from(view.todoList.children).indexOf(todoItem);
            model.deleteTodo(index);
            view.removeTodo(todoItem);
        });

        todoItem.appendChild(buttonGroup);
        this.todoList.appendChild(todoItem);
    },
    removeTodo: function(todoItem) {
        this.todoList.removeChild(todoItem);
    }
};

// Controller
const controller = {
    init: function() {
        const todoForm = document.getElementById("todo-form");
        todoForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const todoInput = document.getElementById("todo-input");
            const todo = todoInput.value;
            if (todo.trim() !== "") {
                model.addTodo(todo);
                view.renderTodo(todo);
                todoInput.value = "";
            }
        });
    }
};

controller.init();