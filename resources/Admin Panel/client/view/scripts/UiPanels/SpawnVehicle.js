class SpawnVehicle {

  static show(vehicleName) {
    let content = [];
    document.body.appendChild(createUiPanel("spawnVehicle", "Spawn: " + vehicleName, content));
  }
}
