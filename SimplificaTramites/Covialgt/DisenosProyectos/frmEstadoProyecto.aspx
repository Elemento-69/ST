<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEstadoProyecto.aspx.cs" Inherits="Covialgt.DisenosProyectos.frmEstadoProyecto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Cambio de Estado de Proyectos</h1>
    <hr class="thick" />
    <div class="row">
        <h2 class="col-6 text-center">Proyecto</h2>
        <h2 class="col-6 text-center">Estado</h2>
    </div>
     <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="estadoActualSelect">Estado Actual</label>
            <select class="form-control" id="estadoActualSelect" name="estadoActualSelect" disabled="disabled"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control" id="programaSelect" name="programaSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="estadoSelect">Estado</label>
            <select class="form-control" id="estadoSelect" name="estadoSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto</label>
            <select class="form-control" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
    </div>
    <div class="form-group">
        <div class="text-center">
            <button type="button" class="btn btn-primary btn-form" id="btnActualizar">Cambiar Estado</button>
        </div>
    </div>     
  

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
      <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <script>
        base_url = '<%= ViewState["baseURL"] %>'
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        usuario = "<%= Session["usuario"] %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/DisenosProyectos/jsEstadoProyecto.js") %>
</asp:Content>
