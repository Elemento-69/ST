<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TrasladoDevengado.aspx.cs" Inherits="Covialgt.TrasladoDevengado" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Traslado a Devengado de Estimaciones</h1>
    <h2>Estado de Estimaciones</h2>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <hr class="thick" />
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="criterioSelect">Estado Actual de la Estimaci&oacute;n:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="criterioSelect" name="criterioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="estadoSelect">Nuevo Estado de la Estimaci&oacute;n:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="estadoSelect" name="estadoSelect"></select>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-5">
            <label for="parametroInput">T&eacute;rminos de B&uacute;squeda: C&oacute;digo del Proyecto, NIT, Nombre de la Empresa, Plan Anual, Correlativo de la Estimaci&oacute;n, Monto Ejecutado, Estado</label>
            <input type="text" class="form-control" id="parametroInput" name="parametroInput">
        </div>
    </div>
    <div class="row">
        <div class="col-2 text-start">
            <button class="btn btn-primary btn-sm float-bottom" id="btnBuscar" type="button" style="height: 38px">
                <img src="~/Images/search.svg" width="20" height="20" alt="Buscar" runat="server" />
            </button>
        </div>
        <div class="col-10 text-right">
            <button type="button" id="btnAsignarEstado" class="float-right btn btn-primary btn-form">Asignar Estado...</button>
        </div>
    </div>
    <hr class="pearator-line"/>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="estimaciones-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center">A&#241;o</th>
                    <th class="text-center">Proyecto Codigo</th>
                    <th class="text-center">Corr.</th>
                    <th class="text-center">Periodo</th>
                    <th class="text-center">Monto</th>
                    <th class="text-center">Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        asignaDevengado = "<%= ViewState["AsignaDevengado"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        user = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsTrasladoDevengado.js?a=32") %>
</asp:Content>
