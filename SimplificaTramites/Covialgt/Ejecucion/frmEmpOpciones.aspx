<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEmpOpciones.aspx.cs" Inherits="Covialgt.Ejecucion.frmEmpOpciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
  <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
      <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Registro de preferencias</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
      
            <h4>Registro de Preferencias de la Empresa: </h4>
       
            <h6>NOMBRE: <label id="NomEmpre" name="NomEmpre"></label></h6>
       
            <h6>NIT: <label id="NitEmpre" name="NitEmpre"></label></h6>
        <div class="form-group">
                
                <a type="button" id="btnRegresarMaestroEmpresa" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                
        </div>
    </div>
     <div class="row justify-content-between">
         
        <div class="form-group col-md-5 col-lg-5">
            <label for="PlanAnual">Año:</label>
            <select id="PlanAnualList" class="form-control"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 offset-lg-1">
            <label for="cmbOpcion">Opción:</label>
            <select id="cmbOpcion" class="form-control"></select>
        </div>
        <div class="form-group col-md-3 col-lg-3">
            <label for="cmbPrioridad">Prioridad:</label>
                <select id="cmbPrioridad" class="form-control">
                    <option selected="selected" value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
        </div>
        <div class="col-xs-6 col-md-5 col-lg-5">
            <div class="form-group">
            <button type="button" class="btn btn-primary btn-form" id="btnGuardar">GUARDAR</button>
        </div>
        </div>
    </div>
          
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                         <th class="text-center"></th>
                        <th>Prioridad</th>
                        <th>Opci&oacute;n</th>
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
        base_url = '<%= ViewState["baseURL"] %>'
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        usuario = "<%= Session["usuario"] %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/jsRegistroPreferenciasE.js") %>
</asp:Content>