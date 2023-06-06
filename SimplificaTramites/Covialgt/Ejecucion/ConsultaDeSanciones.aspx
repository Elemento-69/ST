<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ConsultaDeSanciones.aspx.cs" Inherits="Covialgt.Ejecucion.ConsultaDeSanciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">  
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Consulta de Sanciones</h1>
    <hr class="thick" />
      <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
                <div class="col-sm-6 col-xl-5">
                    <button type="button" id="btnGestionDeSanciones" class="btn btn-primary btn-block">AGREGAR</button>
                </div>
            </div>
        </div>
      
    <div class="mx-2 row big-gutter">
          <%if ((HttpContext.Current.User.IsInRole("ADMINISTRADORES"))||(HttpContext.Current.User.IsInRole("DIRECTOR")) )
                { %>
       <div class="form-group col-md-6" id="divPlan">
            <label for="PlanAnualList">Plan Anual</label>
            <select ID="PlanAnualList" Class="form-control"></select>
        </div>
        <div class="form-group col-md-6" id="divProgram">
            <label for="ProgramaList">Programa</label>
            <select ID="ProgramaList" Class="form-control"></select>
        </div>
        <div class="form-group col-md-6" id="divProject">
            <label for="ProyectoList">Proyecto</label>
            <select Class="form-control" id="ProyectoList"></select>
        </div>
         <%} %>
          <%if (HttpContext.Current.User.IsInRole("Supervisor"))
                { %>       
        <div class="form-group col-md-12" id="divProjectSup">
            <label for="ProyectoListSup">Proyectos</label>
            <select Class="form-control" id="ProyectoListSup"></select>
        </div>
        
        <%} %>
    </div>
     <div id="testDiv">
           
    </div>
    <div class="w-100"></div>
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered" id="doc_cambio-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th>Correlativo</th>
                        <th>C&oacute;digo Sanci&oacute;n</th>
                        <th>Descripci&oacute;n de Responsabilidad</th>
                        <th>Recurrencia</th>
                        <th>Justificaci&oacute;n</th>
                        <th>Monto</th>
                        <th>Fecha de Sanci&oacute;n</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody id="componentes-tbody">
                </tbody>
            </table>
        </div>
    </div>  
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        rolesUsuario = "<%= Session["roles"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
    </script>
    <%: Scripts.Render("~/js/jsConsultaDeSanciones.js?a=16") %>
</asp:Content>
