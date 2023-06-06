<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionDeEstimaciones.aspx.cs" Inherits="Covialgt.Ejecucion.GestionDeEstimaciones" %>
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
     <h1>Gestión de Estimaciones</h1>
    <hr class="thick"/>
      <div id="testDiv">
    </div>

    <br />
    <div class="w-100"></div>
    <div class="form-group col-12 text-right">
        <button type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-form">
            Regresar
        </button>
    </div>
    <ul class="nav custom-nav mt-4" id="at-tab" role="tablist">
        <li class="nav-item" role="tabpanel">
            <a class="nav-link active" id="estimacion-tab" data-toggle="tab" href="#ejecucion" role="tab" aria-controls="ejecucion" aria-selected="true">
                Agregar Estimación
            </a>
        </li>
        <li class="nav-item" role="tabpanel">
            <a class="nav-link" id="ejecutados-tab" data-toggle="tab" href="#renglones" role="tab" aria-controls="renglones" aria-selected="false">
                Renglones Ejecutados
            </a>
        </li>
    </ul>
    <div class="tab-content no-border p-3" id="at-tabcontent">
        <div class="tab-pane fade show active" id="ejecucion" role="tabpanel" aria-labelledby="estimacion-tab">
            <h5>Crear una Nueva Estimación; Proyecto: <%= Session["proyecto"] %>, Año: <%= Session["plan"] %></h5>
            <div class="row big-gutter mt-3 align-items-end">
                <div class="col-md-12 col-lg-6">
                    <div class="form-group">  
                        <label for="hastaEstimacion1">Fecha de Estimación:</label>
                        <div class="row no-gutters" id="estimaciones-range_date">
                            <div class="col-sm-5">
                                <div class="input-group date" id="desdeEstimacion-dt" data-target-input="nearest">
                                    <input id="desdeEstimacion" disabled="true" data-target="#desdeEstimacion-dt" type="text" name="desdeEstimacion" 
                                        class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#desdeEstimacion-dt" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 text-center">
                                <label>Al</label>
                            </div>
                            <div class="col-sm-5">
                                <div class="input-group date" id="hastaEstimacion-dt" data-target-input="nearest">
                                    <input id="hastaEstimacion" data-target="#hastaEstimacion-dt"  type="text" name="hastaEstimacion"
                                        class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#hastaEstimacion-dt" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label for="montoEjecutado">Monto Ejecutado</label>
                    <input type="text" class="form-control frcurrency-mask" id="montoEjecutado" name="montoEjecutado" disabled>
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label for="montoAnticipado">(-) Monto Anticipado</label>
                    <input type="text" class="form-control frcurrency-mask" id="montoAnticipado" name="montoAnticipado">
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label for="sobreCostos">Sobre Costos</label>
                    <input type="text" class="form-control frcurrency-mask" id="sobreCostos" name="sobreCostos">
                </div>
                <div class="form-group col-md-6 col-lg-3">
                    <label for="ajustes">Ajustes</label>
                    <input type="text" class="form-control frcurrency-mask" name="ajustes" id="ajustes"/>
                </div>
                <div class="form-group col-md-6 col-lg-4 col-xl-3">
                    <label for="montoRecibir">Monto a Recibir</label>
                    <div class="input-group">
                        <input type="text" class="form-control frcurrency-mask" name="montoRecibir" id="montoRecibir"/>
                        <div class="input-group-append">
                            <span class="input-group-text" id="montoRecibir-btn"><i class="fas fa-calculator"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="form-group col-md-12 col-lg-12">
                    <label for="observaciones">Observaciones</label>
                    <textarea class="form-control" id="observaciones" rows="3"></textarea>
                </div>
            </div>
            <div class="row text-right mt-5">
                <div class="form-group col-md-3 col-lg-5 mt-2">
                </div>
                <div class="form-group col-md-9 col-lg-5 ml-md-auto">
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <button type="submit" class="btn btn-outline-secondary btn-form">CANCELAR</button>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <button type="button" class="btn btn-primary btn-form" id="add-btn">AGREGAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- segundo tab -->
        <div class="tab-pane fade p-2" id="renglones" role="tabpanel" aria-labelledby="ejecutados-tab">
            <div class="card border-secondary mb-3">
                <div class="card-body pb-5">
                    <h5 class="pb-3">Desde: <span id="desdeEjecutado-label"></span> Hasta: <span id="hastaEjecutado-label"></span></h5>
                    <h5 class="text-danger" id="no-data-message">No se Encontraron Cantidades Ejecutadas en el Período</h5>
                    <div class="table-responsive d-none">
                        <table class="table table-bordered table-hover mt-4" id="ejecutados-table">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th class="text-center">Renglon</th>
                                <th class="text-center">Descripci&oacute;n</th>
                                <th class="text-center">Unidad</th>
                                <th class="text-center">Precio Unitario</th>
                                <th class="text-center">Cantidad</th>
                                <th class="text-center">Total Acumulado</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td class="spacer"></td>
                                <td Class="table-total border-0" colspan="6">
                                    Total: <span class="frcurrency-mask" id="total-estimaciones"></span>
                                </td>
                                <td class="spacer"></td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <hr class="line-solid"/>
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="estimacionesDesc-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">No</th>
                        <th class="text-center">Período</th>
                        <th class="text-center">Tipo</th>
                        <th class="text-center">Ejecutado</th>
                        <th class="text-center">A Recibir</th>
                        <th class="text-center">Observaciones</th>
                        <th class="text-center">Certificada</th>
                        <th class="text-center">Estado</th>
                            <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
     </div>
    <%--Reportes--%>
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
                                        <div class="custom-checkbox px-0">
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
                                        <div class="custom-checkbox px-0">
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
                                            <label class="custom-control-label" for="cuadroEstimacion">Cuadro de  Estimación(Sábana)</label>
                                        </div>
                                         <div class="custom-checkbox px-0">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
 
  
     <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
      <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
    </script>
    <%: Scripts.Render("~/js/jsGestionDeEstimaciones.js") %>
    <%: Scripts.Render("~/js/Administracion/jsReporteEstimaciones.js") %>
</asp:Content>
