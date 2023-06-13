var vNombreArchivo;
var vFotoIDActual;

$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + programa + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })

    $("#btnEliminarFoto").click(function () {
       // alert(vFotoIDActual);
        Swal.fire({
            title: "Favor confirmar",
            text: "¿Desea eliminar la fotografia?",
            icon: "warning",
            showDenyButton: true, showCancelButton: false,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    $.LoadingOverlay("show")
                    $.ajax({
                        url: `${urlbase}api/Multimedia/EliminarFotografia`,
                        method: "post",
                        data: JSON.stringify({
                            "FotografiaId": vFotoIDActual,
                            "Descripcion":'',
                        }),
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        success: (val) => {
                            $.LoadingOverlay("hide");
                            Swal.fire("Éxito", "Fotografía elimada correctamente", "success").then(function () {
                                $('#fotografiaModal').hide();
                                
                                let QueryString = "?plan=" + plan + "&Proyecto=" + proyecto + "&periodo=" + periodo + "&programa=" + programa
                                window.location.href = "Multimedia.aspx" + QueryString;
                             
                            });
                            
                        },
                        error: (error) => {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "error");
                        }
                    })
                }
            });
       
    })
})

$("select").select2({ theme: "bootstrap" })
$.ajax({
    url: `${urlbase}api/plananual/get`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('.PlanAnualList').append(options).trigger("change")
        $('.PlanAnualList').val(plan)
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$.ajax({
    url: `${urlbase}api/Proyecto/GetListadoXPrograma/${plan}/${programa}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('.ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo))).trigger("change")
        $('.ProyectoList').val(proyecto)
    }
})
$.ajax({
    url: `${urlbase}api/Lluvias/GetPeriodos/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let periodo_obj = val.find((item) => item.Periodocorrel.toString() === periodo)
        $('.Periodos').append(val.map((val) => new Option(val.Periodo, val.Periodocorrel))).trigger("change")
        $('.Periodos').val(periodo_obj.Periodocorrel)
        $('.periodo-date').datetimepicker({
            minDate: moment(periodo_obj.PeriodoDesde, "DD/MM/YYYY"),
            maxDate: moment(periodo_obj.periodoHasta, "DD/MM/YYYY"),
            format: 'DD/MM/YYYY',
            keepInvalid: true,
            useStrict: true
        })
        $('.periodo-date').datetimepicker("date", moment(periodo_obj.PeriodoDesde, "DD/MM/YYYY"))
        $('.periodo-date').on("error.datetimepicker", function (evt) {
            $(evt.currentTarget).find("input").popover({
                title: 'Fecha Incorrecta', trigger: 'focus',
                content: `Digite una fecha que se encuentre entre el periodo: ${periodo_obj.PeriodoDesde} - ${periodo_obj.periodoHasta}`,
                template: '<div class="popover bg-warning" role="tooltip"><div class="arrow"></div><h3 class="popover-header bg-warning"></h3><div class="popover-body"></div></div>'
            })
            setTimeout(() => $(evt.currentTarget).find("input").popover("show"), 0)
            setTimeout(() => {
                $(evt.currentTarget).find("input").popover("hide")
                $(evt.currentTarget).find("input").popover("dispose")
            }, 4000)
            $(evt.currentTarget).datetimepicker("date", $(evt.currentTarget).datetimepicker("date"))
        })
    }
})
$.ajax({
    url: `${urlbase}api/Multimedia/GetTramosXproyecto/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('.tramoList').append(val.map((val) => new Option(val.TramosDesc, val.TramoId))).trigger("change")
    }
})
function setFotos() {
    $('#fotografia-galery').html(null)
    $.ajax({
        url: `${urlbase}api/Multimedia/GetFotosXPeriodo/${periodo}/${plan}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {

            vFotografias = val;
            var divFotosSupervision = document.getElementById('fotografia-galery');
            divFotosSupervision.innerHTML = ''
            if (vFotografias.length > 0) {
                var stringFotos = '';
                vFotografias.forEach(function (registroFoto) {

                    //stringFotos = stringFotos + "<div class='img-wrapper d-inline-block' id='dImg-" + registroFoto.FotografiaID + "' >
                    //<img width='140' height='140' id='img-" + registroFoto.FotografiaID + "' src='http://covial.gob.gt:1090/SICOP/Paginas/Procesos/formularios/Mapas/GetThumbnail.aspx?Tipo=1&MaxPixels=0&Fotografia=" + registroFoto.FotoNombre + "' runat='server' alt='" + registroFoto.FotoNombre + "' />" +
                    //    "<div class='custom-control custom-checkbox'>"+
                    //    "<input type='checkbox' class='custom-control-input' name='chkFotosEjecucion' id='chkImg-" + registroFoto.FotografiaID + "' onclick='fnAgregarFotoArray(" + String.fromCharCode(34) + registroFoto.FotografiaID + "," + registroFoto.FotoNombre + String.fromCharCode(34) +")'>"+
                    //            "<label class='custom-control-label' for='checkImg1'></label>"+
                    //   " </div></div>"

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
                        fnAgregarFotoFavorita(registroFoto.FotografiaID);
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

                    //divFoto.appendChild(foto);
                    //divFoto.appendChild(divCheck);


                    var newlabel = document.createElement("Label");
                    let text = "Estación: " + registroFoto.Estacion;
                    let result = text.fontsize(2);
                    newlabel.innerHTML = result;
                    
                    //divFoto.appendChild(newlabel);


                    //Crear A para desplegar modal
                    var buttonA = document.createElement("A");
                    buttonA.classList.add('img-link');
                    buttonA.setAttribute("data-toggle", "modal");
                    buttonA.setAttribute("type", "button");
                    
                    buttonA.setAttribute("data-id", `${registroFoto.FotoNombre}`);
                    buttonA.setAttribute("name", `${registroFoto.FotoNombre}`);
                    buttonA.setAttribute("id", `${registroFoto.FotografiaID}`);
                   
                  
                    buttonA.setAttribute("data-target", "#fotografiaModal");

                  
                   
                    buttonA.setAttribute("estacion", `${registroFoto.Estacion}`)
                    

                    //agregar foto y check al elemento a
                    buttonA.appendChild(foto);
                    buttonA.appendChild(divCheck);
                    buttonA.appendChild(newlabel);

                    //agregar elemento a al div
                    divFoto.appendChild(buttonA)

                    document.getElementById("fotografia-galery").appendChild(divFoto);
                })
               /* $("[name='ImgMulti']").on("click", ({ currentTarget }) => {
                    let vals = $(currentTarget).data("obj")
                    console.log(currentTarget.name)
                    console.log("hola")
                })*/


                //    $('#fotografia-galery').append(val.map((val) => `
                //    <div class="img-wrapper d-inline-block">
                //        <a role="button" class="img-link" data-toggle="modal" data-target="#fotografiaModal" data-item='${JSON.stringify(val)}'>
                //            <img width="140" height="140" src="${thumbnail}Tipo=11&MaxPixels=200&Fotografia=${val.FotoNombre}" alt="imagen galeria" />
                //            <ul class="list-unstyled img-text">
                //                <li>Estación:${val.Estacion}</li>

                //            </ul>
                //        </a>
                //    </div>
                //`))
            }
        }

    })
}
setFotos()

