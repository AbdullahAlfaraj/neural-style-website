import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {SocketService} from './socket.service';

import {NeuralStyleDataService} from './neural-style-data.service';
import {NeuralStyleDataModel} from './neural-style-data.model';

import{CarouselComponent} from './carousel.component';
import {ImageObj} from './image.interface';


@Component({
	selector:'submit-form',
	templateUrl: 'app/html/submit-form.component.html',
	styleUrls: ['css/submit-form.component.css'],
	directives: [CarouselComponent,NgClass]

})

export class SubmitFormComponent{
	private _socket;
	// styleUrl: string = "uploads/Claymore-Anime-Wallpaper-1920x1200.jpg";
	// contentUrl: string = "uploads/anime_wallpaper_by_thefox1997-d4lhzmf.jpg";
	@Input() contentModalId:string;
	@Input() styleModalId:string;
	
	nsData:NeuralStyleDataModel;
	// public show:boolean = false;

	toggleIdx:number = 0;
	toggleText:string[] = ["More Setting","Less Setting"];
	filesToUpload: Array<File>;

	toggle(){
		// this.show = !this.show;
		this.toggleIdx = ++this.toggleIdx % 2; 
		$('.more-setting').toggle(250);

	}
	constructor(private _socketService: SocketService,private _neuralStyleDataService:NeuralStyleDataService)
	{
		this._socket = this._socketService.getSocket();
		this.nsData = _neuralStyleDataService.getNeuralStyleData();

		this._socket.on('outputDirUpdateEvent',(data) => {
			console.log("outputDirUpdateEvent data: ",data);

			this.nsData.outputDirBaseName = data.outputDirBaseName;
			this.nsData.outputName = data.outputDirBaseName + "/result.png";
			var outputImageUrls = data.outputImages;
			this.nsData.outputImages = [];
			this.nsData.currentIdx = 0;
			for(var i = 0; i < outputImageUrls.length;++i)
				this.nsData.outputImages.push(new ImageObj(outputImageUrls[i]));
			
			console.log("outputImages: ",this.nsData.outputImages);
			this.nsData.currentIdx = outputImageUrls.length - 1;


			


		});


		

		//execute the inject jquery script in the next cycle 
		setTimeout(()=>{


			$(document).on('change', '.btn-file :file', function() {
				var input = $(this),
				numFiles = input.get(0).files ? input.get(0).files.length : 1,
				label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
				input.trigger('fileselect', [numFiles, label]);
			});

			$(document).ready( function() {
				$('.btn-file :file').on('fileselect', function(event, numFiles, label) {

					var input = $(this).parents('.input-group').find(':text'),
					log = numFiles > 1 ? numFiles + ' files selected' : label;

					if( input.length ) {
						input.val(log);
					} else {
						if( log ) alert(log);
					}

				});
			});


		}, 0);

		this.filesToUpload = [];
	}
	submit(){

		console.log("in submit() => nsData: ",this.nsData);
		this.nsData.log = "";

		var data = {
			styleUrls: this.nsData.styleUrls,
			contentUrl: this.nsData.contentUrl,

			outputName: this.nsData.outputName,
			modelFile : this.nsData.modelFile,
			ProtoFile :this.nsData.ProtoFile,
			gpuId : this.nsData.gpuId,
			backend : this.nsData.backend,
			numItr : this.nsData.numItr,
			seed : this.nsData.seed,
			contentLayers : this.nsData.contentLayers,
			styleLayers : this.nsData.styleLayers,
			contentWeight : this.nsData.contentWeight,
			styleWeight : this.nsData.styleWeight,
			imageSize : this.nsData.imageSize,
			optimizer: this.nsData.optimizer 

		};


		this._socket.emit('submitEvent',data);

	}
	cancel(){
		var data={cancel:true};
		this._socket.emit('cancelEvent',data);
	}

		//the width of an image is no less than maxWidth/maxImagesInRow
		styleImageWidth(numImages,maxWidth,maxImagesInRow)
		{
			
			if(numImages > maxImagesInRow)
			{
				return maxWidth/maxImagesInRow;
			}
			return maxWidth/numImages;
		}


		uploadImages(){
			
			console.log("filesToUpload: ",this.filesToUpload);
			this._neuralStyleDataService.uploadImagesFromDevice(this.filesToUpload,()=>{

				
				this._neuralStyleDataService.refreshImages();
			});
		}


		fileChangeEvent(fileInput: any){
			this.filesToUpload = <Array<File>> fileInput.target.files;
			console.log("filesChangeEvent this.filesToUpload",this.filesToUpload);
			console.log("filesChangeEvent fileInput",fileInput);

		}


	}
