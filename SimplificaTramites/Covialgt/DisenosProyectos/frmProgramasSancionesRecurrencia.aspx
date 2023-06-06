<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmProgramasSancionesRecurrencia.aspx.cs" Inherits="Covialgt.DisenosProyectos.frmProgramasSancionesRecurrencia" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Programas Sanciones Recurrencias</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
            <h4>Programas Sanciones Recurrencias</h4> 
        <div class="col-xs-4 col-md-4 col-lg-4">
            <div class="form-group">
                <a data-toggle="modal" href="#exampleModalRecurrenciaSanciones" class="btn btn-primary">AGREGAR</a>
                
        </div>
        </div>
        <div class="col-xs-3 col-md-2 col-lg-2">
            <div class="form-group">
                
                <a type="button" id="btnRegresarConsultaProgramasSancionesRecurrencia" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                
        </div>
        </div>
    </div>        
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="programasancionesrecurrencia-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Correlativo</th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Codigo</th>
                        <th class="text-center">Codigo Sancion</th>
                        <th class="text-center">Descripcion</th>
                        <th class="text-center">Penalidad</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>  
           <!-- Start Modal Agregar Programas Sanciones Recurrencias -->
    <div class="modal fade" id="exampleModalRecurrenciaSanciones" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">MANTENIMIENTO DE PROGRAMAS SANCIONES RECURRENCIAS</h5>
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
                                                    <label for="programasanciones-correlativo">Correlativo</label>
                                                    <input type="text" id="programasanciones-correlativo" class="form-control w-50" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="programasanciones-anio">Año</label>
                                                    <select id="programasanciones-anio" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="programasanciones-programa">Programa C&oacute;digo</label>
                                                    <select id="programasanciones-programa" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="programasanciones-sancioncodigo">Sanción C&oacute;digo</label>
                                                    <select id="programasanciones-sancioncodigo" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="programasanciones-descripcion">Descripci&oacute;n</label>
                                                     <textarea class="form-control" id="programasanciones-descripcion" rows="3"></textarea>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="programasanciones-penalidad">Penalidad</label>
                                                     <textarea class="form-control" id="programasanciones-penalidad" rows="3"></textarea>
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardarRecurrencia" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
    <!-- End Modal Agregar Programas Sanciones Recurrencias -->
               <!-- Start Modal Actualizar Programas Sanciones Recurrencias -->
    <div class="modal fade" id="exampleModalRecurrenciaSancionesAct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelAct" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabelAct">ACTUALIZAR DE PROGRAMAS SANCIONES RECURRENCIAS</h5>
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
                                                    <label for="programasanciones-correlativoAct">Correlativo</label>
                                                    <input type="text" id="programasanciones-correlativoAct" class="form-control w-50" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="programasanciones-anioAct">Año</label>
                                                    <select id="programasanciones-anioAct" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="programasanciones-programaAct">Programa C&oacute;digo</label>
                                                    <select id="programasanciones-programaAct" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="programasanciones-sancioncodigoAct">Sanción C&oacute;digo</label>
                                                    <select id="programasanciones-sancioncodigoAct" class="form-control w-75"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="programasanciones-descripcionAct">Descripci&oacute;n</label>
                                                     <textarea class="form-control" id="programasanciones-descripcionAct" rows="3"></textarea>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="programasanciones-penalidadAct">Penalidad</label>
                                                     <textarea class="form-control" id="programasanciones-penalidadAct" rows="3"></textarea>
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnActualizarRecurrencia" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
    <!-- End Modal Actualizar Programas Sanciones Recurrencias -->
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
    <%: Scripts.Render("~/js/DisenosProyectos/jsProgramasSancionesRecurrencia.js") %>
</asp:Content>
