const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const uuidv4 = require('uuid').v4;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.roomid = false
    this.username = "b"

    socket.on('message', (value) => this.handleMessage(value));
    socket.on("joinroom", (roomid) => this.joinroom(roomid));
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  sendMessage(message) {
    if (this.roomid) {
      this.io.to(this.roomid).emit("message", message);
      console.log(`Sent "${message.value}" to room ${this.roomid}`)
    } else {
      this.io.sockets.emit("message", message);
      console.log(`Sent "${message.value}"`)
    }
  }

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: this.username,
      value,
      time: Date.now()
    };
    console.log(message)

    this.sendMessage(message);
  }

  joinroom(info) {
    this.roomid = info.roomid
    this.username = info.username
    console.log(`${this.username} connected to room ${this.roomid}`);
    this.socket.join(this.roomid)
    this.handleMessage(`${this.username} connected to room ${this.roomid}`)
  }
}


io.on('connection', (socket) => {
  new Connection(io, socket);   
});

httpServer.listen(8080, () => console.log('listening on http://localhost:8080') );