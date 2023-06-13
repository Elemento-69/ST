<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmIncidenciasEdicion.aspx.cs" Inherits="Covialgt.Incidencias.frmIncidenciasEdicion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>

      <style type="text/css">
      /* Set the size of the div element that contains the map */
      #map {       
        height: 90%;

      }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
        <script src="../js/jsIncidenciasPantallaEdicion.js"></script>
        <script src="../js/jsIncidenciasPantallaEdicionToken.js"></script>
        <!-- Sweet Alert-->
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
   
        <!-- Loading Overlay-->
        <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
        <!-- Font-Awesome 4.7-->
        <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>

        <!-- Data Table v1.10.23 -->
        <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
        <script type="text/javascript" src="../DataTables/datatables.min.js"></script>


        <h1 class="mb-0">Incidencia</h1>
        <hr class="thick" />

        
        <div class="w-100">  
            <div id="card-incidencia" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
                        <div class="card-body" >

                                <h4 class="text-left ">Datos de incidencia</h4>
                                <hr class="line mx-md-8" />
                     
                                

                                <div class="row" style="margin-right: 15px;">         
                                     <div class="col-6"  >      
                                            <div class="row" id="divPlanPrograma"  >
                                                 <div class="col-6"  >                                       
                                                        <label for="PlanAnual1">Plan Anual</label>
                                                        <select class="form-control" id="cmbPlanAnual1" name="PlanAnual1"  required>                                                                                                             
                                                        </select>
                                                 </div>

                                                 <div class="col-6" >
                                                        <label for="Programa1">Programa</label>
                                                        <select class="form-control" id="cmbPrograma1" name="Programa1"  required>                                                                
                                                        </select>
                                                 </div>                                     
                                            </div>

                                            <div class="row" style="margin-top: 10px;"  >
                                                 <div class="col-6"  >                                       
                                                        <label for="Proyecto1">Proyecto</label>
                                                        <select class="form-control" id="cmbProyecto1" name="Proyecto1"  required>
                                                        </select>
                                                 </div>

                                                 <div class="col-6" >
                                                        <label for="Tramo">Tramo</label>
                                                        <select class="form-control" id="cmbTramo" name="Tramo" required>
                                                        </select>     
                                                 </div>                                     
                                            </div>

                                            <div class="row" style="margin-top: 10px;"     >
                                                    <div class="col-6"  >
                                                        <label for="fecha">Fecha de la incidencia</label>
                                                        <div class="input-group date" id="fechaincidenciadtp" data-target-input="nearest">
                                                            <input id="dtFechaincidencia" type="text" name="fecha" autocomplete="off" class="form-control" required>
                                                            <div class="input-group-append" data-target="#fechaincidenciadtp" data-toggle="datetimepicker">
                                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                            </div>
                                                        </div>
                                                    </div>                                                

                                                    <div class="col-6"  >
                                                        <label for="PlazoResolucion">Plazo de resolución (días)</label>
                                                        <input type="number" class="form-control" id="txtPlazoResolucion" name="PlazoResolucion"  step="1" pattern="^[-/d]/d*$">
                                                    </div>                                                                                                
                                            </div>

                                                                          

                                            <div class="row"  style="margin-top: 10px;"     >
                                                    <div class="col-6"  >
                                                        <label for="TipoIncidencia">Tipo de incidencia</label>
                                                        <select class="form-control" id="cmbTipoIncidencia" name="TipoIncidencia" required>
                                                        </select>
                                                    </div>

                                                    <div class="col-6"  >
                                                        <label for="Severidad">Severidad</label>
                                                        <select class="form-control" id="cmbSeveridad" name="Severidad" required>
                                                        </select>
                                                    </div>                                                    
                                            </div>
                                     </div>

                                     <div class="col-6"  >
                                            <div id="map"></div>
                                            <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
                                            <script async
                                                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI&callback=initMap">
                                            </script>
                                            <div style="text-align:center;"><label>Seleccione en el mapa la ubicación de la incidencia</label></div>
                                     </div>
                                </div>


                                <div class="row"  style="margin-top: 10px; margin-right: 15px;"   >                                        
                                        <div class="col-3"  >
                                            <label for="EstacionInicial">Estación inicial</label>
                                            <input type="number" class="form-control" id="txtEstacionInicial" name="EstacionInicial" >
                                        </div>                                                

                                        <div class="col-3"  >
                                            <label for="EstacionFinal">Estación final</label>
                                            <input type="number" class="form-control" id="txtEstacionFinal" name="EstacionFinal" >
                                        </div>                                                                               

                                        <div class="col-3"  >
                                                <label for="Latitud">Latitud</label>
                                                <input type="number" class="form-control" id="txtLatitud" name="Latitud" >
                                        </div>

                                        <div class="col-3"  >
                                                <label for="Longitud">Longitud</label>
                                                <input type="number" class="form-control" id="txtLongitud" name="Longitud" >
                                        </div>
                                </div>

                                <div class="row"  style="margin-top: 10px; margin-right: 15px;"   >
                                     <div class="col-3"  >
                                            <label for="Estado">Estado</label>
                                            <select class="form-control" id="cmbEstado" name="Estado" required>
                                            </select>
                                     </div>
                                    <div class="col-3"  >
                                            <div class="form-group custom-control custom-checkbox " style="margin: 0;
                                              position: absolute; top: 50%; -ms-transform: translateY(-50%);
                                              transform: translateY(-50%); "  >
                                            <input type="checkbox" class="custom-control-input" id="chkSenalizacionPreventiva">
                                            <label class="custom-control-label" for="chkSenalizacionPreventiva">Señalización preventiva</label>
                                        </div>
                                    </div>
                                    <div class="col-3"  >
                                            
                                    </div>
                                    <div class="col-3"  >
                                            
                                    </div>
                                </div>
                                
                                <div class="row"  style="margin-top: 10px; margin-right: 15px;"   >
                                     <div class="col-12"  >
                                            <label for="txtDescripcion">Descripción de la incidencia</label>
                                            <textarea class="form-control" id="txtDescripcion" name="txtDescripcion" rows="3"></textarea>
                                     </div>                                    
                                </div>

                                <div class="row"  style="margin-top: 10px; margin-right: 15px;"   >
                                     <div class="col-12"  >
                                            <label for="txtAccionInicial">Acción inicial</label>
                                            <textarea class="form-control" id="txtAccionInicial" name="txtAccionInicial" rows="3"></textarea>
                                     </div>                                    
                                </div>

                                <div class="row"  style="margin-top: 10px; margin-right: 15px;"   >
                                     <div class="col-12"  >
                                            <label for="txtAccionesCorrectivas">Acciones correctivas</label>
                                            <textarea class="form-control" id="txtAccionesCorrectivas" name="txtAccionesCorrectivas" rows="3"></textarea>
                                     </div>                                    
                                </div>

                                <div class="row"  style="margin-top: 10px; margin-right: 15px;"   >                                     
                                    <div class="col-12"   >
                                            <label for="txtObservaciones">Observaciones</label>
                                            <textarea class="form-control" id="txtObservaciones" name="txtObservaciones" rows="3"></textarea>
                                    </div>
                                </div>

                               

                                <br><br>

                                <div class="row" style="margin-right: 10px;">         
                                     <div class="col-4" style="text-align:left;" >
                                        <button type="button" id="btnVerInforme" class="btn btn-secondary btn-form" onclick="fnImprimirInformeIndividual();">informe individual</button>                               
                                     </div>
                                     <div class="col-4"  >
                                     </div>
                                     <div class="col-4" style="text-align:right;"> 
                                        <button type="button" id="btnGuardar" class="btn btn-primary btn-form" onclick="fnGrabarRegistro();">guardar incidencia</button>                               
                                     </div>
                                </div>

                                <br><br>

                                <div id="mostrarEnModoEdicion">

                                        <h4 class="text-left ">Fotografías y videos</h4>
                                        <hr class="line mx-md-8" />

                                        <br>

                                        <h5>Fotografías</h5>


                                        <div class="gallery-wrapper row">
                                            <div id="dFotos" class="gallery-bg" style="margin-left: 5px; margin-right: 5px; max-height: 310px; overflow-y: scroll;" >
                                                <div style="margin-top: 15px; margin-right: 20px;"  >
                                                    <input type="checkbox"  name="chkFoto1" id="chkFoto1">
                                                    <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                                                </div>
                                                <div style="margin-top: 15px; margin-right: 20px;"  >
                                                    <input type="checkbox"  name="chkFoto2" id="chkFoto2">
                                                    <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                                                </div>
                                                <div style="margin-top: 15px; margin-right: 20px;"  >
                                                    <input type="checkbox"  name="chkFoto3" id="chkFoto3">
                                                    <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                                                </div>
                                            </div>

                                        </div>

                                        <br>
                                    
                                        <div class="row" style="margin-right: 10px;">         
                                             <div class="col-6"></div>
                                             <div class="col-6" style="text-align:right; "> 
                                                <button type="button" id="btnAgregarFoto" class="btn btn-primary btn-form" onclick="$('#modalAdjuntarFoto').show();" >+ Agregar fotografía</button>                                 
                                             </div>
                                        </div>

                                        <br><br>

                                        <h5>Videos</h5>

                                        <div class="gallery-wrapper row">
                                            <div id="dVideos" class="gallery-bg"  style="margin-left: 10px; margin-right: 20px; max-height: 310px; overflow-y: scroll;"  >
                                                    <div style="margin-top: 15px; margin-right: 20px;"  >
                                                        <input type="checkbox"  name="chkVideo1" id="chkVideo1">
                                                        <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                                                    </div>
                                                    <div style="margin-top: 15px; margin-right: 20px;"  >
                                                        <input type="checkbox"  name="chkVideo2" id="chkVideo2">
                                                        <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                                                    </div>
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row" style="margin-right: 10px;">         
                                             <div class="col-6"></div>
                                             <div class="col-6" style="text-align:right; "> 
                                                <button type="button" id="btnAgregarVideo" class="btn btn-primary btn-form" onclick="$('#modalAdjuntarVideo').show();" >+ Agregar video</button>                               
                                             </div>
                                        </div>

                                        <br><br>

                                        <h4 class="text-left ">Adjuntar archivos</h4>
                                        <hr class="line mx-md-8" />

                                        <div class="row" style="margin-left: 10px; margin-right: 25px;" >          
                                        <hr />
                                               <div class="table-responsive mt-5">
                                                    <table class="table table-bordered" id="tableArchivosAdjuntos">
                                                        <thead>
                                                            <tr>
                                                                <th class="spacer"></th>
                                                                <th></th>
                                                                <th style="width: 100px; text-align: center;">No.</th>
                                                                <th>Nombre del archivo</th>
                                                                <th style="width: 160px">Fecha de carga</th>
                                                                <th style="width: 160px; text-align: left;">Tamaño</th>
                                                                <th>Usuario</th>
                                                                <th style="width: 150px; text-align: center;"></th>
                                                                <th class="spacer"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody  id="tbodyArchivosAdjuntos">
                                                            <tr >
                                                                <td class="spacer"></td>
                                                                <td></td>
                                                                <td style="width: 100px; text-align: center;">1</td>
                                                                <td style="padding-left: 15px;">Nombre del archivo</td>
                                                                <td style="width: 160px; padding-left: 15px;">06/06/2021</td>
                                                                <td style="width: 160px; text-align: left; padding-left: 15px;">500 Mb</td>
                                                                <td style="padding-left: 15px;">Nombre del usuario</td>
                                                                <td style="width: 150px; text-align: center;"><a href="/Images/Icons/icono_mapa.png" download="w3logo">Descargar</a></td>
                                                                <td class="spacer"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                        </div>

                                        <br>
                            
                                        <div class="row" style="margin-right: 10px;">         
                                             <div class="col-6"></div>
                                             <div class="col-6" style="text-align:right; "> 
                                                <button type="button" id="btnAgregarArchivo" class="btn btn-primary btn-form" onclick="$('#modalAdjuntarArchivo').show();">+ Adjuntar archivo</button>                              
                                             </div>
                                        </div>

                                        <br><br>
                                </div>  <%--id="mostrarEnModoEdicion"--%>
                       </div>            
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modalAdjuntarFoto" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >
            <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Agregar fotografía</h1>
                        <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalAdjuntarFoto').modal('toggle');">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">

                        <div id="card-adjuntar-foto" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >
                            <div class="card-body" >

                                <div class="row" style="margin-top: 10px;"  >
                                        <div class="col-6"  >
                                                <div class="p-2">
                                                    <h6>Elija la fotografía que desea agregar:</h6>
                                                </div>
                                                <div class="p-2">
                                                    <INPUT id="fileFotoAdjuntar" type="file" NAME="fileFotoAdjuntar"  accept="image/*" >
                                                </div>
                                        </div>                                                

                                        <div class="col-6"  >
                                        
                                        </div>
                                </div>

                                <div class="row" style="margin-top: 10px;"  >
                                        <div class="col-4"  >
                                                <label for="fecha">Fecha de la fotografía</label>
                                                        <div class="input-group date" id="dtFoto" data-target-input="nearest">
                                                            <input id="dtFechaFoto" type="text" name="fecha" autocomplete="off" class="form-control" required>
                                                            <div class="input-group-append" data-target="#dtFoto" data-toggle="datetimepicker">
                                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                            </div>
                                                        </div>                                                                                        
                                        </div>                                                
                                    
                                        <div class="col-4"  >
                                                <label for="Latitud">Latitud</label>
                                                <input type="number" class="form-control" id="txtLatitudFoto" name="LatitudFoto" >                                            
                                        </div>

                                        <div class="col-4"  >                                            
                                                <label for="Longitud">Longitud</label>
                                                <input type="number" class="form-control" id="txtLongitudFoto" name="Longitud" >
                                        </div>
                                </div>

                                <div class="row" style="margin-top: 10px;"  >
                                        <div class="col-12"  >
                                                <label for="txtComentarioFotoAdjuntar">Comentario</label>
                                                        <textarea class="form-control" id="txtComentarioFotoAdjuntar" name="txtComentarioFotoAdjuntar" rows="3"></textarea>                                            
                                        </div>
                                </div>
                          

                                <div class="row" style="margin-top: 20px;">                                
                                    <div class="col-12" style=" text-align: right;"  >
                                        <button type="button" id="btnAdjuntarFoto" class="btn btn-primary btn-form" onclick="fnAdjuntarFoto();">Agregar</button>
                                    </div>                                
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  <%--modalAdjuntarFoto--%>

        
        <div class="modal" tabindex="-1" role="dialog" id="modalAdjuntarVideo" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >
            <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1>Agregar video</h1>
                        <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalAdjuntarVideo').modal('toggle');">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">

                        <div id="card-adjuntar-video" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >
                            <div class="card-body" >

                                <div class="row" style="margin-top: 10px;"  >
                                        <div class="col-8"  >
                                                <div class="p-2">
                                                    <h6>Elija el video que desea agregar:</h6>
                                                </div>
                                                <div class="p-2">
                                                    <INPUT id="fileVideoAdjuntar" type="file" NAME="fileVideoAdjuntar"  accept="video/mp4" >
                                                </div>
                                        </div>                                                

                                        <div class="col-4" style="text-align:right;"  >
                                                <video id="video-element" height="100" controls>
                                                    <source type="video/mp4">
                                                </video>
                                                <canvas id="canvas-element" style="display:none;"></canvas>
                                        </div>
                                </div>

                                <div class="row" style="margin-top: 10px;"  >
                                        <div class="col-4"  >
                                                <label for="fecha">Fecha del video</label>
                                                        <div class="input-group date" id="dtVideo" data-target-input="nearest">
                                                            <input id="dtFechaVideo" type="text" name="fecha" autocomplete="off" class="form-control" required>
                                                            <div class="input-group-append" data-target="#dtVideo" data-toggle="datetimepicker">
                                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                            </div>
                                                        </div>                                                                                        
                                        </div>                                                
                                    
                                        <div class="col-4"  >
                                                <label for="Latitud">Latitud</label>
                                                <input type="number" class="form-control" id="txtLatitudVideo" name="LatitudVideo" >                                            
                                        </div>

                                        <div class="col-4"  >                                            
                                                <label for="Longitud">Longitud</label>
                                                <input type="number" class="form-control" id="txtLongitudVideo" name="LongitudVideo" >
                                        </div>
                                </div>

                                <div class="row" style="margin-top: 10px;"  >
                                        <div class="col-12"  >
                                                <label for="txtComentarioFotoAdjuntar">Comentario</label>
                                                        <textarea class="form-control" id="txtComentarioVideoAdjuntar" name="txtComentarioFotoAdjuntar" rows="3"></textarea>                                            
                                        </div>
                                </div>
                          
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-9"  ></div>
                                    <div class="col-2" style=" text-align: left;"  >
                                        <button type="button" id="btnAdjuntarVideo" class="btn btn-primary btn-form" onclick="fnAdjuntarVideo();">Agregar</button>
                                    </div>
                                    <div class="col-1"  ></div>
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  <%--modalAdjuntarVideo--%>  

         
        <div class="modal" tabindex="-1" role="dialog" id="modalAdjuntarArchivo" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Adjuntar archivo</h1>
                    <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalAdjuntarArchivo').modal('toggle');">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <div id="card-adjuntar-archivo" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >
                        <div class="card-body" >
                            <div class="p-2">
                                <h6>Elija el archivo que desea adjuntar:</h6>
                            </div>
                            <div class="p-2">
                                <INPUT id="fileArchivoAdjuntar" type="file" NAME="fileArchivoAdjuntar" >
                            </div>                          
                        
                            <br />

                            <div class="p-2">
                                    <label for="txtComentarioArchivoAdjuntar">Comentario</label>
                                    <textarea class="form-control" id="txtComentarioArchivoAdjuntar" name="txtComentarioArchivoAdjuntar" rows="3"></textarea>
                            </div>

                            <br />

                            <div class="row" style="margin-top: 20px;">                                
                                <div class="col-12" style=" text-align: right;"  >
                                    <button type="button" id="btnAdjuntar" class="btn btn-primary btn-form" onclick="fnAdjuntarArchivo();">Adjuntar</button>
                                </div>                                
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  <%--modalAdjuntarArchivo--%>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>

    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>

    <%: Scripts.Render("~/js/jsIncidenciasPantallaEdicion_SubirVideo.js") %>
    <script type="text/javascript">
        thumbnail = '<%= ViewState["thumbnail"] %>'
        $(document).ready(function () {
            loadDefaultComponents();
        });
    </script>
</asp:Content>
