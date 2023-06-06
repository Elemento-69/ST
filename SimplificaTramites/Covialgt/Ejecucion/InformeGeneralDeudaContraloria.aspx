<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="InformeGeneralDeudaContraloria.aspx.cs" Inherits="Covialgt.Ejecucion.InformeGeneralDeudaContraloria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Reporte de Deuda Contralor&iacute;a General</h1>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<h3>Seleccione datos para generar el Informe Contraloria General</h3>
	<div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="mesSelect">Mes:</label>
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
    <div class="row justify-content-center my-5">
        <img id="btnGenerar" border="0" src="../Images/print_32.png" /><br />
    </div>
	<h3>Ingrese Fecha para generar Informe Contraloria Detalle</h3>
	<div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="column mt-4">
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck25" name="Reporte" checked="true" value="25">
                <label class="custom-control-label" for="customCheck25">General</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck26" name="Reporte" value="26">
                <label class="custom-control-label" for="customCheck26">Proyectos con deuda</label>
            </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <img id="btnGenerar2" border="0" src="../Images/print_32.png" /><br />
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
    <%: Scripts.Render("~/js/jsInformeGeneralDeudaContraloria.js?a=1") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
