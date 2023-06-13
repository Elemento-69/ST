pAnioID = 0;
pProyecto = 0;
var pAnioSupervisor;
var pSupervisor;
$(document).ready(function () {
    var date = new Date();
    var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
    $("#fechabitacora").val(stringDate);
    fnObtUltimoID();
    const cadena = usuario;
    const regex = /^(\d{4})([a-zA-Z].*)-(\d{3})$/;
    const matches = cadena.match(regex);
    const anio = matches[1]; // 2019
    const programa = matches[2]; // texto
    const pCodigoSupervisor = programa + "-" + matches[3]; // -029
    document.getElementById('AnioproyectoSuper').value = anio;
    document.getElementById('AnioproyectoSuper').disabled = true; 
    document.getElementById('proyectoSuper').value = pCodigoSupervisor;
    document.getElementById('proyectoSuper').disabled = true;
    pAnioSupervisor = anio;
    pSupervisor = pCodigoSupervisor;
    document.getElementById('anioSelect').value = anio;
    document.getElementById('anioSelect').disabled = true;

    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerProgramasSupervisor/${pAnioSupervisor}/${pSupervisor}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.CodigoPrograma}">${item.ProgramaNombre} (${item.CodigoPrograma})</option>`)
            $("#programaSelect").empty().append(cols.join("")).trigger("change")
        }
    })


})
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth(); //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function fnObtUltimoID() {
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerUltimoID/`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {

            Datos = val[0]
            $("#ID").val(Datos.ID);
        }
    })
}
$("select").select2({ theme: "bootstrap" })



$("#programaSelect").on("change", ({ currentTarget }) => {
    
    let pProgramaCodigo = currentTarget.value
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerProyectossSupervisor/${pAnioSupervisor}/${pSupervisor}/${pProgramaCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.Codigo}">${item.ProyectoDescripcion} (${item.Codigo})</option>`)
            $("#proyectoSelect").empty().append(cols.join("")).trigger("change")
        }
    })
})
$("#proyectoSelect").on("change", ({ currentTarget }) => {
   
    let pProyecto = currentTarget.value
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerTramosSupervisor/${pAnioSupervisor}/${pSupervisor}/${pProyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            //let cols = val.map((item) => `<option value="${item.TramoID}">${item.TramoDesc}</option>`)
            let cols = val.map((item) => `<option value="${item.TramoID}">${item.Descripcion}</option>`)
            $("#tramosSelect").empty().append(cols.join("")).trigger("change")

            let anioproyec= $("#anioSelect").val();
            let codigoproyec = $("#proyectoSelect").val();
            $("#proyectocodigo").val(codigoproyec + '-' + anioproyec);
           
        }
    })
})


setTable();
function setTable() {
    $.ajax({
        url: `${urlbase}/api/ActaInicio/ObtenerActaInicio/2022/S-001`,
        success: (val) => {
            let $categoria = $('#actainicio-table tbody')
            $categoria.html(null)
            let options = val.map((val) => `
            <tr class="text-center td-custom">
                <td>${val.CodigoActa}</td>
                <td>${val.AnioProyecto}</td>
.               <td>${val.ProyectoCodigo}</td>
                <td>${val.FechaCreo}</td>
                <td>${val.Estado}</td>
                <td>
                    <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val.AnioProyecto}" data-cert="${val.ProyectoCodigo}"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-eye fa-lg fa-fw"></i>
                    </a>
                    <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val.AnioProyecto}" data-cert="${val.ProyectoCodigo}"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </a>
                    <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val.AnioProyecto}" data-cert="${val.ProyectoCodigo}"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-print fa-lg fa-fw"></i>
                    </a>
                    <a href="#" class="action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" data-id="${val.AnioProyecto}" data-cert="${val.ProyectoCodigo}"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </a>
                </td>
                <td class="spacer bg-light"></td>
            </tr>
        `)
            $categoria.append(options)
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
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
    document.getElementById("TextoVistaPrevia").src = 'data:text/html;charset=utf-8,' + encodeURI(text1 + ' ' + NumActa + '-' + AnioActa + '. ' + text2 + ' ' + HoraActa + ' ' + text3 + ' ' + FechaActa + ', ' + text4 + ' ' + text5 + ' ' + TramosDesc + ' ' + text6 + ' ' + Superintendente + ' ' + text7 + ' ' + Empresa + ' ' + text8 + ' ' + CodigoProyecto + ' - ' + Programa + ' ' + text9 + ' ' + Delegado + ' - ' + text10 + ' ' + EmpresaSuper + ' ' + text11 + ' ' + CodigoSuper + '-' + AnioproyectoSuper + ' ' + text12 + ' <br></br>' + text13 + ' ' + NumContrato + '-' + AnioContrato + '-COV  ' + text14 + ' ' + FechaContrato + ', ' + text15 + ' ' + AcuerdoMinisterial + '-' + AnioAcuerdoMinisterial + ' ' + text16 + ' ' + FechaAcuerdo + ', ' + text17 + ' ' + Representante + ' - ' + PuestoDesc + ' ' + text18 + ' ' + EmpresaSuper + '.</br></br>' + text19 + ' ' + Clausula + ' ' + text20 + ' ' + Tiempo + ' ' + text21 + '</br> </br>' + text22);
});

//Insertar Bitacora del proyecto
$("#btnIngresarActa").on("click", () => {
    var cont = 0;
    let anio = $('#anioSelect').val();
    let Proyecto = $("#proyectoSelect").val();
    let proy = $("#proyectocodigo").val();
    let id = $("#ID").val();
    let codigo = 'CON'+id+'-'+proy;
     let data = {
         "CodigoActa": codigo,
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
		 "UsaurioCreo": usuario,
		 "Eliminada": 0,
		 "Id_Estado": 1
    };
    $.ajax({
        url: `${urlbase}/api/ActaInicio/AgregarActaInicioContratista`,
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
