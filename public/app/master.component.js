System.register(['angular2/core', './log-window.component', './submit-form.component', './popup-styles.component', './popup-content.component', './neural-style-data.service', './socket.service'], function(exports_1, context_1) {
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
    var core_1, log_window_component_1, submit_form_component_1, popup_styles_component_1, popup_content_component_1, neural_style_data_service_1, socket_service_1;
    var MasterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (log_window_component_1_1) {
                log_window_component_1 = log_window_component_1_1;
            },
            function (submit_form_component_1_1) {
                submit_form_component_1 = submit_form_component_1_1;
            },
            function (popup_styles_component_1_1) {
                popup_styles_component_1 = popup_styles_component_1_1;
            },
            function (popup_content_component_1_1) {
                popup_content_component_1 = popup_content_component_1_1;
            },
            function (neural_style_data_service_1_1) {
                neural_style_data_service_1 = neural_style_data_service_1_1;
            },
            function (socket_service_1_1) {
                socket_service_1 = socket_service_1_1;
            }],
        execute: function() {
            MasterComponent = (function () {
                function MasterComponent() {
                }
                MasterComponent = __decorate([
                    core_1.Component({
                        selector: 'master',
                        templateUrl: 'app/html/master.component.html',
                        styleUrls: [],
                        directives: [
                            log_window_component_1.LogWindowComponent,
                            submit_form_component_1.SubmitFormComponent,
                            popup_styles_component_1.PopupStylesComponent,
                            popup_content_component_1.PopupContentComponent
                        ],
                        providers: [socket_service_1.SocketService, neural_style_data_service_1.NeuralStyleDataService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MasterComponent);
                return MasterComponent;
            }());
            exports_1("MasterComponent", MasterComponent);
        }
    }
});
//# sourceMappingURL=master.component.js.map