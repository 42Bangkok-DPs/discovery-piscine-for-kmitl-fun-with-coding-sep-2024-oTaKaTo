const todoList = document.getElementById("ft_list");
let todoId = 0;

window.onload = loadTodo;

function saveTodo() {
    const todos = [];
    const links = todoList.querySelectorAll('a');
    links.forEach(link => {
        const todo = {
            id: link.id,
            text: link.querySelector('.todo').textContent
        };
        todos.push(todo);
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/;`;
}

function loadTodo() {
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (cookieString) {
        const todos = JSON.parse(cookieString.split('=')[1]);
        todos.forEach(todo => {
            const newLink = document.createElement("a");
            const newNode = document.createElement("div");
            const textNode = document.createTextNode(todo.text);
            newNode.className = "todo";
            newNode.appendChild(textNode);
            newLink.id = todo.id;
            newLink.onclick = () => deleteTodo(newLink.id);
            newLink.appendChild(newNode);
            todoList.appendChild(newLink);
        });
        todoId = todos.length ? Math.max(...todos.map(todo => parseInt(todo.id))) + 1 : 0;
    }
}

function newTodo(){
    let todoMsg = prompt("Enter a new todo:");
    if (todoMsg){
        const newLink = document.createElement("a");
        const newNode = document.createElement("div");
        const textNode = document.createTextNode(todoMsg);
        newNode.className = "todo";
        newNode.appendChild(textNode);

        newLink.id = todoId++;
        newLink.onclick = ()=>{deleteTodo(newLink.id)};
        newLink.appendChild(newNode);
        // newLink.addEventListener("click",(event)=>{alert(event.target.id);deleteTodo(event.target.id)});
        
        todoList.insertBefore(newLink, todoList.firstChild);
        saveTodo();

    }
}

function deleteTodo(id){
    let deleteMsg = confirm("Are you sure you want to delete this todo?");
    if (deleteMsg){
        const todo = document.getElementById(id);
        console.log(id);
        todoList.removeChild(todo);
        // alert("To Do delete successfully!");
        saveTodo();
    }

}

