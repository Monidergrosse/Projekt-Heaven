import * as alt from 'alt';
import * as WebView from '/client/webview.mjs';

alt.on('resourceStart', () => {
  WebView.createWebView('TimeStamp', true);
});
