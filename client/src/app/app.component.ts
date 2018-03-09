import { Component } from '@angular/core';
import { ChatMessage } from '../../../shared/chat.message';
import { SocketIOService} from './socket.io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Kymppitonni-noppapeli';
  public messageTextField: string  = "";
  public userName: string  = "Risujemmaaja"
  public chatMessages: Array<ChatMessage>;

  constructor(private socketIOService: SocketIOService) {
    this.chatMessages = new Array<ChatMessage>();
    this.socketIOService.onChatMessageHandler = this.onChatMessageHandler.bind(this); // remember to bind this or else shitstorms etc.
  }

  sendDontPlayJesus(): void {
    let message: ChatMessage = {name: this.userName, message: "ÄLÄ LEIKI JEESUSTA!" }
    this.sendChatMessageToServer(message);
  }

  sendDickItchyThing(): void {
    let message: ChatMessage = {name: this.userName, message: "KYRVÄNSYYLÄ!" }
    this.sendChatMessageToServer(message);
  }

  sendChatMessage(): void {
    let message: ChatMessage = {name: this.userName, message: this.messageTextField };
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

}
