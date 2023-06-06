<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEstimacionesEstructuraRenglones.aspx.cs" Inherits="Covialgt.Estimaciones.frmEstimacionesEstructuraRenglones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <style type="text/css">
        /* Set the size of the div element that contains the map */
        #map {
            width: 100%;
            /* The width is the width of the web page */
        }
        td {
            width: auto;
        }

        td.min {
            width: 1%;
            white-space: nowrap;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>


    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
               
    
    <h1 class="mb-0">Estructura de Estimaciones Renglones</h1>
    <hr class="thick" />
    
    <br>

    <div class="row">        
                <div class="col-3"  >                                        
                    <select class="form-control" id="cmbPlanAnual1" name="PlanAnual1"  required>
                            <option disabled selected>Plan anual</option>                                               
                    </select>
                </div>
                <div class="col-3" >
                    <select class="form-control" id="cmbPrograma1" name="Programa1"  required>
                            <option disabled selected>Programa</option>
                    </select>
                </div>
                <div class="col-3"   >
                    <select class="form-control" id="cmbProyecto1" name="Proyecto1"  required>
                            <option disabled selected>Proyecto</option>
                    </select>
                </div>
                <div class="col-3" style="text-align: center;">
                    <button type="button" id="btnBuscar" class="btn btn-primary btn-form" style="width: 90%;" onclick="fnCargarEstimacionesFiltradas();">Buscar estimaciones</button>
                </div>            
    </div>

    <br />


    <section id="areaFinanciera">
        <h2 class="mt-5"><span class="title-bg">Estimaciones</span></h2>
        <hr />
        
        <div class="table-responsive mt-5">
                    <Table Class="table table-bordered mb-0" ID="tableEstimaciones">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th>Detalle</th>
                                <th>No.</th>
                                <th>Periodo</th>
                                <th>Monto Retención</th>
                                <th>Monto Ejecutado</th>
                                <th>Monto a Recibir</th>
                                <th>Monto Embargado</th>
                                <th>Aprobado por Supervisión</th>
                                <th>Estado de la estimación</th>
                                <th>Fecha del estado</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td Class="table-total border-0" colspan="11" >
                                    Monto Total: <span class="frcurrency-mask" id="total-estimaciones"></span>
                                </td>
                            </tr>    
                        </tfoot>
                    </Table>
                </div>
        
    </section>

    <div class="modal fade" id="estimacionModal" tabindex="-1" role="dialog" aria-labelledby="estimacionModal" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titulo-pantalla-detalle">Detalle de Estimaciones</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0" id="estimacion_detail-table">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th>Tramo</th>
                                    <th>Descripción del tramo</th>
                                    <th>RenglonCodCOVIAL</th>
                                    <th>ProyectoRenglonNombre</th>
                                    <th>Cantidad</th>
                                    <th>Precio unitario</th>
                                    <th>Monto</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>RD-SOL-05</td>
                                    <td>SOLOLÁ - CONCEPCION</td>
                                    <td>Co 304.1.02.03.c</td>
                                    <td>Colocación de nueva carpeta de concreto asfaltico en labores de bacheo (En Caliente)</td>                                    
                                    <td>12,600</td>
                                    <td>Q1.60</td>
                                    <td>Q20,160.00</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>RD-SOL-05</td>
                                    <td>SOLOLÁ - CONCEPCION</td>
                                    <td>Co 801</td>
                                    <td>Dispositivos de Seguridad</td>                                    
                                    <td>18,750</td>
                                    <td>Q3.00</td>
                                    <td>Q56,250.00</td>
                                    <td class="spacer"></td>
                                </tr>                                
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td Class="table-total border-0" colspan="9" >
                                        Monto ejecutado: <span class="frcurrency-mask" id="total-detalle-estimaciones"></span>
                                    </td>
                                </tr>    
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/Chart.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>

    <%--Archivos Js --%>
    <%: Scripts.Render("~/js/jsEstimacionesEstructuraRenglones.js") %>    
  
</asp:Content>
