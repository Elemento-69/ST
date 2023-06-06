<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEmergenciasEdicionVideo.aspx.cs" Inherits="Covialgt.Emergencias.frmEmergenciasEdicionVideo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <style type="text/css">
      /* Set the size of the div element that contains the map */
      #map {       
        height: 90%;
      }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../js/jsEmergenciasPantallaEdicionVideo.js"></script>
    <script src="../js/jsEmergenciasPantallaEdicionVideoToken.js"></script>

    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    
    <h1 class="mb-0">Video</h1>
    <hr class="thick" />

    <div class="row">

        <div class="col-12">  
            <div id="card-datos" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
                        <div class="card-body" >

                                <h4 class="text-left ">Datos del video</h4>
                                <hr class="line mx-md-8" />

                                <div class="row" style="margin-right: 15px;">
                                     <div class="col-6"  >    
                                             <div class="row" >
                                                 <div class="col-4">
                                                    <label>Tramo:</label>
                                                 </div>
                                                 <div class="col-8">
                                                    <label id="lblTramo">[Tramo]</label>
                                                 </div>
                                             </div>

                                             <div class="row" >
                                                 <div class="col-4">
                                                    <label>Nombre del archivo:</label>
                                                 </div>
                                                 <div class="col-8">
                                                    <label id="lblNombreArchivo">[Nombre del archivo]</label>
                                                 </div>
                                             </div>                                             
                                             
                                            <div class="row" >
                                                 <div class="col-4">
                                                    <label>Fecha:</label>
                                                 </div>
                                                 <div class="col-8">
                                                    <label id="lblFecha">[Fecha]</label>
                                                 </div>
                                             </div>
                                         
                                            <div class="row" >
                                                 <div class="col-4">
                                                    <label>Formato:</label>
                                                 </div>
                                                 <div class="col-8">
                                                    <label id="lblFormato">[Formato]</label>
                                                 </div>
                                             </div>

                                         <br />

                                            <div class="row" >
                                                <div class="col-6">
                                                    <label for="Latitud">Latitud:</label>
                                                    <input type="number" class="form-control" id="txtLatitud" name="Latitud" >
                                                </div>
                                                <div class="col-6">
                                                    <label for="Longitud">Longitud:</label>
                                                    <input type="number" class="form-control" id="txtLongitud" name="Longitud" >
                                                </div>
                                            </div>
                                     </div>

                                     <div class="col-6"  >
                                            <div id="map"></div>
                                            <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
                                            <script async
                                                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI&callback=initMap">
                                            </script>
                                            <div style="text-align:center;"><label>Seleccione en el mapa la ubicación donde se tomó la fotografía</label></div>
                                     </div>
                                </div>

                                <div class="row" style="margin-right: 15px; margin-top: 15px;">
                                    <div class="col-12"  >
                                        <label for="txtComentario">Comentario:</label>
                                        <textarea class="form-control" id="txtComentario" name="txtComentario" rows="3"></textarea>
                                    </div>
                                </div>

                                <div class="row" style="margin-right: 15px; margin-top: 15px;">
                                    <div class="col-8"></div>
                                     <div class="col-4" style="text-align:right;"> 
                                        <button type="button" id="btnGuardar" class="btn btn-primary btn-form" onclick="fnGrabarRegistro();">guardar datos</button>                               
                                     </div>
                                </div>

                        </div>  <%--div class="card-body"--%>    
            </div> <%--div id="card-datos--%>
        
        
            <div id="card-adjuntar-video" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >
                        <div class="card-body" >

                            <div class="row" style="margin-top: 10px;"  >                                    
                                    <div class="col-12" style="text-align:center;"  >
                                            <video id="video-element" width="100%" controls>
                                                <source type="video/mp4">
                                            </video>
                                            <canvas id="canvas-element" style="display:none;"></canvas>
                                    </div>
                            </div>

                            <div class="row" style="margin-top: 10px;"  >                                                                              
                                    <div class="col-6"  >
                                            <div class="image-container" >
                                                <img id="imageThumbnail" width="100%" src="https://htmldom.dev/assets/city.jpg" />
                                            </div>                                           
                                    </div>

                                    <div class="col-6" style="text-align:center; padding-top: 10%;"  >                                            
                                            <button type="button" id="btnGuardarThumbnail" class="btn btn-primary btn-form" onclick="fnGrabarThumbnail();">Guardar imagen actual en el video como thumbnail</button>
                                    </div>
                            </div>
                                                     
                        </div>
                    </div>

        </div>

    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">       

    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
      <script type="text/javascript">

          thumbnail = '<%= ViewState["thumbnail"] %>'
      </script>
</asp:Content>
