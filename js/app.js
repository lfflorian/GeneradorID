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

    events();

    reWrite();
}

function events() {
    $('#canvas').mousedown(function (e) {
        pulsado = true;
        movimientos.push([e.pageX- this.offsetLeft,
            e.pageY - this.offsetTop,
            false]);

        console.log("x  "+ this.offsetLeft);
        console.log("y " + this.offsetTop);
        console.log("Valor" + e.pageX);
        console.log("Valor" + e.pageY);
        console.log(movimientos);

        console.log("Valor 1 " + e.clientX);
        console.log("Valor 2 " + e.movementX);
        console.log("Valor 3 " + e.offsetX);
        console.log("Valor 4 " + e.pageX);
        console.log("Valor 5 " + e.screenX);
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
            reWrite();
    });
}

function reWrite() {

    canvas.width = canvas.width;
    context.strokeStyle = "#2d2d4f";
    context.lineJoin = "round";
    context.lineWidth = 3;
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

var ObBase64; 
$('.botonCarga').click(function() {
    var signature = canvas.toDataURL();
    var base64 = signature.split(",")[1];
    ObBase64 = base64;
    var Name = $('#name').val();

    var array = {
        name: Name,
        code: base64
    };
    var form_data=JSON.stringify(array);
    console.log(form_data);
    $.ajax({
        url: "api/user/create.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            console.log("resultado " + result.message);
            $(".mensaje2").addClass("alert-success");
            $(".mensaje2").text("Se a registrado el nuevo Id");
            $(".mensaje2").css("display", "inline");
            $(".identificador").css("display","inline");
            $("#option2").toggle(500);
            download("Codigo.text", base64);
            $('.identificador').css("display", "inline");
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            $(".mensaje2").addClass("alert-danger");
            $(".mensaje2").text("No se pudo registrar el Id");
            $(".mensaje2").css("display", "inline");
            $("#option2").toggle(500);
            download("Codigo.txt", base64);
            $('.identificador').css("display", "inline");
        }
    });
});

$("#btnOption1").click(function() {
    console.log("Funcion 1 ejecutada");
    $("#option1").toggle(500);
});

$("#btnOption2").click(function() {
    console.log("Funcion 1 ejecutada");
    $("#option2").toggle(500);
});

$(".carga").on("change", function() {
    var file = $(".carga").val().replace(/.*(\/|\\)/, '');
    if (file =="")
    {
        $(".etiqueta").text("No se a seleccionado ningun archivo");
    } else 
    {      
        $(".etiqueta").text(file);
    }
});


$(".botonBusqueda").click(function () {
    var fileReader = new FileReader();
    fileReader.onload = function () {
        var data1 = fileReader.result;
        var datosEncriptado = data1.split(",")[1];
        var decodedData = window.atob(datosEncriptado);
        console.log("Datos" + decodedData);

        /*llamada Ajax Para encontrar al Usuario */
    };
    fileReader.readAsDataURL($('.carga').prop('files')[0]);
});

$('.identificador a').click(function() {
    download("Codigo.txt",ObBase64);
});

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }