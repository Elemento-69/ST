var vToken;
var vUsuarioActual;
var vDatosProyectos;
var vProyectoSeleccionado;
var vFotografias;
var objFotosEjecucionChk = [];
var objFotosAdminChk = [];
var proxyurl;
var baseURL = '';
var vFechaInicioProyecto;
var vFechaFinProyecto;
var vRolesUsuario = [];
var vPlanAnualS = null;
var vProgramaS = null;
var vVerificarSupervisor;
var vAnioSeleccionado;
var vProyectoCodigoSeleccionado;
$(document).ready(function () {


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



  

    fnConsultarToken();
    // al seleccionar un plan anual, carga los programas

    //cambios entre fechas

    //Fechas iniciales
    $("#dtDesde").blur(function () {
        var fInicial = $("#dtDesde").val();
        $("#desde").val(fInicial);
        $("#desdeAdmon").val(fInicial);
    });
    $("#dtHasta").blur(function () {
        var ff = $("#dtHasta").val();
        $("#hasta").val(ff);
        $("#hastaAdmon").val(ff);
    });

    //fechas supervisión
    $("#desde").blur(() => {
        var fInicialSup = $("#desde").val();
        $("#dtDesde").val(fInicialSup);
        $("#desdeAdmon").val(fInicialSup);
    });
    $("#hasta").blur(() => {
        var fFinalSup = $("#hasta").val();
        $("#dtHasta").val(fFinalSup);
        $("#hastaAdmon").val(fFinalSup);
    });

    //fecha administración
    $("#desdeAdmon").blur(() => {
        var fInicialAdmon = $("#desdeAdmon").val();
        $("#dtDesde").val(fInicialAdmon);
        $("#desde").val(fInicialAdmon);
    });
    $("#hastaAdmon").blur(() => {
        var fFinalAdmon = $("#hastaAdmon").val();
        $("#hasta").val(fFinalAdmon);
        $("#dtHasta").val(fFinalAdmon);
    });

    $("#cmbTramos").change(function () {
        var vTramoIDSeleccionado = $('#cmbTramos').val()
        $('#FiltroTramo').val(vTramoIDSeleccionado)
        $('#FiltroTramoAdmon').val(vTramoIDSeleccionado)
    });
    $("#cmbRenglones").change(function () {
        var vRenglonSeleccionado = $('#cmbRenglones').val()

        if ($("#FiltroRenglones option[value='" + vRenglonSeleccionado + "']").length > 0) {
            $('#FiltroRenglones').val(vRenglonSeleccionado)
        }

    
    });
    $("#cbmPlanAnual").change(function () {
        var vPlanID = $('#cbmPlanAnual').val()
        if (vPlanID !== "") {
            limpiarSelect('cmbPrograma');
            limpiarSelect('Proyecto');
            $('#Descripcion2').val('')
            fnCargarProgramas(vPlanID)
        }
        
    });
    //al seleccionar el programa carga los proyectos
    $("#cmbPrograma").change(function () {
        var vPlanID = $('#cbmPlanAnual').val()
        var vProgramaID = $('#cmbPrograma').val()
        if ((vPlanID !== null) && (vProgramaID !== null) && (vPlanID !== '') && (vProgramaID !== '')) {
            fnCargarProyectosXPrograma(vPlanID, vProgramaID)
        }
       
    });
    $("#Proyecto").change(function () {
        if (vVerificarSupervisor) {
            vAnioSeleccionado = $('#Proyecto').val().split(',')[0]
            vProyectoCodigoSeleccionado = $('#Proyecto').val().split(',')[1]
        }
        else {
            vAnioSeleccionado = $('#cbmPlanAnual').val()
            vProyectoCodigoSeleccionado = $('#Proyecto').val()
        }
        //var vProyectoCodigo = $('#Proyecto').val()
        //var vPlanID = $('#cbmPlanAnual').val()


        vProyectoSeleccionado = getGilteredBy(vDatosProyectos, 'ProyectoCodigo', vProyectoCodigoSeleccionado)
        var vDescripcion = vProyectoSeleccionado[0].ProyectoDescripcion;
        var vProyecto = vProyectoSeleccionado[0].ProyectoCodigo;
        vFechaInicioProyecto = vProyectoSeleccionado[0].FechaInicioFisico;
        vFechaFinProyecto = vProyectoSeleccionado[0].FechaFinaModificado;
        var mydateMin = formatDate(vFechaInicioProyecto)
        var mydateMax = formatDate(vFechaFinProyecto)
        var ctrlFechaI = document.getElementById('dtDesde').value


        ctrlFechaI.min = mydateMin
        ctrlFechaI.max = mydateMax
        $('#Descripcion2').val(vDescripcion)
        fnCargarTramos(vAnioSeleccionado, vProyectoCodigoSeleccionado);
        fnCargarRenglones(vAnioSeleccionado, vProyectoCodigoSeleccionado);

        fnCargarTramosSRenglones(vAnioSeleccionado, vProyectoCodigoSeleccionado);
        fnCargarRenglonesSRenglones(vAnioSeleccionado, vProyectoCodigoSeleccionado);

        //Limpiar la galería
        var divFotosSupervision = document.getElementById('dFotosSupervision');
        divFotosSupervision.innerHTML = ''
        var divFotosSelecionadas = document.getElementById('dFotosSeleccionadas');
        divFotosSelecionadas.innerHTML = '';
        var divFotosAdmon = document.getElementById('dFotosAdmon');
        divFotosAdmon.innerHTML = '';
        var divFotosSeleccionadasAdmon = document.getElementById('dFotosSeleccionadasAdmon');
        divFotosSeleccionadasAdmon.innerHTML = '';
    });
    $("#btnMostrarFotos").click(function () {

        $('#dFotosSupervision').html('');
        $('#dFotosSeleccionadas').html('');

        if ($('#dFotosSupervision').html().trim() !== '') {
            // avisar que ya hay contenido
            Swal.fire("", "Ya has cargado todas las fotos", "error");
            return null;
        }

        var TramoID = $('#FiltroTramo').val()
        var RenglonID = $('#FiltroRenglones').val()
        //http://covialgt.com/API_REST_COVIAL/Api/Fotografia/ObtenerFotografiasEjecucion/2015/B-001/TramoID'/0/2015-04-30/2015-07-31
      //AnioID/ProyectoCodigo/TramoID/RenglonID/FechaInicio/FechaFin
        var AnioID = vAnioSeleccionado
        var ProyectoCodigo = vProyectoCodigoSeleccionado
      
        var FechaInicio = $('#desde').val()
        var FechaFin = $('#hasta').val()
        var FechaInicioFicha = $('#dtDesde').val()
        var FechaFinFicha = $('#dtHasta').val()
        if ((AnioID == '') || (ProyectoCodigo == '') || (TramoID == '') || (RenglonID == '') || (FechaInicio == '') || (FechaFin == '')) {
            Swal.fire("", "Debe seleccionar un rango de fechas", "error");
        }
  
        else {
            if ((FechaInicioFicha == "") || (FechaFinFicha == "")) {
                Swal.fire("", "Debe ingresar primero las fechas de inicio y fin de la ficha técnica ", "error");
            }
            else {
                if ((FechaInicio < FechaInicioFicha) || (FechaFin > FechaFinFicha)) {
                    Swal.fire("", "Debe seleccionar fechas entre los rangos de las fechas de  ", "error");

                } else {
                    fnCargarFotos(AnioID, ProyectoCodigo, TramoID, RenglonID, FechaInicio, FechaFin)
                    fnCargarFotosSeleccionadas(AnioID, ProyectoCodigo, TramoID, RenglonID, FechaInicio, FechaFin)
                }
            }
           
           
        }
       
    })
    $("#btnMostrarFotosAdmon").click(function () {


        $('#dFotosAdmon').html('');
        $('#dFotosSeleccionadasAdmon').html('');
        if ($('#dFotosAdmon').html().trim() !== '') {
            // avisar que ya hay contenido
            Swal.fire("", "Ya has cargado todas las fotos", "error");
            return null;
        }

        var AnioID = vAnioSeleccionado
        var ProyectoCodigo =vProyectoCodigoSeleccionado
        var TramoID = $('#FiltroTramoAdmon').val()
        var FechaInicio = $('#desdeAdmon').val()
        var FechaFin = $('#hastaAdmon').val()
        var FechaInicioFicha = $('#dtDesde').val()
        var FechaFinFicha = $('#dtHasta').val()


        if ((AnioID == '') || (ProyectoCodigo == '') || (TramoID == '')  || (FechaInicio == '') || (FechaFin == '')) {
            Swal.fire("", "Debe seleccionar un rango de fechas", "error");
        }
        else {
            if ((FechaInicioFicha == "") || (FechaFinFicha == "")) {
                Swal.fire("", "Debe ingresar primero las fechas de inicio y fin de la ficha técnica ", "error");
            }
            else {
                if ((FechaInicio < FechaInicioFicha) || (FechaFin > FechaFinFicha)) {
                    Swal.fire("", "Debe seleccionar fechas entre los rangos de las fechas de  ", "error");

                } else {
                    fnCargarFotosAdmin(AnioID, ProyectoCodigo, TramoID, FechaInicio, FechaFin)
                    fnCargarFotosAdminSeleccionadas(AnioID, ProyectoCodigo, TramoID, FechaInicio, FechaFin)
                }
            }
            
        }
    })
    $("#btnImprimir").click(function () {
        fnImprimirFichaTecnica();
            
    });
    $("#chkImprimirFichaGral").click(function () {
        var estado = document.getElementById("chkImprimirFichaGral").checked
        if (estado) {

            document.getElementById("chkCaratula").checked = true;
            document.getElementById("chkPAvance").checked = true;
            document.getElementById("chkInfoContrato").checked = true;
            document.getElementById("chkRegional").checked = true;
            document.getElementById("chkContratista").checked = true;
            document.getElementById("chkSuperintendente").checked = true;
            document.getElementById("chkSupervision").checked = true;
            document.getElementById("chkPagos").checked = true;
            document.getElementById("chkGraficaAvances").checked = true;
            document.getElementById("chkSanciones").checked = true;
            document.getElementById("chkAvancesFinancieros").checked = true;
            document.getElementById("chkDocCambio").checked = true;
            document.getElementById("chkTramos").checked = true;
            document.getElementById("chkFotosSupervision").checked = true;
            document.getElementById("chkEstimaciones").checked = true;
            document.getElementById("chkFotosAdmin").checked = true;
            document.getElementById("chkComentarios").checked = true;
            document.getElementById("chkMarcaAgua").checked = true;
        }
        else {
            document.getElementById("chkCaratula").checked = false;
            document.getElementById("chkPAvance").checked = false;
            document.getElementById("chkInfoContrato").checked = false;
            document.getElementById("chkRegional").checked = false;
            document.getElementById("chkContratista").checked = false;
            document.getElementById("chkSuperintendente").checked = false;
            document.getElementById("chkSupervision").checked = false;
            document.getElementById("chkPagos").checked = false;
            document.getElementById("chkGraficaAvances").checked = false;
            document.getElementById("chkSanciones").checked = false;
            document.getElementById("chkAvancesFinancieros").checked = false;
            document.getElementById("chkDocCambio").checked = false;
            document.getElementById("chkTramos").checked = false;
            document.getElementById("chkFotosSupervision").checked = false;
            document.getElementById("chkEstimaciones").checked = false;
            document.getElementById("chkFotosAdmin").checked = false;
            document.getElementById("chkComentarios").checked = false;
            document.getElementById("chkMarcaAgua").checked = false;
        }
    });
    $("#btnAgregarReporte").click(function () {
        var vEstadoChekTodos = document.getElementById("chkFotosSelectAll").checked

        if (vEstadoChekTodos) {
            fnGuardarTodasFotosAReporte();
            document.getElementById("chkFotosSelectAll").checked = false;
        }
        else {
            if (objFotosEjecucionChk.length > 0) fnAgregarFotosAReporteEjecucion()
            else Swal.fire("Advertencia", "Debe seleccionar fotografias primero ", "info");
        }
     
    })
    $("#btnAgregarAdminReporte").click(function () {
        var vEstadoChekTodos = document.getElementById("selectAllCheckAdmon").checked

        if (vEstadoChekTodos) {
            fnGuardarTodasFotosAReporteAdmin();
            document.getElementById("selectAllCheckAdmon").checked = false;
        }
        else {
            if (objFotosAdminChk.length > 0) fnAgregarFotosAReporteAdmin()
            else Swal.fire("Advertencia", "Debe seleccionar fotografias primero ", "info");
        }

       
    })

    $("#btnQuitarReporteEjecucion").click(function () {
        if ($('#dFotosSeleccionadas').html().trim() == '') {
            // avisar que ya hay contenido
            Swal.fire("", "No hay fotos que quitar", "error");
            return null;
        } else {
            fnQuitarTodasFotosEjecucion();
        }
        
    })
    $("#btnQuitarReporteAdmin").click(function () {
        if ($('#dFotosSeleccionadasAdmon').html().trim() == '') {
            // avisar que ya hay contenido
           Swal.fire("", "No hay fotos que quitar", "error");
            return null;
        } else {
            fnQuitarTodasFotosAdmin();
        }
        
    })
    $("#chkFotosSelectAll").click(function () {
        $.LoadingOverlay("show", {
            image: "",
            fontawesome: "fas fa-spinner fa-spin"
        });
        var vEstadoChk = document.getElementById("chkFotosSelectAll").checked
        if (vEstadoChk) {
            
            fnSeleccionarTodas('chkFotosEjecucion')
           

        }
        else {
            fnQuitarSeleccionTodas('chkFotosEjecucion')

        }
        

    });

    $("#selectAllCheckAdmon").click(function () {
        var vEstadoChk = document.getElementById("selectAllCheckAdmon").checked
        if (vEstadoChk) {
            fnSeleccionarTodas('chkFotosAdministracion')
        }
        else {
            fnQuitarSeleccionTodas('chkFotosAdministracion')

        }

    });
})

