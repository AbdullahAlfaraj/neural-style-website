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
    var PopupComponent;
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
            PopupComponent = (function () {
                // public message:string = "this my message";
                function PopupComponent(_neuralStyleDataService) {
                    var _this = this;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    this.filesUrl = [];
                    this.isSelected = [];
                    this.modalId = "";
                    this._neuralStyleDataService.getImages().subscribe(function (data) {
                        _this.filesUrl = data.filesUrl;
                        //init the is
                        for (var i = 0; i < _this.filesUrl.length; ++i)
                            _this.isSelected.push(false);
                        // this.nsData = this._neuralStyleDataService.getNeuralStyleData();
                        _this._neuralStyleDataService.getNeuralStyleData2().then(function (data) {
                            _this.nsData = data;
                            _this.selectDefualtStyle();
                        });
                    });
                }
                // refresh(){
                // 	this._neuralStyleDataService.getImages2((data,uploadedFiles)=> );
                // }
                PopupComponent.prototype.selectDefualtStyle = function () {
                    //select the first image as default style
                    var noSelection = true;
                    for (var i = 0; i < this.nsData.defaultSetting.style_image.length; ++i) {
                        var title = this.nsData.defaultSetting.style_image[i];
                        var isSelected = this.selectByTitle(title);
                        console.log("title: ", title);
                        if (isSelected)
                            noSelection = false;
                        console.log("isSelected: ", isSelected);
                    }
                    //select the first image if no default image has been selected 
                    if (noSelection)
                        this.selectStyle(0);
                    console.log("isStyleSelected: ", this.isSelected);
                };
                PopupComponent.prototype.selectByTitle = function (title) {
                    var idx = -1;
                    for (var i = 0; i < this.filesUrl.length; ++i) {
                        if (title === this.filesUrl[i]) {
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
                PopupComponent.prototype.selectStyle = function (idx) {
                    this.isSelected[idx] = !this.isSelected[idx];
                    this.nsData.styleUrls = [];
                    for (var i = 0; i < this.isSelected.length; ++i) {
                        if (this.isSelected[i] === true) {
                            // this.styleUrl =  this.filesUrl[i];
                            this.nsData.styleUrls.push(this.filesUrl[i]);
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PopupComponent.prototype, "modalId", void 0);
                PopupComponent = __decorate([
                    core_1.Component({
                        selector: 'popup',
                        // viewProviders: [HTTP_PROVIDERS],
                        templateUrl: 'app/html/popup.component.html',
                        styleUrls: ['css/popup.component.css'],
                        directives: [common_1.NgClass],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [neural_style_data_service_1.NeuralStyleDataService])
                ], PopupComponent);
                return PopupComponent;
            }());
            exports_1("PopupComponent", PopupComponent);
        }
    }
});
//# sourceMappingURL=popup.component.js.map