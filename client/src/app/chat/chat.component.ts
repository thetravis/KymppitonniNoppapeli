import { Component, OnInit } from '@angular/core';

import { ChatMessage } from '../../../../shared/chat.message';

import { SocketIOService} from '../socket.io.service';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messageTextField: string  = "";
  public userName: string  = "Risujemmaaja"
  public validatedUserName: string = "Risujemmaaja"
  public userNameValid: boolean = false;
  public chatMessages: Array<ChatMessage>;

  constructor(private socketIOService: SocketIOService) {
    this.chatMessages = new Array<ChatMessage>();
    this.socketIOService.onChatMessageHandler = this.onChatMessageHandler.bind(this); // remember to bind this or else shitstorms etc.
  }

  ngOnInit() {
  }

  onSendDontPlayJesus(): void {
    let message: ChatMessage = {name: this.userName, message: "ÄLÄ LEIKI JEESUSTA!" }
    this.sendChatMessageToServer(message);
  }

  onSendDickItchyThing(): void {
    let message: ChatMessage = {name: this.userName, message: "KYRVÄNSYYLÄ!" }
    this.sendChatMessageToServer(message);
  }

  onSendChatMessage(): void {
    let message: ChatMessage = {name: this.validatedUserName, message: this.messageTextField };
    this.sendChatMessageToServer(message);
    this.messageTextField = "";
  }

  sendChatMessageToServer(message: ChatMessage): void {
    this.socketIOService.sendChatMessageToServer(message);
  }

  onChatMessageHandler(msg: {chatMessage: ChatMessage}) {
    console.log(this.chatMessages);
    this.chatMessages.push(msg.chatMessage);
  }

  onChangeUserName() {
    let msg= {
      newUserName: this.userName, 
      userNameValid: true,
      originalUserName: this.validatedUserName
    }
    this.onUserNameChangedHandler(msg);
  }
  
  onUserNameChangedHandler(msg) {
    if(msg.userNameValid) {
      this.userName = msg.newUserName;
      this.validatedUserName = msg.originalUserName;
      this.userNameValid = msg.userNameValid;
    } else {
      this.userNameValid = msg.userNameValid; 
      alert('Sattui pieni hups: Viallinen nimi.');
      this.userName = msg.originalUserName;
      this.userNameValid = true;

    }
  }

}