function fnCargarDatosFichaTecnica() {
  //  var vVerificarSupervisor = vRolesUsuario.includes('SUPERVISOR') || vRolesUsuario.includes('SUPERVISOR CONSULTA')

    if (vVerificarSupervisor) {
        vPlanAnualS = vUsuarioActual.substring(0, 4)
        vProgramaS = vUsuarioActual.split('-')[0].substring(4, 10)
        $("#divPlanAnual").toggle(false);
        $("#divPrograma").toggle(false);
    }
fnCargarPlanAnual();
}

function fnConsultarToken() {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    $.ajax({
        type: "POST",
        url: "fichaTecnica.aspx/fObtenerToken",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                Swal.fire("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vRespuestaJSON.tablaDevuelta.forEach(function (registro) {
                    vToken = registro.token;
                    vUsuarioActual = registro.usuario;
                    proxyurl = registro.proxyURL;
                    baseURL = registro.baseURL;
                    vRolesUsuario = registro.rolesUsuario.split(',')
                    vVerificarSupervisor = vRolesUsuario.includes('SUPERVISOR') || vRolesUsuario.includes('SUPERVISOR CONSULTA')

                });
                fnCargarDatosFichaTecnica();
            }

        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnRefrescarToken(vTokenVencido) {
   // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/login/refreshtoken"
    //const proxyurl = "";

    //const url = "http://localhost:62555/api/login/refreshtoken"

    var dataJSON = JSON.stringify({
        TokenVencido: vTokenVencido
    });
    vToken = '';
    fetch(proxyurl + url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.formData();
         
            if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {


            var datos = data;
           
            if (datos.length > 0) {

                fnActualizarToken(datos);
                
              
                $.LoadingOverlay("hide");

            }
           


        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " + vUsuario, "success");

        });
}

function fnActualizarToken(token) {
    var dataJSONt = JSON.stringify({
        pToken: token
    });
    $.ajax({
        type: "POST",
        url: "fichaTecnica.aspx/fActualizarToken",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data) {
                vToken = token
                return true

            }

        },
        failure: function (response) {
            return false
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
function fnCargarPlanAnual() {
  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "Api/plananual/get"

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/plananual/get"
    fetch(proxyurl + url, {
        
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarPlanAnual();
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {



            var datos = data;
            limpiarSelect('cbmPlanAnual');
            if (datos.length > 0) {
                let options = datos.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
                $('#cbmPlanAnual').append(options).trigger("change")
                if (vPlanAnualS !== null) {
                    $('#cbmPlanAnual').val(vPlanAnualS);
                    $('#cbmPlanAnual').trigger("change")
                }

                $.LoadingOverlay("hide");

            }
         
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " , "success");
            
        });
}

function fnCargarProgramas(vAnio) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Programa/Get/" + vAnio

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Programa/Get/" + vAnio
    fetch(proxyurl + url, {
   
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarProgramas(vAnio);
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {


        
            var datos = data;
            limpiarSelect('cmbPrograma');
           
            if (datos !== undefined) {
                
                if (datos.length > 0) {

                    $('#cmbPrograma').append(datos.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo))).trigger("change")

                    if (vProgramaS !== null) {
                        $('#cmbPrograma').val(vProgramaS.toUpperCase());
                        $('#cmbPrograma').trigger("change")
                    }
                  
                 
                   
                    $.LoadingOverlay("hide");

                }
            }
            else {
               
                $.LoadingOverlay("hide");
              //  Swal.fire("Aviso", " No existen programas asignados al plan anual", "info");
            }
           
                  })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " , "error");

        });
}


