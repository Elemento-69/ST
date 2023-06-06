var vToken;
var vUsuarioActual;
var vRolUsuarioActual;
var vUsuarioEsModoSupervisor = false;
var baseHostURL;
var baseSitio;
var modoNuevoAuxiliar = false;
var vIdAuxiliarSiendoEditado = -1;
var vCantidadRegistrosEncontrados = 0;
var vEsAdministrador = false;


$(document).ready(function () {
    loadDefaultComponents();
    fnInicializaTableAuxiliares();
    fnConsultarToken();
  
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "frmAuxiliares.aspx/fObtenerToken",
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

                    fnCargarTiposUsuario();
                    vEsAdministrador = vRolUsuarioActual.includes("ADMINISTRADOR|")
                    if (vRolUsuarioActual.includes("ADMINISTRADOR|") || vRolUsuarioActual.includes("COORDINADOR DE SEGUIMIENTO|")) {
                        document.getElementById('divComboRegionales').style.display = "";
                        document.getElementById('divComboProyectosXRegional').style.display = "";
                        fnCargarRegionales();
                    } else {
                        if (vRolUsuarioActual.includes("SUPERVISOR|")) {
                            fnConfigurarBusquedaPorSupervisor();                            
                        } else {                            
                            document.getElementById('cmbSupervisorRegional').style.display = "none";
                            document.getElementById('divComboProyectosXRegional').style.display = "";
                            fnCargarPlanesAnualesXregional(vUsuarioActual);
                        }                        
                    }

                    if (vRolUsuarioActual.includes("SUPERVISOR|") || vRolUsuarioActual.includes("ADMINISTRADOR|")) {
                        $('#btnAgregar').show();                        
                    } else {
                        $('#btnAgregar').hide();                        
                    }
                });
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnConfigurarBusquedaPorSupervisor() {
    vUsuarioEsModoSupervisor = true;
    fnCargarProyectosXsupervisor();
    $('#divComboRegionales').hide();
    $('#divComboProyectosXRegional').hide();
    $('#divComboProyectosXSupervisor').show();
    document.getElementById('divComboProyectosXSupervisor').style.display = "";
}

function limpiarSelect(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 1) {
        select.remove(1);
    }
}

function fnCargarRegionales() {
    const url = baseHostURL + "api/Auxiliares/ObtenerRegionales/" + vUsuarioActual;
    
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
                        fnCargarRegionales();
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
            var datos = data;
            limpiarSelect('cmbSupervisorRegional');
            $("#cmbSupervisorRegional").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbSupervisorRegional").append('<option value=' +
                        registro.Aux_UserName + '>' +
                        registro.Show +
                        '</option>');
                })
                document.getElementById('cmbSupervisorRegional').onchange = function () { fnCargarPlanesAnualesXregional($("#cmbSupervisorRegional").val()); };
                document.getElementById('cmbSupervisorRegional').selectedIndex = 0;
                $('#cmbSupervisorRegional').trigger('change');
                $.LoadingOverlay("hide");

            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " regionales ", "success");
        });
}

function fnCargarPlanesAnualesXregional(usernameRegional) {

    var url = baseHostURL + "/api/Auxiliares/AniosXAuxiliar/" + usernameRegional;
    
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
                        fnCargarPlanesAnualesXregional();
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
            var datos = data;
            limpiarSelect('cmbPlanAnual1');

            $("#cmbPlanAnual1").select2({ theme: "bootstrap" });

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPlanAnual1").append('<option value=' +
                        registro.AnioId + '>' +
                        registro.AnioId +
                        '</option>');
                })

                document.getElementById('cmbPlanAnual1').onchange = function () { fnCargarProyectosXregional(); };

                document.getElementById('cmbPlanAnual1').selectedIndex = 0;

                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " abc", "success");
        });
}

function fnCargarProyectosXregional() {
    var url = "";

    if (vRolUsuarioActual.includes("COORDINADOR DE SEGUIMIENTO|") || vRolUsuarioActual.includes("ADMINISTRADOR|")) {
        url = baseHostURL + "api/Auxiliares/ProyectosXAnioXRegional/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbSupervisorRegional").val();
    } else {
        url = baseHostURL + "api/Auxiliares/ProyectosXAnioXRegional/" + $("#cmbPlanAnual1").val() + "/" + vUsuarioActual;
    }   
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
                        fnCargarProyectosXregional();
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
            var datos = data;
            limpiarSelect('cmbProyecto1');
            $("#cmbProyecto1").select2({ theme: "bootstrap" });

            if (datos) {
                if (datos.length > 0) {
                    datos.forEach(function (registro) {                        
                        $("#cmbProyecto1").append('<option value=' +
                            registro.Proyecto + '>' +
                            registro.Proyecto +
                            '</option>');
                    })

                    document.getElementById('cmbProyecto1').onchange = function () { mostrarEtiquetaProyecto(); };

                    document.getElementById('cmbProyecto1').selectedIndex = 0;
                    
                   // $('#cmbProyecto1').trigger('change');

                    $.LoadingOverlay("hide");
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}

function fnCargarProyectosXsupervisor() {
    var url = "";
    var anio = vUsuarioActual.substring(0, 4);
    var codigo = vUsuarioActual.substring(4);

    url = baseHostURL + "api/Auxiliares/ObtenerProyectosPorSupervisor/" + anio + "/" + codigo;

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
                        fnCargarProyectosXsupervisor();
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
            var datos = data;
            limpiarSelect('cmbProyectoXSupervisor');
            $("#cmbProyectoXSupervisor").select2({ theme: "bootstrap" });

            if (datos) {
                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        $("#cmbProyectoXSupervisor").append('<option value=' +
                            registro.AnioCodigoProyecto + '>' +
                            registro.ProyectoDescripcion +
                            '</option>');
                    })

                    document.getElementById('cmbProyectoXSupervisor').selectedIndex = 0;

                    $.LoadingOverlay("hide");
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}


