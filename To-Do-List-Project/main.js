//-------Model Starts-------//
let tasks = [];

//Retrive Task
const retriveTask = JSON.parse(localStorage.getItem('key'));

if (Array.isArray(retriveTask)){
    tasks = retriveTask;
}
else {
    tasks = [];
}

renderTask();

//create Task
function createTask(titleValue,toDoValue){
    const taskId = new Date().getTime().toString();
    console.log(taskId);   // It is Unnessery

    tasks.push({ title: titleValue, toDo: toDoValue, id: taskId});
    saveTaskInBrowser()
}

//Delete__Remove Task
function removeTask(removeId){
    tasks = tasks.filter( function (task) {
        if (task.id === removeId) {
            return false;
        }
        else {
            return true;
        }
    });
    saveTaskInBrowser()
}

function saveTaskInBrowser(){
    localStorage.setItem('key', JSON.stringify(tasks));
}


//------- Model Ends Here-------//



//-------Controller Start-------//
function addTask(){
    // let serialNum = tasks.length+1;
    
    let taskInput = document.querySelector('.task__input');
    let newTask = taskInput.value;

    let datePicker = document.querySelector('.date__picker');
    let dueDate = datePicker.value;

        if (newTask === '' || dueDate === '') {
        alert("oOops! 404 Error")
        } 
        else {
        taskInput.value = '';
        datePicker.value = '';
        createTask(newTask, dueDate);
        renderTask()
        }  
    
}

function deleteTask(event){
    const deleteButton = event.target;       // what the target?
    const idToBeDelete = deleteButton.id;    // which id?

    removeTask(idToBeDelete);

    renderTask();
}

//-------Controller Ends-------//



//-------View Part Start-------//
function renderTask(){
        document.querySelector('.tasks__container').innerHTML = '';
        let cnt = 0;
        
        tasks.forEach(function (task){
        let element = document.createElement('div');
        element.className = 'element__box';

        let serialElement = document.createElement('div');
        ++cnt;
        serialElement.innerText = serialConvention(cnt, tasks.length);
        serialElement.className = 'serial__element';

        let textElement = document.createElement('div');
        textElement.innerText = task.title;
        textElement.className = 'text__element';

        let toDoElement = document.createElement('div');
        toDoElement.innerText = task.toDo;
        toDoElement.className = 'todo__element';

        // element.innerText = task.serial +' '+ task.title+' '+task.toDo;
        
        const deleteButton = document.createElement('button');
        
        // deleteButton.innerText = ``;
        
        // deleteButton.style = 'margin-left: 20px; background: tomato; padding: -1px -2px; border: 1px solid gray; border-radius: 5px; background-image: url('/delete.png');';
        deleteButton.className = 'delete__btn';
        deleteButton.id = task.id;
        let taskList = document.querySelector('.tasks__container');
        
        element.appendChild(serialElement);
        element.appendChild(textElement);
        element.appendChild(toDoElement);

        taskList.appendChild(element);
        element.appendChild(deleteButton);
        
        deleteButton.onclick = deleteTask; //referance
    

    })
}

//-------View Ends-------//



//-------Utils Start-------//

function serialConvention(count, total) {
    let ans = '';
    let ct = count, num = 0;
    while (ct > 0) {
      ct = Math.floor(ct / 10);
      num++;
    }
    let n = 0, m = total;
    while (m > 0) {
      m = Math.floor(m / 10);
      n++;
    }
    for (let i = 0; i < n - num; i++) {
      ans = ans + '0';
    }
    ans = ans + count;
    return ans;
  }

//-------Utils Ends-------//