function fnCargarProyectosXPrograma(vAnio, vProgramaID) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
   var url
    if (vVerificarSupervisor) {
      //2020,b-091  
        url = baseURL + "api/Proyecto/GetListadoXSupervisor/" + vPlanAnualS + "/" + vUsuarioActual.substring(4, 20)
    } else {
        url = baseURL + "api/Proyecto/GetListadoXPrograma/" + vAnio + "/" + vProgramaID
    }
   
    fetch(proxyurl + url, {
       
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
          else  if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarProyectosXPrograma(vAnio, vProgramaID);
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {



            vDatosProyectos = data;
            limpiarSelect('Proyecto');
            if (vDatosProyectos !== undefined) {
                if (vDatosProyectos.length > 0) {


                    vDatosProyectos.forEach(function (registro) {
                        if (vVerificarSupervisor) {
                            $("#Proyecto").append('<option value=' +
                                registro.AnioID + ',' + registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');
                        }
                        else {
                            $("#Proyecto").append('<option value=' +
                                registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');
                        }
                        

                    })
                    document.getElementById('Proyecto').selectedIndex = 1;
                    $('#Proyecto').trigger('change');
                    $.LoadingOverlay("hide");

                }

            }
          
            else {

                $.LoadingOverlay("hide");
                Swal.fire("Atención", " No existen proyectos asingados al programa", "warning");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " + vUsuario, "success");

        });
}

function fnCargarTramos(vIdAnio, vProyectoCodigo) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    var vTramos

  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Tramo/Get/" + vIdAnio + "/" + vProyectoCodigo

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Tramo/Get/" + vIdAnio + "/" + vProyectoCodigo
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarTramos(vIdAnio, vProyectoCodigo);
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {

            vTramos = data;
            limpiarSelect('FiltroTramo');
            if (vTramos !== undefined) {
                if (vTramos.length > 0) {


                                vTramos.forEach(function (registro) {
                                    $("#FiltroTramo").append('<option value=' +
                                        registro.TramoID + '>' +
                                        registro.TramoCodigo+'-'+registro.TramoDesc +
                                        '</option>');

                                })
                                document.getElementById("FiltroTramo").selectedIndex = 1;
                                $.LoadingOverlay("hide");

                            }
            }
            
            else {

                $.LoadingOverlay("hide");
                Swal.fire("Atención", " No existen Tramos asignados al proyecto", "warning");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " , "error");

        });
}
function fnCargarRenglones(vIdAnio, vProyectoCodigo) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    var vRenglones

  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarRenglones(vIdAnio, vProyectoCodigo);
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            vRenglones = data;
            limpiarSelect('FiltroRenglones');

            if (vRenglones !== undefined) {
                if (vRenglones.length > 0) {
                                vRenglones.forEach(function (registro) {
                                    $("#FiltroRenglones").append('<option value=' +
                                        registro.RenglonID + '>' +
                                        registro.RenglonCodCOVIAL + '-' + registro.ProyectoRenglonNombre +
                                        '</option>');

                                })
                                document.getElementById("FiltroRenglones").selectedIndex = 1;
                                $.LoadingOverlay("hide");
                            }
            }
            
            else {

                $.LoadingOverlay("hide");
                Swal.fire("Atención", " No existen renglones asociados al tramo", "warning");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
}

function fnCargarTramosSRenglones(vIdAnio, vProyectoCodigo) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    var vTramos

    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Tramo/Get/" + vIdAnio + "/" + vProyectoCodigo

    //const proxyurl = "";

    //const url = "http://localhost:62555/api/Tramo/Get/" + vIdAnio + "/" + vProyectoCodigo
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarTramosSRenglones(vIdAnio, vProyectoCodigo);
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            vTramos = data;
            limpiarSelect('cmbTramos');
            limpiarSelect('FiltroTramoAdmon');
            if (vTramos !== undefined) {
                 if (vTramos.length > 0) {


                                vTramos.forEach(function (registro) {
                                    $("#cmbTramos").append('<option value=' +
                                        registro.TramoID + '>' +
                                        registro.TramoCodigo + '-' + registro.TramoDesc +
                                        '</option>');

                                })
                                document.getElementById("cmbTramos").selectedIndex = 1;
                                vTramos.forEach(function (registro) {
                                    $("#FiltroTramoAdmon").append('<option value=' +
                                        registro.TramoID + '>' +
                                        registro.TramoCodigo + '-' + registro.TramoDesc +
                                        '</option>');

                                })
                                document.getElementById("FiltroTramoAdmon").selectedIndex = 1;
                                $.LoadingOverlay("hide");

                            }
            }
           
            else {

                $.LoadingOverlay("hide");
                Swal.fire("Atención", " No existen Tramos asignados al proyecto", "warning");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
}
function fnCargarRenglonesSRenglones(vIdAnio, vProyectoCodigo) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    var vRenglones

    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Renglon/GetTodosRenglones/" + vIdAnio + "/" + vProyectoCodigo
    //const proxyurl = "";

    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarRenglonesSRenglones(vIdAnio, vProyectoCodigo);
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            vRenglones = data;
            limpiarSelect('cmbRenglones');
            if (vRenglones!== undefined) {
            if (vRenglones.length > 0) {


                vRenglones.forEach(function (registro) {
                    $("#cmbRenglones").append('<option value=' +
                        registro.RenglonID + '>' +
                        registro.RenglonCodCOVIAL + '-' + registro.ProyectoRenglonNombre +
                        '</option>');

                })
                document.getElementById("cmbRenglones").selectedIndex = 1;

                $.LoadingOverlay("hide");

            }
        }
            else {

                $.LoadingOverlay("hide");
                Swal.fire("Atención", " No existen renglones asignados al tramo", "warning");
            }


        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
}

// CARGAR FOTOS SUPERVISIÓN
function fnCargarFotos(vAnioID, vProyectoCodigo, vTramoID, vRenglonID, vFechaInicio, vFechaFin) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    /*
    // selecciona el div que quieres observar
    const div = document.querySelector('#dFotosSupervision');
    // comienza a observar el div
    observer.observe(div);
    */
    var estadoFavoritas = document.getElementById("chkFavoritas").checked;
    var vOpcionEjecutar;
    const divCargado = document.getElementById('dFotosSupervision');
    if (estadoFavoritas) vOpcionEjecutar = 3;
    else vOpcionEjecutar = 1

    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3,5 ) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)

   // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "Api/Fotografia/ObtenerFotografiasEjecucionGalerias/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vRenglonID + "/" + vFechaI + "/" + vFechaF + "/" + vUsuarioActual + "/" + vOpcionEjecutar

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Fotografia/ObtenerFotografiasEjecucion/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vRenglonID + "/" + vFechaI + "/" + vFechaF
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;
           
            if (estadoRespuesta == 200) return response.json();
           else  if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarFotos(vAnioID, vProyectoCodigo, vTramoID, vRenglonID, vFechaInicio, vFechaFin)
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
               // Swal.fire("Atención", "Sin fotografías que cargar en Galería", "warning");
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("error", "error: " + estadoRespuesta + ", "+ response.statusText, "error");
            }
        })
        .then(data => {

            if (data !== undefined) {

                vFotografias = data;
                var divFotosSupervision = document.getElementById('dFotosSupervision');
              
                divFotosSupervision.innerHTML = ''

               
               
                if (vFotografias.length > 0) {
                    var stringFotos = '';
                    //Creación de componentes

                    vFotografias.forEach(function (registroFoto) {

                        //stringFotos = stringFotos + "<div class='img-wrapper d-inline-block' id='dImg-" + registroFoto.FotografiaID + "' >
                        //<img width='140' height='140' id='img-" + registroFoto.FotografiaID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=0&Fotografia=" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "' />" +
                        //    "<div class='custom-control custom-checkbox'>"+
                        //    "<input type='checkbox' class='custom-control-input' name='chkFotosEjecucion' id='chkImg-" + registroFoto.FotografiaID + "' onclick='fnAgregarFotoArray(" + String.fromCharCode(34) + registroFoto.FotografiaID + "," + registroFoto.FotoNombre + String.fromCharCode(34) +")'>"+
                        //            "<label class='custom-control-label' for='checkImg1'></label>"+
                        //   " </div></div>"
                        /*
                        var divFoto = document.createElement('div');
                        divFoto.classList.add('img-wrapper');
                        divFoto.classList.add('d-inline-block');
                        divFoto.id = "dImg-" + registroFoto.FotografiaID 

                        var foto = document.createElement("img");
                        foto.src = "http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=200&Fotografia=" + registroFoto.FotoNombre
                        //foto.src = registro.urlArchivoMultimedia;
                        foto.height = "140";
                        foto.width = "140";
                        foto.alt = "";
                        foto.id = "img-" + registroFoto.FotografiaID
                       

                        var divCheck = document.createElement('div');
                        divCheck.classList.add('custom-control');
                        divCheck.classList.add('custom-checkbox');

                        var checkecito = document.createElement('input');
                        checkecito.type = 'checkbox';
                        checkecito.id = 'chkImg-' + registroFoto.FotografiaID;
                        checkecito.name = 'chkFotosEjecucion';
                        checkecito.classList.add('custom-control-input');
                      
                        checkecito.onclick = function () {
                          //  fnActualizarEstadoFavorito(registro.FotografiaID, checkecito.checked);
                            fnAgregarFotoArray(registroFoto.FotografiaID.toString() + "," + registroFoto.FotoNombre + "," + registroFoto.TramoCodigo + "," + moment(registroFoto.Fecha).format("DD/MM/YYYY"));
                        };

                        var etiqueta = document.createElement('label');
                        etiqueta.classList.add('custom-control-label');
                        etiqueta.onclick = function () {
                            var chk = document.getElementById("chkImg-" + registroFoto.FotografiaID);
                            chk.checked = !chk.checked;
                            $('#' + "chkImg-" + registroFoto.FotografiaID).trigger('onclick');
                        };

                        divCheck.appendChild(checkecito);
                        divCheck.appendChild(etiqueta);

                        divFoto.appendChild(foto);
                        divFoto.appendChild(divCheck);
                     
                        var newlabel = document.createElement("Label");
                        let text = "Tramo: " + registroFoto.TramoCodigo + '<br/>' + 'Fecha: ' + moment(registroFoto.Fecha).format("DD/MM/YYYY");
                        let result = text.fontsize(2);
                        newlabel.innerHTML = result;
                        divFoto.appendChild(newlabel);

                        document.getElementById("dFotosSupervision").appendChild(divFoto); */


                        stringFotos = stringFotos + `<div class="img-wrapper d-inline-block" id="dImg-${registroFoto.FotografiaID}"> 
                        <img src="http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&amp;MaxPixels=100&amp;Fotografia=${registroFoto.FotoNombre}" alt="" id="img-${registroFoto.FotografiaID}" width="140" height="140">
                        <div class="custom-control custom-checkbox"><input type="checkbox" id="chkImg-${registroFoto.FotografiaID}" name="chkFotosEjecucion" class="custom-control-input" onchange='fnAgregarFotoArray("${registroFoto.FotografiaID.toString()},${registroFoto.FotoNombre},${registroFoto.TramoCodigo},${moment(registroFoto.Fecha).format("DD/MM/YYYY")}")'>
                        <label class="custom-control-label" for="chkImg-${registroFoto.FotografiaID}"></label></div><label><font size="2">Tramo: ${registroFoto.TramoCodigo}<br>Fecha: ${moment(registroFoto.Fecha).format("DD/MM/YYYY")}</font></label></div>`;




                    })
                     //divFotosSupervision.insertAdjacentHTML = stringFotos;
                    divFotosSupervision.insertAdjacentHTML('beforeend', stringFotos);
                    $.LoadingOverlay("hide");

                   // divFotosSupervision.innerHTML = stringFotos;
                    

                }
                



                if (vFotografias.length == undefined) {
                  $.LoadingOverlay("hide");
                }

            }
            else {
                var divFotosSupervision = document.getElementById('dFotosSupervision');
                divFotosSupervision.innerHTML = ''
                $.LoadingOverlay("hide");
                //Swal.fire("Atención", "No hay fotografías en galería", "warning");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message, "error");

        });
    

}



