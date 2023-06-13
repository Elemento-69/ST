<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ConstanciaSAF.aspx.cs" Inherits="Covialgt.Financiera.ConstanciaSAF" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">  
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Costancia SAF</h1>
    <hr class="thick" />
      
      
    <div class="mx-2 row big-gutter">
          <%if ((HttpContext.Current.User.IsInRole("ADMINISTRADORES"))||(HttpContext.Current.User.IsInRole("DIRECTOR")) )
                { %>
       <div class="form-group col-md-6">
            <label for="PlanAnualList">Plan Anual</label>
            <select ID="PlanAnualList" Class="form-control"></select>
        </div>
        <div class="form-group col-md-6">
            <label for="ProgramaList">Programa</label>
            <select ID="ProgramaList" Class="form-control"></select>
        </div>
        <div class="form-group col-md-6">
            <label for="ProyectoList">Proyecto</label>
            <select Class="form-control" id="ProyectoList"></select>
        </div>
        <div class="col-xl-6 col-lg-5 col-md-6 col-10">
            <label for="ProyectoList">No. Constancia</label>
            <input type="text" id="Constancia" class="form-control w-100" placeholder="No. Constancia">
        </div>
        <br />
        <div class="form-group col-md-6">
             <button type="button" id="btnReporteDetalle" class="btn btn-outline-secondary btn-form">GENERAR REPORTE DETALLADO</button>
             <button type="button" id="btnReporteResumen" class="btn btn-outline-secondary btn-form">GENERAR REPORTE RESUMEN</button>
               
         </div>
         <%} %>
       
    </div>
     <div id="testDiv">
           
    </div>
    <div class="w-100"></div>
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        rolesUsuario = "<%= Session["roles"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
    </script>
    <%: Scripts.Render("~/js/jsConstanciaSAF.js") %>
</asp:Content>
