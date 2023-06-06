<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="OtrosReportes.aspx.cs" Inherits="Covialgt.Informes.OtrosReportes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Reportes Financieros</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha desde</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control" disabled="true">
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
                <input id="hastaInput" type="text" name="hasta" autocomplete="off" class="form-control" disabled="true">
                <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
        </div>
    </div>
    <div class="column mt-4">
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck1" name="tipo" checked="true" value="1">
                <label class="custom-control-label" for="customCheck1">Resumen de estimaciones (Vigente y Deuda)</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck2" name="tipo" value="2">
                <label class="custom-control-label" for="customCheck2">Detalle de estimaciones Ingresadas por fecha</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck3" name="tipo" value="3">
                <label class="custom-control-label" for="customCheck3">Cuenta corriente de proyectos</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck4" name="tipo" value="4">
                <label class="custom-control-label" for="customCheck4">Estado de estimaciones por actividad y Ubicacion (Detalle)</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck5" name="tipo" value="5">
                <label class="custom-control-label" for="customCheck5">Estado de estimaciones por actividad y Ubicacion (Resumen)</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck7" name="tipo" value="7">
                <label class="custom-control-label" for="customCheck7">Resumen de Estimaciones por Actividad</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck6" name="tipo" value="6">
                <label class="custom-control-label" for="customCheck6">Reporte de sanciones por proyectos</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck8" name="tipo" value="8">
                <label class="custom-control-label" for="customCheck8">Reporte Estado de Estimaciones</label>
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
    <%: Scripts.Render("~/js/jsOtrosReportes.js?a=2") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