function mostrarEtiquetaProyecto() {
    var url = baseHostURL + "api/Auxiliares/InfoProyectoAuxiliares/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbProyecto1").val();
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
                        mostrarEtiquetaProyecto();
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
            var datos = data;
            if (datos) {
                if (datos.length > 0) {
                    datos.forEach(function (registro) {                        
                        document.getElementById('lblProyecto').innerHTML = registro.Proyecto;
                    })                    
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}

function fnCargarTiposUsuario() {    
    var url = baseHostURL + "api/Auxiliares/GetTiposUsuario";
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
                        fnCargarTiposUsuario();
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
            var datos = data;
            limpiarSelect('cmbTipoUsuario');
            $("#cmbTipoUsuario").select2({ theme: "bootstrap" });

            if (datos) {
                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        $("#cmbTipoUsuario").append('<option value=' +
                            registro.idtipousuario + '>' +
                            registro.descripcion +
                            '</option>');
                    })

                    document.getElementById('cmbTipoUsuario').onchange = function () { mostrarPorTipoDeUsuario(); };
                    document.getElementById('cmbTipoUsuario').selectedIndex = 0;
                    $('#cmbTipoUsuario').trigger('change');

                    $.LoadingOverlay("hide");
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}

function fnInicializaTableAuxiliares() {
    $('#tableAuxiliares').dataTable({
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

function fnCargarTablaAuxiliares() {
    if ($('#cmbProyecto1').val() != null || $('#cmbProyectoXSupervisor').val() != null) {
        
        var url = baseHostURL;

        if (vUsuarioEsModoSupervisor) {
            var parametros = $('#cmbProyectoXSupervisor').val().trim().split(',');
            url = url + "api/Auxiliares/ConsultarAuxiliaresXProyecto/" + parametros[0] + "/" + parametros[1];
        } else {
            url = url + "api/Auxiliares/ConsultarAuxiliaresXProyecto/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbProyecto1").val();
        }

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
                        fnCargarTablaAuxiliares();
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
            $('#tableAuxiliares').dataTable().fnClearTable();
            $('#tableAuxiliares').dataTable().fnDestroy();

            var datos = data;
            var contador = 1;

            $("tbody").children().remove();
            vCantidadRegistrosEncontrados = 0;
            if (datos.length > 0) {
                datos.forEach(function (registro) {

                    var funcionLlamarEditar = "mostrarModalEditarAuxiliar(" + registro.IdAuxiliar + "," +
                        "'" + registro.Apellido + "', '" + registro.Nombre + "'," + registro.Colegiado + "," +
                        "'" + registro.UserName + "', '" + registro.DPI + "','" + registro.ArchivoDPI + "','" + registro.NIT + "'," +
                        "'" + registro.FechaColegacion + "','" + registro.NoTelefono + "'," +
                        "" + registro.DocAprobada + "," +
                        "'" + registro.ArchivoCV + "', '" + registro.ArchivoColegiado + "','" + registro.ArchivoActaNotarial + "','" + registro.ArchivoConstanciaParticipacion + "'," +
                        "'" + registro.photo + "', '" + registro.ArchivoCarneCIG + "', " + registro.idTipoUsuario + "," +
                        "'" + registro.ArchivoDPI_ruta + "', '" + registro.ArchivoCV_ruta + "', '" + registro.ArchivoColegiado_ruta + "', '" + registro.ArchivoActaNotarial_ruta + "'," +
                        "'" + registro.ArchivoConstanciaParticipacion_ruta + "', '" + registro.photo_ruta + "', '" + registro.ArchivoCarneCIG_ruta + "')";

                    var estadoAprobacion = "";
                    if (registro.DocAprobada) {
                        estadoAprobacion = "Aprobado";
                    } else {
                        estadoAprobacion = "Sin aprobar";
                    }

                    var estadoHabilitado = "";
                    var funcionLlamarBloquear = "";
                    var puedeBloquear = (vRolUsuarioActual.includes("ADMINISTRADOR|"));
                    if (puedeBloquear) {
                        if (registro.IsLockedOut) {
                            funcionLlamarBloquear = "fnConfimarBloquearUsuario('" + registro.UserName + "',false)";
                            estadoHabilitado = 'Desactivado&nbsp;&nbsp;<a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                                ' data-content="DesbloquearUsuario" data-placement="top" title="Desbloquear este usuario" onclick="' + funcionLlamarBloquear + '">' +
                                ' <i class="fas fa-lock-open fa-lg fa-fw"></i></a>';
                        } else {
                            funcionLlamarBloquear = "fnConfimarBloquearUsuario('" + registro.UserName + "',true)";
                            estadoHabilitado = 'Activo&nbsp;&nbsp;<a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                                ' data-content="BloquearUsuario" data-placement="top" title="Bloquear este usuario" onclick="' + funcionLlamarBloquear + '">' +
                                ' <i class="fas fa-lock fa-lg fa-fw"></i></a>';
                        }
                    } else {
                        if (registro.IsLockedOut) {
                            estadoHabilitado = 'Desactivado&nbsp;&nbsp;"';
                        } else {
                            estadoHabilitado = 'Activo&nbsp;&nbsp;"';
                        }
                    }

                    var tbody = '<tr class="tr_data" >' +
                        '<td class="spacer"></td>';
                    tbody += '<td style="width: 50px">' +
                        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                        '           data-content="VerVentanaEdicion" data-placement="top" title="Ver detalle" onclick="' + funcionLlamarEditar + '">' +
                        '           <i class="fas fa-search fa-lg fa-fw"></i></a> ' +
                        '</td>';
                    tbody += '<td>' + registro.Nombre + '</td>' +
                        '<td>' + registro.Apellido + '</td>' +
                        '<td>' + registro.TipoUsuario + '</td>' +
                        '<td>' + registro.UserName + '</td>' +
                        '<td>' + registro.Colegiado + '</td>' +
                        '<td>' + estadoAprobacion + '</td>' +
                        '<td>' + estadoHabilitado + '</td>' +
                        '<td class="spacer"></td>' +
                        '</tr>';

                    $('#tableAuxiliares').append(tbody);

                    contador = contador + 1;
                })
                vCantidadRegistrosEncontrados = contador;
                fnInicializaTableAuxiliares();
                $.LoadingOverlay("hide");
            }
        })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de auxiliares. " + error.message + "  ", "success");
        });
    } else {
        Swal.fire("", "Debe seleccionar el plan anual y el proyecto", "warning");
    }
}


