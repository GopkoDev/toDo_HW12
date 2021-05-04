'use strict'

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = JSON.parse(localStorage.getItem('allData'));
if (todoData == null) todoData = [];
const saveLocalStorage = function() {
    const todoDataJ = JSON.stringify(todoData);
    localStorage.setItem('allData', todoDataJ);
    let data = localStorage.getItem('allData')

};

let i = '';

const render = function() {    
    todoList.textContent = '';
    todoCompleted.textContent ='';

    const deleteItem = function() {
        let dltItemValue = todoData.findIndex(item => item.value == i);
        todoData.splice(dltItemValue, 1);
        render()
    };


    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        };
        

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            i = item.value
            deleteItem();
            render();
        });
    });
    saveLocalStorage()
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false
    };
    todoData.push(newTodo);
    headerInput.value = '';
    };    
    render();
    
});

render();

