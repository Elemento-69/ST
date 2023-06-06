<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GobernandoConLaGente.aspx.cs" Inherits="Covialgt.Informes.GobernandoConLaGente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Informaci&oacute;n de Proyectos por Departamento</h1>
    <hr class="thick" />
    <h2>Seleccione el tipo de Reporte:</h2>
    <div class="row">
        <div class="form-group col-md-2 col-lg-2">
            <label for="tipoSelect">Tipo:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="tipoSelect" name="tipoSelect">
                <option value="1" selected>Detalle</option>
                <option value="2">Resumen</option>
            </select>
        </div>
    </div>
    <h2>Informaci&oacute;n de Proyectos por A&ntilde;o y Departamento:</h2>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="departamentoSelect">Departamento:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="departamentoSelect" name="departamentoSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5 custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="programaCheck">
            <label class="custom-control-label" for="programaCheck">Programas</label>
        </div>
        <div class="form-group col-md-3 col-lg-3">
            <div class="text-center">
                <button type="button" id="btnGenerarInforme" class="btn btn-light" title="Generar Reporte">
                    <i class="fas fa-print fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
    <hr class="thick" />
    <h2>Programas:</h2>
    <div id="programasDiv" class="row"></div>
    <div class="row big-gutter">
        <div id="testDiv"></div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
        user = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsGobernandoConLaGente.js?a=1") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
