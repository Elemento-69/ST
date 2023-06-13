<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EstimacionesFacturas.aspx.cs" Inherits="Covialgt.Estimaciones.EstimacionesFacturas" %>
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
	<!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <hr class="thick" />
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <h1>Ingreso de facturas</h1>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <h1>Informe</h1>
        </div>
    </div>
	<div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="planSelect">Planes:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="planSelect" name="planSelect"></select>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck1" name="informe" checked="true" value="1">
                <label class="custom-control-label" for="customCheck1">Por a&ntilde;o:</label>
            </div>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programas:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <!-- <label for="anioSelect">Programas:</label> -->
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Programas:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck2" name="informe" value="2">
                <label class="custom-control-label" for="customCheck2">Por fechas a partir del 9/9/2014:</label>
            </div>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="estimacionSelect">Estimaciones:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="estimacionSelect" name="estimacionSelect"></select>
        </div>
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
    </div>
    <div class="row justify-content-between">
    	<div class="form-group col-md-5 col-lg-3"></div>
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
    <div class="row justify-content-between">
    	<div class="form-group col-md-5 col-lg-3"></div>    	
        <button type="button" id="btnGenerarInforme" class="btn btn-light">
                <i class="fas fa-print fa-2x"></i>
            </button>
    </div>
    <hr class="thick" />
	<div class="row justify-content-between">
    	<div class="form-group col-md-5 col-lg-3">
	        <label for="catTipoFacturaSelect">Tipo de Factura</label>
        	<select class="form-control for-remanente-renglon for-remanente-tramo" id="catTipoFacturaSelect" name="catTipoFacturaSelect"></select>
	        <label for="serieInput">Serie</label>
            <input type="text" class="form-control" id="serieInput" name="serieInput" required>
            <label for="facturaInput">Factura</label>
            <input type="number" class="form-control" id="facturaInput" name="facturaInput" required>
            <label for="montoInput">Monto</label>
            <label class="mx-10 px-10" id="lblSaldo"></label>
            <input type="number" class="form-control" id="montoInput" name="montoInput" required>
            <label for="observacionesInput">Observaciones</label>
            <input type="text" class="form-control" id="observacionesInput" name="observacionesInput" required>
            <label for="tipoFacturaSelect">Regimen Factura</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="tipoFacturaSelect" name="tipoFacturaSelect"></select>
            <button type="button" id="btnAgregarFactura" class="btn btn-primary btn-form">Agregar Factura</button>
    	</div>
    </div>
    <hr class="thick" />
	<div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="trabajosAdmon-table">
            <thead>
                <tr>
                	<th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Estimaci&oacute;n</th>
                    <th class="text-center">Correlativo Factura</th>
                    <th class="text-center">Serie</th>
                    <th class="text-center">NoFactura</th>
                    <th class="text-center">Monto Pago</th>
                    <th class="text-center">Observacion</th>
                    <th class="text-center">Regimen</th>
                    <th class="text-center">Tipo Factura</th>
                    <th class="text-center">Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
	        <tbody></tbody>
        </table>
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
    <%: Scripts.Render("~/js/jsEditTableButtons.js?a=3") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        rolpermitido = "<%= ViewState["rolpermitido"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        user = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsEstimacionesFacturas.js?a=53") %>
</asp:Content>