/*
// crea un nuevo objeto ResizeObserver
const observer = new ResizeObserver(entries => {
    // recorre las entradas (cambios de tamaño) detectados
    entries.forEach(entry => {
        // obtén el nuevo tamaño del div
        const nuevoAncho = entry.contentRect.width;
        const nuevoAlto = entry.contentRect.height;
        console.log(`El div ha cambiado de tamaño a ${nuevoAncho}px de ancho y ${nuevoAlto}px de alto`);
        
    });
});

*/





function fnCargarFotosSeleccionadas(vAnioID, vProyectoCodigo, vTramoID, vRenglonID, vFechaInicio, vFechaFin) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });


    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3, 5) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)

    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "Api/Fotografia/ObtenerFotografiasEjecucionGalerias/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vRenglonID + "/" + vFechaI + "/" + vFechaF + "/" + vUsuarioActual + "/2"

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Fotografia/ObtenerFotografiasEjecucion/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vRenglonID + "/" + vFechaI + "/" + vFechaF
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarFotosSeleccionadas(vAnioID, vProyectoCodigo, vTramoID, vRenglonID, vFechaInicio, vFechaFin);
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                //Swal.fire("Atención", "Sin fotografías seleccionadas que cargar", "warning");
              //  $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var divFotosSupervisionSeleccionadas = document.getElementById('dFotosSeleccionadas');
            if (data !== undefined) {

                vFotografias = data;
                
              //  divFotosSupervisionSeleccionadas.empty();
                divFotosSupervisionSeleccionadas.innerHTML = ''
                if (vFotografias.length > 0) {
                    var stringFotos = '';
                    vFotografias.forEach(function (registroFoto) {

                        stringFotos = stringFotos + "<div class='img-wrapper d-inline-block' id='btnImg-" + registroFoto.FotografiaID + "'> <img width='140' height='140' id='imgS-" + registroFoto.FotografiaID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=100&Fotografia=" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "'  />" +
                            "<a href='#dFotosSeleccionadas' class='delete-icon' onclick='fnQuitarFotoSeleccion(" + String.fromCharCode(34) + registroFoto.FotoNombre + String.fromCharCode(34) + "," + registroFoto.FotografiaID + "," + String.fromCharCode(34) + registroFoto.TramoCodigo + String.fromCharCode(34) + "," + String.fromCharCode(34) + moment(registroFoto.Fecha).format("DD/MM/YYYY") + String.fromCharCode(34)+ ")' ><i class='fas fa-trash fa-lg'></i></a>" +
                            "<label><font size='2'>Tramo: " + registroFoto.TramoCodigo + "<br>Fecha: " + moment(registroFoto.Fecha).format("DD/MM/YYYY") + "</font></label></div>";
                        //var newlabel = document.createElement("Label");
                        //let text = "Tramo: " + registroFoto.TramoCodigo + '<br/>' + 'Fecha: ' + moment(registroFoto.Fecha).format("DD/MM/YYYY");
                        //let result = text.fontsize(2);
                    
                    })
                    divFotosSupervisionSeleccionadas.insertAdjacentHTML('beforeend', stringFotos);
                    $.LoadingOverlay("hide");

                }
               

            }
            else {
                var divFotosSupervisionSeleccionadas = document.getElementById('dFotosSeleccionadas');
                divFotosSupervisionSeleccionadas.innerHTML = ''
                $.LoadingOverlay("hide");
               // swal("Aviso", "No hay fotografias seleccionadas en reporte", "info");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
    return false;   
}

