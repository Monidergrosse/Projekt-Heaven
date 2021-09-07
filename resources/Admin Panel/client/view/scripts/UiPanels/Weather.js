class Weather {
  static show() {
    let content = [];
    content.push(createTextInput(undefined, "Time", () => {}, () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "EXTRASUNNY", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "CLEAR", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "SMOG", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "FOGGY", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "OVERCAST", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "CLOUDS", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "RAIN", () => { /*if ('alt' in window) alt.emit("");*/ }));
    content.push(document.createElement('br'));
    content.push(createButton(undefined, "THUNDER", () => { /*if ('alt' in window) alt.emit("");*/ }));
    document.body.appendChild(createUiPanel("weather", "Weather", content))
  }
}
