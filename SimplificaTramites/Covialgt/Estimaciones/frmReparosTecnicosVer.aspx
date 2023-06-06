<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmReparosTecnicosVer.aspx.cs" Inherits="Covialgt.Estimaciones.frmReparosTecnicosVer" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
   <script src="https://code.jquery.com/jquery-1.12.4.js"></script>    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>


    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
               
    
    <h1 class="mb-0">Ver reparo técnico</h1>
    <hr class="thick" />
    
    <br>

    <div class="row"      >        
                <div class="col-8"  >                                        
                    <label for="txtTerminoBusqueda">Término de búsqueda:</label>
                    <input type="text" class="form-control" id="txtTerminoBusqueda" name="txtTerminoBusqueda" >
                    <h4 id="lblInstrucciones" style="margin-top: 10px; font-size:small;">* Términos de búsqueda: código del proyecto, plan anual, correlativo de la estimación</h4>
                </div>
                <div class="col-1" ></div>
                <div class="col-3" style="text-align: center; margin-top: 30px;">
                    <button type="button" id="btnBuscar" class="btn btn-primary btn-form" style="width: 90%;" onclick="fnCargarTablaReparos();">Buscar</button>
                </div>
    </div>

    <div class="row"> 
                <hr />
                <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="tableReparos">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th></th>
                                <th>ID Reparo</th>
                                <th>Fecha del reparo</th>                                
                                <th>Proyecto</th>
                                <th>Año</th>
                                <th>Estimación</th>                                
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
    </div>

    <div class="row big-gutter">
               <div id="reportDiv">
    </div></div>

    <div class="modal" tabindex="-1" role="dialog" id="modalVerReparo" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 id="tituloModal">Datos del reparo No.:</h1>
                    <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalVerReparo').modal('toggle'); return false;">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <div id="card-datos-reparo" class="card custom-card" style="margin-left: 10px; margin-top: 0px;  margin-right: 10px; margin-bottom: 0px;" >
                        <div class="card-body" >

                            <div class="row" style="margin-top: 10px;"  >
                                    <div class="col-3"  >
                                            <h1 style="font-size:medium;" >Fecha:</h1>
                                            <label id="lblFecha">01/12/2021</label>
                                    </div>         
                               
                                    <div class="col-3"  >
                                            <h1 style="font-size:medium;" >Año:</h1>
                                            <label id="lblAnio">2021</label>
                                    </div>

                                    <div class="col-3"  >                                            
                                            <h1 style="font-size:medium;" >Proyecto:</h1>
                                            <label id="lblProyecto">B-202</label>
                                    </div>

                                    <div class="col-3"  >
                                            <h1 style="font-size:medium;" >Estimación:</h1>
                                            <label id="lblEstimacion">2</label>
                                    </div>
                            </div>
                                                    
                            <div class="row" style="margin-top: 20px;">                                                                
                                <div class="col-12" style=" text-align: right; "  >
                                    <button type="button" id="btnGenerarReporte" class="btn btn-secondary btn-form" onclick="generarReporteNuevaPestana();">Generar reporte</button>
                                </div>                                
                            </div>                                                         
                        </div>
                    </div> <%--card-datos-reparo--%>

                     <div class="row"  style="margin-left: 10px; margin-top: 0px;  margin-right: 10px; margin-bottom: 0px;"> 
                                <hr />
                                <div class="table-responsive mt-5">
                                    <table class="table table-bordered" id="tableDetalleFaltas">
                                        <thead>
                                            <tr>
                                                <th class="spacer"></th>                                                                                                                
                                                <th style="width: 50px">No.</th>                                
                                                <th>Tipo de falta</th>
                                                <th>Observaciones</th>                                                        
                                                <th class="spacer"></th>
                                            </tr>
                                        </thead>
                                        <tbody id="bodyTableDetalleFaltas">
                                        </tbody>
                                    </table>
                                </div>
                    </div>


                </div>
            </div>
        </div>
    </div> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/js/jsReparosTecnicosVer.js") %>
</asp:Content>
