import * as SocketIO from "socket.io";

import { ChatMessage} from '../shared/chat.message'

export class SocketIOConnection {
  private io: SocketIO.Server;
  private socket: SocketIO.Socket

  constructor(io: SocketIO.Server, socket: SocketIO.Socket) {
    this.io = io;
    this.socket = socket;

    this.socket.on('chatMessage', (msg) => { this.onChatMessageHandler(msg) } );

  }

  onChatMessageHandler(msg: {chatMessage: ChatMessage}): void {
    this.io.emit('chatMessage', {chatMessage: msg.chatMessage}) // broadcast that shit to 
  }

}