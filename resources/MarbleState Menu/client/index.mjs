import * as alt from 'alt';
import * as natives from 'natives';
import * as WebView from '/client/webview.mjs';

const EXIT_MENU_KEY = 112;

alt.on('resourceStart', () => {
  WebView.createWebView('MarbleState Menu', false);
});

alt.on('keydown', (key) => {
  if(key == EXIT_MENU_KEY)
    alt.emit("MarbleState Menu:WebView:Toggle");
});
