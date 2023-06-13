$("#Montoinput").attr("disabled", true);
$("#btn-proyecto").css({ "margin-top": "15px", "margin-left":"15px"});
$("#contImprimir").css("margin-left", "10px")
$('#btnImprimir').prop('disabled', true);
$("select").select2({ theme: "bootstrap" });
let Usuariolog = usuario;
//let usuarioLog = usuario[4] + usuario[5] + usuario[6];

$("#desde-dp").datetimepicker({ format: 'YYYY-MM-DD' }); //Cambiado el formato de año 
$("#hasta-dp").datetimepicker({ format: 'YYYY-MM-DD' });



// --- inicio de carga de datos --- 
//carga a datos de años a select 
$.ajax({
    url: `${urlbase}api/SaldosDeEstimacionSuper/ObtPlanAnualNombre`, 
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID));
        $('#selecAnio').append(options).trigger("change");
    },
    error: () => { }
});


//funcion tipo change select anio, invocando a lsita proyecto.
$("#selecAnio").change(function () {
    let obtAnio = document.getElementById('selecAnio').value;
    //alert("hubo cambios en select." + obtAnio);
    $("#selecProy").empty();//-- limpiando selecProy para actualizar la lista desplegable
    $("#Montoinput").attr("value", "Q. ");
    limTambla();
    listaProyecto(obtAnio);   
});

//carga de datos a select proyecto
function listaProyecto(anio) {
    let IDPrograma =  "S";
    let AnioID = anio;
    //let ProyectoCodigo = "";
    let Rol = "CONSALDOSUPER";
    $.ajax({
        url: `${urlbase}api/SaldosDeEstimacionSuper/ObtProyectoDescripcion/${IDPrograma}/${AnioID}/""/${Rol}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.ProyectoDescripcion, val.AnioID));
            $('#selecProy').append(options).trigger("change");
        },
        error: () => { }
    });
}


//funcion tipo change para selcProy enviadno anioID y proyecto codido para CDP
$("#selecProy").change(function () {
    let anio = document.getElementById('selecProy').value.slice(0,4);
    let codP = document.getElementById('selecProy').value.slice(5);
    //console.log(codP);
    ObtenerCDP(anio, codP);
    CargaTablaCDP(anio, codP);
    $("#vCDP").empty();
    limTambla();
    $("#Montoinput").attr("value", "Q. ");
});


//funcion enviar datos para CDP super = proyectocodigo
function ObtenerCDP(anioCDP,codigoProyecto) { 
    let anio = anioCDP;
    let Super = codigoProyecto;
    $.ajax({
        url: `${urlbase}api/SaldosDeEstimacionSuper/ObtCDP/${anio}/${Super}`,
        headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
        success: (val) => {
            let options = val.map((val) => new Option(val.Super));
            $('#vCDP').append(options).trigger("change");

    },
    error: () => { }

});
}

//funcion carga tabla CDP invocada desde  funcion chanse selecProy
function CargaTablaCDP(anio,proyectoCodigo) {
    let IDSuper = anio;
    let SuperProyectoCodigo = proyectoCodigo;
    let Opcion = 1;

    $.ajax({
        async:true,
        url: `${urlbase}api/SaldosDeEstimacionSuper/ObTablaCDP/${IDSuper}/${SuperProyectoCodigo}/${Opcion}`, 
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#table-CDP').dataTable().fnClearTable();
            $('#table-CDP').dataTable().fnDestroy();
            $("#table-CDP > tfoot, #table-CDP > tbody").html(null);   //> tfoot, #table-renglones > tbody
            let cols = val.map((item) => `<tr>  
                    <td class="spacer"></td>
                    <td class="text-center">${item.AnioID}</td>
                    <td class="text-center">${item.ProyectoCodigo}</td>
                    <td class="text-left">${item.TramoDesc}</td>
                    <td class="text-left">${item.RutaCode}</td>
                    <td class="text-left">${item.DeudaEjecutor}</td>
                    <td class="text-left">${item.FactorDeudaSuper}</td>
                    <td class="text-center">${item.SaldoInicial}</td>
                    <td class="spacer"></td>
                    </tr>`)
            $("#table-CDP tbody").html(cols.join(""))
            fnInicializarTBLCDP();          
        },
        error: () => { }
    })
}
//fin carga tabla CDP invocada desde  funcion chanse selecProy



//funcion carga tabla Estimacion del supervisor en el periodo
function CargaTablaEstimaciones(anio,proyectoC) {
    let AnioIDSuper = anio;
    let SuperProyectoCodigo = proyectoC;
    let PeriodoDesde = $('#fechaDesde').val();
    let PeriodoHasta = $('#fechaHasta').val();
    let Opcion = 5;
    let AspiracionPagoOut = 0;
    $.ajax({
        async: true,
        url: `${urlbase}api/SaldosDeEstimacionSuper/ObEstimacionesDelSupervisor/${AnioIDSuper}/${SuperProyectoCodigo}/${PeriodoDesde}/${PeriodoHasta}/${Opcion}/${AspiracionPagoOut}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#table-Supervisor').dataTable().fnClearTable();
            $('#table-Supervisor').dataTable().fnDestroy();
            $("#table-Supervisor > tfoot, table-Supervisor > tbody").html(null);   //> tfoot, #table-renglones > tbody
            let cols = val.map((item) => `<tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.EstimacionCorr}</td>
                    <td class="text-center">${item.MontoEjecutado}</td>
                    <td class="text-left">${item.EstadoDesc}</td>
                    <td class="spacer"></td>

            </tr>`)
            $("#table-Supervisor tbody").html(cols.join(""))
            fnInicializaTblEstimaciones();  
        },
        error: () => { }
    });
}
//fin carga tabla Estimacion del supervisor en el periodo


