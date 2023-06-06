var vPlans = 0;
var vPlan = 0;
var vContratos = 0;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlans = urlParams.get("AnioID");
    console.log(vPlans);
    fnCargaInicial();
    $('#btnImprimir').click(function () {
        opendialog("/VisorInformes.aspx?IdReporte=12");
    })
   
        // Disable form submissions if there are invalid fields
        (function () {
            'use strict';
            window.addEventListener('load', function () {
                // Get the forms we want to add validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();
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
                        data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarTramo('${row.TramoID}')" title="Eliminar Tramo">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" onclick="fnModal('${row.TramoID}', '${row.RutaCode}', '${row.TramoCodigo}', '${row.TramoDesc}', '${row.TramoLong}', '${row.Activo}', '${row.Superficie}', '${row.Departamento}', '${row.KmDesde}', '${row.KmHasta}', '${row.FechaCreado}', '${row.FechaDesactivado}', '${row.Comentario}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Tramo">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    `
            }
        },

        {
            className: 'text-center',
            title: "ID",
            data: 'TramoID'
        },
        {
            className: 'text-center',
            title: "Código",
            data: 'TramoCodigo'
        },
        {
            className: 'text-center',
            title: "Descripción",
            data: 'TramoDesc'
        },
        {
            className: 'text-center',
            title: "Ruta",
            data: 'RutaCode'
        },
        {
            className: 'text-center',
            title: "Superficie",
            data: 'Superficie'
        },
        {
            className: 'text-center',
            title: "Departamento",
            data: 'Departamento'
        },
        {
            className: 'text-center',
            title: "Longitud",
            data: 'TramoLong'
        },
        {

            render: (val, _, row) => {

                data: 'Activo'
                let act_btns = ""
                return ` ${act_btns}
 
                         <td class="text-center">
                            <input type='checkbox' name='activado' id='chk' checked disabled="disabled">
                        `
            }
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
    $("#tramosviales-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/TramosViales/ObtenerTramos`))
}

$('#cmbanio').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaAnios`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbanio').append(val.map((val) => new Option(val.AnioID, val.AnioID))).trigger("change")
    }
})

$('#cmbanio-Act').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaAnios`,
    success: (val) => {
        let options = val.map((val) => new Option(val.AnioID, val.AnioID))
        $('#cmbanio-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$('#cmbRuta').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaRutas`,

    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbRuta').append(val.map((val) => new Option(val.RutaCode, val.RutaCode))).trigger("change")
    }
})

$('#cmbRuta-Act').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaRutas`,
    success: (val) => {
        console.log(val.RutaCode);
        let options = val.map((val) => new Option(val.RutaCode.trim(), val.RutaCode.trim()))
        console.log(options);
        $('#cmbRuta-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
$('#cmbDepartamento').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaDepartamentos`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbDepartamento').append(val.map((val) => new Option(val.DepartamentoNombre, val.DepartamentoID))).trigger("change")
    }
})
$('#cmbDepartamento-Act').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaDepartamentos`,
    success: (val) => {
        let options = val.map((val) => new Option(val.DepartamentoNombre, val.DepartamentoID))
        $('#cmbDepartamento-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$('#cmbSuperficie').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaSuperficie`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#cmbSuperficie').append(val.map((val) => new Option(val.SuperficieClaseNombre, val.SuperficioeClaseID))).trigger("change")
    }
})

$('#cmbSuperficie-Act').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaSuperficie`,
    success: (val) => {
        let options = val.map((val) => new Option(val.SuperficieClaseNombre, val.SuperficioeClaseID))
        $('#cmbSuperficie-Act').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
//Obterner el año del tramo
function fnObtTramo(TramoID) {
    $.ajax({
        url: `${urlbase}api/TramosViales/ObtenerUnTramo/${TramoID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            console.log(Datos.RutaCode);
            $('#cmbanio-Act').val(Datos.Anio);
            $('#cmbRuta-Act').val(Datos.RutaCode.trim());
            $('#cmbDepartamento-Act').val(Datos.DepartamentoID);
            $('#cmbSuperficie-Act').val(Datos.SuperficieClaseID);

        }
    })
}
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth(); //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
function fnModal(TramoID, RutaCode, TramoCodigo, TramoDesc, TramoLong, Activo, Superficie, Departamento, KmDesde, KmHasta, FechaCreado, FechaDesactivado, Comentario) {
    // console.log(RutaCode, Superficie, Departamento);

    var date = new Date(FechaCreado);
    var stringDate = moment(date).format(moment.HTML5_FMT.DATE);
    if (Activo == 'true') {
        $("#flexCheckDefault-Act").prop("checked", true);
    } else {
        $("#flexCheckDefault-Act").prop("checked", false);
    }
    fnObtTramo(TramoID);
    $("#txtIDTramo-Act").val(TramoID);
    // $("#cmbRuta-Act").val(RutaCode);
    $("#txtCodigoTramo-Act").val(TramoCodigo);
    $("#txtDescripcion-Act").val(TramoDesc);
    $("#txtLongitud-Act").val(TramoLong);
    $("#flexCheckDefault-Act").val(Activo);
    $("#cmbSuperficie-Act").val(Superficie);
    $("#cmbDepartamento-Act").val(Departamento);
    $("#txtkmdesde-Act").val(KmDesde);
    $("#txtkmhasta-Act").val(KmHasta);
    $("#txtfechacreacion-Act").val(stringDate);
    $("#txtfechadesactivado-Act").val(FechaDesactivado);
    $("#txtComentarios-Act").val(Comentario);
    //$("#cmbanio-Act").val(Anio);

    $("#exampleModalActualizar").modal('show');
}


