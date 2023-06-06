<%@ Page Title="" Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="frmRespaldosPresupuestarios.aspx.cs" Inherits="Covialgt.Respaldos.frmRespaldosPresupuestarios" %>



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

        textarea#w3review{
        resize: none;
        }
        .checkexcel {
             transform: scale(1.5);
        }

        .modalRespaldo {
            max-width:1160px;
        }


    </style>

    <h1 class="mb-0">Respaldos presupuestarias</h1>
    <hr class="thick" />
   


 <ul class="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
    <li class="nav-item tablapartidas">
      <a class="nav-link" id="carga-excel" data-toggle="tab" href="#excel" role="tab" aria-controls="profile" aria-selected="false">Respaldos presupuestarios</a>
    </li>
    <li class="nav-item tablapartidas">
      <a class="nav-link" id="carga-mantenimiento" data-toggle="tab" href="#mantenimiento" role="tab" aria-controls="profile" aria-selected="false">Crear respaldo</a>
    </li>
 </ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane" id="excel" role="tabpanel" aria-labelledby="carga-excel">
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
                <label for="desde">Municipio (UBG ubicación):</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
        <div class="col-md-3 col-lg-1">
         <div class="text-center">
          <label for="desde">Total  Saldos</label>
          </div>
         <div class="text-center">
            <button type="button" id="btnImprimir" class="btn btn-primary ">
              <i class="fas fa-calculator fa-2x"></i>

            </button>
          </div>
        </div>
        <div class="col-md-4 col-lg-1">
         <div class="text-center">
          <label for="desde">Impresión General</label>
          </div>
          <div class="text-center">
            <button type="button" id="btnImprimir" class="btn btn-light">
              <i class="fas fa-print fa-2x"></i>
            </button>
          </div>
        </div>

      </div>

       <div class="row d-flex justify-content-begin mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Proyecto:</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Departamento:</label>
                <select class="form-control" id="cmbProyecto"></select>
            </div>
        </div>  
           <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Tipo de respaldo:</label>
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
                    <th>Código Respaldo</th>
                    <th>SUPERVISORA</th>
                    <th>DEPARTAMENTO</th>
                    <th>MUNICIPIO</th>
                    <th>UBG</th>
                    <th>MONTO</th>
                    <th>LIMPIEZA2</th>
                    <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div> 
  </div>
 <div class="tab-pane" id="mantenimiento" role="tabpanel" aria-labelledby="carga-mantenimiento">
     
           <div class="d-flex justify-content-center">
            <div class="form-group">
                <label for="desde">Respaldo Presupuestario</label>
                    <div class="input-group">
                      <div class="col-md-4 col-lg-3">
                        <div class="form-group">
                            <label for="desde">Tipo de Respaldo</label>
                           <select class="form-control" id="cmbProyecto"></select>
                        </div>
                    </div>
                    </div>
                <div class="d-flex justify-content-begin mx-3">
                    <div class="form-group mt-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                            </div>
                            <div class="custom-file" id="customFile">
                                <button type="button" id="btnCargarPartidas" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalMantenimiento">
                                    <i class="fas fa-file-upload  fa-2x mx-1"></i>   
                                    Cargar Partidas Presupuestarias  
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="d-flex justify-content-begin mx-3">
                    <div class="form-group mt-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                            </div>
                            <div class="custom-file" id="customFile">
                                <button type="button" id="btnGenerarEstimacion" class="btn btn-primary btn-form">
                                  <i class="fas fa-save fa-2x mx-1"></i>
                                  Crear Respaldo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mt-4" id="partidas-pres">
                            <thead>
                            <tr>
                            <th class="spacer"></th>
                            <th>Seleccionar</th>
                            <th>PARTIDA PRESUPUESTARIA</th>
                            <th>RUTA</th>
                            <th>PROYECTO</th>
                            <th>MONTO</th>
                            <th>CDP</th>
                            <th>FECHA</th>
                            <th>DEPARTAMENTO</th>
                            <th>MUNICIPIO</th>
                             <th>Eliminar Partida</th>
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
    
<!-- Modal cargar partidas presupuestarias -->
<div class="modal fade" id="exampleModalMantenimiento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modalRespaldo" role="document">
    <div class="modal-content">
      <div class="modal-header">
              <h5 class="mb-0" class="modal-title" id="exampleModalLabel">Partidas Presupuestarias de tipo MANTENIMIENTO</h5>
    <hr class="thick" />
 
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          
                <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Plan</label>
                        <select class="form-control" id="cmbProyecto"></select>
                    </div>
                </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Programa</label>
                        <select class="form-control" id="cmbProyecto"></select>
                    </div>
                </div>  
              </div> 
              <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Departamento</label>
                        <select class="form-control" id="cmbProyecto"></select>
                    </div>
                </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Municipio</label>
                        <select class="form-control" id="cmbProyecto"></select>
                    </div>
                </div>  
              </div> 

                <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Tipo partidas</label>
                        <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                    </div>
                </div>
              </div> 
                     <div class="input-group d-flex justify-content-begin  mt-3">
                        <div class="form-check">
                          <input class="form-check-input checkexcel" type="checkbox" value="" id="flexCheckDefault">
                          <label class="form-check-label font-weight-bold" for="flexCheckDefault">
                            Seleccionar todo
                          </label>
                        </div>
                        <div class="col-md-4 col-lg-3" id="customFile">
                                <button type="button" id="btnGenerarEstimacion" class="btn btn-primary btn-form">
                                  Agregar Partidas
                                </button>
                            </div>
                    </div>

        <div class="col-12 py-2">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="partidas-pres">
                <thead>
                    <tr>
                    <th class="spacer"></th>
                    <th>Partida Código</th>
                    <th>RUTA</th>
                    <th>PROYECTO</th>
                    <th>MONTO</th>
                    <th>CDP</th>
                    <th>FECHA</th>
                    <th>DEPARTAMENTO</th>
                    <th>MUNICIPIO</th>
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

    <!-- Modal partida individual -->
<div class="modal fade" id="exampleModalIndividual" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modalRespaldo" role="document">
    <div class="modal-content">
      <div class="modal-header">
              <h5 class="mb-0" class="modal-title" id="exampleModalLabel">Partidas Presupuestarias de tipo MANTENIMIENTO</h5>
    <hr class="thick" />
 
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          
                <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Respaldo</label>
                        <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                    </div>
                </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Plan</label>
                        <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                    </div>
                </div>  
              </div> 
              <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Proyecto</label>
                       <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                    </div>
                </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">Monto total partidas</label>
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
                    <th>Seleccionar</th>
                    <th>PARTIDA PRESUPUESTARIA</th>
                    <th>RUTA</th>
                    <th>PROYECTO</th>
                    <th>MONTO</th>
                    <th>CDP</th>
                    <th>FECHA</th>
                    <th>DEPARTAMENTO</th>
                    <th>MUNICIPIO</th>
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

    <!--<script src="../js/jsEstimacionReprogramacion.js"></script>-->
</asp:Content>
