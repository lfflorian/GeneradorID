console.log("Log");

var movimientos = new Array();
var pulsado;

function createScreen() {
    var canvasDiv = document.getElementById('screen');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', 200);
    canvas.setAttribute('height', 200);
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('class','CanvasClass');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    $('#canvas').mousedown(function (e) {
        pulsado = true;
        movimientos.push([e.pageX - this.offsetLeft,
        e.pageY - this.offsetTop,
            false]);
        reWrite();
    });
    
    $('#canvas').mousemove(function (e) {
        if (pulsado) {
            movimientos.push([e.pageX - this.offsetLeft,
            e.pageY - this.offsetTop,
                true]);
            reWrite();
        }
    });
    
    $('#canvas').mouseup(function (e) {
        pulsado = false;
    });
    
    $('#canvas').mouseleave(function (e) {
        pulsado = false;
    });


    $('#canvas').bind('touchstart', function (event) {
        var e = event.originalEvent;
        e.preventDefault();
        pulsado = true;
        movimientos.push([e.targetTouches[0].pageX - this.offsetLeft,
        e.targetTouches[0].pageY - this.offsetTop,
            false]);
        repinta();
    });

    reWrite();
}

function reWrite() {
    canvas.width = canvas.width; // Limpia el lienzo

    context.strokeStyle = "#0000a0";
    context.lineJoin = "round";
    context.lineWidth = 6;

    for (var i = 0; i < movimientos.length; i++) {
        context.beginPath();
        if (movimientos[i][2] && i) {
            context.moveTo(movimientos[i - 1][0], movimientos[i - 1][1]);
        } else {
            context.moveTo(movimientos[i][0], movimientos[i][1]);
        }
        context.lineTo(movimientos[i][0], movimientos[i][1]);
        context.closePath();
        context.stroke();
    }
}

$('.botonCarga').click(function() {
    var signature = canvas.toDataURL();
    var base64 = signature.split(",")[1];
    console.log(base64);
});

$("#file-input").change(function () {
    var file = $("#file-input").val().replace(/.*(\/|\\)/, '');
    console.log(file);
    $("#fileName").text(file);
});

$("#file-input").click(function () {
    console.log("file");
});