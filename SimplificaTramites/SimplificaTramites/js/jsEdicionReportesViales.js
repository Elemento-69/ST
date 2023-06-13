var map;
var proxyurl;
var markerCluster;
var htmlFotos = '';
var vReporteID = 0;
var TramoIDG = 0;
var TramoAnio = 0;
let Usuariolog = usuario;
var guardadoTabla = false; 
var idEstadoReporteG;
var descripcionProyecto;
$("#fechaC").datetimepicker({ format: 'YYYY-MM-DD' });

function fnInicializarDatosChecks() { // carga el valr inicial del check marcado, para obtener datso del proyecto.

$('input:checkbox:checked').each(
    function () {
        let proyectoDatos = $(this).val();
        const myArray = proyectoDatos.split(" ");
        var descripcionProy = $(`#${myArray[0]}Label`).text();
        descripcionProyecto = myArray[0] + "/" + myArray[1] + "/"+ descripcionProy;
    },
    );
}

$(document).ready(function () {
    fnConsultarToken();
    $("#hasta-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })
    $("#desde-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })

    $("select").select2({ theme: "bootstrap" })

    const urlParams = new URLSearchParams(window.location.search);

    let urlParamsDrpt = urlParams.get('params');
    let Parametros = atob(urlParamsDrpt);
    Parametros = Parametros.split('|');
    vReporteID = Parametros[0];
    

    fnInitMap();

    $("#btnGuardar").click(function () {
        EstadoID = $('#cmbEstado').val();
        DanioID = $('#cmbTipoDanio').val();
        PrioridadID = $('#cmbPrioridad').val();
        Descripcion = $('#txtDescripcion').val();
        vFechaEdita = $('#desde').val();
        Entidad = $('#cmbEntidad').val();
        DescripcionResolucion = $('#txtResolucion').val();


        if ((Descripcion === '') || (vFechaEdita === '--')) {
            $.LoadingOverlay("hide");
            Swal.fire("", "Debe de completar campos vacíos", "warning");
            return;
        } else if (DescripcionResolucion == '' && EstadoID == 5) {
            $.LoadingOverlay("hide");
            Swal.fire("", "No puede guardar cambios con un estado Soluciondado sin su descripcion", "warning");
            return;
        }
        else {
            $.LoadingOverlay("show");
            vFechaEdita = getSubstrings(vFechaEdita, 6, 10) + "-" + getSubstrings(vFechaEdita, 3, 5) + "-" + getSubstrings(vFechaEdita, 0, 2);
            $.ajax({
                url: `${urlbase}api/ReportesViales/GestionReportesViales`,
                method: "post",
                data: JSON.stringify({
                    "opcion": 1,
                    "ReporteID": vReporteID,
                    "DanioID": DanioID,
                    "IDReporteEstado": EstadoID,
                    "IdPrioridad": PrioridadID,
                    "Descripcion": Descripcion,
                    "FechaReporte": vFechaEdita,
                    "Usuario": usuario,
                    "idEntidad": Entidad,
                    "DescripcionResolucion": DescripcionResolucion

                }),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    $.LoadingOverlay("hide");

                    Swal.fire("Éxito", "Reporte actualizado correctamente", "success").then(function () {
                        window.redirect(`frmReportesViales.aspx`)
                    });

                },
                error: (error) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + " ", "error");
                }
            })
            
        }

    });
    
    $("#btnGenerarReporte").click(function () {
        let asociado;
        Swal.fire({
            title: 'Seleccione el tipo de reporte a generar',
            text: "Reporte General: Imprime los datos generales" + "  \n"+
                  "Reportes Asociados: Imprime datos generales incluyendo datos de los reportes asociados ",
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Reportes Asociados',
            denyButtonText: `Reporte General`,
            confirmButtonColor: '#3085d6',
            denyButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    asociado = 1;
                    /*var vReporte = 'rptReporteVialReportesAsociados.mrt';
                    var QueryString = '?Parameters=' + vReporteID + ',"' + usuario + '"' + '&IdReporte=3' + '&Reporte=' + vReporte;
                    var url = "../FrmVisorReporte.aspx" + QueryString;
                    var params = [
                        'height=' + screen.height,
                        'width=' + screen.width,
                        'fullscreen=yes' // only works in IE, but here for completeness
                    ].join(',');
                    window.open(url, '_blank', params);*/
                    opendialog(`/VisorInformesSti?ReporteID=${512}&pReporteID=${vReporteID}&pUsuarioCreo=${usuario}&idPadre=${vReporteID}&asociado=${asociado}`);

                } else if (result.isDenied) {
                    asociado = 0;
                    /*var vReporte = 'rptReporteVial.mrt';
                    var QueryString = '?Parameters=' + vReporteID + ',"' + usuario + '"' + '&IdReporte=3' + '&Reporte=' + vReporte;
                    var url = "../FrmVisorReporte.aspx" + QueryString;
                    var params = [
                        'height=' + screen.height,
                        'width=' + screen.width,
                        'fullscreen=yes' // only works in IE, but here for completeness
                    ].join(',');
                    window.open(url, '_blank', params);*/

                    //sti
                    opendialog(`/VisorInformesSti?ReporteID=${512}&pReporteID=${vReporteID}&pUsuarioCreo=${usuario}&idPadre=${vReporteID}&asociado=${asociado}`);
                    // fin sti
                }
            })       
    });//boton 

});


