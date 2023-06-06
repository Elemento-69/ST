<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionTrabajoEstimacionList.aspx.cs" Inherits="Covialgt.Ejecucion.GestionTrabajoEstimacionList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <h1>Gesti&oacute;n de Trabajos Por Administración</h1>
    <hr class="thick" />
   
      <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
                <div class="col-sm-6 col-xl-5">
                     <a class="btn btn-primary btn-block" href="GestionTrabajosAdministracion?plan=<%= Session["plan"] %>&proyecto=<%= Session["proyecto"] %>">Agregar</a>
                  
                </div>
            </div>
        </div>
     <div id="testDiv">
           
    </div>
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="trabajos-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Año</th>
                    <th class="text-center">Proyecto</th>
                    <th class="text-center">Correlativo</th>
                    <th class="text-center">Justificaci&oacute;n</th>
                    <th class="text-center">Comentario</th>
                    <th class="text-center">Monto</th>
                    <th class="text-center">Fecha Presentado</th>
                    <th class="text-center">Aprobado</th>
                    <th class="text-center">Fecha Aprobado</th>
                    <th class="text-center">Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">   
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
    </script>
    <%: Scripts.Render("~/js/jsGestionTrabajoEstimacionList.js") %>
</asp:Content>
