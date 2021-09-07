import * as alt from 'alt';

export function createWebView(name, open, lockCursor) {
  let webview;

  function openWebView() {
    webview = new alt.WebView("http://resource/client/html/index.html");
    webview.focus();
    if(lockCursor) {
      alt.showCursor(true);
      alt.setCamFrozen(true);
    }

    webview.on('Remote:Emit', (event, ...args) => {
      alt.emitServer(event, ...args);
    });

    webview.on('Close', () => {
      if(webview)
        closeWebView();
    });
  }

  function closeWebView() {
    webview.destroy();
    if(lockCursor) {
      alt.showCursor(false);
      alt.setCamFrozen(false);
    }
    webview = null;
  }

  function emitWebView(event, ...args) {
    webview.emit(event, ...args);
  }

  alt.onServer(name+':WebView:Show', () => {
    openWebView();
  });
  alt.onServer(name+':WebView:Close', () => {
    if(webview)
      closeWebView();
  });
  alt.onServer(name+':WebView:Emit', (event, ...args) => {
    if(webview)
      emitWebView(event, ...args);
  });

  alt.on(name+':WebView:Show', () => {
    openWebView();
  });
  alt.on(name+':WebView:Close', () => {
    if(webview)
      closeWebView();
  });
  alt.on(name+':WebView:Emit', (event, ...args) => {
    if(webview)
      emitWebView(event, ...args);
  });

  if(open)
    openWebView();

  return webview;
}
