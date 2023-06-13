var baseHostURL;
var vUsuarioEsModoSupervisor = false;
$(document).ready(function () {
    fnConsultarToken();
    fnInicializaTableSolicitudes();

})
function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "frmSolicitudes.aspx/fObtenerToken",
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
                    vRolUsuarioActual = registro.rol_usuario;
                    baseHostURL = registro.baseURL;
                    proxyurl = registro.proxyURL;
                    baseSitio = registro.baseSitio;

                });
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}




function fnInicializaTableSolicitudes() {
    $('#tableSolicitudes').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin auxiliares para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ auxiliares",
            "infoEmpty": "Mostrando 0 de 0 de 0 auxiliares",
            "infoFiltered": "(Filtrado de _MAX_ total auxiliares)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ auxiliares",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron auxiliares",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaSolicitudes() {
    var tiposolicitud = 299;
    var x = document.getElementById("cmbEstados").value;
    console.log("Estado:",x);
        var url = baseHostURL + "api/Solicitudes/ObtenerSolicitudXNit/" + x + "/" + tiposolicitud;
        //console.log(url);
        //alert(url);
        fetch(proxyurl + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + vToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                var estadoRespuesta = response.status;
                if (estadoRespuesta == 200) return response.json();
                else if (estadoRespuesta == 401) {
                    fnRefrescarToken(vToken);
                    var interval = setInterval(function () {
                        if (vToken !== '') {
                            fnCargarTablaSolicitudes();
                            clearInterval(interval)
                        }
                    }, 1000);
                }
                else if (estadoRespuesta == 404) {
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {
                $('#tableSolicitudes').dataTable().fnClearTable();
                $('#tableSolicitudes').dataTable().fnDestroy();

                var datos = data;
                var contador = 1;

                $("tbody").children().remove();
                vCantidadRegistrosEncontrados = 0;
                if (datos.length > 0) {
                    datos.forEach(function (registro) {

                        var funcionLlamarEditar = "mostrarModalEditarSolicitud(" + registro.ID + "," +
                            "'" + registro.PrimerNombre + "', '" + registro.SegundoNombre + "','" + registro.PrimerApellido + "'," +
                            "'" + registro.SegundoApellido + "', '" + registro.Descripcion + "','" + registro.DPI + "'," +
                            "'" + registro.CorreoElctronico + "', '" + registro.Telefono + "','" + registro.NombreEmpresa + "'," +
                            "'" + registro.PathDocDPI + "', '" + registro.PathDocPatente + "','" + registro.PathDocRepresentante + "'," +
                            "'" + registro.NombreArchivoDPI + "', '" + registro.NombreArchivoPatente + "','" + registro.NombreArchivoRepresentante + "'," +
                            "'" + registro.NitEmpresa + "', '" + registro.AnioInicio + "','" + registro.AnioFin + "','" + registro.Estado + "')";

                        var estadoAprobacion = "";
                        if (registro.DocAprobada) {
                            estadoAprobacion = "Aprobado";
                        } else {
                            estadoAprobacion = "Sin aprobar";
                        }

                        

                        var tbody = '<tr class="tr_data" >' +
                            '<td class="spacer"></td>';
                        tbody += '<td style="width: 50px">' +
                            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '           data-content="VerVentanaEdicion" data-placement="top" title="Ver detalle" onclick="' + funcionLlamarEditar + '">' +
                            '           <i class="fas fa-search fa-lg fa-fw"></i></a> ' +
                            '</td>';
                        tbody += '<td>' + registro.ID + '</td>' +
                            '<td>' + registro.NitEmpresa + '</td>' +
                            '<td>' + registro.Estado + '</td>' +
                            '<td>' + registro.FechaCreo + '</td>' +
                            '<td class="spacer"></td>'+
                            '</tr>';

                        $('#tableSolicitudes').append(tbody);

                        contador = contador + 1;
                    })
                    vCantidadRegistrosEncontrados = contador;
                    fnInicializaTableSolicitudes();
                    $.LoadingOverlay("hide");
                }
            }).catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de solicitudes. " + error.message + "  ", "success");
            });
    }

function mostrarModalEditarSolicitud(ID, PrimerNombre, PrimerApellido, SegundoNombre, SegundoApellido, Descripcion, DPI, CorreoElctronico, Telefono, NombreEmpresa, PathDocDPI, PathDocPatente, PathDocRepresentante, NombreArchivoDPI, NombreArchivoPatente, NombreArchivoRepresentante, NitEmpresa, AnioInicio, AnioFin, Estado) {
   // console.log(NombreArchivoDPI, NombreArchivoPatente, NombreArchivoRepresentante);
        var Encabezado = "Número Solicitud:";
        //var fechaColegiacionFormateada = "";
       
        //modoNuevoAuxiliar = false;
        //vIdAuxiliarSiendoEditado = IdAuxiliar;

    if (Estado =="CREADA") {
        //console.log(ID);
        document.getElementById("btnRevision").style.display = "block";
        document.getElementById("btnImprimir").style.display = "none"
        document.getElementById("btnDesaprobar").style.display = "none";
        document.getElementById("LinkDescargaConstancia").style.display = "none";
        $('#nav-docs-tab').show();
        $('#nav-aprobacion-tab').show();
        $('#nav-info-tab').show();

        //document.getElementById('letreroModalEdicion').innerHTML = Nombre + " " + Apellido;
        document.getElementById('letreroModalEdicion').innerHTML = ID;
        $('#txtPrimerNombre').val(PrimerNombre);
        $('#txtSegundoNombre').val(PrimerApellido);
        $('#txtPrimerApellido').val(SegundoNombre);
        $('#txtSegundoApellido').val(SegundoApellido);
        $('#txtGenero').val(Descripcion);
        $('#txtDPI').val(DPI);
        $("#txtEmail").val(CorreoElctronico);
        $('#txtDPI').val(DPI);
        $('#txtTelefono').val(Telefono);
        $('#txtNombreEmpresa').val(NombreEmpresa);
        $('#txtNitEmpresa').val(NitEmpresa);
        $('#txtAnioInicio').val(AnioInicio);
        $('#txtAnioFin').val(AnioFin);



        //document.getElementById('txtNitEmpresa').innerHTML = NitEmpresa;
        document.getElementById('lblNombreArchivoDPI').innerHTML = NombreArchivoDPI;
        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoDPI);
        document.getElementById('lblNombreArchivoPatente').innerHTML = NombreArchivoPatente;
        document.getElementById('hrefNombreArchivoPatente').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoPatente);
        document.getElementById('lblNombreArchivoRepresentacion').innerHTML = NombreArchivoRepresentante;
        document.getElementById('hrefNombreArchivoRepresentacion').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoRepresentante);


        document.getElementById('nav-info-tab').click();
        $('#modalEdicionSolicitud').show();
    }
    if (Estado =="RECHAZADA") {
        document.getElementById("btnRevision").style.display = "none";
        document.getElementById("btnImprimir").style.display = "none"
        document.getElementById("btnDesaprobar").style.display = "none";
        document.getElementById("LinkDescargaConstancia").style.display = "none";
        $('#nav-docs-tab').show();
        $('#nav-aprobacion-tab').show();
        $('#nav-info-tab').show();

        //document.getElementById('letreroModalEdicion').innerHTML = Nombre + " " + Apellido;
        document.getElementById('letreroModalEdicion').innerHTML = ID;
        $('#txtPrimerNombre').val(PrimerNombre);
        $('#txtSegundoNombre').val(PrimerApellido);
        $('#txtPrimerApellido').val(SegundoNombre);
        $('#txtSegundoApellido').val(SegundoApellido);
        $('#txtGenero').val(Descripcion);
        $('#txtDPI').val(DPI);
        $("#txtEmail").val(CorreoElctronico);
        $('#txtDPI').val(DPI);
        $('#txtTelefono').val(Telefono);
        $('#txtNombreEmpresa').val(NombreEmpresa);
        $('#txtNitEmpresa').val(NitEmpresa);
        $('#txtAnioInicio').val(AnioInicio);
        $('#txtAnioFin').val(AnioFin);



        //document.getElementById('txtNitEmpresa').innerHTML = NitEmpresa;
        document.getElementById('lblNombreArchivoDPI').innerHTML = NombreArchivoDPI;
        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoDPI);
        document.getElementById('lblNombreArchivoPatente').innerHTML = NombreArchivoPatente;
        document.getElementById('hrefNombreArchivoPatente').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoPatente);
        document.getElementById('lblNombreArchivoRepresentacion').innerHTML = NombreArchivoRepresentante;
        document.getElementById('hrefNombreArchivoRepresentacion').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoRepresentante);


        document.getElementById('nav-info-tab').click();
        $('#modalEdicionSolicitud').show();
    }
    if (Estado =="APROBADA") {
        document.getElementById("btnRevision").style.display = "none";
        document.getElementById("btnImprimir").style.display = "none"
        document.getElementById("btnDesaprobar").style.display = "none";
        document.getElementById("LinkDescargaConstancia").style.display = "block";
        $('#nav-docs-tab').show();
        $('#nav-aprobacion-tab').show();
        $('#nav-info-tab').show();

        //document.getElementById('letreroModalEdicion').innerHTML = Nombre + " " + Apellido;
        document.getElementById('letreroModalEdicion').innerHTML = ID;
        $('#txtPrimerNombre').val(PrimerNombre);
        $('#txtSegundoNombre').val(PrimerApellido);
        $('#txtPrimerApellido').val(SegundoNombre);
        $('#txtSegundoApellido').val(SegundoApellido);
        $('#txtGenero').val(Descripcion);
        $('#txtDPI').val(DPI);
        $("#txtEmail").val(CorreoElctronico);
        $('#txtDPI').val(DPI);
        $('#txtTelefono').val(Telefono);
        $('#txtNombreEmpresa').val(NombreEmpresa);
        $('#txtNitEmpresa').val(NitEmpresa);
        $('#txtAnioInicio').val(AnioInicio);
        $('#txtAnioFin').val(AnioFin);



        //document.getElementById('txtNitEmpresa').innerHTML = NitEmpresa;
        document.getElementById('lblNombreArchivoDPI').innerHTML = NombreArchivoDPI;
        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoDPI);
        document.getElementById('lblNombreArchivoPatente').innerHTML = NombreArchivoPatente;
        document.getElementById('hrefNombreArchivoPatente').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoPatente);
        document.getElementById('lblNombreArchivoRepresentacion').innerHTML = NombreArchivoRepresentante;
        document.getElementById('hrefNombreArchivoRepresentacion').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoRepresentante);


        document.getElementById('nav-info-tab').click();
        $('#modalEdicionSolicitud').show();
    }
    if (Estado =="EN REVISIÓN") {
        document.getElementById("btnRevision").style.display = "none";
        document.getElementById("btnImprimir").style.display = "block"
        document.getElementById("btnDesaprobar").style.display = "block";
        document.getElementById("LinkDescargaConstancia").style.display = "none";

        $('#nav-docs-tab').show();
        $('#nav-aprobacion-tab').show();
        $('#nav-info-tab').show();

        //document.getElementById('letreroModalEdicion').innerHTML = Nombre + " " + Apellido;
        document.getElementById('letreroModalEdicion').innerHTML = ID;
        $('#txtPrimerNombre').val(PrimerNombre);
        $('#txtSegundoNombre').val(PrimerApellido);
        $('#txtPrimerApellido').val(SegundoNombre);
        $('#txtSegundoApellido').val(SegundoApellido);
        $('#txtGenero').val(Descripcion);
        $('#txtDPI').val(DPI);
        $("#txtEmail").val(CorreoElctronico);
        $('#txtDPI').val(DPI);
        $('#txtTelefono').val(Telefono);
        $('#txtNombreEmpresa').val(NombreEmpresa);
        $('#txtNitEmpresa').val(NitEmpresa);
        $('#txtAnioInicio').val(AnioInicio);
        $('#txtAnioFin').val(AnioFin);



        //document.getElementById('txtNitEmpresa').innerHTML = NitEmpresa;
        document.getElementById('lblNombreArchivoDPI').innerHTML = NombreArchivoDPI;
        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoDPI);
        document.getElementById('lblNombreArchivoPatente').innerHTML = NombreArchivoPatente;
        document.getElementById('hrefNombreArchivoPatente').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoPatente);
        document.getElementById('lblNombreArchivoRepresentacion').innerHTML = NombreArchivoRepresentante;
        document.getElementById('hrefNombreArchivoRepresentacion').setAttribute('href', "http://www.covial.gob.gt:1090/SICOP-Monitoreo/Solicitudes/" + NitEmpresa + '/' + NombreArchivoRepresentante);


        document.getElementById('nav-info-tab').click();
        $('#modalEdicionSolicitud').show();
    }
        
}

