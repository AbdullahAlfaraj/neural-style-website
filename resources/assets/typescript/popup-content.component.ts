import {Component} from "angular2/core";
import {NgClass} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

// import {Observable} from 'rxjs/Rx';
import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel, UploadedFiles} from './neural-style-data.model';
import {PopupComponent} from './popup.component';

@Component({
	selector: 'popup-content',
	// viewProviders: [HTTP_PROVIDERS],
	templateUrl: 'app/html/popup-content.component.html',
	styleUrls: ['css/popup.component.css'],
	directives: [NgClass,PopupComponent],
	providers: []

})
export class PopupContentComponent {
	
	// filesUrl = [];

	contentIdx:number = 0;

	public nsData:NeuralStyleDataModel;
	public uploadedFiles:UploadedFiles = new UploadedFiles;
	// public message:string = "this my message";
	constructor(private _neuralStyleDataService: NeuralStyleDataService) {

		this._neuralStyleDataService.getImages2((data,uploadedFiles) =>{
			this.uploadedFiles = uploadedFiles;
			
			
			this._neuralStyleDataService.getNeuralStyleData2().then(nsData => {
				this.nsData = nsData;
				this.selectDefaultContent(this.nsData.defaultSetting.content_image);
			});
		});




		

	}

		

		refresh()
		{
			this._neuralStyleDataService.getImages2((data,uploadedFiles) =>{
				this.uploadedFiles = uploadedFiles;
				this.contentIdx = -1;
				
			//reselect the same images as before the refresh
			this.selectDefaultContent(this.nsData.contentUrl);
			// this._neuralStyleDataService.getNeuralStyleData2().then(nsData => {
			// 	this.nsData = nsData;
			// 	this.selectDefualtStyle();
			// });
		});
		}
		uploadImage(ImageUrl){
			this._neuralStyleDataService.uploadImage(ImageUrl,()=>{this.refresh()});
			

		}
		selectDefaultContent(defaultImage:string)
		{
			
			
			
			var title = defaultImage;
			var isSelected = this.selectByTitle(title);

			if(isSelected)
			{
				

			}
			else{
				console.log("the default content image is not available", title);
// this.selectContent(1);//select the second image if no image has been selected

}




}
selectByTitle(title)
{
	var idx = -1;
	for(var i = 0; i < this.uploadedFiles.uploadedImages.length;++i)
	{
		if(title === this.uploadedFiles.uploadedImages[i])
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
					this.selectContent(idx);
					return true;
				}
				return false;
			}


			selectContent(idx:number)
			{


				this.contentIdx = idx;
				this.nsData.contentUrl = this.uploadedFiles.uploadedImages[this.contentIdx];


			}
		}



