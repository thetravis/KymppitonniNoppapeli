import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SocketIOService } from '../socket.io.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
// import { setInterval } from 'timers';


@Component({
  selector: 'miikka-component',
  templateUrl: './miikka.component.html',
  styleUrls: ['./miikka.component.css']
})
export class MiikkaComponent implements OnInit, OnChanges {

  /** List from server. Default to miikka.jpg */
  @Input() miikkaImages: string[] = ["miikka.jpg"];
  
  public assetsPath = "./assets/miikka/";
  public miikkaImage: string =  "miikka.jpg";
  public miikkaImagePath: string = this.assetsPath + this.miikkaImage;

  public miikkaVisible: boolean = true;
  public toggleMiikkaButtonText: string = "Piilota Miikka";

  constructor(private socketIOService: SocketIOService ) { 
    
  }

  ngOnInit() {
    this.miikkaImagePath = this.assetsPath + this.miikkaImage;
    setInterval( () => { this.nextMiikkaImage() } , 30000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.miikkaImages != null) {
      this.onMiikkaImageList(changes.miikkaImages.currentValue)
    }
  }

  public onMiikkaImageList(miikkaImages: string[]) {
    this.miikkaImages = miikkaImages;
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

  private nextMiikkaImage(): void {
    let miikkaImageNumber = this.miikkaImages.indexOf(this.miikkaImage);
    if ( miikkaImageNumber < 0) {
      console.log("Bad image file name")
      miikkaImageNumber = 0;
    }
    miikkaImageNumber = (miikkaImageNumber + 1) % this.miikkaImages.length;
    this.miikkaImage = this.miikkaImages[miikkaImageNumber];
    this.miikkaImagePath = this.assetsPath + this.miikkaImage;
  }
  

}