function fnConfimarBloquearUsuario(pUsername, pBloquear) {
    var pregunta = "";
    if (pBloquear) {
        pregunta = "\u00BFDesea bloquear el usuario " + pUsername + " ? ";
    } else {
        pregunta = "\u00BFDesea desbloquear el usuario " + pUsername + " ? ";
    }

    Swal.fire({
        title: "",
        text: pregunta,
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    })
        .then((result) => {
            if (result.isConfirmed) { fnBloquearUsuario(pUsername, pBloquear); }
        }
        );
}


function fnBloquearUsuario(pUsername, pBloquear) {
    var url = baseHostURL;

    if (pBloquear) {
        url = url + "api/Auxiliares/DeshabilitarUnUsuarioAuxiliar/" + pUsername;
    } else {
        url = url + "api/Auxiliares/HabilitarUnUsuarioAuxiliar/" + pUsername;
    }
    //alert(url);
    $.LoadingOverlay("show");

    fetch(proxyurl + url, {
        method: 'POST',
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
                        fnBloquearUsuario();
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
            fnCargarTablaAuxiliares();
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}


function mostrarModalAgregarAuxiliar() {
    if ($('#cmbProyecto1').val() != null || $('#cmbProyectoXSupervisor').val() != null) {
        modoNuevoAuxiliar = true;
        vIdAuxiliarSiendoEditado = -1;               

        $('#nav-docs-tab').hide();
        $('#nav-aprobacion-tab').hide();
        document.getElementById('letreroModalEdicion').innerHTML = "Agregar auxiliar";        
        $('#txtNombreAuxiliar').val("");
        $('#txtApellidoAuxiliar').val("");
        $('#txtUsername').val("");
        $("#txtUsername").prop('disabled', false);
        $('#txtDPI').val("");
        $('#txtNIT').val("");
        $('#txtColegiado').val("");
        $('#dtFechaColegiacion').val("");
        $('#txtTelefono').val("");
        

        if (vRolUsuarioActual.includes("SUPERVISOR|") || vRolUsuarioActual.includes("ADMINISTRADOR|")) {
            $('#btnGrabar').show();
            $('#btnCancelar').show();
        } else {
            $('#btnGrabar').hide();
            $('#btnCancelar').hide();
        }
      

        document.getElementById('imgFoto').src = "../img/ImgAuxiliar.png";
        document.getElementById('lblNombreArchivoFoto').innerHTML = "";
        document.getElementById('hrefNombreArchivoFoto').setAttribute('href', "");
        document.getElementById('lblNombreArchivoDPI').innerHTML = "";
        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', "");
        document.getElementById('lblNombreArchivoActaNotarial').innerHTML = "";
        document.getElementById('hrefNombreArchivoActaNotarial').setAttribute('href', "");
        document.getElementById('lblNombreArchivoConstanciaSupRegional').innerHTML = "";
        document.getElementById('hrefNombreArchivoConstanciaSupRegional').setAttribute('href', "");
        document.getElementById('lblNombreArchivoCV').innerHTML = "";
        document.getElementById('hrefNombreArchivoCV').setAttribute('href', "");
        document.getElementById('lblNombreArchivoColegiado').innerHTML = "";
        document.getElementById('hrefNombreArchivoColegiado').setAttribute('href', "");
        document.getElementById('lblNombreArchivoCarneCIG').innerHTML = "";
        document.getElementById('hrefNombreArchivoCarneCIG').setAttribute('href', "");

        $("#fileFoto").val('');
        $("#fileDPI").val('');
        $("#fileActaNotarial").val('');
        $("#fileConstanciaSupRegional").val('');
        $("#fileCV").val('');
        $("#fileColegiadoActivo").val('');
        $("#fileCopiaCarneCIG").val('');
        
        document.getElementById('nav-info-tab').click();
        $('#modalEdicionAuxiliar').show();
    } else {
        Swal.fire("", "Debe seleccionar el plan anual y el proyecto", "warning");
    }
}

function mostrarModalEditarAuxiliar(IdAuxiliar, Apellido, Nombre, Colegiado,    
                                    UserName, DPI, ArchivoDPI, NIT,
                                    FechaColegacion, NoTelefono, Aprobado,
                                    ArchivoCV, ArchivoColegiado, ArchivoActaNotarial, ArchivoConstanciaParticipacion,
                                    photo, ArchivoCarneCIG, idTipoUsuario,
                                    ArchivoDPI_ruta, ArchivoCV_ruta, ArchivoColegiado_ruta, ArchivoActaNotarial_ruta,
                                    ArchivoConstanciaParticipacion_ruta, photo_ruta, ArchivoCarneCIG_ruta)
{
    if ($('#cmbProyecto1').val() != null || $('#cmbProyectoXSupervisor').val() != null) {
        var fecha = FechaColegacion;        
        var fechaColegiacionFormateada = "";
        if (fecha) {
            if (fecha.length >= 10) {
                fechaColegiacionFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);
            }
        }

        modoNuevoAuxiliar = false;
        vIdAuxiliarSiendoEditado = IdAuxiliar;
        $('#nav-docs-tab').show();        
        if (vRolUsuarioActual.includes("REGIONALES|")) {
            $('#nav-aprobacion-tab').show();
        } else {
            $('#nav-aprobacion-tab').hide();
        }        
        document.getElementById('letreroModalEdicion').innerHTML = Nombre + " " + Apellido;
        $('#txtNombreAuxiliar').val(Nombre);
        $('#txtApellidoAuxiliar').val(Apellido);        
        $('#cmbTipoUsuario').val(idTipoUsuario);
        $('#cmbTipoUsuario').trigger('change');
        $('#txtUsername').val(UserName);
        $("#txtUsername").prop('disabled', true);
        $('#txtDPI').val(DPI);
        $('#txtNIT').val(NIT);
        $('#txtColegiado').val(Colegiado);
        $('#dtFechaColegiacion').val(fechaColegiacionFormateada);
        $('#txtTelefono').val(NoTelefono);

        var usuarioPuedeEditarDatos = (vRolUsuarioActual.includes("SUPERVISOR|") || vRolUsuarioActual.includes("ADMINISTRADOR|"));
        if (!Aprobado && usuarioPuedeEditarDatos) {
            $('#txtNombreAuxiliar').prop('disabled', false);
            $('#txtApellidoAuxiliar').prop('disabled', false);
            $('#cmbTipoUsuario').prop('disabled', false);
            $('#txtDPI').prop('disabled', false);
            $('#txtNIT').prop('disabled', false);
            $('#txtColegiado').prop('disabled', false);
            $('#dtFechaColegiacion').prop('disabled', false);
            $('#txtTelefono').prop('disabled', false);
            $('#btnGrabar').show();
            $('#btnCancelar').show();
        } else {
            $('#txtNombreAuxiliar').prop('disabled', true);
            $('#txtApellidoAuxiliar').prop('disabled', true);
            $('#cmbTipoUsuario').prop('disabled', true);                     
            $('#txtDPI').prop('disabled', true);
            $('#txtNIT').prop('disabled', true);
            $('#txtColegiado').prop('disabled', true);
            $('#dtFechaColegiacion').prop('disabled', true);
            $('#txtTelefono').prop('disabled', true);
            $('#btnGrabar').hide();
            $('#btnCancelar').hide();
        }
        
        //nombres de los archivos de documentos que se han subido
        if (photo.length > 0) {
            $('#imgFoto').show();
            document.getElementById('imgFoto').src ="PHOTOS/" + photo;
        } else {
            $('#imgFoto').hide();
        }
        document.getElementById('lblNombreArchivoFoto').innerHTML = photo;
        document.getElementById('hrefNombreArchivoFoto').setAttribute('href',   "PHOTOS/" + photo);
        document.getElementById('lblNombreArchivoDPI').innerHTML = ArchivoDPI;
        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', "DPI/" + ArchivoDPI);
        document.getElementById('lblNombreArchivoActaNotarial').innerHTML = ArchivoActaNotarial;
        document.getElementById('hrefNombreArchivoActaNotarial').setAttribute('href',   "Acta_Notarial/" + ArchivoActaNotarial);
        document.getElementById('lblNombreArchivoConstanciaSupRegional').innerHTML = ArchivoConstanciaParticipacion;
        document.getElementById('hrefNombreArchivoConstanciaSupRegional').setAttribute('href',  "Constancia_SubTec/" + ArchivoConstanciaParticipacion);
        document.getElementById('lblNombreArchivoCV').innerHTML = ArchivoCV;
        document.getElementById('hrefNombreArchivoCV').setAttribute('href',  "CV/" + ArchivoCV);
        document.getElementById('lblNombreArchivoColegiado').innerHTML = ArchivoColegiado;
        document.getElementById('hrefNombreArchivoColegiado').setAttribute('href', "Colegiado/" + ArchivoColegiado);
        document.getElementById('lblNombreArchivoCarneCIG').innerHTML = ArchivoCarneCIG;
        document.getElementById('hrefNombreArchivoCarneCIG').setAttribute('href',  "CarneCIG/" + ArchivoCarneCIG);

        $("#fileFoto").val('');
        $("#fileDPI").val('');
        $("#fileActaNotarial").val('');
        $("#fileConstanciaSupRegional").val('');
        $("#fileCV").val('');
        $("#fileColegiadoActivo").val('');
        $("#fileCopiaCarneCIG").val('');

        //Deshabilitar edición de documentos si ya está aprobado
        var usuarioPuedeSubirArchivos = (vRolUsuarioActual.includes("SUPERVISOR|") || vRolUsuarioActual.includes("ADMINISTRADOR|"));
        if (Aprobado || !usuarioPuedeSubirArchivos) {
            $('#fileFoto').hide();
            $('#btnSubirArchivoFoto').hide();
            $('#fileDPI').hide();
            $('#btnSubirArchivoDPI').hide();
            $('#fileActaNotarial').hide();
            $('#btnSubirArchivoActaNotarial').hide();
            $('#fileConstanciaSupRegional').hide();
            $('#btnSubirfileConstanciaSupRegional').hide();
            $('#fileCV').hide();
            $('#btnSubirArchivoCV').hide();
            $('#fileColegiadoActivo').hide();
            $('#btnSubirArchivoColegiado').hide();
            $('#fileCopiaCarneCIG').hide();
            $('#btnSubirArchivoCopiaCarneCIG').hide();
        } else {
            $('#fileFoto').show();
            $('#btnSubirArchivoFoto').show();
            $('#fileDPI').show();
            $('#btnSubirArchivoDPI').show();
            $('#fileActaNotarial').show();
            $('#btnSubirArchivoActaNotarial').show();
            $('#fileConstanciaSupRegional').show();
            $('#btnSubirfileConstanciaSupRegional').show();
            $('#fileCV').show();
            $('#btnSubirArchivoCV').show();
            $('#fileColegiadoActivo').show();
            $('#btnSubirArchivoColegiado').show();
            $('#fileCopiaCarneCIG').show();
            $('#btnSubirArchivoCopiaCarneCIG').show();
        }

        document.getElementById('nav-info-tab').click();
        $('#modalEdicionAuxiliar').show();
    } else {
        Swal.fire("", "Debe seleccionar el plan anual y el proyecto", "warning");
    }
}

function fnFormarUsername() {
    if (modoNuevoAuxiliar) {
        var usuarioPadre = "";
        if (vUsuarioEsModoSupervisor) {
            var parametros = $('#cmbProyectoXSupervisor').val().trim().split(',');
            usuarioPadre =  parametros[0] + parametros[1];
        } else {
            usuarioPadre = $("#cmbPlanAnual1").val() + $("#cmbProyecto1").val();
        }
        
        var apellido = $("#txtApellidoAuxiliar").val();
        var nombre = $("#txtNombreAuxiliar").val();

        var nuevoUsername = usuarioPadre + "AUX" + (vCantidadRegistrosEncontrados + 1).toString();

        if (apellido.length > 2 && apellido.length > 2) {
            nuevoUsername = nuevoUsername + nombre.substring(0, 3) + apellido.substring(0, 3);
        } else if (nombre.length < 3 && apellido.length < 3) {
            nuevoUsername = nuevoUsername + nombre.substring(0, 2) + apellido.substring(0, 2);
        } else {
            nuevoUsername = nuevoUsername + nombre.substring(0, 1) + apellido.substring(0, 1);
        }

        nuevoUsername.replace("Á", "A");
        nuevoUsername.replace("É", "E");
        nuevoUsername.replace("Í", "I");
        nuevoUsername.replace("Ó", "O");
        nuevoUsername.replace("Ú", "U");

        nuevoUsername.replace("á", "a");
        nuevoUsername.replace("é", "e");
        nuevoUsername.replace("í", "i");
        nuevoUsername.replace("ó", "o");
        nuevoUsername.replace("ú", "u");

        nuevoUsername.replace("Ñ", "N");
        nuevoUsername.replace("ñ", "n");

        $("#txtUsername").val(nuevoUsername);
    }
}

function fnValidarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

function fnGrabarDatosUsuario() {
    var url = baseHostURL;
    var opcion = 0;

    if (modoNuevoAuxiliar) {
        opcion = 1;
        url = url + "api/Auxiliares/InsertarAuxiliar/";
    } else {
        ocpion = 4;
        url = url + "api/Auxiliares/ActualizaUnUsuarioAuxiliar/";
    }
    //alert(url);
    $.LoadingOverlay("show");


    var vFechaColegiacion = $('#dtFechaColegiacion').val();
    var vFechaColegiacionNuevoFormato = '1900-01-01 T00:00Z'    
    if (fnValidarFormatoFecha(vFechaColegiacion)) {        
        var arrayColegiacion = vFechaColegiacion.split("/");
        arrayColegiacion[0] = (parseInt(arrayColegiacion[0])).toString();
        if (arrayColegiacion[0].length < 2) {
            arrayColegiacion[0] = "0" + arrayColegiacion[0];
        }
        if (arrayColegiacion[1].length < 2) {
            arrayColegiacion[1] = "0" + arrayColegiacion[1];
        }
        vFechaColegiacionNuevoFormato = arrayColegiacion[2] + '-' + arrayColegiacion[1] + '-' + arrayColegiacion[0] + ' T00:00Z';
    }

    var vAnioID;
    var vProyectoCodigo;
    if (vUsuarioEsModoSupervisor) {
        var parametros = $('#cmbProyectoXSupervisor').val().trim().split(',');
        vAnioID = parametros[0];
        vProyectoCodigo = parametros[1];        
    } else {
        vAnioID = $("#cmbPlanAnual1").val();
        vProyectoCodigo = $("#cmbProyecto1").val();        
    }

    var registro = {
        Opcion: opcion,
        Filtro: "",
        AnioID: parseInt(vAnioID),
        ProyectoCodigo: vProyectoCodigo,
        Apellido: $("#txtApellidoAuxiliar").val(),
        Nombre: $("#txtNombreAuxiliar").val(),
        Colegiado: $("#txtColegiado").val(),
        UserName: $("#txtUsername").val(),
        UsuarioModificacion: vUsuarioActual,
        Id: vIdAuxiliarSiendoEditado,
        DPIArchivo : "",
        DPI: $("#txtDPI").val(),
        NIT: $("#txtNIT").val(),
        ArchivoCV : "",
        ArchivoActaNotarial : "",
        ArchivoConstanciaParticipacion : "",
        ArchivoColegiado : "",
        ArchivoFoto : "",
        FechaColegacion: vFechaColegiacionNuevoFormato,
        NoTelefono: $("#txtTelefono").val(),
        ArchivoCarneCIG : "",
        TipoUsuario_id: $("#cmbTipoUsuario").val(),
    };

    var dataJSONt = JSON.stringify(registro);

    fetch(proxyurl + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSONt,
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        fnGrabarDatosUsuario();
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
            fnCargarTablaAuxiliares();
            if (modoNuevoAuxiliar) {
                modoNuevoAuxiliar = false;
                vIdAuxiliarSiendoEditado = data;
                $('#nav-docs-tab').show();
                $('#nav-aprobacion-tab').show();
                document.getElementById('letreroModalEdicion').innerHTML = registro.Nombre + " " + registro.Apellido;
                $("#txtUsername").prop('disabled', true);
                if (vRolUsuarioActual.includes("REGIONALES|")) {
                    $('#nav-aprobacion-tab').show();
                } else {
                    $('#nav-aprobacion-tab').hide();
                }
            }
            $.LoadingOverlay("hide");
            Swal.fire("", "Se grabaron los cambios", "success");
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");            
        });
}