//opend dialog para reportes en STI
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte General",
            autoOpen: false,
            dialogClass: 'dialog_fixed,ui-widget-header',
            modal: true,
            height: 500,
            minWidth: $(window).width() * .70,
            minHeight: $(window).height() * .55,
            draggable: true
        });
    $dialog.dialog('open');
}



function getSubstrings(vTexto, vInicio, vFin) {
    return vTexto.substring(vInicio, vFin);
}

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../ReportesViales/frmReportesViales.aspx/fObtenerToken",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                Swal.fire("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vRespuestaJSON.tablaDevuelta.forEach(function (registro) {
                    vToken = registro.token;
                    vUsuarioActual = registro.usuario;
                    baseHostURL = registro.baseURL;
                    proxyurl = registro.proxyURL;
                    baseSitio = registro.baseSitio;


                });
                const createPromise = () =>

                    $.ajax({
                        url: `${urlbase}api/ReportesViales/GetDanios`,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            if (val.length > 0) {

                                let cols = val.map((item) => `<option value="${item.DanioId}">${item.NombreDanio}</option>`)

                                $("#cmbTipoDanio").append(cols.join(""))
                                $("#cmbTipoDanio").trigger("change")
                            }
                        }
                    })

                const createPromise2 = () =>
                    $.ajax({
                        url: `${urlbase}api/ReportesViales/GetEstados`,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            if (val.length > 0) {

                                let cols = val.map((item) => `<option value="${item.IDReporteEstado}">${item.NombreEstado}</option>`)

                                $("#cmbEstado").append(cols.join(""))
                                $("#cmbEstado").trigger("change")
                            }
                        }
                    })

                const createPromise3 = () =>
                    $.ajax({
                        url: `${urlbase}api/ReportesViales/GetPrioridades`,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            if (val.length > 0) {
                                let cols = val.map((item) => `<option value="${item.IdPrioridad}">${item.Prioridad}</option>`)

                                $("#cmbPrioridad").append(cols.join(""))
                                $("#cmbPrioridad").trigger("change")
                            }
                        }
                    })

                const createPromise4 = () =>
                    $.ajax({
                        url: `${urlbase}api/ProyectosPorTramo/ObtEntidades`, 
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            if (val.length > 0) {
                                let cols = val.map((item) => `<option value="${item.idEntidad}">${item.NombreEntidad}</option>`)

                                $("#cmbEntidad").append(cols.join(""))
                                $("#cmbEntidad").trigger("change")
                            }
                        }
                    })


                var promises = [createPromise(), createPromise2(), createPromise3(), createPromise4()];

                Promise.all(promises)
                    .then(responses => {
                        $('#divAudio').hide();
                        fnVerReporte(vReporteID);
                        fnCargarEntidadaPorReporte(vReporteID);
                        fnObtenerDescripcionResolucion();
                    })
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}


function fnCargarEntidadaPorReporte(ReporteID) {
    $.ajax({
        url: `${urlbase}api/ProyectosPorTramo/ObtEntidadPorReporte/${ReporteID}`, 
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
        success: (val) => {
            item = val[0];
            if (item.idEntidad != 0) {
                //console.info(item.NombreEntidad);
                $('#cmbEntidad').val(item.idEntidad).change();
            } 
        }
    })
}

