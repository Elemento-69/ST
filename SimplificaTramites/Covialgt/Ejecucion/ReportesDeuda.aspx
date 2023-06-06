<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReportesDeuda.aspx.cs" Inherits="Covialgt.Ejecucion.ReportesDeuda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Reporte de Deuda por Proyectos</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoInput">Proyecto</label>
            <input type="text" class="form-control" id="proyectoInput" name="proyectoInput">
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="NITInput">Nit Empresa</label>
            <input type="text" class="form-control" id="NITInput" name="NITInput" disabled="true">
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaInput">Programa</label>
            <input type="text" class="form-control" id="programaInput" name="programaInput" disabled="true">
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
                <input type="radio" class="custom-control-input" id="customCheck25" name="tipo" checked="true" value="25">
                <label class="custom-control-label" for="customCheck25">Saldo Contractual por Proyecto y Empresa</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck26" name="tipo" value="26">
                <label class="custom-control-label" for="customCheck26">Saldo Contractual por Programa</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck27" name="tipo" value="27">
                <label class="custom-control-label" for="customCheck27">Saldo Contractual por tramo</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck32" name="tipo" value="32">
                <label class="custom-control-label" for="customCheck32">Saldo por tramo y proyecto</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck33" name="tipo" value="33">
                <label class="custom-control-label" for="customCheck33">Saldo Contractual por Estado de Estimación</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck34" name="tipo" value="34">
                <label class="custom-control-label" for="customCheck34">Saldo Deuda por Programa</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck35" name="tipo" value="35">
                <label class="custom-control-label" for="customCheck35">Saldo Deuda por Rango de fechas</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck36" name="tipo" value="36">
                <label class="custom-control-label" for="customCheck36">Saldo Deuda por deuda pendiente</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck37" name="tipo" value="37">
                <label class="custom-control-label" for="customCheck37">Detalle Respaldo Presupuestario</label>
            </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <!-- <img id="btnGenerar" border="0" onclick="javascript:print()" src="../Images/print_32.png" /><br /> -->
        <img id="btnGenerar" border="0" src="../Images/print_32.png" /><br />
    </div>
    <div class="row text-right mt-5">
        <div class="form-group col-md-6 col-lg-5 mt-2">
        </div>
        <div class="form-group col-md-6 col-lg-5 ml-md-auto">
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <!-- <button id="btnGenerar" type="button" class="btn btn-primary btn-form">GENERAR</button> -->
                    <!-- <img id="btnGenerar" border="0" src="../Images/print_32.png" /><br /> -->
                </div>
            </div>
        </div>
    </div>
    <div id="testDiv"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
    </script>
    <%: Scripts.Render("~/js/jsReportesDeuda.js?a=22") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
