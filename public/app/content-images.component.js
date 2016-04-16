System.register(["angular2/core", 'angular2/common', 'rxjs/Rx', './neural-style-data.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, neural_style_data_service_1;
    var ContentImagesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (_1) {},
            function (neural_style_data_service_1_1) {
                neural_style_data_service_1 = neural_style_data_service_1_1;
            }],
        execute: function() {
            ContentImagesComponent = (function () {
                // public message:string = "this my message";
                function ContentImagesComponent(_neuralStyleDataService) {
                    var _this = this;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    this.filesUrl = [];
                    this.contentIdx = 0;
                    this._neuralStyleDataService.getImages().subscribe(function (data) {
                        _this.filesUrl = data.filesUrl;
                        _this.nsData = _this._neuralStyleDataService.getNeuralStyleData();
                        //select the second image as default content
                        _this.selectContent(1);
                    });
                    // this._neuralStyleDataService.getDefaultSetting().subscribe(
                    // 		data  => {this.nsData.defaultSetting = data;
                    // 			console.log("default setting: ", this.nsData.defaultSetting);
                    // 			alert("default setting recieved");}
                    // 		);
                }
                ContentImagesComponent.prototype.selectContent = function (idx) {
                    this.contentIdx = idx;
                    this.nsData.contentUrl = this.filesUrl[this.contentIdx];
                };
                ContentImagesComponent = __decorate([
                    core_1.Component({
                        selector: 'popup-content',
                        // viewProviders: [HTTP_PROVIDERS],
                        templateUrl: 'app/html/content-images.component.html',
                        styleUrls: ['css/popup.component.css'],
                        directives: [common_1.NgClass],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [neural_style_data_service_1.NeuralStyleDataService])
                ], ContentImagesComponent);
                return ContentImagesComponent;
            }());
            exports_1("ContentImagesComponent", ContentImagesComponent);
        }
    }
});
//# sourceMappingURL=content-images.component.js.map