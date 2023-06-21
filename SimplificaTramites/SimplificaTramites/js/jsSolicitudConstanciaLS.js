var vidEstado;
var vParametroBusqueda;
var vidSolicitud;

$(document).ready(function () {
    fnConsultarToken();
    
    fnCargarEstados();
    fnCargarSolicitudesPorEstado(0);

    $("#tblSolicitudesRecibidas").on("click", "tr", function ()  {
        var vid= $("#tblSolicitudesRecibidas").DataTable().row(this).id();
        if (vid != void (0)) {
            console.log("fila ID " + vid)
            vidSolicitud=vid
            fnAbrirModalSolicitud();
        }

    });

    $("#tblSolicitudesRecibidas").on("hover", "tr", function () {
        var vid = $("#tblSolicitudesRecibidas").DataTable().row(this).id();
        alert('hover ' + vid)

    });


    $("#cmbEstadoSolicitud").on("change", ({ currentTarget }) => {
        vidEstado = currentTarget.value;
        console.log("id " + vidEstado)

        $('#tblSolicitudesRecibidas').DataTable().clear().draw();
        $('#cmbEstadoSolicitud').find(vidEstado).remove();

        $.ajax({
            //url: `${urlbase}api/Solicitud/ObtEstadoCL`
            url: `${urlbase}ObtEstadoCL`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },

            success: (val) => {
                console.log(val)
                fnCargarSolicitudesPorEstado(vidEstado)
                /*if (val.length > 0) {
                    if ((rolConsultas == "ADMINISTRADORES") || (rolConsultas == "ADMINISTRADOR")) {

                        $("#cmbEstadoSolicitud").append(new Option("[Todos]", "0"));
                    }



                    let cols = val.map((item) => `<option value="${item.ID}">${item.Descripcion}</option>`)
                    $("#cmbEstadoSolicitud").append(`<option value = "0">TODOS</option>`)
                    $("#cmbEstadoSolicitud").append(cols.join(""))*/
                $("#cmbEstadoSolicitud").find(vidEstado)
                //$("#cmbEstadoSolicitud").trigger("change")
                //}

            }
        })

    });

    $("#btnAtenderSolicitud").on("click", () => {
        var atender = confirm("INICIAR ATENCIÓN");
        if (atender == true) {
            $('#winSolicitudConstancia').modal('hide');
            
            window.location.href = `../SolicitudConstanciaLS/frmAtencionSolicitud.aspx`
        } else {
            
        }
        
    });
    $("#btnRechazar").on("click", () => {
        alert("RECHAZANDO SOLICITud");
    });
});


function fnCargarSolicitudesPorEstado(idEstado) {

    $.ajax({
        //url: `${urlbase}api/Solicitud/ObtSolicitudesXEstado/${idEstado}`,
        url: `${urlbase}ObtSolicitudesXEstado/${idEstado}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {


            if (val.length > 0) {
                $('#tblSolicitudesRecibidas').dataTable().fnClearTable();
                $('#tblSolicitudesRecibidas').dataTable().fnDestroy();
                let cols = val.map((item) => `                    
                            ${pC1 = item.Codigo}                            
                            <tr id=${item.ID}>
                                <td class="spacer bg-light" ></td >                             
                                <td  style="width:100px">
                                    ${item.Codigo}
                                </td>
                                <td style="width:300px">
                                    ${item.Nombre}    
                                </td>
                                <td>
                                    ${item.DPI}
                                </td>
                                <td>
                                    ${item.Tel}
                                </td>
                                <td style="text-align:center">
                                    ${item.EMAIL}
                                </td>
                                <td>
                                    ${moment(item.Fecha).format("DD/MM/YYYY")}
                                </td>
                                <td>
                                    ${item.Estado}
                                </td>                               
                                <td class="spacer" ></td>                           
                            </tr >  `);
                $("#tblSolicitudesRecibidas tbody").html(cols.join(""))
                fnInicializaTableSolicitudes();
                $.LoadingOverlay("hide");
            }
            else {
                $.LoadingOverlay("hide");
                //$("#tableSuspensiones tbody").html("")
                $('#tblSolicitudesRecibidas').DataTable().clear().draw();
                //fnInicializaTableSuspensiones();
            }
        },
        error: (error) => {
            Swal.fire("", error.message, "error");
        }
    })
}

function fnInicializaTableSolicitudes() {
    $('#tblSolicitudesRecibidas').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin solicitudes para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ solicitudes",
            "infoEmpty": "Mostrando 0 de 0 de 0 solicitudes",
            "infoFiltered": "(Filtrado de _MAX_ total solicitudes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ solicitudes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay solicitudes encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarEstados() {
    $.ajax({
        //url: `${urlbase}api/Solicitud/ObtEstadoCL`,
        url: `${urlbase}ObtEstadoCL`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<option value = "${item.ID}"> ${item.Descripcion}</option>`)            
            $("#cmbEstadoSolicitud").append(`<option value = "0">TODOS</option>`)
            $("#cmbEstadoSolicitud").append(cols.join(""))
            $("#cmbEstadoSolicitud").trigger("change")

        }
    })
};

