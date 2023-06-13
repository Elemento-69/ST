pAnioID = 0;
pProyecto = 0;
var pPlan;
var pProyecto;
var banderaSupervisor;
var pActivarAcciones;

$(document).ready(function () {
    var date = new Date();
    var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
    $("#fechabitacora").val(stringDate);

    const cadena = usuario;
    const regex = /^(\d{4})([a-zA-Z].*)-(\d{3})$/;
    const matches = cadena.match(regex);

    if (matches) {
        const anio = matches[1]; // 2019
        const programa = matches[2]; // texto
        const codigo = programa + "-" + matches[3]; // -029
        pPlan = anio;
        pProyecto = codigo;
        banderaSupervisor = true;
        pActivarAcciones = 1;
        
    } else {
        $('#btnNuevaSolicitud').prop('disabled', 'true');
        document.getElementById("NoSupervisor").classList.remove("d-none");
        banderaSupervisor = false;
        console.log("La cadena no coincide con el patrón esperado.");
        pActivarAcciones = 0;


    }

    const comboselect = `<option value="100">SIN SELECCIÓN</option>` + `<option value="1">PRESENTADA</option>` + `<option value="3">APROBADA</option>` + `<option value="2">RECHAZADA</option>`;
    const selectElement = document.querySelector('.Cestadoselect');
    selectElement.innerHTML = comboselect;


})


function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth(); //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

$("select").select2({ theme: "bootstrap" })
$.ajax({
    url: `${urlbase}api/Suspensiones/GetPlanesAnuales`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
        $(".cplanSelect").append(cols.join("")).trigger("change")
    }
})
$(".cplanSelect").on("change", ({ currentTarget }) => {
    let AnioID = currentTarget.value
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerSupervisor/${AnioID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.supervisor}">${item.supervisor}</option>`)
            $(".cproyectoSelect").empty().append(cols.join("")).trigger("change")
        }
    })
})

$(".cproyectoSelect").on("change", ({ currentTarget }) => {
    if (banderaSupervisor === false) {
        pPlan = $('.cplanSelect').val()
        pProyecto = $('.cproyectoSelect').val()
        setTable();
    } else if (banderaSupervisor) {
        setTable();
    }

})

$(".Cestadoselect").on("change", ({ currentTarget }) => {
    console.log("cambiando "+currentTarget.value);

})



