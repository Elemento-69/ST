<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AsignacionesSupervisores.aspx.cs" Inherits="Covialgt.Ejecucion.AsignacionesSupervisores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Asignar Supervisor</h1>
    <div class="row">
        <h2 class="col-6 text-center">Proyecto</h2>
        <h2 class="col-6 text-center">Supervisor</h2>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSupervisorSelect">A&ntilde;o</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="anioSupervisorSelect" name="anioSupervisorSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSupervisorSelect">Proyecto</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="proyectoSupervisorSelect" name="proyectoSupervisorSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
    </div>
     <div class="col-md-4 text-center">
            <button type="button" id="btnImprimir" class="btn btn-light">
                <i class="fas fa-print fa-2x"></i>
            </button>          
        </div>
    <div class="form-group">
        <div class="text-center">
            <button type="button" class="btn btn-primary btn-form" id="btnAsignar" disabled>Asignar</button>
        </div>
    </div>
    <div id="testDiv"></div>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="asignacion-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Año</th>
                    <th class="text-center">Proyecto</th>
                    <th class="text-center">Año Supervision</th>
                    <th class="text-center">Proyecto Supervision</th>
                    <th class="text-center">Fecha Desde</th>
                    <th class="text-center">Fecha Hasta</th>
                    <th class="text-center">Usuario</th>
                    <th class="text-center">Fecha Modifico</th>
                    <th class="text-center">Relacion Activa</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
     <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
     <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
     <%: Scripts.Render("~/js/inputmask.js") %>
     <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        usuario = "<%= Session["usuario"] %>"
        rol = "<%= Session["rol"] %>"
    </script>
    <%: Scripts.Render("~/js/jsAsignacionesSupervisores.js?a=6") %>
</asp:Content>
