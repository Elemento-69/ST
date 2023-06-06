<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmMaestroDeEmpresas.aspx.cs" Inherits="Covialgt.Empresas.frmMaestroDeEmpresas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Empresas</h1>
    <hr class="thick" />
    <h2>Gestión de Empresas</h2>
    <div class="row">
       <!-- <div class="col-md-2">
            <strong>
                <!--<span class="form-control" style="border: none">NIT:</span>
                <span class="form-control" style="border: none">Nombre:</span>
                <span class="form-control" style="border: none">Representante:</span>
            </strong>
        </div>-->
        <div class="col-md-1">
            <input type="text" class="form-control" id="txtNit" name="txtNit" style="display: none">
            <input type="text" class="form-control" id="txtNombre" name="txtNombre" style="display: none">
            <input type="text" class="form-control" id="txtRepresentante" name="txtRepresentante" style="display: none">
        </div>
         <div class="col-md-2">
            <strong>  <span class="form-control" style="border: none">Estado Precalificado:</span>
                <br />
            <span class="form-control" style="border: none">Recepción Número:</span>
                <br />
            <span class="form-control flex-wrap" style="border: none">Grupo:</span>
            </strong>
        </div>
        <div class="col-md-3">
            <div class="checkbox">
                <label>
                    <input type="radio" name="precalificado" id="precalificado-todos" value="2" checked class="text-muted">Todos
                    <input type="radio" name="precalificado" id="precalificado-true" value="1" class="text-muted">Activo
                    <input type="radio" name="precalificado" id="precalificado-false" value="0" class="text-muted">Inanctivo
                </label>
            </div>
            <br />
            <input type="text" class="form-control" id="txtNumeroPrecalificado" name="txtNumeroPrecalificado" >
            <br />
            <input type="text" class="form-control" id="txtGrupo"               name ="txtGrupo" >
            </div>
        <div class="col-md-1">
            <strong>  <span class="form-control" style="border: none">Proyectos:</span>
                 <span class="form-control" style="border: none"></span>
            </strong>
        </div>
            <div class="col-md-3">
                <select id="cmbproyectosempresa" class="form-control"></select>
                  <div>
                      <br />
            <div class="form-group">
                <a data-toggle="modal" href="#ModalAgregEmpresa" class="btn btn-primary">AGREGAR</a>
        </div>
        </div>
            </div>
      
          
            <div class="col-md-2">
                        <button class="btn btn-primary btn-sm" type="button" id="btnIrDashboard" style="height: 38px">Ir
                            <!--<img src="~/Images/search.svg" width="20" height="20" alt="Ir" runat="server" />-->
                        </button>
                    </div>
        </div>
   <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="maestrodeempresas-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center" style="min-width: 160px"></th>
                        <th class="text-center">NIT</th>
                        <th class="text-center">Nombre</th>
                        <th class="text-center">Representante</th>
                        <th class="text-center"style="min-width: 160px">Dirección</th>
                        <th class="text-center">Teléfonos</th>
                        <th class="text-center">E-Mail</th>
                        <th class="text-center">Recepción Número</th>
                        <th class="text-center">Fecha Recepción</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div> 
            <!-- Start Modal AgregarEmpresas -->
    <div class="modal fade" id="ModalAgregEmpresa" tabindex="-1" role="dialog" aria-labelledby="ModalAgregEmpresa" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">AGREGAR EMPRESA</h5>
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
                                                <div class="col-6 py-1">
                                                    <label for="tipoempresa">Tipo de Empresa</label>
                                                    <select id="tipoempresa" class="form-control">
                                                        <option value="S">Supervisora</option>
                                                        <option value="E">Ejecutora</option>
                                                    </select>
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="empresaosociedad">Empresa o Sociedad</label>
                                                    <input type="text" id="empresaosociedad" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="representante">Representante</label>
                                                    <input type="text" id="representante" class="form-control" />
                                                </div>
                                               
                                                <div class="col-6 py-1">
                                                    <label for="rgistro">DPI</label>
                                                    <input type="text" id="registro" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="departamento">Departamento</label>
                                                    <select id="departamento" class="form-control"></select>
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="Dirección">Dirección</label>
                                                    <input type="text" id="direccion" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="municipio">Municipio</label>
                                                    <select id="municipio" class="form-control"></select>
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="email">Correo Electrónico</label>
                                                    <input type="text" id="email" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="nit">NIT</label>
                                                    <input type="text" id="nit" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="telefono1">Teléfono 1</label>
                                                    <input type="text" id="telefono1" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="telefono2">Teléfono 2</label>
                                                    <input type="text" id="telefono2" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="nurgprecalificado">No. Precalificado</label>
                                                    <input type="text" id="nurgprecalificado" class="form-control" />
                                                </div>
                                                <div class="col-3 py-5">
                                                    <div class="form-check">
                                                      <input class="form-check-input" type="checkbox" id="flexCheckDefault">
                                                      <label class="form-check-label" for="flexCheckDefault">
                                                        Precalificado Activo
                                                      </label>
                                                    </div>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="observaciones">Observaciones</label>
                                                    <textarea class="form-control" id="observaciones" rows="3"></textarea>
                                                </div>
                                              
                                                <div class="col-6 py-1">
                                                     <hr size="50" />
                                                    <label for="ingresponsable">Ingeniero Responsable</label>
                                                    <input type="text" id="ingresponsable" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <hr size="50" />
                                                    <label for="numcolegiado">No. Colegiado</label>
                                                    <input type="text" id="numcolegiado" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="numrecepcion">No. de Recepción</label>
                                                    <input type="text" id="numrecepcion" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="fecha">Fecha</label>
                                                    <input type="date" id="fecha" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="fecha">Grupo</label>
                                                    <input type="text" id="grupo" class="form-control" />
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardarEmpresa" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
    <!-- End Modal Agregar Empresas -->
                <!-- Start Modal Actualizar Empresas -->
    <div class="modal fade" id="ModalActualizarEmpresa" tabindex="-1" role="dialog" aria-labelledby="ModalActualizarEmpresa" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabels">ACTUALIZAR EMPRESA</h5>
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
                                                <div class="col-6 py-1">
                                                    <label for="tipoempresa-Act">Tipo de Empresa</label>
                                                    <select id="tipoempresa-Act" class="form-control">
                                                        <option value="S">Supervisora</option>
                                                        <option value="E">Ejecutora</option>
                                                    </select>
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="empresaosociedad-Act">Empresa o Sociedad</label>
                                                    <input type="text" id="empresaosociedad-Act" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="representante-Act">Representante</label>
                                                    <input type="text" id="representante-Act" class="form-control" />
                                                </div>                                               
                                                <div class="col-6 py-1">
                                                    <label for="rgistro-Act">DPI</label>
                                                    <input type="text" id="registro-Act" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="departamento-Act">Departamento</label>
                                                    <select id="departamento-Act" class="form-control"></select>
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="Dirección-Act">Dirección</label>
                                                    <input type="text" id="direccion-Act" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="municipio-Act">Municipio</label>
                                                    <select id="municipio-Act" class="form-control"></select>
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="email-Act">Correo Electrónico</label>
                                                    <input type="text" id="email-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="nit-Act">NIT</label>
                                                    <input type="text" id="nit-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="telefono1-Act">Teléfono 1</label>
                                                    <input type="text" id="telefono1-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="telefono2-Act">Teléfono 2</label>fcedula
                                                    <input type="text" id="telefono2-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="nurgprecalificado-Act">No. Precalificado</label>
                                                    <input type="text" id="nurgprecalificado-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-5">
                                                    <div class="form-check">
                                                      <input class="form-check-input" type="checkbox" id="flexCheckDefault-Act">
                                                      <label class="form-check-label" for="flexCheckDefault">
                                                        Precalificado Activo
                                                      </label>
                                                    </div>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="observaciones-Act">Observaciones</label>
                                                    <textarea class="form-control" id="observaciones-Act" rows="3"></textarea>
                                                </div>
                                              
                                                <div class="col-6 py-1">
                                                     <hr size="50" />
                                                    <label for="ingresponsable-Act">Ingeniero Responsable</label>
                                                    <input type="text" id="ingresponsable-Act" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <hr size="50" />
                                                    <label for="numcolegiado-Act">No. Colegiado</label>
                                                    <input type="text" id="numcolegiado-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="numrecepcion-Act">No. de Recepción</label>
                                                    <input type="text" id="numrecepcion-Act" class="form-control" />
                                                </div>
                                                <div class="col-3 py-1">
                                                    <label for="fecha-Act">Fecha</label>
                                                    <input type="date" id="fecha-Act" class="form-control" />
                                                </div>
                                                <div class="col-6 py-1">
                                                    <label for="fecha-Act">Grupo</label>
                                                    <input type="text" id="grupo-Act" class="form-control" />
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnActualizarEmpresa" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
    <!-- End Modal Actualizar Empresas -->
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
    <%: Scripts.Render("~/js/Empresas/jsMaestroDeEmpresas.js") %>
</asp:Content>
