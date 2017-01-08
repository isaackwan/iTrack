var app = require("application");
var platform = require("platform");
var color = require("color");
module.exports = function() {
    if (app.android && platform.device.sdkVersion >= '19') {
        const window = app.android.startActivity.getWindow();
        const View = android.view.View;
        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
		window.addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}