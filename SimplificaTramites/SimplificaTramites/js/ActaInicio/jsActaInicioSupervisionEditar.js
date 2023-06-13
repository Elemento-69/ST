pAnioID = 0;
pProyecto = 0;
pPrograma = 0;
pTramo = 0;

var pCodigoSupervisor;
var Proyecto;
var AnioID;
var Programa;
var Tramo;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    CodigoActa = urlParams.get("Codigo");
    AnioID =     urlParams.get("Anio");
    Proyecto =   urlParams.get("Proyecto");
    Programa =   urlParams.get("Programa");
    Tramo =      urlParams.get("TramoID");

    $('#anioSelect').prop('disabled', true);
    $('#proyectoSuper').prop('disabled', true);
    $('#AnioproyectoSuper').prop('disabled', true);

    const cadena = usuario;
    const regex = /^(\d{4})([a-zA-Z].*)-(\d{3})$/;
    const matches = cadena.match(regex);
    const anio = matches[1]; // 2019
    pAnioSupervisor = anio;
    const programa = matches[2]; // texto
    pCodigoSupervisor = programa + "-" + matches[3]; // -029

    fnModalVerActa(CodigoActa, AnioID, Proyecto)
})
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth(); //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

$("select").select2({ theme: "bootstrap" })
$.ajax({
    url: `${urlbase}api/PlanAnual/Get`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
        $("#anioSelect").append(cols.join("")).trigger("change")
        if (pAnioID !== null) {
            $('#anioSelect').val(AnioID);
            $('#anioSelect').trigger("change")
        }
    }
})
$("#anioSelect").on("change", ({ currentTarget }) => {

    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerProgramasSupervisor/${AnioID}/${pCodigoSupervisor}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.CodigoPrograma}">${item.ProgramaNombre} (${item.CodigoPrograma})</option>`)
            $("#programaSelect").empty().append(cols.join("")).trigger("change")

            if (Programa !== null) {
                $('#programaSelect').val(Programa);
                $('#programaSelect').trigger("change")
            }
        }
    })
})

$("#programaSelect").on("change", ({ currentTarget }) => {

    let pProgramaCodigo = currentTarget.value

    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerProyectossSupervisor/${AnioID}/${pCodigoSupervisor}/${pProgramaCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.Codigo}">${item.ProyectoDescripcion}</option>`)
            $("#proyectoSelect").empty().append(cols.join("")).trigger("change")

            if (Proyecto !== null) {
                $('#proyectoSelect').val(Proyecto);
                $('#proyectoSelect').trigger("change")
            }
        }
    })
})

$("#proyectoSelect").on("change", ({ currentTarget }) => {

    let pProyecto = currentTarget.value;

    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerTramosSupervisor/${AnioID}/${pCodigoSupervisor}/${pProyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.TramoID}">${item.Descripcion}</option>`)
            $("#tramosSelect").empty().append(cols.join("")).trigger("change");
            //let anioproyec= $("#anioSelect").val();
            //let codigoproyec = $("#proyectoSelect").val();
            //$("#proyectocodigo").val(codigoproyec + '-' + anioproyec);
            if (Tramo !== null) {
                $('#tramosSelect').val(Tramo);
                $('#tramosSelect').trigger("change")
            }
        }
    })
})


