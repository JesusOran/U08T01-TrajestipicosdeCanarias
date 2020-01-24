function getTrajes() {
  var trajes = [
    { isla: "fv", src: "images/trajes/fv-male.png" },
    { isla: "fv", src: "images/trajes/fv-female.png" },
    { isla: "gc", src: "images/trajes/gc-female.png" },
    { isla: "go", src: "images/trajes/go-female.png" },
    { isla: "hi", src: "images/trajes/hi-female.png" },
    { isla: "lz", src: "images/trajes/lz-female.png" },
    { isla: "pa", src: "images/trajes/pa-female.png" },
    { isla: "pa", src: "images/trajes/pa-male.png" },
    { isla: "tf", src: "images/trajes/tf-female.png" },
    { isla: "tf", src: "images/trajes/tf-male.png" }
  ];
  return trajes;
}

toastr.options = {
  closeButton: true
};

var randomNum;
var contador = 0;
var intentos = 0;
var max;
var min;
var botonEmpezar = $("#comienzo");
var costumeArea = $("<div>");

$("#gameArea").hide();
$("#dificultades").selectmenu({
  width: "auto"
});
costumeArea.attr("id", "costumeArea");
$("#gameArea").append(costumeArea);
$("#gameArea").append(
  "<input id='reinicio' type='button' value='Reiniciar' onclick=location.href='index.html'>"
);
botonEmpezar.button();

botonEmpezar.click(function() {
  $("#selectArea").hide();
  $("#gameArea").show();
  $("#contenedorImagenes > img").droppable({
    activeClass: "ui-state-highlight",
    drop: function(event, ui) {
      $(ui.draggable).draggable({
        disabled: "true"
      });
      if (ui.draggable.attr("name") === $(this).attr("name")) {
        ui.draggable.css({
          "border-style": "solid",
          "border-color": "green",
          "border-radius": "100px"
        });
        contador++;
        intentos++;
        toastr.success(`Correcto. Puntos: ${contador}`);
      } else {
        ui.draggable.css({
          "border-style": "solid",
          "border-color": "red",
          "border-radius": "100px"
        });
        //contador--; //Restar puntos al fallar?
        intentos++;
        toastr.error(`Incorrecto. Puntos: ${contador}`);
      }
      resultados();
    }
  });

  dificultades();

  $("#costumeArea > img").draggable({
    containment: "#gameArea",
    cursor: "move"
  });
});

function resultados() {
  if (intentos === max) {
    if (contador === max) {
      toastr.info('Has ganado! <a href="index.html">Jugar de nuevo?</a>'); //{ "extendedTimeOut": 0} no funciona
    } else {
      toastr.info('Has perdido! <a href="index.html">Jugar de nuevo?</a>');
    }
  }
}

function dificultades() {
  var dificultad = $("#dificultades option:selected").text();
  switch (dificultad) {
    case "Fácil":
      max = 4;
      setImage(max);
      break;
    case "Medio":
      max = 7;
      setImage(max);
      break;
    case "Experto":
      max = 8;
      setImage(max);
      break;
  }
}

function setImage(max) {
  var trajes = getTrajes();
  for (min = 0; min < max; min++) {
    randomNum = Math.floor(Math.random() * trajes.length);
    var imagen = $("<img>")
    imagen.attr("src", trajes[randomNum].src);
    imagen.attr("name", trajes[randomNum].isla);
    costumeArea.append(imagen);
  }
}
