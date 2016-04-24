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
    var PopupStylesComponent;
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
            PopupStylesComponent = (function () {
                // public message:string = "this my message";
                function PopupStylesComponent(_neuralStyleDataService) {
                    var _this = this;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    // filesUrl = [];
                    this.isSelected = [];
                    this.uploadedFiles = new neural_style_data_model_1.UploadedFiles;
                    this._neuralStyleDataService.getImages2(function (data, uploadedFiles) {
                        _this.uploadedFiles = uploadedFiles;
                        _this.isSelected = [];
                        for (var i = 0; i < _this.uploadedFiles.uploadedImages.length; ++i) {
                            _this.isSelected.push(false);
                        }
                        _this._neuralStyleDataService.getNeuralStyleData2().then(function (nsData) {
                            _this.nsData = nsData;
                            _this.selectDefaultStyle(_this.nsData.defaultSetting.style_image);
                        });
                    });
                }
                PopupStylesComponent.prototype.refresh = function () {
                    var _this = this;
                    this._neuralStyleDataService.getImages2(function (data, uploadedFiles) {
                        _this.uploadedFiles = uploadedFiles;
                        _this.isSelected = [];
                        for (var i = 0; i < _this.uploadedFiles.uploadedImages.length; ++i) {
                            _this.isSelected.push(false);
                        }
                        //reselect the same images as before the refresh
                        _this.selectDefaultStyle(_this.nsData.styleUrls);
                        // this._neuralStyleDataService.getNeuralStyleData2().then(nsData => {
                        // 	this.nsData = nsData;
                        // 	this.selectDefualtStyle();
                        // });
                    });
                };
                PopupStylesComponent.prototype.uploadImage = function (ImageUrl) {
                    var _this = this;
                    this._neuralStyleDataService.uploadImage(ImageUrl, function () { _this.refresh(); });
                };
                PopupStylesComponent.prototype.reset = function () {
                    this.nsData.styleUrls = [];
                    for (var i = 0; i < this.isSelected.length; ++i) {
                        this.isSelected[i] = false;
                    }
                };
                PopupStylesComponent.prototype.selectDefaultStyle = function (defaultImages) {
                    this.nsData.styleUrls = [];
                    //select the first image as default style
                    var noSelection = true;
                    for (var i = 0; i < defaultImages.length; ++i) {
                        var title = defaultImages[i];
                        var isSelected = this.selectByTitle(title);
                        console.log("title: ", title);
                        if (isSelected)
                            noSelection = false;
                        console.log("isSelected: ", isSelected);
                    }
                    //select the first image if no default image has been selected 
                    // if(noSelection)
                    // 	this.selectStyle(0);
                    console.log("isStyleSelected: ", this.isSelected);
                };
                PopupStylesComponent.prototype.selectByTitle = function (title) {
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
                        this.selectStyle(idx);
                        return true;
                    }
                    return false;
                };
                PopupStylesComponent.prototype.selectStyle = function (idx) {
                    this.isSelected[idx] = !this.isSelected[idx];
                    this.nsData.styleUrls = [];
                    for (var i = 0; i < this.isSelected.length; ++i) {
                        if (this.isSelected[i] === true) {
                            // this.styleUrl =  this.filesUrl[i];
                            this.nsData.styleUrls.push(this.uploadedFiles.uploadedImages[i]);
                        }
                    }
                };
                PopupStylesComponent = __decorate([
                    core_1.Component({
                        selector: 'popup-styles',
                        // viewProviders: [HTTP_PROVIDERS],
                        // templateUrl: 'app/html/style-images.component.html',
                        templateUrl: 'app/html/popup-styles.component.html',
                        styleUrls: ['css/popup.component.css'],
                        directives: [common_1.NgClass, popup_component_1.PopupComponent],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [neural_style_data_service_1.NeuralStyleDataService])
                ], PopupStylesComponent);
                return PopupStylesComponent;
            }());
            exports_1("PopupStylesComponent", PopupStylesComponent);
        }
    }
});
//# sourceMappingURL=popup-styles.component.js.map