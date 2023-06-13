//plan = '2020';
//proyecto = 'S-091';
alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
//var regex = /(\d+)/g;
//var numeroproysuper = proyecto.match(regex);
//console.log(numeroproysuper);
//$("#anioSupernumero").val(plan);
//$("#proyectoSupernumero").val(numeroproysuper);
//var [CodProy,AnioProy ] = proyecto.split('-');
//$("#letraproyectoSuper").val(CodProy);

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    var plan = urlParams.get("AnioID");
    var proyecto = urlParams.get("ProyectoCodigo");
    console.log(plan);
    console.log(proyecto);
    $("#aniosuper").val(plan);
    $("#proyectosuper").val(proyecto);
    var regex = /(\d+)/g;
    var numeroproysuper = proyecto.match(regex);
    $("#anioSupernumero").val(plan);
    $("#proyectoSupernumero").val(numeroproysuper);
    var [CodProy, AnioProy] = proyecto.split('-');
    $("#letraproyectoSuper").val(CodProy);
    createTable(plan, proyecto);
    //lista todos los proyectos
    $('#listaproyectos').find("option").remove()
    $.ajax({
        url: `${urlbase}api/DeclaracionJurada/ObtenerTodosLosProyectos/${plan}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#listaproyectos').append(val.map((val) => new Option(val.ProyectoDescripcion, val.Id))).trigger("change")
            let anioproy = $("#listaproyectos").val();
            let [AnioProy, CodProy] = anioproy.split(',');
            fnObtenerDatosEmpresa(AnioProy, CodProy);
        }
    })
    //lista de estimaciones super 
    $('#listaestimsuper').find("option").remove()
    $.ajax({
        url: `${urlbase}api/DeclaracionJurada/ObtenerEstimacionesParaFactura/${plan}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#listaestimsuper').append(val.map((val) => new Option(val.Est, val.Estimacioncorr))).trigger("change")

        }
    })

    //al cambiar proyecto actualiza las estimaciones de ese proyecto
    $("#listaproyectos").on("change.select2", ({ currentTarget }) => {
        let proy = currentTarget.value;
        let [anio, proyec] = proy.split(',')
        $('#listaestimcontratista').find("option").remove()
        $.ajax({
            url: `${urlbase}api/DeclaracionJurada/ObtenerEstimacionesParaFactura/${anio}/${proyec}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#listaestimcontratista').append(val.map((val) => new Option(val.Est, val.Estimacioncorr))).trigger("change")
                let estim = $("#listaestimcontratista").val();
                fnObtenerDatosEstim(anio, proyec, estim);
            }
        })
    })
})






//al cambiar las estimacion actualiza el nuemro de estimación
$("#listaestimcontratista").on("change.select2", ({ currentTarget }) => {
    let anioproy = $("#listaproyectos").val();
    let [AnioProy, CodProy] = anioproy.split(',');
            let estim = $("#listaestimcontratista").val();
            fnObtenerDatosEstim(AnioProy, CodProy, estim);
})

//Informacion de estimaciones super
function fnObtenerDatosEstim(AnioProy, CodProy, estim) {
    $.ajax({
        url: `${urlbase}api/DeclaracionJurada/ObtenerInfoEstimacion/${AnioProy}/${CodProy}/${estim}`,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            let fechainicio = Datos.FechaDesde;
            let fechafin = Datos.FechaHasta
            let letraproy = Datos.LetraProyecto;
            $("#letra").val(letraproy);
            let corrproy = Datos.CorrelativoProyecto;
            $("#correlproyecto").val(corrproy);
            let anio = Datos.AnioID;
            $("#anioletras").val(anio);
            var date = new Date(fechainicio);
            var date2 = new Date(fechafin);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
            $("#fecha1").val(stringDate);
            var stringDate2 = moment(date2).format(moment.HTML5_FMT.DATE);
            $("#fecha2").val(stringDate2);
        }
    })
}

//Informacion de empresa
function fnObtenerDatosEmpresa(AnioProyemp, CodProyemp) {
    $.ajax({
        url: `${urlbase}api/DeclaracionJurada/ObtenerInfoEmpresa/${AnioProyemp}/${CodProyemp}`,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            let empresa = Datos.Nombre;
            $("#txtempresa").val(empresa);
        }
    })
}

$("#btn-IncluirEstimacion").on("click", () => {
    let estim = $("#listaestimcontratista").val();
    console.log(estim);
    let numestim = numeroALetras(estim);

    console.log(numeroALetras(estim));
    let anioproy = $("#listaproyectos").val();
    let [AnioProy, CodProy] = anioproy.split(',');
    
    let fech1 = $("#fecha1").val();
    let fech2 = $("#fecha2").val();


    let fecha = new Date(fech1);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechletras = fecha.toLocaleDateString("es-ES", options);
    let fecha2 = new Date(fech2);
    let options2 = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechletras2 = fecha2.toLocaleDateString("es-ES", options2);

    console.log(fechletras);
    let contratista = $("#contratista").val();
    let cargo = $("#cargo").val();
    
    let nomempresa = $("#txtempresa").val();
    let letraproy = $("#letra").val();
    let corrproy = $("#correlproyecto").val();
    let numcorrproy = numeroALetras(corrproy);
    let aniolet = $("#anioletras").val();
    let aniosletras = numeroALetras(aniolet);
    let texto = "Que los Volumenes de trabajo y precio contenidos en la estimacion número " + numestim + " correspondientes al periodo del " + fechletras + " al " + fechletras2 + " , refente al Contratista " + contratista + " (" + cargo + ") de la empresa " + nomempresa + " entidad a cargo del Proyecto " + letraproy + " guión " + numcorrproy + " guion " + aniosletras + " (" + [CodProy, AnioProy ] +") y que fueron efectivamente ejecutados ";
    //console.log(texto);
   
    var i = 1;
    var cont = 1;
    var fila = '<tr id="row' + cont + '"><td style="display: none">' + cont + '</td><td>' + texto + '</td><td><button type="button"  name="remove" id="' + i + '" class="btn btn-danger btn_removeDetalle "><i class="fas fa-trash fa-sm fa-fw"></i></button></td></tr>';
    i++;
    cont++;
    $('#comentario_selected-table').append(fila);

})

//Eliminar Datos de la tabla
$(document).on('click', '.btn_removeDetalle', function () {
    var datosFila = [];
    var i = 0;
    $(this).parents("tr").find("td").each(function () {
        datosFila[i] = $(this).html();
        i++;
    });
    $('#row' + datosFila[0]).remove();
});

$("#btn-TrabajosSuspendidos").on("click", () => {
    let anioproy = $("#listaproyectos").val();
    let [AnioProy, CodProy] = anioproy.split(',');

    let fech1 = $("#fecha1").val();
    let fech2 = $("#fecha2").val();


    let fecha = new Date(fech1);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechletras = fecha.toLocaleDateString("es-ES", options);
    let fecha2 = new Date(fech2);
    let options2 = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechletras2 = fecha2.toLocaleDateString("es-ES", options2);

    let contratista = $("#contratista").val();
  
    let nomempresa = $("#txtempresa").val();
    let letraproy = $("#letra").val();
    let corrproy = $("#correlproyecto").val();
    let numcorrproy = numeroALetras(corrproy);
    let aniolet = $("#anioletras").val();
    let aniosletras = numeroALetras(aniolet);
    let texto1 = "En referencia al proyecto " + letraproy + " guión " + numcorrproy + " guion " + aniosletras + " " + [CodProy, AnioProy] + " no se ejecutaron trabajos del " + fechletras + " al " + fechletras2 +" , 2013 por haber sido suspendidos de forma temporal según dicta el acta correspondientes al contratista " + contratista + " de la empresa " + nomempresa + " entidad a cargo del Proyecto indicado " ;
    //console.log(texto); 

    var i = 1;
    var cont = 1;
    var fila = '<tr id="row' + cont + '"><td style="display: none">' + cont + '</td><td>' + texto1 + '</td><td><button type="button"  name="remove" id="' + i + '" class="btn btn-danger btn_removeDetalle "><i class="fas fa-trash fa-sm fa-fw"></i></button></td></tr>';
    i++;
    cont++;
    $('#comentario_selected-table').append(fila);

})

$("#btn-AsignarContratista").on("click", () => {
    let anioproy = $("#listaproyectos").val();
    let [AnioProy, CodProy] = anioproy.split(',');

    let fech1 = $("#fecha1").val();
    let fech2 = $("#fecha2").val();


    let fecha = new Date(fech1);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechletras = fecha.toLocaleDateString("es-ES", options);
    let fecha2 = new Date(fech2);
    let options2 = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechletras2 = fecha2.toLocaleDateString("es-ES", options2);   
    let letraproy = $("#letra").val();
    let corrproy = $("#correlproyecto").val();
    let numcorrproy = numeroALetras(corrproy);
    let aniolet = $("#anioletras").val();
    let aniosletras = numeroALetras(aniolet);
    let texto2 = "En referencia al proyecto " + letraproy + " guión " + numcorrproy + " guion " + aniosletras + " " + [CodProy, AnioProy] + " no registra ejecución del " + fechletras + " al " + fechletras2 + " , por no haber sido asignado a la fecha rmpresa contratista,  sin embargo el Supervisor/a, mantiene monitoreo de los trabajos con el objeto de cubrir cualquier empergencia que pueda surgir ";
    //console.log(texto); 

    var i = 1;
    var cont = 1;
    var fila = '<tr id="row' + cont + '"><td style="display: none">' + cont + '</td><td>' + texto2 + '</td><td><button type="button"  name="remove" id="' + i + '" class="btn btn-danger btn_removeDetalle "><i class="fas fa-trash fa-sm fa-fw"></i></button></td></tr>';
    i++;
    cont++;
    $('#comentario_selected-table').append(fila);

})

    $("#btn-PresentacionPosterior").on("click", () => {
        let anioproy = $("#listaproyectos").val();
        let [AnioProy, CodProy] = anioproy.split(',');

        let fech1 = $("#FechaInicio").val();
        let fech2 = $("#FechaHasta").val();


        let fecha = new Date(fech1);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fechletras = fecha.toLocaleDateString("es-ES", options);
        let fecha2 = new Date(fech2);
        let options2 = { year: 'numeric', month: 'long', day: 'numeric' };
        let fechletras2 = fecha2.toLocaleDateString("es-ES", options2);

        console.log(fechletras);
        let contratista = $("#contratista").val();
        let cargo = $("#cargo").val();

        let nomempresa = $("#txtempresa").val();
        let letraproy = $("#letra").val();
        let corrproy = $("#correlproyecto").val();
        let numcorrproy = numeroALetras(corrproy);
        let aniolet = $("#anioletras").val();
        let aniosletras = numeroALetras(aniolet);
        let texto3 = "Que los Volumenes de trabajo y precio contenidos en el periodo del " + fechletras + " al " + fechletras2 + " , refente al Contratista " + contratista + " (" + cargo + ") de la empresa " + nomempresa + " entidad a cargo del Proyecto " + letraproy + " guión " + numcorrproy + " guion " + aniosletras + " (" + [CodProy, AnioProy] + ") son reales y que fueron efectivamente ejecutados, los cuales seran presentados posteriormente ";
        //console.log(texto); 

        var i = 1;
        var cont = 1;
        var fila = '<tr id="row' + cont + '"><td style="display: none">' + cont + '</td><td>' + texto3 + '</td><td><button type="button"  name="remove" id="' + i + '" class="btn btn-danger btn_removeDetalle "><i class="fas fa-trash fa-sm fa-fw"></i></button></td></tr>';
        i++;
        cont++;
        $('#comentario_selected-table').append(fila);

    })


$("#btn-InsertarDeclaracion").on("click", () => {
    let plan =$("#aniosuper").val();
    let proyecto =$("#proyectosuper").val();
    var mensaje = '';
    var tabla = document.getElementById("comentario_selected-table");
    var rows = tabla.rows;

    for (var i = 1; i < rows.length; i++) {// recorre las filas de la tabla
        console.log(rows[i].cells[1].innerHTML);
        mensaje = mensaje + alfabeto[i - 1] + ") " + rows[i].cells[1].innerHTML
    }
    console.log(mensaje);
    let check = document.getElementById("EsEmpresa").checked;

    let letrasuper = $("#letraproyectoSuper").val();

    let corrproysuper = $("#proyectoSupernumero").val();
    let numcorrproysuper = numeroALetras(corrproysuper);

    let anioletsuper = $("#anioSupernumero").val();
    let aniosletrassuper = numeroALetras(anioletsuper);

    let proyectoletras = letrasuper+" "+ "guión"+" "+ numcorrproysuper +" "+ "guión" +" "+ aniosletrassuper
    let obj = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "EstimacionCorr": $("#listaestimsuper").val(),
        "HoraEnLetras": $("#horaletras").val(),
        "Direccion": $("#direccion").val(),
        "Notario": $("#notario").val(),
        "RequeridoPor": $("#requeridopor").val(),
        "EnCalidadDe": "SUPERVISOR",
        "Empresa": "",
        "DelegadoResidente": "",
        "EstimacionesContratista": mensaje,
        "MinutosActa": $("#minutosredaccion").val(),
        "EsEmpresa": check,
        "Anio": $("#anio").val(),
        "Mes": $("#mes").val(),
        "Dia": $("#dia").val(),
        "SupLetras": proyectoletras,
        "Lugar": $("#lugar").val()
    }

    $.ajax({
        url: `${urlbase}api/DeclaracionJurada/AgregarDeclaracionJurada `,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: (val) => {
            let message = "Acta creada correctamente"
            swal.fire(message, "", "success")
            createTable(plan, proyecto);
            limpiarCampos();
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})

function limpiarCampos() {
    $("#dia").val('');
    $("#mes").val('');
    $("#anio").val('');
    $("#lugar").val('');
    $("#horaletras").val('');
    $("#direccion").val('');
    $("#notario").val('');
    $("#requeridopor").val('');
    $("#listaestimsuper").val('');
    $("#minutosredaccion").val('');
    $("#listaproyectos").val('');
    $("#listaestimcontratista").val('');
    $("#EsEmpresa").val('');
    $("#contratista").val('');
    $("#comentario_selected-table").empty();
    
}

$("#btnRegresarconsultaestimaciones").on("click", () => {
    plan = $('#ProyectoList').val().substr(0, 4)
    proyecto = $('#ProyectoList').val().substr(5, 10)
    let QueryString = "?AnioID=" + plan + "?ProyectoCodigo=" + proyecto
    window.location = "../Reportes/frmDeclaracionJurada.aspx" 
})

function createTable(plan, proyecto) {
    $.ajax({
        url: `${urlbase}api/DeclaracionJurada/ObtenerDeclaracionJuradaXProyectos/${plan}/${proyecto}`,
        success: (val) => {
            let $categoria = $('#acta-table tbody')
            $categoria.html(null)
            let options = val.map((item) => {
                let row = $(`
                 <tr class="text-center td-custom">
                    <td class="spacer bg-light"></td>
                    <td>
                        <a type="button" class="action-icon hover-blue del-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Detalle de estimaciones" data-placement="top">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>
                        <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Detalle de estimaciones" data-placement="top">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                    </td>
                    <td>${moment(item.FechaActa).format("DD/MM/YYYY")}</td>
                    <td>${item.EstimacionCorr}</td>
                    <td>${item.EstimacionesContratista}</td>
                    <td class="spacer bg-light"></td>
                </tr>`)
                row.data("item", item)
                return row
            })
            $categoria.append(options)
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })
}





$('#acta-table tbody').on("click", ".del-btn", function () {
    let data = $(this).closest("tr").data("item")
    let plan = data.AnioID;
    let proyecto = data.ProyectoCodigo;
    let item = {
        "Anioid": data.AnioID,
        "ProyectoCodigo": data.ProyectoCodigo,
        "EstimacionCorr": data.EstimacionCorr,
        "DeclaracionJuradaCorrel": data.DeclaracionJuradaCorrel
    }
    Swal.fire({
        title: 'Eliminar Registro',
        text: "Esta seguro de eliminar esta declaración jurada, es irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${urlbase}api/DeclaracionJurada/EliminarDeclaracionJurada`,
                method: "POST",
                data: JSON.stringify(item),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire("Declaración Jurada Eliminada Exitosamente", "", "success")
                    createTable(plan, proyecto);
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })

})