function fnGuardarFoto(vNombreFoto,vIDFoto, vIdTramo, vFechaFoto) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    var vRespuesta

   // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Fotografia/insertarFotoEjecucionFicha"
    //const proxyurl = "";

    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo

    var dataJSON = JSON.stringify({
        FotografiasID: vIDFoto,
        Usuario: vUsuarioActual,
        Accion:1
    });
    fetch(proxyurl + url, {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) {
                $.LoadingOverlay("hide");
                var vFotoSeleccionada = document.getElementById("dImg-" + vIDFoto);
                var padre = vFotoSeleccionada.parentNode;
                padre.removeChild(vFotoSeleccionada);
                var vStrFotosAnteriores = '';

                var vGaleriaSeleccionadas = document.getElementById("dFotosSeleccionadas");
                vStrFotosAnteriores = $('#dFotosSeleccionadas').html();
                var vFotoAgregarStr = "<div class='img-wrapper d-inline-block' id='btnImg-" + vIDFoto + "'><img width='140' height='140' id='imgS-" + vIDFoto + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=100&Fotografia=" + vNombreFoto + "' runat='server' alt='" + vNombreFoto + "'  />" +
                    "<a href='#dFotosSeleccionadas' class='delete-icon' onclick='fnQuitarFotoSeleccion(" + String.fromCharCode(34) + vNombreFoto + String.fromCharCode(34) + "," + vIDFoto + "," + String.fromCharCode(34) + vIdTramo + String.fromCharCode(34) + "," + String.fromCharCode(34) + vFechaFoto + String.fromCharCode(34) + ")'><i class='fas fa-trash fa-lg'></i></a>" +
                    "<label><font size='2'>Tramo: " + vIdTramo + "<br>Fecha: " + vFechaFoto + "</font></label></div>";

                vGaleriaSeleccionadas.innerHTML = vStrFotosAnteriores + vFotoAgregarStr
               // swal("", "foto incluida en reporte ", "success");
            } 
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnGuardarFoto(vNombreFoto, vIDFoto, vIdTramo, vFechaFoto)
                        clearInterval(interval)
                    }

                }, 1000);
            }
          
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
       
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
}
function fnQuitarFotoSeleccion(vNombreFoto, vFotoID, vIdTramo,vFechaFoto) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    var vRespuesta

    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Fotografia/insertarFotoEjecucionFicha"
    //const proxyurl = "";

    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo

    var dataJSON = JSON.stringify({
        FotografiasID: vFotoID,
        Usuario: vUsuarioActual,
        Accion: 2
    });
    fetch(proxyurl + url, {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) {
                $.LoadingOverlay("hide");
                var vFotoSeleccionada = document.getElementById("btnImg-" + vFotoID);
                var padre = vFotoSeleccionada.parentNode;
                padre.removeChild(vFotoSeleccionada);
                var vStrFotosAnteriores = '';

                var vGaleriaFotos = document.getElementById("dFotosSupervision");


                //vStrFotosAnteriores = $('#dFotosSupervision').html();
                //var vFotoAgregarStr = "<div class='img-wrapper d-inline-block' name='chkFotosEjecucion' id='dImg-" + vFotoID + "'><img width='140' height='140' id='img-" + vFotoID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=0&Fotografia=" + vNombreFoto + "' runat='server' alt='" + vNombreFoto + "'  />" +
                //    "<div class='custom-control custom-checkbox'>" +
                //    "<input type='checkbox' name='chkFotosEjecucion' class='custom-control-input' id='chkImg-" + vFotoID + "' onclick='fnAgregarFotoArray(" + String.fromCharCode(34) + vFotoID + "," + vNombreFoto + String.fromCharCode(34) + ")'>" +
                //    "<label class='custom-control-label' for='checkImg1'></label>" +
                //    " </div></div>"
                //vGaleriaFotos.innerHTML = vStrFotosAnteriores + vFotoAgregarStr

                var divFoto = document.createElement('div');
                divFoto.classList.add('img-wrapper');
                divFoto.classList.add('d-inline-block');
                divFoto.id = "dImg-" + vFotoID

                var foto = document.createElement("img");
                foto.src = "http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=100&Fotografia=" + vNombreFoto
                //foto.src = registro.urlArchivoMultimedia;
                foto.height = "140";
                foto.width = "140";
                foto.alt = "";
                foto.id = "img-" + vFotoID


                var divCheck = document.createElement('div');
                divCheck.classList.add('custom-control');
                divCheck.classList.add('custom-checkbox');

                var checkecito = document.createElement('input');
                checkecito.type = 'checkbox';
                checkecito.id = 'chkImg-' + vFotoID;
                checkecito.name = 'chkFotosEjecucion';
                checkecito.classList.add('custom-control-input');

                checkecito.onclick = function () {
                    //  fnActualizarEstadoFavorito(registro.FotografiaID, checkecito.checked);
                    fnAgregarFotoArray(vFotoID.toString() + "," + vNombreFoto);
                };

                var etiqueta = document.createElement('label');
                etiqueta.classList.add('custom-control-label');
                etiqueta.onclick = function () {
                    var chk = document.getElementById("chkImg-" + vFotoID);
                    chk.checked = !chk.checked;
                    $('#' + "chkImg-" + vFotoID).trigger('onclick');
                };

                divCheck.appendChild(checkecito);
                divCheck.appendChild(etiqueta);

                divFoto.appendChild(foto);
                divFoto.appendChild(divCheck);

                var newlabel = document.createElement("Label");
                let text = "Tramo: " + vIdTramo + '<br/>' + 'Fecha: ' + vFechaFoto;
                let result = text.fontsize(2);
                newlabel.innerHTML = result;
                divFoto.appendChild(newlabel);

                document.getElementById("dFotosSupervision").appendChild(divFoto);

                Swal.fire("", "foto excluida del reporte ", "success");
            }
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnGuardarFoto(vNombreFoto, vIDFoto, vIdTramo, vFechaFoto)
                        clearInterval(interval)
                    }

                }, 1000);
            }

            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
}
// CARGAR FOTOS SUPERVISIÓN
function fnAgregarFotosAReporteEjecucion() {
    objFotosEjecucionChk.forEach(function (item, index) {
        var vArray = item.split(',')
        fnGuardarFoto(vArray[1], vArray[0],vArray[2],vArray[3]) /// se manda idfoto,nombrefoto,tramo y fecha
    });
    objFotosEjecucionChk.length = 0;
}


