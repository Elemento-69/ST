<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="LiquidacionProyectos.aspx.cs" Inherits="Covialgt.Liquidacion.LiquidacionProyectos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Liquidaci&oacute;n de Proyecto</h1>
    <hr class="thick" />
     <div class="mx-2 row big-gutter">
       <div class="col-md-6">
           <div class="form-group">
                <label for="PlanAnualList">Plan Anual</label>
                <select ID="PlanAnualList" Class="form-control"></select>
           </div>
           <div class="form-group" id="divPrograma">
                <label for="ProgramaList">Programa</label>
                <select ID="ProgramaList" Class="form-control"></select>
           </div>
           <div class="form-group">
                <label for="ProyectoList">Proyecto</label>
                <select ID="ProyectoList" Class="form-control"></select>
           </div>
         
       </div>
        <div class="col-md-6">
            <button type="button" class="btn btn-light h3 my-4 btn-lg btn-block" id="listDoc">
                <i class="fas fa-print"></i> Listado de Documentos
            </button>
            <div class="w-100"></div>
            <button type="button" class="btn btn-light h3 my-4 btn-lg btn-block" id="bliquidacion">
                <i class="fas fa-print"></i> Bitacora de L&iacute;quidacion
            </button>
            <div class="w-100"></div>
            <button type="button" class="btn btn-light h3 my-4 btn-lg btn-block" id="manual">
                <i class="fas fa-book"></i> Manual de Usuario
            </button>
        </div>
        <div class="col-12">
            <button type="button" class="float-right btn btn-primary" id="update-btn">ABRIR REGISTRO LIQUIDACI&Oacute;N</button>
        </div>
        <div class="estadoForm col-12 row d-none proy-depend">
            <div class="col-6 form-group ">
                <label for="estados">Estado</label>
                <select ID="estados" Class="form-control"></select>
           </div>
           <div class="col-6 form-group ">
                <label for="comentario">Comentario</label>
                <textarea rows="4" ID="comentario" Class="form-control"></textarea>
           </div>
            <div class="col-12">
                <button type="button" class="float-right btn btn-primary" id="updateState-btn">MODIFICAR ESTADO</button>
            </div>
        </div>
    </div>
    <hr class="pearator-line"/>
    <div id="testDiv">
    </div>
    <div class="text-danger font-weight-bold">*NOTA: TODOS LOS REQUERIMIENTOS DEBEN ESCANEARSE AL MOMENTO DE ESTAR RECEPCIONADO EL PROYECTO, Y DEBEN CONTENER TODAS LAS FIRMAS Y SELLOS CORRESPONDIENTES</div>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="equipos-table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                     <th class="text-center"></th>
                    <th class="text-center">No</th>
                    <th class="text-center">Nombre del Archivo</th>
                    <th class="text-center">Archivos</th>
                    <th class="text-center">Observaciones</th>
                    <th class="text-center">Presentado</th>
                    <th class="text-center">Reparado</th>
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
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"
        token = "<%= Session["token"] ?? "" %>"
        rol = '<%= Session["rol"] %>'
        user = "<%= Session["usuario"]%>"
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
        rolConsultas = '<%= ViewState["rolConsultas"] %>'
    </script>
    <%: Scripts.Render("~/js/jsLiquidacionProyectos.js?1") %>
</asp:Content>
