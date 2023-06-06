<%@ Page Title="Edición Reportes Viales" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEdicionReportesViales.aspx.cs" Inherits="Covialgt.ReportesViales.frmEdicionReportesViales" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/Multimedia.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <style type="text/css">
        /* Set the size of the div element that contains the map */
        #map {
            height: 600px;
            /* The height is 400 pixels */
            width: 100%;
            /* The width is the width of the web page */
        }
        input[type="checkbox"] + label {
            font-weight: bold;
            font-size: 16px;
            line-height: 3em;
            color: #011f2b;
            cursor: pointer;
           
        }
        input[type="checkbox"]:checked + label {
            color: #285dce;
        }
        
        @media (max-width: 730px) {
            input[type="checkbox"] + label {
            font-weight: bold;
            font-size: 13px;
            line-height: 3em;
            color: #011f2b;
            cursor: pointer;
        }

          .modal-lg {
          max-width: 850px !important;
          }
          
        }
        @media (max-width: 850px) {
          #contenedorModal {
                flex-direction: column;
          }
          #mColumna1 {
              
               width: 100% !important;
          }
          #mColumna2 {
             
               width: 100% !important;
          }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Scripts/jquery-3.5.1.min.js"></script>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
   
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <style>
        td.details-control {
            background: url('../Images/Icons/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        tr.shown td.details-control {
            background: url('../Images/Icons/details_close.png') no-repeat center center;
        }

        .padre-flex {
            background: #A8C7D6;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

            .padre-flex > div {
                text-align: center;
            }
    </style>
    <h1 class="mb-0">Reporte Vial</h1>
    <hr class="thick" />
    <br />
    <h5 id="Anio"></h5>
    <h5 id="tramo"></h5>
    <hr />
    <div class="row">
        <div class="form-group col-md-4 col-lg-4">
            <label for="desde">Fecha</label>
            <div class="input-group date" id="desde-dp" data-target-input="nearest">
                <input id="desde" type="text" data-target="#desde-dp" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-4 col-lg-4">
            <label for="txtUsuario">Usuario reporta</label>
            <input class="form-control" id="txtUsuario" disabled />
        </div>
        <div class="form-group col-md-4 col-lg-4">
            <label for="cmbEstado">Estado</label>
            <select class="form-control" id="cmbEstado" name="cmbEstado">
            </select>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-4 col-lg-4">
            <label for="cmbTipoDanio">Tipo de daño</label>
            <select class="form-control" id="cmbTipoDanio">
            </select>
        </div>
        <div class="form-group col-md-4 col-lg-4">
            <label for="cmbPrioridad">Prioridad</label>
            <select class="form-control" id="cmbPrioridad">
            </select>
        </div>
          <div class="form-group col-md-4 col-lg-4">
            <label for="cmbEntidad">Entidad a cargo del reporte</label>
            <select class="form-control" id="cmbEntidad" >
                 <option>Sin Entidad</option>
            </select>
        </div>
        <div class="form-group col-md-4 col-lg-4" id="divAudio">
            <label for="audioNota">Nota de voz</label>
            <audio controls id="audioNota" class="form-control" title="Escuchar nota de voz">
                <source src="#" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>

        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-12 col-lg-12">
            <label for="txtDescripcion">Descripción daño</label>
            <textarea class="form-control" cols="40" rows="5" id="txtDescripcion"></textarea>
        </div>
    </div>
        <div class="row">
        <div class="form-group col-md-12 col-lg-12">
            <label for="txtResolucion">Resolucion</label>
            <textarea class="form-control" cols="40" rows="5" id="txtResolucion"></textarea>
        </div>
    </div>
    <div class="row" style="display: flex; justify-content: flex-end">
        <div class="text-left pt-5">
            <button type="button" id="btnRepetidos" class="btn btn-outline-secondary btn-form">Reportes Repetidos</button>
            <button type="button" id="btnBitacora" class="btn btn-outline-primary btn-form" data-toggle="modal" data-target="#miModal">Bitacora</button>
            <button type="button" id="btnRegresar" onclick="redirect('frmReportesViales');" class="btn btn-outline-secondary btn-form">Regresar</button>
            <button type="button" id="btnGenerarReporte" class="btn btn-outline-secondary btn-form">Generar reporte</button>
            <button type="button" id="btnGuardar" class="btn btn-outline-primary btn-form">Guardar</button>
        </div>
    </div>
    <!-- proyectos en el tramo -->
    <section>
        <div id="headerTramo" style="align-items: baseline;">
                 <h2 class="mt-5"><span class="title-bg">Proyectos en el tramo</span></h2>
                <!--<div class="btn-group btn-group-toggle" data-toggle="buttons" id="divBotones">
                    <label class="btn btn-secondary active">
                        <input type="radio" name="options" id="optionMarcar" autocomplete="off" >
                        Marcar Todos
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="optionDesmarcar" autocomplete="off">
                        Desmarcar Todos
                    </label>
                </div>-->
        </div>
        <hr/>
        <div class="container col-md-12 md-6" id="contenedorChecks"> </div> <!-- contenedor de los checks-->
       <!-- <button type="button" id="btnPruebasVarias" class="btn btn-outline-primary btn-form">probar cargar proyeto </button> 

          <button type="button" id="btnEmail" class="btn btn-outline-secondary btn-form">Enviar Email</button>-->

        
    </section>
    <!--fin  proyectos en el tramo -->
    <h2 class="mt-5"><span class="title-bg">Fotografías</span></h2>
    <hr />
    <div class="gallery-wrapper">
        <div class="gallery-bg">
            <div class="row justify-content-center" id="fotografia-galery">
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" id="fotografiaModal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="titulomodal"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <img class="img-fluid rounded-start" id="modal-img" src="#" alt="..." />

                </div>

            </div>
        </div>
    </div>
    <h2 class="mt-5"><span class="title-bg">Ubicación</span></h2>
    <hr />
    <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI">
    </script>


    <div id="map"></div>

    <!-- carga de modal bitacora-->
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="miModal">
    <div class="modal-dialog modal-lg modal-dialog-centered" style="max-width: 1350px!important;">
            <!-- Contenido del modal -->
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h6 id="AnioM"> </h6>   
                        <h6 id="tramoM"></h6>
                    </div>
                     <!-- <div>
                        <h6 id="userCre"></h6> 
                        <h6 id="userModi"></h6>
                    </div>
                   <button type="button" class="close" data-dismiss="modal">&times;</button> -->
                </div>
                <div id="contenedorModal" class="modal-body row">
                    <div id="mColumna1">
                        <div class="row">

                            <div class="col">
                                <label for="fechaActual">Fecha de Creacion: </label>
                                <!--<input class="form-control" id="fechaActual" disabled placeholder="fecha" /> -->
                               
                                 <div class="input-group date" id="fechaC" data-target-input="nearest" style="margin-top:0px;">
                                    <input class="form-control  datetimepicker-input ejecucion-date" id="fechaCreo" data-target="#desde-hp" autocomplete="off" disabled/>
                                    <div class="input-group-append" data-target="#fechaC" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>

                            </div>
                            <div class="col">
                                <label for="fechaModificacion">Usuario: </label>
                                <input class="form-control" id="fechaModificacion" disabled/>
                            </div>

                            <div class="form-group col-md-12 col-lg-12" style="margin-top: 20px;">
                                <label for="txtDescripcion">Describa los cambios realizados al reporte.</label>
                                <textarea class="form-control" cols="40" rows="5" id="DescripcionBitacora" spellcheck="true"  style="resize: none; height: 303px;"></textarea>
                            </div>
                            <div class="col-md-12 col-lg-12" id="divBotonBitacora">
                                <button type="button" class="btn btn-primary" id="btnAgregarBitacora">Agregar a Bitacora </button>
                            </div>
                        </div>

                    </div>
                    <div id="mColumna2">
                        <table class="table table-bordered" val="false" id="tablaBitacora" style="max-height:contain;">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th>Num</th>
                                    <th>Fecha</th>
                                    <th>Descripcion</th>
                                    <th>Acciones</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody >
                              
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
           
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div> 
    <!--- fin carga de modal bitacora--->
    <!-- DIV REPORTE STI -->  
            <div class="row big-gutter">
        <div id="testDiv"></div>
    </div>
    <!-- DIV REPORTE STI -->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/fileInput.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
        usuario = "<%= Session["usuario"] %>"
        ReportesVialesPath = "<%= ViewState["ReportesVialesPath"] ?? "null" %>";
    </script>
    <!-- Scripts -->
    <script src="../js/jsEdicionReportesViales.js"></script>
</asp:Content>
