$(document).ready(function () {
    loadTodos();

    $('#newTodo').on('click', function () {
        let text = prompt("Enter a new TO DO:");
        if (text && text.trim() !== "") {
            createTodo(text.trim());
            saveTodos();
        }
    });

    function createTodo(text) {
        const $div = $('<div class="todo"></div>').text(text);
        $div.on('click', function () {
            if (confirm("Do you want to delete this TO DO?")) {
                $div.remove();
                saveTodos();
            }
        });
        $('#ft_list').append($div);
    }

    function saveTodos() {
        const todos = [];
        $('#ft_list .todo').each(function () {
            todos.unshift($(this).text()); // reverse order
        });
        document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/; max-age=31536000";
    }

    function loadTodos() {
        const cookie = getCookie("todoList");
        if (cookie) {
            try {
                const todos = JSON.parse(cookie);
                for (let text of todos) {
                    createTodo(text);
                }
            } catch (e) {
                console.error("Invalid cookie data");
            }
        }
    }

    function getCookie(name) {
        let cookies = document.cookie.split('; ');
        for (let c of cookies) {
            let [key, val] = c.split('=');
            if (key === name) return decodeURIComponent(val);
        }
        return null;
    }
});
