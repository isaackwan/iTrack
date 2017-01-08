var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var geolocation = require("nativescript-geolocation");

var model = new Observable();
exports.loaded = function(args) {
    args.object.bindingContext = model;
}
exports.startTracking = function() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    } else {
        frameModule.topmost().navigate({
            moduleName: "views/tracker/tracker",
            context: {
                speedDisplayOn: model.get("speedDisplayOn"),
                deviceLabel: model.get("deviceLabel")
            }
        });
    }
}