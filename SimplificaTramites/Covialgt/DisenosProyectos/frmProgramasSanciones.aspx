<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmProgramasSanciones.aspx.cs" Inherits="Covialgt.DisenosProyectos.frmProgramasSanciones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Programas Sanciones</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
            <h4>Programas Sanciones</h4> 
         <div class="col-xs-3 col-md-2 col-lg-2">
            <div class="form-group">
                
                <a type="button" id="btnRegresarConsultaProgramasSanciones" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                
        </div>
        </div>
    </div>        
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="programasanciones-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Codigo</th>
                        <th class="text-center">Codigo Sancion</th>
                        <th class="text-center">Actividad</th>
                        <th class="text-center">Responsabilidad</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
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
    <%: Scripts.Render("~/js/DisenosProyectos/jsProgramasSanciones.js") %>
</asp:Content>