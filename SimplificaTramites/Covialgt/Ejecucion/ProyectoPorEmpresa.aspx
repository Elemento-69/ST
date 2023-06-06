<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProyectoPorEmpresa.aspx.cs" Inherits="Covialgt.Ejecucion.ProyectoPorEmpresa" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
       <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
       <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Proyectos Por Empresa</h1>
    <div class="row justify-content-left">
        <div class="form-group col-md-4 col-lg-4">
            <label for="componenteSelect">NIT</label>
            <input type="text" class="form-control" id="nitInput" name="nitInput" group="buscarEmpresa">
        </div>
        <div class="form-group col-md-4 col-lg-4">
            <label for="componenteSelect">Nombre Empresa</label>
            <input type="text" class="form-control" id="nombreEmpresaInput" name="nombreEmpresaInput" group="buscarEmpresa">
        </div>
         <div class="form-group col-md-2 col-lg-2 mt-4">
              <button type="button" class="btn btn-primary btn-block" id="btnBuscar">BUSCAR</button>
         </div>
    </div>
    <div class="row">
        <div class="form-group col-md-8 col-lg-8">
            <label for="componenteSelect">Filtro Empresa</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="empresaSelect" name="empresaSelect"></select>
        </div>
        <div class="text-right mt-4">
            <button type="button" id="btnImprimir" class="btn btn-light" title="Imprimir" disabled>
                <i class="fas fa-print fa-2x"></i>
            </button>
        </div>
    </div>

    
        <div id="testDiv"></div>
    
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="proyectos-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center">A&ntilde;o</th>
                    <th class="text-center">C&oacute;digo</th>
                    <th class="text-center">Descripci&oacute;n</th>
                    <th class="text-center">Estado</th>
                    <th class="text-center">Monto Original</th>
                    <th class="text-center">Monto Modificado</th>
                    <th class="text-center">Pagado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
     <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%--<%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>--%>
    <%--<%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>--%>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        usuario = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsProyectoPorEmpresa.js?a=1") %>
</asp:Content>
