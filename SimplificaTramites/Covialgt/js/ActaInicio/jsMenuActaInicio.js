$(document).ready(function () {
    const cadena = usuario;
    const regex = /^(\d{4})([a-zA-Z].*)-(\d{3})$/;
    const matches = cadena.match(regex);
    if (matches) {
        // Ocultar el elemento li con id "ValidarActaInicio"
        $("#ValidarActaInicio").hide();
    } 
   
});
