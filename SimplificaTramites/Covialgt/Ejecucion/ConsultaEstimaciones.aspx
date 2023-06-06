<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ConsultaEstimaciones.aspx.cs" Inherits="Covialgt.Ejecucion.ConsultaEstimaciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
     <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
    <style>
        .panel-title ~ .collapse-hr {
            position: relative;
            border: 1px solid #285DCE;
            margin-right: 35px;
        }

            .panel-title ~ .collapse-hr::after {
                content: "▼";
                color: #E2E2E2;
                font-size: 15px;
                top: -11px;
                right: -35px;
                position: absolute;
            }

        .panel-title[aria-expanded="true"] ~ .collapse-hr::after {
            content: "▲";
            font-size: 15px;
        }

        .small-texts {
            font-size: 11px;
            margin-bottom: 4px;
        }

        .th-text {
            padding-bottom: 5px !important;
            padding-top: 5px !important;
            font-size: 14px !important;
        }

        .t-text {
            padding-bottom: 5px !important;
            padding-top: 5px !important;
            font-size: 11px !important;
        }

        .min-th {
            width: 120px;
        }
        .ui-dialog {
            z-index: 1055 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
     <h1>Consulta de Estimaciones</h1>
    <hr class="thick" />                       
    <div id="testDiv">
    </div>
    <div class="row justify-content-start">
          <%if (!HttpContext.Current.User.IsInRole("Supervisor"))
                { %>
        <div class="form-group col-md-5 col-lg-5">
            <label for="PlanAnual">Plan Anual</label>
            <select id="PlanAnualList" class="form-control"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 offset-lg-1">
            <label for="cmbPrograma">Programa</label>
            <select id="ProgramaList" class="form-control"></select>
        </div>
         <%} %>
         <div class="form-group col-md-5 col-lg-5 col-xl-5">
            <label for="ProyectoList">Proyecto</label>
            <select class="form-control" id="ProyectoList"></select>

        </div>
        <div class="col-md-2">
            <br>
            <button type="button" id="btnImprimir" class="btn btn-light">
                <i class="fas fa-print fa-2x"></i>
            </button>
        </div>
        <div class="col-md-5" id="divRegresar">
            <br />
            <div class="row justify-content-end">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>

            </div>
        </div>
    </div>
  
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="estimacion-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Año</th>
                    <th class="text-center">Proy</th>
                    <th class="text-center">No.</th>
                    <th class="text-center">Per&iacute;odo</th>
                    <th class="text-center">Monto Estimaci&oacute;n</th>
                    <th class="text-center">Pagado</th>
                    <th class="text-center">Pendiente</th>
                    <th class="text-center">Estado De la EStimaci&oacute;n</th>
                    <th class="text-center">Fecha del Estado</th>
                    <th class="text-center">Visor</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
        <!-- Start Modal de Consulta de Reparos y Observaciones -->
    <div class="modal fade" id="ModalReparos" tabindex="-1" role="dialog" aria-labelledby="ModalReparosTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalReparosTitle">Consulta de Reparos y Observaciones</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive mt-2">
                        <table class="table table-bordered datatable" id="table-reparos" style="margin: 0 0; min-width: 1110px;"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal de Consulta de Reparos y Observaciones -->

    <!-- Modal reportes de Estimaciones-->
    <div class="modal" tabindex="-1" id="reporteEstimaciones">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="estimacionesTitle">Reporte de Estimaciones</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mt-3">
                    <div class="container">
                        <div class="row py-3 align-items-center">
                            <div class="col-md-10">
                                <p class="mb-0"><b>Seleccione el reporte de estimaciones que desea generar para el proyecto: <span id="reporte-text-proyecto"></span>, estimación: <span id="reporte-text-estimacion"></span></b></p>
                            </div>
                            <div class="col-md-2 text-right">
                                <div class="d-inline-block h-100 text-center px-4 mx-4">
                                    <button type="button" id="btn-print-reporte" class="btn btn-light bg-white">
                                        <i class="fas fa-print fa-2x"></i>
                                        <br />
                                        <span class="font-weight-bold text-center">Imprimir</span>
                                    </button>
                                </div>
                            </div>
                        </div>     
                        <div class="row">
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 px-0 pl-2">
                                            <input type="radio" class="custom-control-input" id="customRadio1" name="tipoFiltro"
                                                value="estimacion caratula">
                                            <label class="custom-control-label" for="customRadio1">Estimacion Caratula</label>
                                        </div>
                                        <div class="custom-checkbox px-0" hidden>
                                            <input type="checkbox" class="custom-control-input checkeds" id="estimacion-unica-caratura">
                                            <label class="custom-control-label mr-2" for="estimacion-unica-caratura">Estimación Única</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3">
                                            <input type="radio" class="custom-control-input" id="caratulaFinanciera" name="tipoFiltro"
                                                value="caratula financiera">
                                            <label class="custom-control-label" for="caratulaFinanciera">Caratula Financiera</label>
                                        </div>
                                        <div class="custom-checkbox mr-4">
                                            <input type="checkbox" class="custom-control-input checkeds" id="empresa-check">
                                            <label class="custom-control-label mr-2" for="empresa-check">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary mb-5 mt-5 hidden-div" id="body-caratula-financiera">
                                        <div class="card-text text-blue mt-3 mb-4">
                                            <label for="Descripcion">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado" name="nombreDelegado">
                                        </div>
                                        <div class="card-text text-blue mt-3 mb-4">
                                            <label for="Descripcion">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa2" name="nombreEmpresa2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input" id="constanciaTrabajo2" name="tipoFiltro"
                                                value="constancia trabajo">
                                            <label class="custom-control-label" for="constanciaTrabajo2">Constancia de Trabajo</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pr-5">
                                            <input type="checkbox" class="custom-control-input checkeds" id="empresa-check2">
                                            <label class="custom-control-label mr-2" for="empresa-check2">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="constanciaTrabajo-body-card">
                                        <div class="form-group text-blue mt-3 mb-4">
                                            <label for="FechaPresentacion">Ingresar Fecha</label>
                                            <div class="input-group date" id="FechaPresentacion-dp" data-target-input="nearest">
                                                <input id="FechaPresentacion" data-target="#FechaPresentacion-dp" type="text"
                                                    class="form-control datetimepicker-input">
                                                <div class="input-group-append" data-target="#FechaPresentacion-dp" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-text text-blue mt-3 mb-4 empresa-constancia-trabajo">
                                            <label for="Descripcion">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado2" name="nombreDelegado2">
                                        </div>
                                        <div class="card-text text-blue mt-3 mb-4 empresa-constancia-trabajo">
                                            <label for="Descripcion">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa3" name="nombreEmpresa3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-4">
                                            <input type="radio" class="custom-control-input" id="avanceGrafica" name="tipoFiltro"
                                                value="avance grafica">
                                            <label class="custom-control-label" for="avanceGrafica">Control Avance Financiero Grafica</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pr-5 pl-4">
                                            <input type="checkbox" class="custom-control-input checkeds" id="empresa-check3">
                                            <label class="custom-control-label mr-2" for="empresa-check3">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="controlAvanceFinanciero-body-card">
                                        <div class="card-text text-blue mt-2 empresa-avance-grafico">
                                            <label for="nombreDelegado4">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado4" name="nombreDelegado4">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-grafico">
                                            <label for="nombreEmpresa1">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa1" name="nombreEmpresa1">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-grafico">
                                            <label for="empresaContratista">Empresa Contratista</label>
                                            <input type="text" class="form-control" id="empresaContratista" name="empresaContratista">
                                        </div>
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos">Periodos</label>
                                            <select class="form-control" id="periodos" name="periodos">
                                            </select>
                                        </div>
                                        <div class="form-group mt-2">
                                            <p>Periodo del Supervisor</p>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Inicial</label>
                                            <div class="input-group date" id="fecha-inicial" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-inicial" id="fecha-desde">
                                                <div class="input-group-append" data-target="#fecha-inicial" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Final</label>
                                            <div class="input-group date" id="fecha-final" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-final" id="fecha-hasta">
                                                <div class="input-group-append" data-target="#fecha-final" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-4">
                                            <input type="radio" class="custom-control-input" id="avanceFinanciero" name="tipoFiltro"
                                                value="avanceFinanciero">
                                            <label class="custom-control-label" for="avanceFinanciero">Control Avance Financiero</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pr-5 pl-4">
                                            <input type="checkbox" class="custom-control-input" id="empresa-check4">
                                            <label class="custom-control-label mr-2" for="empresa-check4">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="AvanceFinancieroBody-card">
                                        <div class="card-text text-blue mt-2 empresa-avance-financiero">
                                            <label for="nombreDelegado5">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado5" name="nombreDelegado4">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-financiero">
                                            <label for="nombreEmpresa4">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa4" name="nombreEmpresa4">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-financiero">
                                            <label for="empresaContratista">Empresa Contratista</label>
                                            <input type="text" class="form-control" id="empresaContratista2" name="empresaContratista2">
                                        </div>
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos2">Periodos</label>
                                            <select class="form-control" id="periodos2" name="periodos2">
                                            </select>
                                        </div>
                                        <div class="form-group mt-2">
                                            <p>Periodo del Supervisor</p>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Inicial</label>
                                            <div class="input-group date" id="fecha-inicial2" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-inicial2"
                                                    id="fecha-desde2">
                                                <div class="input-group-append" data-target="#fecha-inicial2" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Final</label>
                                            <div class="input-group date" id="fecha-final2" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-final2"
                                                    id="fecha-hasta2">
                                                <div class="input-group-append" data-target="#fecha-final2" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-4 mb-4 pl-3">
                                            <input type="radio" class="custom-control-input" id="ejecucionRenglones" name="tipoFiltro"
                                                value="ejecucionRenglones">
                                            <label class="custom-control-label" for="ejecucionRenglones">Ejecución de renglones de trabajo</label>
                                        </div>
                                        <div class="custom-checkbox px-0" hidden>
                                            <input type="checkbox" class="custom-control-input checkeds" id="estimacion-unica-renglones">
                                            <label class="custom-control-label mr-2" for="estimacion-unica-renglones">Estimación Única</label>
                                        </div>
                                    </div>
                                    <%--<div class="card-body text-secondary hidden-div" id="ejecuccionRenglonesTrabajo-body-card">
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos">Periodos</label>
                                            <select class="form-control" id="periodos8" name="periodos">
                                            </select>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-4 mb-4 pl-3">
                                            <input type="radio" class="custom-control-input" id="cuadroEstimacion" name="tipoFiltro"
                                                value="cuadroEstimacion">
                                            <label class="custom-control-label" for="cuadroEstimacion">Cuadro de  Estimación</label>
                                        </div>
                                         <div class="custom-checkbox px-0" hidden>
                                            <input type="checkbox" class="custom-control-input checkeds" id="estimacion-unica-sabana">
                                            <label class="custom-control-label mr-2" for="estimacion-unica-sabana">Estimación Única</label>
                                        </div>
                                    </div>
                                   <%-- <div class="card-body text-secondary hidden-div" id="periodoCardbody">
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos4">Periodos</label>
                                            <select class="form-control" id="periodos4" name="periodos4">
                                            </select>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input" id="recomendacionPago" name="tipoFiltro"
                                                value="recomendacionPago">
                                            <label class="custom-control-label" for="recomendacionPago">Recomendacion de Pago</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pl-3">
                                            <input type="checkbox" class="custom-control-input" id="empresa-check7">
                                            <label class="custom-control-label mr-2" for="empresa-check7">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="periodoCardbody1">
                                        <div class="form-group text-blue" hidden>
                                            <label for="periodos7">Periodos</label>
                                            <select class="form-control" id="periodos7" name="periodos7">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3" id="dDeclaracionJurada">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input" id="declaracionjurada" name="tipoFiltro"
                                                value="declaracionjurada">
                                            <label class="custom-control-label" for="declaracionjurada">Declaración Jurada</label>
                                        </div>
                                       <!-- <div class="custom-checkbox mr-4 pl-3">
                                            <input type="checkbox" class="custom-control-input" id="empresa-check8">
                                            <label class="custom-control-label mr-2" for="empresa-check7">Empresa</label>
                                        </div>-->
                                    </div>
                                    <!--<div class="card-body text-secondary hidden-div" id="periodoCardbody1">
                                        <div class="form-group text-blue" hidden>
                                            <label for="periodos7">Periodos</label>
                                            <select class="form-control" id="periodos7" name="periodos7">
                                            </select>
                                        </div>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- fin de modal de reportes -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
         token = "<%= Session["token"] ?? "null" %>"
         plan = "<%= Session["plan"] %>"
         proyecto = "<%= Session["proyecto"] %>"
         usuario = "<%= Session["usuario"] %>"
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>"
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>"
        rolConsultas = '<%= ViewState["rolConsultas"] %>'
    </script>
     <%: Scripts.Render("~/js/jsConsultaEstimaciones.js") %>
     <%: Scripts.Render("~/js/Administracion/jsReporteEstimaciones.js?1") %>
</asp:Content>
