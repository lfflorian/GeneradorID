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
        movimientos.push([e.offsetX,
            e.offsetY,
            false]);
        reWrite();
    });
    
    $('#canvas').mousemove(function (e) {
        if (pulsado) {
            movimientos.push([e.offsetX,
                e.offsetY,
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

var base64; 
var Name;
$('.botonCarga').click(function() {
    var signature = canvas.toDataURL();
    base64 = signature.split(",")[1];
    Name = $('#name').val();

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
            download("Codigo-"+Name+".txt", base64);
            $('.identificador').css("display", "inline");
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            $(".mensaje2").addClass("alert-danger");
            $(".mensaje2").text("No se pudo registrar el Id");
            $(".mensaje2").css("display", "inline");
            $("#option2").toggle(500);
            download("Codigo-"+Name+".txt", base64);
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
    var array = new Array();
    fileReader.onload = function () {
        var data1 = fileReader.result;
        var datosEncriptado = data1.split(",")[1];
        var decodedData = window.atob(datosEncriptado);
        array = {
            code: decodedData
        };
        var form_data2 = JSON.stringify(array);
        /*llamada Ajax Para encontrar al Usuario */
        $.ajax({
            url: "api/user/search.php",
            type : "GET",
            dataType : 'json',
            data : array,
            success : function(result) {
                //window.location.href = "init.php";
                if (result.name == null)
                {
                    Mensaje1()
                }
                else
                {
                    window.location.href = "init.html?name=" + result.name;
                }
            },
            error: function(xhr, resp, text) {
                console.log(xhr + "," + resp + "," + text);
                Mensaje1()
            }
        });
    };
    fileReader.readAsDataURL($('.carga').prop('files')[0]);
});

/* Mensaje de error para opcion 2 */
function Mensaje1() {
    $(".mensaje1").addClass("alert-danger");
    $(".mensaje1").text("No se pudo encontrar el ususario solicitado");
    $(".mensaje1").css("display", "inline");
    $("#option1").toggle(500);
    $('.identificador').css("display", "inline");
}





$('.identificador a').click(function() {
    download("Codigo-"+Name+".txt", base64);
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

  /* Otra pagina */
  function ShowName() {
      var Nombre = getUrlParameter('name');
      $('#name').text(Nombre);
  }

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};