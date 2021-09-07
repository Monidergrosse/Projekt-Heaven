class ServerLogs {
  static show(logs) {
    let content = [];
    logs.forEach(log => {
      content.push(createText(undefined, log, () => {}));
      content.push(document.createElement('br'));
    });
    document.body.appendChild(createUiPanel("serverLogs", "Server Logs", content));
  }
}