//Insertar un nuevo Programa
$("#btnGuardarTramo").on("click", () => {
    let check = document.getElementById("flexCheckDefault").checked;
    var today = new Date();
    let data = {
        "RutaCode": $("#cmbRuta").val(),
        "TramoCodigo": $("#txtCodigoTramo").val(),
        "TramoDesc": $("#txtDescripcion").val(),
        "TramoLong": $("#txtLongitud").val(),
        "Activo": check,
        "SuperficieClaseID": $("#cmbSuperficie").val(),
        "DepartamentoID": $("#cmbDepartamento").val(),
        "KmDesde": $("#txtkmdesde").val(),
        "KmHasta": $("#txtkmhasta").val(),
        "FechaCreado": $("#txtfechacreacion").val(),
        "FechaDesactivado": $("#txtfechadesactivado").val(),
        "Comentario": $("#txtComentarios").val(),
        "UserName": usuario,
        "DateModify": today,
        "AnioID": $("#cmbanio").val(),
    };
    $.ajax({
        url: `${urlbase}/api/TramosViales/AgregarUnTramo`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Tramo insertado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Tramo creado correctamente", "success").then(function () {
                $("#ModalagregarTramos").modal('hide');
                limpiarControles();
            });
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "Ya existe un tramo con ese año.", "error")
            return false
        }
    });
});
//Actualizar un Programa
$("#btnGuardarTramoAct").on("click", () => {
    var today = new Date();
    let check = 0;
    if ($("#flexCheckDefault-Act").is(":checked")) {
        check = 'true'
    } else {
        check = 'false'
    }
    let data = {
        "TramoID": $("#txtIDTramo-Act").val(),
        "RutaCode": $("#cmbRuta-Act").val(),
        "TramoCodigo": $("#txtCodigoTramo-Act").val(),
        "TramoDesc": $("#txtDescripcion-Act").val(),
        "TramoLong": $("#txtLongitud-Act").val(),
        "Activo": check,
        "SuperficieClaseID": $("#cmbSuperficie-Act").val(),
        "DepartamentoID": $("#cmbDepartamento-Act").val(),
        "KmDesde": $("#txtkmdesde-Act").val(),
        "KmHasta": $("#txtkmhasta-Act").val(),
        "FechaCreado": $("#txtfechacreacion-Act").val(),
        "FechaDesactivado": $("#txtfechadesactivado-Act").val(),
        "Comentario": $("#txtComentarios-Act").val(),
        "UserName": usuario,
        "DateModify": today,
        "AnioID": $("#cmbanio-Act").val(),
    };
    $.ajax({
        url: `${urlbase}/api/TramosViales/ActualizarUnTramo`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Tramo actualizado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Tramo actualizado correctamente", "success").then(function () {
                $("#exampleModalActualizar").modal('hide');
                limpiarControles();
            });
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo Tramo, debe de revisar los datos.", "error")
            return false
        }
    });
});
//Eliminar un Programa
function fnEliminarTramo(TramoID) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el tramo?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/TramosViales/EliminarTramo`,
                    method: "post",
                    data: JSON.stringify({
                        "TramoID": TramoID,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Tramo elimado correctamente", "success");
                        fnCargaInicial()
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

function limpiarControles() {


    $("#txtCodigoTramo").val("")
    $("#txtDescripcion").val("")
    $("#txtLongitud").val("")
    $("#txtkmdesde").val("")
    $("#txtkmhasta").val("")
    $("#txtfechacreacion").val("")
    $("#txtfechadesactivado").val("")
    $("#txtComentarios").val("")

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

