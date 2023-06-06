<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ActualizacionNOG.aspx.cs" Inherits="Covialgt.Ejecucion.ActualizacionNOG" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Actualización de Número de Operación GUATECOMPRAS (NOG)</h1>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="NOGActualInput">NOG Actual</label>
            <input type="text" class="form-control" id="NOGActualInput" name="NOGActualInput" readonly>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="NOGInput">NOG</label>
            <input type="text" class="form-control" id="NOGInput" name="NOGInput">
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
    </div>
    <div class="form-group">
        <div class="text-center">
            <button type="button" class="btn btn-primary btn-form" id="btnActualizar" disabled>Actualizar</button>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        usuario = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsActualizacionNOG.js?a=1") %>
</asp:Content>