function fnModalVerActa(CodigoActa, AnioID, Proyecto) {
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerActaInicioPresentadasXcodigo/${CodigoActa}/${AnioID}/${Proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            Datos = val[0];
            $("#codigoacta").val(Datos.CodigoActa);
            $("#anioSelect").val(Datos.AnioID).change();
            $("#programaSelect").val(Datos.ProgramaCodigo).change();
            $("#proyectoSelect").val(Datos.ProyectoCodigo).change();
            $("#tramosSelect").val(Datos.TramoID).change();
            $("#regional").val(Datos.Regional);
            $("#delegado").val(Datos.DelegadoResidente);
            $("#tiempoProyecto").val(Datos.Tiempo);
            $("#empresaSuper").val(Datos.EmpresaSuper);
            $("#proyectoSuper").val(Datos.CodigoSuper);
            $("#AnioproyectoSuper").val(Datos.AnioSuper);
            $("#representante").val(Datos.Representante);
            $("select[name=PuestoSelect] option:first").html(Datos.Cargo);
            $("#numeroActa").val(Datos.NoActa);
            $("#anioActa").val(Datos.AnioActa);
            $("#horaActa").val(Datos.HoraActa);
            var date = new Date(Datos.FechaActa);
            console.log(date);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechaActa").val(stringDate);
            $("#clausula").val(Datos.Clausula);
            $("#numeroContrato").val(Datos.NoContrato);
            $("#anioContrato").val(Datos.AnioContrato);
            var date = new Date(Datos.FechaContrato);
            console.log(date);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechaContrato").val(stringDate);
            $("#numeroAcuerdo").val(Datos.NoAcuerdo);
            $("#AnioAcuerdo").val(Datos.AnioAcuerdo);
            var date = new Date(Datos.FechaAcuerdo);
            console.log(date);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechaAcuerdo").val(stringDate);
        }
    })
}
$("#btnVistaPrevia").on("click", () => {
    let NumActa = $('#numeroActa').val();
    let AnioActa = $('#anioActa').val();
    let HoraActa = $('#horaActa').val();
    let FechaActa = $('#fechaActa').val();
    let Tramo = $("#tramosSelect").val();
    let TramosDesc = $("#tramosSelect").find('option:selected').text();
    let Empresa = $("#empresaProyecto").val();
    let CodigoProyecto = $("#proyectocodigo").val();
    let Programa = 'MANTENIMIENTO RUTINARIO DE LA RED VIAL PAVIMENTADA';
    let ProgramaCodigo = $("#programaSelect").val();
    let Delegado = $("#delegado").val();
    let EmpresaSuper = $("#empresaSuper").val();
    let CodigoSuper = $("#proyectoSuper").val();
    let AnioproyectoSuper = $("#AnioproyectoSuper").val();
    let NumContrato = $("#numeroContrato").val();
    let AnioContrato = $("#anioContrato").val();
    let FechaContrato = $("#fechaContrato").val();
    let AcuerdoMinisterial = $("#numeroAcuerdo").val();
    let AnioAcuerdoMinisterial = $("#AnioAcuerdo").val();
    let FechaAcuerdo = $("#fechaAcuerdo").val();
    let Representante = $("#representante").val();
    let Puesto = $("#PuestoSelect").val();
    let PuestoDesc = $("#PuestoSelect").find('option:selected').text();
    let Clausula = $("#clausula").val();
    let Tiempo = $('#tiempoProyecto').val();
    let Regional = $('#regional').val();

    var text1 = '<h2>ACTA</h>';
    var text2 = '<body>Siendo las</body>';
    var text3 = '<body>horas del dia</body>';
    var text4 = '<body>nos encontramos</body>';
    var text5 = '<body>constituidos en</body>';
    var text6 = '<body>las siguientes personas: Ingeniero</body>';
    var text7 = '<body>y el ingeniero</body>';
    var text8 = '<body>del proyecto identificado</body>';
    var text9 = '<body>y el Ingeniero</body>';
    var text10 = '<body>Delegado Residente de la empresa</body>';
    var text11 = '<body>del proyecto de supervisión</body>';
    var text12 = '<body>para hacer constar lo siguiente:</body>';
    var text13 = '<body>PRIMERO: Se tiene a la vista el Contrato Administrativo No.</body>';
    var text14 = '<body>de fecha</body>';
    var text15 = '<body>y Acuerdo Ministerial</body>';
    var text16 = '<body>de fecha</body>';
    var text17 = '<body>contrato suscrito entre el Ingeniero Mario Gustavo Aguilar Alemán en delegación del señor Ministro del Ministerio de Comunicaciones, Infraestructura y Vivienda y el señor</body>';
    var text18 = '<body>de la empresa</body>';
    var text19 = '<body>SEGUNDO: Según lo establecido en la cláusula</body>';
    var text20 = '<body>del referido contrato administrativo, se deja constancia que se da inicio al plazo contractual de';
    var text21 = '<body>MESES, a partir del día de hoy.';
    var text22 = '<body>TERCERO: No habiendo más que hacer constar, se da por finalizada en el mismo lugar y fecha, la que es leída por cada una de las partes quedando enterados de la misma, de su objeto, validez y demás alcances y efectos legales, la ratifican, aceptan y firman de entera conformidad.</body>';
    var text23 = '<body>- Supervisor Regional de Control y Seguimiento de la Unidad Ejecutora de Conservación Vial -COVIAL-';
    document.getElementById("TextoVistaPrevia").src = 'data:text/html;charset=utf-8,' + encodeURI(text1 + ' ' + NumActa + '-' + AnioActa + '. ' + text2 + ' ' + HoraActa + ' ' + text3 + ' ' + FechaActa + ', ' + text4 + ' ' + text5 + ' ' + TramosDesc + ' ' + text6 + ' ' + Delegado + ' - ' + text10 + ' ' + EmpresaSuper + ' ' + text11 + ' ' + CodigoSuper + '-' + AnioproyectoSuper + ' ' + text7 + ' ' + Regional + ' ' + text23 + ' ' + text12 + ' <br></br>' + text13 + ' ' + NumContrato + '-' + AnioContrato + '-COV  ' + text14 + ' ' + FechaContrato + ', ' + text15 + ' ' + AcuerdoMinisterial + '-' + AnioAcuerdoMinisterial + ' ' + text16 + ' ' + FechaAcuerdo + ', ' + text17 + ' ' + Representante + ' - ' + PuestoDesc + ' ' + text18 + ' ' + EmpresaSuper + '.</br></br>' + text19 + ' ' + Clausula + ' ' + text20 + ' ' + Tiempo + ' ' + text21 + '</br> </br>' + text22);
});

