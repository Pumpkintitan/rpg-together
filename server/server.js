const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const uuidv4 = require('uuid').v4;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

let rooms = {};
class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.username = 'Anon';
    this.room = null;

    socket.on('joinroom', (roomid) => this.joinroom(roomid));
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  joinroom(info) {
    if (!rooms[info.roomid]) {
      rooms[info.roomid] = new Room(info.roomid, this.io);
    }
    this.username = info.username;
    rooms[info.roomid].addUser(info.username, this);
    this.room = rooms[info.roomid];
  }
}

class Room {
  constructor(id, io) {
    this.roomid = id;
    this.io = io;
    this.users = {};
    this.gameManager = null;
  }

  addUser(username, connection) {
    this.users[username] = connection;
    this.users[username].socket.join(this.roomid);
    console.log(this.users);
    this.users[username].socket.on('message', (value) =>
      this.handleUserMessage(value, this.users[username])
    );
    console.log(`${username} connected to room ${this.roomid}`);
    this.handleServerMessage(`${username} connected to room ${this.roomid}`);
  }

  sendMessage(message) {
    this.io.to(this.roomid).emit('message', message);
    console.log(`Sent "${message.value}" to room ${this.roomid}`);
  }

  handleServerMessage(value) {
    const message = {
      type: 'server',
      id: uuidv4(),
      user: 'server',
      value,
      time: Date.now(),
    };

    this.sendMessage(message);
  }

  handleUserMessage(value, user) {
    const message = {
      type: 'user',
      id: uuidv4(),
      user: user.username,
      value,
      time: Date.now(),
    };

    this.sendMessage(message);
  }
}

io.on('connection', (socket) => {
  new Connection(io, socket);
});

httpServer.listen(8080, () =>
  console.log('listening on http://localhost:8080')
);