function fnAgregarFotoFavorita(vIdFoto) {
    var elemento = document.getElementById("chkImg-" + vIdFoto)
    var estado = elemento.checked;
    var data = {
        "FotografiaId": vIdFoto,
        "EstadoFavorita": estado
    }
    $.ajax({
        url: `${urlbase}api/Multimedia/FotoFavorita`,
        method: "POST",
        contentType: false,
        processData: false,
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (retorno) => {
            
            if(estado)
                swal.fire("Fotografía marcada como favorita", "", "success")
            else
                swal.fire("Fotografía eliminada de Favoritas", "", "success")
        },
        error: ({ responseJSON }) => Swal.fire("Error al marcar/eliminar de favoritas", responseJSON.Errors.reduce((ant, actual) => {
            return ant + actual.message
        }, ""), "error")
    })

}
$('#fotografia-galery').on("click", "a", function ({ currentTarget }) {
    //aquí se carga el modal
    
    $('#btnRotarFotoIzquierda').show();
    $('#btnRotarFotoDerecha').show();
    let $img = document.getElementById("modal-img")
    const imgsrc = document.querySelector(".img-show")

    $img.classList.remove("d-none")
    //let item = JSON.parse(this.dataset.item)
    console.log(currentTarget.name)
    console.log(currentTarget.id)
    console.log(currentTarget.text.split('Estación: ')[1])
    vNombreArchivo = currentTarget.name;
    vFotoIDActual = currentTarget.id;
    
    //$img.src = thumbnail + "Tipo=11&MaxPixels=450&Fotografia=" + currentTarget.name + "&random=" + new Date().getTime();
    //$img.setAttribute('src', thumbnail + "Tipo=11&MaxPixels=450&Fotografia=" + currentTarget.name + "&random=" + new Date().getTime())
    imgsrc.setAttribute('src', thumbnail + "Tipo=11&MaxPixels=450&Fotografia=" + currentTarget.name + "&random=" + new Date().getTime());
    // $img.src = `../Fotos/${item.FotoNombre}`
    document.getElementById("estacion-modal_text").innerHTML = currentTarget.text.split('Estación: ')[1]
    document.getElementById("tramo-modal_text").innerHTML = $('#TramoFotografia').text()
    document.getElementById("modal-video").classList.add("d-none")
   
})




