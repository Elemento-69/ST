<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmPartidasPresupuestarias.aspx.cs" Inherits="Covialgt.Partidas.frmPartidasPresupuestarias" %>




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

    <h1 class="mb-0">Partidas presupuestarias</h1>
    <hr class="thick" />
   


 <ul class="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
    <li class="nav-item tablapartidas">
      <a class="nav-link" id="carga-excel" data-toggle="tab" href="#excel" role="tab" aria-controls="profile" aria-selected="false">Carga con Excel</a>
    </li>
    <li class="nav-item tablapartidas">
      <a class="nav-link" id="carga-mantenimiento" data-toggle="tab" href="#mantenimiento" role="tab" aria-controls="profile" aria-selected="false">Carga individual Mantenimineto</a>
    </li>
    <li class="nav-item tablapartidas">
      <a class="nav-link" id="carga-compras" data-toggle="tab" href="#compras" role="tab" aria-controls="profile" aria-selected="false">Carga individual Compras</a>
    </li>
 </ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane" id="excel" role="tabpanel" aria-labelledby="carga-excel">
           <div class="d-flex justify-content-center">
            <div class="form-group">
                <label for="desde">Subir formato de partidas Presupuestarias</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        
                      </div>
                        <div class="custom-file" id="customFile">
                            <input type="file" class="custom-file-input" id="exampleInputFile" aria-describedby="fileHelp">
                            <label class="custom-file-label" for="exampleInputFile">
                                Seleccionar Archivo
                            </label>
                        </div>
                    </div>

                    <div class="input-group d-flex justify-content-center  mt-3">
                        <div class="form-check">
                          <input class="form-check-input checkexcel" type="checkbox" value="" id="flexCheckDefault">
                          <label class="form-check-label font-weight-bold" for="flexCheckDefault">
                            Mantenimiento
                          </label>
                        </div>
                        <div class="form-check mx-3">
                          <input class="form-check-input checkexcel" type="checkbox" value="" id="flexCheckChecked" checked>
                          <label class="form-check-label font-weight-bold" for="flexCheckChecked">
                            Compras
                          </label>
                        </div>
                    </div>


                <div class="d-flex justify-content-center">
                    <div class="form-group mt-4">
                        <div class="input-group">
                            <div class="input-group-prepend">
                            </div>
                            <div class="custom-file" id="customFile">
                                <button type="button" id="btnGenerarEstimacion" class="btn btn-primary btn-form">
                                  <span>
                                    <img class="mx-1" src="../Images/upload-image.svg" width="20" height="20" alt="Inicio">
                                  </span>
                                  Cargar Datos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
 <div class="tab-pane" id="mantenimiento" role="tabpanel" aria-labelledby="carga-mantenimiento">
      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Ruta</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Descripción Partida</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <textarea id="w3review" name="w3review" rows="4" cols="50" class="form-control">
                    </textarea>
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Longitud KM</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Proyecto</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="plan">Plan proyecto</label>
                <div class="input-group date" id="" data-target-input="nearest">
                    <input id="plan" type="text" name="plan" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Proyecto-Plan</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="proy-plan" type="text" name="proy-plan" autocomplete="off" class="form-control" disabled>
                </div>
            </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="monto">Proyecto Limpieza</label>
                <div class="input-group date" id="monto-dp" data-target-input="nearest">
                    <input id="monto" type="text" name="monto" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Plan Limpieza</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Limpieza-Plan</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control" disabled>
                </div>
            </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Supervisora</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                     <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Plan Supervisora</label>
                  <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Supervisora-Plan</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control" disabled>
                </div>
            </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Monto Proyecto</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Monto Limpieza</label>
                  <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Tipo Proyecto</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">CDP Proyecto</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">CDP Limpieza</label>
                  <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">CDP Supervisión</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                </div>
            </div>
        </div>
      </div>

     
      <div class="row d-flex justify-content-center mt-2">
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">Departamento - Municipio</label>
                <button type="button" id="btnCargaIndividual" class="btn btn-primary btn-form" data-toggle="modal" data-target="#exampleModalIndividual">
                   <i class="fas fa-file"></i><i class="fas fa-arrow-right"></i>                   
                </button>
            </div>
        </div>
          <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="desde">UBG</label>
                  <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control" disabled>
                </div>
            </div>
        </div>
          
      </div>

      <div class="d-flex justify-content-center">
            <div class="form-group mt-4">
                
                    <div class="input-group">
                      <div class="input-group-prepend">
                        
                      </div>
                        <div class="custom-file" id="customFile">
                            <button type="button" id="btnCargaIndividual" class="btn btn-primary btn-form">
                                  <span>
                                    <img class="mx-1" src="../Images/upload-image.svg" width="20" height="20" alt="Inicio">
                                  </span>
                                  Cargar Partida
                            </button>
                        </div>
                    </div>
            </div>
        </div>
  </div>

    <!--tab carga individual compras-->
  <div class="tab-pane" id="compras" role="tabpanel" aria-labelledby="carga-compras">
    <div class="row d-flex justify-content-center mt-2">
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Subproducto</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Nombre CC</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">

            <select id="cmbAnio" class="form-control"></select>
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Codigo CC</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control" disabled>
              </div>
          </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-2">
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Renglón</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Descripcion</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <textarea id="w3review" name="w3review" rows="4" cols="50" class="form-control" >
                  </textarea>
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">No. Pedido</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
              </div>
          </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-2">
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Fecha Pedido</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                                      <input id="desde" type="text" data-target="#desde-dp" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Descripción Gasto</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <textarea id="w3review" name="w3review" rows="4" cols="50" class="form-control">
                  </textarea>
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">INSUMO</label>
                 <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                     <input type="text" autocomplet="off" class="form-control"/>
                 </div>
          </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-2">
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Monto Asignado</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <input type="text" autocomplete="off" class="form-control" />
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Monto Modificado</label>
                <div class="input-group date"  data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Monto Vigente</label>
              <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                  <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
              </div>
          </div>
      </div>
    </div>
          <div class="row d-flex justify-content-center mt-2">
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="montonumeros">Monto</label>
              <div class="input-group date"  data-target-input="nearest">
                  <input type="text" id="montonumeros" name="montonumeros" autocomplete="off" class="form-control" />
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="montoletra">Monto en letras</label>
                <div class="input-group date"  data-target-input="nearest">
                    <input id="montoletra" type="text" name="montoletra" autocomplete="off" class="form-control" placeholder="Mil quetzales">
              </div>
          </div>
      </div>
        <div class="col-md-4 col-lg-3">
          <div class="form-group">
              <label for="desde">Decimales Fracción</label>
              <div class="input-group date" data-target-input="nearest">
                  <input id="fracc" type="text" name="fracc" autocomplete="off" class="form-control" placeholder="20/100">
              </div>
          </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
          <div class="form-group mt-4">
                  <div class="input-group">
                    <div class="input-group-prepend">
                    </div>
                      <div class="custom-file" id="customFile">
                          <button type="button" id="btnCargaIndividualCompra" class="btn btn-primary btn-form">
                                  <span>
                                    <img class="mx-1" src="../Images/upload-image.svg" width="20" height="20" alt="Inicio">
                                  </span>
                                  Cargar Partida
                          </button>
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

  
 
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      
        </button>
      </div>
      <div class="modal-body">
          
                <div class="row d-flex justify-content-begin mt-0">
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="Departamento">Departamento</label>
                        <select class="form-control" id="cmbDepartamento" name="Departamento" required>
                            <option value="0">Todos</option>
                        </select>
                    </div>
                </div>
                  <div class="col-md-4 col-lg-3">
                    <div class="form-group">
                        <label for="desde">UBG</label>
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

    </script>

    <script src="../js/jsPartidasPresupuestarias.js"></script>
</asp:Content>