function fnCargarSolicitudPorID(vid) {
    $.ajax({
        //url: `${urlbase}api/Solicitud/ObtSolicitudesXId/${vidSolicitud}`,
        url: `${urlbase}ObtSolicitudesXId/${vidSolicitud}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => {
                console.log(item)
                $("#lblTituloSolicitudConstancia").text("Solicitud de Constancia No. " + item.Codigo)
                $("#txtNombre").attr("value", item.Nombre)
                $('#txtDPI').attr("value", item.DPI)
                $('#txtNIT').attr("value", item.Nit)
                $('#txtCorreoElectronico').attr("value", item.EMAIL)
                $('#txtTelefono').attr("value", item.Tel)
                $('#txtUltimoSueldo').attr("value", item.UltimoSueldo)
                $('#txtEstado').attr("value", item.Estado)
                $('#dpInicio').attr("value", item.Inicio)
                console.log(item.Inicio)
                $('#dpFin').attr("value", item.Final)
                console.log(item.Final)
                $('#cmbTipoServicio').attr("value", item.Servicio)
                console.log(item.Servicio)
                $('#txtPuesto').attr("value", item.Puesto)
                console.log(item.Puesto)               
                vRenglones = item.Renglones.split(",");
                console.log (vRenglones)
                vRenglones.forEach(renglon => {
                    vCheckboxName = '#chk' + renglon
                    console.log(vCheckboxName)
                    $(vCheckboxName).prop("checked", true)                   
                });
                $('#cmbTipoServicio').attr("text", item.Servicio)
                $("#txtPuesto").attr("value", item.Puesto)
                if (item.Vigente.localeCompare("Activo") ==0) {
                    $('#radioActivo').prop("checked", true)
                } else {
                    $('#radioInactivo').prop("checked", true)
                }
                $("#dpInicio").attr("value", item.Inicio)
                $("#dpFin").attr("value", item.Final)
                $("#txtObservaciones").val(item.Observaciones)
                
                //vRenglones.forEach($('#chk'+item).prop("checked",true))
               

            }); 
        }
    })
};


function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../SolicitudConstanciaLS/frmSolicitudConstanciaLS.aspx/fObtenerToken",
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
            }

            fObtenerDatosUsuarioSupervisor(vUsuarioActual);
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}


function fObtenerDatosUsuarioSupervisor(vUsuario) {
alert("Logueado Correcto")
}



function fnAbrirModalSolicitud() {
    //$('#cmbPlanAnualW').val($("#cmbPlanAnualW option:first").val());

    const createPromise = () =>
        fnCargarSolicitudPorID(vidSolicitud);

    var promises = [createPromise()];

    Promise.all(promises)
        .then(responses => {
            // console.info(planActual);
            // console.info(proyectoActual);

            //if ((proyectoActual === '0') || (proyectoActual === '')) {
              //  Swal.fire("Suspensiones", "Debe seleccionar un proyecto", "warning");
                //return;
                //$('#cmbProyectoW').val($("#cmbProyectoW option:first").val());
                //  $('#cmbProyectoW').val(ProyectoCodigo);
            //}



            $('#cmbPlanAnualW').prop('disabled', false);
            $('#cmbProyectoW').prop('disabled', false);
            
            $('#txtNombre').prop('disabled', true);
            $('#txtDPI').prop('disabled', true);
            $('#txtNIT').prop('disabled', true);
            $('#txtCorreoElectronico').prop('disabled', true);
            $('#txtTelefono').prop('disabled', true);
            $('#txtUltimoSueldo').prop('disabled', true);
            $('#txtEstado').prop('disabled', true);
            $('#chk021').prop('disabled', true);
            $('#chk022').prop('disabled', true);
            $('#chk029').prop('disabled', true);
            $('#chkSubgrupo18').prop('disabled', true);
            $('#radioActivo').prop('disabled', true);
            $('#radioInactivo').prop('disabled', true);
            $('#cmbTipoServicio').prop('disabled', true);
            $('#txtPuesto').prop('disabled', true);
            $('#dpInicio').prop('disabled', true);
            $('#dpFin').prop('disabled', true);
            $('#txtObservaciones').prop('disabled', true);
            $('#btnAtenderSolicitud').show();
            $('#btnRechazar').show();
            //$('#lblTituloSolicitudConstancia').text("Solicitud de Constancia No. COVIAL-RRHH-###-####");

            $('#winSolicitudConstancia').modal('show');

        });

}