//Insertar Bitacora del proyecto
$("#btnIngresarActaSuperEditada").on("click", () => {
    let data = {
        "CodigoActa": $("#codigoacta").val(),
        "AnioID": $("#AnioproyectoSuper").val(),
        "ProgramaCodigo": $("#programaSelect").val(),
        "ProyectoCodigo": $("#proyectoSuper").val(),
        "TramoID": $("#tramosSelect").val(),
        "Regional": $('#regional').val(),
		"DelegadoResidente": $("#delegado").val(),
		"Tiempo": $('#tiempoProyecto').val(),
        "EmpresaSuper": $("#empresaSuper").val(),
        "CodigoSuper": $("#proyectoSuper").val(),
        "AnioSuper": $("#AnioproyectoSuper").val(),
        "Representante": $("#representante").val(),
        "Id_Cargo": $("#PuestoSelect").val(),
        "NoActa": $('#numeroActa').val(),
        "AnioActa": $('#anioActa').val(),
        "HoraActa": $('#horaActa').val(),
        "FechaActa": $('#fechaActa').val(),
        "Clausula": $("#clausula").val(),
        "NoContrato": $("#numeroContrato").val(),
        "AnioContrato": $("#anioContrato").val(),
        "FechaContrato": $("#fechaContrato").val(),
        "NoAcuerdo": $("#numeroAcuerdo").val(),
        "AnioAcuerdo": $("#AnioAcuerdo").val(),
        "FechaAcuerdo": $("#fechaAcuerdo").val(),
        "UsaurioModifico": usuario,
        "Id_Estado": 1  
    };
    $.ajax({
        url: `${urlbase}/api/ActaInicio/ActualizarActaInicioSupervisora`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Solicitud creada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Solicitud creada correctamente", "success").then(function () { $("#ModalVistaPrevia").modal('hide'); window.location.href = "frmActaInicio.aspx"; });
            //let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + Proyecto
            //window.location.href = "frmActaInicio.aspx" + QueryString;
            
        },
        error: function (response) {
            Swal.fire("Error", "No se ingreso la solicitud", "error")
            return false
        }
    });
});

