import { Injectable } from "@angular/core";

import * as io from "socket.io-client";

import { ChatMessage } from '../../../shared/chat.message';
import { UserNameMessage } from '../../../shared/username.message';

/**  
 * SocketIO service that connects to the server. 
 */

export class SocketIOService {

  /** The socket that connects to the server. */
  private socket = null;

  /** Chat message handler provided by the AppComponent */
  public onChatMessageHandler = null ;

  /** Username change handler provided by the ChatComponent */
  public onUserNameMessageHandler = null;

  /** Username list handler provided by the App/ChatComponent */
  public onUserNameListMessageHandler = null;

  /** Image list handler provided by app component */
  public onImageListHandler = null;
  /**
   * Constructor tells the service what to do on different event 
   * emitted by the server/socket. 
   */

  constructor() {
    this.socket = io();
    
    // Handler chat messages
    this.socket.on("chatMessage", (data) => {
      if (!(this.onChatMessageHandler == null)) {
        this.onChatMessageHandler(data);
      }
    });
    // Handle user name messages
    this.socket.on("userNameMessage", (data) => {
      if (!(this.onUserNameMessageHandler == null)) {
        this.onUserNameMessageHandler(data);
      }
    });

    // Hanlde arising errors
    this.socket.on("errorMessage", (data) => {
      if (!(this.onErrorMessageHandler == null)) {
        this.onErrorMessageHandler(data);
      }
    });

    // Handler for user name list
    this.socket.on("userNameListMessage", (data) => {
      if (!(this.onUserNameListMessageHandler == null)) {
        this.onUserNameListMessageHandler(data);
      }
    });


    // Handler for user name list
    this.socket.on("imageList", (data) => {
      if (!(this.onImageListHandler == null)) {
        this.onImageListHandler(data);
      }
    });
  }

  public sendChatMessage(chatMessage: ChatMessage ): void {
    this.socket.emit("chatMessage", { chatMessage: chatMessage });
  }

  public sendUserNameMessage(userNameMessage: UserNameMessage): void {
    this.socket.emit("userNameMessage", { userNameMessage: userNameMessage });
  }

  private onErrorMessageHandler(data) {
    console.log(data);
    alert(data.errorMessage);
  }

  public listImages() {
    this.socket.emit("listImages");
  }

}