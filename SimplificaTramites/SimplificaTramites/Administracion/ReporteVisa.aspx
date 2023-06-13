<%@ Page Title="Reportes de Visa" Language="C#" MasterPageFile="~/Site.Master" ClientIDMode="Static" Async="true" AutoEventWireup="true" CodeBehind="ReporteVisa.aspx.cs" Inherits="Covialgt.Administracion.ReporteVisa" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <style>
        .bootstrap-datetimepicker-widget {
            z-index: 2000;
        }
        .ui-dialog {
            z-index: 1055 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Reportes de Visa</h1>
    <hr class="thick" />
    <h2 class="mt-5 mb-4"><b>Reportes de Visa por Fechas</b></h2>
    <div class="row m-0 p-0" style="box-shadow: 0px 4px 8px rgb(0 0 0 / 15%); border-radius: 0.25rem">
        <div class="col-xl-4 m-o p-0">
            <div class="card border-0 h-100">
                <div class="card-header bg-primary text-white" style="border-radius: 0 !important">
                    <h6>Reportes Diarios</h6>
                </div>
                <div class="card-body border-right h-100">
                    <div style="min-height: 190px">
                        <div class="row mt-3">
                            <div class="col-lg-5 col-6">
                                <label for="PlanAnualList-reporte" class="mt-2">Año de Estimaci&oacute;n</label>
                            </div>
                            <div class="col-lg-7 col-6">
                                <div class="form-group">
                                    <select id="anio1" class="form-control plan-select"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-5 col-6">
                                <label for="PlanAnualList-reporte" class="mt-2">Fecha Inicial</label>
                            </div>
                            <div class="col-lg-7 col-6">
                                <div class="form-group">
                                    <div class="input-group date" id="fechaInicial-dp" data-target-input="nearest">
                                        <input id="desde" type="text" name="fechaInicial" autocomplete="off" class="form-control datetimepicker-input"
                                            data-target="#fechaInicial-dp" runat="server">
                                        <div class="input-group-append" data-target="#fechaInicial-dp" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <asp:RequiredFieldValidator ID="reqdesde" Style="font-size: 12px" ControlToValidate="desde" ValidationGroup="valreport" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-5 col-6">
                                <label for="PlanAnualList-reporte" class="mt-2">Fecha Final</label>
                            </div>
                            <div class="col-lg-7 col-6">
                                <div class="form-group">
                                    <div class="input-group date" id="fechaFinal-dp" data-target-input="nearest">
                                        <input id="hasta" type="text" name="fechaFinal" autocomplete="off" class="form-control datetimepicker-input"
                                            data-target="#fechaFinal-dp" runat="server">
                                        <div class="input-group-append" data-target="#fechaFinal-dp" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <asp:RequiredFieldValidator ID="reqhasta" Style="font-size: 12px" ControlToValidate="hasta" ValidationGroup="valreport" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body row no-gutters px-3" style="min-height: 159px">
                                <div class="col-lg-12 mb-3">
                                    <div class="custom-radio pading-radio-todos px-0 pl-4">
                                        <input type="radio" class="custom-control-input" id="customRadioTodos" name="diarios"
                                            value="todos" checked>
                                        <label class="custom-control-label" for="customRadioTodos">Ingresos y Egresos de Estimaciones</label>
                                    </div>
                                </div>
                                <div></div>
                                <div class="col-lg-12 mb-3">
                                    <div class="custom-control custom-radio px-0 pl-4">
                                        <input type="radio" class="custom-control-input" id="customRadioTodosComentarios" name="diarios"
                                            value="ingresos">
                                        <label class="custom-control-label" for="customRadioTodosComentarios">Ingresos de Estimaciones</label>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="custom-control custom-radio pading-radio-diarios px-0 pl-4">
                                        <input type="radio" class="custom-control-input" id="asignadosRadio" name="diarios"
                                            value="egresos">
                                        <label class="custom-control-label" for="asignadosRadio">Egresos de Estimaciones</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-4">
                        <div class="row align-items-center">
                            <div class="col">
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary btn-form float-right" id="generar1">GENERAR</button>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 m-o p-0">
            <div class="card border-0 h-100">
                <div class="card-header bg-primary text-white" style="border-radius: 0 !important">
                    <h6>Reportes Mensuales</h6>
                </div>
                <div class="card-body border-right border-left h-100">
                    <div style="min-height: 190px">
                        <div class="row mt-3">
                            <div class="col-4">
                                <label for="PlanAnualList-reporte" class="mt-2">Año de Estimaci&oacute;n</label>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <select id="anio2" class="form-control plan-select"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-4">
                                <label for="PlanAnualList-reporte" class="mt-2">Mes</label>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <select id="meses" class="form-control plan-select">
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body row no-gutters px-3" style="min-height: 159px">
                                <div class="col-lg-12 mb-3">
                                    <div class="custom-radio pading-radio-todos px-0 pl-4">
                                        <input type="radio" class="custom-control-input" id="customRadioIngresosEgresos" name="mensuales"
                                            value="mensuales1" checked>
                                        <label class="custom-control-label" for="customRadioIngresosEgresos">Ingresos y Egresos de Estimaciones</label>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="custom-radio px-0 pl-4">
                                        <input type="radio" class="custom-control-input" id="customRadioEstimacionesVisor" name="mensuales"
                                            value="mensuales2">
                                        <label class="custom-control-label" for="customRadioEstimacionesVisor">Ingresos y Egresos de Estimaciones por Visor</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-4">
                        <div class="row align-items-center">
                            <div class="col">
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary btn-form float-right" id="generar2">GENERAR</button>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 m-o p-0">
            <div class="card border-0 h-100">
                <div class="card-header bg-primary text-white" style="border-radius: 0 !important">
                    <h6>Reportes Anuales</h6>
                </div>
                <div class="card-body border-left">
                    <div style="min-height: 190px">
                        <div class="row mt-3">
                            <div class="col-4">
                                <label for="PlanAnualList-reporte" class="mt-2">Año de Estimaci&oacute;n</label>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <select id="anio3" class="form-control plan-select"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card h-100">
                            <div class="card-body row no-gutters px-3" style="min-height: 159px">
                                <div class="col-lg-12 mb-4">
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="custom-control custom-radio d-flex justify-content-xl-center px-0 pl-4">
                                        <input type="radio" class="custom-control-input" id="reporteGeneralEstimaciones" name="anuales"
                                            value="general" checked>
                                        <label class="custom-control-label" for="reporteGeneralEstimaciones">Reporte General de Estimaciones</label>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-4">
                        <div class="row align-items-center">
                            <div class="col">
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-primary btn-form float-right" id="generar3">GENERAR</button>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="testDiv">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
    </script>
    <%: Scripts.Render("~/js/Administracion/jsReporteVisa.js") %>
</asp:Content>
