class ServerOptions {
  static show(options) {
    let content = [];
    options.forEach(option => {
      content.push(createButton(undefined, option, () => {}));
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    });
    document.body.appendChild(createUiPanel("serverOptions", "Server Options", content));
  }
}
