import * as alt from 'alt';
import * as natives from 'natives';
import * as WebView from '/client/webview.mjs';

alt.on('resourceStart', () => {
  WebView.createWebView('Speedometer');
});

let open = false;

alt.everyTick(() => {
  let vehicle = alt.Player.local.vehicle;
  if(vehicle != null) {

	if(!open) {
      alt.emit("Speedometer:WebView:Show");
	  open = true;
	}

    /*Get vehicle infos*/
	let speed = natives.getEntitySpeed(vehicle.scriptID) * 3.6;
	let rpm = (vehicle.rpm * 1000 - 200) * 1.25;
	let gas = 100;
	let km = 1526;
    alt.emit("Speedometer:WebView:Emit", "update", speed, rpm, gas, km);
  }else {
    if(open) {
      alt.emit("Speedometer:WebView:Close");
	  open = false;
	}
  }
});
