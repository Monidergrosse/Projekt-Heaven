let i;

const time = 30;

alt.on("show", () => {
  document.body.style.display = "";
  var c = 100;
  i = setInterval(function(){
    c--;
    $(".loading-page .counter h1").html(c + "%");
    $(".loading-page .counter hr").css("width", c + "%");
    if(c == 5)
      $(".loading-page .counter p").html("DU WACHST AUF");
    if(c == 0) {
      clearInterval(i);
      alt.emit("DeathScreen:respawn");
    }
  }, time * 10);
});

alt.on("hide", () => {
  document.body.style.display = "none";
  clearInterval(i);
});
