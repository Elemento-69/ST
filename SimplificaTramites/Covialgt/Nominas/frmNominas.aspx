<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmNominas.aspx.cs" Inherits="Covialgt.Nominas.frmNominas" %>

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
    <script src="../js/jsNominasPago.js"></script>
    <!-- Scripts -->

    <div id="testDiv" tabindex="-1">
    </div>

    <h1>Nóminas de Pago</h1>
    <hr class="thick" />

    <%if ((HttpContext.Current.User.IsInRole("ADMINISTRADORES")) || (HttpContext.Current.User.IsInRole("DIRECTOR")))
        { %>

    <div class="row">
        <div class="form-group col-md-5">
            <label for="cmbPlanes">Año</label>
            <select id="cmbPlanes" class="form-control"></select>
        </div>
        <div class="form-group col-md-5">
            <label for="txtCorrelativo">Correlativo</label>
            <input id="txtCorrelativo" type="text" class="form-control" />
        </div>
        <%--<div class="d-flex align-items-bottom custom-checkbox">--%>
        <div class="col align-self-end custom-checkbox">
            <div class="form-group col-md-3 custom-checkbox ">
                <input type="checkbox" class="custom-control-input" id="checkAprobadoF" checked>
                <label class="custom-control-label" for="checkAprobado">Aprobado</label>
            </div>
        </div>
    </div>

    <div class="text-right pt-5">
        <button type="button" id="btnFiltrar" class="btn btn-primary btn-form">FILTRAR</button>
        <button type="button" id="btnLimpiar" class="btn btn-outline-secondary btn-form" hidden>REPORTE</button>
    </div>
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="tableNominas">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th></th>
                    <th>Año</th>
                    <th>Nómina Correlativo</th>
                    <th>Monto Techo</th>
                    <th>Monto Acumulado</th>
                    <th>Cantidad de Estimaciones</th>
                    <th>Nómina Aprobada</th>
                    <th hidden>Número de Acta</th>
                    <th>Fecha de Aprobación</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>






    <%} %>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        rol = '<%= Session["rol"] %>'
        user = "<%= Session["usuario"]%>"
    </script>
</asp:Content>
