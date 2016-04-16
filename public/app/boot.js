System.register(['angular2/platform/browser', './master.component', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, master_component_1, http_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (master_component_1_1) {
                master_component_1 = master_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            // import {AppComponent} from './app.component';
            browser_1.bootstrap(master_component_1.MasterComponent, [http_1.HTTP_PROVIDERS]);
        }
    }
});
// bootstrap(LogWindowComponent);
// bootstrap(MetaDataFormComponent);
// bootstrap(UploadsImgsComponent,[HTTP_PROVIDERS]);
//# sourceMappingURL=boot.js.map