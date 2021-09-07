import * as alt from 'alt';
import * as native from 'natives';
let webview = new alt.WebView("http://resource/client/html/index.html");
webview.unfocus();

alt.on("playerDeath", () => {
  webview.focus();
  alt.showCursor(true);
  webview.emit("show");
});

webview.on("DeathScreen:respawn", () => {
  webview.unfocus();
  alt.showCursor(false);
  webview.emit("hide");
  alt.emitServer('Admin Panel:executeOption', alt.Player.local.id, "Revive");
});
