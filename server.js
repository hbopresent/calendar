var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var json = require("./tasks.json");

app.use("/view", express.static(__dirname + "/view/"));

io.on("connection", function(socket) {
  socket.on("date1", function(msg) {
    socket.emit("date1Tasks", json.date1);
  });
  socket.on("date14", function() {
    socket.emit("date14Tasks", json.date14);
  });
  socket.on("date29", function() {
    socket.emit("date29Tasks", json.date29);
  });
  socket.on("date30", function() {
    socket.emit("date30Tasks", json.date30);
  });
});

app.get("/", function(req, res) {
    res.sendfile("index.html");
});

http.listen("38383", function() {
  console.log("server started!!");
});
