<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReportesSupervisora.aspx.cs" Inherits="Covialgt.Informes.ReportesSupervisora" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Reportes Supervisoras</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="supervisoraSelect">Supervisora:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="supervisoraSelect" name="supervisoraSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha desde</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-2 col-lg-4">
        </div>
        <div class="form-group col-md-5 col-lg-3">
            <label for="hastaInput">Fecha hasta</label>
            <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                <input id="hastaInput" type="text" name="hasta" autocomplete="off" class="form-control">
                <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="tipoSelect">Tipo:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="tipoSelect" name="tipoSelect">
            	<option value="1">SEMANAL</option>
            	<option value="2" selected>MENSUAL</option>
            </select>
        </div>
    </div>
    <div class="column mt-4">
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck25" name="Reporte" checked="true" value="25">
                <label class="custom-control-label" for="customCheck25">Avance Financiero por Tramo</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck26" name="Reporte" value="26">
                <label class="custom-control-label" for="customCheck26">Avance Financiero por Proyecto</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck27" name="Reporte" value="27">
                <label class="custom-control-label" for="customCheck27">Avance F&iacute;sico por Tramo</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck32" name="Reporte" value="32">
                <label class="custom-control-label" for="customCheck32">Avance F&iacute;sico por Proyecto</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck33" name="Reporte" value="33">
                <label class="custom-control-label" for="customCheck33">Estacionamientos</label>
            </div>
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
    <%: Scripts.Render("~/js/jsReportesSupervisora.js?a=2") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