function fnVerReporte(ReporteID) {

    const url = urlbase + "api/ReportesViales/GetReportes/" + ReporteID + "/0/0/0/01-01-1900/01-01-1900";

    fetch(proxyurl + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnActualizarToken(_token);
                var interval = setInterval(function () {
                    if (_token !== '') {
                        clearInterval(interval);
                    }
                }, 1000);
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {

            if (data !== undefined) {
                item = data[0];
                
               //console.info(data);
                $("#tramo").text("TRAMO: " + item.TramoDesc);
                $("#Anio").text("AÑO: " + (item.Anio == 0 ? " " : item.Anio));
                $('#desde').val(formatDate(item.FechaReporte));
                $('#txtUsuario').val(item.UserName);
                $('#userCre').text("Creado por: " + item.UserName);
                $('#cmbEstado').val(item.IDReporteEstado).change();
                $('#cmbTipoDanio').val(item.DanioID).change();
                $('#cmbPrioridad').val(item.IdPrioridad).change();
                $('#txtDescripcion').val(item.Descripcion);
                TramoIDG = item.TramoID;
                TramoAnio = item.Anio;
                generaChecks();

                var NotaVoz = item.NotaVoz;
                if (NotaVoz != 'N/A') {
                    $('#divAudio').show();
                    var RutaAudio = ReportesVialesPath + '/Audios/ID_' + ReporteID + '/' + NotaVoz;
                    $('#audioNota').attr("src", RutaAudio);
                }

                fnDibujarMarcador(item);

                if (item.Fotografias != '') fnDibujarFotografias(item);

                $.LoadingOverlay("hide");
            }
            else {
                $.LoadingOverlay("hide");
                Swal.fire("", "No existen datos del reporte", "warning");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });


}

function fnInitMap() {
    posicionInicial = { lat: 14.628434, lng: -90.522713 };
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                posicionInicial = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(posicionInicial);
            }
        );
    }

    map = new google.maps.Map(document.getElementById("map"),
        {
            zoom: 8,
            center: posicionInicial,
        });

    const marker = new google.maps.Marker({
        zoom: 8,
        position: posicionInicial,
        map: map,
    });

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

function redirect(url) {
    window.location.href = url;
}

function fnDibujarMarcador(item) {
    const posicion = { lat: item.Latitud, lng: item.Longitud };

    var urlImagenMarcador = '../Images/Icons/marker_RPViales/marker_' + item.DanioID + '.png';

    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 15,
            center: posicion,
        });

    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        zoom: 15,
        icon: urlImagenMarcador,
        position: posicion,
        map: map,
    });
}

function fnDibujarFotografias(item) {
    var arrayFotografias = [];
    Fotografias = item.Fotografias.slice(1);
    //console.info(Fotografias);
    $('#fotografia-galery').html(null)
    arrayFotografias = Fotografias.split(',');
    //$.each(arrFotografias, function (i, obj) {
    $('#fotografia-galery').append(arrayFotografias.map((val) => `
            <div class="img-wrapper d-inline-block">
                <a role="button" class="img-link" data-toggle="modal" data-target="#fotografiaModal" data-item='${JSON.stringify(val)}'>
                    <img width="150" title="Ver imagen" height="150" src="${thumbnail}Tipo=12&MaxPixels=200&ReporteID=${item.ReporteID}&Fotografia=${val}&` + new Date().getTime() + `" alt="imagen galeria" />
                </a>
            </div>
        `))
    // });


}

//function fnVerFotografia(Fotografia, reporteID) {
//    window.open(`${thumbnail}Tipo=12&MaxPixels=450&ReporteID=${reporteID}&Fotografia=${$.trim(Fotografia)}`, '', 'width=640,heigth=480');
//}


$('#fotografia-galery').on("click", "a", function () {
    let $img = document.getElementById("modal-img");
    $img.classList.remove("d-none");
    let item = JSON.parse(this.dataset.item);
    $img.src = `${thumbnail}Tipo=12&MaxPixels=850&ReporteID=${vReporteID}&Fotografia=${$.trim(item)}`, '', 'width=640,heigth=480';
})

/// --------js nueva funcion mostrar  proyectos en checks 30/11/2022------------------

