<%@ Page Title="Trabajos de Administracion" Language="C#" ClientIDMode="Static" Async="true" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TrabajosAdministracion.aspx.cs" Inherits="Covialgt.Administracion.TrabajosAdministracion" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <style>
        .width-custom {
            min-width: 200px;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Trabajos por Administraci&oacute;n</h1>
    <hr class="thick" />
    <h2 class="mt-5"><b>Gesti&oacute;n de Trabajos por Administraci&oacute;n</b></h2>
    <div class="row mt-5">
        <div class="col-sm-10 col-md-10 col-lg-5">
            <label for="terminoBusqueda">Término de la Búsqueda:</label>
            <input type="text" class="form-control" id="terminoBusqueda" name="terminoBusqueda">
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-sm-10 col-md-10 col-lg-5 p-0">
            <div class="col-12">
                <label for="trabajosAdministracion">Estado Actual de los Trabajos por Administración:</label>
                <select id="trabajosAdministracion" class="form-control plan-select" placeholder="Seleccione Documento"></select>
            </div>
            <div class="col-12">
                <button type="button" class="px-5 btn btn-primary text-uppercase my-3 float-right" id="buscar-documento">
                    Buscar <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
        <div class="col-sm-0 col-md-0 col-lg-2"></div>
        <div class="col-sm-10 col-md-10 col-lg-5 p-0">
            <div class="col-12">
                <label for="nuevoEstadoAdministracion">Nuevo Estado de los Trabajos por Administraci&oacute;n:</label>
                <select id="nuevoEstadoAdministracion" class="form-control plan-select" placeholder="Seleccione Documento"></select>
            </div>
            <div class="col-12">
                <button type="button" id="btn-asignar-estado" class="px-5 btn btn-primary text-uppercase my-3 float-right">
                    ASIGNAR ESTADO
                </button>
            </div>
        </div>
    </div>
    <div class="mt-5 pt-5 d-none" id="block-message"></div>
    <div class="mt-5">
        <div class="card custom-card bg-gray-custom mb-3">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover mt-4 w-100" id="acta-table"></table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
    </script>
    <%: Scripts.Render("~/js/Administracion/jsTrabajoAdministracion.js") %>
</asp:Content>