// carga tabla tramos  --table-tramos

function CargaTablaTramos(anio, proyectoC) {
    let AnioIDSuper = anio;
    let SuperProyectoCodigo = proyectoC;
    let PeriodoDesde = $('#fechaDesde').val();
    let PeriodoHasta = $('#fechaHasta').val();
    let Opcion = 1;
    let AspiracionPagoOut = 0;
 

    
    $.ajax({
        async: true,
        url: `${urlbase}api/SaldosDeEstimacionSuper/ObEjecucionTramo/${AnioIDSuper}/${SuperProyectoCodigo}/${PeriodoDesde}/${PeriodoHasta}/${Opcion}/${AspiracionPagoOut}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#table-tramos').dataTable().fnClearTable();
            $('#table-tramos').dataTable().fnDestroy();
            $("#table-tramos > tfoot, table-tramos > tbody").html(null);   //> tfoot, #table-renglones > tbody
            let cols = val.map((item) => `<tr>
                     <td class="spacer"></td>
                    <td class="text-center">${item.AnioID}</td>
                    <td class="text-center">${item.ProyectoCodigo}</td>
                    <td class="text-left">${item.TramoDesc}</td>
                    <td class="text-left">${item.RutaCode}</td>
                    <td class="text-left">${item.deudaEjecutor}</td>
                    <td class="text-left">${item.factorDeudaSuper}</td>
                    <td class="text-left">${item.deudaSupervisor}</td>
                    <td class="text-left">${item.pagoEjecutor}</td>
                    <td class="text-left">${item.porcentaje}</td>
                    <td class="text-left">${item.aspiracionPago}</td>
                    <td class="spacer"></td>
            </tr>`)
            $("#table-tramos tbody").html(cols.join(""))
            fnInicializaTblTramos();   
        },
        error: () => { }
    });
}
// fin de carga tramos

// carga de monto a cobrar 
function CargaMontoCobrar(anio, proyectoC) {
    let AnioIDSuper = anio;
    let SuperProyectoCodigo = proyectoC;
    let PeriodoDesde = $('#fechaDesde').val();
    let PeriodoHasta = $('#fechaHasta').val();
    let Opcion = 3;
    let AspiracionPagoOut = 0;

    $.ajax({
        async: true,
        url: `${urlbase}api/SaldosDeEstimacionSuper/ObMontoCobrar/${AnioIDSuper}/${SuperProyectoCodigo}/${PeriodoDesde}/${PeriodoHasta}/${Opcion}/${AspiracionPagoOut}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {

            Object.values(val).forEach(val1 => {
                //console.log(val1.AspiracionPago);
                $("#Montoinput").attr("value","Q. " + val1.AspiracionPago);
            })
            },

        error: () => {

        }
    });
}
// fin carga monto a cobrar

//boton buscar
$('#btn-proyecto').click(function () {
    let anio = document.getElementById('selecProy').value.slice(0, 4);
    let codP = document.getElementById('selecProy').value.slice(5); 
    CargaTablaEstimaciones(anio,codP);
    CargaTablaTramos(anio, codP);   
    CargaMontoCobrar(anio, codP);
    $('#btnImprimir').prop('disabled', false);
});
 
//carga boton imprimir parametros a enviar --- {"@AnioID", "@ProyectoCodigo", "@fechaini", "@fechafin", "@Usuario"}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Saldos De Estimacion Super",
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

$("#btnImprimir").click(function () {
    let anio = document.getElementById('selecProy').value.slice(0, 4);
    let ProyectoCod = document.getElementById('selecProy').value.slice(5);
    let fechaDesde = $('#fechaDesde').val();
    let fechaHasta = $('#fechaHasta').val();
    let usuario = Usuariolog;
    //console.log(AnioID, " ", ProyectoCodigo, " ", fechafin, " ", fechaini, " ", usuario);
    opendialog(`/VisorInformessti?ReporteID=${7777}&AnioID=${anio}&ProyectoCodigo=${ProyectoCod}&fechaini=${fechaDesde}&fechafin=${fechaHasta}&@Usuario=${usuario}`);
});
//fin carga boton imprimir 


//tablas 
function fnInicializarTBLCDP() {
    $('#table-CDP').dataTable({
        paging: true,
        destroy: true,
        searching: true,  
        language: {
            "decimal": "",
            "emptyTable": "Sin CDP ",
            "info": "Mostrando ",
            "infoEmpty": "Mostrando 0 de 0 de 0 CDP",
            "infoFiltered": "(Filtrado de _MAX_ total CDP)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ CDP",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay CDP ",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnInicializaTblEstimaciones() {
    $('#table-Supervisor').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        language: {
            "decimal": "",
            "emptyTable": "Sin Estimaciones",
            "info": "Mostrando ",
            "infoEmpty": "Mostrando 0 de 0 de 0 Estimaciones",
            "infoFiltered": "(Filtrado de _MAX_ total Estimaciones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Estimaciones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay Estimaciones ",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnInicializaTblTramos() {
    $('#table-tramos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        language: {
            "decimal": "",
            "emptyTable": "Sin Tramos",
            "info": "Mostrando ",
            "infoEmpty": "Mostrando 0 de 0 de 0 Tramos",
            "infoFiltered": "(Filtrado de _MAX_ total Tramos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Tramos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay Tramos ",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

//funcion limpiar tabla
function limTambla() {
    $('#table-CDP').dataTable().fnClearTable();
    $('#table-CDP').dataTable().fnDestroy();

    $('#table-Supervisor').dataTable().fnClearTable();
    $('#table-Supervisor').dataTable().fnDestroy();

    $('#table-tramos').dataTable().fnClearTable();
    $('#table-tramos').dataTable().fnDestroy();
}