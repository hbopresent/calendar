var socket = io();
var calendar = (function(global) {
  // task dates
  var date1 = document.getElementById("date1");
  var date14 = document.getElementById("date14");
  var date29 = document.getElementById("date29");
  var date30 = document.getElementById("date30");
  var dateArray = [date1, date14, date29, date30];
  // array contains all date element
  var dates = document.getElementsByClassName("date");
  // detail of task
  var detailedTasks = document.getElementById("detailedTasks");
  var cancelDetailedTasks = document.getElementById("cancelDetailedTasks");
  var taskBoard = document.getElementById("taskBoard");
  var addTask = document.getElementById("addTask");
  // schedule form
  var newScheduleForm = document.getElementById("newScheduleForm");
  var cancelNewSchedule = document.getElementById("cancelNewSchedule");
  var addNewSchedule = document.getElementById("addNewSchedule");
  var scheduleContent = document.getElementById("scheduleContent");
  var scheduleDate = document.getElementById("scheduleDate");
  var scheduleTime = document.getElementById("scheduleTime");

  var bindingHandlers = function() {
    // trigger task date handler
    for(var index = 0 ; index < 4 ; index++) {
      dateArray[index].addEventListener("click", function() {
        emitSocket(this.id);
      });
    }

    // triggler focused date handler
    for(var index = 0 ; index < dates.length ; index++) {
      // elements have class date would work when they have text node
      if(dates[index].innerHTML) {
        dates[index].addEventListener("click", function() {
          focusDate(this);
        });
      }
    }

    addTask.addEventListener("click", displayNewScheduleForm);
    addNewSchedule.addEventListener("click", addNewTask);
    cancelNewSchedule.addEventListener("click", cancelNewScheduleForm);
    cancelDetailedTasks.addEventListener("click", closeDetailedTasks);
  };

  // socket handler
  var listeningSocket = function() {
    socket.on("date1Tasks", function(msg) {
      showDetailTasks(msg);
    });
    socket.on("date14Tasks", function(msg) {
      showDetailTasks(msg);
    });
    socket.on("date29Tasks", function(msg) {
      showDetailTasks(msg);
    });
    socket.on("date30Tasks", function(msg) {
      showDetailTasks(msg);
    });
  };

  function focusDate(date) {
    blurAllDates();
    // add class "focusedTaskDate" if user chooses the taskDate
    if(date.classList.contains("taskDate")) {
      date.classList.add("focusedTaskDate");
    }
    date.classList.add("focusedDate");
  }

  function blurAllDates() {
    for(var i = 0 ; i < dates.length ; i++) {
      dates[i].classList.remove("focusedDate", "focusedTaskDate");
    }
  }

  function showDetailTasks(msg) {
    setTimeout(function() {
      detailedTasks.style.visibility = "visible";
      // change icon addTask style
      addTask.classList.add("addTaskInTaskDate");
    }, 100);
    for(var i in msg) {
      createTask(msg[i]);
    }
  }

  function createTask(obj) {
    var taskItem = document.createElement("div");
    var taskItem__time = document.createElement("div");
    var taskItem__content = document.createElement("div");

    taskItem.classList.add("taskItem");
    taskItem__time.classList.add("taskItem__time");
    taskItem__content.classList.add("taskItem__content");

    taskItem__content.innerHTML = obj.content;
    taskItem__time.innerHTML = obj.time;

    taskItem.appendChild(taskItem__content);
    taskItem.appendChild(taskItem__time);
    taskBoard.appendChild(taskItem);
  }

  function closeDetailedTasks() {
    detailedTasks.style.visibility = "hidden";
    taskBoard.innerHTML = "";
    // set original icon style
    addTask.classList.remove("addTaskInTaskDate");
  }

  function emitSocket(signal) {
    socket.emit(signal);
  }

  // just create new data on DOM
  // if you want to store data you should write it to json file
  function addNewTask() {
    if(scheduleContent.innerHTML) {
      var task = {};
      task.content = scheduleContent.innerHTML;
      task.time = scheduleTime.innerHTML;
      createTask(task);
      cancelNewScheduleForm();

      // this is for demo (just show the dot under the date number)
      document.getElementById("date31").classList.add("taskDate");
    }
  }

  function displayNewScheduleForm() {
    newScheduleForm.style.height = "100%";
    newScheduleForm.style.opacity = 1;
    addTask.style.visibility = "hidden";
  }

  function cancelNewScheduleForm() {
    newScheduleForm.style.height = "0%";
    newScheduleForm.style.opacity = 0;
    addTask.style.visibility = "visible";
    scheduleContent.removeChild(scheduleContent.firstChild);
    scheduleDate.removeChild(scheduleDate.firstChild);
    scheduleTime.removeChild(scheduleTime.firstChild);
  }

  var initialize = function() {
    bindingHandlers();
    listeningSocket();
  };

  return {
    init: initialize
  }
}(window));

calendar.init();