// CARGAR FOTOS ADMINISTRATIVAS
function fnCargarFotosAdmin(vAnioID, vProyectoCodigo, vTramoID,  vFechaInicio, vFechaFin) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    //var estadoFavoritas = document.getElementById("chkFavoritasAdmon").checked;
    //var vOpcionEjecutar;
    //if (estadoFavoritas) vOpcionEjecutar = 3;
    //else vOpcionEjecutar = 1


    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3, 5) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)

    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "Api/Fotografia/ObtenerFotografiasAdminSeleccion/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vFechaI + "/" + vFechaF + "/" + vUsuarioActual + "/1" 
    
    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Fotografia/ObtenerFotografiasEjecucion/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vRenglonID + "/" + vFechaI + "/" + vFechaF
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarFotosAdmin(vAnioID, vProyectoCodigo, vTramoID, vFechaInicio, vFechaFin);
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
               // Swal.fire("Atención", "Sin fotografías que cargar en galería administrativa", "warning");
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {

            if (data !== undefined) {

                vFotografias =data;
                var divFotosAdmin = document.getElementById('dFotosAdmon');
                divFotosAdmin.innerHTML = ''
                if (vFotografias.length > 0) {
                    var stringFotos = '';
                    vFotografias.forEach(function (registroFoto) {

                     

                        //stringFotos = stringFotos + "<div class='img-wrapper d-inline-block' name='chkFotosAdmin' id='dImgA-" + registroFoto.FotografiaID + "' ><img width='140' height='140' id='imgA-" + registroFoto.FotografiaID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=0&Fotografia=" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "' />" +
                        //    "<div class='custom-control custom-checkbox'>" +
                        //    "<input type='checkbox' class='custom-control-input' name='chkFotosAdministracion' id='chkImgA-" + registroFoto.FotografiaID + "' onclick='fnAgregarFotoArrayAdmin(" + String.fromCharCode(34) + registroFoto.FotografiaID + "," + registroFoto.FotoNombre + String.fromCharCode(34) + ")'>" +
                        //    "<label class='custom-control-label' for='checkImg1'></label>" +
                        //    " </div></div>"

                        /*
                        var divFoto = document.createElement('div');
                        divFoto.classList.add('img-wrapper');
                        divFoto.classList.add('d-inline-block');
                        divFoto.name = 'chkFotosAdmin';
                        divFoto.id = "dImgA-" + registroFoto.FotografiaID

                        var foto = document.createElement("img");
                        foto.src = "http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=200&Fotografia=" + registroFoto.FotoNombre
                        //foto.src = registro.urlArchivoMultimedia;
                        foto.height = "140";
                        foto.width = "140";
                        foto.alt = registroFoto.FotoNombre;
                        foto.id = "imgA-" + registroFoto.FotografiaID //"dImgA-"


                        var divCheck = document.createElement('div');
                        divCheck.classList.add('custom-control');
                        divCheck.classList.add('custom-checkbox');

                        var checkecito = document.createElement('input');
                        checkecito.type = 'checkbox';
                        checkecito.id = 'chkImgA-' + registroFoto.FotografiaID;
                        checkecito.name = 'chkFotosAdministracion';
                        checkecito.classList.add('custom-control-input');

                        checkecito.onclick = function () {
                            //  fnActualizarEstadoFavorito(registro.FotografiaID, checkecito.checked);
                            fnAgregarFotoArrayAdmin(registroFoto.FotografiaID.toString() + "," + registroFoto.FotoNombre + "," + registroFoto.TramoCodigo + "," + moment(registroFoto.Fecha).format("DD/MM/YYYY"));
                        };

                        var etiqueta = document.createElement('label');
                        etiqueta.classList.add('custom-control-label');
                        etiqueta.onclick = function () {
                            var chk = document.getElementById("chkImgA-" + registroFoto.FotografiaID);
                            chk.checked = !chk.checked;
                            $('#' + "chkImgA-" + registroFoto.FotografiaID).trigger('onclick');
                        };

                        divCheck.appendChild(checkecito);
                        divCheck.appendChild(etiqueta);

                        divFoto.appendChild(foto);
                        divFoto.appendChild(divCheck);

                        var newlabel = document.createElement("Label");
                        let text = "Tramo: " + registroFoto.TramoCodigo + '<br/>' + 'Fecha: ' + moment(registroFoto.Fecha).format("DD/MM/YYYY");
                        let result = text.fontsize(2);
                        newlabel.innerHTML = result;
                        divFoto.appendChild(newlabel);

                        document.getElementById("dFotosAdmon").appendChild(divFoto);
                        
                        */
                       //
                        stringFotos = stringFotos + `<div class="img-wrapper d-inline-block" id="dImgA-${registroFoto.FotografiaID}"> 
                        <img src="http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&amp;MaxPixels=100&amp;Fotografia=${registroFoto.FotoNombre}" alt="${registroFoto.FotoNombre}" id="imgA-${registroFoto.FotografiaID}"  width="140" height="140">
                        <div class="custom-control custom-checkbox" >
                        <input type="checkbox" id="chkImgA-${registroFoto.FotografiaID}" name="chkFotosAdministracion" class="custom-control-input" onchange='fnAgregarFotoArrayAdmin("${registroFoto.FotografiaID.toString()},${registroFoto.FotoNombre},${registroFoto.TramoCodigo},${moment(registroFoto.Fecha).format("DD/MM/YYYY")}")'>
                        <label class="custom-control-label " for="chkImgA-${registroFoto.FotografiaID}" >
                        </label>
                        </div>
                        <label>
                        <font size="2">Tramo: ${registroFoto.TramoCodigo}<br>Fecha: ${moment(registroFoto.Fecha).format("DD/MM/YYYY")}</font>
                        </label>
                        </div>`;
                       


                    })
                    //divFotosAdmin.innerHTML = stringFotos;
                    divFotosAdmin.insertAdjacentHTML('beforeend', stringFotos);

                    $.LoadingOverlay("hide");

                }
            

            }
            else {
                var divFotosAdmin = document.getElementById('dFotosAdmon');
                divFotosAdmin.innerHTML =''
                $.LoadingOverlay("hide"); //Aquí un mensaje de salida
                //Swal.fire("", "No hay fotografias ", "notify");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
}
function fnCargarFotosAdminSeleccionadas(vAnioID, vProyectoCodigo, vTramoID,  vFechaInicio, vFechaFin) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });


    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3, 5) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)

   // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    
    const url = baseURL + "Api/Fotografia/ObtenerFotografiasAdminSeleccion/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" +  vFechaI + "/" + vFechaF + "/" + vUsuarioActual + "/2" //aquí va 2

    //const proxyurl = "";

    //const url = "http://localhost:62555/Api/Fotografia/ObtenerFotografiasEjecucion/" + vAnioID + "/" + vProyectoCodigo + "/" + vTramoID + "/" + vRenglonID + "/" + vFechaI + "/" + vFechaF
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();
          else  if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarFotosAdminSeleccionadas(vAnioID, vProyectoCodigo, vTramoID, vFechaInicio, vFechaFin);
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                //Swal.fire("Atención", "Sin fotografías administrativas seleccionadas que cargar", "warning");
               // $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var divFotosAdminSeleccionadas = document.getElementById('dFotosSeleccionadasAdmon');
            if (data !== undefined) {

                vFotografias = data;
                
                divFotosAdminSeleccionadas.innerHTML = ''
                if (vFotografias.length > 0) {
                    var stringFotos = '';
                    vFotografias.forEach(function (registroFoto) {

                        //stringFotos = stringFotos + "<div class='img-wrapper d-inline-block'> <img width='140' height='140' id='imgAS-" + registroFoto.FotografiaID + "' src='Fotos/" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "' onclick='fnQuitarFotoSeleccionAdmin(" + String.fromCharCode(34) + registroFoto.FotoNombre + String.fromCharCode(34) + "," + registroFoto.FotografiaID + ")' />" +
                        //    '<a href="#" class="delete-icon"><i class="fas fa-trash fa-lg"></i></a></div>'

                        stringFotos = stringFotos + "<div class='img-wrapper d-inline-block' id='btnImgA-" + registroFoto.FotografiaID + "'> <img width='140' height='140' id='imgA-" + registroFoto.FotografiaID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=100&Fotografia=" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "'  />" +
                            "<a href='#dFotosSeleccionadasAdmon' class='delete-icon' onclick='fnQuitarFotoSeleccionAdmin(" + String.fromCharCode(34) + registroFoto.FotoNombre + String.fromCharCode(34) + "," + registroFoto.FotografiaID + "," + String.fromCharCode(34) + registroFoto.TramoCodigo + String.fromCharCode(34) + "," + String.fromCharCode(34) + moment(registroFoto.Fecha).format("DD/MM/YYYY") + String.fromCharCode(34) + ")' ><i class='fas fa-trash fa-lg'></i></a>" +
                            "<label><font size='2'>Tramo: " + registroFoto.TramoCodigo + "<br>Fecha: " + moment(registroFoto.Fecha).format("DD/MM/YYYY") + "</font></label></div>";

                        //stringFotos = stringFotos + "<div class='img-wrapper d-inline-block' id='btnImg-" + registroFoto.FotografiaID + "'> <img width='140' height='140' id='imgS-" + registroFoto.FotografiaID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=200&Fotografia=" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "'  />" +
                        //    "<a href='#dFotosSeleccionadas' class='delete-icon' onclick='fnQuitarFotoSeleccion(" + String.fromCharCode(34) + registroFoto.FotoNombre + String.fromCharCode(34) + "," + registroFoto.FotografiaID + ")' ><i class='fas fa-trash fa-lg'></i></a></div>"
                    })
                    divFotosAdminSeleccionadas.insertAdjacentHTML('beforeend', stringFotos);
                    $.LoadingOverlay("hide");

                }
             
            }
            else {
                var divFotosAdminSeleccionadas = document.getElementById('dFotosSeleccionadasAdmon');
                divFotosAdminSeleccionadas.innerHTML = ''
                $.LoadingOverlay("hide");
                
               // swal("", "No hay fotografias ", "notify");
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
}

