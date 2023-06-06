<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmActasPorFirmarMantenimiento.aspx.cs" Inherits="Covialgt.ActasPorFirmar.frmActasPorFirmar" %>



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

    <h1 class="mb-0">Actas por Firmar Mantenimiento</h1>
    <hr class="thick" />
   
        <div class="row d-flex justify-content-begin mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Plan:</label>
               <select class="form-control" id="cmbProyecto"></select>
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
                <label for="desde">Fecha de inicio</label>
               <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Fecha final</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
      </div>

   
    
                            

    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="partidas-pres">
                <thead>
                    <tr>
                    <th class="spacer"></th>
                    <th>Respaldo Código</th>
                    <th>No. Partidas</th>
                    <th>Proyecto</th>
                    <th>Fecha</th>
                    <th>Doc. Firmado</th>
                    <th>Firmar</th>
                    <th>Cancelar Firma</th>
                    <th>Acciones</th>
                    <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div> 

                             <div class="custom-file" id="customFile">
                                <button type="button" id="btnCargarPartidas" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalIndividual">                                   
                                    Boton prueba modal documentos
                                </button>
                            </div>

                            <div class="custom-file" id="customFile">
                                <button type="button" id="btnCargarPartidas" class="btn btn-primary" data-toggle="modal" data-target="#modalDenegar">                                   
                                    Modal denegar
                                </button>
                            </div>

     <!-- Modal partidas prespuestarias b-001 -->
<div class="modal fade" id="exampleModalIndividual" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modalRespaldo" role="document">
    <div class="modal-content">
      <div class="modal-header">
              <h5 class="mb-0" class="modal-title" id="exampleModalLabel">Partidas Presupuestarias B-001</h5>
    <hr class="thick" />
 
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          
                <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Solicitud</label>
                        <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                    </div>
                </div>
              </div> 
              

        <div class="col-12 py-2">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="partidas-pres">
                <thead>
                    <tr>
                    <th class="spacer"></th>
                    <th>Documento</th>
                    <th>Fecha Subida</th>
                    <th>Ver documento</th>
                    <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div> 
      </div>

    </div>
  </div>
</div>


         <!-- Modal denegar-->
<div class="modal fade" id="modalDenegar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modalRespaldo" role="document">
    <div class="modal-content">

      <div class="modal-body">
          <h5>Denegar la solicitud de firma del respaldo presupuestario (código) del proyecto (código) del (plan) con (No. de partidas) de tipo (tipo de respaldo)</h5>
                <div class="row d-flex justify-content-center mt-0">
                  <div class="col-md-4 col-lg-12">
                    <div class="form-group">
                        <label for="desde">Motivos para denegar</label>
                        <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                    </div>
                </div>
              </div> 
              
          <div class="input-group d-flex justify-content-center  mt-3">
                        
                        <div class="col-md-4 col-lg-6" id="customFile">
                            <button type="button" id="solicitar" class="btn btn-primary btn-form">
                                  Solicitar
                           </button>
                        </div>
                        <div class="col-md-4 col-lg-6" id="customFile">
                                <button type="button" data-dismiss="modal" id="cancelar" class="btn btn-danger btn-form" style="text-transform: none; font-size: 13px">
                                  Cancelar solicitud
                                </button>
                        </div>
                    </div>

      </div>

    </div>
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
    <!--<script src="../js/jsEstimacionReprogramacion.js"></script>-->
</asp:Content>