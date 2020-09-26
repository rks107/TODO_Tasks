var inputTask = document.getElementById('input-task');
var countUpdateFooter = document.getElementById('count');
var notCom = document.getElementById("notcom");
var com = document.getElementById("com");
let allTasksButton = document.getElementById("notifications__all");
let remainingTasksButton = document.getElementById("notifications__remaining");
let completeTasksButton = document.getElementById("notifications__complete");
let clerAllTasksButton = document.getElementById("notifications__clear");

let JSONresult = localStorage.getItem("taskArray");
let tasks = JSON.parse(JSONresult);

updateNonCompleteTask(tasks);
updateCompleteTask(tasks);

// *********      SHOW ALL TASKS BUTTON        **********
allTasksButton.addEventListener("click", function () {
     com.style.display = "block";
     notCom.style.display = "block";
});

// *********      SHOW REAMAINING TASKS BUTTON        **********
remainingTasksButton.addEventListener("click", function () {
    com.style.display = "none";
    notCom.style.display = "block";
});

// *********      SHOW COMPLETE TASKS BUTTON        **********
completeTasksButton.addEventListener("click", function () {
    com.style.display = "block";
    notCom.style.display = "none";
});

// ************   TOTAL COUNT UPDATE   **********
function countUpdate(tasks) {
    let TotalTasksRemaining = 0;

    if(tasks != null){
        for (let task of tasks) {
          if (!task.complete) {
            TotalTasksRemaining++;
          }
        }
    }
    
    countUpdateFooter.innerHTML = TotalTasksRemaining;
}


// ************   INCOMPLETED TASKS   **********
function updateNonCompleteTask(tasks){

    countUpdate(tasks);
    
    let child = document.querySelectorAll("#notcom div");
    for (let i = 0; i < child.length; i++) {
      child[i].remove();
    }

    for (let i = 0; tasks != null && i < tasks.length; i++) {
      if (tasks[i].complete == false) {
        let task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = tasks[i].text;

        let del = document.createElement("i");
        del.classList.add("fas");
        del.classList.add("fa-trash");
        task.append(del);

        del.addEventListener('click', function(){
            tasks.splice(i,1);
            let tasksToJSON = JSON.stringify(tasks);
            localStorage.setItem("taskArray", tasksToJSON);
            updateNonCompleteTask(tasks);
        })

        let check = document.createElement("i");
        check.classList.add("fas");
        check.classList.add("fa-check");
        task.append(check);
        
        check.addEventListener("click", function () {
            let CompleteTask = {
              text: tasks[i].text,
              complete: true,
            };
          tasks.splice(i, 1);
          tasks.unshift(CompleteTask);
          let tasksToJSON = JSON.stringify(tasks);
          localStorage.setItem("taskArray", tasksToJSON);
          updateCompleteTask(tasks);
          updateNonCompleteTask(tasks);
          
        });

        notCom.append(task);
      }
    }
}

// ************   COMPLETED TASKS   **********
function updateCompleteTask(tasks){
    countUpdate(tasks);

    let child = document.querySelectorAll("#com div");
    for (let i = 0; i < child.length; i++) {
      child[i].remove();
    }

    for (let i = 0; tasks != null && i < tasks.length; i++) {
      if (tasks[i].complete == true) {
        let task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = tasks[i].text;

        let del = document.createElement("i");
        del.classList.add("fas");
        del.classList.add("fa-trash");
        task.append(del);

        del.addEventListener("click", function () {
          tasks.splice(i, 1);
          let tasksToJSON = JSON.stringify(tasks);
          localStorage.setItem("taskArray", tasksToJSON);
          updateCompleteTask(tasks);
        });

        com.append(task);
      }
    }

}




// **************     DELETE ALL TASKS   *************
clerAllTasksButton.addEventListener("click", function () {
  localStorage.clear();

  let childs = document.querySelectorAll("#com div");
  for (let child of childs) {
    child.remove();
  }
  childs = document.querySelectorAll("#notcom div");
  for (let child of childs) {
    child.remove();
  }
  countUpdateFooter.innerHTML = 0;
});



// *********    Input by Plus Icon *************
  document.querySelector(".search-box .fa-plus-circle").addEventListener("click", function () {
      if (inputTask.value === "") { 
        alert("please enter some task");
        return;
      }

      // NEW Task
      let task = {
        text: inputTask.value,
        complete: false,
      };

      let JSONString = localStorage.getItem("taskArray");
      let tasksArray = JSON.parse(JSONString);

      if (tasksArray == null) {
        tasksArray = [];
      }
      tasksArray.unshift(task);

      let tasksToJSON = JSON.stringify(tasksArray);
      localStorage.clear();
      // Tasks store in local Storage in the form of JSON
      localStorage.setItem("taskArray", tasksToJSON);

      let JSONresult = localStorage.getItem("taskArray");
      let tasks = JSON.parse(JSONresult);
      
      inputTask.value = "";

      updateNonCompleteTask(tasks);

    });


// *********    Input by Enter Key  *************  
inputTask.addEventListener("keyup", function(event){

    if(event.keyCode == 13 && inputTask.value != "") {
      // NEW TASK
      let task = {
        text: inputTask.value,
        complete: false,
      };

      let JSONString = localStorage.getItem("taskArray");
      let tasksArray = JSON.parse(JSONString);

      if (tasksArray == null) {
        tasksArray = [];
      }
      tasksArray.unshift(task);

      let tasksToJSON = JSON.stringify(tasksArray);
      localStorage.clear();
      localStorage.setItem("taskArray", tasksToJSON);

      // Tasks store in local Storage in the form of JSON
      let JSONresult = localStorage.getItem("taskArray");
      let tasks = JSON.parse(JSONresult);

      inputTask.value = "";

      updateNonCompleteTask(tasks);
    }
});


