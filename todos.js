document.getElementById('fetch-todos').addEventListener('click', async function() {
    const userid = localStorage.getItem('userid');
    const userAuthtoken = localStorage.getItem('localaccesstoken');
    
    try {
        const response = await fetch(`https://json-with-auth.onrender.com/todos?userId=${userid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userAuthtoken}`
            }
        });
        
        if (response.ok) {
            const todos = await response.json();
            displayTodos(todos);
        } else {
            console.error('Failed to fetch todos');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear existing todos
    
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.title;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function() {
            toggleTodoCompletion(todo.id, checkbox.checked);
        });
        
        listItem.appendChild(checkbox);
        todoList.appendChild(listItem);
    });
}


async function toggleTodoCompletion(todoId, isCompleted) {
    const userAuthtoken = localStorage.getItem('localaccesstoken');
    
    try {
        const response = await fetch(`https://json-with-auth.onrender.com/todos/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${userAuthtoken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: isCompleted })
        });
        
        if (!response.ok) {
            console.error('Failed to update todo');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
