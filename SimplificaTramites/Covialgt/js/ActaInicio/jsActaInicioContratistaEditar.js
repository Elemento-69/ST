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
    AnioID = urlParams.get("Anio");
    Proyecto = urlParams.get("Proyecto");
    Programa = urlParams.get("Programa");
    Tramo = urlParams.get("TramoID");
    console.log(Tramo,Programa,Proyecto,AnioID);
    fnModalVerActa(CodigoActa, AnioID, Proyecto)
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

        if (AnioID !== null) {
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
            $("#empresaProyecto").val(Datos.EmpresaProyecto);
            $("#superintendente").val(Datos.Superintendente);
            $("#delegado").val(Datos.DelegadoResidente);
            $("#tiempoProyecto").val(Datos.Tiempo);
            $("#empresaSuper").val(Datos.EmpresaSuper);
            $("#proyectoSuper").val(Datos.CodigoSuper);
            $("#AnioproyectoSuper").val(Datos.AnioSuper);
            $("#representante").val(Datos.Representante);
            //$('select[name=PuestoSelect]').html(Datos.Cargo);
            $("select[name=PuestoSelect] option:first").html(Datos.Cargo);
            //$("#PuestoSelect").html(Datos.Cargo);
            $("#numeroActa").val(Datos.NoActa);
            $("#anioActa").val(Datos.AnioActa);
            $("#horaActa").val(Datos.HoraActa);
            var date = new Date(Datos.FechaActa);
            console.log(date);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechaActa").val(stringDate);
            $("#clausula").val(Datos.Clausula);
            $("#cedulaNotificacion").val(Datos.CedulaNotificacion);
            var date = new Date(Datos.FechaCedula);
            console.log(date);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fechaNotificacion").val(stringDate);
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
$("#btnVistaPreviaEditar").on("click", () => {
    let NumActa = $('#numeroActa').val();
    let AnioActa = $('#anioActa').val();
    let HoraActa = $('#horaActa').val();
    let FechaActa = $('#fechaActa').val();
    let Tramo = $("#tramosSelect").val();
    let TramosDesc = $("#tramosSelect").find('option:selected').text();
    let Superintendente = $("#superintendente").val();
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


    var text1 = '<h2>ACTA</h>';
    var text2 = '<body>Siendo las</body>';
    var text3 = '<body>horas del dia</body>';
    var text4 = '<body>nos encontramos</body>';
    var text5 = '<body>constituidos en</body>';
    var text6 = '<body>las siguientes personas: Ingeniero</body>';
    var text7 = '<body>- Superintendente de la empresa</body>';
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
    document.getElementById("TextoVistaPreviaEditar").src = 'data:text/html;charset=utf-8,' + encodeURI(text1 + ' ' + NumActa + '-' + AnioActa + '. ' + text2 + ' ' + HoraActa + ' ' + text3 + ' ' + FechaActa + ', ' + text4 + ' ' + text5 + ' ' + TramosDesc + ' ' + text6 + ' ' + Superintendente + ' ' + text7 + ' ' + Empresa + ' ' + text8 + ' ' + CodigoProyecto + ' - ' + Programa + ' ' + text9 + ' ' + Delegado + ' - ' + text10 + ' ' + EmpresaSuper + ' ' + text11 + ' ' + CodigoSuper + '-' + AnioproyectoSuper + ' ' + text12 + ' <br></br>' + text13 + ' ' + NumContrato + '-' + AnioContrato + '-COV  ' + text14 + ' ' + FechaContrato + ', ' + text15 + ' ' + AcuerdoMinisterial + '-' + AnioAcuerdoMinisterial + ' ' + text16 + ' ' + FechaAcuerdo + ', ' + text17 + ' ' + Representante + ' - ' + PuestoDesc + ' ' + text18 + ' ' + EmpresaSuper + '.</br></br>' + text19 + ' ' + Clausula + ' ' + text20 + ' ' + Tiempo + ' ' + text21 + '</br> </br>' + text22);
});


//Editar Acta de inicio contratista
$("#btnIngresarActaEditada").on("click", () => {
    let data = {
        "CodigoActa": $("#codigoacta").val(),
        "AnioID": $('#anioSelect').val(),
        "ProgramaCodigo": $("#programaSelect").val(),
        "ProyectoCodigo": $("#proyectoSelect").val(),
        "TramoID": $("#tramosSelect").val(),
        "EmpresaProyecto": $("#empresaProyecto").val(),
        "Superintendente": $("#superintendente").val(),
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
        "CedulaNotificacion": $("#cedulaNotificacion").val(),
        "FechaCedula": $("#fechaNotificacion").val(),
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
        url: `${urlbase}/api/ActaInicio/ActualizarActaInicioContratista`,
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
            Swal.fire("Éxito", "Solicitud EDITADA correctamente", "success").then(function () { $("#ModalVistaPreviaEditar").modal('hide'); window.location.href = "frmActaInicio.aspx"; });
            //let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + Proyecto
            //window.location.href = "frmActaInicio.aspx" + QueryString;

        },
        error: function (response) {
            Swal.fire("Error", "No se ingreso la solicitud", "error")
            return false
        }
    });
});