// carga de datos a los checks 



   /*
    var list = ['CAROO', 'MESA', 'GATO','PEROO']; //cargar datos para los checks
    for (var value of list) {
        $('#contenedorChecks')
            .append(`<div id="subContenedorChecks">
            <input type="checkbox" id="${value}" name="interest" value="${value}">
            <label for="${value}">${value}</label>
            </div>`)
            //.append(`<br>`)
 
        $(`#${value}`).css({
            "border-radius": "100%",
            "background": "#909090",
            "cursor": "pointer",
            "width": "20px",
            "height": "20px",
            "margin-top":"15px"
           
        });
    }*/
function generaChecks() { 
    let TramoID = TramoIDG;
    let AnioID = TramoAnio;
    let ReporteID = vReporteID;
    $.ajax({
        async: true,
        url: `${urlbase}api/ProyectosPorTramo/ObtCodigoDescripcionProy/${TramoID}/${AnioID}/${vReporteID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            //console.log(val);
            if (val == undefined || val.length == 0) { // val == undefined || val == ' '
                let textoSinProgramas = (TramoIDG == 0 ? "Tramo municipal no cuenta con proyectos" : "No hay Proyectos asignados en el Tramo" )  
                $('#contenedorChecks')
                    .append(`<div id="subContenedorChecks">
                     <h5>${textoSinProgramas}</h5>
                     </div>`)
                $("#divBotones").css("display", "none");
                $("#btnRepetidos").addClass('d-none');
            } else {
                val.map((item) => {
                    if (item.proyectoAsignado == item.ProyectoCodigo) {
                        $('#contenedorChecks')
                         .append(`<div class ="col-6 row" id="subContenedorChecks" style = "display:flex;  justify-content:center; ">
                         <input type="checkbox" id="${item.ProyectoCodigo}"  value="${item.ProyectoCodigo} ${item.AnioID}" onclick="Cambios(this)" checked = true>
                        <label for="${item.ProyectoCodigo}" id="${item.ProyectoCodigo}Label">${item.ProyectoCodigo}-${item.ProyectoDescripcion}</label></div>`)
                    } else if (item.proyectoAsignado == '') {
                         $('#contenedorChecks')
                         .append(`<div class ="col-6 row" id="subContenedorChecks" style = "display:flex;  justify-content:center;">
                         <input type="checkbox" id="${item.ProyectoCodigo}"  value="${item.ProyectoCodigo} ${item.AnioID}" onclick="Cambios(this)">
                         <label for="${item.ProyectoCodigo}" id="${item.ProyectoCodigo}Label" >${item.ProyectoCodigo}-${item.ProyectoDescripcion}</label></div>`)
                        }else{
                            $('#contenedorChecks')
                            .append(`<div class ="col-6 row" id="subContenedorChecks" style = "display:flex;  justify-content:center;">
                            <input type="checkbox" id="${item.ProyectoCodigo}"  value="${item.ProyectoCodigo} ${item.AnioID}" onclick="Cambios(this)">
                             <label for="${item.ProyectoCodigo}" id="${item.ProyectoCodigo}Label" >${item.ProyectoCodigo}-${item.ProyectoDescripcion}</label></div>`)
                            $(`#${item.ProyectoCodigo}`).attr("disabled", true);
                            }

                    $(`#${item.ProyectoCodigo}`).css({
                        "width": "24px",
                        "height": "24px",
                        "margin-top": "12px"
                    });
                    $(`#${item.ProyectoCodigo}Label`).css({
                        "padding-left": "10px"
                    });
                    fnInicializarDatosChecks();
                })
            }
        },
        error: () => { }
    });
}

$('#btnPruebasVarias').click(function () {

     
});

/*$("input:checkbox").change(function () {
    if ($("input:checkbox").is(':checked')) {
        $('input:checkbox:checked').each(
            function () {
                let proyectoDatos = $(this).val();
                const myArray = proyectoDatos.split(" ");
                alert(myArray[1] + '  ' + myArray[0] + ' ' + vReporteID);
                fnactualizarProyectoChecks(myArray[1], myArray[0], vReporteID);
            }
        );
    } else {
        fnactualizarProyectoChecks(0, "", vReporteID);
    }
    alert("holo")
});
*/