//Actualizar estado de la solicitud en revisión
$("#btnRevision").on("click", () => {
    let id = document.getElementById('letreroModalEdicion').innerHTML;
    let data = {
        "EmpresaNit": $('#txtNitEmpresa').val(),
        "EstadoId": 307,
        "IDSolicitud": id,
        "UsuarioModifico": usuario
    };
    $.ajax({
        url: `${urlbase}/api/Solicitudes/ActualizarEstadoSolicitud`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "La solicitud se encuentra en revisión"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "La solicitud se encuentra en revisión", "success").then(function () { });
            $('#modalEdicionSolicitud').modal('hide')
            fnCargarTablaSolicitudes();
        },
        error: function (response) {
            Swal.fire("Error", "No se le pudo cambiar el estado a la solicitud", "error")
            return false
        }
    });
});

//Actualizar estado de la solicitud desaprobada
$("#btnDesaprobar").on("click", () => {
    let id = document.getElementById('letreroModalEdicion').innerHTML;
    let data = {
        "EmpresaNit": $('#txtNitEmpresa').val(),
        "EstadoId": 305,
        "IDSolicitud": id,
        "UsuarioModifico": usuario
    };
    $.ajax({
        url: `${urlbase}/api/Solicitudes/ActualizarEstadoSolicitud`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "La solicitud a sido desaprobada"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "La solicitud ha sido desaprobada", "success").then(function () { });
            $('#modalEdicionSolicitud').modal('hide')
            fnCargarTablaSolicitudes();

        },
        error: function (response) {
            Swal.fire("Error", "No se puede desaprobar la solicitud", "error")
            return false
        }
    });
});

//Actualizar estado de la solicitud aprobada
   
const fnAprobar = () => {
    let id = document.getElementById('letreroModalEdicion').innerHTML;
    let firma = '!"%%*/*-:::....156#$#%r#$';
    let data = {
        "idSolicitud": id,
        "EmpresaNit": $('#txtNitEmpresa').val(),
        "EstadoId": 306,
        "UsuarioModifico": usuario,
        "TipoSolicitud": 299,
        "FirmaElectronica": usuario
    };
    $.ajax({
        url: `${urlbase}/api/Solicitudes/ActualizarEstadoSolicitud`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "La solicitud a sido desaprobada"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "La solicitud ha sido desaprobada", "success").then(function () {
             $('#modalEdicionSolicitud').modal('hide')
             fnCargarTablaSolicitudes();
            });
        },
        error: function (response) {
            Swal.fire("Error", "No se puede desaprobar la solicitud", "error")
            return false
        }
    });
}


