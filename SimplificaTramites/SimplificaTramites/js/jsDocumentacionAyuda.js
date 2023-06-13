let vDepartamentosUL
let vArticulosAyudaTable


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
    vDepartamentosUL = document.getElementById("departamentosCovialLista")
    fnCargarDepartamentosCovial()
    $("#seccionesSICOP").on("change.select2", ({ currentTarget }) => {
        let seccionesSicopId = currentTarget.value
        console.log('seccionesSicopId', seccionesSicopId)
        fnCargarArticulosAyuda(seccionesSicopId)
    })
    //$('#articulosAyuda-table tbody').on('click', 'td:second', function ({ currentTarget }) {
    //    let data = vArticulosAyudaTable.row(this).data()
    //    //  console.info(data);
    //    //  alert( 'You clicked on '+data[1]+'\'s row' )
    //    let {
    //        Nombre,
    //        // Descripcion,
    //        FotoNombre,
    //        NombreVideo
    //        // Plataforma,
    //    } = $(currentTarget).data().item
    //    opendialog(Nombre, FotoNombre, NombreVideo)
    //})
})
function fnCargarDepartamentosCovial() {
    $.ajax({
        url: `${urlbase}api/DocumentacionAyuda/ConsultarDepartamentosCovial`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val.forEach(renderDepartamentosCovialList)
            // $('ul#departamentosCovialLista:first-child').addClass('active')
        },
        error: (e) => {
            console.log("jsDocumentacionAyuda.js:43", e)
        }
    })
}
function renderDepartamentosCovialList(element, index, arr) {
    let li = document.createElement('li')
    let a = document.createElement('a')
    a.classList.add('nav-link')
    li.classList.add('nav-item')
    li.dataset.departamentosCovialId = element.DepartamentosCovialId
    li.addEventListener('click', fnCargarSeccionesSICOP)
    vDepartamentosUL.appendChild(li)
    // li.innerHTML=li.innerHTML + element.Nombre
    a.innerText = element.Nombre
    li.appendChild(a)
}
function fnCargarSeccionesSICOP({ currentTarget }) {
    $(currentTarget).addClass('active').siblings().removeClass('active')
    let { departamentosCovialId } = currentTarget.dataset
    console.log('departamentosCovialId', departamentosCovialId)
    $.ajax({
        url: `${urlbase}api/DocumentacionAyuda/ConsultarSeccionesSicop/${departamentosCovialId}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.Nombre, val.SeccionesSicopId));
            $('#seccionesSICOP').html(options)
            if (val.length > 0) {
                fnCargarArticulosAyuda(val[0].SeccionesSicopId)
            }
        },
        error: (e) => {
            console.log("jsDocumentacionAyuda.js:69", e)
        }
    })
}
function fnCargarArticulosAyuda(seccionesSicopId) {
    console.log("seccionesSicopId", seccionesSicopId)
    $.ajax({
        url: `${urlbase}api/DocumentacionAyuda/ConsultarArticulosAyuda/${seccionesSicopId}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (vArticulosAyudaTable) {
                vArticulosAyudaTable.destroy()
                vArticulosAyudaTable.clear()
            }
            let tbody = $("#articulosAyuda-table tbody")

            tbody.html(null)
            let btnPDF = '', btnVideo = '';
            let rows = val.map((item) => {
                btnPDF = '';
                btnVideo = '';
                if (item.FicheroPDF != '') {
                    btnPDF = `<a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                    data - content="VerManual" data - placement="top" title = "Ver Manual" onclick = "fnAbrirPDF('${item.FicheroPDF}')" >
                                    <i class="fas fa-file-pdf fa-lg fa-fw"></i></a >`
                }
                else {
                    btnPD = `<a></a>`;
                }
                if (item.FotoNombre != '') {
                    btnVideo = `<a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                   data-content="Videotutorialcorto" data-placement="top" title="Video tutorial corto" onclick="opendialog('${item.Nombre}','${item.FotoNombre}','${item.NombreVideo}')"> 
                                   <i class="fas fa-video fa-lg fa-fw"></i></a>`
                }
                else {
                    btnVideo = `<a></a>`;
                }
                let tr = $(`
                     <tr>
                        <td class="spacer"></td>            
                        <td class="text-left">${item.Nombre} <span class="badge badge-primary badge-pill">${item.Plataforma}</span></td> 
                        <td style=width:150px">
                            ${btnPDF}    
                            ${btnVideo}
                            
                        </td>
                        <td class="spacer"></td>
                    </tr>
                `)
                tr.data("item", item)
                return tr
            })
            tbody.append(rows)
            vArticulosAyudaTable = fnInicializaTableArticulosAyuda()
        },
        error: (e) => {
            console.log("jsDocumentacionAyuda.js:90", e)
        }
    })
}
function fnInicializaTableArticulosAyuda() {
    return $('#articulosAyuda-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin videos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ videos",
            "infoEmpty": "Mostrando 0 de 0 de 0 videos",
            "infoFiltered": "(Filtrado de _MAX_ total videos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ videos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay videos encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function opendialog(titulo, video, nombrevideo) {
    //video = "http://localhost:44390/Ayuda/Multimedia/Videos/filename.mp4"
    //video = "http://localhost:44390/Ayuda/Multimedia/Videos/" + nombrevideo;
    video = urlVideosAyuda + nombrevideo;
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="' + video + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: titulo,
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


function fnAbrirPDF(FicheroPDF) {
   
    if (FicheroPDF) window.open(urlPdfsAyuda + FicheroPDF, '_blank');
    else alert('Sin documento PDF')
}