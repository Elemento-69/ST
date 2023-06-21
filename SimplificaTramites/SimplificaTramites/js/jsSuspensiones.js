
var vIdProyectoSupervisor, vIdAnio, vSuspensionCorrel;
var vProyectoCodigoW = '';
var vBanderaActaSuspCargada = 0, vActaSusCargada = '';
var vBanderaActaReactCargada = 0, vActaReactCargada = '';
var ProyectoCodigo = '';
var planActual = 0, proyectoActual = '';

$(document).ready(function () {
    fnConsultarToken();
    $("select").select2({ theme: "bootstrap" })

    $("#hasta-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })
    $("#desde-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })

    $("#factasuspension-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })

    $("#factareactivacion-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })

    $("#cmbPlanAnual").on("change", ({ currentTarget }) => {
        planActual = currentTarget.value;
        proyectoActual = '';
        $('#cmbProyecto').find("option").remove();
        $('#tableSuspensiones').DataTable().clear().draw();


        $.ajax({
            url: `${urlbase}api/Suspensiones/GetListadoProyectos/${planActual}/${vIdProyectoSupervisor}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },

            success: (val) => {
                if (val.length > 0) {
                    if ((rolConsultas == "ADMINISTRADORES") || (rolConsultas == "ADMINISTRADOR")) {

                        $("#cmbProyecto").append(new Option("[Todos]", "0"));
                    }



                    let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
                    $("#cmbProyecto").append(cols.join(""))
                    $("#cmbProyecto").trigger("change")
                }

            }
        })

    })

    $("#cmbPlanAnualW").on("change", ({ currentTarget }) => {
        plan = currentTarget.value;


        if ((rolConsultas == "ADMINISTRADOR") || (rolConsultas == "REGIONALES")) {
            fnCargarProyectosW(plan, "0", proyectoActual);
        }
        else {
            fnCargarProyectosW(plan, vProyectoCodigo, proyectoActual);
        }


        //fnCargarProyectosW(plan, proyectoActual);
        //$('#cmbProyectoW').find("option").remove();

        //$.ajax({
        //    url: `${urlbase}api/Suspensiones/GetListadoProyectos/${plan}/${vIdProyectoSupervisor}`,
        //    headers: {
        //        "Authorization": "Bearer " + token,
        //        "Content-Type": "application/json",
        //    },

        //    success: (val) => {
        //        if (val.length > 0) {

        //            let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
        //            $("#cmbProyectoW").append(cols.join(""));
        //            $("#cmbProyectoW").val(proyectoActual);
        //            $("#cmbProyectoW").trigger("change");
        //        }

        //    }
        //})

    })

    $("#cmbProyecto").on("change", ({ currentTarget }) => {

        ProyectoCodigo = currentTarget.value;
        proyectoActual = ProyectoCodigo;
        if (ProyectoCodigo != '') {
            ///Carga Suspensiones

            fnCargarSuspensiones(planActual, ProyectoCodigo);

        }

    })

    $("#btnNuevaSuspension").click(function () {
        fnAbrirModalSolicitud();

    })

    $('#btnGuardarSuspension').click(function () {
        fnGuardarSuspension();
    })

    $('#btnEditarSuspension').click(function () {
        fnEditarSuspension();
    })

    //////Subir acta de suspensión

    //$('#fileActaSuspension').change(function () {
    //    alert('subir suspensión');
    //})




    $('#desde').blur(function ({ currentTarget }) {
        var f1 = currentTarget.value;
        var f2 = $('#hasta').val();
        if (f2 != '') {
            var fDias = fnDiasEntreFechas(f1, f2) - 1;
            $('#lblDiasAfectadas').val(fDias);
        }
    })

    $('#hasta').blur(function ({ currentTarget }) {
        var f1 = $('#desde').val();
        var f2 = currentTarget.value;
        if (f1 != '') {
            var fDias = fnDiasEntreFechas(f1, f2) - 1;
            $('#lblDiasAfectadas').val(fDias);
        }
    })
});

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Suspensiones/frmSuspensiones.aspx/fObtenerToken",
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

function fnCargarProyectosW(vAnio, vProyecto, vProyectoSeleccionado) {
    $('#cmbProyectoW').find("option").remove();

    $.ajax({
        url: `${urlbase}api/Suspensiones/GetListadoProyectos/${vAnio}/${vProyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },

        success: (val) => {
            if (val.length > 0) {

                let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
                $("#cmbProyectoW").append(cols.join(""));
                $("#cmbProyectoW").val(vProyectoSeleccionado);
                $("#cmbProyectoW").trigger("change");
            }

        }
    })
}


function fObtenerDatosUsuarioSupervisor(vUsuario) {
    //SE QUEMO PARA PRUEBAS CON USUARIOS SUPERVISORES
    //vIdProyectoSupervisor = 'S-005';
    //rolConsultas = 'ADMINISTRADOR';
    //rolConsultas = 'REGIONALES';

    //////////////////////////////////////////////




    //vIdProyectoSupervisor = '0';
    //rolConsultas = 'ADMINISTRADOR';


    const createPromise = () =>
        fnCargarAnios();


    var promises = [createPromise()];

    Promise.all(promises)
        .then(responses => {

            if ((rolConsultas == "ADMINISTRADOR") || (rolConsultas == "REGIONALES")) {
                vIdProyectoSupervisor = "0";
                $('#cmbProyecto').prop('disabled', false);
                $('#cmbProyectoW').prop('disabled', false);

                //$('#divAprobar').hide();
            }
            else {
                vIdProyectoSupervisor = vUsuario.substr(4, vUsuario.length);
                $('#divAprobar').hide();

                //$('#cmbProyecto').prop('disabled', true);
                //$('#cmbProyectoW').prop('disabled', true);
            }

            if (rolConsultas == "REGIONALES") $('#btnNuevaSuspension').hide();
            else if ((rolConsultas == "ADMINISTRADOR") || (rolConsultas == "SUPERVISOR")) $('#btnNuevaSuspension').show();
        });

}

function fnCargarAnios() {
    $.ajax({
        url: `${urlbase}/api/Suspensiones/GetPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<option value = "${item.AnioID}"> ${item.AnioID}</option>`)

            $("#cmbPlanAnual").append(cols.join(""))
            $("#cmbPlanAnual").trigger("change")

            //$("#cmbPlanAnualW").append(cols.join(""))
            //$("#cmbPlanAnualW").trigger("change")

        }
    })
}

function fnCargarAniosW(vAnioSeleccionado) {
    $.ajax({
        url: `${urlbase}/api/Suspensiones/GetPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#cmbPlanAnualW').find("option").remove();
            let cols = val.map((item) => `<option value = "${item.AnioID}"> ${item.AnioID}</option>`)

            $("#cmbPlanAnualW").append(cols.join(""));
            $("#cmbPlanAnualW").val(vAnioSeleccionado);
            $("#cmbPlanAnualW").trigger("change");

        }
    })
}

function fnInicializaTableSuspensiones() {
    $('#tableSuspensiones').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin suspensiones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ suspensiones",
            "infoEmpty": "Mostrando 0 de 0 de 0 suspensiones",
            "infoFiltered": "(Filtrado de _MAX_ total suspensiones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ suspensiones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay suspensiones encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnMostrarModal(nombreDoc, proyectoCodigo) {
    $('#exampleModal').find('.modal-body').empty();
    var divModal = document.getElementById("dModalBody");
    $('#lblTitulo').text(nombreDoc);
    var vEmbeded = document.createElement("embed");
    vEmbeded.type = "application/pdf";
    vEmbeded.setAttribute("width", "100%");
    vEmbeded.setAttribute("height", "500px");
    vEmbeded.src = '../Suspensiones/Actas/' + proyectoCodigo + '/' + nombreDoc;
    divModal.append(vEmbeded)
    $('#exampleModal').modal('show')
}

function fnAbrirModalSolicitud() {
    //$('#cmbPlanAnualW').val($("#cmbPlanAnualW option:first").val());

    const createPromise = () =>
        fnCargarAniosW(planActual);

    var promises = [createPromise()];

    Promise.all(promises)
        .then(responses => {
           // console.info(planActual);
           // console.info(proyectoActual);

            if ((proyectoActual === '0') || (proyectoActual === '')) {
                Swal.fire("Suspensiones", "Debe seleccionar un proyecto", "warning");
                return;
                //$('#cmbProyectoW').val($("#cmbProyectoW option:first").val());
                //  $('#cmbProyectoW').val(ProyectoCodigo);
            }

            $('#cmbPlanAnualW').prop('disabled', false);
            $('#cmbProyectoW').prop('disabled', false);
            $('#desde').val('');
            $('#hasta').val('');
            $('#lblDiasAfectadas').val('');
            $('#factasuspension').val('');
            $('#factareactivacion').val('');
            $('#txtComentarioArchivoAdjuntar').val('');
            $("#fileActaSuspension").val(null);
            $("#fileActaReactivacion").val(null);
            $('#factasuspensionLoad').text('');
            $('#factareactivacionLoad').text('');
            $('#txtActaReactivacion').val('');
            $('#txtActaSuspension').val('');
            $('#btnGuardarSuspension').show();
            $('#btnEditarSuspension').hide();
            $('#lblTituloSuspension').text("Nueva suspensión");

            $('#winSuspension').modal('show');

        });

}

function fnGuardarSuspension() {


    vAnioID = $('#cmbPlanAnualW').val();
    vProyectoCodigoW = $('#cmbProyectoW').val();
    vFechaDesde = $('#desde').val();
    vFechaDesde = getSubstrings(vFechaDesde, 6, 10) + "-" + getSubstrings(vFechaDesde, 3, 5) + "-" + getSubstrings(vFechaDesde, 0, 2);
    vFechaHasta = $('#hasta').val();
    vFechaHasta = getSubstrings(vFechaHasta, 6, 10) + "-" + getSubstrings(vFechaHasta, 3, 5) + "-" + getSubstrings(vFechaHasta, 0, 2);
    vDiasAfectados = $('#lblDiasAfectadas').val();
    vFechaActaSuspension = $('#factasuspension').val();
    vFechaActaSuspension = getSubstrings(vFechaActaSuspension, 6, 10) + "-" + getSubstrings(vFechaActaSuspension, 3, 5) + "-" + getSubstrings(vFechaActaSuspension, 0, 2);
    vFechaActaReactivacion = $('#factareactivacion').val();
    vFechaActaReactivacion = getSubstrings(vFechaActaReactivacion, 6, 10) + "-" + getSubstrings(vFechaActaReactivacion, 3, 5) + "-" + getSubstrings(vFechaActaReactivacion, 0, 2);
    vObservaciones = $('#txtComentarioArchivoAdjuntar').val();
    vActaSuspension = $('#txtActaSuspension').val();
    vActaReactivacion = $('#txtActaReactivacion').val();
    //if ($('#checkAprobada').is(":checked")) vAprobada = true;
    //else vAprobada = false;
    vAprobada = false;


    if ((vProyectoCodigoW === "") || (vProyectoCodigoW === null)) {
        Swal.fire("", "Debe de seleccionar un proyecto", "warning");
        return;
    };
    if ((vFechaDesde === "--") || ((vFechaHasta === "--"))) {
        Swal.fire("", "Debe de seleccionar una fecha", "warning");
        return;
    };

    if (vFechaActaReactivacion === "--") vFechaActaReactivacion = '01/01/1900';
    if (vFechaActaSuspension === "--") vFechaActaSuspension = '01/01/1900';


    Swal.fire({
        title: "",
        text: "¿Desea crear esta suspensión?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {

                $.LoadingOverlay("show");


                ///Rutina para subir acta de suspensión y reactivación

                fileUpload_asuspension = $("#fileActaSuspension").get(0);
                fileUpload_areactivacion = $("#fileActaReactivacion").get(0);

                var files_suspension = fileUpload_asuspension.files;
                var files_reactivacion = fileUpload_areactivacion.files;
                var nameDoc = '', nameDoc2 = '';

                var obj = new FormData();
                const d = new Date();
                let time = d.getTime();


                /////creando arreglo para acta suspension

                for (var i = 0; i < files_suspension.length; i++) {
                    //nameDoc = time + ".pdf";
                    nameDoc = 'ActaSuspension_' + vAnioID + "_" + vProyectoCodigoW + "_" + time + ".pdf";
                    obj.append("acta_suspension", files_suspension[i], nameDoc);
                }

                /////creando arreglo para acta reactivación

                for (var i = 0; i < files_reactivacion.length; i++) {
                    //nameDoc2 = (time + 50) + ".pdf";
                    nameDoc2 = 'ActaReactivacion_' + vAnioID + "_" + vProyectoCodigoW + "_" + time + 50 + ".pdf";
                    obj.append("acta_reactivacion", files_reactivacion[i], nameDoc2);
                }
                //console.log(nameDoc);
                //console.log(nameDoc2);
                //return;
                const url = urlbase + "api/Suspensiones/Suspensiones";

                var dataJSON = JSON.stringify({
                    Opcion: 1,
                    AnioID: vAnioID,
                    Proyectocodigo: vProyectoCodigoW,
                    SuspensionCorrel: 0,
                    FechaDesde: vFechaDesde,
                    FechaHasta: vFechaHasta,
                    DiasAfectados: vDiasAfectados,
                    ActaSuspension: vActaSuspension,
                    FechaActaSuspension: vFechaActaSuspension,
                    ActaReactivacion: vActaReactivacion,
                    FechaActaReactivacion: vFechaActaReactivacion,
                    Observaciones: vObservaciones,
                    Aprobada: vAprobada,
                    fileActaSuspension: nameDoc,
                    fileActaReactivacion: nameDoc2,
                    Usuario: usuario
                });

                fetch(proxyurl + url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + vToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: dataJSON
                })
                    .then(response => {
                        var estadoRespuesta = response.status;

                        if (estadoRespuesta == 200) {
                            return response.json();
                        }
                        else if (estadoRespuesta == 409) {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                            return;
                        }
                        else if (estadoRespuesta == 401) {
                            fnRefrescarToken(vToken);
                            var interval = setInterval(function () {
                                if (vToken !== '') {
                                    clearInterval(interval)
                                }
                            }, 1000);
                        }
                        else {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                        }
                    })
                    .then(data => {
                        var datos = data;
                        if (datos != undefined) {
                            if (datos !== -1) {
                                //Creo correctamente la suspensión




                                if ((files_suspension.length > 0) || (files_reactivacion.length > 0)) fnSubirActa(obj, vProyectoCodigoW, 1);
                                else {
                                    $.LoadingOverlay("hide");
                                    Swal.fire("", "Suspensión creada con éxito", "success")
                                        .then((result) => {
                                            if (result.isConfirmed) {

                                                $('#winSuspension').modal('hide');
                                                fnCargarSuspensiones(vAnioID, vProyectoCodigoW);
                                            }
                                        });
                                }

                                ////////////////////////////////////////////////

                            }
                        }
                        else {
                            $.LoadingOverlay("hide");
                        }

                    })
                    .catch(function (error) {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    });



            }
        });
}

function fnDiasEntreFechas(f1, f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias + 1;
}

function getSubstrings(vTexto, vInicio, vFin) {
    return vTexto.substring(vInicio, vFin);
}

function fnCargarSuspensiones(plan, ProyectoCodigo) {

    $.ajax({
        url: `${urlbase}api/Suspensiones/GetSuspensiones/${planActual}/${ProyectoCodigo}/0`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {


            if (val.length > 0) {
                $('#tableSuspensiones').dataTable().fnClearTable();
                $('#tableSuspensiones').dataTable().fnDestroy();
                let cols = val.map((item) => `                    
                            ${pC1 = item.SuspensionCorrel + '|' + plan + '|' + ProyectoCodigo}                            
                            <tr>
                                <td class="spacer bg-light" ></td >                             
                                <td  style="width:100px">
                                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                                       data-content="Seleccionar" data-placement="top" onclick="fnWinEditarSuspension(${plan},'${item.ProyectoCodigo}',${item.SuspensionCorrel},${item.Aprobada});" style="cursor:pointer" data-dismiss="modal"  title="Editar suspensión">
                                        <i class="fas fa-edit fa-sm fa-fw"></i>
                                      </button>                                                                        
                                      <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                                       data-content="Seleccionar" data-placement="top" onclick="fnEliminarSuspension(${plan},'${item.ProyectoCodigo}',${item.SuspensionCorrel},${item.Aprobada});" style="cursor:pointer" data-dismiss="modal"  title="Eliminar suspensión">
                                        <i class="fas fa-trash fa-sm fa-fw"></i>
                                     </button>
                                </td>
                                <td style="width:300px">
                                    ${item.ProyectoDescripcion}    
                                </td>
                                <td>
                                    ${moment(item.FechaDesde).format("DD/MM/YYYY")}
                                </td>
                                <td>
                                    ${moment(item.FechaHasta).format("DD/MM/YYYY")}
                                </td>
                                <td style="text-align:center">
                                    ${item.DiasAfectados}
                                </td>
                                <td>
                                    ${item.ActaSuspension}
                                </td>
                                <td>
                                    <a href="#" onclick='fnMostrarModal("${item.fileActaSuspension}","${item.ProyectoCodigo}")' > ${item.fileActaSuspension} </a>
                                </td>
                                <td>
                                    ${item.ActaReactivacion}
                                </td>
                                <td>
                                    <a href="#" onclick='fnMostrarModal("${item.fileActaReactivacion}","${item.ProyectoCodigo}")'  > ${item.fileActaReactivacion} </a>
                                </td>
                                <td style="text-align:center">
                                    ${item.Aprobada ?
                        `<input type="checkbox" id="chkAprobada" checked onchange="fnAprobarSuspension(${planActual},'${item.ProyectoCodigo}',${item.SuspensionCorrel},${item.Aprobada})"/> ` :
                        `<input type="checkbox" id="chkAprobada" onchange="fnAprobarSuspension(${planActual},'${item.ProyectoCodigo}',${item.SuspensionCorrel},${item.Aprobada})"/>`}
                                </td >
                <td class="spacer" ></td>                           
                            </tr >  `);
                $("#tableSuspensiones tbody").html(cols.join(""))
                fnInicializaTableSuspensiones();
                $.LoadingOverlay("hide");
            }
            else {
                $.LoadingOverlay("hide");
                //$("#tableSuspensiones tbody").html("")
                $('#tableSuspensiones').DataTable().clear().draw();
                //fnInicializaTableSuspensiones();
            }
        },
        error: (error) => {
            Swal.fire("", error.message, "error");
        }
    })
}

function fnSubirActa(obj, vProyectoCodigo, opcion) {

    var append = "vModuloViene=5&vTipoArchivo=3&vIdProyecto=" + vProyectoCodigo;
    $.ajax({
        type: "POST",
        url: "../FileUploadHandler.ashx?" + append,
        contentType: false,
        processData: false,
        data: obj,
        success: (res) => OnComplete(res, opcion),
        error: OnFail
    })
}

function OnFail(result) {
    Swal.fire("", result, "error");
}

function OnComplete(result, opcion) {
    var msg = '';
    if (opcion === 1) msg = "Suspensión creada con éxito";
    else msg = "Suspensión editada con éxito"


    $.LoadingOverlay("hide");
    Swal.fire("", msg, "success")
        .then((result) => {
            if (result.isConfirmed) {
                $('#winSuspension').modal('hide');
                fnCargarSuspensiones(vAnioID, vProyectoCodigoW);
            }
        });

}

function fnEliminarSuspension(vAnioID, vProyectoCodigo, vSuspensionID, vEstadoAprobada) {

    if (!vEstadoAprobada) {
        Swal.fire({
            title: "",
            text: "¿Desea eliminar esta suspensión?",
            icon: "warning",
            showDenyButton: true, showCancelButton: false,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    $.LoadingOverlay("show");



                    const url = urlbase + "api/Suspensiones/Suspensiones";

                    var dataJSON = JSON.stringify({
                        Opcion: 3,
                        AnioID: vAnioID,
                        Proyectocodigo: vProyectoCodigo,
                        SuspensionCorrel: vSuspensionID,
                        FechaDesde: '01/01/1900',
                        FechaHasta: '01/01/1900',
                        DiasAfectados: 0,
                        ActaSuspension: '',
                        FechaActaSuspension: '01/01/1900',
                        ActaReactivacion: '',
                        FechaActaReactivacion: '01/01/1900',
                        Observaciones: '',
                        Aprobada: 0,
                        fileActaSuspension: '',
                        fileActaReactivacion: '',
                        Usuario: usuario
                    });

                    fetch(proxyurl + url, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + vToken,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: dataJSON
                    })
                        .then(response => {
                            var estadoRespuesta = response.status;

                            if (estadoRespuesta == 200) {
                                return response.json();
                            }
                            else if (estadoRespuesta == 409) {
                                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                                return;
                            }
                            else if (estadoRespuesta == 401) {
                                fnRefrescarToken(vToken);
                                var interval = setInterval(function () {
                                    if (vToken !== '') {
                                        clearInterval(interval)
                                    }
                                }, 1000);
                            }
                            else {
                                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                            }
                        })
                        .then(data => {
                            var datos = data;
                            if (datos != undefined) {
                                if (datos !== -1) {
                                    $.LoadingOverlay("hide");
                                    Swal.fire("", "Suspensión eliminada con éxito", "success")
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                fnCargarSuspensiones(vAnioID, vProyectoCodigo);

                                            }
                                        });
                                }
                            }
                            else {
                                $.LoadingOverlay("hide");
                            }

                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "error");
                        });
                }
                else {

                }
            })
    }
    else {
        $.LoadingOverlay("hide");
        Swal.fire("", "No se puede eliminar una suspensión aprobada", "warning");
    }
}

function fnWinEditarSuspension(vAnioID, vProyectoCodigo, vSuspensionID, vEstadoAprobada) {
    $('#btnGuardarSuspension').hide();
    $('#btnEditarSuspension').show();
    vSuspensionCorrel = vSuspensionID;
    if (!vEstadoAprobada) {
        $('#lblTituloSuspension').text("Editar suspensión");
        const createPromise = () =>
            fnCargarAniosW(vAnioID);
        var promises = [createPromise()];

        Promise.all(promises)
            .then(responses => {
                $.ajax({
                    url: `${urlbase}api/Suspensiones/GetSuspensiones/${vAnioID}/${vProyectoCodigo}/${vSuspensionID}`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    success: (val) => {

                        if (val.length > 0) {
                            datos = val[0];
                            vProyectoCodigoW = vProyectoCodigo
                            //$('#cmbPlanAnualW').val(vAnioID);

                            if ((rolConsultas == "ADMINISTRADOR") || (rolConsultas == "REGIONALES")) {
                                fnCargarProyectosW(vAnioID, "0", vProyectoCodigo);
                            }
                            else {
                                fnCargarProyectosW(vAnioID, vProyectoCodigo, vProyectoCodigo);
                            }


                            //$('#cmbProyectoW').val(vProyectoCodigo);

                            $('#cmbPlanAnualW').prop('disabled', 'disabled');
                            $('#cmbProyectoW').prop('disabled', 'disabled');
                            $('#desde').val(formatCalendarDate(datos.FechaDesde));
                            $('#hasta').val(formatCalendarDate(datos.FechaHasta));
                            $('#lblDiasAfectadas').val(datos.DiasAfectados);
                            if (datos.FechaActaSuspension != null) $('#factasuspension').val(formatCalendarDate(datos.FechaActaSuspension));
                            else $('#factasuspension').val('');
                            if (datos.FechaActaReactivacion != null) $('#factareactivacion').val(formatCalendarDate(datos.FechaActaReactivacion));
                            else $('#factareactivacion').val('');
                            $('#txtComentarioArchivoAdjuntar').val(datos.Observaciones);
                            $('#txtActaSuspension').val(datos.ActaSuspension);
                            $('#txtActaReactivacion').val(datos.ActaReactivacion);

                            if (datos.ActaSuspension != '') {
                                vActaSusCargada = datos.fileActaSuspension;
                                $("#factasuspensionLoad").html('Acta cargada: ' + vActaSusCargada);
                                vBanderaActaSuspCargada = 0;
                            }
                            else $('#factasuspensionLoad').text('');


                            if (datos.ActaReactivacion != '') {
                                vActaReactCargada = datos.fileActaReactivacion;
                                $("#factareactivacionLoad").html('Acta cargada: ' + vActaReactCargada);
                                vBanderaActaReactCargada = 0;
                            }
                            else $('#factareactivacionLoad').text('');
                            if (datos.Aprobada) $('#checkAprobada').attr('checked', true);
                            else $('#checkAprobada').attr('checked', false);
                            $.LoadingOverlay("hide");



                        }
                        else {
                            $.LoadingOverlay("hide");
                        }
                    },
                    error: (error) => {
                        Swal.fire("", error.message, "error");
                    }
                })



                $('#winSuspension').modal('show');
            });




    }
    else {
        $.LoadingOverlay("hide");
        Swal.fire("", "No se puede editar una suspensión aprobada", "warning");
    }

}


function fnEditarSuspension() {
    vAnioID = $('#cmbPlanAnualW').val();
    vFechaDesde = $('#desde').val();
    vFechaDesde = getSubstrings(vFechaDesde, 6, 10) + "-" + getSubstrings(vFechaDesde, 3, 5) + "-" + getSubstrings(vFechaDesde, 0, 2);
    vFechaHasta = $('#hasta').val();
    vFechaHasta = getSubstrings(vFechaHasta, 6, 10) + "-" + getSubstrings(vFechaHasta, 3, 5) + "-" + getSubstrings(vFechaHasta, 0, 2);
    vDiasAfectados = $('#lblDiasAfectadas').val();
    vFechaActaSuspension = $('#factasuspension').val();
    vFechaActaSuspension = getSubstrings(vFechaActaSuspension, 6, 10) + "-" + getSubstrings(vFechaActaSuspension, 3, 5) + "-" + getSubstrings(vFechaActaSuspension, 0, 2);
    vFechaActaReactivacion = $('#factareactivacion').val();
    vFechaActaReactivacion = getSubstrings(vFechaActaReactivacion, 6, 10) + "-" + getSubstrings(vFechaActaReactivacion, 3, 5) + "-" + getSubstrings(vFechaActaReactivacion, 0, 2);
    vObservaciones = $('#txtComentarioArchivoAdjuntar').val();

    vActaSuspension = $('#txtActaSuspension').val();
    vActaReactivacion = $('#txtActaReactivacion').val();
    if ($('#checkAprobada').is(":checked")) vAprobada = true;
    else vAprobada = false;

    if (vFechaActaReactivacion === "--") vFechaActaReactivacion = '01/01/1900';
    if (vFechaActaSuspension === "--") vFechaActaSuspension = '01/01/1900';


    Swal.fire({
        title: "",
        text: "¿Desea editar la suspensión?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {

                $.LoadingOverlay("show");


                ///Rutina para subir acta de suspensión y reactivación

                fileUpload_asuspension = $("#fileActaSuspension").get(0);
                fileUpload_areactivacion = $("#fileActaReactivacion").get(0);

                var files_suspension = fileUpload_asuspension.files;
                var files_reactivacion = fileUpload_areactivacion.files;
                var nameDoc = '', nameDoc2 = '';

                var obj = new FormData();
                const d = new Date();
                let time = d.getTime();

                /////creando arreglo para acta suspension

                for (var i = 0; i < files_suspension.length; i++) {
                    //nameDoc = time + ".pdf";
                    nameDoc = 'ActaSuspension_' + vAnioID + "_" + vProyectoCodigoW + "_" + time + ".pdf";
                    obj.append("acta_suspension", files_suspension[i], nameDoc);
                    vBanderaActaSuspCargada = 1;
                }

                /////creando arreglo para acta reactivación

                for (var i = 0; i < files_reactivacion.length; i++) {
                    //nameDoc2 = (time + 50) + ".pdf";
                    nameDoc2 = 'ActaReactivacion_' + vAnioID + "_" + vProyectoCodigoW + "_" + (time + 50) + ".pdf";
                    obj.append("acta_reactivacion", files_reactivacion[i], nameDoc2);
                    vBanderaActaReactCargada = 1;
                }

                if (vBanderaActaSuspCargada === 0) nameDoc = vActaSusCargada;
                if (vBanderaActaReactCargada === 0) nameDoc2 = vActaReactCargada;


                const url = urlbase + "api/Suspensiones/Suspensiones";

                var dataJSON = JSON.stringify({
                    Opcion: 2,
                    AnioID: vAnioID,
                    Proyectocodigo: vProyectoCodigoW,
                    SuspensionCorrel: vSuspensionCorrel,
                    FechaDesde: vFechaDesde,
                    FechaHasta: vFechaHasta,
                    DiasAfectados: vDiasAfectados,
                    ActaSuspension: vActaSuspension,
                    FechaActaSuspension: vFechaActaSuspension,
                    ActaReactivacion: vActaReactivacion,
                    FechaActaReactivacion: vFechaActaReactivacion,
                    Observaciones: vObservaciones,
                    Aprobada: vAprobada,
                    fileActaSuspension: nameDoc,
                    fileActaReactivacion: nameDoc2,
                    Usuario: usuario
                });

                fetch(proxyurl + url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + vToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: dataJSON
                })
                    .then(response => {
                        var estadoRespuesta = response.status;

                        if (estadoRespuesta == 200) {
                            return response.json();
                        }
                        else if (estadoRespuesta == 409) {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                            return;
                        }
                        else if (estadoRespuesta == 401) {
                            fnRefrescarToken(vToken);
                            var interval = setInterval(function () {
                                if (vToken !== '') {
                                    clearInterval(interval)
                                }
                            }, 1000);
                        }
                        else {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                        }
                    })
                    .then(data => {
                        var datos = data;
                        if (datos != undefined) {
                            if (datos !== -1) {
                                //Creo correctamente la suspensión




                                if ((files_suspension.length > 0) || (files_reactivacion.length > 0)) fnSubirActa(obj, vProyectoCodigoW, 2);
                                else {
                                    $.LoadingOverlay("hide");
                                    Swal.fire("", "Suspensión editada con éxito", "success")
                                        .then((result) => {
                                            if (result.isConfirmed) {

                                                $('#winSuspension').modal('hide');
                                                fnCargarSuspensiones(vAnioID, vProyectoCodigoW);
                                            }
                                        });
                                }

                                ////////////////////////////////////////////////

                            }
                        }
                        else {
                            $.LoadingOverlay("hide");
                        }

                    })
                    .catch(function (error) {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    });
            }
        });
}

function formatCalendarDate(dateTime) {
    return moment.utc(dateTime).format('DD/MM/YYYY');
};

function fnAprobarSuspension(vAnioID, vProyectoCodigo, vSuspensionCorrel, vEstadoAprobada) {

    if ((rolConsultas === "ADMINISTRADOR") || (rolConsultas === "REGIONALES")) {

        Swal.fire({
            title: "",
            text: "¿Desea cambiar el estado de esta suspensión?",
            icon: "warning",
            showDenyButton: true, showCancelButton: false,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {

                    $.LoadingOverlay("show");


                    const url = urlbase + "api/Suspensiones/AprobarSuspension";

                    var dataJSON = JSON.stringify({
                        AnioID: vAnioID,
                        ProyectoCodigo: vProyectoCodigo,
                        SuspensionCorrel: vSuspensionCorrel,
                        Aprobar: !vEstadoAprobada,
                        Usuario: usuario
                    });

                    fetch(proxyurl + url, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + vToken,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: dataJSON
                    })
                        .then(response => {
                            var estadoRespuesta = response.status;

                            if (estadoRespuesta == 200) {
                                return response.json();
                            }
                            else if (estadoRespuesta == 409) {
                                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                                return;
                            }
                            else if (estadoRespuesta == 401) {
                                fnRefrescarToken(vToken);
                                var interval = setInterval(function () {
                                    if (vToken !== '') {
                                        clearInterval(interval)
                                    }
                                }, 1000);
                            }
                            else {
                                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                            }
                        })
                        .then(data => {
                            var datos = data;
                            if (datos != undefined) {
                                if (datos !== -1) {
                                    $.LoadingOverlay("hide");
                                    Swal.fire("", "Estado cambiado con éxito", "success")
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                fnCargarSuspensiones(vAnioID, vProyectoCodigo);
                                            }
                                        });
                                }
                            }
                            else {
                                $.LoadingOverlay("hide");
                            }

                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "error");
                        });
                }
            });
    }
    else {

        Swal.fire("", "Solo usuarios con rol administrativo y regional pueden cambiar el estado", "warning")
            .then((result) => {
                if (result.isConfirmed) {
                    fnCargarSuspensiones(vAnioID, vProyectoCodigo);
                }
            });
    }

}