let href = window.location.href;
var url = new URL(href);
var parameter = url.searchParams.get('name');
let empleado = null;
let first = true;
if (parameter) {
    $.ajax({
        url: `${urlbase}api/Usuarios/ObtenerPersonaEdicion/${parameter}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (result) => {
            if (result && result.length > 0) {
                empleado = result[0];
                first = true;
                $("#dependencia").val(empleado.DependenciaID);
                $("#cargo").val(empleado.CargoID);
                $("#titulo").val(empleado.Titulo);
                $("#primerNombre").val(empleado.PrimerNombre);
                $("#segundoNombre").val(empleado.SegundoNombre);
                $("#primerApellido").val(empleado.PrimerApellido);
                $("#segundoApellido").val(empleado.SegundoApellido);
                $("#nombramiento-dp").datetimepicker('date', new Date(empleado.Nombramiento));
                $("#genero").val(empleado.Sexo);
                $("#fechaNacimiento-dp").datetimepicker('date', new Date(empleado.FechaNacimiento));
                $("#fechaContratacion-dp").datetimepicker('date', new Date(empleado.FechaContratacion));
                $("#telefonos").val(empleado.Telefonos);
                $("#checkAprobado").prop("checked", empleado.Aprobado);
                LoadDependencias();
            } else {
                Swal.fire({ icon: 'error', title: "Error", text: "Error al obtener los datos del empleado." });
            }
        },
        error: (e) => {
            var message = e.responseJSON.message || "Error al obtener los datos del empleado.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    });
    $("#title-empleado").text("Actualizar un empleado");
    $("#buttons").html(`
        <a role="button" href="GestionUsuario"
            class="btn btn-outline-dark text-uppercase fs-7 px-md-5 py-2 mr-4" id="btn-cancelar">Cancelar</a>
        <button type="button" id="editar" class="btn btn-primary text-uppercase fs-7 px-md-5 py-2">Actualizar Datos</button>
    `)
} else {
    LoadDependencias();
}

function LoadDependencias() {
    $.ajax({
        url: `${urlbase}api/Usuarios/ObtenerLIstaDependencia`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.DependenciaNombre, val.DependenciaID));
            $('#dependencia').append(options);
            if (empleado)
                $("#dependencia").val(empleado.DependenciaID);
            $("#dependencia").trigger("change");
        },
        error: () => { }
    });
}

$("#dependencia").change(() => {
    LoadCargos();
});

function LoadCargos() {
    var dependencia = $("#dependencia").val().trim();
    $.ajax({
        url: `${urlbase}api/Usuarios/ObtenerListaCatCargos/${dependencia}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.CargoDesc, val.CargoID));
            $('#cargo').html(options);
            if (empleado && first) {
                $("#cargo").val(empleado.CargoID);
                first = false;
            }
            $('#cargo').trigger("change");
        },
        error: () => { }
    });
}

function Pad(value, length = 2) {
    return (value.toString().length < length) ? Pad("0" + value, length) : value;
}

$("#guardar").click(() => {
    if (Page_ClientValidate('valempleado')) {
        var data = {
            "DependenciaID": $("#dependencia").val(),
            "CargoID": $("#cargo").val(),
            "Titulo": $("#titulo").val(),
            "PrimerNombre": $("#primerNombre").val(),
            "SegundoNombre": $("#segundoNombre").val(),
            "PrimerApellido": $("#primerApellido").val(),
            "SegundoApellido": $("#segundoApellido").val(),
            "Nombramiento": $("#nombramiento-dp").datetimepicker("date").format("DD/MM/YYYY"),
            "Sexo": $("#genero").val(),
            "FechaNacimiento": $("#fechaNacimiento-dp").datetimepicker("date").format("YYYY-MM-DDTHH:mm:ss.sss") + "Z",
            "FechaContratacion": $("#fechaContratacion-dp").datetimepicker("date").format("YYYY-MM-DDTHH:mm:ss.sss") + "Z",
            "Telefonos": $("#telefonos").val(),
            "UserName": usuario,
            "Aprobado": $("#checkAprobado").prop("checked")
        };
        $.ajax({
            url: `${urlbase}api/Usuarios/AgregarPersonal`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            type: "POST",
            data: JSON.stringify(data),
            success: (result) => {
                $("form").trigger("reset");
                LoadDependencias();
                $("#fechaNacimiento-dp, #fechaContratacion-dp, #nombramiento-dp").datetimepicker('date', new Date());
                Swal.fire({ icon: 'success', title: 'Se agrego correctamente.', showConfirmButton: false, timer: 1000 });
            },
            error: (e) => {
                var message = e.responseJSON.message || "Error al agregar el empleado.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});

function CurrentDate() {
    var fecha = new Date();
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear();
    return `${Pad(month, 2)}/${Pad(day, 2)}/${year}`;
}

$(document).ready(function () {
    $("#nombramiento-dp").datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'es',
        defaultDate: CurrentDate()
    });
    $("#fechaContratacion-dp, #fechaNacimiento-dp").datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'es',
        defaultDate: new Date()
    });
});

$("#buttons").on("click", "#editar", () => {
    if (Page_ClientValidate('valempleado')) {
        var data = {
            "UsuarioID": empleado.UsuarioID,
            "DependenciaID": $("#dependencia").val(),
            "CargoID": $("#cargo").val(),
            "Titulo": $("#titulo").val(),
            "PrimerNombre": $("#primerNombre").val(),
            "SegundoNombre": $("#segundoNombre").val(),
            "PrimerApellido": $("#primerApellido").val(),
            "SegundoApellido": $("#segundoApellido").val(),
            "Nombramiento": $("#nombramiento-dp").datetimepicker("date").format("DD/MM/YYYY"),
            "Sexo": $("#genero").val(),
            "FechaNacimiento": $("#fechaNacimiento-dp").datetimepicker("date").format("YYYY-MM-DDTHH:mm:ss.sss") + "Z",
            "FechaContratacion": $("#fechaContratacion-dp").datetimepicker("date").format("YYYY-MM-DDTHH:mm:ss.sss") + "Z",
            "Telefonos": $("#telefonos").val(),
            "UserName": empleado.UserName,
            "Aprobado": $("#checkAprobado").prop("checked")
        };
        $.ajax({
            url: `${urlbase}api/Usuarios/ActualizarPersonal`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            type: "POST",
            data: JSON.stringify(data),
            success: (result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Se edito correctamente.'
                }).then(() => {
                    window.location.href = `GestionUsuario`;
                });
            },
            error: (e) => {
                var message = e.responseJSON.message || "Error al editar el empleado.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});
