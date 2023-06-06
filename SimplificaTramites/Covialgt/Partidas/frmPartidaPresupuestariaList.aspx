<%@ Page Title="" Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="frmPartidaPresupuestariaList.aspx.cs" Inherits="Covialgt.Partidas.frmPartidaPresupuestaria" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Scripts/jquery-3.5.1.min.js"></script>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>

    <!-- Scripts -->



    <style>
        td.details-control {
            background: url('../Images/Icons/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        .custom-file-input ~ .custom-file-label::after {
            content: "Buscar";
        }

        tr.shown td.details-control {
            background: url('../Images/Icons/details_close.png') no-repeat center center;
        }
        .nav-tabs {
  
            }
        .tab-content {
            border: 3px solid #46617A;
            border-width: 2px; /* Removes the top border */
    
        }
        .nav-item.tablapartidas {
            border-top: 3px solid #46617A;
            border-right:3px solid #46617A;
                border-left:3px solid #46617A;
            border-width: 2px; /* Removes the top border */
        }

        .checkexcel {
             transform: scale(1.5);
        }


    </style>

    <h1 class="mb-0">Partidas presupuestarias</h1>
    <hr class="thick" />
   
        <div class="row d-flex justify-content-begin mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                      
            <label for="cmbAnio">Plan Anual</label>
            <select id="cmbAnio" class="form-control"></select>
     
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Programa:</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Proyecto:</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
      </div>

       <div class="row d-flex justify-content-begin mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Departamento:</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Municipio:</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>  
      </div>
    
                    <div class="input-group d-flex justify-content-begin  mt-2">
                        <div class="form-check">
                          <input class="form-check-input checkexcel" type="checkbox" value="" id="flexCheckDefault">
                          <label class="form-check-label font-weight-bold" for="flexCheckDefault">
                            Departamento
                          </label>
                        </div>
                        <div class="form-check mx-3">
                          <input class="form-check-input checkexcel" type="checkbox" value="" id="flexCheckChecked">
                          <label class="form-check-label font-weight-bold" for="flexCheckChecked">
                            Programa
                          </label>
                        </div>
                        <div class="form-check mx-3">
                          <input class="form-check-input checkexcel" type="checkbox" value="" id="flexCheckChecked">
                          <label class="form-check-label font-weight-bold" for="flexCheckChecked">
                            Plan
                          </label>
                        </div>
                    </div>
    
                            

    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="partidas-pres">
                <thead>
                    <tr>
                    <th class="spacer"></th>
                    <th>Ruta</th>
                    <th>Descripcion</th>
                    <th>Proyecto</th>
                    <th>Partida Presupuestaria</th>
                    <th>CDP</th>
                    <th>Fecha Creación</th>
                    <th>Accion</th>
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

    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        //$(document).ready(function () {
        //    loadDefaultComponents();
        //});

        rolConsultas = '<%= ViewState["rolConsultas"] %>'

    </script>
   <script src="../js/jsPartidasPresupuestarias.js"></script>
</asp:Content>