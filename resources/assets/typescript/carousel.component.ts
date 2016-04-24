// Import Component form the angular core package
import {Component} from 'angular2/core';

import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel} from './neural-style-data.model';

// Import the Image interface
import {ImageObj} from './image.interface';


// Compoent Decorator
@Component({
  //Name of our tag
  selector: 'carousel',
  //Template for the tag
  templateUrl: 'app/html/carousel.component.html',

  //Styles for the tag
  styleUrls: ['css/carousel.component.css'],
  directives:[]
})
export class CarouselComponent {


  nsData :NeuralStyleDataModel;
  constructor(private _neuralStyleDataService: NeuralStyleDataService)
  {

    this.nsData = _neuralStyleDataService.getNeuralStyleData();
    setTimeout(()=>{
      // this.nsData.outputImages.push(new ImageObj('uploads/736172-anime-wallpaper.jpg'));
       this.nsData.outputImages.push(new ImageObj('assets/No-Photo-Available.jpg'));
       

       
     }, 10000);
  }

  showNextImage(){
    if(this.nsData.outputImages.length == 0)
      this.nsData.currentIdx = 0;
    else
      this.nsData.currentIdx = ++(this.nsData.currentIdx) % this.nsData.outputImages.length;
  }




}