function fnCargaInicialComentario(pIdBitacora) {

    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            title: '',
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                   <button type="button" class="action-icon btn hover-blue btn-editarcomentario" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top"  style="cursor:pointer" onclick="fnCargarDatosComentarioParaEditar('${row.IdComentarioBitacora}', '${row.IdBitacora}' )" title="Editar Comentario">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    
                    <button type="button" class="action-icon hover-blue btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar" data-placement="top" style="cursor:pointer"  onclick="fnEliminarComentario('${row.IdBitacora}', '${row.IdComentarioBitacora}')" title="Eliminar Bitacora">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    `
            }
        },
        //{
        //    className: 'text-center',
        //    title: "Bitacora",
        //    data: 'IdBitacora'
        //},
        //{
        //    className: 'text-center',
        //    title: "Comentario",
        //    data: 'IdComentarioBitacora'
        //},
        {

            className: 'text-center',
            title: "Fecha Creo",
            data: 'FechaCreo'
        },
        //{
        //    className: 'text-center style="font-size: 50%"',
        //    title: "DescripcionComentario",
        //    data: 'DescripcionComentario'
        //},
        {

            //targets: 4,
            title: "Descripcion Comentario",
            data: "DescripcionComentario",
            render: function (data) {
                return data.substr(0, 400) + '...';
            }

        },
        {
            className: 'text-center',
            title: "Usuario Creo",
            data: 'UsuarioCreo'
        },
        {
            className: 'text-center',
            title: "Fecha Modifico",
            data: 'FechaModifico'
        },

        {
            className: 'text-center',
            title: "Usuario Modifico",
            data: 'UsuarioModifico'
        },
        {
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[1, "desc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
            //$(row).className('altoclase');
        },
        sdrawCallback: () => {
            initMasks('table')
        },
    }
    $("#cometario-table").dataTable(generateDataTableFilter(columns, extra, `${urlbase}api/BitacoraPorProyectos/GetDatosDeComentariosBitacora`, pIdBitacora))

}
//Mostrar modal
$("#btnModalBitacora").on("click", () => {

    let proy = $("#proyectoSelect").val();
    let anio = $("#anioSelect").val();
    let proyanio = proy + '-' + anio
    $("#proyecto-bitacora").val(proyanio);
    enableEditModel();
    $("#ModalBitacoraProyectos").modal("show");
});

//Insertar Bitacora del proyecto
$("#btnIngresarBitacora").on("click", () => {
    var Descripcion = $("#DescripcionBitacora").contents().find('body').html();
    var body = Descripcion.replace(/<!--.*?-->/sg, "");
    console.log(body);
    let pAnioID = $('#anioSelect').val();
    let pProyecto = $('#proyectoSelect').val();
    let data = {
        "AnioID": $('#anioSelect').val(),
        "ProyectoCodigo": $('#proyectoSelect').val(),
        "FechaBitacora": $("#fechabitacora").val(),
        "DescripcionBitacora": body,
        "Eliminado": 0,
        "UsuarioCreo": usuario,
        "UsuarioModifico": "",
        "FechaModifico": "",
        "UsuarioElimino": "",
        "FechaElimino": "",
    };
    $.ajax({
        url: `${urlbase}/api/BitacoraPorProyectos/AgregarBitacoraPorProyectos`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Bitacora insertada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Bitacora del proyecto creada correctamente", "success").then(function () { $("#ModalBitacoraProyectos").modal('hide'); });
            fnCargaInicial(pAnioID, pProyecto);
            LimpiarCampos();

        },
        error: function (response) {
            Swal.fire("Error", "No se ingreso la bitacora", "error")
            return false
        }
    });
});

//Insertar Comentario a la Bitacora 
$("#btnComentarioGuardar").on("click", () => {
    var Descripcion = $("#DescripcionBitacoraCom").contents().find('body').html();
    var body = Descripcion.replace(/<!--.*?-->/sg, "");

    var bitacora = $("#idBitacora").val();
    let data = {
        "IdBitacora": bitacora,
        "UsuarioCreo": usuario,
        "DescripcionComentario": body,
        "Eliminado": 0,
        "UsuarioModifico": "",
        "FechaModifico": "",
        "UsuarioElimino": "",
        "FechaElimino": "",
    };
    $.ajax({
        url: `${urlbase}/api/BitacoraPorProyectos/AgregarComentarioBitacora`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Comentario insertado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Comentario en la Bitácora creada correctamente", "success");
            document.getElementById("contenedorcomentario").style.display = 'none';
            fnCargaInicialComentario(bitacora);
            LimpiarCamposComentario();
        },
        error: function (response) {
            Swal.fire("Error", "No se ingreso la bitacora", "error")
            return false
        }
    });
});

function fnCargarDatos(Bitacora, AnioID, Proyecto) {
    $.ajax({
        url: `${urlbase}api/BitacoraPorProyectos/GetDatosDeBitacoraProyecto/${Bitacora}/${AnioID}/${Proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {

            Datos = val[0]
            $("#idBitacora").val(Datos.IdBitacora);
            let proy = Datos.ProyectoCodigo;
            let anio = Datos.AnioID;
            let proyanio = proy + '-' + anio
            $("#proyecto-bitacoraAct").val(proyanio);
            let descrip = Datos.DescripcionBitacora;
            $("#DescripcionBitacoraAct").contents().find('body').html(descrip);
            var date = new Date(Datos.FechaBitacora);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechabitacoraAct").val(stringDate);
            enableEditModelAct();
            $("#ModalBitacoraProyectosAct").modal("show");
        }
    })
}

