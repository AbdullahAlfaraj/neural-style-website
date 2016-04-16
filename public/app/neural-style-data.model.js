System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NeuralStyleDataModel, UploadedFiles;
    return {
        setters:[],
        execute: function() {
            NeuralStyleDataModel = (function () {
                function NeuralStyleDataModel(styleUrls, contentUrl) {
                    if (styleUrls === void 0) { styleUrls = []; }
                    if (contentUrl === void 0) { contentUrl = ""; }
                    this.styleUrls = styleUrls;
                    this.contentUrl = contentUrl;
                    this.numItr = 100;
                    this.log = "";
                    this.styleWeight = 1000;
                    this.outputFileName = "";
                    this.outputDirBaseName = ""; //get the value from the server
                    // outputImages = ['uploads/bleach_567___rukia_by_the103orjagrat-d75ch89.png',
                    // 'uploads/snake.jpg'];
                    this.outputImages = [];
                    this.currentIdx = 0;
                    // code...
                }
                NeuralStyleDataModel.prototype.setFromDefault = function () {
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
                };
                return NeuralStyleDataModel;
            }());
            exports_1("NeuralStyleDataModel", NeuralStyleDataModel);
            UploadedFiles = (function () {
                function UploadedFiles() {
                    this.uploadedImages = [];
                }
                return UploadedFiles;
            }());
            exports_1("UploadedFiles", UploadedFiles);
        }
    }
});
//# sourceMappingURL=neural-style-data.model.js.map