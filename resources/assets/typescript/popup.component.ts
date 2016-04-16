import {Component,Input} from "angular2/core";
import {NgClass} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

// import {Observable} from 'rxjs/Rx';
import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel} from './neural-style-data.model';

@Component({
	selector: 'popup',
	// viewProviders: [HTTP_PROVIDERS],
	templateUrl: 'app/html/popup.component.html',
	styleUrls: ['css/popup.component.css'],
	directives: [NgClass],
	providers: []

})
export class PopupComponent {
	
	filesUrl = [];
	isSelected= [];
	@Input()
	modalId:string = "";
//	styleUrl :string;

public nsData:NeuralStyleDataModel;
	// public message:string = "this my message";
	constructor(private _neuralStyleDataService: NeuralStyleDataService) {
		this._neuralStyleDataService.getImages().subscribe(
			data  => {this.filesUrl = data.filesUrl;
				//init the is
				for(var i = 0; i < this.filesUrl.length;++i)
					this.isSelected.push(false);


				// this.nsData = this._neuralStyleDataService.getNeuralStyleData();
				this._neuralStyleDataService.getNeuralStyleData2().then(data => {
					this.nsData = data;
					this.selectDefualtStyle();
				});
				
				
			}

			);



	}
	// refresh(){
	// 	this._neuralStyleDataService.getImages2((data,uploadedFiles)=> );



	// }
	selectDefualtStyle()
	{
		//select the first image as default style
		var noSelection = true;
		for(var i = 0; i < this.nsData.defaultSetting.style_image.length;++i)
		{
			var title = this.nsData.defaultSetting.style_image[i];
			var isSelected = this.selectByTitle(title);
			console.log("title: ",title);


			if(isSelected)
				noSelection = false;
			console.log("isSelected: ",isSelected);

		}
				//select the first image if no default image has been selected 
				if(noSelection)
					this.selectStyle(0);
				console.log("isStyleSelected: ",this.isSelected);

			}
			selectByTitle(title)
			{
				var idx = -1;
				for(var i = 0; i < this.filesUrl.length;++i)
				{
					if(title === this.filesUrl[i])
					{
						// console.log("title: ",title);
						// console.log("styleUrl: ",this.nsData.styleUrls[i]);
						// console.log("styleUrls: ",this.nsData.styleUrls);
						idx = i;
						break;
					}
				}
				console.log("style url idx: ",idx);
				if(idx > -1)
				{
					this.selectStyle(idx);
					return true;
				}
				return false;
			}

			selectStyle(idx:number)
			{


				this.isSelected[idx] = !this.isSelected[idx];
				this.nsData.styleUrls = [];
				for(var i = 0; i < this.isSelected.length;++i)
				{
					if(this.isSelected[i] === true)
					{
				// this.styleUrl =  this.filesUrl[i];
				this.nsData.styleUrls.push(this.filesUrl[i]);
				// break;
			}


		}


	}
}



