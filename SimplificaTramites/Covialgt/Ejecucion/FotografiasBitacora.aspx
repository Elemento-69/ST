<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="FotografiasBitacora.aspx.cs" Inherits="Covialgt.Ejecucion.FotografiasBitacora" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Fotograf&iacute;as Bitacora</h1>
    <hr class="thick" />
    <div class="font-weight-bold my-2">Plan: <%= Session["plan"] %></div>
    <div class="font-weight-bold my-2">Proyecto: <%= Session["proyecto"] %></div>    
    <div class="row justify-content-end">
     <button type="button" id="btnImprimir" class="btn btn-light">
                    <i class="fas fa-print fa-2x"></i>
     </button>
     <div id="testDiv">
           
    </div>  
        <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>               
            </div>
        </div>
     
    </div>
    <div class="card custom-card border-0">
      <div class="card-body">
         <div class="table-responsive mt-5">
            <table class="table table-bordered" id="fotografias-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th></th>
                        <th>ID</th>
                        <th>T&iacute;tulo</th>
                        <th>Descripci&oacute;n</th>
                        <th>Fotograf&iacute;a</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
      </div>    
    </div>
    <div class="modal fade" id="verModal" tabindex="-1" role="dialog" aria-labelledby="verModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="verModalLabel">Imagen Previa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body text-center">
                    <img class="img-fluid" src="../Images/dummy_143x143.png" id="modal-img" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
      <%: Scripts.Render("../js/jsEditTableButtons.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
         token = "<%= Session["token"] ?? "null" %>"
         plan = "<%= Session["plan"] %>"
         proyecto = "<%= Session["proyecto"] %>"
        usuario = "<%= Session["usuario"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
    </script>
    <%: Scripts.Render("../js/jsFotografiasBitacora.js") %>
</asp:Content>