$('#acta-table tbody').on("click", ".print-btn", function () {
    let data = $(this).closest("tr").data("item")
    let reporte = 7000;
    let AnioID = data.AnioID;
    let ProyectoCodigo = data.ProyectoCodigo;
    let EstimacionCorr = data.EstimacionCorr;
    let DeclaracionJuradaCorrel = data.DeclaracionJuradaCorrel;
    let Empresa = false;
    let Delegado = '';
    let NombreEmpresa = '';
    opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${AnioID}&ProyectoCodigo=${ProyectoCodigo}&EstimacionCorr=${EstimacionCorr}&DeclaracionJuradaCorrel=${DeclaracionJuradaCorrel}&Empresa=${Empresa}&Delegado=${Delegado}&NombreEmpresa=${NombreEmpresa}`);
     
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Declaración Jurada",
            autoOpen: false,
            dialogClass: 'dialog_fixed,ui-widget-header',
            modal: true,
            height: 500,
            minWidth: $(window).width() * .70,
            minHeight: $(window).height() * .55,
            draggable: true
        });
    $dialog.dialog('open');
}
var numeroALetras = (function () {

    function Unidades(num) {

        switch (num) {
            case 1: return 'uno';
            case 2: return 'dos';
            case 3: return 'tres';
            case 4: return 'cuatro';
            case 5: return 'cinco';
            case 6: return 'seis';
            case 7: return 'siete';
            case 8: return 'ocho';
            case 9: return 'nueve';
        }

        return '';
    }//Unidades()

    function Decenas(num) {

        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0: return 'diez';
                    case 1: return 'once';
                    case 2: return 'doce';
                    case 3: return 'trece';
                    case 4: return 'catorce';
                    case 5: return 'quince';
                    default: return 'dieci' + Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0: return 'veinte';
                    default: return 'veninti' + Unidades(unidad);
                }
            case 3: return DecenasY('teinta', unidad);
            case 4: return DecenasY('cuarenta', unidad);
            case 5: return DecenasY('cincuenta', unidad);
            case 6: return DecenasY('sesenta', unidad);
            case 7: return DecenasY('setenta', unidad);
            case 8: return DecenasY('ochenta', unidad);
            case 9: return DecenasY('noventa', unidad);
            case 0: return Unidades(unidad);
        }
    }//Unidades()

    function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
    }//DecenasY()

    function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return 'ciento ' + Decenas(decenas);
                return 'cien';
            case 2: return 'doscientos ' + Decenas(decenas);
            case 3: return 'trescientos ' + Decenas(decenas);
            case 4: return 'cuatrocientos ' + Decenas(decenas);
            case 5: return 'quinientos ' + Decenas(decenas);
            case 6: return 'seiscientos ' + Decenas(decenas);
            case 7: return 'setecientos ' + Decenas(decenas);
            case 8: return 'ochocientos ' + Decenas(decenas);
            case 9: return 'novecientos ' + Decenas(decenas);
        }

        return Decenas(decenas);
    }//Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    }//Seccion()

    function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'un mil', 'mil');
        let strCentenas = Centenas(resto);

        if (strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    }//Miles()

    function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'un millon de', 'millones de');
        let strMiles = Miles(resto);

        if (strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    }//Millones()

    return function NumeroALetras(num) {

        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'con ' + (function () {
                if (data.centavos == 1)
                    return Millones(data.centavos);
                else
                    return Millones(data.centavos);
            })();
        };

        if (data.enteros == 0)
            return 'cero ' + data.letrasMonedaPlural;
        if (data.enteros == 1)
            return Millones(data.enteros);
        else
            return Millones(data.enteros);
    };

})();