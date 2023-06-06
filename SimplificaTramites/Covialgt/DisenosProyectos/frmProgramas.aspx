<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmProgramas.aspx.cs" Inherits="Covialgt.DisenosProyectos.frmProgramas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Programas</h1>
    <hr class="thick" />
    
            <h4>Gestión de Programas</h4>
    <div class="row justify-content-between">
        <div class="col-xs-12 col-md-6 col-lg-6">
            <div class="form-group col-md-12 col-lg-12">
                <label for="PlanAnual">Plan Anual</label>
                <select id="PlanAnualList" class="form-control"></select>
            </div>
        </div>
         <div class="col-xs-12 col-md-2 col-lg-2 mt-4">
                <button type="button" id="btnBuscar"  class="btn btn-primary">BUSCAR</button>
        </div>
        <div class="col-xs-12 col-md-2 col-lg-2 mt-4">
                <a type="button" data-toggle="modal" href="#exampleModal" class="btn btn-primary">AGREGAR</a>       
        </div>
        <div class="col-xs-12 col-md-2 col-lg-2 mt-4">
            <div class="form-group">
                <a type="button" id="btnRegresarConsultaPlanes" class="btn btn-outline-secondary btn-block">REGRESAR</a>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="programas-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Año</th>
                        <th class="text-center">C&oacute;digo</th>
                        <th class="text-center">Programa</th>
                        <th class="text-center">Presupuesto</th>
                        <th class="text-center">Alcance</th>
                        <th class="text-center">Unidad</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>  
        <!-- Start Modal Agregar Planes Anuales -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">AGREGAR PROGRAMA</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                            <div class="col-xl-12 p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-body border-left h-100 p-4">
                                        <div class="d-flex align-items-center h-100">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h3 class="font-weight-bolder text-center">Datos</h3>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Programa C&oacute;digo</label>
                                                    <input type="text" id="programa-codigo" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Programa Nombre</label>
                                                    <input type="text" id="programa-nombre" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Plan Anual</label>
                                                    <select id="programa-anio" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Tipos Contratos</label>
                                                    <select id="programa-contratos" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Montos Presupuesto</label>
                                                    <input type="text" id="programa-presupuesto" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Unidades</label>
                                                    <input type="text" id="programa-unidades" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Cantidad</label>
                                                    <input type="text" id="programa-cantidad" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardar" class="btn btn-primary px-5 btn-sm">Guardar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
    <!-- End Modal Agregar Planes ANuales -->
            <!-- Start Modal Actualizar Planes Anuales -->
    <div class="modal fade" id="exampleModalActualizar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabelActualizar">ACTUALIZAR PROGRAMAS</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                            <div class="col-xl-12 p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-body border-left h-100 p-4">
                                        <div class="d-flex align-items-center h-100">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h3 class="font-weight-bolder text-center">Datos</h3>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Programa C&oacute;digo</label>
                                                    <input type="text" id="programa-codigoAct" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Programa Nombre</label>
                                                    <input type="text" id="programa-nombreAct" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Plan Anual</label>
                                                    <select id="programa-anioAct" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Tipos Contratos</label>
                                                    <select id="programa-contratosAct" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Montos Presupuesto</label>
                                                    <input type="text" id="programa-presupuestoAct" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Unidades</label>
                                                    <input type="text" id="programa-unidadesAct" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Cantidad</label>
                                                    <input type="text" id="programa-cantidadAct" class="form-control w-50" />
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardarAct" class="btn btn-primary px-5 btn-sm">Actualizar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
    <!-- End Modal Actualizar Planes ANuales -->
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
    <%: Scripts.Render("~/js/DisenosProyectos/jsProgramas.js") %>
</asp:Content>