function Cambios(checkbox) {
    //Si está marcada valida el check y llama a fnactualizarProyectoChecks
   
    if (checkbox.checked) {
        $('input:checkbox:checked').each(
            function () {
                let proyectoDatos = $(this).val();                
                const myArray = proyectoDatos.split(" ");
                var descripcionProy = $(`#${myArray[0]}Label`).text();

                descripcionProyecto = myArray[0] + "/" + myArray[1] + "/" + descripcionProy; //esta asignacion es para fndesasignar 
                fnAsiganarProyecto(myArray[1], myArray[0], vReporteID, descripcionProy);
                $("input:checkbox").attr("disabled", true); // desabilita todos los checks
            },
        ); 

        $('input:checkbox:checked').each( //busca todos los checkbos checkeados y los habilita 
            function () {
                $(this).attr("disabled", false);
            });
    }
    //Si se ha desmarcado llama a la funcion fnDesasignarProyecto
    else {
        /*var des;
        $('input:checkbox',false).each(
            function () {
                let proyectoDatos = $(this).val();
                const myArray = proyectoDatos.split(" ");
                let descripcionProy = $(`#${myArray[0]}Label`).text();
                des = descripcionProy
            })*/

        fnDesasignarProyecto(0, "", vReporteID, descripcionProyecto);
        $("input:checkbox").attr("disabled", false);
    }
}
   


$('#contenedorChecks').css({
   // "background-color": "#CCC",
    "display": "flex",
    "justify-content": "space-around",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "margin-top": "15px"
});

$("#optionMarcar").click(function () {
    $("input:checkbox").prop('checked', "checked");
});

$("#optionDesmarcar").click(function () {
    $("input:checkbox").prop('checked', false);
    
});

$("#headerTramo").css({
    "display": "flex",
    "justify-content": "space-between",
    "aling-items": "flex-end",

});

function fnAsiganarProyecto(anio, proyectoCodigo, idReporte, DescripcionProy) {
    //alert(anio + proyectoCodigo + idReporte, DescripcionProy);
            $.ajax({
                url: `${urlbase}api/ProyectosPorTramo/ActualizaProyectosPorTramo`, 
                method: "post",
                data: JSON.stringify({                   
                    "AnioID": anio,
                    "proyectoCodigo": proyectoCodigo,
                    "reporteID": idReporte    
                }),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("Éxito", "El Proyecto a sido Asignado Correctamente", "success");
                    let Asignado = 1;
                   // fnObtenerCorreoE(anio, proyectoCodigo, DescripcionProy, Asignado) // envia datos a correo 
                        //.then(function () {
                        //window.redirect(`frmReportesViales.aspx`)
                    //});
                },
                error: (error) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + "", "error");
                }
            })
} 

function fnDesasignarProyecto(anio, proyectoCodigo, idReporte,descripcion) {
    console.log(anio + proyectoCodigo + idReporte);
    $.ajax({
        url: `${urlbase}api/ProyectosPorTramo/ActualizaProyectosPorTramo`,
        method: "post",
        data: JSON.stringify({
            "AnioID": anio,
            "proyectoCodigo": proyectoCodigo,
            "reporteID": idReporte
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "El Proyecto a sido Desasignado Correctamente", "success");
            const myArray = descripcion.split("/");
            let Desasignado = 0;
          //  fnObtenerCorreoE(myArray[1], myArray[0], myArray[2], Desasignado) // enviar anio poyecto codigo
            //window.redirect(`frmReportesViales.aspx`)
            //});
        },
        error: (error) => {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + "", "error");
        }
    })
}
function fnObtenerDescripcionResolucion() {
    $.ajax({
        url: `${urlbase}api/ProyectosPorTramo/ObtDescripcionResolucion/${vReporteID}`, 
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            item = val[0];
            if (item.DescripcionResolucion == '') {
                 idEstadoReporteG = item.IDReporteEstado;
                $('#cmbEstado').val(item.IDReporteEstado).change();
            } else {
               
                $('#txtResolucion').val(item.DescripcionResolucion);
                $('#cmbEstado').val(item.IDReporteEstado).change();
            }
        }
    })
}

$('#txtResolucion').change(function () {
    let solucion = $('#txtSolucion').val();
    if (solucion !== '') {
        $('#cmbEstado').val(5).change();
    } 
});

/*
$('input:checkbox:checked').on('click', function () {
    if ($(this).is(':checked')) {
        // Hacer algo si el checkbox ha sido seleccionado
        alert("El checkbox con valor " + $(this).val() + " ha sido seleccionado");
    } else {
        // Hacer algo si el checkbox ha sido deseleccionado
        alert("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
    }
});*/

/// fin js mostrar proyectos en checks