function fnCargarDatosComentarioParaEditar(IdComentario, IdBitacora) {
    $.ajax({
        url: `${urlbase}api/BitacoraPorProyectos/GetDatosDeComentarios/${IdComentario}/${IdBitacora}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {

            Datos = val[0]

            $("#idBitacoraComAct").val(IdBitacora);
            $("#idComentarioComAct").val(IdComentario);
            let descrip = Datos.DescripcionComentario;
            var body = descrip.replace(/<!--.*?-->/sg, "");
            $("#DescripcionBitacoraComAct").contents().find('body').html(body);
            document.getElementById("contenedorcomentarioAct").style.display = 'block';
            document.getElementById("contenedorcomentario").style.display = 'none';
            enableEditModelComAct();
        }
    })

}
//Editar comentario
$("#btnComentarioGuardarAct").on("click", () => {
    var Descripcion = $("#DescripcionBitacoraComAct").contents().find('body').html();
    var body = Descripcion.replace(/<!--.*?-->/sg, "");
    let bitacora = $("#idBitacoraComAct").val();
    let comentario = $("#idComentarioComAct").val();
    let data = {
        "IdComentarioBitacora": comentario,
        "IdBitacora": bitacora,
        "DescripcionComentario": body,
        "UsuarioModifico": usuario
    };
    $.ajax({
        url: `${urlbase}/api/BitacoraPorProyectos/ActualizarComentarioBitacora`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Comentario de la bitácora actualizada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Comentario de la Bitácora actualizada correctamente", "success");
            fnCargaInicialComentario(bitacora);
            document.getElementById("contenedorcomentarioAct").style.display = 'none';
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo el comentario.", "error")
            return false
        }
    });
});

//Eliminar un bitacora por proyecto
function fnEliminarComentario(IdBitacora, IdComentarioBitacora) {
    console.log(IdBitacora, IdComentarioBitacora);
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el comentario?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/BitacoraPorProyectos/EliminarComentarioBitacora`,
                    method: "post",
                    data: JSON.stringify({
                        "IdBitacora": IdBitacora,
                        "IdComentarioBitacora": IdComentarioBitacora,
                        "Eliminado": true,
                        "UsuarioElimino": usuario
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Comentario elimado correctamente", "success");
                        fnCargaInicialComentario(IdBitacora);
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}

function fnCargarDatosDetalle(Bitacora, AnioID, Proyecto) {
    $.ajax({
        url: `${urlbase}api/BitacoraPorProyectos/GetDatosDeBitacoraProyecto/${Bitacora}/${AnioID}/${Proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {

            Datos = val[0]
            let IdBitacora = Datos.IdBitacora;
            $("#idBitacora").val(Datos.IdBitacora);
            let proy = Datos.ProyectoCodigo;
            let anio = Datos.AnioID;
            let proyanio = proy + '-' + anio
            $("#proyecto-bitacoraComentar").val(proyanio);
            let contenido = Datos.DescripcionBitacora;
            $("#DescripcionBitacoraComentar").contents().find('body').html(contenido);
            var date = new Date(Datos.FechaBitacora);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechabitacoraComentar").val(stringDate);
            enableEditModelCom();
            $("#ModalBitacoraProyectosComentar").modal("show");
            fnCargaInicialComentario(IdBitacora);
            document.getElementById("contenedorcomentario").style.display = 'none';
        }
    })
}

$("#btnComentarBitacoraProyecto").on("click", () => {
    document.getElementById("contenedorcomentario").style.display = 'block';
})
$("#btnComentarioCancelar").on("click", () => {
    document.getElementById("contenedorcomentario").style.display = 'none';
})
$("#btnComentarioCancelarAct").on("click", () => {
    document.getElementById("contenedorcomentarioAct").style.display = 'none';
})

$("#btnActualizarBitacoraProyecto").on("click", () => {
    let AnioID = $('#anioSelect').val();
    let Proyecto = $('#proyectoSelect').val();
    var Descripcion = $("#DescripcionBitacoraAct").contents().find('body').html();

    let data = {
        "idBitacora": $('#idBitacora').val(),
        "AnioID": $('#anioSelect').val(),
        "ProyectoCodigo": $('#proyectoSelect').val(),
        "FechaBitacora": $("#fechabitacoraAct").val(),
        "DescripcionBitacora": Descripcion,
        "UsuarioModifico": usuario
    };
    $.ajax({
        url: `${urlbase}/api/BitacoraPorProyectos/ActualizarBitacoraPorProyecto `,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Bitácora del proyecto actualizada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Bitácora del proyecto actualizada correctamente", "success").then(function () { $("#ModalBitacoraProyectosAct").modal('hide'); });
            fnCargaInicial(AnioID, Proyecto);
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo la bitacáora.", "error")
            return false
        }
    });
});

//Eliminar un bitacora por proyecto
function fnEliminarBitacora(Bitacora, AnioID, Proyecto) {
    let pAnioID = $('#anioSelect').val();
    let pProyecto = $('#proyectoSelect').val();
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el el registro de la bitácora?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/BitacoraPorProyectos/EliminarBitacoraPorProyecto`,
                    method: "post",
                    data: JSON.stringify({
                        "IdBitacora": Bitacora,
                        "AnioID": AnioID,
                        "ProyectoCodigo": Proyecto,
                        "UsuarioElimino": usuario,
                        "Eliminado": true
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Bitácora elimada correctamente", "success");
                        fnCargaInicial(pAnioID, pProyecto);
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}
function LimpiarCampos() {
    //var Descripcion = $("#DescripcionBitacora").contents().find('body').html();
    //var body = Descripcion.replace("");
    //$("#DescripcionBitacora").contents().find('body').html(body);
    var my_content = document.getElementById('DescripcionBitacora').contentWindow.document;
    my_content.body.innerHTML = ""; //Chrome, IE
    my_content.write(new_content);
}

function LimpiarCamposComentario() {
    var Descripcion = $("#DescripcionBitacoraCom").contents().find('body').html();
    var body = Descripcion.replace("");
    $("#DescripcionBitacoraCom").contents().find('body').html(body);

}

$("#btnNegritassssss").on("click", () => {
    console.log("Entro");
    document.getElementById("DescripcionBitacora").style.fontWeight = "bold";
});
$("#btnItalica").on("click", () => {
    document.getElementById("DescripcionBitacora").style.fontStyle = "italic";
});
$("#btnSubrayado").on("click", () => {
    document.getElementById("DescripcionBitacora").style.textDecoration = "underline";
});

function enableEditModel() {
    DescripcionBitacora.document.designMode = 'On';
}
function execCmd(command) {
    DescripcionBitacora.document.execCommand(command, false, null);
}
function execCommandWithArg(command, arg) {
    DescripcionBitacora.document.execCommand(command, false, arg);
}

var showingSourceCode = false;
var isInEditMode = true;

function toggleSource() {
    if (showingSourceCode) {
        DescripcionBitacora.document.getElementsByTagName('body')[0].innerHTML = DescripcionBitacora.document.getElementsByTagName('body')[0].textContent;
        showingSourceCode = false;
    } else {
        DescripcionBitacora.document.getElementsByTagName('body')[0].textContent = DescripcionBitacora.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCode = true;
    }
}

function toggleEdit() {
    if (isInEditMode) {
        DescripcionBitacora.document.designMode = 'Off';
        isInEditMode = false;
    } else {
        DescripcionBitacora.document.designMode = 'On';
        isInEditMode = true;
    }

}

//Funciones Actualizar Bitácora
function enableEditModelAct() {
    DescripcionBitacoraAct.document.designMode = 'On';
}
function execCmdAct(command) {
    DescripcionBitacoraAct.document.execCommand(command, false, null);
}
function execCommandWithArgAct(command, arg) {
    DescripcionBitacoraAct.document.execCommand(command, false, arg);
}
var showingSourceCodeAct = false;
var isInEditModeAct = true;

function toggleSourceAct() {
    if (showingSourceCodeAct) {
        DescripcionBitacoraAct.document.getElementsByTagName('body')[0].innerHTML = DescripcionBitacoraAct.document.getElementsByTagName('body')[0].textContent;
        showingSourceCodeAct = false;
    } else {
        DescripcionBitacoraAct.document.getElementsByTagName('body')[0].textContent = DescripcionBitacoraAct.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCodeAct = true;
    }
}
function toggleEditAct() {
    if (isInEditModeAct) {
        DescripcionBitacoraAct.document.designMode = 'Off';
        isInEditModeAct = false;
    } else {
        DescripcionBitacoraAct.document.designMode = 'On';
        isInEditModeAct = true;
    }

}

//Funciones comentario Bitácora
function enableEditModelCom() {
    DescripcionBitacoraCom.document.designMode = 'On';
}
function execCmdCom(command) {
    DescripcionBitacoraCom.document.execCommand(command, false, null);
}
function execCommandWithArgCom(command, arg) {
    DescripcionBitacoraCom.document.execCommand(command, false, arg);
}
var showingSourceCodeCom = false;
var isInEditModeCom = true;

function toggleSourceCom() {
    if (showingSourceCodeCom) {
        DescripcionBitacoraCom.document.getElementsByTagName('body')[0].innerHTML = DescripcionBitacoraCom.document.getElementsByTagName('body')[0].textContent;
        showingSourceCodeCom = false;
    } else {
        DescripcionBitacoraCom.document.getElementsByTagName('body')[0].textContent = DescripcionBitacoraCom.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCodeCom = true;
    }
}
function toggleEditCom() {
    if (isInEditModeCom) {
        DescripcionBitacoraCom.document.designMode = 'Off';
        isInEditModeCom = false;
    } else {
        DescripcionBitacoraCom.document.designMode = 'On';
        isInEditModeCom = true;
    }
}

//Funciones actualizar comentario Bitácora
function enableEditModelComAct() {
    DescripcionBitacoraComAct.document.designMode = 'On';
}
function execCmdComAct(command) {
    DescripcionBitacoraComAct.document.execCommand(command, false, null);
}
function execCommandWithArgComAct(command, arg) {
    DescripcionBitacoraComAct.document.execCommand(command, false, arg);
}
var showingSourceCodeComAct = false;
var isInEditModeComAct = true;

function toggleSourceComAct() {
    if (showingSourceCodeComAct) {
        DescripcionBitacoraComAct.document.getElementsByTagName('body')[0].innerHTML = DescripcionBitacoraComAct.document.getElementsByTagName('body')[0].textContent;
        showingSourceCodeComAct = false;
    } else {
        DescripcionBitacoraComAct.document.getElementsByTagName('body')[0].textContent = DescripcionBitacoraComAct.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCodeComAct = true;
    }
}
function toggleEditComAct() {
    if (isInEditModeComAct) {
        DescripcionBitacoraComAct.document.designMode = 'Off';
        isInEditModeComAct = false;
    } else {
        DescripcionBitacoraComAct.document.designMode = 'On';
        isInEditModeComAct = true;
    }
}