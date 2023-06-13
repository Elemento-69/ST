<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProyectosXRegionalXDepto.aspx.cs" Inherits="Covialgt.Informes.ProyectosXRegionalXDepto" %>
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
    <h1>Informes por Regional</h1>
    <hr class="thick" />
    <h2>Detalle de Proyectos por Actividad y Departamento</h2>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="departamentoSelect">Departamento</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="departamentoSelect" name="departamentoSelect"></select>
        </div>
        <div class="form-group col-md-3 col-lg-3">
            <div class="text-center">
                <button type="button" id="btnGenerarInforme1" class="btn btn-light" title="Generar Reporte">
                    <i class="fas fa-print fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
    <h2>Proyectos por Regional</h2>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect2">A&ntilde;o</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect2" name="anioSelect2"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="regionalSelect">Regional</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="regionalSelect" name="regionalSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-3 col-lg-3">
            <div class="text-center">
                <button type="button" id="btnGenerarInforme2" class="btn btn-light" title="Generar Reporte">
                    <i class="fas fa-print fa-2x"></i>
                </button>
            </div>
        </div>
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
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
        user = "<%= Session["usuario"] %>"
        rolpermitido = "<%= ViewState["rolpermitido"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/jsProyectosXRegionalXDepto.js?a=1") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
