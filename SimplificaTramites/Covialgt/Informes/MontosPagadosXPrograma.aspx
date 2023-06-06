<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="MontosPagadosXPrograma.aspx.cs" Inherits="Covialgt.Informes.MontosPagadosXPrograma" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Reporte de Montos Devengados Por Programa</h1>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o Nomina:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="mesSelect">Mes Acumulado:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="mesSelect" name="mesSelect">
            	<option value="1" selected>ENERO</option>
				<option value="2">FEBRERO</option>
				<option value="3">MARZO</option>
				<option value="4">ABRIL</option>
				<option value="5">MAYO</option>
				<option value="6">JUNIO</option>
				<option value="7">JULIO</option>
				<option value="8">AGOSTO</option>
				<option value="9">SEPTIEMBRE</option>
				<option value="10">OCTUBRE</option>
				<option value="11">NOVIEMBRE</option>
				<option value="12">DICIEMBRE</option>
            </select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="tipoSelect">Tipo:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="tipoSelect" name="tipoSelect">
            	<option value="0" selected>Sin Contar Proyectos</option>
            	<option value="1">Contar Proyectos</option>
            	<option value="2">Proyectos Agrupados</option>
            </select>
        </div>
    </div>
    <div class="row justify-content-center">
        <img id="btnGenerar" border="0" src="../Images/print_32.png" /><br />
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
    <%: Scripts.Render("~/js/jsMontosPagadosXPrograma.js?a=3") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
