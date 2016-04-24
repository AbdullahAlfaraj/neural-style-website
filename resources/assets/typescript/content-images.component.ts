import {Component} from "angular2/core";
import {NgClass} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

// import {Observable} from 'rxjs/Rx';
import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel} from './neural-style-data.model';

@Component({
	selector: 'popup-content',
	// viewProviders: [HTTP_PROVIDERS],
	templateUrl: 'app/html/content-images.component.html',
	styleUrls: ['css/popup.component.css'],
	directives: [NgClass],
	providers: []

})
export class ContentImagesComponent {
	
	filesUrl = [];

	contentIdx:number = 0;

	public nsData:NeuralStyleDataModel;

	// public message:string = "this my message";
	constructor(private _neuralStyleDataService: NeuralStyleDataService) {
		this._neuralStyleDataService.getImages().subscribe(
			data  => {this.filesUrl = data.filesUrl;
				
				this.nsData = this._neuralStyleDataService.getNeuralStyleData();
		//select the second image as default content
		this.selectContent(1);
	}

	);
		
		
		

	}



	selectContent(idx:number)
	{


		this.contentIdx = idx;
		this.nsData.contentUrl = this.filesUrl[this.contentIdx];


	}
}



