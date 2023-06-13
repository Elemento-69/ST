var vPlans = 0;
var vPlan = 0;
var vContratos = 0;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlans = urlParams.get("AnioID");
    $("#txtCodigoRenglon").val("");
    $("#txtDescRenglon").val("");
    $("#txtPrecio").val("");

    console.log(vPlans);
    fnCargaInicial();
    $('#btnImprimir').click(function () {
        fnReporteRenglon("");
    })
})

function fnCargaInicial() {

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
                    <button type="button" class="action-icon hover-blue btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarRenglon('${row.RenglonID}')" title="Eliminar Renglon">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" onclick="fnModalActualizarRenglon('${row.RenglonID}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Renglon">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    `
            }
        },

        {
            className: 'text-center',
            title: "Rnglón ID",
            data: 'RenglonID'
        },
        {
            className: 'text-center',
            title: "Renglón Código",
            data: 'RenglonCode'
        },
        {
            className: 'text-center',
            title: "Renglón Descripción",
            data: 'RenglonDesc'
        },
        {
            className: 'text-center',
            title: "Unidad",
            data: 'RenglonUni'
        },
        {
            className: 'text-center',
            title: "Sección Descripción",
            data: 'SeccionDesc'
        },
        {
            className: 'text-center',
            title: "División Código",
            data: 'DivisionCode'
        },
        {
            className: 'text-center',
            title: "Especificación Código",
            data: 'EspecificacionesID'
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
        },
        drawCallback: () => {
            initMasks('table')
        },

    }
    $("#renglones-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/Renglones/ObtenerRenglones`))
}