function fnGuardarFotoAdmin(vNombreFoto, vIDFoto,vTramoFoto,vFechaFoto) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });


  
    const url = baseURL + "api/Fotografia/insertarFotoAdminFicha"
  
    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo
  
    var dataJSON = JSON.stringify({
        AnioID: vAnioSeleccionado,
        ProyectoCodigo: vProyectoCodigoSeleccionado,
        FotografiaCorr: vIDFoto,
        Usuario: vUsuarioActual,
        Accion: 1
    });
    fetch(proxyurl + url, {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) {
                $.LoadingOverlay("hide");
                var vFotoSeleccionada = document.getElementById("dImgA-" + vIDFoto); // dImgA
                var padre = vFotoSeleccionada.parentNode;
                padre.removeChild(vFotoSeleccionada);
                var vStrFotosAnteriores = '';

                
               
                var vGaleriaSeleccionadas = document.getElementById("dFotosSeleccionadasAdmon");
                vStrFotosAnteriores = $('#dFotosSeleccionadasAdmon').html();    //onclick='fnQuitarFotoSeleccionAdmin(" + String.fromCharCode(34) + vNombreFoto + String.fromCharCode(34) + "," + vIDFoto + ")'
                //  var vFotoAgregarStr = "<img width='140' height='140' id='imgAS-" + vIDFoto + "' src='Fotos/" + vNombreFoto + "' runat='server' alt='" + vNombreFoto + "' onclick='fnQuitarFotoSeleccionAdmin(" + String.fromCharCode(34) + vNombreFoto + String.fromCharCode(34) + "," + vIDFoto + ")' />"; Tipo=4
                var vFotoAgregarStr = "<div class='img-wrapper d-inline-block' id='btnImgA-" + vIDFoto + "'><img width='140' height='140' id='imgA-" + vIDFoto + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=100&Fotografia=" + vNombreFoto + "' runat='server' alt='" + vNombreFoto + "'  />" +
                    "<a href='#dFotosSeleccionadasAdmon' class='delete-icon'" + "onclick='fnQuitarFotoSeleccionAdmin(" + String.fromCharCode(34) + vNombreFoto + String.fromCharCode(34) + "," + vIDFoto + "," + String.fromCharCode(34) + vTramoFoto + String.fromCharCode(34) + "," + String.fromCharCode(34) + vFechaFoto + String.fromCharCode(34) + ")'" + "> <i class='fas fa-trash fa-lg'></i></a>" +
                    "<label><font size='2'>Tramo: " + vTramoFoto + "<br>Fecha: " + vFechaFoto + "</font></label></div>";
                
                vGaleriaSeleccionadas.innerHTML = vStrFotosAnteriores + vFotoAgregarStr
               // swal("", "foto incluida en reporte ", "success");
            }
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnGuardarFotoAdmin(vNombreFoto, vIDFoto);
                        clearInterval(interval)
                    }

                }, 1000);
            }
           else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
            .catch(function (error) {
            $.LoadingOverlay("hide");
                Swal.fire("error", error.message + " ", "error");

        });
}
function fnQuitarFotoSeleccionAdmin(vNombreFoto, vFotoID, vIdTramo,vFechaFoto) {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

   // var vRespuesta

   // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/Fotografia/insertarFotoAdminFicha"
    //const proxyurl = "";

    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo

    var dataJSON = JSON.stringify({
        AnioID: vAnioSeleccionado,
        ProyectoCodigo: vProyectoCodigoSeleccionado,
        FotografiaCorr: vFotoID,
        Usuario: vUsuarioActual,
        Accion: 2
    });
    fetch(proxyurl + url, {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(response => {
            var estadoRespuesta = response.status;
            console.log(vNombreFoto, "-", vFotoID)
            if (estadoRespuesta == 200) {
                console.log(vNombreFoto, "-", vFotoID)
                $.LoadingOverlay("hide");
                var vFotoSeleccionada = document.getElementById("btnImgA-" + vFotoID);
                var padre = vFotoSeleccionada.parentNode;
                padre.removeChild(vFotoSeleccionada);
               // var vStrFotosAnteriores = '';
       
               // var vGaleriaFotos = document.getElementById("dFotosAdmon");

                var divFoto = document.createElement('div');
                divFoto.classList.add('img-wrapper');
                divFoto.classList.add('d-inline-block');
                divFoto.name = 'chkFotosAdmin';
                divFoto.id = "dImgA-" + vFotoID

                var foto = document.createElement("img");
                foto.src = "http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=100&Fotografia=" + vNombreFoto
                //foto.src = registro.urlArchivoMultimedia;
                foto.height = "140";
                foto.width = "140";
                foto.alt = vNombreFoto;
                foto.id = "imgA-" + vFotoID //"dImgA-"


                var divCheck = document.createElement('div');
                divCheck.classList.add('custom-control');
                divCheck.classList.add('custom-checkbox');

                var checkecito = document.createElement('input');
                checkecito.type = 'checkbox';
                checkecito.id = 'chkImgA-' + vFotoID;
                checkecito.name = 'chkFotosAdministracion';
                checkecito.classList.add('custom-control-input');

                checkecito.onclick = function () {
                    //  fnActualizarEstadoFavorito(registro.FotografiaID, checkecito.checked);
                    fnAgregarFotoArrayAdmin(vFotoID.toString() + "," + vNombreFoto + "," + vIdTramo + "," + vFechaFoto);
                };

                var etiqueta = document.createElement('label');
                etiqueta.classList.add('custom-control-label');
                etiqueta.onclick = function () {
                    var chk = document.getElementById("chkImgA-" + vFotoID);
                    chk.checked = !chk.checked;
                    $('#' + "chkImgA-" + vFotoID).trigger('onclick');
                };

                divCheck.appendChild(checkecito);
                divCheck.appendChild(etiqueta);

                divFoto.appendChild(foto);
                divFoto.appendChild(divCheck);

                var newlabel = document.createElement("Label");
                let text = "Tramo: " + vIdTramo + '<br/>' + 'Fecha: ' + vFechaFoto;
                let result = text.fontsize(2);
                newlabel.innerHTML = result;
                divFoto.appendChild(newlabel);

                document.getElementById("dFotosAdmon").appendChild(divFoto);

                Swal.fire("", "foto excluida del reporte ", "success");
            }
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnQuitarFotoSeleccionAdmin(vNombreFoto, vFotoID,vIdTramo,vFechaFoto);
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
     
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("error", error.message + " ", "error");

        });
}

function fnAgregarFotosAReporteAdmin() {
    objFotosAdminChk.forEach(function (item, index) {
        var vArray = item.split(',')
        fnGuardarFotoAdmin(vArray[1], vArray[0],vArray[2],vArray[3])
    });
    objFotosAdminChk.length = 0;
}
// FOTOS ADMINISTRATIVAS


function fnQuitarTodasFotosEjecucion() {

    

    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

  
  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = baseURL + "api/fotografia/quitarFotosEjecucionFicha"
    //const proxyurl = "";
    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo


    var dataJSON = JSON.stringify({
        AnioID: vAnioSeleccionado,
        ProyectoCodigo: vProyectoCodigoSeleccionado,
        Usuario: vUsuarioActual
    });


   
    fetch(proxyurl + url, {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(response => {
            console.log("Response")
            console.log(response)
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) { return response.json(); }
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnQuitarTodasFotosEjecucion();
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {


         
            if (data !== undefined) {
                $.LoadingOverlay("hide");
                var AnioID = vAnioSeleccionado
                var ProyectoCodigo = vProyectoCodigoSeleccionado
                var TramoID = $('#FiltroTramo').val()
                var RenglonID = $('#FiltroRenglones').val()
                var FechaInicio = $('#desde').val()
                var FechaFin = $('#hasta').val()
                fnCargarFotos(AnioID, ProyectoCodigo, TramoID, RenglonID, FechaInicio, FechaFin)
                var divFotosSupervisionSeleccionadas = document.getElementById('dFotosSeleccionadas');
                divFotosSupervisionSeleccionadas.innerHTML = '';

                //fnCargarFotosSeleccionadas(AnioID, ProyectoCodigo, TramoID, RenglonID, FechaInicio, FechaFin)
            }
            else {
                $.LoadingOverlay("hide");
            }


        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
    
};
function fnQuitarTodasFotosAdmin() {

    

    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });


   // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = baseURL + "api/fotografia/quitarFotosAdminEjecucionFicha"
    //const proxyurl = "";
    //const url = "http://localhost:62555/api/Renglon/Get/" + vIdAnio + "/" + vProyectoCodigo

    var dataJSON = JSON.stringify({
        AnioID: vAnioSeleccionado,
        ProyectoCodigo:vProyectoCodigoSeleccionado,
        Usuario: vUsuarioActual
    });
    fetch(proxyurl + url, {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: dataJSON

    })
        .then(data => data.text())
        .then(data => {


            if (data.length > 0) {


                // swal("", "foto incluida en reporte ", "error");
                $.LoadingOverlay("hide");

            }
            if (data == '') {
                $.LoadingOverlay("hide");
                var AnioID = vAnioSeleccionado
                var ProyectoCodigo = vProyectoCodigoSeleccionado
                var TramoID = $('#FiltroTramoAdmon').val()
                var FechaInicio = $('#desdeAdmon').val()
                var FechaFin = $('#hastaAdmon').val()
                const limpiarDiv = document.getElementById('dFotosSeleccionadasAdmon');
                fnCargarFotosAdmin(AnioID, ProyectoCodigo, TramoID, FechaInicio, FechaFin)
                limpiarDiv.innerHTML = '';
            }


        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });

};
function fnGuardarTodasFotosAReporte() {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    var vFechaInicio = $("#desde").val()
    var vFechaFin = $("#hasta").val()
    var AnioID= vAnioSeleccionado
    var ProyectoCodigo = vProyectoCodigoSeleccionado
    var TramoID = $('#FiltroTramo').val()
    var RenglonID = $('#FiltroRenglones').val()
    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3, 5) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)
    const url = baseURL + "api/Fotografia/ObtenerFotografiasEjecucionGalerias/" + AnioID + "/" + ProyectoCodigo + "/" + TramoID +"/"+ RenglonID +"/"+vFechaI+"/"+ vFechaF+"/"+vUsuarioActual+"/4"
    
    
 
    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }
      

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if ((estadoRespuesta == 200) || (estadoRespuesta == 404)) {

                $.LoadingOverlay("hide");
                var divFotosSupervision = document.getElementById('dFotosSupervision');
                divFotosSupervision.innerHTML = ''
                fnCargarFotosSeleccionadas(AnioID, ProyectoCodigo, TramoID, RenglonID, $('#desde').val(), $('#hasta').val());
            }
           else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnGuardarTodasFotosAReporte()
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
     
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
}

function fnGuardarTodasFotosAReporteAdmin() {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    var vFechaInicio = $("#desdeAdmon").val()
    var vFechaFin = $("#hastaAdmon").val()
    var AnioID = vAnioSeleccionado
    var ProyectoCodigo = vProyectoCodigoSeleccionado
    var TramoID = $('#FiltroTramoAdmon').val()
    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3, 5) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)

    const url = baseURL + "api/Fotografia/ObtenerFotografiasAdminSeleccion/" + AnioID + "/" + ProyectoCodigo + "/" + TramoID + "/" + vFechaI + "/" + vFechaF + "/" + vUsuarioActual + "/3"


    fetch(proxyurl + url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        }


    })
        .then(response => {
            var estadoRespuesta = response.status;

            if ((estadoRespuesta == 200) || (estadoRespuesta == 404)) {

                $.LoadingOverlay("hide");
                var divFotosSupervision = document.getElementById('dFotosAdmon');
                divFotosSupervision.innerHTML = '';
                
                fnCargarFotosAdminSeleccionadas(AnioID, ProyectoCodigo, TramoID, $('#desdeAdmon').val(), $('#hastaAdmon').val());
            }
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnGuardarTodasFotosAReporteAdmin();
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
      
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
}




/// FUNCIONES PARA OPERACIONES 
function fnSeleccionarTodas(vName) {
    

    var objSeleccionadas = document.getElementsByName(vName);
    for (var i = 0, n = objSeleccionadas.length; i < n; i++) {
        objSeleccionadas[i].checked = true;
    }
    $.LoadingOverlay("hide");

}
function fnQuitarSeleccionTodas(vName) {
    var objSeleccionadas = document.getElementsByName(vName);
    for (var i = 0, n = objSeleccionadas.length; i < n; i++) {
        objSeleccionadas[i].checked = false;
    }
    $.LoadingOverlay("hide");
}
function limpiarSelect(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 1) {
        select.remove(1);
    }
}
function getGilteredBy(array, key, value) {
    return array.filter(function (e) {
        return e[key] == value;
    })
}
function getSubstrings(vTexto, vInicio, vFin) {
    return vTexto.substring(vInicio, vFin);
}
function fnAgregarFotoArray(vIdFotoNombre) {
    var vIdFoto = vIdFotoNombre.split(',')
    var elemento = document.getElementById("chkImg-" + vIdFoto[0])
    var estado = elemento.checked;

    if (estado) objFotosEjecucionChk.push(vIdFotoNombre)
    else {
        for (var i = 0; i < objFotosEjecucionChk.length; i++) {

            if (objFotosEjecucionChk[i] === vIdFotoNombre) {

                objFotosEjecucionChk.splice(i, 1);
                continue;
            }

        }
    }
}
function fnAgregarFotoArrayAdmin(vIdFotoNombre) {

    const vEstadoChekTodos = document.getElementById("selectAllCheckAdmon").checked

    if (vEstadoChekTodos) {
        console.log("funciona")
    } else {
      
        var vIdFoto = vIdFotoNombre.split(',')
        var elemento = document.getElementById("chkImgA-" + vIdFoto[0])
        var estado = elemento.checked;

        if (estado) objFotosAdminChk.push(vIdFotoNombre)
        else {
            for (var i = 0; i < objFotosAdminChk.length; i++) {

                if (objFotosAdminChk[i] === vIdFotoNombre) {

                    objFotosAdminChk.splice(i, 1);
                    continue;
                }

            }
        }
    }
}

