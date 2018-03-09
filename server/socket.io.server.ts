import * as SocketIO from "socket.io";

import {SocketIOConnection} from './socket.io.connection';

export class SocketIOServer {

  private io: SocketIO.Server;

  constructor(server) {
    this.io = SocketIO(server);
    
    this.io.on("connection", (socket) => { // Use => to bind this
      let socketConnection: SocketIOConnection = new SocketIOConnection(this.io, socket);
      console.log("A user connected. Socket: " + socket.id);
      socket.on("disconnect", (msg) => {
        console.log("A user disconnected. Socket: " + socket.id);
      });

    });
  }

}