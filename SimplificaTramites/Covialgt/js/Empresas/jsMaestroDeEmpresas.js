vPlan = 0;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    fnCargaInicial();
    fnLimpiarCampos();
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
                        data-content="Eliminar" data-placement="top"  onclick="fnEliminarEmpresa('${row.EmpresasNIT}');" style="cursor:pointer" title="Eliminar Empresa">
                        <i class="fas fa-trash fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" onclick="fnActualizarModal('${row.EmpresasNIT}', '${row.Nombre}', '${row.Representante}', '${row.DireccionPrincipal}', '${row.TelefonosPrincipales}', '${row.CorreoE}', '${row.OrdenNo}', '${row.FechaRecep}', '${row.Departamento}', '${row.ColegiadoNum}', '${row.Telefono2}', '${row.Telefono3}', '${row.PrecalificadoNum}', '${row.PrecalificadoActivo}', '${row.dpi}', '${row.Municipio}', '${row.Grupo}', '${row.IngenieroNombre}', '${row.Observaciones}', '${row.TipoEmpresa}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Empresa">
                        <i class="fas fa-edit fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnLlenarCampos('${row.EmpresasNIT}', '${row.Nombre}', '${row.Representante}', '${row.Grupo}', '${row.PrecalificadoNum}', '${row.PrecalificadoActivo}' );" style="cursor:pointer" data-dismiss="modal"  title="Ver Datos de la Empresa">
                        <i class="fas fa-info fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnIrConsultaSanciones('${row.EmpresasNIT}');" style="cursor:pointer" data-dismiss="modal"  title="Ver Registros de Sanciones de Proyecto">
                        <i class="fas fa-thumbs-down fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnIrCapacidadEconomica('${row.EmpresasNIT}');" style="cursor:pointer" data-dismiss="modal"  title="Ver Registros de Capacidad Económica">
                        <i class="fas fa-money-bill-alt fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnIrRegrsitroEspecialidades('${row.EmpresasNIT}');" style="cursor:pointer" data-dismiss="modal"  title="Ver Registro de Especialidades">
                        <i class="fas fa-folder fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnIrRegrsitroEmpresasOpciones('${row.EmpresasNIT}');" style="cursor:pointer" data-dismiss="modal"  title="Ver Registros de Preferencia de Proyectos">
                        <i class="fas fa-file fa-sm fa-fw"></i>
                    </button>`
            }
        },

        {
            className: 'text-center',
            data: 'EmpresasNIT'
        },
        {
            className: 'text-center',
            data: 'Nombre'
        },
        {
            className: 'text-center',
            data: 'Representante'
        },
        {
            className: 'text-center',
            data: 'DireccionPrincipal'
        },
        {
            className: 'text-center',
            data: 'TelefonosPrincipales'
        },
        {
            className: 'text-center',
            data: 'CorreoE'
        },
        {
            className: 'text-center',
            data: 'OrdenNo'
        },
        {
            className: 'text-center',
            data: "FechaRecep"
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
        order: [[0, "asc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#maestrodeempresas-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/MaestroEmpresas/ObtenerEmpresa`))
}

function fnLlenarCampos(EmpresasNIT, Nombre, Representante, Grupo, PrecalificadoNum, PrecalificadoActivo) {
    $("#txtNit").val(EmpresasNIT);
    $("#txtNombre").val(Nombre);
    $("#txtRepresentante").val(Representante);
    $("#txtGrupo").val(Grupo);
    $("#txtNumeroPrecalificado").val(PrecalificadoNum);
    console.log(PrecalificadoActivo);
    if (PrecalificadoActivo == 'true') {
        $("#precalificado-true").prop("checked", true);
    } else {
        $("#precalificado-true").prop("checked", false);
    }
    if (PrecalificadoActivo == 'false') {
        $("#precalificado-false").prop("checked", true);
    } else {
        $("#precalificado-false").prop("checked", false);
    }
    if (PrecalificadoActivo === 'null') {
        $("#precalificado-todos").prop("checked", true);
    } else {
        $("#precalificado-todos").prop("checked", false);
    }
    $('#cmbproyectosempresa').find("option").remove()
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerProyectosXEmpresa/${EmpresasNIT}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#cmbproyectosempresa').append(val.map((val) => new Option(val.AnioProyecto, val.AnioProyecto))).trigger("change")
        }
    })
}

function fnLimpiarCampos() {
    $("#txtNit").val("");
    $("#txtNombre").val("");
    $("#txtRepresentante").val("");
    $("#txtGrupo").val("");
    $("#txtNumeroPrecalificado").val("");
}

$("#btnIrDashboard").click(function () {
    irDashboard()
})

function irDashboard() {
    let AnioProyecto = $('#cmbproyectosempresa').val();
    let QueryString = "?AnioProyecto=" + AnioProyecto
   
    window.location= "../default.aspx" + QueryString;
}
function fnIrRegrsitroEspecialidades(EmpresaNIT) {
    let QueryString = "?EmpresaNIT=" + EmpresaNIT
    window.location = "../Ejecucion/frmRegesp.aspx" + QueryString;
}

