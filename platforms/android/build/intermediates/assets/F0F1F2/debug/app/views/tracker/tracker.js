var geolocation = require("nativescript-geolocation");
var firebase = require("nativescript-plugin-firebase");
var Observable = require("data/observable").Observable;
var fetchModule = require("fetch");
var fullscreen = require("../../shared/fullscreen");
var round = require("./round");

var tracker = new Observable({
	speed: 99,
	distance: 99,
	lastUpload: "Never",
	status: "Waiting",
	round: round
});
exports.speedStart = function() {
	if (!tracker.speedId) {
		tracker.set("speed", 88);
		tracker.set("distance", 0);
		tracker.set("status", "Started speed");
		tracker.speedId = geolocation.watchLocation(
			function(loc) {
				if (loc) {
					tracker.set("speed", loc.speed);
					var oldLoc = tracker.loc ? tracker.loc : loc;
					tracker.set("distance", tracker.get("distance") + geolocation.distance(oldLoc, loc));
					tracker.loc = loc;
				}
			},
			function(e) {
				console.log("Speed error: " + e.message);
			}, {
				minimumUpdateTime: 9 * 1000
			}
		);
	}
}
exports.speedStop = function() {
	geolocation.clearWatch(tracker.speedId);
	tracker.speedId = false;
	tracker.set("status", "Stopped speed");
};
exports.trackStart = function() {
	if (!tracker.trackId) {
		tracker.set("status", "Started tracker");
		tracker.trackId = geolocation.watchLocation(
			function(loc) {
				if (loc) {
						loc.deviceLabel = tracker.get("deviceLabel");
						loc.timestamp = (new Date()).toJSON();
					  firebase.push('/checkins', loc).then(function(){
						  tracker.set("lastUpload", (new Date()).toTimeString());
					  });
				}
			},
			function(e) {
				console.log("Track error: " + e.message);
			}, {
				minimumUpdateTime: 15 * 60 * 1000
			}
		);
	}
}
exports.trackStop = function() {
	geolocation.clearWatch(tracker.trackId);
	tracker.trackId = false;
	tracker.set("status", "Stopped tracker");
};

exports.loaded = function(args) {
	fullscreen();
	args.object.bindingContext = tracker;
	firebase.init({}).then(
      function (instance) {
        console.log("firebase.init done");
      },
      function (error) {
        console.log("firebase.init error: " + error);
      }
	);

}

exports.mayday = function() {
	geolocation.getCurrentLocation().then(function(loc){
		loc.deviceLabel = tracker.get("deviceLabel");
		loc.timestamp = (new Date()).toJSON();
		fetchModule.fetch("http://www.tkka.net/mayday.php?itrack=1", {
			method: "POST",
			body: JSON.stringify(loc)
		})
		.then(function(){
			tracker.set("status", "Sent Mayday");
		})
	})
}