//Actualizar estado de la solicitud aprobada
$("#btnImprimir").on("click", () => {
    let Empresanit = $('#txtNitEmpresa').val();
    let Anio1 = $('#txtAnioInicio').val();
    let Anio2 = $('#txtAnioFin').val();
    let id = document.getElementById('letreroModalEdicion').innerHTML;

    var vReporte = 'RptConstanciaSolicitudSinFirma.mrt';
    var QueryString = '?Parameters="' + Empresanit + '",' + Anio1 + ',' + Anio2 + '' + '&IdReporte=1' + '&Id=' + id + '&Reporte=' + vReporte;
    $.ajax({
        type: "POST",
        url: "../FrmVisorReporteSolicitudes.aspx" + QueryString,
        //data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
    llamarPdf64();
});


const llamarPdf64 = () => {
    let id = document.getElementById('letreroModalEdicion').innerHTML;
    var dataJSONt = JSON.stringify({
        Id: id
    });
        $.ajax({
            type: "POST",
            url: "../FrmVisorReporteSolicitudes.aspx/Pdf64",
            data: dataJSONt,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var vRespuestaJSON = JSON.parse(data.d);
                FnFirmar(vRespuestaJSON);
            },
            failure: function (response) {
                Swal.fire("", response, "error");
            }
        });
    }

const FnFirmar = (documento)=>{
    var newText = documento;
    let vUsername = "5192088";
    let vPassword = "4ak8pCm9";
    let vPin = "abc123**";
    let vFormat = "pades";
    let vBilling_username = "ccg@ccg";
    let vBilling_password = "D6eXbdSJ";
    //let vFile_in = "JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvTGFuZyhlcy1HVCkgL1N0cnVjdFRyZWVSb290IDEwIDAgUi9NYXJrSW5mbzw8L01hcmtlZCB0cnVlPj4vTWV0YWRhdGEgMjAgMCBSL1ZpZXdlclByZWZlcmVuY2VzIDIxIDAgUj4+DQplbmRvYmoNCjIgMCBvYmoNCjw8L1R5cGUvUGFnZXMvQ291bnQgMS9LaWRzWyAzIDAgUl0gPj4NCmVuZG9iag0KMyAwIG9iag0KPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzcgNyAwIFIvR1M4IDggMCBSPj4vUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldID4+L01lZGlhQm94WyAwIDAgNjEyIDc5Ml0gL0NvbnRlbnRzIDQgMCBSL0dyb3VwPDwvVHlwZS9Hcm91cC9TL1RyYW5zcGFyZW5jeS9DUy9EZXZpY2VSR0I+Pi9UYWJzL1MvU3RydWN0UGFyZW50cyAwPj4NCmVuZG9iag0KNCAwIG9iag0KPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAxNTQ+Pg0Kc3RyZWFtDQp4nJ2OQQuCQBSE7w/ef5ijBq1vF2xXEA+uJgaC0UKH6FieCqr/D23ixWtzGBgY5htkI8oyG3zfQKoKdePxYhIlPxXaQLCLbguD943pvMGTqQ5M2V5Da4Q7k44lgYY1SkwOK4XKHcIjlrqTxfSJg5jm5JbUMV2SJt2aZExd0qdXhANTG3ePTH8fcFaZ9YGZu+CwpqAdPL7thDCnDQplbmRzdHJlYW0NCmVuZG9iag0KNSAwIG9iag0KPDwvVHlwZS9Gb250L1N1YnR5cGUvVHJ1ZVR5cGUvTmFtZS9GMS9CYXNlRm9udC9CQ0RFRUUrQ2FsaWJyaS9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcvRm9udERlc2NyaXB0b3IgNiAwIFIvRmlyc3RDaGFyIDMyL0xhc3RDaGFyIDgwL1dpZHRocyAxOCAwIFI+Pg0KZW5kb2JqDQo2IDAgb2JqDQo8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL0JDREVFRStDYWxpYnJpL0ZsYWdzIDMyL0l0YWxpY0FuZ2xlIDAvQXNjZW50IDc1MC9EZXNjZW50IC0yNTAvQ2FwSGVpZ2h0IDc1MC9BdmdXaWR0aCA1MjEvTWF4V2lkdGggMTc0My9Gb250V2VpZ2h0IDQwMC9YSGVpZ2h0IDI1MC9TdGVtViA1Mi9Gb250QkJveFsgLTUwMyAtMjUwIDEyNDAgNzUwXSAvRm9udEZpbGUyIDE5IDAgUj4+DQplbmRvYmoNCjcgMCBvYmoNCjw8L1R5cGUvRXh0R1N0YXRlL0JNL05vcm1hbC9jYSAxPj4NCmVuZG9iag0KOCAwIG9iag0KPDwvVHlwZS9FeHRHU3RhdGUvQk0vTm9ybWFsL0NBIDE+Pg0KZW5kb2JqDQo5IDAgb2JqDQo8PC9BdXRob3IoUGV0ZXIgR2lvdmFubmkgU2FudGlhZ28gWmFwYXRhKSAvQ3JlYXRvcij+/wBNAGkAYwByAG8AcwBvAGYAdACuACAAVwBvAHIAZAAgADIAMAAxADkpIC9DcmVhdGlvbkRhdGUoRDoyMDIyMTEwODE1MDExNi0wNicwMCcpIC9Nb2REYXRlKEQ6MjAyMjExMDgxNTAxMTYtMDYnMDAnKSAvUHJvZHVjZXIo/v8ATQBpAGMAcgBvAHMAbwBmAHQArgAgAFcAbwByAGQAIAAyADAAMQA5KSA+Pg0KZW5kb2JqDQoxNyAwIG9iag0KPDwvVHlwZS9PYmpTdG0vTiA3L0ZpcnN0IDQ2L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjk2Pj4NCnN0cmVhbQ0KeJxtUdFqwjAUfRf8h/sHt7GtYyDCmMqGWEor7KH4EOtdDbaJpCno3y937bADX8I5N+ecnCQihgBEBLEA4UEQg/DodQ5iBlE4AxFCFPvhHKKXABYLTFkdQIY5pri/XwlzZ7vSrWtqcFtAcABMKwhZs1xOJ70lGCwrU3YNaffMKbhKdoDBNVLsLVFmjMPM1LSTV+7Ieam0Pot3uS5POCbqY0a7Cd3clu4ghuiNz9LGESa8rPXpQfZeejQ3zKl0+EHyRLbH7PnDn7pWmvKz5IY8eNM+QTpl9MCtU9/Sg1/2ZezlaMzlcXuetGcixyUd7mRpzYi/n/064isla1ONBnmtTjTS9ud4WWVlgxtVdZaGuyZd0xb8x/N/r5vIhtqip4+nn05+AFQKorsNCmVuZHN0cmVhbQ0KZW5kb2JqDQoxOCAwIG9iag0KWyAyMjYgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDYxNSAwIDAgMCAwIDI1MiAwIDAgMCAwIDAgMCA1MTddIA0KZW5kb2JqDQoxOSAwIG9iag0KPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAyMDU5Ni9MZW5ndGgxIDgzNzIwPj4NCnN0cmVhbQ0KeJzsfQd4lFXa9jnvOy1TkpkwkzYkM2GSEBhIKAESQDKQAqEHGEioqRAwdJAiYBQEjWJvKCI2dAV1MoAEsKBrW3tb61rYVVdXsesqQvLd533mhLKr3/77ub/rdc2T3O99n+eUOf19chkM44wxOx46VlUyrHjSnRPfqGE88xvGlDdLho0u2motH824bw3SK8dNzO1z48PVexnjF6BWVe386kWGNsNGxs68ijG1uPasZd79i17vx9j2LxjT3z970Zz5695RBzC24HXGbP45jatm35TzUDtjO3Yx5nq/ob667vsxq0Joz4r2+jfAYbu78xGki5HOaJi/bOXMm2LRNv+Isbm7GhfWVucX9EH5+y9D8cnzq1cuyrFkvoH8BpT3zq9fVn39edvPYjz7BaQ3LKieX7/t6LezGPsK9XstXbRw6bJ2N9uI8UwX5RctqV/UaU6XZMbW6PBxnzAxF4aBh6+cc/amWXGDv2XJJibs4CdrnhH8WtmKcT8ePd4U86mpP5IxTGFkqGdgbYw/at7+49Gj22M+1Vo6yZJ3CY+7O2tidjYY9RRwLtvEWHx/7XM5U3V+fhnTM5N+i74vmkwjVl9gGxVmYkqcXlEUnaro3mc57YdYxtlaD2BjJnq9LMBY5jPUB+M2JcvLeLvIU/fpY8VImVMXe6I3/Hn2i5vuU7brl2+VTNH98m0bXvvl2tR1+c+N/bdgunp283+qbf7pL9+2wfDLtak+dqIt9ch/bh5+K6bLY1W/dh+i9n835Sm25dfuw2/BlA/YiH+nHv+ONf7SfYla1KIWtaj9+6bcwM0/mVfFjvz/7MtvxdR+7KJfuw9Ri1rUoha1f990D7PZv2R76ih2yek+vuNUn27+ibTy+j+Wj1rUoha1qEUtalGLWtSiFrWoRU3a/+vPmdKiP29GLWpRi1rUoha1qEUtalGLWtSiFrWo/fcYj/42etSiFrWoRS1qUYta1KIWtahFLWpRi1rUoha1qEUtalGLWtSiFrWoRS1qUYta1KIWtahFLWpRi1rUoha1qEUtalGL2n+JtR/4tXsQtaj9yqZG0Dnyl6QOIAWl7GA6tg3pLswLJf7+lA26mJWxMWw8q2NL2PbUXqn9UgtSh3hjMp9p1/4KFMp4f7YMb/8W5+6V9g/b/86M7D6e0l77ySb6OtL13TMifUj7+R6rI9VrmYF/qqW+PP0vYCGtRP5elsJ+3vhJ7f3fLalD5Ua4WHtO+deq85Sfybv43+zTr2XqL9raf/VODEzdeP6ypUsWL1q4YH7jmfPmNsyZXV9XM2vmjOnTplZWBCdNnFA+ftzYMaNHjSwbMby0pLho2NBA4ZAzBg8aWJA/oH+/3JyePbKzMjN8XTxJToc9zmYxx5iMBr1OVTjrUeIrrfKGsqpCuizfiBE9RdpXDUf1SY6qkBeu0lPLhLxVWjHvqSUDKDn7tJIBKhnoKMnt3sFscM8e3hKfN/Rssc/byqeWV0BvLvZVekNHND1G07osLWFDIj0dNbwlSQ3F3hCv8paESs9qaC6pKkZ7LRZzka+o3tyzB2sxWyAtUKFs36IWnj2Ea0LJLhnYojCTTXxsSM0sqa4LjS+vKCl2p6dXaj5WpLUVMhSFjFpb3rmiz+wib0uPQ80Xt9pZTZXfWuerq55eEVKrUalZLWlu3hRy+EPdfMWhbqvfT8KQ60M9fMUlIb8PjY2a0PEBPKTPtPu8zd8ydN535NNTPdURjyHT/i0TUgyxY5qQLzVD39BDjC89XfTlotYAq0Ei1FReQWkvq3GHWSDXXxlSqkTOIZnjCoqcJpnTUb3Kly6WqqQq8n1WQ1KoqcbbswdmX/vOxDfyvSE1q6qmtkFwdX2zr7iY5m1SRShQDBGojoy1pKVXLspXV2EQc8U0lFeEcn2LQk7fMCoAh1eswdyJFVqVSLWQsyjEqmojtUK5JcWiX96S5qpi6qBoy1desZ/1bX+vJc/r3t2X5bFK0Y9QQhEWJaukuaJudshT5a7D/pztrXCnhwKVmL5KX0V9pVglnz3U7T18XLr2iVotjO200rKwGLkx0+StUNxqpVgtOLylePiGDUaGHculJcWKDhvsreBuJovhUyIlhDqlHSTUzKIRIksVVYtGuNMr08l+pkvuSJ/0mSHTSW3Z4ejoE33OT3aNSosOdfOW1Bef1MFTGtVHOhhp7Z/3UxFzEflg1DCJ5Rwhs9RMnFz4FDSjucQqJnlDbLy3wlfvq/RhDwXGV4ixibnW1nfURN+o8qkV2mpHdsmkU1KUn0+pEEtHtkwoRdiDpX63XFYtPVxLdyRHnJZdJrN9ol/NzXUtTM0UW9ndwjWhL7qoMjTOX+kL1fh96aKfPXu0mJg1fVJVEc5qKa47X2m1z2v3ljZXt7Y31TS3BALNi0qqGgbiXDT7yuqafRMrBru1zk+oWOteLT47no3ioyYNQ1MKG9bi4xeUtwT4BROnVuy3M+a9YFJFWOFKUdWwypYM5FXs9zIW0LyK8AqnSHhFQrQ0AQmTVt69P8BYk5ar0xxauraVM81nkj7OalsV8tnpg7K0DwrgzVfbqqOcgCytg89EviYqnR0pbUKOXeQcYIqI50QmWQsTExww6wOmQEzAqtgUTKlwheE5gLIxnO22cht3t6DNCZq7lTe1xATc+7WWJkRKNqGk8DV1+NBzUeykhvB5NPDgiREEp1bstjK0rz1RYpgw7MKkBuwhvE9KvHVi/62pbGiuqhS3B0vAXsU3D3HfEBZSfEPQY4M1ZPbVDwtZfMOEv1D4C8lvEH4jdj5P4Fhscek2V/lwEePEVDA3p7Omiia9re3tkyrSn3UfqUzHWZoOTK0IxfjxctNnjkS54QJVcA8PNdVWi36wYIWoa8wsq63EuZQNokhZKAYtxERaQIlSrY44b6hUi71W7dMk3Lg6mipDlX7xoRVzK7Xzag+xEb6BIUMWtanPEh+UW9kc7+ujXT446+bMTYJi0Dc2sYI8biTxYZU0SUYrel7rQ1ZtlZf2yEScZXpZmN3kqcedr8uq12B2RzKZGJaaabGZQzE5aBDfQltyxJ2jzzRWVlLntdSmSAF8tj1kQY+yTprKSAXMDrLKRF/wvQldFUUfFs2Ut7IJvpW4OkWntZaMyA7ZMsuq8Xaj+hZ4fPmysklcgpZIG4+S1yhGbsW840pobb/Dtyr9JMPdId5+Yv8x934cVFbZfLojNM3fs4fpdK9Nczc3m2z/vALNl8nWwZpTyawVbwWw2HDafvOWiFelb2SLMtavMde4eaQPbxAlUwCBjorjk+6tqxSl0OXx2l32k4X4SYXEa1prvNk+SKZ4JEWL2Ryac2qyoSNZKoBgMDOHYggMRdy12Cvz3KFG7ExZRKyIt9lr9w30iYdWebhAFRap41hg+2PXiUPTVOutqMFmR4OlVc2lzSJEra2OTFvkk0IL/Kc0iXPBsXnQkBhOqGm8t6rSW4XQlJdXpKe7cRrB3tmIU33V4lUwnsYzfqoWqlQ3iy3OEKlUukNGvJhmV9f70vEGCYkbiGZf9FEXOTbM3dzsaw5p57YUhdF8Fo5dmSB8L/L7qutFCD1bRND1Wt1SdFebHdGau8SHs1wPtzaXmDhcfTXiUdssAvQZVX7MhKM5vtlb0IwreAbeHrqs2slVeFWJN5JXW+pqN1KYhDKRqkRDVDAmUxSkIyB6M9/fMsOYecKjfS/0U2GT1ip6NqEiNF4W0c6TEIv9ISUxH5li8HzC1Ap5T6kiuwzTG8Cucova3pAyqSKyPFr9MlHVLReMqsGjvUMi56vjbSPfQ9PdmNOf9OPloA6dqDypPM7ymUd5IsJvs3zlTRZU3gC/Bn49wq+C/wh+Bfwy+CXwi+CHwA+CHwDfz4JMp7zF8oBJgNqh6oDbgFcAPTsTLXFmQX3OnMojrBioA5YBVwF6lH0QebehRc68yoY9MUl8JBZ0vRTnSXGuFE1SnCPFOinWSrFGirOlWC3FKilWSrFCirOkWC7FMimWSrFYikVSLJRigRTzpWiU4kwp5kkxV4oGKeZIMVuKeinqpKiVokaKaimqpJglxUwpZkgxXYppUkyVolKKCimmSDFZiqAUk6SYKMUEKcqlGC/FOCnGSjFGitFSjJJipBRlUoyQYrgUpVKUSFEsRZEUw6QYKkVAikIphkhxhhSDpRgkxUApCqTIl2KAFP2l6CdFnhR9pegjRW8pekmRK0WOFD2l6CGFX4ruUnSTIluKrlJkSZEpRYYUPim6SJEuhVcKjxRpUqRK0VkKtxQpUiRLkSRFohQJUrikcErRSYp4KRxS2KWIkyJWCpsUViksUpiliJHCJIVRCoMUeil0UqhSKFJwKVhE8HYp2qQ4LsUxKX6U4qgUP0jxvRR/l+I7Kb6V4hspvpbiKym+lOILKT6X4jMpjkjxqRSfSPE3KT6W4iMp/irFh1J8IMX7UvxFij9LcViK96R4V4p3pHhbij9J8ZYUb0rxhhSvS/GaFK9K8UcpXpHiZSlekuJFKV6Q4nkpnpPiWSmekeJpKZ6S4g9SPCnFE1I8LsVjUjwqxe+leESKh6U4JMVDUjwoxQNS3C/FQSkOSLFfilYp9klxnxR7pdgjxW4pwlK0SBGS4l4p7pHibil2SbFTiruk+J0Ud0pxhxQ7pLhditukuFWKW6S4WYrtUtwkxTYpbpRiqxQ3SHG9FFukuE6Ka6W4RoqrpbhKiiuluEKKy6W4TIpLpbhEis1SXCzFRVI0S3GhFBdIsUmKjVKcL4UMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe7gMe/gSKWT8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2X8w2XYw2XYw2XYw2W0w2W0w2W0w2W0w2W0w2W0w2W0w2W0w2W0w4t2C9GqbAinDfEgZg6nuUDnUerccNpAUBOlziFaF06zgtZSag3R2USriVaFU4eCVoZTi0AriM4iWk55yyi1lGgJOReHU4eBFhEtJFpAReYTNRKdGe5cAppHNJeogWgO0exw52JQPaXqiGqJaoiqiaqIZhHNpHozKDWdaBrRVKJKogqiKUSTiYJEk4gmEk0gKicaTzSOaCzRGKLRRKOIRobdZaAyohFh90jQcKLSsHsUqCTsHg0qJioiGkZ5Q6legKiQ6g0hOoNoMJUcRDSQqhcQ5RMNIOpP1I8ayyPqS630IepN1IsayyXKoXo9iXoQ+Ym6E3UjyibqSk1nEWVSmxlEPqIu1HQ6kZfqeYjSiFKJOhO5iVLCKWNByURJ4ZRxoESiBHK6iJzk7EQUT+SgPDtRHDljiWxEVsqzEJmJYijPRGQkMoSTx4P04eRykI5IJadCKU7ENOLtRG1aEX6cUseIfiQ6Snk/UOp7or8TfUf0bThpEuibcNJE0NeU+oroS6IvKO9zSn1GdIToU8r7hOhv5PyY6COivxJ9SEU+oNT7lPoLpf5MdJjoPcp7l+gdcr5N9Ceit4jepCJvUOp1otfCiVNAr4YTJ4P+SPQKOV8meonoRaIXqMjzRM+R81miZ4ieJnqKivyB6ElyPkH0ONFjRI8S/Z5KPkKph4kOET1EeQ8SPUDO+4kOEh0g2k/USiX3Ueo+or1Ee4h2hxMKQeFwwjRQC1GI6F6ie4juJtpFtJPornAC7mv+O2rlTqI7KG8H0e1EtxHdSnQL0c1E24luosa2USs3Em2lvBuIrifaQnQdVbiWUtcQXU10FeVdSa1cQXQ55V1GdCnRJUSbiS6mkhdRqpnoQqILiDYRbQy7qkHnh101oA1E68Ou2aDziM4Nu4KgprALlzE/J+zqD1pHtJaqr6F6ZxOtDrvqQKuo+kqiFURnES0nWka0lJpeQtUXEy0Ku2pBC6mxBVRyPlEj0ZlE84jmUr0GojnUs9lUvZ6ojkrWEtUQVRNVEc0imkmDnkE9m040jQY9lZqupA+qIJpC3Z1MHxSkViYRTSSaQFQedgZA48NO8Qnjwk6xvceGnetBY8LOnqDRVGQU0ciwE3EBL6PUCKLh5CwNO9eBSsLOTaDisPMcUFHY2QQaFo4vBQ0lChAVEg0Jx+P9zs+g1OCwoxI0iGhg2CG2RgFRftgxHDQg7KgA9Q87poL6UV4eUd+woweoD5XsHXaIgfUKO8TZzCXKoeo96RN6EPmpse5E3aixbKKuRFlEmWGHmKUMIh+12YXaTKfGvNSKhyiN6qUSdSZyE6UQJYftM0BJYftMUGLYPguUQOQichJ1IoqnCg6qYCdnHFEskY3ISiUtVNJMzhgiE5GRyEAl9VRSR06VSCHiRCzQHlfjEWiLq/Ucj6vzHIP+ETgK/ADf9/D9HfgO+Bb4Bv6vga+Q9yXSXwCfA58BR+D/FPgEeX9D+mPgI+CvwIexczwfxDZ43gf+AvwZOAzfe+B3gXeAt5H+E/gt4E3gDeB125me12y9Pa+C/2hr9Lxiy/K8DLwE/aLN73kBeB54DvnPwveMbb7naeinoP8A/aRtnucJ21zP47YGz2O2OZ5HUff3aO8R4GEg0H4Iz4eAB4EHrIs991uXeA5al3oOWJd59gOtwD747wP2Im8P8nbDFwZagBBwr2WV5x7Las/dljWeXZa1np2WdZ67gN8BdwJ3ADuA2y09PbeBbwVuQZ2bwdstZ3pugt4GfSOwFfoGtHU92tqCtq6D71rgGuBq4CrgSuAK1Lsc7V1mHuu51DzOc4l5jmez+XbPxeY7POermZ4Nar5nPc/3nBdsCp67syl4TnBtcN3OtUHLWm5Z6147au3Za3eufWttIN5gXhNcHTx75+rgquCK4MqdK4IHlI1stnJ+YHDwrJ3Lg7rlzuXLlqvfLOc7l/Pi5bzXcq6w5fbl3uWqdVlwSXDpziVBtmT8kqYloSW6QaEl7y1R2BJubm0/tHuJO60UHFizxGYvXRxcGFy0c2Fwwez5wXno4Nz8OcGGnXOCs/PrgvU764K1+TXB6vyq4Kz8GcGZO2cEp+dPDU7bOTVYmV8RnILyk/MnBYM7JwUn5pcHJ+wsD47LHxscC/+Y/FHB0TtHBUfmjwiW7RwRHJ5fGizB4Flne2dvZ9UuOjC2M3rC3HxYL3fA/Z77C7eOuUPuQ241Pi7Fk6J0i0vmReOS+cLkc5IvTVbjkp5PUgJJ3XqUxiU+n/hu4ueJuk6BxG45pSzBnuBNUF1ibAljJpVqXFhM3LufNlZPgi+rNM7F41wel1LyuYtvZCr3cs64HaSaUGYPd3lK1Qe4+IU6PeP8MjbJP6rVxCaMCpnGTwvxC0KZE8UzUD41ZLggxIJTp1W0cH5JpfY7CSGn+KUSLX3+5s0sddioUOrEirC6fXvqsMpRoSahAwFNtwvNUKTSP3Pp8qX+isAZzPGe4wuH6nrI/rxdiYvjcXHtcUogDp2Pi/XEKuLRHqsGYnsPKI2zeWyKeLTb1ISADR4xvq7W8ZNK4yweixIstIyzKAFLYVFpwNKzV+k/jHO3GCd9sn/ZTDxmLl3m176RquTLRdIvvOJ76TKkxddyLc38P2tUDDRrKWyZdC77+Vr/7cZ/7Q789o1+k2dou7KB1SnrgfOAc4Em4BxgHbAWWAOcDawGVgErgRXAWcByYBmwFFgMLAIWAguA+UAjcCYwD5gLNABzgNlAPVAH1AI1QDVQBcwCZgIzgOnANGAqUAlUAFOAyUAQmARMBCYA5cB4YBwwFhgDjAZGASOBMmAEMBwoBUqAYqAIGAYMBQJAITAEOAMYDAwCBgIFQD4wAOgP9APygL5AH6A30AvIBXKAnkAPwA90B7oB2UBXIAvIBDIAH9AFSAe8gAdIA1KBzoAbSAGSgSQgEUgAXIAT6ATEAw7ADsQBsYANsAIWwAzEACbACBgAPaAb2o6nCigABxir4/DxNuA4cAz4ETgK/AB8D/wd+A74FvgG+Br4CvgS+AL4HPgMOAJ8CnwC/A34GPgI+CvwIfAB8D7wF+DPwGHgPeBd4B3gbeBPwFvAm8AbwOvAa8CrwB+BV4CXgZeAF4EXgOeB54BngWeAp4GngD8ATwJPAI8DjwGPAr8HHgEeBg4BDwEPAg8A9wMHgQPAfqAV2AfcB+wF9gC7gTDQAoSAe4F7gLuBXcBO4C7gd8CdwB3ADuB24DbgVuAW4GZgO3ATsA24EdgK3ABcD2wBrgOuBa4BrgauAq4ErgAuBy4DLgUuATYDFwMXAc3AhcAFwCZgI3A+qxvaxHH+Oc4/x/nnOP8c55/j/HOcf47zz3H+Oc4/x/nnOP8c55/j/HOcf47zz3H+Oc4/XwLgDuC4AzjuAI47gOMO4LgDOO4AjjuA4w7guAM47gCOO4DjDuC4AzjuAI47gOMO4LgDOO4AjjuA4w7guAM47gCOO4DjDuC4AzjuAI47gOMO4LgDOO4AjjuA4/xznH+O889x9jnOPsfZ5zj7HGef4+xznH2Os89x9jnO/q99D//GrfLX7sBv3NjSpScFZsKSZs1kjBm3MdZ25Sn/YmQ8m8eWsiZ8bWSb2ZXsIfYWq2Hrobaw7WwH+x0LsYfZH9hr/84/k/kpa1uln8+s6j5mYJ0Yaz/afqRtB9Cqjz3JcyVSnXTeE552e/tnp/k+a7uy3d7WaohnZq2uTXkJ3q/58fajeOUi3d5fpJVN0HFajS+N29rubbvjtDkoZ1PZNDadzWBVrBrjr2MNbC5m5kzWyOazBVpqAfLm4DkbqVkohetF0ydKLWSLgCVsGVvOzsLXIuilkZTIW6yll7MV+FrJVrHV7Gy2hq2NPFdonjXIWa2lVwLr2DlYmXPZeZqSTJ71bAM7H6u2iV3ALvzZ1IUdqpldxC7GOl/CLv1JvfmU1GX4upxdgf1wFbuaXcOuw764gW09zXut5r+ebWM3Yc+IvKvhuUlTIvd+9jjby+5h97L7tLmsxazRjMh5ma3N4SLMwRqMcP1JPab5W9ExW+swdjG25shIV8J/3kk1zorMoyi5HiWpFVoH0cra02biMoyB9IkRUepqbfwnvCfPys955XxsPWlmbtBSQp3u/Sl9DbsRJ/BmPMWsCnULNKmbNH2yf1tH2e1a+lZ2G7sda3GHpiSTZwf0HexOnO272E62C18n9MmK+B52t7ZyIdbCwmw324OVvI/tY62a/+fy/pl/d8Qf7vDsZwfYQeyQB9kh3DSP4Et6HoDvoYj3Uc1H6UfY75EWpSj1OHsCN9RT7Gn2DHuePYbUc9rzSaReYC+xl9lr3Ab1IvsYz+PsBf37LJYNxY//BzDPW9lMNvOXvN1ON30Kc7Ht7d+3r2j/Xh3BZvNJCCB3YZX2sIvxE/uCEyW5h5l1f2ZOtqf9O3U6OPv4m/qGtlvaP2d63JpL1Zdwy6nMyArYGDaWXRs6319xP7MhSklgA/neva7iYlNP44OIQBTmRQxjYpwXBeJ0im1fSkqhb18/w2bVUdbKe+4pNG5GdF54/J3jz+Uef+dIfEHuEZ779uF3Dtu/fM5RkNv38CuHe/dyB5wptn2NqNrPt6+xn2rY3Kg6CkX9QExjYUAxbm5EI0mF/pTn/M/l+p/zoxl/r96V3JHu0OCMVYxGp8HXJUfp1zWrf9++fYYo/fKyfF1iFc2X13/AELVvnzRFdUrPEEWkufrSsanquOMGZZ2vcHJffVpKnNNm0Cudk+J7Ds60T5yWOTgn1agaDareZMweMKzLqMaSLm8aHamuhNR4kyk+NcGV6jAef0sfe/QrfeyPRbrGH69SDYOmF2ao15lNis5gaE1LSu4+KL1sclwnu87Sye5IMBnjHdbs4unHN7o6izY6u1zU1vExmM5djOkuxezHMw+7Tsx7ILUwnXdKsvMxnexxeDhteMRb8Uiy4HEQP74xltL+0W6USGlt/2J3XIRtGn+326rxR7tROuUgftCKYUncGo4td7fyrBb9JFZ4pBBrclh7fb9C1LvXDHdLbFIrt+5pjC3Xi5LhRhTFEhRqEy+mMb1LVj9HXv++6ZhHY16O4vM5xLzrLp18+xc72j5L7NYtkWfe+dGN5XvzFt618d6WNXctKVCuv/PH2yd4uurO6+qZcutHW+bu3TDymGNI08OMs13tR3mF3ok9XC3Gva8wcVzivYkqa6WxscjYWGRsLDI2FhkbO4CxmdsP7XPxMWb7BH2QFRbyXP+JAe3WnEmFhRhAptwHjshGcPEKkzM9OamL0xTjSk9MTneaUkxWo15vtJp0b0pFvTT4sT6D2ava6tirhiwaoth69UrMzTXnJCWltP6LS9GqOAJpGb2tVrNYW7NYW7MdBc1mlDKLtTWLEbH2Q4FkMbyM/uWWpERbblLvHIMnu9wTjA9qYywsjE8scPTFWF+JDLaPo6+9QzkKzsjt29fRV8xAwPlP20g60cgpU+PjsapQXbnPcWK+xOlKUxJ5X44jpU2dwW9yepIT0zuZlLa+qsWV6nSlOS1K23BucnqTk7ydjD3cDd5eGUkxfIWeb7SkeLKS58e5O1lPzPCcH68ymo2qzmg24Aht6fDv6J5hTcl2H5ui7kjrnmyJ6ZTqEmek/aj6BNagM+vGbhKr0JJhiEy7ITLthsi0GyLTbohMu0FMe6IjVcx5qpjzVLvVxkenepGXKn4RgzkyW7l5t8Fg9bVyy25XuVVMcuTiouMhJxcXV4tBlN7biOIuUX5Po1YBM9pxR4mZO3X+cGB0Jx0Y9YnAirtXXhnTKT1ZbLvuKdzVfczc+aO77R00ZUaPm24YO6c0Q72yeuuCwW05HRNzV3YXY2Lh9FVTxs3Liz3+Q/bwWszLzYypxxC1irtjCN3ZnZQCcT0ozkBMTNIPsXXuH/Rz5Imnq9cam/RDY2yd3v1DI7JOOeG+f37C1WNlzU9u/tGZkeHkjuaH1xeHsoObGi+/bPbGyh6K5+JnNg5NTVdvS08t2fDQugkXzxl47LPe9deK/+fAzTjho3RZOOEZonf7GVOce8z2en2DdlZFd3ZrqZ88pKO0HYVZinF6k5K9TlOi0WLU6fBQvzaQMkQ+SV+Pmchn88Qn7enh6tkV11l7IKaLLdfcs2eXPLNIOViXfnU9EyxqalZdaoO9QeuIdhbEcTrcJx6HJ76gwH64j6OgQExW3OnF5dk5/eQYDP/ryUlw6euNnbyJyd54o9J2kc6XjfdBjNq2RTHGe5OTPfHGrKRGT490HJtuOt7HmpzerfPs5IwTI15xbIPVqhpiDOqaYxd2eJ/o4hVH5nie8mRa9xSLt4v4v0FgPtR5mI9U5mdjtROTZTioOJmDpSmDAzbm6PqtXm/N/M5VZ204ebtj5Nqw9V2/bUQBV+Z3jVqR/22DJySmqca8rK5ZWXLPzMurvbT+Krl8WUnc5iv2DpwW6LJ72BBXbsIV2waV9U5WPph43rTctstPHozBaO07tn7kiBqHXt823zNglBzPVoynLwuwOtpLZsW1p7fd78gTv5SVNcjRij0f19nv+HDQoMSC77x1iZHV1cZWgN3W55XDWNtXtUMQ7x/k+LARJb0F3zVGyoql1QZZcNLadu2ao/7jcVZcIgJJUxMTExLUkw7KVpMrs7M73WVWJ8dl9BqaN0eOHycnper8ab1S+43u7e6ZmW6vNBs/dfUaFbj6kiFj+yR3MmJR1ZhYy1fdi3NT2sZ1zMfT6alZpXOG5k0u6WO3pPcKZH+ckqy84xvsT267JzlX/DvTqvYj6lb81JuF2O1+7Q3lKRzELe4C8W4pEO+WArtdPHD3FYi3TMFB/gOuiNz298R9mRu5R3Mj96jG1ojfIlgxB8yd0kstBV3dutju4j9AJ43Ma+W63bFj9KPF3sEMa+fnlIiiT4H2AjLLikmi5p7GpJGxoi6iDFFZ7CpM+WmnqR+dJQrZEhI7LgM1SwvwXM40RUz2AHWr0dHZKWKq4Vum1V48JbtPzeWzxq0PGJ0eXBXxMTuK1hYXVgxIduVNHpp+RqC0azJuU0yr1bRizOQx61tqlh3cMLykSLEYbeKStRmPl0ycMrhmTaD4vPoz4rsX9ca9sgU/79+hPoV9t1G7Vxb141lxkVdMXGSKwF/sibPz0XGRd1BcK/8+EM8CnfAWDzjw8IrwJQU3UGYgxj8yK87lLXOJqcN2FBfzo5gvbda0OWvxawXNjSdKJlHRjtOH2REzYXT8w4Xp0sJeg3KHYogxmRJTM1zJvfoN9Jni6b1siO+cmJBqN2YOHViQakvPSLXqVK7WJKQ5YmJiTM6c0QOOh0wWk06Hh7rBZInBprSY1vcv7hqnmszmmFg3dtwI5TFltcHBMlg/NlXMSjgmud9BXoFN1ZNfGLA7PPOTY9TsUMLiPjdYl6lLI3ukQNsjuGS1i7WTVighO9SYsNja54ZGrWBkPxRo+4FH4vt/aTv0H6CsTk53JMQZcqsHD5tWkOIdOquw94RsY1yK05liN1yQPTw7I88TZ03rk5VRlqO8b7XpcJEOze2dO27u4NKl4/xZWTxHb9Kpqs6kb5uYk+PNK/JllPZL9/cT75dG5Wn+ot7NerJSMeLdXVIYVnlKwJpifrTr4i5xrrRFrqUnVvTLR+O1Udq6mh9tPJH/L6xjf/GeoFXU8RcVnVFvssS5HHGdvb4Evf1/2PsOuKbOrvF7swlhCLJBL4KAAuGyBLUOZCvLgDirhiRAJCRpEpa1FnHhHsXZIWqtWuuqtbZ1YcFq1Var1tph3XVU6mir1vmd57k3IeB47fv79f9+3/tPjtw84zxnP+fchxsio4xXQICHZ9egAFdHf3chj+QdbefpKOQL+PaeIX6P1oBaPKQbx1MCr9SOIR4inkjg6EFwSPHj2+RP/JFQj7sQnZEeW/mdfTKdU0DwU1+DvB/zO/fFfRDU+9TXVmLGcoNYs7u2PVHtFKITja+LsB0pcgvw9QlwEznaeYV07NjFE25BunTsGOJlR5aJJCiqJCLuZxIXCV8gaSe5390/1Mfe3ifU3z/cy97eKxzl+ebHzeRG3igsYTxzR+POURIU4cbp/rG9c1eQV02AsM5N5vuZj9FgXxj1RCI7N1kJHcyNeZbQC4ROPm7uPs4Csp3ANdDXpxNkYDv3QD/fIA87O48gX79AdzsyFt2icuHCeSxxFvP59k6SB5RfsKe9vWewn1+Il1jsFQIyz+AWcpbyy6yt6hOU6pwKVv0qClvVpy/uI6t+FdXKqqw8wjYj7m6ciQJnDxcXTyeBh7i9vwfUEDvy0dRWY3QQd4rZrORhc+tRZOsxZ2eCcCYKiWG84bwsOOE7ER5wtxhMRBBxRB8ilcgmBhOjiCJCR1QQr5MZuIJoc4o1eZr4ynEvjQvRm8JM1GhloFKUliHJIPom8ZKc6Zj2MZpxJmVGUkxMUobSNE4j9B0ywtO3v6E8q7zf2PEp46PGaLtpvYeN7DDSRZbvns/p0VvQW9xV6igtH68dmd9bKu2dP1I7vlwYVFjQKYiI+Criq3Ye3SOYF5xmvop6/oVEK1z+zgq0G+P/Pfn6BhGeEd5/V0Ts5oBOsTHRUcHsuyv77sG+m+eFbfpt39vOC91b9zu3oW/mxz1Ox8TQdehyJzoyOjIQtR7FRcFrfXRkZDRHhq4PvdEAZ6IF9+EGOiYqKpCMjImJJPehyUcj0PUOwq5DLe5CuNDQe/RddHTkaeiQi6CRj6i9ChdyZ1RE7MM0aC2g6RgOxSI9EkLjMlr2fQwdI4XG48fEbM43nJv8CxyBaBucfVH/K9KTfwX6O9j+Ye5p/mXoN7D9g5zxGH8vgTIGux6fgfqxZyByOjoDkUO32Hk1OXzCmbzFu0lgYE9BzcebIRY+cvBq0qCprQLvJg1MPvUcFN36HMS5GVP4hmqNo4+P40eFc0ZHzvbpMSRp+PCEwT078IoKl6iiXD05Oz1dY5WzRsQp0kIenu2UXAy1g9UI8kNXRj6CHEaICWfO5M18Iz4IIYk+NQ8wZyHyybOQp8DZx9Wlg7NA4NzBxRVyF+cMX4gKlpDPuW1uYX7YYkRPYjS+8w/3Qh89DaDF6I0IiEVaSz3suR1CUKuDsZ0Ri2E5BjVHOTdHYYlin4ZpfQJqkZLL/uqAG+D6xAHINdrV/KsD7mmhs5ebq4+j8App5+Tu5OzuaEf+RJJCZ08YdRJ2cE3xoLycBV9yjwld3Lxc+otdJXac86AdvEDPvg93cAV8Dpcn4EG70TJ+wtsNSLR7eIvj4OLtJOBL2jng2MCxgn9vkMf+3mA7ORROQX7k9L5iol1gEzr3N7mBepslRquDULPzwyZ8WBYENjGH/SaNGev5Z6Ho1od9zvjOqQXJeSJHb7f23k5C73bv+9AJqRFes/1Cw92zMoKiO7nwHvZWJAc/um5R5qRXe55jUHz/2M7RnsJHD9w6x7T65j8J0sQHX4YOpSGaHn8mnMOhhX8SXEK0GdSOiKYjuf5u/imc8ofThX8Wwprdfw/Il/4WzHlR4Ax8ITj1nwVu+N+CgheGqy8CPBmG0/9p4M/+7weB5/9CmP8c+NMGNvjvAGFKK6j/XwS3bGCD/26w6/OCkGqBbBYGYxhlAxvYwAY2sIENWsEmC1xmQFxqgWM2sIENbGADG9jABv8VcNYGNrCBDWxgAxvYwAY2sIENbGADG9jABjawgQ1sYAMb2OC/AG7ZwAb//wL+W7RwTie4clGT44xHUJskHHGPi/9C05G3iW1ziUDeLrbNs8LhE568c2xbYDUuJMp599i2iOjKH8+27QhKWMO2xZx6C749kS9cwbYlRFfhXbbt4CgQmeV0JPoDDvv3dKTIPYRtk4TQg2bbHELoWc22uYSn51S2zbPC4RMSz2VsW2A1LiR6eq5j2yLCzT2CbdsRzp6/sG0xmWPBtydCPW+zbQnh5uXPth2EXK9ubNuR6Aw4XILk2YFwLnw922bszLQZOzNtxs5Mm2eFw9iZaQusxhk7M23GzkybsTPTZuzMtBk7M23GzkzbwdGT6s62GTuvJSgiiqCJSCIeWpn4GxoNhI4wwk8hYYKxRPzNlsz3W8phRA0tLSGFmQRCA0ARMhgrIophzoh7KnhXAXY5XJWA6UCkQasARlREBWBkAzUV0MgjqnCLIjKAchXQLcMcNdAqwpJQ8KPD3w1psPCgLDLTRDS0giy9OCIM85cDBT3gUsBXDnwQDQVRwuL2h14xjKLZMpDPaNEnD39DpRFL8Cx5CrEdKKIf9AtgBo3KsRVa68jQ0bGaUphLGcwqsL5m61bAWgMeKQMsJbYaBePFeCyTSAeZkHXUeJ0W27UnXq/CGCqiFHgiKyvxlWIlMuNSeNyIfaoGWczea9EDzZtACjWsNIIVErE2aqyJ2qKHHH5KYQUjIaOPHPOgWF+rgSKiKgc8RKsKehXQMmE/oO8+LYC2BstkwLZA+qLvVi1iLcVQNWGdGJ5arJECS6rFXIzYT+nYK4UwIsff7WnAOlL4nfGFGuvE2MKIo8IIVOVsvCKP6dlxM5dSoKPB9tGzUmphpBRzZWgasaVaJEAc9VgX83e/MrZlZNfgqEGRUMxGLpIKfc8p+v5YE+5psa/Ncc3YjOHC+FHL6qXDti3AmC0SW2uErFaJ1zFal0BfiveutTeDMbVSTKEK26GM3aXW9jZHn5aNZKQ/4xcDjgZzjKqwr1Hk6i3aMDIWsThG6I1lqZtAC8ZD5RYvyXGMoB1Q2kovc+ZRgCRyzF/B8pfi7FKEfYVmnsxXPZ7QOp+NHHPkdwMqUZA5nh3pJsxTiSMRcSmx+KBlZz6ZJ4vYuNZbsFHkMh7XAr4Kx87/m3wrtmXc/zMZNwMkURAheJd1YecpIhVHhQ5LZgJA+aoHEQGgxLZFK0ufiB4pG3MR0K7CMVSEowj5pgpG0TdcMzY2U2VoarAMSIJCLC2T5xhaT4tRI45zPdadsYJ5HfLqUMyDyTRV2NKMZUwWb5uxzXlBweZutMvDsA0Qnp6NCus8rcd21bL5gaGiYvtyNiercEZRYw0Z6QqwHGYvt/WYiV3BxI/hiZFCiw5hL5QJmKqgxDY1sdWH2Z8M3zALn7YaMFm0gv2m7OJn2KyC1VSNd5oG7ylm5z9pe7SGqSwhgN+lVQQ/nTojw79rW+v9wVR3iq3PJuw5Ras62VaDlqrYVq6eVjGANGF0Ye4WzLnSYLnzUOLaq8V5RP5MTZnYk7eKKiYf6NgroxXTLsP7hclPSlzH1GxuYeggTA3O/s+OUSaLa1nPtFA37xC11V1FMc53atbOKKs74HypYnUw32GYrdw6qsOwZ+S4rSTM91dt81zbnRDSJi+ocJ6uwHcUaux95FU5jCELFQGGeS6CpTmqTe7swu7elmzRcjdglubvVKcXrAaUbxsaGWYalJ8lmtE30TN+MkcNc3eiYatIS3Q/r8KZo/LZVQ55Lseyc4xW9yKMv5koULG8mIytZf0ehnU2sNXHfF/B3BcVsX42xzETV3r2fofhoMP33XKspzlS5ERLlW+bz/4BX1gsJMe6I7up2VyvZPeqgr3X1mJZrWumGt+NG3FssjI+27fQzm1d58HbXaxspLQ6IVjvhxemR7ScaszYT89uYW2ym9n2bVdr8KlA3UZvs1wt92Atu6alEpl9GEaYT2foFGbuq6wiRI/PXxocb8VWFZaRugDLomIrVZnFl9a5hPFhBOtxI94lGosM5n3dOpZe3KrWFZ7R0rrStI7pFktUYDuW/pt+NFeDMny6ZCyjspJAia+IZ4tdxgCGwqp2mJ6Tj5nMr8QamCtej1ZZnLkbK8ftp911a3GNMFcZ6/OZuU48Lae0XmXEuYLxVQGr99NrrvwZHjVYtDfiKNVi6swuevLk++9GgLm+pRHJeDabSIHeYKiWMjySDmMUZFEZzORDLwlGk2AkGDBy2flg7KnBuA6lAd4gXOMYGjK4ZkF/KM5xKQSF+6g3APCzgBZam0wMwTySgVouxpRh2pkwmgHvySweWpEII4Ogj9qpOAsy/LJgFXOGSGdrIiNpHoxTFg1bS5WOOZoly4SeDOinsbMJQDsd00PyI/4puJ1lkTOFlTQB2whRRjQTQaIM3EOjg+A9B/ByMf8ErDMjbRbWIQXmGV2SsQSIs5TVlcFD9slnZ5CPkHwZAC1aJWAbpGFpWuyXCO85IDminwqzebhCZMPKJKxpLrZeMmszpG0G7rVoxXgqEWuDrIpskATtTPhJtdhOhq+MLDIraq1tNxjPt2Ax+iWw10RsuWzcY7yRiHt52FdoNoz1pQzr0ZbrYByJyRgrAWuca4mQFBy9jPTm6GR4ZFtJwvBDvrWWxRzV1HP2CEPFPD+I9fSTdkFWT8A2QXLlWjg/izLszbVUFB0ZT2WqFQadUVdoohJ1Br3OIDepdVoplaDRUDJ1UbHJSMlURpWhXKWUOqSpCgyqCipbr9LmVelVVIa8SldmojS6IrWCUuj0VQa0gkKU6WgqCL3FhVEyuUZfTKXJtQqdogRG++uKtVRamdKI+OQVq42UxppOoc5A9VMXaNQKuYZiOQKODphSRl2ZQaGikLgVcoOKKtMqVQbKVKyiMtPzqAy1QqU1qnpSRpWKUpUWqJRKlZLSMKOUUmVUGNR6pB7moVSZ5GqNUZoo16gLDGrEQ06V6oAg8JFrjUDFoC6kCuWlak0VVaE2FVPGsgKTRkUZdMBXrS0CoQDVpCqFlVolGMCgVRmMUirdRBWq5KYyg8pIGVSghdoEPBTGMMpYKge7KuR6aKMlpWUak1oPJLVlpSoDYBpVJkzASOkNOvAGkhaoazS6CqoYjEupS/VyhYlSaykTsjVIBktARy3w0hVSBeoiTJhhZFJVmmCxukQlpVg1g41UqVxbRSnKwKWM3Mh8WjCyQQ66GNRGZFGVvJQq0yM2QLEIRozqsYBu0oFC5UglOQUOKGV4oeBRFMsNIJjKIJWpiso0coMlrnqYWfdA8RCbDyZCLugmjYpuZXqTQa5UlcoNJUgP7FJLZBaBxfVoWKED9bVqlVGaUaYIkRu7gBepVINOZyo2mfTGHhERSp3CKC01r5TCgghTlV5XZJDri6si5AUQZwgVMDVlCrmxUKcFgwNWCzNjmV6vUUPgoDkpNVRXBharosoghEwoWNEwMoQCXGtShVFKtVEPAcw4VG9Qw6wCUFTwLgc3qgylapMJyBVUYa3M4QimgrjRGcyNQsQh7EndIQ6UZQpTGArHclgbhtaYGYB/KorVimIrySqAqVqr0JRB7LdIr9NCpISouzDbwgodKDxPWmYXQayD340mg1rBBKSZAY5DM62e2AIhauACewKlEgPaOUpdhVajkytbW0/OmAoiC9QB96FGmUkPWUCpQmoinGKVRt/aopCXIHYZdOQQNd4nxeoCtQnlJ4c8ELlQh3YLEpk1dRhVIDeCrDqtJVOYnRDCxoJKK61Ql6j1KqVaLtUZiiJQLwIwR7E5pQu4F4cF3gOIzNOT4NOS11EWIwNhHENmHqMDnZBpYC9pILFhc7dOk8iUrRKlg0MOco4Rbx7QG0ygglUQ2GAZZRhVaICkh7YIbMQi0BnZGGwFHoXllK4Akp0WGUWOE7U5zl5cCySQ3GjUKdRyFB+wzyBlaU1yJp+qNWCZEESxlbZULpupj3XBEilxNmT88FQ8nGfRsFW4hbHhhqQ3T2vUEKcMb0TLwFQq4IA3EdIwDOVydSF6V2GD6MtAIWMx3rBAuqAMbV4jGmSjBDSMAMWNKpSidXo1k1GfKSqz4YEls2lYS2MhKop1pc/REW2DMoMWhFFhAkod5FAsyxiVwmQOsJY4huBXqvHG68GEOKSxcpVVwdXqTGjLMMlczW5jJlLYKWMxqgcFqlY7V26lqAGxN5ogmNTgIkvleZ4B0H5LS6Zys1PyBifIkqn0XCpHlp2fnpScRAUn5EI/OIwanJ6Xlj0ojwIMWUJW3lAqO4VKyBpKDUjPSgqjkofkyJJzc6lsGZWemZORngxj6VmJGYOS0rNSqX6wLisb6no67EQgmpdNIYYsqfTkXEQsM1mWmAbdhH7pGel5Q8OolPS8LEQzBYgmUDkJsrz0xEEZCTIqZ5AsJzs3GdgnAdms9KwUGXBJzkzOyoOSmwVjVHI+dKjctISMDMwqYRBIL8PyJWbnDJWlp6blUWnZGUnJMNgvGSRL6JeRzLACpRIzEtIzw6ikhMyE1GS8KhuoyDAaK93gtGQ8BPwS4F9iXnp2FlIjMTsrTwbdMNBSlmdZOjg9NzmMSpCl5yKDpMiygTwyJ6zIxkRgXVYyQwWZmmrlEUBB/UG5yS2yJCUnZACtXLTYGlnqYHssYHss8Ddsa3ss8M89FhDjH9ujgf+bjwYY79keD9geD9geD9geD7TN5rZHBK0fEZitY3tMYHtMYHtM8L/uMQHsTeZvDQjisScxhXjai8N+Ip8gQ+A9Hn+y/3kvT+4iiYQEHHL0i+I7OGD8xS+K7+SE8Y+8KL6zM8LniF4Uv107jN/3RfFdXQEf3gn0Fwo8jM/DbU+4RoCZkwhvMHsw6U3EkDOJBG5/IgOwh8KsvM061VPWRcC6l2Bdf1g3CLAVMFvSZt0Rq3WOsM4X1kXDugRYlwPrRgB2CcyaWq8jk6zWOcG6DrAuDtalwLp8WFcA2AaYfbXNut1W65xxyhlM9IR1A2DdCFinBuyxMDux9TpOP6t1frBOCusGwLoRsE4L68YB9myYXYziTiQgRaIbtZPgVXtDRJIiXjX7EolIkbixcRW8liwR8UmR4EZtbe0NNAMdoUhUCd3aSgGXFPDOMCtalhPVXC4p4tfX1z+HgR0pst9Tvad6BUAdQC0Apm1mZMcn7YCRmROPFPA3NaCldiRpZ6aDWdkhVnZC0s7u7qQa9Jp01xoHVohJO0kDvJb3Xd53PoaZAHYC0k50F2S7i5DEAlIs4vF4ppkwMtMk5JFClmG1mOSI+RaO1TweKRbMhZdYRIrFD2om4FfNAzFJiluYVovtSbFDw+iG0SBd/TxqHjUdYBIA5oT4MoztBST6H0yfytme5NibObOs7TFrexFpL747heFdM+WuPUnaW/Gutncg7Z0aPBs860PqQ+amzU1DVpwsmiyqEdkLSXvGUgx/iZCU2HHg1SMFGS+lh4gH/mYFqJaQHImgurUIEiESQSImJZJHRCM4scHqtae6sfoRIeHAMuthiSMpcT7je8b3xktHwk5qTmr2Zxw61DRz38xGSaNEIiIl4gdfNDY2fvEAYzuISAcxF149ixrRq6gnDoeTZ1hqDhyOgxV5oqGBLyAdRIfQC2cNc05BOZWj1GiL2LbUyLTzUTvBIC8IoxIMpdowKrHKoAmjUlW6Enw1wNWggjb6DX4YlSE3af8eNpaBxHLAj98yeG/PiOS3iK7xe0Ng13VK2pQ7DqSQU1/jNwmGqjkkGWlP2wn4oY5cjjefoOUCcaiA5JE1cRySV59LD6TDrEZ8V3So9iVewpCN7zV1+PSHzia9EdD+VsR47VdyX1v3bd5H+fc77l7Yc+NqxcD8wNfqazwH0TW8RrqGu66eyyE5HNdoEPGLyupuZJm32oAF/oJ2sEhL8kGuCiwmdxBP4MoZlBvpSrdDHZGreLDcWKzWFpl02khn2hENCl2FMpWyVKdVRnagfdGI2NXtqY/NI/3pjmie6+rZMp+nLlWF55rkpXoqJzGB7uDhENmN7k7HRcbFxsdGD4NuvFWXnrDlH5HMgbZH8/auvMzsHFlkMN2Z6XbQJqr16HFaUm4ylZyb1SMlNio+PDouLi48PiGuW2RnOoDRyPepGuUyDyXpGrKTtYVJPsGtIZ0IGBdzaqDyrbcP8FlzoDakfbfzjcUvCyaFlCVMdVnz1toYzujl61M+Fjt8sOqYQ0ry5Y3v+P5uHPlY9+DjxeELbvsE1N4euOXSm4PzH2YeXBH76UX5waL2HI+ku9PcUuvDxXOIjQenNvRXfhm/6+zM0KuNU6I/Dm3w3vRX8FIBrY8/vcO1qfpw/9GLXzl/tlG3bW6P1HPO9usMtSPGByY6nnh/tX9M7Q8fVMy9eNZp3BseUwJmeR3b98oXq25vyglbNuzQsE3kvrqaJvK+G0d1TbvLgwifyp83feSsuJl2y3YVntGWfnumvv+PP9e9M/a1790LG8iuEdnB94ZdvHvT71dH3u2S5A7tX2tQLvzxyKePU74es9vYkcOFfbSyhrQDi/BpPzCpnyPPndf++O7bUZtqI51+8aq72Xt35L3hHCc7HEN+ATxP2r26fUDM3e9lKXpxc9/75fe3hG5qjN3iROchhI68THoAnV6fWp88JZF9jqkwaNo8/NaXqNFoBPsY2RhhcSPyInYiRKUUUOghAhFsTD5fSJK8DLo/nWbu05wpL7EMKioqnsZAZXgOZRPtiuTtzJPQYjNJrqjNhuSiKFk8nPjp+sq0GRdyuhfVBTbo5uzqe7r7e2GZ08LWDO0dJR5z6MEID95iOvvoY8mKyT93/pzXQ3Qn6wK55WdtoirrTC9psr5L2dFsdbZ75ZavX+193euDzM0byqJkgfxFc0+m/XA56f5cufvQkV9tDh20YJlsxJ4GOlj424mM4KotjXf6xzp4Za6M3PvTMe9Os4LtYvrGff1Omu/0sumJb5/skvfRmjhN+3f2V2q2eb0/tXJlnHIXOf/aqb6vj2rnnFfHH/bD61tCBri8E1MzIyJkdJzzzSLv4zXGH09H3T8dvfJ831j/HXHDo4p1B0+GXiblinmLan+5emMTZ+Nfd0Y8OD2hMWb8RwNP+XS8Jrt2j64RkJDGrlilsaYr0+6OnZBz5TFOY03WVrOHNDb+H0kWIXQQs+k7Ws8rVVSuugg/RAbHok8PReJsFkfHR0ZG0QAxTDZr6dKmf0Q+dp77jPl/mY1qp38S2Cics7S6yu1B0OgHhtqwe3+sXFS7MGXbyoOjpkX0iJZ2mFd5b9zajjXk1rEHvXdwD6T8unfJnfs8v1uTxY87aZffKuq1N9jzYkjHP3l1CYpr5z9zm9nsujT253h9nq7ntfXJdnT6nl1z6CWSg+Vf3jEucK/4Zsb2un2iyVRzhzWxN1/5/IyJGDD96E/zfj1R+WjWvfWja3vt/LTjhoJFu/dO2jx3w4mNocfy7sf+8NUr83/p8PjaKyUHXxeVm844D0w7fpPYn5axUhh7cajDw3Fv7f9l2PnJf55Y6tRx9nsXJnnsOXFgmR+572Haatf50Yv806Lufh64gvhwV+6Bidouwydcj9dW/779mqv9r+ZsVA0WGcekm84o3Vgqc4aItOxUrlW6OniiYNLh0d2vPi76fMTR/dvXbWt0XUzL0HQ7HuSid1Pp5LaVJoaOQl2+a2hUNE1HRoUq4umYgliVPDyme0FMeExUdHx4fHS3qHBlfGxkoTwqKjamUNEqBaZplRdz+Mdq3veIi+u0tXTNgTLOgmenwKdmKJ3eiLMghAvEMUQxBDCK31HoEk7HhdPxOAXKrVLgIBruVqxSYPK/ZGDOgs9hYaIlSHA4DD7mcWiizXbm1nBIQuDe8cfBn+fsD8heMbDyu+a7D7/a+W3Dzb988ptz96tT+d82Hbx27sGS4QtGtYsPaeAnu55ZWlW7o3Ddj9t/5QwK2NYroDKhdMPdm8SwuiXTfQ/ZLTiy1DeJXrvKfd9nqcP/DI2ZsWzOkLjGLN+NnQ44f3Wyxnlt7I0NnfbPCXxvwozTwb4XCv2m9ZY+HszN3KOdWB/160dbInLyXxZsdpu530+xzSg5f2JskFPXhcmroyb2Xth7cHpFwLRHm533Tb8ochu4N3RY5PDuYxauebe2ZGGI7mbThqs7kz0OFWRN2JrnnTp78arSBm3wF3eDO+5vptbab775tf3SunNj3lZPXN7tu1Lq0eRvHzd+sqib3aNe7fcsbr+2Ycqh6zV71g0KTPTcmja5csqRv46+3cfr+/bTLs1aVhxYW9xz7b7qrKBLIv8MxcO33nDLjN6aPzr7u/6fxs9+LD21edS7iSVfVh7evL1kzkTNVMP7V1fdX3bK+0T3B8ovS3uLLo6buHn9jpWfvXp4Yf67Y4ccdEktOOp//cFLTZH2dyJ6K1fF6Ubn9NmWNDe73n7GrvFDbu8rmir/8Z3FTftnHtSlnm2Q1jVvvr2JLr02Jn3NlYXl+3eKmh71/HODMU7wYf5hr+Pb/6w7MNX3VvUYMvtjnwnGLceGd+rTY4jn6drfiprSV0f81HlGr5FHrsUkzfPbMU9SXtP7etPJ8OU8zuy0v66f4hzmroAiIIQicJ0pAmK5e3EMzv2+bW9hR+F0KrabHzTtjVthStLLnQvRGOlFe7QatLMEK4RhKJM3A1vypkyng+QJoasuVCvkJhWVUGYq1hnUpiqU3Ok4OoaOjoyKjaa7Q3KPisTdaBp1/3P30P8qvy9brtl8+se0+V3HlUi9zu48d37vkoEBOeu/PuWZFej02zerv8lYb6Kpdr8Kv81b4JZe59Nv/obFI+igH4iSy6/uvDZN6HTHkbf4xrRDHQ9GB059+9YfRb5hD169VOt39VLWyuV7AnIPzLqXfNjuyMiNRzb146346z3NG0XfhfyUkrtpypGLISnS4A+mZA+SSS5ww+6PmTuX1k79fSj99r3xJxZtuey/aPzdo66/i7bllso+Sp67LI3on1rYLrhL4ZpFF44JJvRf8dek1e1S29vVLJvUPKjyEbnUL0c0mXCmU5q3/RyQsr0pPG/Zxg6VCZEVh9483XPiG8vlnK1+Dpsf3HnzQ/LrTgPyHv/Fb/ycsjfn93VgkdW0kyXj8GkuvFnl86feXaL07efE40H8TaGdBXZsTXAj0QhBT1jM5OYJc+kJs6rbO35QM7pvfvCii51dH3Q9K85dMPTCu8sV78r/8fCsca5a7768f/2q9RnGIX8IXaUqOocpCuk01KH6xPqEKX1e/L7YMo0+TYpSOS4IeVYFIY1OoZOsCkL837knRnokMlRf8H4YbO28aHrjCG5St1NXPlpf8ePXVQMzyc1S0yvDSyWu677e9eqcT6THXVbMLC34ZDDnYBblmrPk1Ni+5wZv3zhkqe9ZP3LKB9srb804cq0n+du5XXPE/P2z0s7dyHU7lb1u/oVLs8Z8W73nl7pbgojJ3CvzugZ20t+//eBC5RKpwx3hOf0Oz6y3Z5eIDQs+Wd79raLwvQMdrxaM6OO+eAbV55zQO+qvQ5H9yyN7hRrs91/V93o8Wex6+nOxfPaN7z7x+DVrxut7Y0NHrtz9647X7Pu9ejzX4P8bfWB7pWrEcNJD3N7x6A/tF//50qeFQ7aER1z6a/KUQwPzL7+tr9N80D3j+O2q3e97ji3ocn3Fm11iBBXeBV/26lDaseaG/b6w7YcTt1z869prW8+/u8YU+0nW3lcCXILK7V+SzXxlWEpi+x1btmzKLNq/rN/j6ir/6nfc6MLL/VxGeu9/p5P/kcQroVe2/5F2KOz4yajqjKCuaYGjhl3Nv/7ez0vePtBDt3NCsEnQ7rdy/91v1uwJzvt485he05aXyz/SLnd9b/f7qTdcdA+nR2k+fHR64P6ZAV8W7nzbb6qLktMrfOPQOZ9c8L+4ddMBxUeVefzjCdKcD+o2rapct6V+YZn39/OnupZ1iohaI9LWD5/ZeXf99UkH/E/82iH7y6W/pZ+5Q6p00+xf26/e/4v26upFX0d2eey4d/iIk5k+y0/ei3inj3SQe8mXrisf0jXCsXQNv8BcChznHsWlgNv2GDCh9h9JxVE0zWzILi+yIVtOBJFQNuKj6NjuTNHohruRNOr+x08sNZwnawcH1Q4O1A7Yc+tu3DM4+0rXn9S+X+OcGfPZrY+H+C/r59O15MqwnPc/EcR789I/e71R0uFUXMkXLiftb8R/vkSwaX/3b8n2kf2OTXOoUk4dXzc6ULPxnfS3rhSPPHr6zdwPxWGNG79fG7phrN3G7xYOPTDam3+lsPxylCzIJeLSOlHO4S1J214+2STllq0r/v1g6e89Rix3/yPlszPxyg+0ytjK9+oVTuHH+r5x9/zPQodvR1StSu9yyWFXvWvFrrpe1++fDx3m3DEzP2TFWMMZlx7b0keebG5OnDfx+1c/fHWKz/e9N898+fK07Enet5ZHDL0wt2f4hughe7f1fhR1bAu31+YPN86PH3/07eqwP7Py5/nHdm7srlW+nvvZW07rvQImHfzjM+6UWXdG3Tgi2z2zbuqOBn9T51GeIR8fCg6J77y4e/9uh8dtnr/BN2D12sJr8o5jzoakvz2q9lznl4/5D+gta9o6uE8g98Y3Y4dHfBtwXv+y08CUii13ibM7PuDUjPqxwW3LTp/jgwZc6r7c6UpA+g7PT5LGJV/Y02gYe8ZwKfD07pQle69/7jv4x4mzrmWm06vXzT59bfiyjQ9ObSo8t2fRhFebTzQPuJTeZbVryHurXyuq/mV6QeWoDyMmfTf4rRG7K0JCbjaXNobMCZvTNy57z9nJSdOa7DL2Hl+VGGFacEd7t5IaEub68ugFS3tnR0/6YVOtx8/vZP2xcNOOlHrN4qNnTtTOtNTOZqidV55S/lqK51PPJV6WBe05PEkHMZGLH6InEgmt6+oTRdn6xGMI78GJnJv4aXt+1tmrq/dFfhMwLYYexhQ39CvU7PrM+gFT0v/WL31g38Kuhc1qOZSMoqNHRUXhMjfSqszJ6Bw6y6rM9XuxMvcc+iZ6wjIkPMWbsIieUEdPmGcxkpRLT5hI9zGz45Du0f/qmIX+wgM0U5fKDVUKvVFabCql+1oIcOiYDlGUH5FBoC+VQZ9XGIU/r8B8vqUKekb2kzcqy+ePpJTf0w5iRbemrFp8Jq/KW3rspKmo05v2C9udVcxf0m/ha0erJHP3qEZJw3rfbTR8Uzrx0a4+l8UHeu5OXbvyd/WPit2dYlctelk1ae5rM1JyBp2UzB931HuA7+8v9ZshO7LpYcn53kJplzd/6eWz6vhWv4q67ueuKL9M6lU5NuB319fem2uaOOuPg0GclK6fT3fe/u5avuTN5uJ7xdIF9V37dC0Zkq7oaKfWDlu88MLEPxrm/J4S+vODnkd2xl7Xdt5wcWNw85FTvztuXBKyaHHm/4zPlvsTR+c1+cNGEo8+HNU9Fz1vi6cl1zGuQ8fWrnu66eZt0Y5A1wgLo0J1qfqNX9R/3NOxUsicsSmyMyMvf/n2ksMOrGzLGLU07JrshX3TuA9s9v36sL9eJl+01nV52VMHrdTFh2ODktoOyyabTW+7f+vzj09iC2epPzy7dPqFd7HJjo+j2ee027GVs11k21gqL7IvMXHrhzvHpFn23Xc8zqfx7l6q/pvp3xbGTLvBcG2h297Iz9OXcnp7CMxskL/AoHl04+yl9q7lcqbHLi1aNL+qSumXx1T51b/dlRu+zvuxP3u79/RHr0srpN68Mp9ZKeH9/9pm5YzSZ+t//el+zd3wKtN6/R+Dtyw+fffvl+YmT7S9ODfMz39/Q7jSwgpBI8Wq945cG+1/rzizJPbgwo7Z4YVhfh6uB5xOzi6L5mrwyP5bOf/g3tzcrJNBxcK8VQFnDZtYNhg0saxhYmQ0aJw60BUX9uFAxOTIgsYjoMIHmog5mQ15kGdegK5A8LgN+QyQZUUNlBEaWQyBRdvfKS7L+z59vNYodF9zb+6Elm2vpe4ZpCBp4TEMMwhZoNWggXVZdAjmSTUL1RpUcObsEPgOLQW0upmliZEh2L1vWfO2eflR6my3DeOC9HdvDmS3N+STrVpX7h4Ss9/chN9c4HJwmkoo262giaIvZswSyyyK1lm3+YmepoAqnxvX78z2Se45xyaleN8+1MVyP+O9Ydv1e1tOrZ34tndZYH1+xUpGlj1/92zfeeLl279H2xluPd89N2XxJevjOcfjf7/8vUv0wnSLnLfabJ/eu7cLVlyQ/R9uffZRhFzYi+MdHEKHluXMnPP09wHN1B82NsxrPLYoOVYpLt/zTOTMBOff0dJv/cskHFf9XenB32UduiPr0J5lRneTBfaZRfSx6tnLTIhd1Pv8hVTniykzzlZ+s3stk93El8V4ak+YWsYSXvn7aiE3vHWiFbsWNjFpAJsnKog4YjNsYhIFCgmCk2bfgHXEsc+0IaXJWAMJ5CTJjZgxZARaDpdhNeQHDxybGZoaGYJAFEaKdH7ZYj0vQOP4a7Ue0bwrBzJkZ2+rROsygdKKoZ9wPVNnOLNMpNf0ktdczV6axlKax2M/33r86V3N6imzlV8YpQu95nl062qvn2qW2uL7sxriZupeMotLFVl58/H6OrHcV47iF0ru/s9/z7nQad4nr8J6raCoefLvmDbrek5xUbzy7ic3e+Lr0Mo6jsq66QXC8QtSozVY5dOObzqRNvfKu8R7jmXu2//eu/X0b9O/p8mR53c93jSdN/PIpcKpH7+Wuex8cKTy4r9zS3ZwzzdkDX7qs2P3TvnQ2IWfW15Oute7ZwN342vhuXZmWdlzzsQ6Xny55OrtxZtf3LrNUyscccNJ50re7uua1i2vnXgPNLMHPrT6vDrSZ1NXGeP79Yc0P5Uu7TK0vNPrwgAATnFfqQ0KZW5kc3RyZWFtDQplbmRvYmoNCjIwIDAgb2JqDQo8PC9UeXBlL01ldGFkYXRhL1N1YnR5cGUvWE1ML0xlbmd0aCAzMDgwPj4NCnN0cmVhbQ0KPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz48eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSIzLjEtNzAxIj4KPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOnBkZj0iaHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyI+CjxwZGY6UHJvZHVjZXI+TWljcm9zb2Z0wq4gV29yZCAyMDE5PC9wZGY6UHJvZHVjZXI+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPlBldGVyIEdpb3Zhbm5pIFNhbnRpYWdvIFphcGF0YTwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgo8eG1wOkNyZWF0b3JUb29sPk1pY3Jvc29mdMKuIFdvcmQgMjAxOTwveG1wOkNyZWF0b3JUb29sPjx4bXA6Q3JlYXRlRGF0ZT4yMDIyLTExLTA4VDE1OjAxOjE2LTA2OjAwPC94bXA6Q3JlYXRlRGF0ZT48eG1wOk1vZGlmeURhdGU+MjAyMi0xMS0wOFQxNTowMToxNi0wNjowMDwveG1wOk1vZGlmeURhdGU+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyI+Cjx4bXBNTTpEb2N1bWVudElEPnV1aWQ6NTg2NEJEQTEtRjhGNS00NjU4LTlBMjItODc2MjdBRDA5MDZFPC94bXBNTTpEb2N1bWVudElEPjx4bXBNTTpJbnN0YW5jZUlEPnV1aWQ6NTg2NEJEQTEtRjhGNS00NjU4LTlBMjItODc2MjdBRDA5MDZFPC94bXBNTTpJbnN0YW5jZUlEPjwvcmRmOkRlc2NyaXB0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPC9yZGY6UkRGPjwveDp4bXBtZXRhPjw/eHBhY2tldCBlbmQ9InciPz4NCmVuZHN0cmVhbQ0KZW5kb2JqDQoyMSAwIG9iag0KPDwvRGlzcGxheURvY1RpdGxlIHRydWU+Pg0KZW5kb2JqDQoyMiAwIG9iag0KPDwvVHlwZS9YUmVmL1NpemUgMjIvV1sgMSA0IDJdIC9Sb290IDEgMCBSL0luZm8gOSAwIFIvSURbPEExQkQ2NDU4RjVGODU4NDY5QTIyODc2MjdBRDA5MDZFPjxBMUJENjQ1OEY1Rjg1ODQ2OUEyMjg3NjI3QUQwOTA2RT5dIC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDg0Pj4NCnN0cmVhbQ0KeJxjYACC//8ZgaQgAwOIWgah7oEpxmdgiukUmGIuBFMsCRBqKoQCyjGBtTNBKGYIxQKhWCEUI4SCqmQD6mPdC9bO7gmhIDZEzARTKV8YGAD9ugxaDQplbmRzdHJlYW0NCmVuZG9iag0KeHJlZg0KMCAyMw0KMDAwMDAwMDAxMCA2NTUzNSBmDQowMDAwMDAwMDE3IDAwMDAwIG4NCjAwMDAwMDAxNjYgMDAwMDAgbg0KMDAwMDAwMDIyMiAwMDAwMCBuDQowMDAwMDAwNDg2IDAwMDAwIG4NCjAwMDAwMDA3MTQgMDAwMDAgbg0KMDAwMDAwMDg4MSAwMDAwMCBuDQowMDAwMDAxMTIwIDAwMDAwIG4NCjAwMDAwMDExNzMgMDAwMDAgbg0KMDAwMDAwMTIyNiAwMDAwMCBuDQowMDAwMDAwMDExIDY1NTM1IGYNCjAwMDAwMDAwMTIgNjU1MzUgZg0KMDAwMDAwMDAxMyA2NTUzNSBmDQowMDAwMDAwMDE0IDY1NTM1IGYNCjAwMDAwMDAwMTUgNjU1MzUgZg0KMDAwMDAwMDAxNiA2NTUzNSBmDQowMDAwMDAwMDE3IDY1NTM1IGYNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMTg2NSAwMDAwMCBuDQowMDAwMDAxOTk0IDAwMDAwIG4NCjAwMDAwMjI2ODEgMDAwMDAgbg0KMDAwMDAyNTg0NCAwMDAwMCBuDQowMDAwMDI1ODg5IDAwMDAwIG4NCnRyYWlsZXINCjw8L1NpemUgMjMvUm9vdCAxIDAgUi9JbmZvIDkgMCBSL0lEWzxBMUJENjQ1OEY1Rjg1ODQ2OUEyMjg3NjI3QUQwOTA2RT48QTFCRDY0NThGNUY4NTg0NjlBMjI4NzYyN0FEMDkwNkU+XSA+Pg0Kc3RhcnR4cmVmDQoyNjE3Mg0KJSVFT0YNCnhyZWYNCjAgMA0KdHJhaWxlcg0KPDwvU2l6ZSAyMy9Sb290IDEgMCBSL0luZm8gOSAwIFIvSURbPEExQkQ2NDU4RjVGODU4NDY5QTIyODc2MjdBRDA5MDZFPjxBMUJENjQ1OEY1Rjg1ODQ2OUEyMjg3NjI3QUQwOTA2RT5dIC9QcmV2IDI2MTcyL1hSZWZTdG0gMjU4ODk+Pg0Kc3RhcnR4cmVmDQoyNjc4OA0KJSVFT0Y=";
    let vFile_in = newText;
    let vLevel = "BES";
    let vEnv = "test";
    let vImg = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAIcA8ADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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FFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV5/8AtL/tL+Fv2UvhZd+KfFN3/fttI0i2lh/tXxVqPkySwaVpsEjp9q1C48pkgt0O+V8AdyPQK+f/ANsj/k4r9k7/ALKrff8AqEeK6AD9iP8AYjs/2ftHg8ceOIPD/i39ozxbpVqvxB+IK6farf63eC1tIZreCaK3t/L09PsdukUCRRKVt45JEadpZX9Q+O/x38M/s1/DO68XeLrrULTRLS7srAmw0q71W6muLy7hs7WGK1tIpbiaSW4uIY1WONiTIOMZNZ/x0/aX8LfAH+y7HVLv+0PFvibzY/DHhPT5YX13xZPFs3w2Nu7p5mzzY2llZkgto2M1xLDCjyr5f8Jv2LfE3iH9p/Tvjd8ZfFun+K/GXh601Gz8HeGdM0i0TQPh1b6jFp63UdrcyQfb7y8P2Jo2v5JIRJHcTKlpbJIY6AOw/Y6+Fuu+HPAk3jTx/Y/Zvit8RNuqeJUlmjuZtDiaSaWy0BJo2MT2+mQ3BtVaAJFPKtzd+WJrydn9goooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8//aE/Zi8I/tQaPoNn4ti8Qf8AFL6r/bek3eieJNS8P3+n3n2W4tDLHdafPBOube7uYyu/ayysCDxXoFFAHl/7OX7G3w8/ZS1HxVqHgzR9Qi1vxzdwXviHW9Y1u/17WdaeCBbe3Fxf38091JHDEu2ONpCkYZ9iqXct6hRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9k=";
    //let paragraph_format = "[{\"font\":[\"Universal-Italic\",12],\"align\": \"right\",\"data_format\": {\"timezone\": \"America/Guatemala\",\"strtime\": \"%d/%m/%Y %H:%M:%S%z\"},\"format\": [\"Firmado por:\",\"$(CN)s\",\"DPI: $(serialNumber)s\",\"C: $(C)s\",\"Fecha: $(date)s\"]}]";
    let vImg_size = "960,540";
    let vPosition = "300,100,500,150";
    let vNpage = "0";
    let vReason = "firma test";
    let vLocation = "Guatemala. Guatemala";
    let data = {
        "username": vUsername,
        "password": vPassword,
        "pin": vPin,
        "format": vFormat,
        "billing_username": vBilling_username,
        "billing_password": vBilling_password,
        "file_in": vFile_in,
        "level": vLevel,
        "env": vEnv,
        "img": vImg,
        "paragraph_format": "[{\"font\":[\"Universal-Italic\",12],\"align\": \"right\",\"data_format\": {\"timezone\": \"America/Guatemala\",\"strtime\": \"%d/%m/%Y %H:%M:%S%z\"},\"format\": [\"Firmado por:\",\"$(CN)s\",\"DPI: $(serialNumber)s\",\"C: $(C)s\",\"Fecha: $(date)s\"]}]",
        "img_size": vImg_size,
        "position": vPosition,
        "npage": vNpage,
        "reason": vReason,
        "location": vLocation,
    };
    $.ajax({
        method: "POST",
        url: `${urlbase}/api/Solicitudes/Firmar`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
        success: (val) => {
            console.log(val);
            if (val != 0) {
                let id = val;
                //let url = "http://10.0.10.55/api/job/" + val;
                estadoDocumento(id);
                setTimeout(estadoDocumento, 5000, id);
            }
        },
        error: function (response) {
            Swal.fire("Error", "No se puede firnar en este momento", "error")
            return false
        },
        error: function (xhr) { // if error occured
            console.log(xhr)
        },
        complete: function () {
            console.log("petición finalizada")
        }
    })
}

function estadoDocumento(id) {
        let data = {
            "id": id,
        };
    $.ajax({
        method: "POST",
        url: `${urlbase}/api/Solicitudes/GetEstadoFirma`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
        success: (val) => {
            console.log(val);
            if (val != 0) {
                if (val == "state=done&type=sign") {
                    ObtDocumento(id);
                }
            }
        },
        error: function (response) {
            Swal.fire("Error", "No se puede firnar en este momento", "error")
            return false
        },
        
        complete: function () {
            console.log("petición finalizada")
        }
    });
}

function ObtDocumento(id) {
    let No = document.getElementById("letreroModalEdicion").innerHTML;
    let Empresanit = $('#txtNitEmpresa').val();
    let data = {
        "id": id,
        "No": No,
    };
    $.ajax({
        method: "POST",
        url: `${urlbase}/api/Solicitudes/GetDocumentoFirmado`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
        success: (val) => {
            console.log(val);
            if (val !== "") {
                Swal.fire("Éxito", "La solicitud fue firmada correctamente", "success").then(function () {
                    window.open(val, '_blank');
                    fnObtenerCorreoE(Empresanit, No);
                    fnAprobar();
                });
            }
        },
        error: function (response) {
            Swal.fire("Error", "No se puede firnar en este momento", "error")
            return false
        },

        complete: function () {
            console.log("petición finalizada")
        }
    });
}


//-------------------- notificacion por correo asignacion de proyectos --------------------------------------------------
function fnObtenerCorreoE(Empresanit, No) {
    //var CorreoE = "bjcastillo.gt@gmail.com";
    var CorreoE = "santiagopeter0@gmail.com";
    $.ajax({
        url: `${urlbase}api/Solicitudes/ObtenerCorreoElectronicoEmpresa/${Empresanit}`,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
         val.map((item) => {
                    if (item.CorreoE == 'INVALIDO') {
                        Swal.fire("La Notificacion no se pudo realizar debido al correo que es Invalido", "warning");
                    } else {
                        sendEmailProject(CorreoE, item.EmpresaNIT, item.Nombre, No);
                    }
                })
         },
        error: (error) => {
            Swal.fire("", error.message + " ", "error");
        }
    })
}