$('#cmbSeccion').find("option").remove()
$.ajax({
    url: `${urlbase}api/Renglones/ObtenerSecciones`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbSeccion').append(val.map((val) => new Option(val.SeccionNombre, val.SeccionID))).trigger("change")
    }
})
$('#cmbSeccion-Act').find("option").remove()
$.ajax({
    url: `${urlbase}api/Renglones/ObtenerSecciones`,
    success: (val) => {
        let options = val.map((val) => new Option(val.SeccionNombre, val.SeccionID))
        $('#cmbSeccion-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})


$('#cmbAnio').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaAnios`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbAnio').append(val.map((val) => new Option(val.AnioID, val.AnioID))).trigger("change")
    }
})


$('#cmbAnio-Act').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaAnios`,
    success: (val) => {
        let options = val.map((val) => new Option(val.AnioID, val.AnioID))
        $('#cmbAnio-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})


$('#cmbUnidadMedida').find("option").remove()
let Opcion = 4;
let IdCatalogo = 1;
let IdItemCatalogo = 1;
let DesCatalogo = 0;
let Filtro = 1;
let titulo = 0;
let IdSubCategoria=0;
$.ajax({
    url: `${urlbase}api/Renglones/ObtenerUnidadMedida/${Opcion}/${IdCatalogo}/${IdItemCatalogo}/${DesCatalogo}/${Filtro}/${titulo}/${IdSubCategoria}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbUnidadMedida').append(val.map((val) => new Option(val.Descripcion, val.Descripcion))).trigger("change")
    }
})

$('#cmbUnidadMedida-Act').find("option").remove()
let OpcionAct = 4;
let IdCatalogoAct = 1;
let IdItemCatalogoAct = 1;
let DesCatalogoAct = 0;
let FiltroAct = 1;
let tituloAct = 0;
let IdSubCategoriaAct = 0;
$.ajax({
    url: `${urlbase}api/Renglones/ObtenerUnidadMedida/${OpcionAct}/${IdCatalogoAct}/${IdItemCatalogoAct}/${DesCatalogoAct}/${FiltroAct}/${tituloAct}/${IdSubCategoriaAct}`,
    success: (val) => {
        let options = val.map((val) => new Option(val.Descripcion, val.Descripcion))
        $('#cmbUnidadMedida-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

//Obterner Secciones
function fnObtRenglon(RenglonID) {
    $.ajax({
        url: `${urlbase}api/Renglones/ObtenerUnRenglon/${RenglonID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            let DivisionCode = Datos.DivisionCode;
            let DivisionCodeEsp = DivisionCode.trim();
            let SeccionCode = Datos.SeccionCode;
            let SeccionCodeEsp = SeccionCode.trim();
            let EspecificacionID = Datos.EspecificacionID;
            let EspecificacionIDEsp = EspecificacionID.trim();
            let DivisionCodeEspa = DivisionCodeEsp.padEnd(4);
            let SeccionCodeEspa = SeccionCodeEsp.padEnd(4);
            let EspecificacionIDEspa = EspecificacionIDEsp.padEnd(6);

            let Seccion = [DivisionCodeEspa, SeccionCodeEspa, EspecificacionIDEspa]

            var Secciones = Seccion.toString();
            console.log(Secciones);
            $("#txtIDRenglon-Act").val(RenglonID);
            $("#txtCodigoRenglon-Act").val(Datos.RenglonCode);
            $("#txtDescRenglon-Act").val(Datos.RenglonDesc);
            $("#cmbUnidadMedida-Act").val(Datos.RenglonUni);
            $("#txtPrecio-Act").val(Datos.PrecioJusto);
            $("#cmbSeccion-Act").val(Secciones);
        }
    })
}
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth(); //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
function fnModalActualizarRenglon(RenglonID) {
    console.log(RenglonID);
    fnObtRenglon(RenglonID);
    $("#exampleModalActualizar").modal('show');
}


//Insertar un nuevo Programa
$("#btnGuardarRenglon").on("click", () => {
    var vCodigo = $("#txtCodigoRenglon").val();
    var vDesc = $("#txtDescRenglon").val();

    if (vCodigo == '') {
        Swal.fire("Advertencia", 'Debe ingresar el código del renglón', "warning")
    }
    else if (vDesc == '') {
        Swal.fire("Advertencia", 'Debe ingresar la descripción del renglón', "warning")
    }
    else {

    
    var today = new Date();
    let seccion = $("#cmbSeccion").val();
    let [DivisionCode, SeccionCode, EspecificacionID] = seccion.split(',')
    let data = {
        "Anio": $("#cmbAnio").val(),
        "PrecioJusto": $("#txtPrecio").val(),
        "SeccionCode": SeccionCode,
        "RenglonCode": $("#txtCodigoRenglon").val(),
        "RenglonDesc": $("#txtDescRenglon").val(),
        "RenglonUni": $("#cmbUnidadMedida").val(),
        "DivisionCode": DivisionCode,
        "EspecificacionID": EspecificacionID,
        "UserName": usuario,
        "DateModify": today
    };
    $.ajax({
        url: `${urlbase}/api/Renglones/AgregarUnRenglon`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            if (val == -1) {
                Swal.fire("Error", "EL Id o la Descripción del Renglón ya se encuentran en la base de datos.", "error")
            } else {
                let message = "Renglon insertado con exito"
                swal.fire(message, "", "success")
                $.LoadingOverlay("hide");
                Swal.fire("Éxito", "Renglon creado correctamente", "success").then(function () {
                    $("#txtCodigoRenglon").val("");
                    $("#txtDescRenglon").val("");
                    $("#txtPrecio").val("");

                    $("#ModalagregarRenglon").modal('hide');
                });
                fnCargaInicial();
            }
        },
        error: function (response) {
            Swal.fire("Error", response.responseText, "error")
            return false
        }
    });
}
});
//Actualizar un Programa
$("#btnGuardarRenglonAct").on("click", () => {
    var today = new Date();
    let seccionAct = $("#cmbSeccion-Act").val();
    let [DivisionCodeAct, SeccionCodeAct, EspecificacionIDAct] = seccionAct.split(',')
    let data = {
        "RenglonID": $("#txtIDRenglon-Act").val(),
        "SeccionCode": SeccionCodeAct,
        "RenglonCode": $("#txtCodigoRenglon-Act").val(),
        "RenglonDesc": $("#txtDescRenglon-Act").val(),
        "RenglonUni": $("#cmbUnidadMedida-Act").val(),
        "DivisionCode": DivisionCodeAct,
        "EspecificacionID": EspecificacionIDAct,
        "UserName": usuario,
        "DateModify": today
    };
    $.ajax({
        url: `${urlbase}/api/Renglones/ActualizarUnRenglon`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Renglon actualizado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Renglon actualizado correctamente", "success").then(function () { $("#exampleModalActualizar").modal('hide'); });
            fnCargaInicial();
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo Renglon, debe de revisar los datos.", "error")
            return false
        }
    });
});
//Eliminar un Programa
function fnEliminarRenglon(RenglonID) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el renglon?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/Renglones/EliminaRenglon`,
                    method: "post",
                    data: JSON.stringify({
                        "RenglonID": RenglonID,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Renglon elimado correctamente", "success");
                        fnCargaInicial();
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}

$("#btnRegresarConsultaPlanes").click(function () {
    regresarConsultaPlanes()
})

function regresarConsultaPlanes() {
    //let QueryString = "?AnioID=" + vPlans 
    //if (proyecto2.length > 0) {
    //    QueryString = QueryString + "&proyecto=" + proyecto2
    //}
    window.location.href = "frmPlanesAnuales.aspx";
}



function fnReporteRenglon(Filtro) {
    //var QueryString = '?IdReporte=' + vIdReporte + '&Parameters=' + vAnioID + ',' + vNominaCorrel;
    opendialog("/VisorInformes.aspx?IdReporte=1147");
    //var url = "../VisorInformes.aspx" + QueryString;
    //window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes'); 
}

function opendialog(page, vtitle) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: vtitle,
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