$('#videos-galery').on("click", "a", function () {
    $('#btnRotarFotoIzquierda').hide();
    $('#btnRotarFotoDerecha').hide();
    let $img = document.getElementById("modal-video")
    $img.classList.remove("d-none")
    let item = JSON.parse(this.dataset.item)
    $img.src = `../Videos/${item.FotoNombre}`
    document.getElementById("estacion-modal_text").innerHTML = item.Estacion
    document.getElementById("tramo-modal_text").innerHTML = item.TramoDesc
    document.getElementById("modal-img").classList.add("d-none")
})
function fEditarFoto(evento) {
    $("#fotografiaModal").show();
}
function getVideos() {
    $.ajax({
        url: `${urlbase}api/Multimedia/GetVideosXPeriodo/${periodo}/${plan}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#videos-galery').append(val.map((val) => `
            <div class="img-wrapper d-inline-block">
                <a role="button" class="img-link" data-toggle="modal" data-target="#fotografiaModal"  data-item='${JSON.stringify(val)}'>
                    <img width="140" height="140" src="${thumbnail}Tipo=10&MaxPixels=0&Fotografia=${val.FotoNombre}" alt="imagen galeria" />
                    <ul class="list-unstyled img-text">
                        <li>Estación: ${val.Estacion}</li>
                        <li>Tramo: ${val.TramoDesc}</li>
                    </ul>
                </a>
            </div>
        `))
        }
    })

}

getVideos()
$("#agregar-fotografia").on("click", () => {
    var fileUpload = $("#foto-input").get(0);
    var files = fileUpload.files;
    data = {
        "TramoID": $("#TramoFotografia").val(),
        "Estacion": $("#EstacionFotografia").val(),
        "Descripcion": $("#DescripcionFotografia").val(),
        "Fecha": $("#FechaFotografia-dp").datetimepicker("date").toDate(),
        "Path": "string",
        "FotoNombre": files[0].name,
        "PeriodoCorrel": periodo,
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "UserName": user,
        "DateModify": new Date()
    }
    formData = new FormData();
    for (key in data) {
        formData.append(key, data[key])
    }
    formData.append("file", $("#foto-input").prop('files')[0], $("#foto-input").prop('files')[0].name)
    $.ajax({
        url: `${urlbase}api/Multimedia/AgregarFotografias`,
        method: "POST",
        contentType: false,
        processData: false,
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            CalluploaderHandler();
        //  
            
            swal.fire("Fotografía ingresada correctamente", "", "success")
        },
        error: ({ responseJSON }) => Swal.fire("Error al agregar fotografía", responseJSON.Errors.reduce((ant, actual) => {
            return ant + actual.message
        }, ""), "error")
    })
})
function CalluploaderHandler(isVideo = false) {
    var fileUpload = isVideo ? $("#video-input").get(0) : $("#foto-input").get(0);
    var files = fileUpload.files;
    var test = new FormData();
   
    for (var i = 0; i < files.length; i++) {
        test.append("video", files[i], files[i].name);
    }
    if (isVideo) {
        const video = document.getElementById("MainContent_videoPrev");
        const canvas = document.createElement("canvas");
        // scale the canvas accordingly
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // draw the video at that frame
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            let file = new File([blob], "snapshot_" + files[0].name + ".jpg")
            test.append("image", file, file.name) 
            sendVideoFile(test)
        }, 'image/jpeg', 0.95);
    }
    else sendVideoFile(test)
    return false;

    function sendVideoFile(test) {
        var append = isVideo ? "&vTipoArchivo=2" : "&vTipoArchivo=1"
        $.ajax({
            type: "POST",
            url: "../FileUploadHandler.ashx?vModuloViene=1" + append,
            contentType: false,
            processData: false,
            data: test,
            success: (res) => OnComplete(res, isVideo),
            error: OnFail
        })
    }
}

function OnComplete(result, isVideo = false) {
    if (isVideo) {
        Swal.fire("Video ingresado correctamente", "", "success")
        getVideos()
    } else {
        Swal.fire("Fotografía ingresada correctamente", "", "success")
        setFotos()
    }

}

function OnFail(result) {
    alert('Request failed');
}

$("#agregar-video").on("click", () => {
    var fileUpload = $("#video-input").get(0);
    var files = fileUpload.files;
    data = {
        "TramoID": $("#TramoVideo").val(),
        "Estacion": $("#EstacionVideo").val(),
        "Descripcion": $("#DescripcionVideo").val(),
        "Fecha": $("#FechaFotografia-dp-Video").datetimepicker("date").toDate(),
        "Path": "string",
        "FotoNombre": files[0].name,
        "PeriodoCorrel": periodo,
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "UserName": user,
        "DateModify": new Date()
    }
    $.ajax({
        url: `${urlbase}api/Multimedia/AgregarVideos`,
        method: "POST",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            CalluploaderHandler(true)
        },
        error: ({ responseJSON }) => Swal.fire("Error al agregar video", responseJSON.Errors.reduce((ant, actual) => {
            return ant + actual.message
        }, ""), "error")
    })
})

function fnRotarFoto(rotarIzquierda) {


    var dataJSONt = JSON.stringify({
        nombreArchivo: vNombreArchivo,
        rotarIzquierda: rotarIzquierda
    });
    $.ajax({
        type: "POST",
        url: "Multimedia.aspx/fRotarFoto",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var nombreArchivoNuevo = data.d;
            var rutaFoto = thumbnail + "Tipo=11&MaxPixels=0&Fotografia=" + vNombreArchivo + "&random=" + new Date().getTime();
            //localhost:44390/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=000053582W.jpeg&EMID=ID_1
            document.getElementById("modal-img").src = rutaFoto;
         
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
