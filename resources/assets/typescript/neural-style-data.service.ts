import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS} from 'angular2/http';
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
      // alert("images/get");

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


}