import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {NeuralStyleDataModel, UploadedFiles} from './neural-style-data.model';

@Injectable()
export class NeuralStyleDataService
{
      uploadedFiles: UploadedFiles = new UploadedFiles;

      filesUrl = [];
      _neuralStyleData = new NeuralStyleDataModel();

      constructor(private _http: Http){

            this.getDefaultSetting();
      }
      getImages2(callback){
            return this._http.get('/images/get')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(data => 
      {

            this.uploadedFiles.uploadedImages = data.filesUrl;
            console.log(this.filesUrl);                  
            callback(data,this.uploadedFiles);
      });
}
getImages()
{
      

      return this._http.get('/images/get')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json());
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      // .subscribe(data => 
      // {
      // 	this.filesUrl = data.filesUrl;
      // 	console.log(this.filesUrl);			
      // });
}
getDefaultSetting()
{
      return this._http.get('default.json')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      .subscribe(data => {
            this._neuralStyleData.defaultSetting = data;
            this._neuralStyleData.setFromDefault();
      });     

}
getDefaultSetting2()
{
      return this._http.get('default.json')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json());


}
getNeuralStyleData(){
      return this._neuralStyleData;
      
}

getNeuralStyleData2(){
      return new Promise<NeuralStyleDataModel>((resolve,reject) => {
            this.getDefaultSetting2().subscribe(data => {
                  this._neuralStyleData.defaultSetting = data;
                  this._neuralStyleData.setFromDefault();
                  resolve(this._neuralStyleData);
            });   


      });
      
}


uploadImage(ImageUrl,callback){

// JSON.stringify({"imageUrl":ImageUrl})
var headers = new Headers();
headers.append('Content-Type', 'application/json');

this._http.post('/upload/url',JSON.stringify({"imageUrl": ImageUrl}),{headers:headers})

.map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(data => 
      {
            console.log("uploadedImageUrl: ",data.uploadedImageUrl);
            this.uploadedFiles.uploadedImages.push(data.uploadedImageUrl);
            // console.log("ImageURL: "+ ImageUrl);
            // this.uploadedFiles.uploadedImages = data.filesUrl;
            // console.log(this.uploadedFiles.uploadedImages);                  
             // callback(data,this.uploadedFiles);
             callback();
       });
}



uploadImagesFromDevice(files: Array<File>,callback){

// JSON.stringify({"imageUrl":ImageUrl})
// var headers = new Headers();
// headers.append('Content-Type', 'application/json');

// this._http.post('/upload',JSON.stringify({"files": files }),{headers:headers});

// .map(res => res.json())
//       // Subscribe to the observable to get the parsed people object and attach it to the
//       // component
//       .subscribe(data => 
//       {

//              callback();
//       });

console.log("uploadImagesFromDevice files",files);

  this.makeFileRequest("/upload", [], files).then((result) => {
            console.log(result);
            callback();
        }, (error) => {
            console.error(error);
        });
}





makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
      return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                  formData.append("uploads", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                  if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                              // resolve(JSON.parse(xhr.response));
                              resolve(xhr.response);
                              
                        } else {
                              reject(xhr.response);
                        }
                  }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
      });
}

refreshImages(){

            return this._http.get('/images/get')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(data => 
      {

            this.uploadedFiles.uploadedImages = data.filesUrl;
            console.log(this.filesUrl);                  
            // callback(data,this.uploadedFiles);
      });

}

}