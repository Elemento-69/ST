<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RecomendacionPagoSupervisor.aspx.cs" Inherits="Covialgt.RecomendacionPagoSupervisor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
	<%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <style type="text/css">
        .invisible: {
            display: none;
        }
    </style>
    <hr class="thick"/>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="planInput">A&ntilde;o:</label>
            <input type="text" class="form-control" id="planInput" name="planInput" readonly>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="codigoProyectoInput">Codigo Proyecto:</label>
            <input type="text" class="form-control" id="codigoProyectoInput" name="codigoProyectoInput" readonly>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="estimacionInput">Estimaci&oacute;n:</label>
            <input type="text" class="form-control" id="estimacionInput" name="estimacionInput" readonly>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <div class="form-group">
                <label for="desdeInput">Fecha:</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="clausulaContratoInput">Clausula Contrato:</label>
            <input type="text" class="form-control" id="clausulaContratoInput" name="clausulaContratoInput">
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="noClausulaInput">No. Clausula</label>
            <input type="text" class="form-control" id="noClausulaInput" name="noClausulaInput">
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="claseInput">Clase:</label>
            <input type="text" class="form-control" id="claseInput" name="claseInput">
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="noPolizaInput">No. Poliza:</label>
            <input type="text" class="form-control" id="noPolizaInput" name="noPolizaInput">
        </div>
    </div>
	<div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="aseguradoraSelect">Aseguradora:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="aseguradoraSelect" name="aseguradoraSelect">
                <option value="Afianzadora General, Sociedad Anónima" selected>Afianzadora General, Sociedad Anónima</option>
                <option value="Fianzas de Occidente, Sociedad Anónima">Fianzas de Occidente, Sociedad Anónima</option>
                <option value="Afianzadora Solidaria, Sociedad Anónima">Afianzadora Solidaria, Sociedad Anónima</option>
                <option value="Afianzadora G&amp;T, Sociedad Anónima">Afianzadora G&amp;T, Sociedad Anónima</option>
                <option value="Aseguradora Fidelis, Sociedad Anónima">Aseguradora Fidelis, Sociedad Anónima</option>
                <option value="Afianzadora CHN">Afianzadora CHN</option>
                <option value="Aseguradora Rural, Sociedad Anónima">Aseguradora Rural, Sociedad Anónima</option>
                <option value="Aseguradora Guatemalteca, Sociedad Anónima">Aseguradora Guatemalteca, Sociedad Anónima</option>
                <option value="La Ceiba, Sociedad Anónima">La Ceiba, Sociedad Anónima</option>
                <option value="El Roble, Sociedad Anónima">El Roble, Sociedad Anónima</option>
                <option value="Seguros Privanza, Sociedad Anónima">Seguros Privanza, Sociedad Anónima</option>
                <option value="Afianzadora Provinza">Afianzadora Provinza</option>
                <option value="Seguros Alianza, Sociedad Anónima">Seguros Alianza, Sociedad Anónima</option>
            </select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="nombreCompletoDelegadoInput">Nombre Completo Delegado:</label>
            <input type="text" class="form-control" id="nombreCompletoDelegadoInput" name="nombreCompletoDelegadoInput">
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="nombreSupervisorInput">Nombre Supervisor:</label>
            <input type="text" class="form-control" id="nombreSupervisorInput" name="nombreSupervisorInput">
        </div>
        <!-- <div class="form-group col-md-5 col-lg-5">
            <label for="razonSelect">Razones por las Cuales No se Cumplio El Programa:</label>
            <select class="form-control invisible for-remanente-renglon for-remanente-tramo" id="razonSelect" name="razonSelect" disabled>
                <option value="Los Tramos a Cargo no Tienen Problemas de Baches" selected>Los Tramos a Cargo no Tienen Problemas de Baches</option>
                <option value="Por Modificaciones en la ejecuci&#243;n de los trabajos programados">Por Modificaciones en la ejecuci&#243;n de los trabajos programados</option>
                <option value="Por Problemas Climatologicos en el &#193;rea">Por Problemas Climatologicos en el &#193;rea</option>
                <option value="Por Reubicacion del Campamento">Por Reubicacion del Campamento</option>
            </select>
        </div> -->
    </div>
    <div class="row justify-content-between">
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="estimacionUnicaCheck">
            <label class="custom-control-label" for="estimacionUnicaCheck">Estimaci&oacute;n Unica</label>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <button type="button" id="btnGenerarReporte" class="btn btn-light" title="Generar Reporte">
                <i class="fas fa-print fa-2x"></i>
            </button>
        </div>
    </div>
    <div id="testDiv"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
	<%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        anioID = "<%= Session["AnioID"] %>"
        codigoproyecto = "<%= Session["codigoproyecto"] %>".trim()
        correlativo = "<%= Session["Correlativo"] %>".trim()
        delegado = "<%= Session["Delegado"] %>"
    </script>
    <%: Scripts.Render("~/js/jsRecomendacionPagoSupervisor.js?a=10") %>
</asp:Content>
