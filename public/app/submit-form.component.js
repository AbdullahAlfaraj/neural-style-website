System.register(['angular2/core', 'angular2/common', './socket.service', './neural-style-data.service', './carousel.component', './image.interface'], function(exports_1, context_1) {
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
    var core_1, common_1, socket_service_1, neural_style_data_service_1, carousel_component_1, image_interface_1;
    var SubmitFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (neural_style_data_service_1_1) {
                neural_style_data_service_1 = neural_style_data_service_1_1;
            },
            function (carousel_component_1_1) {
                carousel_component_1 = carousel_component_1_1;
            },
            function (image_interface_1_1) {
                image_interface_1 = image_interface_1_1;
            }],
        execute: function() {
            SubmitFormComponent = (function () {
                function SubmitFormComponent(_socketService, _neuralStyleDataService) {
                    var _this = this;
                    this._socketService = _socketService;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    // public show:boolean = false;
                    this.toggleIdx = 0;
                    this.toggleText = ["More Setting", "Less Setting"];
                    this._socket = this._socketService.getSocket();
                    this.nsData = _neuralStyleDataService.getNeuralStyleData();
                    this._socket.on('outputDirUpdateEvent', function (data) {
                        console.log("outputDirUpdateEvent data: ", data);
                        _this.nsData.outputDirBaseName = data.outputDirBaseName;
                        _this.nsData.outputName = data.outputDirBaseName + "/result.png";
                        var outputImageUrls = data.outputImages;
                        _this.nsData.outputImages = [];
                        _this.nsData.currentIdx = 0;
                        for (var i = 0; i < outputImageUrls.length; ++i)
                            _this.nsData.outputImages.push(new image_interface_1.ImageObj(outputImageUrls[i]));
                        console.log("outputImages: ", _this.nsData.outputImages);
                        _this.nsData.currentIdx = outputImageUrls.length - 1;
                        // this._neuralStyleDataService.getDefaultSetting().subscribe(
                        // 	data  => {this.nsData.defaultSetting = data;
                        // 		console.log("default setting: ", this.nsData.defaultSetting);
                        // 		alert("default setting recieved");}
                        // 	);
                    });
                    // setTimeout(()=>{
                    // 	this.nsData.outputImages.push(new ImageObj('uploads/736172-anime-wallpaper.jpg'));
                    // }, 5000);
                }
                SubmitFormComponent.prototype.toggle = function () {
                    // this.show = !this.show;
                    this.toggleIdx = ++this.toggleIdx % 2;
                    $('.more-setting').toggle(250);
                };
                SubmitFormComponent.prototype.submit = function () {
                    console.log("in submit() => nsData: ", this.nsData);
                    this.nsData.log = "";
                    var data = {
                        styleUrls: this.nsData.styleUrls,
                        contentUrl: this.nsData.contentUrl,
                        outputName: this.nsData.outputName,
                        modelFile: this.nsData.modelFile,
                        ProtoFile: this.nsData.ProtoFile,
                        gpuId: this.nsData.gpuId,
                        backend: this.nsData.backend,
                        numItr: this.nsData.numItr,
                        seed: this.nsData.seed,
                        contentLayers: this.nsData.contentLayers,
                        styleLayers: this.nsData.styleLayers,
                        contentWeight: this.nsData.contentWeight,
                        styleWeight: this.nsData.styleWeight,
                        imageSize: this.nsData.imageSize,
                        optimizer: this.nsData.optimizer
                    };
                    this._socket.emit('submitEvent', data);
                };
                SubmitFormComponent.prototype.cancel = function () {
                    var data = { cancel: true };
                    this._socket.emit('cancelEvent', data);
                };
                //the width of an image is no less than maxWidth/maxImagesInRow
                SubmitFormComponent.prototype.styleImageWidth = function (numImages, maxWidth, maxImagesInRow) {
                    if (numImages > maxImagesInRow) {
                        return maxWidth / maxImagesInRow;
                    }
                    return maxWidth / numImages;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SubmitFormComponent.prototype, "contentModalId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SubmitFormComponent.prototype, "styleModalId", void 0);
                SubmitFormComponent = __decorate([
                    core_1.Component({
                        selector: 'submit-form',
                        templateUrl: 'app/html/submit-form.component.html',
                        styleUrls: ['css/submit-form.component.css'],
                        directives: [carousel_component_1.CarouselComponent, common_1.NgClass]
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService, neural_style_data_service_1.NeuralStyleDataService])
                ], SubmitFormComponent);
                return SubmitFormComponent;
            }());
            exports_1("SubmitFormComponent", SubmitFormComponent);
        }
    }
});
//# sourceMappingURL=submit-form.component.js.map