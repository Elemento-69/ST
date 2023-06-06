<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmConsolidadoNomina.aspx.cs" Inherits="Covialgt.Nominas.frmConsolidadoNomina" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Content/wizard.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <%--<script src="../Scripts/jquery-3.5.1.min.js"></script>--%>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <script src="../js/jsConsolidadoNomina.js"></script>
    <!-- Scripts -->
     <div id="testDiv" tabindex="-1">
    </div>
    <h1>Informe Consolidado de Nómina</h1>
    <hr class="thick" />
    <div class="row">
        <div class="form-group col-md-12">
            <label for="cmbPlanes">Año</label>
            <select id="cmbPlanes" class="form-control"></select>
        </div>
    </div>
    <div class="row">

        <div class="col-7">
            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="r1" name="example1" checked>
                <label class="custom-control-label" for="r1">Resumen de Nómina</label>
            </div>
        </div>
        <div class="col-5">
            <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="r2" name="example1">
                <label class="custom-control-label" for="r2">Detalle de Nómina</label>
            </div>
        </div>

    </div>
    <div class="text-right">
        <button type="button" id="btnGenerarReporte" class="btn btn-outline-secondary btn-form">GENERAR REPORTE</button>
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        rol = '<%= Session["rol"] %>'
        user = "<%= Session["usuario"]%>"
    </script>


</asp:Content>
