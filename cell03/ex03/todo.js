const ft_list = document.getElementById("ft_list");

// Load saved todos from cookies
window.onload = function () {
    const saved = getCookie("todoList");
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            todos.forEach(text => {
                createTodo(text);
            });
        } catch (e) {
            console.error("Invalid cookie data");
        }
    }
};

function addTodo() {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        createTodo(text.trim());
        saveTodos();
    }
}

function createTodo(text) {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;
    div.onclick = function () {
        if (confirm("Do you want to delete this TO DO?")) {
            div.remove();
            saveTodos();
        }
    };
    ft_list.appendChild(div);
}

function saveTodos() {
    const todos = [];
    const children = ft_list.children;
    for (let i = children.length - 1; i >= 0; i--) {
        todos.push(children[i].textContent);
    }
    setCookie("todoList", JSON.stringify(todos), 365);
}

// Cookie helpers
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, val] = cookie.split("=");
        if (key === name) return decodeURIComponent(val);
    }
    return null;
}