//<td>${moment(val.FechaActa).format("DD/MM/YYYY HH:mm:SS a")}</td>
//url: `${urlbase}/api/ActaInicio/ObtenerActaInicio/${plan}/${proyecto}`,
setTable();
function setTable() {
    $.ajax({
        url: `${urlbase}/api/ActaInicio/ObtenerActaInicio/${pPlan}/${pProyecto}`,
        success: (val) => {
            //console.log(val);
            let $Esta='APROBADA';
            let $categoria = $('#actainicio-table tbody')
            $categoria.html(null)
            let options = val.map((val) => `
            <tr class="text-center">
                <td class="spacer bg-light"></td>
                <td>${val.CodigoActa}</td>
                <td>${val.AnioProyecto}</td>
                <td>${val.ProyectoCodigo}</td>
                <td>${val.FechaCreo}</td>
                <td>${val.Observaciones}</td>
                <td>${val.Estado}</td>
               ${val.Estado == 'APROBADA' ? `
    <td>
        <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" onclick="fnImprimirActa('${val.CodigoActa}', '${val.AnioProyecto}', '${val.ProyectoCodigo}', '${val.ProgramaCodigo}')"
            data-content="ImprimirActa" data-placement="top">
            <i class="fas fa-print fa-lg fa-fw"></i>
        </a>
    </td>
` : `
    <td>
        <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" onclick="fnModalVerActa('${val.CodigoActa}', '${val.AnioProyecto}', '${val.ProyectoCodigo}')"
            data-content="Detalle de estimaciones" data-placement="top">
            <i class="fas fa-eye fa-lg fa-fw"></i>
        </a>
        ${pActivarAcciones ?
                    `<a href="#" id="editActa" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" onclick="fnEditarActa('${val.CodigoActa}', '${val.AnioProyecto}', '${val.ProyectoCodigo}', '${val.ProgramaCodigo}', '${val.TramoID}')"
                data-content="Detalle de estimaciones" data-placement="top">
                <i class="fas fa-edit fa-lg fa-fw"></i>
            </a>
            <a href="#" id="delActa" class="action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" onclick="fnEliminarActa('${val.CodigoActa}', '${val.AnioProyecto}', '${val.ProyectoCodigo}')"
                data-content="Eliminar Acta de Inicio" data-placement="top">
                <i class="fas fa-trash fa-lg fa-fw"></i>
            </a>` :
                    ''}
    </td>
`}

                 
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

$(document).ready(function () {
    $("#tbnNuevaActa").click(function () {
        valor = $('input:radio[name=status]:checked').val();
        if (valor==1) {
            let QueryString = "?Plan=" + pPlan + "&Programa=" + pProyecto.split('-')[0].toString() + "&Proyecto=" + pProyecto
            window.location.href = "frmActaInicioContratista.aspx" + QueryString;
        } else {
            let QueryString = "?Plan=" + pPlan + "&Programa=" + pProyecto.split('-')[0].toString() + "&Proyecto=" + pProyecto
            window.location.href = "frmActaInicioSupervision.aspx" + QueryString;
        }
    })
})
function fnEditarActa(CodigoActa, AnioID, Proyecto, Programa, TramoID) {

    var cadena = CodigoActa;
    var sup = cadena.substr(0, 3); // Obtiene los primeros tres caracteres de la cadena
    console.log(sup); 


    if (sup !='SUP') {
        let QueryString = "?Codigo=" + CodigoActa + "&Anio=" + AnioID + "&Proyecto=" + Proyecto + "&Programa=" + Programa + "&TramoID=" + TramoID
        window.location.href = "frmActaInicioContratistaEditar.aspx" + QueryString;
    } else {
        let QueryString = "?Codigo=" + CodigoActa + "&Anio=" + AnioID + "&Proyecto=" + Proyecto + "&Programa=" + Programa + "&TramoID=" + TramoID
        window.location.href = "frmActaInicioSupervisionEditar.aspx" + QueryString;
    }
    
}


function fnModalVerActa(CodigoActa, AnioID, Proyecto) {
    $.ajax({
        url: `${urlbase}api/ActaInicio/ObtenerActaInicioPresentadasXcodigo/${CodigoActa}/${AnioID}/${Proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            Datos = val[0];
            if (Datos.ProgramaCodigo != 'S') {

                let NumActa = Datos.NoActa;
                let AnioActa = Datos.AnioActa;
                let HoraActa = Datos.HoraActa;
                let FechaActa = Datos.FechaActa;
                let Tramo = Datos.TramoDesc;
                let TramosDesc = Datos.TramoID;
                let Superintendente = Datos.Superintendente;
                let Empresa = Datos.EmpresaProyecto;
                let Anio = Datos.AnioID;
                let CodigoProyecto = Datos.ProyectoCodigo;
                let Programa = 'MANTENIMIENTO RUTINARIO DE LA RED VIAL PAVIMENTADA';
                let ProgramaCodigo = Datos.ProgramaCodigo;
                let Delegado = Datos.DelegadoResidente;
                let EmpresaSuper = Datos.EmpresaSuper;
                let CodigoSuper = Datos.CodigoSuper;
                let AnioproyectoSuper = Datos.AnioSuper;
                let NumContrato = Datos.NoContrato;
                let AnioContrato = Datos.AnioContrato;
                let FechaContrato = Datos.FechaContrato;
                let AcuerdoMinisterial = Datos.NoAcuerdo;
                let AnioAcuerdoMinisterial = Datos.AnioAcuerdo;
                let FechaAcuerdo = Datos.FechaAcuerdo;
                let Representante = Datos.Representante;
                let Puesto = $("#PuestoSelect").val();
                let PuestoDesc = Datos.Cargo;
                let Clausula = Datos.Clausula;
                let Tiempo = Datos.Tiempo;


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
                document.getElementById("TextoVistaActaObservaciones").src = 'data:text/html;charset=utf-8,' + encodeURI(text1 + ' ' + NumActa + '-' + AnioActa + '. ' + text2 + ' ' + HoraActa + ' ' + text3 + ' ' + FechaActa + ', ' + text4 + ' ' + text5 + ' ' + Tramo + ' ' + text6 + ' ' + Superintendente + ' ' + text7 + ' ' + Empresa + ' ' + text8 + ' ' + CodigoProyecto + ' - ' + Anio + ' - ' + Programa + ' ' + text9 + ' ' + Delegado + ' - ' + text10 + ' ' + EmpresaSuper + ' ' + text11 + ' ' + CodigoSuper + '-' + AnioproyectoSuper + ' ' + text12 + ' <br></br>' + text13 + ' ' + NumContrato + '-' + AnioContrato + '-COV  ' + text14 + ' ' + FechaContrato + ', ' + text15 + ' ' + AcuerdoMinisterial + '-' + AnioAcuerdoMinisterial + ' ' + text16 + ' ' + FechaAcuerdo + ', ' + text17 + ' ' + Representante + ' - ' + PuestoDesc + ' ' + text18 + ' ' + EmpresaSuper + '.</br></br>' + text19 + ' ' + Clausula + ' ' + text20 + ' ' + Tiempo + ' ' + text21 + '</br> </br>' + text22);
                $("#ModalRevisarActaObservaciones").modal("show");
               } else {
                $("#CodActaObservacion").val(Datos.CodigoActa);
                $("#AnioActaObservacion").val(Datos.AnioID);
                $("#ProyectoActaObservacion").val(Datos.ProyectoCodigo);
                let NumActa = Datos.NoActa;
                let AnioActa = Datos.AnioActa;
                let HoraActa = Datos.HoraActa;
                let FechaActa = Datos.FechaActa;
                let Tramo = $("#tramosSelect").val();
                let TramosDesc = Datos.TramoID;
                let ProgramaCodigo = Datos.ProgramaCodigo;
                let Delegado = Datos.DelegadoResidente;
                let EmpresaSuper = Datos.EmpresaSuper;
                let CodigoSuper = Datos.CodigoSuper;
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
                document.getElementById("TextoVistaActaObservaciones").src = 'data:text/html;charset=utf-8,' + encodeURI(text1 + ' ' + NumActa + '-' + AnioActa + '. ' + text2 + ' ' + HoraActa + ' ' + text3 + ' ' + FechaActa + ', ' + text4 + ' ' + text5 + ' ' + TramosDesc + ' ' + text6 + ' ' + Delegado + ' - ' + text10 + ' ' + EmpresaSuper + ' ' + text11 + ' ' + CodigoSuper + '-' + AnioproyectoSuper + ' ' + text7 + ' ' + Regional + ' ' + text23 + ' ' + text12 + ' <br></br>' + text13 + ' ' + NumContrato + '-' + AnioContrato + '-COV  ' + text14 + ' ' + FechaContrato + ', ' + text15 + ' ' + AcuerdoMinisterial + '-' + AnioAcuerdoMinisterial + ' ' + text16 + ' ' + FechaAcuerdo + ', ' + text17 + ' ' + Representante + ' - ' + PuestoDesc + ' ' + text18 + ' ' + EmpresaSuper + '.</br></br>' + text19 + ' ' + Clausula + ' ' + text20 + ' ' + Tiempo + ' ' + text21 + '</br> </br>' + text22);
                $("#ModalRevisarActaObservaciones").modal("show");
            }
        }
    })
}



//Eliminar un bitacora por proyecto
function fnEliminarActa(Codigo, Anio, Proyecto) {
    console.log("Entro");
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el acta?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/ActaInicio/EliminarActaInicio`,
                    method: "post",
                    data: JSON.stringify({
                        "CodigoActa": Codigo,
                        "AnioID": Anio,
                        "ProyectoCodigo": Proyecto,
                        "Usuario": usuario
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Acta de inicio elimada correctamente", "success");
                        setTable();
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}

function fnImprimirActa(Codigo, Anio, Proyecto, Programa) {

    var cadena = Codigo;
    var sup = cadena.substr(0, 3); // Obtiene los primeros tres caracteres de la cadena
    

    if (sup != 'SUP') {
        var vReporte = 'rptActaInicioContratistas.mrt';
        var QueryString = '?Parameters="' + Codigo + '",' + Anio + ',"' + Proyecto + '"' + '&IdReporte=6' + '&Reporte=' + vReporte;
        var url = "../FrmVisorReporte.aspx" + QueryString;
        var params = [
            'height=' + screen.height,
            'width=' + screen.width,
            'fullscreen=yes' // only works in IE, but here for completeness
        ].join(',');
        window.open(url, '_blank', params);

    } else {
        var vReporte = 'rptActaInicioSupervisiones.mrt';
        var QueryString = '?Parameters="' + Codigo + '",' + Anio + ',"' + Proyecto + '"' + '&IdReporte=7' + '&Reporte=' + vReporte;
        var url = "../FrmVisorReporte.aspx" + QueryString;
        var params = [
            'height=' + screen.height,
            'width=' + screen.width,
            'fullscreen=yes' // only works in IE, but here for completeness
        ].join(',');
        window.open(url, '_blank', params);
    }
   
}


