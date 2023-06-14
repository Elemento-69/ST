var vidEstado;
var vParametroBusqueda;

$(document).ready(function () {
    fnConsultarToken();
    
    fnCargarEstados();
    fnCargarSolicitudes(0);

    $("#tblSolicitudesRecibidas").on("click", "tr", function ()  {
        var vid= $("#tblSolicitudesRecibidas").DataTable().row(this).id();
        alert('click on  ' + vid)

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
            url: `${urlbase}ObtEstadoCL`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },

            success: (val) => {
                console.log(val)
                fnCargarSolicitudes(vidEstado)
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

    })
});


function fnCargarSolicitudes(idEstado) {

    $.ajax({
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
            "emptyTable": "Sin suspensiones para mostrar",
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
