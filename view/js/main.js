var socket = io();
var calendar = (function(global) {
  var date1 = document.getElementById("date1");
  var date14 = document.getElementById("date14");
  var date29 = document.getElementById("date29");
  var date30 = document.getElementById("date30");
  var dateArray = [date1, date14, date29, date30];
  var detailedTasks = document.getElementById("detailedTasks");
  var cancelDetailedTasks = document.getElementById("cancelDetailedTasks");
  var taskBoard = document.getElementById("taskBoard");

  var bindingHandlers = function() {
    for(var index = 0 ; index < 4 ; index++) {
      dateArray[index].addEventListener("click", function() {
        emitSocket(this.id);
      });
    }

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

  function showDetailTasks(msg) {
    detailedTasks.style.visibility = "visible";
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
  }

  function emitSocket(signal) {
    socket.emit(signal);
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
