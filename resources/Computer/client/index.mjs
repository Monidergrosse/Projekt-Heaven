import * as alt from 'alt';
import * as natives from 'natives';


let Config = JSON.parse(alt.File.read('./client/Config.json'));
alt.log(`Config[json]: ${JSON.stringify(Config)}`);
let Mappings = Config.mappings.map(mapping => JSON.parse(alt.File.read(mapping)));
let Screens = [];
Mappings.forEach(mapping => {
  alt.log(`Mapping[json]: ${JSON.stringify(mapping)}`);
  Object.keys(mapping.modles).forEach(model => {
    let screens = mapping.modles[model].screens;
    Object.keys(screens).forEach((texture, i) => {
      let screen = {
        name: `${mapping.name}:${i}`,
        model: model,
        texture: texture,
        session: screens[texture].session,
        screen: screens[texture].screen,
        url: Config.url +
          (screens[texture].session != undefined ? `?session=${screens[texture].session}` : '') +
          (screens[texture].screen != undefined ? `?screen=${screens[texture].screen}` : ''),
        textureWebView: undefined,
        uiWebView: undefined
      };
      alt.log(`Screen[json]: ${JSON.stringify(screen)}`);
      Screens.push(screen);
      screen.interval = alt.setInterval(() => {
        if (alt.isTextureExistInArchetype(alt.hash(screen.model), screen.texture)) {
          screen.textureWebView = new alt.WebView(screen.url, alt.hash(screen.model), screen.texture);
          alt.log(`URL[url]: ${screen.url}`);
          alt.clearInterval(screen.interval);
        }
      }, 1000);
    });
  });
});

alt.on('Computer:Focus', (name) => {
  let screen = Screens.find(screen => screen.name == name);
  if (!screen) return;
  screen.uiWebView = new alt.WebView(`${screen.url}&webview-size={"width":${500},"height":${500}}&webview-position={"x":${500},"y":${500}}`);
});

alt.on('keydown', (key) => {
  if (key == 'E'.charCodeAt(0)) {
    alt.emit('Computer:Focus', 'dev-lounge:0');
  }
});