<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EstructuraPago.aspx.cs" Inherits="Covialgt.Catalogos.EstructuraPago" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Estructura de pagos</h1>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o N&oacute;mina:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="estimacionCorrSelect">No estimaci&oacute;n correlaci&oacute;n:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo frdecimal-mask" id="estimacionCorrSelect" name="estimacionCorrSelect"></select>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="text-right mb-4 mr-4">
            <button type="button" class="btn btn-primary text-uppercase fs-7 px-md-5 py-2" id="btnGenerar">Generar</button>
        </div>
    </div>
    <div id="testDiv"></div>
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
    </script>
    <%: Scripts.Render("~/js/jsEstructuraPago.js?a=6") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
