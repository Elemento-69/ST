//función para alertar de uso de mayúsculas
const showMessage = () => {
    let message = document.getElementById('bloq-text');
    document.addEventListener('keyup', function (event) {
        if (event.shiftKey) {
            message.innerHTML = 'Estás utilizando mayúsculas';
        } else {
            message.innerHTML = ''
        }
    })
}

const showMessageCapsLock = () => {
    let message = document.getElementById('bloq-text');
    document.addEventListener('keydown', function (event) {
        if (event.getModifierState('CapsLock')) {
            message.innerHTML = 'Estás utilizando mayúsculas';
        } else {
            message.innerHTML = ''
        }
    })
}

window.addEventListener('load', showMessage);
window.addEventListener('load', showMessageCapsLock);

function fnNuevoPassStrong() {
    let password = $('#txtNuevoPass').val();
    var password_strength = document.getElementById("password-text");
    let NoCaracteres = password.length;

        //TextBox left blank.
        if (password.length == 0) {
            password_strength.innerHTML = "";
            return;
        }

        //Regular Expressions.
        var regex = new Array();
        regex.push("[A-Z]"); //Uppercase Alphabet.
        regex.push("[a-z]"); //Lowercase Alphabet.
        regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&-_¡¿.,+]"); //Special Character.

        var passed = 0;

        //Validate for each Regular Expression.
        for (var i = 0; i < regex.length; i++) {
            if (new RegExp(regex[i]).test(password)) {
                passed++;
            }
        }

        //Display status.
        var strength = "";
        switch (passed) {
            case 0:
                if (NoCaracteres < 8) {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>Débil, debe contener al menos 8 caracteres</small>";
                } else {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>La contraseña debe con</small>";
                }
                document.getElementById("ResetButton").disabled = true;
               
                break;
            case 1:
                if (NoCaracteres < 8) {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>Contraseña no aceptada, debe contener al menos 8 caracteres</small>";
                } else {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>La contraseña no cumple la recomendación</small>";
                }
                document.getElementById("ResetButton").disabled = true;
               
                break;
            case 2:
                if (NoCaracteres < 8) {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>Contraseña no aceptada, debe contener al menos 8 caracteres</small>";
                }
                document.getElementById("ResetButton").disabled = true;
                strength = "<small class='progress-bar bg-danger' style='width: 60%'>La contraseña no cumple la recomendación</small>";
                break;
            case 3:
                if (NoCaracteres < 8) {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>Contraseña no aceptada, debe contener al menos 8 caracteres</small>";
                }
                document.getElementById("ResetButton").disabled = true;
                strength = "<small class='progress-bar bg-danger' style='width: 60%'>La contraseña no cumple la recomendación</small>";
                break;
            case 4:
                if (NoCaracteres < 8) {
                    strength = "<small class='progress-bar bg-danger' style='width: 60%'>Contraseña no aceptada, debe contener al menos 8 caracteres</small>";
                    document.getElementById("ResetButton").disabled = true;
                } else {
                    document.getElementById("ResetButton").disabled = true;
                    strength = "<small class='progress-bar bg-success' style='width: 100%'>Fuerte,aceptada!</small>";
                }
               
                break;

        }
        password_strength.innerHTML = strength;

    }





function verificarPasswords() {

    nuevoPass = $('#txtNuevoPass').val();
    confirmacionPass = $('#txtReNewPass').val();

    if (nuevoPass != confirmacionPass) {

        // Si las constraseñas no coinciden mostramos un mensaje
        document.getElementById("error").classList.add("mostrar");

        return false;
    }

    else {

        document.getElementById("error").classList.remove("mostrar");

        document.getElementById("ok").classList.remove("ocultar");

        document.getElementById("ResetButton").disabled = false;

      

        return true;
    }

}

//función que valida sí se tiene carácteres especiales, minúscula, números y mayúscula.

const validacionCaracteres = (text) => {
    if (!/[A-Z]/.test(text)) {
        return false;
    }

    if (!/[a-z]/.test(text)) {
        return false;
    }

    if (!/[$@$!%*#?&-_¡¿.,+]/.test(text)) {
        return false;
    }
    if (!/[0-9]/.test(text)) {
        return false;
    }

    return true;
}

//función que valida sí tiene más de 8 caracteres sin espacios en blanco
const validacionLengthPassword = (texto) => {

    let passwordSinEspacios = texto.replace(/\s/g, '');

    if (passwordSinEspacios.length >= 8) {
        return true;
    } else {
        return false;
    }
}


function fnCambiarPassword() {

    var dataJSON = JSON.stringify({
        pPassActual: $('#txtPassActual').val(),
        pPssNew: $('#txtNuevoPass').val(),
    });



    if (validacionLengthPassword($('#txtNuevoPass').val()) === false) {
        Swal.fire("", "La contraseña no tiene 8 caracteres o ha dejado un espacio en blanco", "error").then(function () {
            
                return false;
        });
       
    } else {

        if (validacionCaracteres($('#txtReNewPass').val()) === false || validacionCaracteres($('#txtNuevoPass').val()) == false) {
            Swal.fire("", "La contraseña necesita al menos una mayúscula, una minúscula, un número y un carácter especial como: $@$!%*#?&-_¡¿.,+", "error").then(function () {
                return false;

            });

        } else {

            $.ajax({
                type: "POST",
                url: "ReiniciarPassword.aspx/fCambiarPass",
                data: dataJSON,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var vRespuestaJSON = JSON.parse(data.d);
                    // $.LoadingOverlay("hide");
                    if (vRespuestaJSON.dioError == true) {

                        Swal.fire("", vRespuestaJSON.descripcionError + " o la contraseña actual no es correcta", "error").then(function () {
                            window.location.assign('Login.aspx');

                        });
                    }
                    else {

                        Swal.fire("Éxito", vRespuestaJSON.descripcionMensaje, "success").then(function () {
                            window.location.assign('Login.aspx');

                        });

                    }
                },
                failure: function (response) {
                    Swal.fire("", "error", "error");
                }
            });


        }
    }

 
}