<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReAsignacionEstimaciones.aspx.cs" Inherits="Covialgt.Administracion.ReAsignacionEstimaciones" %>
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
	<h1>Reasignaci&oacute;n de Estimaciones</h1>
    <hr class="thick" />
    <div class="container mt-5">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8 mb-3">
                <label class="fw-medium">Seleccionar</label>
                <div class="d-flex justify-content-between flex-wrap fw-medium bg-white pt-2 pb-3 border-custom rounded-lg">
                    <div class="custom-control custom-radio mr-3">
                        <input type="radio" class="custom-control-input" id="customRadioTodos" name="tipoFiltro"
                            value="1">
                        <label class="custom-control-label" for="customRadioTodos">Todos</label>
                    </div>
                    <div class="custom-control custom-radio mr-3">
                        <input type="radio" class="custom-control-input" id="customRadioTodosComentarios" name="tipoFiltro"
                            value="2" checked>
                        <label class="custom-control-label" for="customRadioTodosComentarios">Pendientes de Asignación</label>
                    </div>
                    <div class="custom-control custom-radio mr-3">
                        <input type="radio" class="custom-control-input" id="asignadosRadio" name="tipoFiltro"
                            value="3">
                        <label class="custom-control-label" for="asignadosRadio">Asignados</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-end mt-4">
        <div class="col-md-4 col-lg-3 ml-auto mr-4">
            <div class="form-group">
                <label for="visores" class="fw-medium">Asignar Visor</label>
                <select id="visores" class="form-control plan-select">
                    <option>Seleccione Visor</option>
                </select>
            </div>
        </div>
    </div>
    <div class="text-right mb-4 mr-4">
        <button type="button" class="btn btn-primary text-uppercase fs-7 px-md-5 py-2" id="save-asignacion" disabled><< Reasignar</button>
    </div>
	<div class="card custom-card bg-gray-custom mb-3">
        <div class="card-body">
            <div class="row mt-2">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mt-4" id="table-asignacion"></table>
                    </div>
                </div>
                <div class="col-lg-12 mb-5">
                    <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="estimaciones-tab" data-toggle="tab" href="#estimaciones" role="tab" aria-controls="estimaciones" aria-selected="true">Estimaciones
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content p-0 shadow-none" id="myTabContent">
                        <div class="tab-pane fade show active" id="estimaciones" role="tabpanel" aria-labelledby="estimaciones-tab">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover" id="table-estimaciones-visores" style="min-width: 1010px;"></table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
        userInRole = "<%= this.usersInRole %>";
    </script>
    <%: Scripts.Render("~/js/jsReAsignacionEstimaciones.js?a=13") %>
</asp:Content>