const sendEmailProject = (correo, nit, nombre, No) => {  //vAsignacion valor de 0 y 1 para determinar el envio del mensaje de asignado o desasignado
    let hora = new Date;
    let horaF = hora.toLocaleTimeString('en-US');
    let Link = "http://covial.gob.gt:1090/apirest/Solicitudes/Report"+No+".pdf ";

    var dataJSONt = JSON.stringify({
        destinatario: correo,// desti - se manda a traer desde una consulta de la tabla de las empresas
        body: "Estimado(a) " + nombre + "  con NIT " + nit + "," + "<br>" + "<br>"+"<br>"+" Gracias por utilizar la plataforma virtual de COVIAL. Por medio de este correo le enviamos el link"+"<br>"+" donde encontrara el documento SOLICITADO " + "\n"
            + "CONSTANCIA DE SANCIONES"  + Link + "\n" + "<br>"
            + "Att: Sub dirección técnica de COVIAL"+ "\n"
     });
    $.ajax({
        type: "POST",
        url: "frmSolicitudes.aspx/SendMailNotification",
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

function DescargarConstancia() {
    let No = document.getElementById("letreroModalEdicion").innerHTML;
    let Link = "http://covial.gob.gt:1090/apirest/Solicitudes/SolicitudNo" + No + ".pdf ";
    //var Link = "C:\\Users\\psantiago\\Documents\\SISTEMAS\\SICOP-API_REST\\APIRESTFUL\\Solicitudes\\SolicitudNo"+No+".pdf";
    $('#LinkDescargaConstancia').attr('href', Link);
}

function LimpiarModal() {

}