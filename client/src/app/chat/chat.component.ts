import { Component, OnInit } from '@angular/core';

import { ChatMessage } from '../../../../shared/chat.message';
import { UserNameMessage } from '../../../../shared/username.message';


import { SocketIOService} from '../socket.io.service';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messageTextField: string  = "";
  public userName: string  = "Anonymous"
  public validatedUserName: string = "Anonymous"
  public userNames: string[] = ["Anonymous"];
  public userNameValid: boolean = false;
  public chatMessages: Array<ChatMessage>;

  constructor(private socketIOService: SocketIOService) {
    this.chatMessages = new Array<ChatMessage>();
    this.socketIOService.onChatMessageHandler = this.onChatMessageHandler.bind(this); // remember to bind this or else shitstorms etc.
    this.socketIOService.onUserNameMessageHandler = this.onUserNameMessageHandler.bind(this); // remember to bind this or else shitstorms etc.
    this.socketIOService.onUserNameListMessageHandler = this.onUserNameListMessageHandler.bind(this) // forgot to bind this...  
  }


  ngOnInit() {
  }

  onSendChatMessage(): void {
    let message: ChatMessage = {name: this.validatedUserName, message: this.messageTextField };
    this.sendChatMessageToServer(message);
    this.messageTextField = "";
  }

  sendChatMessageToServer(message: ChatMessage): void {
    this.socketIOService.sendChatMessage(message);
  }

  onChatMessageHandler(msg: {chatMessage: ChatMessage}) {
    console.log(this.chatMessages);
    this.chatMessages.push(msg.chatMessage);
  }

  onChangeUserName() {
    let msg: UserNameMessage = {
      newUserName: this.userName, 
      userNameValid: true, // TODO: Do some validation on client side also?
      originalUserName: this.validatedUserName
    }
    this.socketIOService.sendUserNameMessage(msg);
  }
  
  onUserNameMessageHandler(msg: {userNameMessage: UserNameMessage} ) {
    let userNameMessage = msg.userNameMessage;
    if(userNameMessage.userNameValid) {
      this.userName = userNameMessage.newUserName;
      this.validatedUserName = userNameMessage.newUserName;
      this.userNameValid = userNameMessage.userNameValid;
    } else {
      this.userNameValid = userNameMessage.userNameValid; 
      this.userName = userNameMessage.originalUserName;
      this.userNameValid = true;
    }
  }

  onUserNameListMessageHandler(msg: {userNameList: string[]}) {
    console.log(msg);
    this.userNames = msg.userNameList;
  }

  getUserNames(): string[] {
    return this.userNames;
  }

}
