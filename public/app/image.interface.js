System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ImageObj;
    return {
        setters:[],
        execute: function() {
            ImageObj = (function () {
                function ImageObj(url) {
                    this.url = url;
                    this.title = ImageObj.basename(url);
                }
                ImageObj.basename = function (dir) {
                    var base = new String(dir).substring(dir.lastIndexOf('/') + 1);
                    if (base.lastIndexOf(".") != -1)
                        base = base.substring(0, base.lastIndexOf("."));
                    return base;
                };
                return ImageObj;
            }());
            exports_1("ImageObj", ImageObj);
        }
    }
});
//# sourceMappingURL=image.interface.js.map