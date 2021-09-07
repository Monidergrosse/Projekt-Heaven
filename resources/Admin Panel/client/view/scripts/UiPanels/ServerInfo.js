class ServerInfo {
  static show(infos) {
    let content = [];
    infos.forEach(info => {
      content.push(createText(undefined, info, () => {}));
      content.push(document.createElement('br'));
    });
    document.body.appendChild(createUiPanel("serverInfo", "Server Info", content));
  }
}
