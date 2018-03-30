import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import { SocketIOService } from './socket.io.service';
import { ChatComponent } from './chat/chat.component';
import { MiikkaComponent } from './miikka/miikka.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MiikkaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SocketIOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
