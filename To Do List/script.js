document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
  
    // Add new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        newTaskInput.value = ''; // Clear input after adding
      }
    });
  
    // Function to add a new task
    function addTask(text) {
      const listItem = document.createElement('li');
      listItem.classList.add('todo-item');
  
      listItem.innerHTML = `
        <span class="task-text">${text}</span>
        <div>
          <button class="edit-btn">✏️</button>
          <button class="complete-btn">✔️</button>
          <button class="delete-btn">❌</button>
        </div>
      `;
  
      todoList.appendChild(listItem);
  
      // Edit task
      listItem.querySelector('.edit-btn').addEventListener('click', () => {
        const newText = prompt("Edit your task:", text);
        if (newText) {
          listItem.querySelector('.task-text').textContent = newText;
        }
      });
  
      // Mark task as complete
      listItem.querySelector('.complete-btn').addEventListener('click', () => {
        listItem.classList.toggle('completed');
      });
  
      // Delete task
      listItem.querySelector('.delete-btn').addEventListener('click', () => {
        todoList.removeChild(listItem);
      });
    }
  });
  