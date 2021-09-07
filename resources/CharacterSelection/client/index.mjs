import * as alt from 'alt-client';

let CharacterIds;
let CharacterIndex = 0;
alt.onServer('SelectCharacter', (characterIds) => {
  CharacterIds = Array.from(characterIds);
  
  alt.emitServer('playerPreloadCharacter', CharacterIds[0]);

  let webview = new alt.WebView('http://resource/client/view/index.html');
  webview.focus();
  alt.showCursor(true);
  alt.toggleGameControls(false);
  
  webview.on('play', () => {
    alt.emitServer('playerSelectedCharacter', characterIds[CharacterIndex]);
    webview.destroy();
    alt.showCursor(false);
    alt.toggleGameControls(true);
  });
  webview.on('previous', () => {
    CharacterIndex--;
    CharacterIndex = (CharacterIndex == -1 ? CharacterIds.length - 1 : CharacterIndex);
    alt.emitServer('playerPreloadCharacter', CharacterIds[CharacterIndex]);
  });
  webview.on('next', () => {
    CharacterIndex++;
    CharacterIndex %= CharacterIds.length - 1;
    alt.emitServer('playerPreloadCharacter', CharacterIds[CharacterIndex]);  
  });
});