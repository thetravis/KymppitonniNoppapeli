import { Component } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Kymppitonni-noppapeli';
  chatTextField = "";
  messageTextField = "";
  userName = "MyUserName"
  chatMessages = [{name: "Niemo", message: "Perkele" },
  { name: "Heikki", message: "Niinpä" },
 ]

  sendDontPlayJesus(): void {
    let message = {name: this.userName, message: "ÄLÄ LEIKI JEESUSTA!" }
    this.chatMessages.push(message);
  }

  sendDickItchyThing(): void {
    let message = {name: this.userName, message: "KYRVÄNSYYLÄ!" }
    this.chatMessages.push(message);
  }

  sendChatMessage(): void {
    let message = {name: this.userName, message: this.messageTextField }
    this.chatMessages.push(message);
    this.messageTextField = "";
  }

}