function fnIrRegrsitroEmpresasOpciones(EmpresaNIT) {
    let QueryString = "?EmpresaNIT=" + EmpresaNIT
    window.location = "../Ejecucion/frmEmpOpciones.aspx" + QueryString;
}

function fnIrConsultaSanciones(EmpresaNIT) {
    let vieneregistro = 3;
    let QueryString = "?EmpresaNIT=" + EmpresaNIT + "?VieneRegistro=" + vieneregistro
    window.location = "../Ejecucion/ConsultaDeSanciones.aspx" + QueryString;
}

function fnIrCapacidadEconomica(EmpresaNIT) {
    let QueryString = "?EmpresaNIT=" + EmpresaNIT
    window.location = "frmCapacidadEconomica.aspx" + QueryString;
}

//Eliminar Empresa
function fnEliminarEmpresa(EmpresaNIT) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar la empresa?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/MaestroEmpresas/EliminarEmpresa`,
                    method: "post",
                    data: JSON.stringify({
                        "EmpresaNIT": EmpresaNIT,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Empresa elimada correctamente", "success");
                        fnCargaInicial()
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + "No se puede eliminar le empresa porque tiene proyectos asociados", "error");
                    }
                })
            }
        });
}
function fnModalAgregarEmpresa() {
    //console.log(AnioID, PlanAnualNombre);
    //$("#plan-anioAct").val(AnioID);
    //$("#plan-nombreAct").val(PlanAnualNombre);
    $('#ModalAgregEmpresa').modal('show');
}


$('#departamento').find("option").remove()
$.ajax({
    url: `${urlbase}api/MaestroEmpresas/ObtenerListaDepartamentos`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#departamento').append(val.map((val) => new Option(val.DepartamentoNombre, val.DepartamentoID))).trigger("change")
        $('#cedula').append(val.map((val) => new Option(val.CedulaCodigo, val.DepartamentoID))).trigger("change")
    }
})

$("#departamento").on("change.select2", ({ currentTarget }) => {
    let depart = $("#departamento").val()
    $('#municipio').find("option").remove()
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerListaMunicipios/${depart}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#municipio').append(val.map((val) => new Option(val.MunicipioNombre, val.MunicipioID))).trigger("change")
        }
    })
})

    $("#tipoempresa").on("change", ({ currentTarget }) => {
        let tipo = $("#tipoempresa").val();
    console.log(tipo);
    if (tipo == 'E') {
        // $("#ingresponsable").disabled = true;
        document.getElementById("ingresponsable").disabled = true;
        document.getElementById("numcolegiado").disabled = true;
    } else {
        document.getElementById("ingresponsable").disabled = false;
        document.getElementById("numcolegiado").disabled = false;
    }
    })

// Insertar datos con el boton GUARDAR
$("#btnGuardarEmpresa").on("click", () => {
    let check = document.getElementById("flexCheckDefault").checked;
    var today = new Date();
    let data = {
        
        "EmpresaNIT":           $("#nit").val(),
        "Nombre":               $("#empresaosociedad").val(),
        "Representante":        $("#representante").val(),
        "DireccionPrincipal":   $("#direccion").val(),
        "TelefonosPrincipales": $("#telefono1").val(),
        "CorreoE":              $("#email").val(),
        "UserName":             usuario,
        "DateModify":           today,
        "OrdenNo":              $("#numrecepcion").val(),
        "FechaRecep":           $("#fecha").val(),
        "Departamento":         $("#departamento").val(),
        "ColegiadoNum":         $("#numcolegiado").val(),
        "Telefono2":            $("#telefono2").val(),
        "Telefono3":            0,
        "PrecalificadoNum":     $("#nurgprecalificado").val(),
        "PrecalificadoActivo":  check,
        "dpi": $("#registro").val(),
        "Municipio":            $("#municipio").val(),
        "Grupo":                $("#grupo").val(),
        "IngenieroNombre":      $("#ingresponsable").val(),
        "Observaciones":        $("#observaciones").val(),
        "TipoEmpresa":          $("#tipoempresa").val(),
    };

    $.ajax({
        url: `${urlbase}/api/MaestroEmpresas/AgregarEmpresa`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Empresa ingresada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Empresa creada correctamente", "success").then(function () {
                $("#ModalAgregEmpresa").modal('hide')
                fnLimpiarCampos();
            });
           
        },
        error: function (response) {
            //swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            Swal.fire("Error", "No se puede Agregar la Empresa, ya existe una con ese NIT.", "error")
            return false
        }
    });
});

function fnLimpiarCampos() {
    $("#nit").val(""),
        $("#empresaosociedad").val(""),
             $("#representante").val(""),
                $("#direccion").val(""),
                    $("#telefono1").val(""),
                        $("#email").val(""),
                            $("#numrecepcion").val(""),
                                $("#fecha").val(""),
                                    $("#departamento").val(""),
                                        $("#numcolegiado").val(""),
                                            $("#telefono2").val(""),
                                               // $("#representante").val(""),
                                                    $("#nurgprecalificado").val(""),
                                                        $("#flexCheckDefault").val(""),
                                                                $("#registro").val(""),
                                                                    $("#municipio").val(""),
                                                                        $("#grupo").val(""),
                                                                            $("#ingresponsable").val(""),
                                                                                $("#observaciones").val(""),
                                                                                    $("#tipoempresa").val("")
}

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth(); //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

//console.log(dateToYMD(new Date(2017, 10, 5))); // Nov 5

function fnActualizarModal(EmpresasNIT, Nombre, Representante, DireccionPrincipal, TelefonosPrincipales, CorreoE, OrdenNo, FechaRecep, Departamento, ColegiadoNum, Telefono2, Telefono3, PrecalificadoNum, PrecalificadoActivo, dpi, Municipio, Grupo, IngenieroNombre, Observaciones, TipoEmpresa,) {
    
    var parts = FechaRecep.split('/');
    let fechas = dateToYMD(new Date(parts[2], parts[1], parts[0])); // Nov 5
    console.log(fechas);
    console.log(FechaRecep);
    if (TipoEmpresa == 'E') {
        // $("#ingresponsable").disabled = true;
        document.getElementById("ingresponsable-Act").disabled = true;
        document.getElementById("numcolegiado-Act").disabled = true;
    } else {
        document.getElementById("ingresponsable-Act").disabled = false;
        document.getElementById("numcolegiado-Act").disabled = false;
    }
                $("#nit-Act").val(EmpresasNIT),
                $("#empresaosociedad-Act").val(Nombre),
                $("#representante-Act").val(Representante),
                $("#direccion-Act").val(DireccionPrincipal),
                $("#telefono1-Act").val(TelefonosPrincipales),
                $("#email-Act").val(CorreoE),
                $("#numrecepcion-Act").val(OrdenNo),
                $("#fecha-Act").val(fechas),
                $("#departamento-Act").val(Departamento),
                $("#numcolegiado-Act").val(ColegiadoNum),
                $("#telefono2-Act").val(Telefono2),
                $("#nurgprecalificado-Act").val(PrecalificadoNum),
                $("#flexCheckDefault-Act").val(PrecalificadoActivo),
                $("#registro-Act").val(dpi),
                $("#municipio-Act").val(Municipio),
                $("#grupo-Act").val(Grupo),
                $("#ingresponsable-Act").val(IngenieroNombre),
                $("#observaciones-Act").val(Observaciones),
                $("#tipoempresa-Act").val(TipoEmpresa),
        $('#departamento-Act').find("option").remove()
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerListaDepartamentos`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#departamento-Act').append(val.map((val) => new Option(val.DepartamentoNombre, val.DepartamentoID))).trigger("change")
            $('#cedula-Act').append(val.map((val) => new Option(val.CedulaCodigo, val.DepartamentoID))).trigger("change")
        }
    })

    $("#departamento-Act").on("change.select2", ({ currentTarget }) => {
        let depart = $("#departamento-Act").val()
        $('#municipio-Act').find("option").remove()
        $.ajax({
            url: `${urlbase}api/MaestroEmpresas/ObtenerListaMunicipios/${depart}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#municipio-Act').append(val.map((val) => new Option(val.MunicipioNombre, val.MunicipioID))).trigger("change")
            }
        })
    })
            $("#ModalActualizarEmpresa").modal('show');
}

$("#btnActualizarEmpresa").on("click", () => {
    let check = document.getElementById("flexCheckDefault").checked;
    var today = new Date();
    let data = {
        "EmpresaNIT": $("#nit-Act").val(),
        "Nombre": $("#empresaosociedad-Act").val(),
        "Representante": $("#representante-Act").val(),
        "DireccionPrincipal": $("#direccion-Act").val(),
        "TelefonosPrincipales": $("#telefono1-Act").val(),
        "CorreoE": $("#email-Act").val(),
        "UserName": usuario,
        "DateModify": today,
        "OrdenNo": $("#numrecepcion-Act").val(),
        "FechaRecep": $("#fecha-Act").val(),
        "Departamento": $("#departamento-Act").val(),
        "ColegiadoNum": $("#numcolegiado-Act").val(),
        "Telefono2": $("#telefono2-Act").val(),
        "Telefono3": 0,
        "PrecalificadoNum": $("#nurgprecalificado-Act").val(),
        "PrecalificadoActivo": check,
        "dpi": $("#registro-Act").val(),
        "Municipio": $("#municipio-Act").val(),
        "Grupo": $("#grupo-Act").val(),
        "IngenieroNombre": $("#ingresponsable-Act").val(),
        "Observaciones": $("#observaciones-Act").val(),
        "TipoEmpresa": $("#tipoempresa-Act").val(),
    };
    $.ajax({
        url: `${urlbase}/api/MaestroEmpresas/ActualizarEmpresa`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Empresa actualizada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Empresa actualizada correctamente", "success").then(function () {
                $("#ModalActualizarEmpresa").modal('hide');
                fnCargaInicial()
            });
           
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo la empresa, alguno de los datos son incorrectos.", "error")
            return false
        }
    });
});