function fnConfimarAprobarUsuario(pAprobado) {
    var pregunta = "";
    if (pAprobado) {
        pregunta = "\u00BF Desea aprobar el auxiliar ? ";
    } else {
        pregunta = "\u00BF Desea desaprobar el auxiliar ? ";
    }

    Swal.fire({
        title: "",
        text: pregunta,
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    })
        .then((result) => {
            if (result.isConfirmed) { fnAprobarUsuario(pAprobado); }
        }
        );
}

function fnAprobarUsuario(pAprobado) {
    var url = baseHostURL;
    url = url + "api/Auxiliares/ActualizarAprobacionAuxiliar/";
    //alert(url);
    var observacion = $("#txtObservacionesAprobacion").val();

    if (observacion.length > 0) {
        $.LoadingOverlay("show");

        var vAnioID;
        var vProyectoCodigo;
        if (vUsuarioEsModoSupervisor) {
            var parametros = $('#cmbProyectoXSupervisor').val().trim().split(',');
            vAnioID = parametros[0];
            vProyectoCodigo = parametros[1];
        } else {
            vAnioID = $("#cmbPlanAnual1").val();
            vProyectoCodigo = $("#cmbProyecto1").val();
        }

        var registro = {
            RealizadoPor: vUsuarioActual,
            Aprobado: pAprobado,
            IdAuxiliar: vIdAuxiliarSiendoEditado,
            AnioID: parseInt(vAnioID),
            ProyectoCodigo: vProyectoCodigo,
            Observacion: $("#txtObservacionesAprobacion").val(),
        };

        var dataJSONt = JSON.stringify(registro);

        fetch(proxyurl + url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + vToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: dataJSONt,
        })
            .then(response => {
                var estadoRespuesta = response.status;
                if (estadoRespuesta == 200) return response.json();
                else if (estadoRespuesta == 401) {
                    fnRefrescarToken(vToken);
                    var interval = setInterval(function () {
                        if (vToken !== '') {
                            fnAprobarUsuario();
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
                fnCargarTablaAuxiliares();
                $.LoadingOverlay("hide");
                if (pAprobado) {
                    Swal.fire("", "Se registró la aprobación", "success");
                } else {
                    Swal.fire("", "Se registró la desaprobación", "success");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");                
            });
    } else {
        Swal.fire("", "Por favor ingrese una observación", "warning");
    }
}

function fnValidarArchivo(vInputFile) {
    var valido = false;
    var mensajeError = "";
    var fileInput = document.getElementById(vInputFile);
    var filePath = fileInput.value;

    if (filePath.length > 0) {
        // Allowing file type
        var allowedExtensions = /(\.pdf)$/i;
        var allowedExtensionsPhoto = /(\.jpg|\.jpeg|\.png)$/i;

        switch (vInputFile) {
            case 'fileFoto':
                valido = allowedExtensionsPhoto.exec(filePath);
                if (!valido) {
                    mensajeError = "El archivo debe ser una imagen";
                    fileInput.value = '';
                }
                break;
            case 'fileDPI':
            case 'fileActaNotarial':
            case 'fileConstanciaSupRegional':
            case 'fileCV':
            case 'fileColegiadoActivo':
            case 'fileCopiaCarneCIG':
                valido = allowedExtensions.exec(filePath);
                if (!valido) {
                    mensajeError = "El archivo debe tener formato PDF";
                    fileInput.value = '';
                }
                break;
        }

        if (valido) {
            fnSubirArchivo(vInputFile);
        } else {
            Swal.fire("", mensajeError, "warning");
        }
    }
}


function fnSubirArchivo(vInputFile) {
    $.LoadingOverlay("show");

    var urlMetodo = "";
    
    switch (vInputFile) {
        case 'fileFoto':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_Fotografia";
            break;
        case 'fileDPI':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_DPI";
            break;
        case 'fileActaNotarial':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_ActaNotarial";
            break;
        case 'fileConstanciaSupRegional':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_ConstanciaParticipacion";
            break;
        case 'fileCV':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_CV";
            break;
        case 'fileColegiadoActivo':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_ColegiadoActivo";
            break;
        case 'fileCopiaCarneCIG':
            urlMetodo = baseHostURL + "api/Auxiliares/ActualizarArchivo_CarneCIG";
            break;
    }
    urlMetodo = urlMetodo + "/" + vIdAuxiliarSiendoEditado;
    urlMetodo = urlMetodo + "/" + $("#txtUsername").val();
    urlMetodo = urlMetodo + "/" + vUsuarioActual;    

    var fileUpload = $("#" + vInputFile).get(0);
    var files = fileUpload.files;
    
    for (var i = 0; i < files.length; i++) {
    
        if (vInputFile == 'fileFoto') {
            //Agregar parámetro extensión del archivo
            urlMetodo = urlMetodo + "/" + files[i].name.substring(files[i].name.lastIndexOf(".") + 1);
        }

        fetch(proxyurl + urlMetodo, {
            method: 'POST',
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
                            fnSubirArchivo(vInputFile);
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
                var rutaArchivo = data;
                CalluploaderHandler(rutaArchivo, vInputFile);
                var nombreArchivo = rutaArchivo.substring(rutaArchivo.lastIndexOf("\\") + 1);
                var urlArchivo = document.location.origin + rutaArchivo.substring(rutaArchivo.indexOf("\\Documentos")).replace("\\", "/");                
                                              
                switch (vInputFile) {
                    case 'fileFoto':                        
                        document.getElementById('imgFoto').src = urlArchivo;
                        $('#imgFoto').show();
                        document.getElementById('lblNombreArchivoFoto').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoFoto').setAttribute('href', urlArchivo);                        
                        break;
                    case 'fileDPI':
                        document.getElementById('lblNombreArchivoDPI').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoDPI').setAttribute('href', urlArchivo);
                        break;
                    case 'fileActaNotarial':
                        document.getElementById('lblNombreArchivoActaNotarial').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoActaNotarial').setAttribute('href', urlArchivo);
                        break;
                    case 'fileConstanciaSupRegional':
                        document.getElementById('lblNombreArchivoConstanciaSupRegional').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoConstanciaSupRegional').setAttribute('href', urlArchivo);
                        break;
                    case 'fileCV':
                        document.getElementById('lblNombreArchivoCV').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoCV').setAttribute('href', urlArchivo);
                        break;
                    case 'fileColegiadoActivo':
                        document.getElementById('lblNombreArchivoColegiado').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoColegiado').setAttribute('href', urlArchivo);
                        break;
                    case 'fileCopiaCarneCIG':
                        document.getElementById('lblNombreArchivoCarneCIG').innerHTML = nombreArchivo;
                        document.getElementById('hrefNombreArchivoCarneCIG').setAttribute('href', urlArchivo);
                        break;
                }
            })            
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message , "error");
            });
    }       
}

function CalluploaderHandler(vRuta, vInputFile) {
    var fileUpload = $("#" + vInputFile).get(0);
    var files = fileUpload.files;
    var test = new FormData();
    for (var i = 0; i < files.length; i++) {
        test.append(files[i].name, files[i]);
    }
    var urlLlamar = "AuxiliaresFileUploadHandler.ashx?vRuta=" + vRuta;

    $.ajax({
        type: "POST",
        url: urlLlamar,
        contentType: false,
        processData: false,
        data: test,
        success: OnCompleteUpload,
        error: OnFailUpload
    });    
}

function OnCompleteUpload(result) {
    Swal.fire("Archivo ingresado correctamente", "", "success");
    fnCargarTablaAuxiliares();
    $.LoadingOverlay("hide");
}

function OnFailUpload(result) {
    Swal.fire("Error al guardar el archivo en la carpeta física", "", "error");
    fnCargarTablaAuxiliares();
    $.LoadingOverlay("hide");
}

function mostrarPorTipoDeUsuario() {
    var idTipoUsuarioSeleccionado = $('#cmbTipoUsuario').val();

    switch (idTipoUsuarioSeleccionado) {
        case "1":
            document.getElementById('labelFechaColegiacion').style.display = "none";
            document.getElementById('divFechaColegiacion').style.display = "none";
            document.getElementById('labelTelefono').style.display = "none";
            document.getElementById('txtTelefono').style.display = "none";
            document.getElementById('divCopiaCarneCIG').style.display = "none";
            document.getElementById('divColegiado').style.display = "none";
            document.getElementById('divConstanciaColegiadoActivo').style.display = "none";
            document.getElementById('divActaNotarial').style.display = "none";
            document.getElementById('divConstSupReg').style.display = "none";
            break;
        case "2":
            document.getElementById('divColegiado').style.display = "";
            document.getElementById('divActaNotarial').style.display = "";
            document.getElementById('divConstSupReg').style.display = "";
        case "3":
            document.getElementById('divColegiado').style.display = "";
            document.getElementById('labelFechaColegiacion').style.display = "";
            document.getElementById('divFechaColegiacion').style.display = "";
            document.getElementById('labelTelefono').style.display = "";
            document.getElementById('txtTelefono').style.display = "";
            document.getElementById('divCopiaCarneCIG').style.display = "";
            document.getElementById('divActaNotarial').style.display = "";
            document.getElementById('divConstSupReg').style.display = "";
        case "4":
            document.getElementById('divColegiado').style.display = "";
            document.getElementById('divCopiaCarneCIG').style.display = "";
            document.getElementById('divConstanciaColegiadoActivo').style.display = "";
            document.getElementById('divActaNotarial').style.display = "";
            document.getElementById('divConstSupReg').style.display = "";

            break;
    }
}

