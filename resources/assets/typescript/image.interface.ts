export class ImageObj {
	title: string;
	url: string;

	constructor(url)
	{
		this.url = url;
		this.title = ImageObj.basename(url); 
	}
	static basename(dir:string){
		var base = new String(dir).substring(dir.lastIndexOf('/') + 1); 
		if(base.lastIndexOf(".") != -1)       
			base = base.substring(0, base.lastIndexOf("."));
		return base;
	}  



}


