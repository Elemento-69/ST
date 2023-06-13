let proyectosUsuariosTable
let destinatariosTable
let rol_usuario = ""
$(document).ready(function () {
	(function () {
        'use strict';
        window.addEventListener('load', function () {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation')
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
        }, false)
    })()
    $("body").keydown("input", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $(event.currentTarget.dataset.submitbutton).click()
            return false;
        }
    });
    $("select").select2({ theme: "bootstrap" })
    fnCargarRoles()
    destinatariosTable = fnInicializaTableDestinatarios()
    setTableProyectosUsuariosMensajeria()
    $("#btnBusqueda").click(function () {
        setTableProyectosUsuariosMensajeria()
    })
    $("#btnInsertarRol").click(function () {
        let rol = $("#rolesSelect").val()
        // Verificar si ya ha sido insertado
        let existe = false
        destinatariosTable.rows().eq(0).each( function ( index ) {
            let row = destinatariosTable.row(index)
            let data = row.data()
            if (data[1] == rol){
                existe = true
            }
        } )
        if (existe){
            return
        }
        let tr = $(`<tr>
            <td class="spacer"></td>
            <td>${rol}</td>
            <td class="spacer"></td>
        </tr>`)
        tr.data("value", "rol")
        tr.data("llave", rol)
        destinatariosTable.row.add(tr).draw(true)
    })
    $("#btnQuitarDestinatario").click(function () {
        // let aRetirar = destinatariosTable.rows(".selected").data()
        // if (aRetirar.length == 0){
        //     console.log("Sin poder retirar")
        //     return
        // }
        destinatariosTable.rows(".selected").remove().draw(true)
    })
    $("#btnEnviar").click(async function () {
        let mensaje = $("#mensajeInput").val()
        let titulo = $("#tituloInput").val()
        let destinatariosEq = destinatariosTable.rows().eq(0)
        if (destinatariosEq.length == 0){
            Swal.fire("Atención", "Debe elegir destinatarios", "error")
            return
        }
        if (mensaje.length == 0){
            Swal.fire("Atención", "Debe ingresar un mensaje", "error")
            return
        }
        if (titulo.length == 0){
            Swal.fire("Atención", "Debe ingresar un titulo", "error")
            return
        }
        let data = {
            UsuarioID_From: usuario,
            CuerpoMensaje: mensaje,
            Estimacion: $("#customCheck1").prop("checked"),
            Otros: $("#customCheck2").prop("checked"),
            Titulo: titulo
        }
        let MensajeDeID
        try {
            MensajeDeID = await fnAgregarMensajesDe(data)
        } catch(e){
            console.log("jsEnvioMensajes.js:93", e)
        }
        let lstDestFinal = new Array()
        let soloRoles = new Array()
        destinatariosEq.each(index => {
            let row = destinatariosTable.row(index)
            let tr = $(row.node())
            switch(tr.data("value")){
                case "rol":
                    soloRoles.push(tr.data("llave"))
                    break
                case "usuario":
                    lstDestFinal.push(tr.data("llave"))
                    break
            }
        })
        if (soloRoles.length > 0){
            try {
                let usuarios = await fnCargarUsuariosPorRol(soloRoles)
                lstDestFinal = lstDestFinal.concat(usuarios)
            } catch(e){
                console.log("jsEnvioMensajes.js:113", e)
            }
        }
        let error = ""
        $("#lblEstadoMensaje").html(error)
        try {
            let [usuariosPulidos, usuarioRemitente, rechazados] = await fnPulirUsuarios({lstDestFinal})
            let respuestaPara = await fnAgregarMensajesParaVarios({
                destinatarios: usuariosPulidos.map(up => up.UsuarioID_To),
                UserName: usuarioRemitente,
                MensajeDeID
            })
            error = rechazados + respuestaPara + " Mensaje enviado satisfactoriamente. <br/>"
            $("#lblEstadoMensaje").html(error)
        } catch(e){
            console.log("jsEnvioMensajes.js:124", e)
        }
    })
    $('#proyectosUsuarios-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected').siblings().removeClass('selected')
    })
    $('#destinatarios-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected')
    })
})
function fnAgregarUsuario(campo1, campo2, campo3){
    // Verificar si ya ha sido insertado
    let existe = false
    destinatariosTable.rows().eq(0).each( function ( index ) {
        let row = destinatariosTable.row(index)
        let tr = $(row.node())
        if (tr.data("llave") == campo1){
            existe = true
        }
    } )
    if (existe){
        return
    }
    let tr = $(`<tr>
        <td class="spacer"></td>
        <td>${campo2} ${campo3}</td>
        <td class="spacer"></td>
    </tr>`)
    tr.data("value", "usuario")
    tr.data("llave", campo1)
    destinatariosTable.row.add(tr).draw(true)
}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informe de Deuda",
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
function fnCargarRoles() {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    $.ajax({
        type: "POST",
        url: "../Mensajeria/EnvioMensajes.aspx/fCargarRoles",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                swal("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                if (vRespuestaJSON.tablaDevuelta.length > 0){
                    let rol_usuario = vRespuestaJSON.tablaDevuelta[0].rol_usuario
                    let cols = rol_usuario.split("|").map((rol) => `<option value="${rol}">${rol}</option>`)
                    $("#rolesSelect").append(cols.join("")).trigger("change")
                }
                $.LoadingOverlay("hide");
            }

        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
function fnCargarUsuariosPorRol(roles) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "../Mensajeria/EnvioMensajes.aspx/fCargarUsuariosPorRol",
            data: JSON.stringify({
                roles,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var vRespuestaJSON = JSON.parse(data.d);
                if (vRespuestaJSON.dioError == true) {
                    reject(vRespuestaJSON.descripcionMensaje)
                } else {
                    if (vRespuestaJSON.tablaDevuelta.length > 0){
                        let usuario = vRespuestaJSON.tablaDevuelta[0].usuario
                        let usuarios = usuario.split("|")
                        resolve(usuarios)
                    } else {
                        reject("Sin efecto")
                    }
                }
            },
            failure: function (response) {
                reject(jQuery.parseJSON(request.responseText).Message)
            }
        });
    })
}
function setTableProyectosUsuariosMensajeria(){
    let parametro = $("#busquedaInput").val()
    $.ajax({
        url: `${urlbase}api/Mensajeria/ObtenertblProyectosUsuariosMensajeria/${parametro}`,
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            if (proyectosUsuariosTable){
                proyectosUsuariosTable.destroy()
                proyectosUsuariosTable.clear()
            }
            let tbody = $("#proyectosUsuarios-tbody")
            tbody.html(null)
            let rows = val.map((item) => {
                let tr = $(`<tr>
                    <td class="spacer"></td>
                    <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Agregar" data-placement="top" style="cursor:pointer" onclick="fnAgregarUsuario('${item.campo1}', '${item.campo2}', '${item.campo3}')">
                    <i class="fas fa-user-plus fa-lg fa-fw"></i></td>
                    <td>${item.campo1}</td>
                    <td>${item.campo2}</td>
                    <td>${item.campo3}</td>
                    <td>${item.campo4}</td>
                    <td>${item.campo5}</td>
                    <td class="spacer"></td>
                </tr>`)
                tr.data("item", item)
                return tr
            })
            tbody.append(rows)
            proyectosUsuariosTable = fnInicializaTableProyectosUsuarios()
        }
    })
}
function fnInicializaTableProyectosUsuarios() {
    return $('#proyectosUsuarios-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin usuarios para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Usuarios",
            "infoEmpty": "Mostrando 0 de 0 de 0 Usuarios",
            "infoFiltered": "(Filtrado de _MAX_ total Usuarios)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Usuarios",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay usuarios encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function fnInicializaTableDestinatarios() {
    return $('#destinatarios-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin destinatario para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Destinatarios",
            "infoEmpty": "Mostrando 0 de 0 de 0 Destinatarios",
            "infoFiltered": "(Filtrado de _MAX_ total Destinatarios)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Destinatarios",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay destinatarios encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function fnAgregarMensajesDe(data){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/Mensajeria/AgregarMensajesDe`,
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                resolve(val)
            },
            failure: () => {
                reject("fnAgregarMensajesDe: Sin efecto")
            }
        })
    })
}
function fnAgregarMensajesParaVarios(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: `${urlbase}api/Mensajeria/AgregarMensajesParaVarios`,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: function (val) {
                resolve(val)
            },
            failure: function (response) {
                reject("fnAgregarMensajesParaVarios: Sin efecto")
            }
        });
    })
}
function fnPulirUsuarios(data){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "../Mensajeria/EnvioMensajes.aspx/fPulirUsuarios",
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: function (data) {
                var vRespuestaJSON = JSON.parse(data.d);
                if (vRespuestaJSON.dioError == true) {
                    reject(vRespuestaJSON.descripcionMensaje)
                } else {
                    if (vRespuestaJSON.datoDevueltoString.length > 0){
                        resolve([vRespuestaJSON.tablaDevuelta, vRespuestaJSON.datoDevueltoString, vRespuestaJSON.descripcionMensaje])
                    } else {
                        reject("fnPulirUsuarios: Sin efecto")
                    }
                }
            },
            failure: function (response) {
                reject("fnPulirUsuarios: Sin efecto")
                // reject(jQuery.parseJSON(request.responseText).Message)
            }
        })
    })
}