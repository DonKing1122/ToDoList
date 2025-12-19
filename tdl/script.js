const input = document.querySelector('input');
const add = document.querySelector('button');
const todolist = document.querySelector('.todolist')

const data = JSON.parse(localStorage.getItem('todos')) || [];

document.addEventListener('DOMContentLoaded', rendtodolist);
add.addEventListener('click', addtodo)

function rendtodolist(){

    todolist.innerHTML = '';

    data.forEach(elem => {
        const todo = document.createElement('div');
        todo.className = `todo ${elem.done ? 'active' : ''}`;

        const text = document.createElement('p');
        text.textContent = elem.title;
        todo.appendChild(text);

        const icons = document.createElement('div')
        icons.className = 'delchek';
        icons.innerHTML = `
                <a href="#"><i class="fa-solid fa-check"></i></a>
                <a href="#"><i class="fa-solid fa-trash"></i></a>
        `
        todo.appendChild(icons);

        todolist.appendChild(todo);

        todo.addEventListener('click', function (event) {
            checktodo(event, elem.id)
        });
    });
};


function checktodo(event, id) {
    if (event.target.className === 'fa-solid fa-check') {
        data.forEach(elem => {
            if(elem.id === id){
                elem.done = !elem.done;
            }
        })
    }

    if (event.target.className === 'fa-solid fa-trash') {
        data.forEach(elem =>{
            if(elem.id === id){
                data.splice(data.indexOf(elem), 1)
            }
        })
    }
    
    rendtodolist();
    localStorage.setItem('todos', JSON.stringify(data)|| [])
}

function addtodo(event){
    event.preventDefault();
    if (!input.value.trim()) {
        return
    }

    const todo = {
        id: data.length +1,
        title: input.value,
        done: false
    };
    data.push(todo);
    input.value = '';
    rendtodolist();
    localStorage.setItem('todos', JSON.stringify(data))
}