function fnImprimirFichaTecnica() {
    var vReporte = 'RptFichasTecnicas.mrt';
    var vPlanAnual =vAnioSeleccionado;
    var vProyecto = vProyectoCodigoSeleccionado
    var vFechaInicio = $('#dtDesde').val()
    var vFechaFin = $('#dtHasta').val()
    var vTramoIdFotoAdmon = $('#FiltroTramoAdmon').val()
    var vTramoIdFotoEjecucion = $('#FiltroTramo').val()
    var vRenglonIdFotoEjecucion = $('#FiltroRenglones').val()
    var vTramoAnalitico = $('#cmbTramos').val()
    var vRenglonAnalitico = $('#cmbRenglones').val()
    var vCaratula = 0;
    var vPorcentajeA = 0;
    var vSupervision = 0;
    var vContratista = 0;
    var vContrato = 0;
    var vRegional = 0;
    var vSuperintendente = 0;
    var vGraficaFisico = 0;
    var vGraficaFinanciero = 0;
    var vTramos = 0;
    var vEstimaciones = 0;
    var vPagos = 0;
    var vSanciones = 0;
    var vEjecucion = 0;
    var vRenglones = 0;
    var vAnalitico = 0;
    var vResumenAnalitico = 0;
    var vDocCambio = 0;
    var vFotosEjecucion = 0;
    var vFotosAdmin = 0;
    var vComentarios = 0;
    var vDirigido = '';
    var vMarcaAgua = 0;
    var vAvanceGeneral = 0;
    var vAnexo = 0
    var vFechaI = getSubstrings(vFechaInicio, 6, 10) + "-" + getSubstrings(vFechaInicio, 3, 5) + "-" + getSubstrings(vFechaInicio, 0, 2)
    var vFechaF = getSubstrings(vFechaFin, 6, 10) + "-" + getSubstrings(vFechaFin, 3, 5) + "-" + getSubstrings(vFechaFin, 0, 2)
    vRenglones = 1;
    if ($("#chkCaratula").is(':checked')) vCaratula = 1;
    if ($("#chkPAvance").is(':checked')) vPorcentajeA = 1;
    if ($("#chkInfoContrato").is(':checked')) vContrato = 1;
    if ($("#chkRegional").is(':checked')) vRegional = 1;
    if ($("#chkContratista").is(':checked')) vContratista = 1;
    if ($("#chkSuperintendente").is(':checked')) vSuperintendente = 1;
    if ($("#chkSupervision").is(':checked')) vSupervision = 1;
    if ($("#chkPagos").is(':checked')) vPagos = 1;
    if ($("#chkGraficaAvances").is(':checked')) vGraficaFisico = 1;
    if ($("#chkSanciones").is(':checked')) vSanciones = 1;
    if ($("#chkAvancesFinancieros").is(':checked')) vGraficaFinanciero = 1;
    if ($("#chkDocCambio").is(':checked')) vDocCambio = 1;
    if ($("#chkTramos").is(':checked')) vTramos = 1;
    if ($("#chkFotosSupervision").is(':checked')) vFotosEjecucion = 1;
    if ($("#chkEstimaciones").is(':checked')) vEstimaciones = 1;
    if ($("#chkFotosAdmin").is(':checked')) vFotosAdmin = 1;
    if ($("#chkComentarios").is(':checked')) vComentarios = 1;
    if ($("#chkMarcaAgua").is(':checked')) vMarcaAgua = 1;
    if ($("#chkAvance").is(':checked')) {
        vAvanceGeneral = 1;
        vEjecucion = 1;
    }  
    if ($("#chkAnalitico").is(':checked')) vAnalitico = 1;
    if ($("#chkAnexo").is(':checked')) vAnexo = 1;
    if ($("#chkResumen").is(':checked')) vResumenAnalitico = 1;

    vDirigido = $("#Destinatario").val();

    var QueryString = '?Parameters=' + vCaratula + ',' + vPorcentajeA + ',' + vSupervision + ',' + vContratista + ',' + vContrato + ',' + vRegional + ',' + vSuperintendente + ',' + vGraficaFisico + ',' + vGraficaFinanciero + ',' + vTramos + ',' + vEstimaciones + ',' + vPagos + ',' + vSanciones + ','
        + vEjecucion + ',' + vRenglones + ',' + vAnalitico + ',' + vResumenAnalitico + ',' + vDocCambio + ',' + vFotosEjecucion + ',' + vFotosAdmin + ',' + vComentarios
        + ',"' + vDirigido + '","' + vUsuarioActual + '",' + vPlanAnual + ',"' + vProyecto + '",' + vTramoIdFotoAdmon + ',"' + vFechaI + '","' + vFechaF + '",' + vTramoIdFotoEjecucion + ',' + vRenglonIdFotoEjecucion + ',' + vTramoAnalitico + ',' + vRenglonAnalitico + '&IdReporte=1' + '&Reporte=' + vReporte;
    if ((vUsuarioActual == '') || (vPlanAnual = '') || (vProyecto == '') || (vDirigido == '') || (vFechaInicio == '') || (vFechaFin == '')) {
        Swal.fire("", "Deben completarse los datos requeridos para la generación del reporte", "error");
    }
    else {
       // window.location.href = "FrmVisorReporte.aspx" + QueryString;
        var url = "FrmVisorReporte.aspx" + QueryString;
        console.log(url)
        window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
    }

}


function fnValidarFichaGral(obj) {
    var estado = $(obj).is(':checked')
    if (!estado) {
        if ($("#chkImprimirFichaGral").is(':checked')) {
            document.getElementById("chkImprimirFichaGral").checked = false;
        }
    }
   
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



