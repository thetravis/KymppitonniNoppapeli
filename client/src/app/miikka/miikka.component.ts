import { Component, OnInit } from '@angular/core';
import { SocketIOService } from '../socket.io.service';


@Component({
  selector: 'miikka-component',
  templateUrl: './miikka.component.html',
  styleUrls: ['./miikka.component.css']
})
export class MiikkaComponent implements OnInit {

  public assetsPath = "./assets/";
  public miikkaImage: string =  "miikka.jpg";
  public miikkaImagePath: string = this.assetsPath + this.miikkaImage;
  public miikkaImages: string[] = ["miikka.jpg"];

  public miikkaVisible: boolean = true;
  public toggleMiikkaButtonText: string = "Piilota Miikka";

  constructor(private socketIOService: SocketIOService ) { 
    
  }

  ngOnInit() {
    this.miikkaImagePath = this.assetsPath + this.miikkaImage;
  }

  public onMiikkaImageList(miikkaImages: string[]) {

  }

  public onToggleMiikka() {
    if (this.miikkaVisible) {
      this.miikkaVisible = false;
      this.toggleMiikkaButtonText = "Näytä Miikka"
    } else {
      this.miikkaVisible = true;
      this.toggleMiikkaButtonText = "Piilota Miikka"
      
    }
  }

}
