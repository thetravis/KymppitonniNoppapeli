import * as SocketIO from "socket.io";

import {SocketIOConnection} from './socket.io.connection';

import { ChatMessage} from '../shared/chat.message';
import { UserNameMessage } from '../shared/username.message';

export class SocketIOServer {

  private io: SocketIO.Server;
  
  private chatMessageHistory: Array<ChatMessage>;
  private chatMessageHistoryLength = 100;
  private userNames: Array<String>;
  

  constructor(server) {
    this.io = SocketIO(server);
    
    this.chatMessageHistory = new Array<ChatMessage>();
    this.chatMessageHistoryLength = 100;

    this.userNames = ["Risujemmaaja"]; // Default username
    
    this.io.on("connection", (socket) => { // Use => to bind this
      let socketConnection: SocketIOConnection = new SocketIOConnection(this.io, socket);
      
      socketConnection.chatMessageHistory = this.chatMessageHistory;
      socketConnection.chatMessageHistoryLength = this.chatMessageHistoryLength;
      socketConnection.userNames = this.userNames;

      console.log("Perkele");
      console.log("A user connected. Socket: " + socket.id);
      // Send chat history to client
      socketConnection.sendChatHistory();

      socket.on("disconnect", (msg) => {
        console.log("A user disconnected. Socket: " + socket.id);
      });

    });
  }

}