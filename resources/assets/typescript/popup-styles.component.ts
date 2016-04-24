import {Component} from "angular2/core";
import {NgClass} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

// import {Observable} from 'rxjs/Rx';
import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel,UploadedFiles} from './neural-style-data.model';


import {PopupComponent} from './popup.component';
@Component({
	selector: 'popup-styles',
	// viewProviders: [HTTP_PROVIDERS],
	// templateUrl: 'app/html/style-images.component.html',
	templateUrl: 'app/html/popup-styles.component.html',
	
	styleUrls: ['css/popup.component.css'],
	directives: [NgClass,PopupComponent],
	providers: []

})
// export class StyleImagesComponent {
	export class PopupStylesComponent {

	// filesUrl = [];
	isSelected= [];
	public uploadedFiles:UploadedFiles = new UploadedFiles;
//	styleUrl :string;

public nsData:NeuralStyleDataModel;
	// public message:string = "this my message";
	constructor(private _neuralStyleDataService: NeuralStyleDataService) {


		this._neuralStyleDataService.getImages2((data,uploadedFiles) =>{
			this.uploadedFiles = uploadedFiles;
			this.isSelected = [];
			for(var i = 0; i < this.uploadedFiles.uploadedImages.length;++i)
			{
				this.isSelected.push(false);

			}
			this._neuralStyleDataService.getNeuralStyleData2().then(nsData => {
				this.nsData = nsData;
				this.selectDefaultStyle(this.nsData.defaultSetting.style_image);
			});
		});

	}
	refresh()
	{
		this._neuralStyleDataService.getImages2((data,uploadedFiles) =>{
			this.uploadedFiles = uploadedFiles;
			this.isSelected = [];
			for(var i = 0; i < this.uploadedFiles.uploadedImages.length;++i)
			{
				this.isSelected.push(false);

			}
			//reselect the same images as before the refresh
			this.selectDefaultStyle(this.nsData.styleUrls);
			// this._neuralStyleDataService.getNeuralStyleData2().then(nsData => {
			// 	this.nsData = nsData;
			// 	this.selectDefualtStyle();
			// });
		});
	}
	uploadImage(ImageUrl){
		this._neuralStyleDataService.uploadImage(ImageUrl,()=>{this.refresh()});
			

		}
		reset()
		{
			this.nsData.styleUrls = [];
			for(var i = 0; i < this.isSelected.length;++i)
			{
				this.isSelected[i]=false;

			}


		}
		selectDefaultStyle(defaultImages:string[])
		{
			this.nsData.styleUrls = [];
		//select the first image as default style
		var noSelection = true;
		for(var i = 0; i < defaultImages.length;++i)
		{
			var title = defaultImages[i];
			var isSelected = this.selectByTitle(title);
			console.log("title: ",title);


			if(isSelected)
				noSelection = false;
			console.log("isSelected: ",isSelected);

		}
				//select the first image if no default image has been selected 
				// if(noSelection)
				// 	this.selectStyle(0);
				console.log("isStyleSelected: ",this.isSelected);

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
				this.nsData.styleUrls.push(this.uploadedFiles.uploadedImages[i]);
				// break;
			}



		}


	}
}



