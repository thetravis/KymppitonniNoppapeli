import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SocketIOService } from './socket.io.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//TODO: Move chat to the component of it's own.

export class AppComponent implements OnInit {
  public title = 'Kymppitonni-noppapeli';
  
  public miikkaImages: string[] = ["miikka.jpg"];

  constructor(private socketIOService: SocketIOService) {
    this.socketIOService.onImageListHandler = this.onImageListHandler.bind(this);
  }

  ngOnInit() {
    this.listImages();
  }

  private listImages() {
    this.socketIOService.listImages();
  }

  onImageListHandler(msg) {
    let images = msg.imageList;
    this.miikkaImages = images;
  }

}
