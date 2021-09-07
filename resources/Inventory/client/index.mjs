import * as alt from 'alt';
import * as natives from 'natives';
import * as WebView from '/client/webview.mjs';

const INVENTORY_KEY = "I";

alt.on('resourceStart', () => {
  WebView.createWebView('Inventory', false);
});

alt.on('keydown', (key) => {
  if(key == INVENTORY_KEY.charCodeAt(0))
    alt.emit("Inventory:WebView:Toggle");
});
