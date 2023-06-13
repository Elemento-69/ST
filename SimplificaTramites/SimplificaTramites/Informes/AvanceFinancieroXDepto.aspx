<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AvanceFinancieroXDepto.aspx.cs" Inherits="Covialgt.Informes.AvanceFinancieroXDepto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Avance Financiero por Departamento</h1>
    <hr class="thick" />
    <h2>Detalle de Proyectos por Actividad y Departamento</h2>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="departamentoSelect">Departamento</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="departamentoSelect" name="departamentoSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between align-items-end">
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="empresaCheck">
            <label class="custom-control-label" for="empresaCheck">Empresas</label>
        </div>
    </div>
    <div class="row align-items-center">
        <div class="form-group col-md-3 col-lg-3">
            <div class="text-center">
                <button type="button" id="btnGenerarProyectos" class="btn btn-light" title="Generar Proyectos">
                    <i class="fas fa-search fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
    <h2>Periodo</h2>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <div class="form-group col-lg-6">
                <label for="desdeInput">Fecha desde</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <div class="form-group col-lg-6">
                <label for="hastaInput">Fecha hasta</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hastaInput" type="text" name="hasta" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row align-items-center">
        <div class="form-group col-md-3 col-lg-3">
            <div class="text-center">
                <button type="button" id="btnGenerarInforme" class="btn btn-light" title="Generar Informe">
                    <i class="fas fa-print fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
    <hr class="thick" />
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="proyectos-table">
            <thead>
                <tr>
                    <!-- <th class="spacer"></th> -->
                    <th class="text-center"></th>
                    <th class="text-center">Proyecto / A&ntilde;o</th>
                    <th class="text-center">Descripci&oacute;n</th>
                    <!-- <th class="spacer"></th> -->
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div class="row big-gutter">
        <div id="testDiv"></div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
        user = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsAvanceFinancieroXDepto.js?a=7") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
