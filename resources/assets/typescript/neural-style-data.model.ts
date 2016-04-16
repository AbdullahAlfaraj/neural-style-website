import {ImageObj} from './image.interface';
interface ISetting
{
	style_image: string[];
	content_image: string;
	output_image: string;
	model_file: string;
	proto_file: string;
	gpu: number;
	backend: string;
	num_iterations: number;
	seed: number;
	content_layers: string;
	style_layers: string;
	content_weight: number;
	style_weight:  number;
	image_size: number;
	optimizer: string;
}

export class NeuralStyleDataModel {
	numItr:number = 100;
	log:string = "";
	styleWeight:number = 1000;
	outputFileName = "";
	outputDirBaseName = "";//get the value from the server
	// outputImages = ['uploads/bleach_567___rukia_by_the103orjagrat-d75ch89.png',
	// 'uploads/snake.jpg'];
	outputImages:ImageObj[] = [];
	currentIdx = 0;
	outputName;

	modelFile;
	ProtoFile;

	gpuId;
	backend;
	seed;
	contentLayers;
	styleLayers;
	contentWeight;
	imageSize;
	optimizer;

	defaultSetting:ISetting; 
	setFromDefault()
	{
		this.styleUrls = this.defaultSetting.style_image;
		this.contentUrl = this.defaultSetting.content_image;
		this.outputName = this.defaultSetting.output_image;
		this.modelFile = this.defaultSetting.model_file;
		this.ProtoFile = this.defaultSetting.proto_file;
		this.gpuId = this.defaultSetting.gpu;
		this.backend = this.defaultSetting.backend;
		this.numItr = this.defaultSetting.num_iterations;
		this.seed = this.defaultSetting.seed;
		this.contentLayers = this.defaultSetting.content_layers;
		this.styleLayers = this.defaultSetting.style_layers;
		this.contentWeight = this.defaultSetting.content_weight;
		this.styleWeight = this.defaultSetting.style_weight;
		this.imageSize = this.defaultSetting.image_size;
		this.optimizer = this.defaultSetting.optimizer;
		
		
		
		
	}
	constructor(public styleUrls:string[]=[],public contentUrl:string="") {
		// code...
	}
}
export class UploadedFiles{
	 public uploadedImages:string[] =[];

}
