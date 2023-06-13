<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEstimacionReprogramaciones.aspx.cs" Inherits="Covialgt.Estimaciones.frmEstimacionReprogramaciones" %>


<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
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

    <!-- Scripts -->




    <style>
        td.details-control {
            background: url('../Images/Icons/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        tr.shown td.details-control {
            background: url('../Images/Icons/details_close.png') no-repeat center center;
        }
    </style>
    <h1 class="mb-0">Gestión de Estimaciones</h1>
    <hr class="thick" />
    <h2 id="lbltitulo">Crear una Nueva Estimación - Proyecto: </h2>

    <br />
    <div class="w-100"></div>
    <div class="row" id="filaAdministrador">
        <div class="form-group col-md-4 col-lg-4">
            <label for="cmbAnio">Plan Anual</label>
            <select id="cmbAnio" class="form-control"></select>
        </div>
        <div class="form-group col-md-8 col-lg-8 col-xl-8">
            <label for="cmbProyecto">Proyecto</label>
            <select class="form-control" id="cmbProyecto"></select>
        </div>
    </div>
    <div class="row align-items-end">
        <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Fecha inicial</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desde" type="text" data-target="#desde-dp" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-1 text-center">
            <label class="d-none d-md-block" for="desde">Al</label>
        </div>
        <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Fecha final</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control datetimepicker-input">
                    <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--nuevos inputs bloqueados-->

        <div class="row align-items-end pt-3" id="div_fechas" >
        <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde_hide">Fecha de la última estimación</label>
                  <div class="input-group date">
                    <input id="desde_hide" type="text" name="desde_hide" autocomplete="off" class="form-control datetimepicker-input" readonly>
                    <div class="input-group-append">
                      <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="form-group col-md-12 pt-4">
            <label for="Observaciones">Observaciones</label>
            <textarea class="form-control" id="txtObservaciones" name="txtObservaciones" rows="3"></textarea>
        </div>
    </div>
    <div class="text-right pt-5">
        <button type="button" id="btnLimpiar" class="btn btn-outline-secondary btn-form">Limpiar</button>
        <button type="button" id="btnGenerarEstimacion" class="btn btn-primary btn-form">Generar</button>
        <button type="button" id="btnInicializaSaldos" class="btn btn-primary btn-form">Establecer Distribución de Saldos</button>
    </div>
    <h2 class="mt-5"><span class="title-bg">Ejecuciones por Tramo</span></h2>
    <hr />
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="tableEjecucionTramos">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th>Proyecto Código de Ejecutora</th>
                    <th>Tramo</th>
                    <th>Código de Ruta</th>
                    <th>Aspiración de Pago</th>
                    <th>CDP Disponible</th>
                    <th>Saldo</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <div class="d-flex flex-row-reverse">
        <div class="p-2">
            <label for="lblMontoContraactual">Monto Contractual</label>
            <input id="lblMontoContraactual" type="text" class="form-control" style="text-align: left; font-weight: bold; font-style: italic;" name="MontoContractual" disabled>
        </div>
        <div class="p-2">
            <label for="lblCDPDisponible">CDP Disponible</label>
            <input type="text" class="form-control" style="text-align: left; font-weight: bold; font-style: italic;" id="lblCDPDisponible" name="CDPDisponible" disabled>
        </div>
        <div class="p-2">
            <label for="lblAspiracionPago">Aspiración de Pago</label>
            <input type="text" class="form-control" style="text-align: left; font-weight: bold; font-style: italic;" id="lblAspiracionPago" name="AspiracionPago" disabled>
        </div>
    </div>


    <div class="text-right pt-5" id="divCDPDisponible">
        <label style="color: #EB5757; font-weight: bold" id="lbCDPDisponible">*CDP Disponible.</label>
        <button type="button" class="btn btn-primary btn-form" id="btnGuardar">Guardar</button>
    </div>
    <div class="text-right pt-5" id="divCDPReprogramado">
        <img src="../Images/Icons/alertIcon.png" width="50" height="50" id="alerIcon">
        <%-- <label style="color: #EB5757; font-weight: bold" id="lbCDPNoDisponible">*CDP con saldo no disponible.</label>--%>
        <label style="color: #EB5757; font-weight: bold" id="lbCDPNoDisponible">Los contratistas han realizado cambios en sus cantidades, necesita Reprogramar</label>
        <button type="button" class="btn btn-primary btn-form" onclick="fnReprogramar();" id="btnReprogramar">Reprogramar</button>
    </div>
    <h2 class="mt-5"><span class="title-bg">Estimaciones realizadas</span></h2>
    <hr />
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="tableEstimaciones">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th></th>
                    <th>Período</th>
                    <th>Monto a Recibir</th>
                    <th>Monto Pagado</th>
                    <th>Monto pendiente de Pago</th>
                    <th>Observaciones</th>
                    <th style="display: none;">Certificada</th>
                    <th>Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>



    <div class="modal" tabindex="-1" role="dialog" id="modalReprogramacion" data-dismiss="modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Reprogramación de Renglones</h1>
                    <button class="close" data-dismiss="modal" aria-label="Close" onclick="fnCerrarModalReprogramacion();">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row">
                            <div class="p-2">
                                <h6>Estimación: Proyecto </h6>
                            </div>
                        </div>
                        <div class="d-flex flex-row-reverse">
                            <div class="p-2">
                                <h6>Período: 01/01/2021 al 31/01/2021</h6>
                            </div>
                        </div>
                    </div>
                    <h2 class="mt-5"><span class="title-bg">Tramo-Renglón Reprogramados</span></h2>
                    <hr />
                    Puede dar clic sobre el icono
                    <img src="../Images/Icons/details_open.png" width="30" height="30">
                    para visualizar sus renglones reprogramados
                    <div class="table-responsive mt-5">
                        <table class="table table-bordered" id="tableTramosReprogramados">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th></th>
                                    <th>Tramo</th>
                                    <th style="width: 160px">Código de Ruta</th>
                                    <th>CDP Anterior</th>
                                    <th>Factor Anterior</th>
                                    <th>CDP Disponible</th>
                                    <th>Factor Actual</th>
                                    <th>Reprogramación</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <%--    <tr data-child-value="hidden1">
                                    <td class="spacer"></td>
                                    <td class="details-control"></td>
                                    <td>SANTA RITA - SAN JOSE PINULA</td>
                                    <td>RD-GUA-06-04</td>
                                    <td style="text-align: right">Q.10,000.00</td>
                                    <td style="text-align: right">46.95%</td>
                                    <td style="text-align: right">Q.9,400.00</td>
                                    <td style="text-align: right">44.13%</td>
                                    <td style="color: red; text-align: right">(Q.600.00)</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr data-child-value="hidden2">
                                    <td class="spacer"></td>
                                    <td class="details-control"></td>
                                    <td>BIFURCACION CA-01-ORIENTE, KM. 17+400 - CRISTO REY</td>
                                    <td>RD-GUA-40-01</td>
                                    <td style="text-align: right">Q.2,500.00</td>
                                    <td style="text-align: right">11.74%</td>
                                    <td style="text-align: right">Q.1,900.00</td>
                                    <td style="text-align: right">8.92%</td>
                                    <td style="color: red; text-align: right">(Q.600.00)</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr data-child-value="hidden3">
                                    <td class="spacer"></td>
                                    <td class="details-control"></td>
                                    <td>BIFURCACION CA-09-NORTE - LAS CANOAS</td>
                                    <td>RD-GUA-55-01</td>
                                    <td style="text-align: right">Q.3,200.00</td>
                                    <td style="text-align: right">15.02%</td>
                                    <td style="text-align: right">Q.3,800.00</td>
                                    <td style="text-align: right">17.84%</td>
                                    <td style="text-align: right">Q.600.00</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr data-child-value="hidden4">
                                    <td class="spacer"></td>
                                    <td class="details-control"></td>
                                    <td>LAS CANOAS - LOS OCOTES - ALDEA SANTA RITA - BIFURCACION RD-GUA-06</td>
                                    <td>RD-GUA-55-02</td>
                                    <td style="text-align: right">Q.600.00</td>
                                    <td style="text-align: right">2.82%</td>
                                    <td style="text-align: right">Q.1,200.00</td>
                                    <td style="text-align: right">5.63%</td>
                                    <td style="text-align: right">Q.600.00</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr data-child-value="hidden5">
                                    <td class="spacer"></td>
                                    <td class="details-control"></td>
                                    <td>BIFURCACION CA-01-ORIENTE, DON JUSTO - SAN JOSE PINULA</td>
                                    <td>RN-18-01</td>
                                    <td style="text-align: right">Q.5,000.00</td>
                                    <td style="text-align: right">23.47%</td>
                                    <td style="text-align: right">Q.5,000.00</td>
                                    <td style="text-align: right">23.47%</td>
                                    <td style="text-align: right">Q.0.00</td>
                                    <td class="spacer"></td>
                                </tr>--%>
                            </tbody>
                            <tfoot>
                                <%--       <tr>

                                    <td class="spacer"></td>
                                    <th style="font-weight: bold; text-align: center" id="cTotales" colspan="3">TOTAL</th>
                                    <td style="font-weight: bold; text-align: right">Q.23,300.00</td>
                                    <td style="font-weight: bold; text-align: right">100.00%</td>
                                    <td style="font-weight: bold; text-align: right">Q.23,300.00</td>
                                    <td style="font-weight: bold; text-align: right">100.00%</td>
                                    <td style="font-weight: bold; text-align: right">Q.0.00</td>
                                    <td class="spacer"></td>
                                </tr>--%>
                            </tfoot>
                        </table>
                    </div>

                    <div class="d-flex flex-row-reverse">
                        <div class="p-2">
                            <label for="OCSTotal">Monto OC a generar</label>
                            <input type="text" class="form-control" style="text-align: center; font-weight: bold; font-style: italic;" placeholder="(Q.1,200.00" id="OCSTotal" name="OCSTotal" disabled>
                        </div>
                        <div class="p-2">
                            <label for="OTSTotal">Monto OTS a generar</label>
                            <input type="text" class="form-control" style="text-align: center; font-weight: bold; font-style: italic;" placeholder="Q.1,200.00" id="OTSTotal" name="OTSTotal" disabled>
                        </div>
                    </div>
                    <div class="d-flex flex-row-reverse">
                        <div class="p-2">
                            <button type="button" class="btn btn-primary btn-form" onclick="" id="btnGuardarReprogramacion">Guardar</button>
                        </div>
                    </div>
                    <%-- <h2 class="mt-5"><span class="title-bg">Renglones reprogramados del tramo: RD-GUA-55-01 </span></h2>
                    <hr />--%>
                    <%--<div class="table-responsive mt-5">
                        <table class="table table-bordered" id="tableRenglonesReprogramados">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th>No</th>
                                    <th style="width: 160px">Renglón</th>
                                    <th>Descripción de actividad</th>
                                    <th>Porcentaje de Peso</th>
                                    <th>Cantidad Reprogramada</th>
                                    <th>Precio</th>
                                    <th>Monto Reprogramado</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>1</td>
                                    <td>Co 1401.06.01</td>
                                    <td>Delegado Residente (incluye viáticos)</td>
                                    <td style="text-align: center">48.99%</td>
                                    <td style="text-align: left">0.00775</td>
                                    <td style="text-align: right">Q.37,926.00</td>
                                    <td style="text-align: right">Q.293.94</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>2</td>
                                    <td>Co 1401.06.03</td>
                                    <td>Auxiliar de Ingeniero (incluye viaticos)</td>
                                    <td style="text-align: center">22.79%</td>
                                    <td style="text-align: left">0.00153</td>
                                    <td style="text-align: right">Q.8,820.00</td>
                                    <td style="text-align: right">Q.136.74</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>3</td>
                                    <td>Co 1401.06.06</td>
                                    <td>Transporte y Movilización</td>
                                    <td style="text-align: center">15.63%</td>
                                    <td style="text-align: left">0.02325</td>
                                    <td style="text-align: right">Q.4,032.00</td>
                                    <td style="text-align: right">Q.93.78</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>4</td>
                                    <td>Co 1401.06.07</td>
                                    <td>Telefono Celular Inteligente (smartphone)</td>
                                    <td style="text-align: center">6.51%</td>
                                    <td style="text-align: left">0.02325</td>
                                    <td style="text-align: right">Q.1,680.00</td>
                                    <td style="text-align: right">Q.39.06</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>5</td>
                                    <td>Co 1601.02.n</td>
                                    <td>Estudios y análisis de tránsito vehicular e inventario vial</td>
                                    <td style="text-align: center">2.85%</td>
                                    <td style="text-align: left">0.00000</td>
                                    <td style="text-align: right">Q.25,000.00</td>
                                    <td style="text-align: right">Q.17.10</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>6</td>
                                    <td>Co 801.03.Su</td>
                                    <td>Dispositivos De Seguridad, laboratorios, muestreo y ensayos</td>
                                    <td style="text-align: center">3.23%</td>
                                    <td style="text-align: left">0.00077</td>
                                    <td style="text-align: right">Q.25,000.00</td>
                                    <td style="text-align: right">Q.19.38</td>
                                    <td class="spacer"></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>

                                    <td class="spacer"></td>
                                    <th style="font-weight: bold; text-align: center" id="cTotalesRenglones" colspan="6">TOTAL</th>
                                    <td style="font-weight: bold; text-align: right">Q.600.00</td>
                                    <td class="spacer"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>--%>
                    <h2 class="mt-5"><span class="title-bg">Documentos imprimibles generados </span></h2>
                    <hr />
                    <div class="table-responsive mt-5">
                        <table class="table table-bordered" id="tableDocumentos">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th style="width: 50px"></th>
                                    <th>Documento</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>
                                        <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                            data-content="Imprimir" data-placement="top" title="Imprimir estimación">
                                            <i class="fas fa-print fa-lg fa-fw"></i>
                                        </a>
                                    </td>
                                    <td>Estimación Período 01/01/2021 al 31/01/2021</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>
                                        <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                            data-content="Imprimir" data-placement="top" title="Imprimir OC">
                                            <i class="fas fa-print fa-lg fa-fw"></i>
                                        </a>
                                    </td>
                                    <td>Documento de Cambio OC No.85 de fecha 02/02/2020</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>
                                        <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                            data-content="Imprimir" data-placement="top" title="Imprimir OTS">
                                            <i class="fas fa-print fa-lg fa-fw"></i>
                                        </a>
                                    </td>
                                    <td>Documento de Cambio OTS No.86 de fecha 02/02/2020</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td>
                                        <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                            data-content="Imprimir" data-placement="top" title="Imprimir Consolidado">
                                            <i class="fas fa-print fa-lg fa-fw"></i>
                                        </a>
                                    </td>
                                    <td>Documento de Consolidado de Reprogramaciones de Renglón-Tramo de fecha 02/02/2020</td>
                                    <td class="spacer"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer" id="footmodal">
                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">

    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        //$(document).ready(function () {
        //    loadDefaultComponents();
        //});

        rolConsultas = '<%= ViewState["rolConsultas"] %>'

    </script>
    <script src="../js/jsEstimacionReprogramacion.js"></script>
</asp:Content>
