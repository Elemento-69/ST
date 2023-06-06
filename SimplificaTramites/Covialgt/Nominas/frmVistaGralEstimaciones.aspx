<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmVistaGralEstimaciones.aspx.cs" Inherits="Covialgt.Nominas.frmVistaGralEstimaciones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">

    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Content/wizard.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <%--<script src="../Scripts/jquery-3.5.1.min.js"></script>--%>
    <%--<script src="../Scripts/bootstrap.min.js"></script>--%>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <script src="../js/jsVistaGralEstimaciones.js"></script>
    <!-- Scripts -->

    <h1>Vista de Monto de Estimaciones</h1>
    <hr class="thick" />

    <div id="testDiv" tabindex="-1">
    </div>



    <div class="row">
        <div class="form-group col-md-12">
            <label for="cmbPlanes">Año</label>
            <select id="cmbPlanes" class="form-control"></select>
        </div>
    </div>
    <div class="text-right pt-5">
        <button type="button" id="btnFiltrar" class="btn btn-primary btn-form">BUSCAR</button>
        <%-- <button type="button" id="btnReporteResumen" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
        <button type="button" id="btnReporteDetalle" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>--%>
    </div>
    <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="resumen-tab" data-toggle="tab"
                href="#resumen" role="tab" aria-controls="resumen" aria-selected="true">Resumen</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="resumenpdte-tab" data-toggle="tab"
                href="#resumenpdte" role="tab" aria-controls="resumenpdte" aria-selected="false">Resumen Pendiente de Nómina</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="estadosvisa-tab" data-toggle="tab"
                href="#estadosvisa" role="tab" aria-controls="estadosvisa" aria-selected="false">Estados de VISA</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="estadostecnico-tab" data-toggle="tab"
                href="#estadostecnico" role="tab" aria-controls="estadostecnico" aria-selected="false">Estados de TECNICO</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="estadosfinanciero-tab" data-toggle="tab"
                href="#estadosfinanciero" role="tab" aria-controls="estadosfinanciero" aria-selected="false">Estados de FINANCIERO</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="estadospagado-tab" data-toggle="tab"
                href="#estadospagado" role="tab" aria-controls="estadospagado" aria-selected="false">Estados de PAGADO</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="resumen" role="tabpanel" aria-labelledby="resumen-tab">
            <div class="text-right pt-5">
                <button type="button" id="btnReporteResumen" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
                <button type="button" id="btnReporteDetalle" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>
                <button type="button" id="btnReporteDetalleIndividual" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE INDIVIDUAL</button>
            </div>

            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="tableResumen">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th>ACTIVIDAD</th>
                            <th style="text-align: right">No.Estimaciones en VISA</th>
                            <th style="text-align: right">Monto en VISA</th>
                            <th style="text-align: right">No. Estimaciones en TÉCNICO</th>
                            <th style="text-align: right">Monto en TÉCNICO</th>
                            <th style="text-align: right">No. Estimaciones en FINANCIERO</th>
                            <th style="text-align: right">Monto en FINANCIERO</th>
                            <th style="text-align: right">No. Estimaciones TOTALES</th>
                            <th style="text-align: right">Monto TOTAL</th>
                            <th style="text-align: right">No. Estimaciones PAGADAS</th>
                            <th style="text-align: right" id="Monto">Monto PAGADO Nómina 0</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="spacer"></th>
                            <th>TOTAL</th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalCVISA"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalVISA"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalCTECNICO"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalTECNICO"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalCFINANCIERO"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalFINANCIERO"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalCTOTAL"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalTOTAL"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalCPAGADO"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TotalPAGADO"></span></th>
                            <th class="spacer"></th>

                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <div class="tab-pane fade show" id="resumenpdte" role="tabpanel" aria-labelledby="resumenpdte-tab">
            <div class="text-right pt-5">
                <button type="button" id="btnReporteResumenpdte" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
                <button type="button" id="btnReporteDetalleresumenpdte" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>
                <button type="button" id="btnReporteDetalleresumenpdtedetalle" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE INDIVIDUAL</button>
            </div>

            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="tableResumenPendiente">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th>ACTIVIDAD</th>
                            <th style="text-align: right">No.Estimaciones en VISA</th>
                            <th style="text-align: right">Monto en VISA</th>
                            <th style="text-align: right">No. Estimaciones en TÉCNICO</th>
                            <th style="text-align: right">Monto en TÉCNICO</th>
                            <th style="text-align: right">No. Estimaciones en FINANCIERO</th>
                            <th style="text-align: right">Monto en FINANCIERO</th>
                            <th style="text-align: right">No. Estimaciones TOTALES</th>
                            <th style="text-align: right">Monto TOTAL</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="spacer"></th>
                            <th>TOTAL</th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstVISA1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoEstVISA1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TCantEstTECNICO1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoEstTECNICO1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstFINANCIERO1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoFINANCIERO1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstTotal1"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoTotal1"></span></th>
                            <th class="spacer"></th>

                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <div class="tab-pane fade show" id="estadosvisa" role="tabpanel" aria-labelledby="estadosvisa-tab">
            <div class="text-right pt-5">
                <button type="button" id="btnReporteestadosvisa" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
                <%--<button type="button" id="btnReporteDetalleestadosvisa" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>--%>
            </div>
            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="tableEstadosvisa">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th>ESTADO</th>
                            <th style="text-align: right">No.Estimaciones</th>
                            <th style="text-align: right">Monto</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="spacer"></th>
                            <th>TOTAL</th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstVISA2"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoEstVISA2"></span></th>
                            <th class="spacer"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="tab-pane fade show" id="estadostecnico" role="tabpanel" aria-labelledby="estadostecnico-tab">
            <div class="text-right pt-5">
                <button type="button" id="btnReporteestadostecnico" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
                <%-- <button type="button" id="btnReporteDetalleestadostecnico" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>--%>
            </div>
            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="tableEstadostecnico">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th>ESTADO</th>
                            <th style="text-align: right">No.Estimaciones</th>
                            <th style="text-align: right">Monto</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="spacer"></th>
                            <th>TOTAL</th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstTecnico"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoTecnico"></span></th>
                            <th class="spacer"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="tab-pane fade show" id="estadosfinanciero" role="tabpanel" aria-labelledby="estadosfinanciero-tab">
            <div class="text-right pt-5">
                <button type="button" id="btnReporteestadosfinanciero" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
                <%-- <button type="button" id="btnReporteDetalleestadosfinanciero" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>--%>
            </div>
            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="tableEstadosfinanciero">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th>ESTADO</th>
                            <th style="text-align: right">No.Estimaciones</th>
                            <th style="text-align: right">Monto</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                     <tfoot>
                        <tr>
                            <th class="spacer"></th>
                            <th>TOTAL</th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstFinanciero"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoFinanciero"></span></th>
                            <th class="spacer"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="tab-pane fade show" id="estadospagado" role="tabpanel" aria-labelledby="estadospagado-tab">
            <%--      <div class="text-right pt-5">
               <button type="button" id="btnReporteestadospagado" class="btn btn-outline-secondary btn-form">IMPRIMIR RESUMEN</button>
                <button type="button" id="btnReporteDetalleestadospagado" class="btn btn-outline-secondary btn-form">IMPRIMIR DETALLE</button>
            </div>--%>
            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="tableEstadospagado">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th>ESTADO</th>
                            <th style="text-align: right">No.Estimaciones</th>
                            <th style="text-align: right">Monto</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                        <tfoot>
                        <tr>
                            <th class="spacer"></th>
                            <th>TOTAL</th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TEstPagado"></span></th>
                            <th class="table-total border-0" style="text-align: right" colspan="1"><span id="TMontoPagado"></span></th>
                            <th class="spacer"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>


    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        rol = '<%= Session["rol"] %>'
        user = "<%= Session["usuario"]%>"
    </script>
</asp:Content>
