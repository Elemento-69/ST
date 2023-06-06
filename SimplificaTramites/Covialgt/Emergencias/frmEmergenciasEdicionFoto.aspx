<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEmergenciasEdicionFoto.aspx.cs" Inherits="Covialgt.Emergencias.frmEmergenciasEdicionFoto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <style type="text/css">
      /* Set the size of the div element that contains the map */
      #map {       
        height: 90%;
      }
    </style>

    <style>
            .image-container {
                        /* Center the content */
                        align-items: center;
                        display: flex;
                        justify-content: center;

                        overflow: auto;
                        width: 100%;
                    }

            .container {
                /* Content is centered horizontally */
                align-items: center;
                display: flex;

                /* Size */
                height: 32px;
            }

            .container__left {
                height: 2px;

                /* Colors */
                background-color: rgba(0, 0, 0, .3);
            }

            .container__circle {
                /* Size */
                height: 32px;
                width: 32px;

                /* Rounded border */
                border-radius: 9999px;

                /* Colors */
                background-color: rgba(0, 0, 0, .3);

                /* Indicate the element draggable */
                cursor: pointer;

                /* It will be positioned absolutely */
                /*position: absolute;*/

                /* Doesn't allow to select the content inside */
                user-select: none;
            }

            .container__right {
                /* Take the remaining width */
                flex: 1;
                height: 2px;

                /* Colors */
                background-color: rgba(0, 0, 0, .3);
            }

            .right {
                /* Take the remaining width */
                flex: 1;
                height: 2px;
            }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../js/jsEmergenciasPantallaEdicionFoto.js?y=2"></script>
    <script src="../js/jsEmergenciasPantallaEdicionFotoToken.js"></script>

    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="http://cdn.sobekrepository.org/includes/jquery-rotate/2.2/jquery-rotate.min.js"></script>
    <h1 class="mb-0">Fotografía</h1>
    <hr class="thick" />

    <div class="row">

        <div class="col-12">  
            <div id="card-datos" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
                        <div class="card-body" >

                                <h4 class="text-left ">Datos de la fotografía</h4>
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
        </div>

    </div>


    <div class="row"  >  
        <div class="col-12" > 
            <div id="card-foto" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px; " >          
                    <div class="card-body"  >

                            <div class="row" style="margin-top: 30px;  height: auto;
  min-height: 100% !important; "  >
                                    <div class="col-3" style="text-align:center;"  >
                                        <button type="button" id="btnRotarFotoIzquierda" class="btn btn-secondary btn-form" onclick="fnRotarFoto(true);"><i class="fas fa-undo fa-lg fa-fw"></i>&nbsp;&nbsp;Rotar</button>
                                    </div>
                                    <div class="col-6"  >
                                        
                                        
                                        <!-- The range slider -->
                                        <div class="container" id="container_slider">
                                            <!-- Left side -->
                                            <div>10%</div>
                                            <!-- Width based on the current value -->
                                            <div class="container__left" id="knob_left" style="width: 40%"></div>

                                            <!-- Circle -->
                                            <div class="container__circle" id="knob"></div>

                                            <!-- Right side -->
                                            <div class="container__right"></div>
                                            <div>200%</div>
                                        </div>


                                    </div>
                                    <div class="col-3" style="text-align:center;"  >                                                                              
                                        <button type="button" id="btnRotarFotoDerecha" class="btn btn-secondary btn-form" onclick="fnRotarFoto(false);">rotar&nbsp;&nbsp;<i class="fas fa-undo fa-lg fa-fw  fa-flip-horizontal"></i></button>
                                    </div>
                            </div>
                    
                            <div class="row" style="margin-top: 30px; overflow: auto; "  >
                                    <div class="image-container"  >
                                        <img id="image-foto"  />
                                    </div>
                            </div>

                    </div>  <%--div class="card-body"--%>    
            </div> <%--div id="card-foto"--%>
        </div>
    </div>
</asp:Content>



<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">       
    <script src="../js/jsEmergenciasPantallaEdicionFoto_ZoomFoto.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
       <script type="text/javascript">
           thumbnail = '<%= ViewState["thumbnail"] %>'
           vRutaEmergencias = '<%= Session["vRutaEmergencias"] %>'
       
       </script>
</asp:Content>
