System.register(['angular2/core', './neural-style-data.service', './image.interface'], function(exports_1, context_1) {
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
    var core_1, neural_style_data_service_1, image_interface_1;
    var CarouselComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (neural_style_data_service_1_1) {
                neural_style_data_service_1 = neural_style_data_service_1_1;
            },
            function (image_interface_1_1) {
                image_interface_1 = image_interface_1_1;
            }],
        execute: function() {
            // Compoent Decorator
            CarouselComponent = (function () {
                function CarouselComponent(_neuralStyleDataService) {
                    var _this = this;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    this.nsData = _neuralStyleDataService.getNeuralStyleData();
                    setTimeout(function () {
                        // this.nsData.outputImages.push(new ImageObj('uploads/736172-anime-wallpaper.jpg'));
                        _this.nsData.outputImages.push(new image_interface_1.ImageObj('assets/No-Photo-Available.jpg'));
                    }, 10000);
                }
                CarouselComponent.prototype.showNextImage = function () {
                    if (this.nsData.outputImages.length == 0)
                        this.nsData.currentIdx = 0;
                    else
                        this.nsData.currentIdx = ++(this.nsData.currentIdx) % this.nsData.outputImages.length;
                };
                CarouselComponent = __decorate([
                    core_1.Component({
                        //Name of our tag
                        selector: 'carousel',
                        //Template for the tag
                        templateUrl: 'app/html/carousel.component.html',
                        //Styles for the tag
                        styleUrls: ['css/carousel.component.css'],
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [neural_style_data_service_1.NeuralStyleDataService])
                ], CarouselComponent);
                return CarouselComponent;
            }());
            exports_1("CarouselComponent", CarouselComponent);
        }
    }
});
//# sourceMappingURL=carousel.component.js.map