// ------------------------------------------------------js Bitacora de reportes--------------------------------------------------------
$("#contenedorModal").css({
    "display": "flex",
    "justify-content": "space-between",
    "padding-left": "30px",
    "padding-right": "30px"
});

$("#mColumna1").css({
    "height": "500px",
   // "border-style": "solid",
    "width": "40%"
});

$("#mColumna2").css({
    "height": "500px",
    //"border-style": "solid",
    "width": "59%",
    "overflow": "auto"
});

$("#divBotonBitacora").css({
    "display":"flex",
    "justify-content":"flex-end"
});


function obtenerFecha() {

    var date = new Date();
    let fechaF = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() 
    $("#fechaCreo").val(fechaF);
    return fechaF;
    //console.log();

    //let fecha = new Date(),
    //formateada = fecha.toLocaleDateString();
   //return formateada;
    //$("#fechaModificacion").val(formateada);  
}

$("#btnBitacora").click(function () { // abrir modal
    var valorAnio = $("#Anio").text();
    let text = valorAnio.split(' ');
    $("#AnioM").text("Plan: " + text[1]);
    var valorTramo = $("#tramo").text();
    $("#tramoM").text(valorTramo);
    // $("#userCre").text("Creado por: " + Usuariolog);
    $("#fechaModificacion").val(Usuariolog);
    obtenerFecha();
    fnCargaTablaBitacora(vReporteID);
   // $("#miModal").modal("show");
   
})

$("#btnAgregarBitacora").click(function () {
    //guardadoTabla = true;  
    descripcionBitacora = $('#DescripcionBitacora').val();
    if (descripcionBitacora == '') {
        Swal.fire("", "Debe de Completar la Descripción de los Cambios ", "warning");
    } else {
        fnAgregarBitacora();
    }   
});
//

//funcion carga tabla Bitacora reportes 
function fnCargaTablaBitacora(reporteID) {
    let enumeracion = 0;
    $.ajax({
        async: true,
        url: `${urlbase}api/ProyectosPorTramo/ObtDatosBitacoraReporte/${reporteID}`, 
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#tablaBitacora').dataTable().fnClearTable();
            $('#tablaBitacora').dataTable().fnDestroy();
            $("#tablaBitacora > tfoot, #tablaBitacora > tbody").html(null);   //> tfoot, #table-renglones > tbody
            let cols = val.map((item) =>
                    `
                    <tr>
                    <td class="spacer"></td>
                    <td class="text-center">${enumeracion = enumeracion + 1}</td>
                    <td class="text-center" style ="width: 90px;">${item.FechaCreo}</td>
                    <td class="text-left" style ="width: 210px;">${item.Descripcion}</td>
                    <td class="text-center">
                     <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                     data-content="Seleccionar" data-placement="top" onclick="fnEliminarBitacora('${item.idBitacora}');" style="cursor:pointer"  title="Eliminar Cambio">
                     <i class="fas fa-trash fa-sm fa-fw"></i>
                     </button>
                    </td>
                    <td class="spacer"></td>
                    </tr>`)
            $("#tablaBitacora tbody").html(cols.join(""))
            fnInicializaTablaBitacora();
        },
        error: () => { }
    })
}
//fin carga tabla bitacora


