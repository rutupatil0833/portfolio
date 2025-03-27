/** script.js **/
$(document).ready(function() {
     loadTasks();
 
     $('#addTask').click(function() {
         let taskText = $('#taskInput').val().trim();
         if (taskText !== '') {
             let task = { text: taskText, completed: false };
             let tasks = getTasks();
             tasks.push(task);
             saveTasks(tasks);
             $('#taskInput').val('');
             renderTasks();
         }
     });
 
     $(document).on('click', '.delete-task', function() {
         let index = $(this).parent().data('index');
         let tasks = getTasks();
         tasks.splice(index, 1);
         saveTasks(tasks);
         renderTasks();
     });
 
     $(document).on('click', '.toggle-complete', function() {
         let index = $(this).parent().data('index');
         let tasks = getTasks();
         tasks[index].completed = !tasks[index].completed;
         saveTasks(tasks);
         renderTasks();
     });
 
     $(document).on('click', '.edit-task', function() {
         let index = $(this).parent().data('index');
         let tasks = getTasks();
         let newText = prompt("Edit your task:", tasks[index].text);
         if (newText) {
             tasks[index].text = newText.trim();
             saveTasks(tasks);
             renderTasks();
         }
     });
 
     $('.filter').click(function() {
         let filter = $(this).data('filter');
         renderTasks(filter);
     });
 
     function getTasks() {
         return JSON.parse(localStorage.getItem('tasks')) || [];
     }
 
     function saveTasks(tasks) {
         localStorage.setItem('tasks', JSON.stringify(tasks));
     }
 
     function renderTasks(filter = 'all') {
         let tasks = getTasks();
         $('#taskList').empty();
         tasks.forEach((task, index) => {
             if (filter === 'pending' && task.completed) return;
             if (filter === 'completed' && !task.completed) return;
             let taskClass = task.completed ? 'completed' : '';
             $('#taskList').append(
                 `<li class="list-group-item d-flex justify-content-between align-items-center ${taskClass}" data-index="${index}">
                     <span class="toggle-complete">${task.text}</span>
                     <button class="btn btn-warning btn-sm edit-task">Edit</button>
                     <button class="btn btn-danger btn-sm delete-task">Delete</button>
                 </li>`
             );
         });
     }
 
     function loadTasks() {
         renderTasks();
     }
 });
 