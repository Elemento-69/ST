pAnioID = 0;
pProyecto = 0;
var CodSupervisor;
var PanioProyecto;
var PproyectoCod;
var PAnioSuper;
$(document).ready(function () {
    var date = new Date();
    var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
    $("#fechabitacora").val(stringDate);
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
    }
})
$("#anioSelect").on("change", ({ currentTarget }) => {
    let pAnioID = currentTarget.value
    PanioProyecto = pAnioID;
    $.ajax({
        url: `${urlbase}api/Programa/Get/${pAnioID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
            $("#programaSelect").empty().append(cols.join("")).trigger("change")
        }
    })
})


$("#programaSelect").on("change", ({ currentTarget }) => {
    let pAnioID = $('#anioSelect').val()
    let pProgramaCodigo = currentTarget.value
    $.ajax({
        url: `${urlbase}api/Proyecto/GetListadoXPrograma/${pAnioID}/${pProgramaCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {

            PanioProyecto = $("#anioSelect").val();
            setTable(PanioProyecto, pProgramaCodigo);

            //let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
            //$("#proyectoSelect").empty().append(cols.join("")).trigger("change")
            
        }
    })
})


/*
$("#proyectoSelect").on("change", ({ currentTarget }) => {
    let anioproyec = $("#anioSelect").val();
    let codigoproyec = $("#proyectoSelect").val();
    PproyectoCod = codigoproyec;
    PanioProyecto = anioproyec;
    setTable(anioproyec, codigoproyec);
    
})
*/


function setTable(anioproyec, ProgramaCodigo) {
    $.ajax({
        url: `${urlbase}/api/ActaInicio/ObtenerActaInicioPresentadas/${anioproyec}/${ProgramaCodigo}`,
        success: (val) => {
            let $categoria = $('#validaractainicio-table tbody')
            $categoria.html(null)
            let options = val.map((val) => `
            <tr id="${val.CodigoActa}" class="text-center">
                <td class="spacer bg-light"></td>
                <td>${val.CodigoActa}</td>
                <td>${val.AnioID}</td>
.               <td>${val.ProyectoCodigo}</td>
                <td>${val.FechaCreo || ''}</td>
                <td>${val.FechaModifico || ''}</td>
                <td>${val.Id_Estado}</td>
                <td>
                    <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover"  onclick="fnModal('${val.CodigoActa}', '${val.AnioID}', '${val.ProyectoCodigo}')"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-eye fa-lg fa-fw"></i>
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

//aprobar acta de inicio
$("#btnIngresar").on("click", (event) => {
    event.preventDefault(); // Evita que la página se recargue
    let CodigoActa = $("#CodActa").val();
    let data = {
        "CodigoActa": $("#CodActa").val(),
        "AnioID": $("#AnioActa").val(),
        "ProyectoCodigo": $("#ProyectoActa").val(),
        "Supervisor": CodSupervisor,
        "AnioSupervisor": PAnioSuper,
        "UsaurioModifico": usuario
    };
    $.ajax({
        url: `${urlbase}/api/ActaInicio/AprobarActaInicio`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Acta aprobada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Solicitud APROBADA correctamente", "success").then(function () { $("#ModalRevisarActa").modal('hide'); eliminarFila(CodigoActa) }); //
            //let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + Proyecto
            //window.location.href = "frmActaInicio.aspx" + QueryString;

        },
        error: function (response) {
            Swal.fire("Error", "No se aprobo la solicitud", "error")
            console.log(response)
            return false
        }
    });
});



//Insertar Bitacora del proyecto
$("#btnIngresarActa").on("click", () => {

    let anio = $('#anioSelect').val();
    let Proyecto = $("#proyectoSelect").val();
    let proy = $("#proyectocodigo").val();
    let codigo = 'CON-'+proy;
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
            Swal.fire("Éxito", "Solicitud creada correctamente", "success").then(function () { $("#ModalVistaPrevia").modal('hide'); window.location.href = "frmValidarActaInicio.aspx";  });
            //let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + Proyecto
            //window.location.href = "frmActaInicio.aspx" + QueryString;
            
        },
        error: function (response) {
            Swal.fire("Error", "No se ingreso la solicitud", "error")
            
            return false
        }
    });
});

function fnModal(anio) {
    let anios = anio;
    console.log(anios);
    $("#ModalRevisarActa").modal("show");
}

$("#btnRechazarActa").on("click", () => {
    document.getElementById("contenedorobservaciones").style.display = 'block';
    //document.getElementById("contenedorbtnobservaciones").style.display = 'block';
})
$("#btncancelar").on("click", () => {
    document.getElementById("contenedorobservaciones").style.display = 'none';
    //document.getElementById("contenedorbtnobservaciones").style.display = 'block';
})

$("#btnCancelarObservacion").on("click", () => {
    document.getElementById("contenedorobservaciones").style.display = 'none';
    //document.getElementById("contenedorbtnobservaciones").style.display = 'block';
})


//Rechazar Acta
$("#btnAgregarObservacion").on("click", (event) => {
    event.preventDefault(); // Evita que la página se recargue
    let CodigoActa = $("#CodActa").val();
    let data = {
        "CodigoActa": $("#CodActa").val(),
        "AnioID": $("#AnioActa").val(),
        "ProyectoCodigo": $("#ProyectoActa").val(),
        "Supervisor": CodSupervisor,
        "AnioSupervisor": PAnioSuper,
        "Observaciones": $("#observacion").val(),
        "UsaurioModifico": usuario
    };
    $.ajax({
        url: `${urlbase}/api/ActaInicio/ObservacionesActaInicio`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Acta aprobada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Solicitud RECHAZADA correctamente", "success").then(function () { $("#ModalRevisarActa").modal('hide'); eliminarFila(CodigoActa) });
            //let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + Proyecto
            //window.location.href = "frmActaInicio.aspx" + QueryString;

        },
        error: function (response) {
            Swal.fire("Error", "No se aprobo la solicitud", "error")
            return false
        }
    });
});
function eliminarFila(idFila) {
    var fila = document.getElementById(idFila);
    fila.remove();
}
function fnModal(CodigoActa, AnioID, Proyecto) {
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerActaInicioPresentadasXcodigo/${CodigoActa}/${AnioID}/${Proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {

            Datos = val[0]
            $("#CodActa").val(Datos.CodigoActa);
            $("#AnioActa").val(Datos.AnioID);
            $("#ProyectoActa").val(Datos.ProyectoCodigo);
            let NumActa = Datos.NoActa;
            let AnioActa = Datos.AnioActa;
            let HoraActa = Datos.HoraActa;
            let FechaActa = Datos.FechaActa;
            let Tramo = $("#tramosSelect").val();
            let TramosDesc = $("#tramosSelect").find('option:selected').text();
            let ProgramaCodigo = Datos.ProgramaCodigo;
            let Delegado = Datos.DelegadoResidente;
            let EmpresaSuper = Datos.EmpresaSuper;
            let CodigoSuper = Datos.CodigoSuper;
            CodSupervisor = Datos.CodigoSuper;
            PAnioSuper = Datos.AnioSuper
            let AnioproyectoSuper = Datos.AnioSuper;
            let NumContrato = Datos.NoContrato;
            let AnioContrato = Datos.AnioContrato;
            let FechaContrato = Datos.FechaContrato;
            let AcuerdoMinisterial = Datos.NoAcuerdo;
            let AnioAcuerdoMinisterial = Datos.AnioAcuerdo;
            let FechaAcuerdo = Datos.FechaAcuerdo;
            let Representante = Datos.Representante;
            let PuestoDesc = Datos.Cargo;
            let Clausula = Datos.Clausula;
            let Tiempo = Datos.Tiempo;
            let Regional = Datos.Regional;


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
            document.getElementById("TextoVistaActa").src = 'data:text/html;charset=utf-8,' + encodeURI(text1 + ' ' + NumActa + '-' + AnioActa + '. ' + text2 + ' ' + HoraActa + ' ' + text3 + ' ' + FechaActa + ', ' + text4 + ' ' + text5 + ' ' + TramosDesc + ' ' + text6 + ' ' + Delegado + ' - ' + text10 + ' ' + EmpresaSuper + ' ' + text11 + ' ' + CodigoSuper + '-' + AnioproyectoSuper + ' ' + text7 + ' ' + Regional + ' ' + text23 + ' ' + text12 + ' <br></br>' + text13 + ' ' + NumContrato + '-' + AnioContrato + '-COV  ' + text14 + ' ' + FechaContrato + ', ' + text15 + ' ' + AcuerdoMinisterial + '-' + AnioAcuerdoMinisterial + ' ' + text16 + ' ' + FechaAcuerdo + ', ' + text17 + ' ' + Representante + ' - ' + PuestoDesc + ' ' + text18 + ' ' + EmpresaSuper + '.</br></br>' + text19 + ' ' + Clausula + ' ' + text20 + ' ' + Tiempo + ' ' + text21 + '</br> </br>' + text22);
            $("#ModalRevisarActa").modal("show");
        }
    })
}




