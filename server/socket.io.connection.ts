import * as SocketIO from "socket.io";

import { ChatMessage } from '../shared/chat.message';
import { UserNameMessage } from '../shared/username.message';


export class SocketIOConnection {
  private io: SocketIO.Server;
  private socket: SocketIO.Socket;
  public chatMessageHistory: Array<ChatMessage>;
  public chatMessageHistoryLength = 100;
  public userNames: Array<String>;
  public userName: string = "Risujemmaaja";

  constructor(io: SocketIO.Server, socket: SocketIO.Socket) {
    this.io = io;
    this.socket = socket;

    this.userName = "Risujemmaaja";

    this.socket.on('chatMessage', (msg) => { this.onChatMessageHandler(msg) });

    this.socket.on('userNameMessage', (msg) => { this.onUserNameMessage(msg) });


    socket.on("disconnect", (msg) => {
      console.log("A user disconnected. Socket: " + socket.id);
      this.removeUserName(this.userName);
    });

  }

  onChatMessageHandler(msg: { chatMessage: ChatMessage }): void {
    if (msg.chatMessage.message.trim() == "") {
      return;
    }
    if (msg.chatMessage.name != this.userName) {
      this.socket.emit('errorMessage', { errorMessage: 'Käyttäjätunnuksen validointi epäonnitui' });
    } else {
      this.chatMessageHistory.push(msg.chatMessage); // Save message to message history
      this.io.emit('chatMessage', { chatMessage: msg.chatMessage }) // broadcast that shit to everyone ::D
    }
  }

  sendChatHistory(): void {
    console.log("Sending chat history");
    for (let chatMessage of this.chatMessageHistory) {
      this.socket.emit('chatMessage', { chatMessage: chatMessage });
    }
  }

  onUserNameMessage(msg: {userNameMessage: UserNameMessage}): void {
    if(msg.userNameMessage.originalUserName != this.userName) {
      this.socket.emit('errorMessage', { errorMessage: 'Virhe vanhan käyttäjänimen validoinnissa' });
      return;
    }
    if(msg.userNameMessage.newUserName == this.userName) {
      let unm: UserNameMessage = {
        newUserName : this.userName,
        userNameValid: true,
        originalUserName: this.userName,
      }
      this.socket.emit('userNameMessage', {userNameMessage: unm});
      return;
    }

    for (let userName of this.userNames) {
      if (msg.userNameMessage.newUserName.toLowerCase() == userName.toLowerCase()) {
        this.socket.emit('errorMessage', { errorMessage: 'Varattu käyttäjänimi' });
        let unm: UserNameMessage = {
          newUserName : msg.userNameMessage.originalUserName,
          userNameValid: false,
          originalUserName: msg.userNameMessage.originalUserName,
        }
        this.socket.emit('userNameMessage', {userNameMessage: unm});
        return;
      }
    }

    // Username seems to be valid and not taken
    this.userName = msg.userNameMessage.newUserName;
    let unm: UserNameMessage = {
      newUserName : msg.userNameMessage.newUserName,
      userNameValid: true,
      originalUserName: msg.userNameMessage.originalUserName,
    }
    this.socket.emit('userNameMessage', {userNameMessage: unm});
    // Add username to list and remove the old one
    this.addUserName(msg.userNameMessage.newUserName);
    this.removeUserName(msg.userNameMessage.originalUserName);
  }

  addUserName(userName) {
    this.userNames.push(userName);
    this.sendUserNameList();
  }

  removeUserName(userName) {
    // Keep the legends
    if(userName == "Risujemmaaja") {
      return;
    }
    for ( let i = 0; i < this.userNames.length; i++) {
      if(this.userNames[i] == userName) {
        this.userNames.splice(i,1)
      }
    }
    this.sendUserNameList();
  }

  // Method to broadcast username list
  sendUserNameList() {
    this.io.emit('userNameListMessage', {userNameList: this.userNames});
  }

}