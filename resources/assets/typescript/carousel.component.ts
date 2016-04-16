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
//Carousel Component itself
export class CarouselComponent {
    //images data to be bound to the template
  // public images = IMAGES;
  // public images : ImageObj[];
  // public currentIdx = 0;

  nsData :NeuralStyleDataModel;
  constructor(private _neuralStyleDataService: NeuralStyleDataService)
  {

    this.nsData = _neuralStyleDataService.getNeuralStyleData();
    setTimeout(()=>{
      // this.nsData.outputImages.push(new ImageObj('uploads/736172-anime-wallpaper.jpg'));
       this.nsData.outputImages.push(new ImageObj('assets/No-Photo-Available.jpg'));
       

       // alert("image added !");
     }, 10000);
  }

  showNextImage(){
    if(this.nsData.outputImages.length == 0)
      this.nsData.currentIdx = 0;
    else
      this.nsData.currentIdx = ++(this.nsData.currentIdx) % this.nsData.outputImages.length;
  }




}
//IMAGES array implementing Image interface
// var IMAGES: Image[] = [
//   { "title": "We are covered", "url": 'uploads/snake.jpg' },
//   { "title": "Generation Gap", "url": 'uploads/bleach_567___rukia_by_the103orjagrat-d75ch89.png' }
//   // { "title": "Potter Me", "url": "images/potter.jpg" },
//   // { "title": "Pre-School Kids", "url": "images/preschool.jpg" },
//   // { "title": "Young Peter Cech", "url": "images/soccer.jpg" } 
// ];
// var IMAGES: string[] = [
// 'uploads/snake.jpg' ,
// 'uploads/bleach_567___rukia_by_the103orjagrat-d75ch89.png'
// ];

