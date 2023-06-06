<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionDeSanciones.aspx.cs" Inherits="Covialgt.Ejecucion.GestionDeSanciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Gesti&oacute;n de Sanciones</h1>
    <hr class="thick" />
    <div class="form-group col-md-6 col-xl-5 ml-md-auto">
        <div class="row justify-content-between">
            <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                <a type="button" id="btnRegresarConsultaSanciones" class="btn btn-outline-secondary btn-block">REGRESAR</a>
            </div>
        </div>
    </div>
    <h3>Datos de Sanci&oacute;n</h3>
    <div class="row justify-content-between">
	    <div class="form-group col-md-5 col-lg-5">
	        <label for="codigoSancionSelect">C&oacute;digo Sanci&oacute;n</label>
	        <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="codigoSancionSelect" name="codigoSancionSelect"></select>
	        <label for="descripcionRecurrenciaSelect">Descripci&oacute;n de Recurrencia</label>
	        <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="descripcionRecurrenciaSelect" name="descripcionRecurrenciaSelect"></select>
	        <label for="montoSancionInput">Monto de la Sanci&oacute;n:</label>
	        <input type="text" class="form-control frcurrency-mask" id="montoSancionInput" name="montoSancionInput">
	    </div>
	    <div class="form-group col-md-5 was-validated">
	        <label for="descripcionTextarea">Descripci&oacuten</label>
	        <textarea class="form-control" id="descripcionTextarea" name="descripcionTextarea" rows="4" readonly></textarea>
	        <label for="fechaSancion">Fecha Presentaci&oacute;n</label>
	        <div class="input-group date" id="fechaSancion-dp" data-target-input="nearest">
	            <input id="fechaSancionInput" type="text" name="fechaSancion" autocomplete="off" class="form-control  datetimepicker-input" required>
	            <div class="input-group-append" data-target="#fechaSancion-dp" data-toggle="datetimepicker">
	                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
	            </div>
	        </div>
	    </div>
    </div>
    <h3>Justificaci&oacute;n</h3>
    <div class="row justify-content-between">
    	<div class="form-group col-md-12 was-validated">
	        <label for="justificacionTextarea">Justificaci&oacute;n</label>
	        <textarea class="form-control" id="justificacionTextarea" name="Justificacion" rows="8" required></textarea>
	    </div>
    </div>
    <h3>Firmas y Aprobaci&oacute;n</h3>
    <div class="row justify-content-between">
	    <div class="form-group col-md-5 col-lg-5">
	        <label for="auxiliarControlSeguimientoSelect">Auxiliar de Control y Seguimiento:</label>
	        <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="auxiliarControlSeguimientoSelect" name="auxiliarControlSeguimientoSelect"></select>
	    </div>
    	<div class="form-group col-md-5 col-lg-5">
	        <label for="coordinadorControlSeguimientoSelect">Coordinador de Control y Seguimiento</label>
	        <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="coordinadorControlSeguimientoSelect" name="coordinadorControlSeguimientoSelect"></select>
	    </div>
    </div>
    <div class="row justify-content-between">
    	<div class="form-group col-md-5 col-lg-5">
	        <label for="subdirectorTecnicoSelect">Subdirector T&eacute;cnico Unidad Ejecutora:</label>
	        <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="subdirectorTecnicoSelect" name="subdirectorTecnicoSelect"></select>
	    </div>
	</div>
	<button type="button" id="btnAgregar" class="btn btn-primary btn-form float-right ml-3 mb-3">AGREGAR</button>
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
        plan = "<%= ViewState["plan"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        proyecto2 = "<%= ViewState["proyecto2"] ?? "" %>"
        VieneRegistro = "<%= ViewState["VieneRegistro"] %>"
        programa = "<%= ViewState["programa"] %>"
        usuario = "<%= Session["usuario"] %>"
        rol = "<%= Session["rol"] %>"
    </script>
    <%: Scripts.Render("~/js/jsGestionDeSanciones.js?a=14") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
