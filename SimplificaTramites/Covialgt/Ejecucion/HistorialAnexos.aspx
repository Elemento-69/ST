<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HistorialAnexos.aspx.cs" Inherits="Covialgt.Ejecucion.HistorialAnexos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Historial de Anexos</h1>
     <hr class="thick" />
    <h2>Anexo de Proyecto  <%= Session["proyecto"] %>-<%= Session["plan"] %></h2>
   <%-- <h5 class="d-inline-flex"> Anexo al Documento:</h5><div class="d-inline-flex ml-3"></div>--%>
    
          <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
              
            </div>
        </div>
    <div class="form-group col-md-5  mt-3">
        <label for="Componente-set">Versi&oacute;n de Anexo Hasta Documento de Cambio</label>
        <select class="form-control" id="Componente-set" name="Componente">
        </select>        
    </div>
      <div class="col-md-4 text-left">
          <button type="button" id="btnImprimir"  class="btn btn-light">
                <i class="fas fa-print fa-2x"></i>
        </button>
      </div>

    <div id="testDiv">
           
    </div>
   <%-- 
    
         <div class="table-responsive mt-5">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th>Ruta</th>
                        <th>Tramo</th>
                        <th>Departamento</th>
                        <th>Longitud</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr  >
                        <td colspan="6" class="table-total border-0">52.480 KM</td>
                    </tr>
                </tfoot>
            </table>
        </div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
     <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
     </script>
    <%: Scripts.Render("~/js/jsHistorialAnexos.js") %>
</asp:Content>
