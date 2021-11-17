import {addUserTask, getUserTask, removeTask} from './firebase.js';


let taskName = document.getElementById('taskName');
let taskDescription = document.getElementById('taskDescription');
let taskStartDate = document.getElementById('taskStartDate');
let taskEndDate = document.getElementById('taskEndDate');
let addTaskButton = document.getElementById('addTaskButton');


window.onload = setTimeout(function() { getData(); }, 2000);

function getData(){
    
        var userTaskData =  getUserTask().then((value) => {
            console.log('value: ', value.data());
            const data = value.data()
            
            const element = document.getElementById("taskView");
            if (data != null || data != undefined){
                
            for (const [k, v] of Object.entries(data)){
                console.log(k,v);
                const para = document.createElement("p");
                const title = document.createTextNode("Title: "+v['taskName']+ "   ");
                const lineBreak = document.createElement('br')
                const description = document.createTextNode("Description: "+v['taskDescription']);
                const startDate = document.createTextNode("startDate: "+ v['startDate']+"  ");
                const endDate = document.createTextNode("endDate: "+v['endDate']);
                const box = document.createElement("div");
                box.id = k;
                box.className = 'taskCard';
                para.appendChild(title);
                para.appendChild(lineBreak);
                para.appendChild(description);
                para.appendChild(lineBreak);
                para.appendChild(startDate);
                para.appendChild(endDate);
                box.appendChild(para);
                element.appendChild(box);
            }
            }
        }).catch((err) => {
            console.log(err);
        });
   
}

addTaskButton.onclick =  () => {
    const newTask = {
            'taskName' : taskName.value,
            'taskDescription' : taskDescription.value,
             'startDate': taskStartDate.value,
             'endDate': taskEndDate.value
    }
    const d = new Date();

    const userTask = {};
    userTask[d.getTime()] = newTask;
    addUserTask(userTask);
    document.getElementById('taskView').textContent = "";
    getData();

}

function deleteTask(k){
    removeTask(k);
}