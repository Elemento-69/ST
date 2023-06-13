var ReporteID;
let tramoID;
let Usuariolog = usuario;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    let urlParamsDrpt = urlParams.get('parametro');
    let Parametros = atob(urlParamsDrpt); // atob decodifica una cadena
    ReporteID = Parametros;
    fnVerReporte(ReporteID);
});


function fnVerReporte(ReporteID) {

    const url = urlbase + "api/ReportesViales/GetReportes/" + ReporteID + "/0/0/0/01-01-1900/01-01-1900";

    fetch( url, {
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
                $("#idReporte").text("NO. REPORTE: " + item.ReporteID);
                $("#Anio").text("AÑO: " + item.Anio);
                $("#LabelDes").text(item.Descripcion);
                tramoID = item.TramoID;
                fnCargaReportePosibles(item.TramoID, ReporteID, 4);
                fnCargaReportesUnidos(ReporteID);
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
//::::::::::::::::::::::::::::::::::::::::::::::::: tabla posibles reportes Repetidos :::::::::::::::::::::::::::::::::::::::::::::::::
function fnCargaReportePosibles(TramoID, reporteID, Distancia) { //Tramoid reporteid ditancia , api/ReportesVialesRepetidos/getDatosReportes/22344/207/4
    let enumeracion = 0;
    
    $.ajax({
        async: true,
        url: `${urlbase}api/ReportesVialesRepetidos/getDatosReportes/${TramoID}/${reporteID}/${Distancia}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#tableReportesRep').dataTable().fnClearTable();
            $('#tableReportesRep').dataTable().fnDestroy();
            $("#tableReportesRep > tfoot, #tableReportesRep > tbody").html(null);   //> tfoot, #table-renglones > tbody
            
            let cols = val.map((item) =>
                `
                    <tr>
                    <td class="spacer"></td>
                    <td class="text-center">${enumeracion = enumeracion + 1}</td>
                    <td class="text-center">
                     <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fotos(${item.ReporteID},'${item.Fotografias}','${item.FotografiasPadre}',1);" style="cursor:pointer" data-dismiss="modal"  title="Ver Fotografias">
                     <i class="fa-sharp fa-solid fa-images"></i>
                     </button>
                    </td>
                    <td class="text-center" style ="width: 90px;">${moment(item.FechaReporte).format('YYYY/MM/DD')}</td>
                    <td class="text-left" style ="width: 210px;">${item.Descripcion}</td>
                    <td class="text-left" style ="width: 210px;">${item.NombreDanio}</td>
                    <td class="text-left" style ="width: 210px;">${item.Prioridad}</td>
                    <td class="text-left" style ="width: 210px;">${item.NomnbreEstado}</td>
                    <td class="text-center" style ="width: 210px;">${item.ReporteID}</td>
                    <td style = "width: 103px;">
                     <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                     data-content="Seleccionar" data-placement="top" onclick="fnUnirReporte(${item.ReporteID});" style="cursor:pointer"  title="Unir al reporte ${ReporteID}">
                     <i class="fa-solid fa-circle-plus"></i>
                     </button>
                    </td>
                    <td class="spacer"></td>
                    </tr>`)
            $("#tableReportesRep tbody").html(cols.join(""))
            fnInicializaTablaReportesR();
        },
        error: () => { }
    })
}

function fnUnirReporte(idReporteChild) {
    Swal.fire({
        title: 'Seguro que desea unir el reporte ' + idReporteChild + ' con el reporte ' + ReporteID,
        text: "Presione aceptar para unir los reportes",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    })
        .then((result) => {
            if (result.isConfirmed) {
                fnAgregarReportesRepetidos(ReporteID, idReporteChild);
            } else {
                
            }
        })
}

function fnAgregarReportesRepetidos(idReporteP, idReporteH) {

    let usuarioCreo = Usuariolog;
    let fechaUnio = new Date();
    let fechaFormateada = moment(fechaUnio).format('YYYY/MM/DD');
    let fechaEliminado = '1900/01/01';
    let Eliminado = '0';
    let usuarioEliminado = '';

    $.ajax({
        url: `${urlbase}api/ReportesVialesRepetidos/InsertarReportesRepetidos`,
        method: "POST",
        data: JSON.stringify({
            "idReportePadre": idReporteP,
            "idReporteHijo": idReporteH,
            "FechaUnionReporte": fechaFormateada,
            "UsuarioUnioReporte": usuarioCreo,
            "UsuarioEliminoReporte": usuarioEliminado,
            "FechaEliminoReporte": fechaEliminado,
            "EliminoReporteRepetido": Eliminado
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $.LoadingOverlay("hide");

            Swal.fire("Éxito", "Reporte unido exitosamente", "success").then(function () {
                fnCargaReportesUnidos(idReporteP);
                fnCargaReportePosibles(tramoID, ReporteID, 4);
            });

        },
        error: (xhr,error, status) => {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
            //console.log(fechaFormateada)
            //console.log(fechaEliminado)
            //console.log(xhr)
            
        }
    })
}


function fotos(idReporte, fotosHijo, FotosPadre,asociado) {

    let Asociado = (asociado == 0 ? "Fotografias Reporte  Asociado No. " : "Fotografias Reporte a Asociar No. "); 

    var $dialog = $('#testDiv')
        //.html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Fotografias",
            autoOpen: false,
            dialogClass: 'dialog_fixed,ui-widget-header',
            modal: true,
            height: 500,
            minWidth: $(window).width() * .90,
            minHeight: $(window).height() * .90,
            draggable: true
        });
        
    $dialog.dialog('open');

    //----- fotografias reporte Hijo------------
    var arrayFotografias = [];
    Fotografias = fotosHijo.slice(1);
    //console.info(Fotografias);
    $('#fotografia-galery').html(null)
    $('#fotografia-galery').html(null)
    arrayFotografias = Fotografias.split(',');
    //$.each(arrFotografias, function (i, obj) {
    //$('#header').append(` <h4 id="titulo1">Fotografias Reporte ${idReporte}</h4> <hr class="thick" />`)
    $('#header').text(Asociado +" "+ idReporte)
    $('#fotografia-galery').append(arrayFotografias.map((val) => `
            <div class=" d-inline-block" style="margin-top: 5px;">
                <a role="button" class="img-link" data-toggle="modal" data-target="#fotografiaModal" data-item='${JSON.stringify(val)}'>
                    <img width="200" title="Ver imagen" height="200" src="${thumbnail}Tipo=12&MaxPixels=200&ReporteID=${idReporte}&Fotografia=${val}&` + new Date().getTime() + `" alt="imagen galeria" />
                </a>
            </div>
        `))
    // });
    //------ fotografias reporte hijo fin ----------

    //------ fotografias reporte padre ---------- fotografia-galeryPadre
    var arrayFotografias = [];
    Fotografias = FotosPadre.slice(1);
    //console.info( "padre" +Fotografias);
    $('#fotografia-galeryPadre').html(null)
    arrayFotografias = Fotografias.split(',');
    //$.each(arrFotografias, function (i, obj) {
    $('#headerP').text("Fotografias Reporte Principal No. "+ ReporteID)
    $('#fotografia-galeryPadre').append(arrayFotografias.map((val) => `
            <div class=" d-inline-block" style="margin-top: 5px;">
                <a role="button" class="img-link" data-toggle="modal" data-target="#fotografiaModal" data-item='${JSON.stringify(val)}'>
                    <img width="200" title="Ver imagen" height="200" src="${thumbnail}Tipo=12&MaxPixels=200&ReporteID=${ReporteID}&Fotografia=${val}&` + new Date().getTime() + `" alt="imagen galeria" />
                </a>
            </div>
        `))
    // });
    //------ fotografias reporte padre fin ---------- 
}

function fnInicializaTablaReportesR() {
    $('#tableReportesRep').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "No hay reportes ",
            "info": "Mostrando _START_ de _TOTAL_ reportes",
            "infoEmpty": "Mostrando 0 de 0 de 0 reportes",
            "infoFiltered": "(Filtrado de _MAX_ total reportes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ reportes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay reportes encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
//::::::::::::::::::::::::::::::::::::::::::::::::: fin tabla posibles reportes Repetidos :::::::::::::::::::::::::::::::::::::::::::::::::


//::::::::::::::::::::::::::::::::::::::::::::::::: tabla reportes unidos :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function fnCargaReportesUnidos(idTramoPadre) { 
    let enumeracion = 0;

    $.ajax({
        async: true,
        url: `${urlbase}api/ReportesVialesRepetidos/obReportesUnidos/${idTramoPadre}`,  
        headers: { 
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#tableReportesRepUnido').dataTable().fnClearTable();
            $('#tableReportesRepUnido').dataTable().fnDestroy();
            $("#tableReportesRepUnido > tfoot, #tableReportesRepUnido > tbody").html(null);   //> tfoot, #table-renglones > tbody
            let cols = val.map((item) =>
                `
                    <tr>
                    <td class="spacer"></td>
                    <td class="text-center">${enumeracion = enumeracion + 1}</td>
                    <td class="text-center">
                         <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fotos(${item.idReporteHijo},'${item.Fotografias}','${item.FotografiasPadre}',0);" style="cursor:pointer" data-dismiss="modal"  title="Ver Fotografias">
                     <i class="fa-sharp fa-solid fa-images"></i>
                     </button>
                    </td>
                    <td class="text-center" style ="width: 70px;">${item.idReportePadre}</td>
                    <td class="text-center" style ="width: 70px;">${item.idReporteHijo}</td>
                    <td class="text-left" style ="width: 210px;">${item.Descripcion}</td>
                    <td class="text-center" style ="width: 70px;">${moment(item.FechaReporte).format('YYYY/MM/DD')}</td>
                    <td class="text-center">
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                    data-content="Seleccionar" data-placement="top" onclick="fnEliminarUnionReporte(${item.idReporteHijo},${item.idReportesRepetidos});" style="cursor:pointer"  title="Eliminar  reporte ${item.ReporteID}">
                    <i class="fa-solid fa-trash-can"></i>
                    </button>
                    </td>
                    <td class="spacer"></td>
                    </tr>`)
            $("#tableReportesRepUnido tbody").html(cols.join(""))
           fnInicializaTablaReportesUnidos();
        },
        error: () => { }
    })
}

function fnEliminarUnionReporte(idReporteChild,reporteRepetidoID) {
    Swal.fire({
        title: 'Seguro que desea eliminar el reporte ' + idReporteChild + ' del reporte ' + ReporteID,
        text: "Presione aceptar para eliminar el reporte",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    })
        .then((result) => {
            if (result.isConfirmed) {
                //alert("variables" + idReporteChild + reporteRepetidoID)
                fnEliminarReportesUnidos(idReporteChild, reporteRepetidoID)
            } else {
                //alert("calcelado")
            }
        })
}


function fnEliminarReportesUnidos(idHijo,idRepetido) {
    let fechaElimino = new Date();
    let fechaFormateadaE = moment(fechaElimino).format('YYYY/MM/DD');
    $.ajax({
        url: `${urlbase}api/ReportesVialesRepetidos/EliminarReportesRepetidos`,
        method: "POST",
        data: JSON.stringify({
            "idReporteHijo": idHijo,
            "idReporteRepetido": idRepetido,
            "UsuarioEliminoReporte": Usuariolog,
            "FechaEliminoReporte": fechaFormateadaE
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $.LoadingOverlay("hide");

            Swal.fire("Éxito", "Eliminado  Correctamente", "success").then(function () {
                fnCargaReportesUnidos(ReporteID);
                fnCargaReportePosibles(tramoID, ReporteID, 4);
            });

        },
        error: (error) => {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        }
    })
}

function fnInicializaTablaReportesUnidos() {
    $('#tableReportesRepUnido').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "No hay reportes ",
            "info": "Mostrando _START_ de _TOTAL_ reportes",
            "infoEmpty": "Mostrando 0 de 0 de 0 reportes",
            "infoFiltered": "(Filtrado de _MAX_ total reportes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ reportes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay reportes encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
//::::::::::::::::::::::::::::::::::::::::::::::::: fin tabla posibles reportes Repetidos :::::::::::::::::::::::::::::::::::::::::::::::::

$('#btnRegresar').on("click", () => {
    document.location.href = "frmEdicionReportesViales.aspx?params= " + btoa(ReporteID); //btoa codifica la cadena
    
})