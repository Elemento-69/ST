<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionEquiposProyecto.aspx.cs" Inherits="Covialgt.Ejecucion.GestionEquiposProyecto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
        <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
       <h1>Gestión de Equipos de Proyecto</h1>
    <hr class="thick" />
    <h2 class="mt-5">Año:  <%= ViewState["plan"] %> proyecto: <%= ViewState["proyecto"] %></h2>
    <div class="row mt-4">
        <div class="form-group col-md-6 col-lg-6">
            <label for="Descripcion">Descripcion</label>
            <input type="text" class="form-control" id="Descripcion" name="Descripcion">
        </div>
        <div class="form-group col-md-6 col-lg-5 ml-md-auto">
            <label for="Potencia">Potencia HP</label>
            <input type="text" class="form-control frinteger-mask" id="Potencia" name="Potencia">
        </div>
    </div>
    
    <div class="form-group col-md-6 col-xl-5 ml-md-auto mt-5">
        <div class="row justify-content-between">
            <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                 <a type="button" class="btn btn-outline-secondary btn-block text-uppercase"  id="btnRegresarRegistroDatos">REGRESAR</a>
            </div>
            <div class="col-sm-6 col-xl-5">
                <button type="button" class="btn btn-primary btn-block" id="btn-add">AGREGAR</button>
            </div>
        </div>
    </div>
    <hr class="pearator-line"/>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="equipos-table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">ID</th>
                    <th class="text-center">Descripción</th>
                    <th class="text-center">Potencia</th>
                     <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
        </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
    </script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/jsEditTableButtons.js") %>
    <%: Scripts.Render("~/js/jsGestionEquiposProyecto.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
</asp:Content>