//inicializacion tabla bitacora
function fnInicializaTablaBitacora() {
    $('#tablaBitacora').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "No hay cambios realizados",
            "info": "Mostrando _START_ de _TOTAL_ cambios realizados",
            "infoEmpty": "Mostrando 0 de 0 de 0 reportes",
            "infoFiltered": "(Filtrado de _MAX_ total reportes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ reportes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay Cambios encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}


function fnAgregarBitacora() {
    let descripcion = $('#DescripcionBitacora').val();
    let usuarioCreo = Usuariolog;
    let fechaCreo = obtenerFecha();
    let fechaModifico = '1900-01-01';
    let fechaEliminado = '1900-01-01';
    let idReporte = vReporteID;
    let usuarioModifico = '';
    let Eliminado = '1';
    let usuarioEliminado = '';
    console.log(descripcion + " " + usuarioCreo + " " + fechaCreo + " " + fechaModifico + " " + fechaEliminado + " " + idReporte);
    $.ajax({
        url: `${urlbase}api/ProyectosPorTramo/InsertarBitacoraReporte`, 
        method: "POST",
        data: JSON.stringify({
            "InDescripcion": descripcion,
            "InUsuarioCreo": usuarioCreo,
            "InFechaCreo": fechaCreo,
            "InUsuarioModifico": usuarioModifico,
            "InFechaModifico": fechaModifico,
            "InEliminado": Eliminado,
            "InFechaEliminado": fechaEliminado,
            "InUsuarioEliminado": usuarioEliminado,
            "InIdReporte": idReporte
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $.LoadingOverlay("hide");

            Swal.fire("Éxito", "Agregado a Bitacora Correctamente", "success").then(function () {
                fnCargaTablaBitacora(vReporteID);
                $('#DescripcionBitacora').val("");
            });
            
        },
        error: (error) => {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        }
    })
}

function fnEliminarBitacora(idBitacora) {
    let usuarioElimino = Usuariolog;
    let fechaElimino = obtenerFecha();
    let BitacoraID = idBitacora;
    //console.log(usuarioElimino, fechaElimino, BitacoraID);

    Swal.fire({
        title: '¿Esta seguro?',
        text: "Se eliminará este cambio de la bitacora",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {           
                $.ajax({
                    url: `${urlbase}api/ProyectosPorTramo/EliminarBitacoraReporte`,
                    method: "POST",
                    data: JSON.stringify({
                        "EidBitacora": BitacoraID,
                        "EfechaEliminado": fechaElimino,
                        "EusuarioEliminado": usuarioElimino
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");

                        Swal.fire("Éxito", "Eliminado  Correctamente", "success").then(function () {
                            fnCargaTablaBitacora(vReporteID);
                        });

                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
        }
    })
}

// ---fin js Bitacora de reportes ----

//-------------------- notificacion por correo asignacion de proyectos --------------------------------------------------
function fnObtenerCorreoE(anio, proyectoCodigo, Descripcion, vAsignacion) {
    let Asignacion = (vAsignacion == 0 ? 'Proyecto Desasignado' : 'Proyecto asignado');      
    $.ajax({
        url: `${urlbase}api/ProyectosPorTramo/ObtCorreoPorProyecto/${proyectoCodigo}/${anio}`,  
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            if (val == '') {
                Swal.fire(Asignacion, "No hay empresa asignada al proyecto ", "warning");
            } else {
                val.map((item) => {
                    if (item.CorreoVF == 'INVALIDO') {
                        Swal.fire(Asignacion, "La Notificacion no se pudo realizar debido al correo que es Invalido", "warning");
                    } else {
                        sendEmailProject(Descripcion, anio, vAsignacion);
                    }
                })
            }            
         },
        error: (error) => {
            Swal.fire("", error.message + " ", "error");
        }
    })
}


const sendEmailProject = (Descripcion,anio,vAsignacion) => {  //vAsignacion valor de 0 y 1 para determinar el envio del mensaje de asignado o desasignado
    let valorTramo = $("#tramo").text();
    let fecha = $("#desde").val();
    let fechaAsignacion = new Date();
    let fechaFormateada = moment(fechaAsignacion).format('DD/MM/YYYY');
    let hora = new Date;
    let horaF = hora.toLocaleTimeString('en-US');
    let Asignacion = (vAsignacion == 0 ? 'DESASIGNADO del' : 'ASIGNADO al');        
    let AsignacionPiePagina = (vAsignacion == 0 ? 'Desasignado' : 'Asignado');        

    
    var dataJSONt = JSON.stringify({
        destinatario: 'canu.a14304@gmail.com',// desti - se manda a traer desde una consulta de la tabla de las empresas 
        body: "EL proyecto " + Descripcion + "  plan " + anio + " fue " + Asignacion +" reporte correspondiente a la fecha: " + fecha + "\n"
            + valorTramo + " con codigo: " + vReporteID + "\n"
            + "\n"
            + "\n"
            + AsignacionPiePagina +" a las: " + horaF + " del: " + fechaFormateada //proyecto + fechaReporte + tramoReporte el mensaje con el proyecto que se asignó -> spdeproyectoasignado
    });
    $.ajax({
        type: "POST",
        url: "frmEdicionReportesViales.aspx/SendMailNotification",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           // console.log(data);
        },
        failure: function (response) {
            Swal.fire("", response, "error");
        }
    });

}


$('#btnRepetidos').on("click", () => { 
    document.location.href = "frmReportesVialesRepetidos.aspx?parametro= " + btoa(vReporteID); //btoa codifica la cadena
})
