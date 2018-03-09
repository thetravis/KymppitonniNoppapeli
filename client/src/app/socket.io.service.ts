import { Injectable } from "@angular/core";

import * as io from "socket.io-client";

import { ChatMessage } from '../../../shared/chat.message';

/**  
 * SocketIO service that connects to the server. 
 */

@Injectable()
export class SocketIOService {

  /** The socket that connects to the server. */
  private socket = null;

  /** Chat message handler */
  public onChatMessageHandler = null ;

  /**
   * Constructor tells the service what to do on different event 
   * emitted by the server/socket. 
   */

  constructor() {
    this.socket = io();
    this.socket.on("chatMessage", (data) => {
      if (!(this.onChatMessageHandler == null)) {
        this.onChatMessageHandler(data);
      }
    });
  }

  sendChatMessageToServer(chatMessage: ChatMessage ): void {
    this.socket.emit("chatMessage", { chatMessage: chatMessage });
  }

}