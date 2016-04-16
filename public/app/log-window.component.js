System.register(['angular2/core', './socket.service', './neural-style-data.service'], function(exports_1, context_1) {
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
    var core_1, socket_service_1, neural_style_data_service_1;
    var LogWindowComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            },
            function (neural_style_data_service_1_1) {
                neural_style_data_service_1 = neural_style_data_service_1_1;
            }],
        execute: function() {
            LogWindowComponent = (function () {
                function LogWindowComponent(_socketService, _neuralStyleDataService) {
                    var _this = this;
                    this._socketService = _socketService;
                    this._neuralStyleDataService = _neuralStyleDataService;
                    this.command = "";
                    this._socket = _socketService.getSocket();
                    this.nsData = _neuralStyleDataService.getNeuralStyleData();
                    this._socket.on('LogLiveEvent', function (data) {
                        _this.nsData.log += data.log;
                        _this.command = data.command;
                    });
                    // this._socket.emit('submitEvent');
                }
                // getLog(){
                // 	this._logService.getLog().then(log => this.log = log);
                // }
                LogWindowComponent.prototype.resetLog = function () { this.nsData.log = ""; };
                LogWindowComponent.prototype.ngOnInit = function () {
                    // this.getLog();
                };
                LogWindowComponent = __decorate([
                    core_1.Component({
                        selector: 'log-window',
                        templateUrl: 'app/html/log-window.component.html',
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [socket_service_1.SocketService, neural_style_data_service_1.NeuralStyleDataService])
                ], LogWindowComponent);
                return LogWindowComponent;
            }());
            exports_1("LogWindowComponent", LogWindowComponent);
        }
    }
});
//# sourceMappingURL=log-window.component.js.map