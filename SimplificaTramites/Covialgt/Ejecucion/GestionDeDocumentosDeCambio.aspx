<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionDeDocumentosDeCambio.aspx.cs" Inherits="Covialgt.Ejecucion.GestionDeDocumentosDeCambio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
	<%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <style type="text/css">
        .invisible: {
            display: none;
        }
    </style>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Gesti&oacute;n de Documentos de Cambio</h1>
    <hr class="thick" />
    <div class="row">
        <div class="form-group col-md-5 col-lg-5">
            <label for="parametroInput">T&eacute;rmino de B&uacute;squeda</label>
            <input type="text" class="form-control" id="parametroInput" name="parametroInput">
        </div>
    </div>
    <div class="row justify-content-between align-items-end">
        <div class="form-group col-md-5 col-lg-5">
            <label for="criterioSelect">Estado Actual del Documento de Cambio:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="criterioSelect" name="criterioSelect"></select>
        </div>
        <div class="form-group col-md-2 col-lg-2">
            <div class="icon text-center">
                <i class="fas fa-arrow-right fa-3x"></i>
            </div>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="estadoSelect">Nuevo Estado del Documento de Cambio</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="estadoSelect" name="estadoSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="col-5 text-right">
            <button class="btn btn-primary btn-sm float-bottom" id="btnBuscar" type="button" style="height: 38px" title="Buscar...">
                <i class="fas fa-search fa-2x"></i>
            </button>
        </div>
        <div class="col-5 text-right">
            <button type="button" id="btnAsignarEstado" class="float-right btn btn-primary btn-form">Asignar Estado...</button>
        </div>
    </div>
    <hr class="pearator-line"/>
    <label id="lblStatus"></label>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="documentosCambio-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">A&ntilde;o</th>
                    <th class="text-center">Proyecto Codigo</th>
                    <th class="text-center">DC No.</th>
                    <th class="text-center">Fecha Presentaci&oacute;n</th>
                    <th class="text-center">Justificaci&#243;n</th>
                    <th class="text-center">Monto</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">Corr.</th>
                    <th class="text-center">Fecha Estado</th>
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
     <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        rolpermitido = "<%= ViewState["rolpermitido"] ?? "" %>"
        rolasistente = "<%= ViewState["rolasistente"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        user = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsGestionDeDocumentosDeCambio.js?a=22") %>
</asp:Content>
