System.register(["angular2/core", 'angular2/common', 'rxjs/Rx', './neural-style-data.service', './neural-style-data.model', './popup.component'], function(exports_1, context_1) {
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
    var core_1, common_1, neural_style_data_service_1, neural_style_data_model_1, popup_component_1;
    var PopupContentComponent;
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
            },
            function (neural_style_data_model_1_1) {
                neural_style_data_model_1 = neural_style_data_model_1_1;
            },
            function (popup_component_1_1) {
                popup_component_1 = popup_component_1_1;
            }],
        execute: function() {
            PopupContentComponent = (function () {
                // public message:string = "this my message";
                function PopupContentComponent(_neuralStyleDataService) {
                    var _this = this;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    // filesUrl = [];
                    this.contentIdx = 0;
                    this.uploadedFiles = new neural_style_data_model_1.UploadedFiles;
                    this._neuralStyleDataService.getImages2(function (data, uploadedFiles) {
                        _this.uploadedFiles = uploadedFiles;
                        _this._neuralStyleDataService.getNeuralStyleData2().then(function (nsData) {
                            _this.nsData = nsData;
                            _this.selectDefaultContent(_this.nsData.defaultSetting.content_image);
                        });
                    });
                }
                // this._neuralStyleDataService.getDefaultSetting().subscribe(
                // 		data  => {this.nsData.defaultSetting = data;
                // 			console.log("default setting: ", this.nsData.defaultSetting);
                // 			alert("default setting recieved");}
                // 		);
                PopupContentComponent.prototype.refresh = function () {
                    var _this = this;
                    this._neuralStyleDataService.getImages2(function (data, uploadedFiles) {
                        _this.uploadedFiles = uploadedFiles;
                        _this.contentIdx = -1;
                        //reselect the same images as before the refresh
                        _this.selectDefaultContent(_this.nsData.contentUrl);
                        // this._neuralStyleDataService.getNeuralStyleData2().then(nsData => {
                        // 	this.nsData = nsData;
                        // 	this.selectDefualtStyle();
                        // });
                    });
                };
                PopupContentComponent.prototype.selectDefaultContent = function (defaultImage) {
                    var title = defaultImage;
                    var isSelected = this.selectByTitle(title);
                    if (isSelected) {
                    }
                    else {
                        console.log("the default content image is not available", title);
                    }
                };
                PopupContentComponent.prototype.selectByTitle = function (title) {
                    var idx = -1;
                    for (var i = 0; i < this.uploadedFiles.uploadedImages.length; ++i) {
                        if (title === this.uploadedFiles.uploadedImages[i]) {
                            // console.log("title: ",title);
                            // console.log("styleUrl: ",this.nsData.styleUrls[i]);
                            // console.log("styleUrls: ",this.nsData.styleUrls);
                            idx = i;
                            break;
                        }
                    }
                    console.log("style url idx: ", idx);
                    if (idx > -1) {
                        this.selectContent(idx);
                        return true;
                    }
                    return false;
                };
                PopupContentComponent.prototype.selectContent = function (idx) {
                    this.contentIdx = idx;
                    this.nsData.contentUrl = this.uploadedFiles.uploadedImages[this.contentIdx];
                };
                PopupContentComponent = __decorate([
                    core_1.Component({
                        selector: 'popup-content',
                        // viewProviders: [HTTP_PROVIDERS],
                        templateUrl: 'app/html/popup-content.component.html',
                        styleUrls: ['css/popup.component.css'],
                        directives: [common_1.NgClass, popup_component_1.PopupComponent],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [neural_style_data_service_1.NeuralStyleDataService])
                ], PopupContentComponent);
                return PopupContentComponent;
            }());
            exports_1("PopupContentComponent", PopupContentComponent);
        }
    }
});
//# sourceMappingURL=popup-content.component.js.map