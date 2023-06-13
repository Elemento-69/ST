<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmTramosViales.aspx.cs" Inherits="Covialgt.RedVial.frmTramosViales" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Tramos Viales</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
            <h4>Gestión de Tramos</h4> 
        <div class="col-xs-4 col-md-4 col-lg-4">
            <div class="form-group">
                <a data-toggle="modal" href="#ModalagregarTramos" class="btn btn-primary">AGREGAR</a>
        </div>
        </div>
        <div class="col-xs-4 col-md-4 col-lg-4">
        <button type="button" id="btnImprimir" class="btn btn-light">
                <i class="fas fa-print fa-2x"></i>
            </button>
       </div>
    </div>    
      <div id="testDiv">
           
    </div>
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="tramosviales-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">ID</th>
                        <th class="text-center">C&oacute;digo</th>
                        <th class="text-center">Descripci&oacute;n</th>
                        <th class="text-center">Ruta</th>
                        <th class="text-center">Superficie</th>
                        <th class="text-center">Departamento</th>
                        <th class="text-center">Longitud</th>
                        <th class="text-center">Activo</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>  
        <!-- Start Modal Agregar Planes Anuales -->
    <div class="modal fade" id="ModalagregarTramos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">AGREGAR TRAMOS</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-md-3">
                                <strong> 
                                    <span class="form-control" style="border: none">Código Tramo:</span>
                                    <br />
                                     <br />
                                    <span class="form-control" style="border: none">Descripción:</span>
                                    <br />
                                    <br />
                                   
                                    <span class="form-control" style="border: none">Ruta:</span>
                                    <br />
                                     <span class="form-control" style="border: none">Logitud (Kms):</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Km. Desde:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Km. Hasta:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Departamento:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Fecha Creación:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Fecha Desactivado:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Superficie:</span>
                                    <br /> 
                                    <br /> 
                                    <span class="form-control" style="border: none">Comentarios:</span>
                                    <br />
                                    <br /> 
                                    <br /> 
                                    <span class="form-control" style="border: none">Año:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Activo:</span>
                                    <br />
                                </strong>
                            </div>
                <div class="col-md-7">
                                <input type="text" class="form-control w-60" id="txtCodigoTramo" name="txtCodigoTramo" >
                                <br />
                                <textarea class="form-control" id="txtDescripcion" rows="3"></textarea>
                                <br />
                                <select class="form-control w-75" id="cmbRuta">
                                    <option value="value"></option>
                                </select>
                                <br />
                                <input type="text" class="form-control w-60" id="txtLongitud" name="txtLongitud" >
                                <br />
                                <input type="text" class="form-control w-60" id="txtkmdesde" name="txtkmdesde" >
                                <br />
                                <input type="text" class="form-control w-60" id="txtkmhasta" name="txtkmhasta" >
                                <br />
                                <select class="form-control w-75" id="cmbDepartamento">
                                    <option value="value"></option>
                                </select>
                                <br />
                                <input type="date" class="form-control w-60" id="txtfechacreacion" name="txtfechacreacion" >
                                <br />
                                <input type="text" class="form-control w-60" id="txtfechadesactivado" name="txtfechadesactivado" >
                                <br />
                                <select class="form-control w-75" id="cmbSuperficie">
                                    <option value="value"></option>
                                </select>
                                <br />
                                <textarea class="form-control" id="txtComentarios" rows="3"></textarea>
                                <br />
                                <select class="form-control w-75" id="cmbanio">
                                    <option value="value"></option>
                                </select>
                                <br />
                    <br />
                                   <div class="form-check">
                                      <input class="form-check-input" type="checkbox" id="flexCheckDefault">
                                          <label class="form-check-label" for="flexCheckDefault">
                                          </label>
                                      </div>
                                   </div>
                         <div class="col-12 pt-3 text-right">
                            <button type="button" id="btnGuardarTramo" class="btn btn-primary px-5 btn-sm">Guardar</button>
                        </div>
                    </div>   
           </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
    <!-- End Modal Agregar Planes ANuales -->
            <!-- Start Modal Actualizar Tramos  -->
    <div class="modal fade" id="exampleModalActualizar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabelActualizar">ACTUALIZAR TRAMOS</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-md-3">
                                <strong> 
                                    <span class="form-control" style="border: none">Código Tramo:</span>
                                    <br />
                                     <br />
                                    <span class="form-control" style="border: none">Descripción:</span>
                                    <br />
                                    <br />
                                   
                                    <span class="form-control" style="border: none">Ruta:</span>
                                    <br />
                                     <span class="form-control" style="border: none">Logitud (Kms):</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Km. Desde:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Km. Hasta:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Departamento:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Fecha Creación:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Fecha Desactivado:</span>
                                    <br /> 
                                    <span class="form-control" style="border: none">Superficie:</span>
                                    <br /> 
                                    <br /> 
                                    <span class="form-control" style="border: none">Comentarios:</span>
                                    <br />
                                    <br />     
                                    <span class="form-control" style="border: none">Año:</span>
                                    <br />
                                    <br />
                                    <span class="form-control" style="border: none">Activo:</span>
                                    <br />
                                </strong>
                            </div>
                <div class="col-md-7">
                                <input type="text" class="form-control w-60" id="txtIDTramo-Act" name="txtIDTramo-Act" style="display: none">
                                <input type="text" class="form-control w-60" id="txtCodigoTramo-Act" name="txtCodigoTramo-Act" >
                                <br />
                                <textarea class="form-control" id="txtDescripcion-Act" rows="3"></textarea>
                                <br />
                                <select id="cmbRuta-Act" class="form-control w-75"></select>
                                <br />
                                <input type="text" class="form-control w-60" id="txtLongitud-Act" name="txtLongitud-Act" >
                                <br />
                                <input type="text" class="form-control w-60" id="txtkmdesde-Act" name="txtkmdesde-Act" >
                                <br />
                                <input type="text" class="form-control w-60" id="txtkmhasta-Act" name="txtkmhasta-Act" >
                                <br />
                                <select id="cmbDepartamento-Act" class="form-control w-75"></select>
                                <br />
                                <input type="date" class="form-control w-60" id="txtfechacreacion-Act" name="txtfechacreacion-Act" >
                                <br />
                                <input type="text" class="form-control w-60" id="txtfechadesactivado-Act" name="txtfechadesactivado-Act" >
                                <br />
                                <select id="cmbSuperficie-Act" class="form-control w-75"></select>
                                <br />
                                <textarea class="form-control" id="txtComentarios-Act" rows="3"></textarea>
                                <br />
                                 <select id="cmbanio-Act" class="form-control w-75"></select>
                                 <br />
                                   <div class="form-check">
                                      <input class="form-check-input" type="checkbox" id="flexCheckDefault-Act" >
                                          <label class="form-check-label" for="flexCheckDefault-Act">
                                          </label>
                                      </div>
                                   </div>
                         <div class="col-12 pt-3 text-right">
                            <button type="button" id="btnGuardarTramoAct" class="btn btn-primary px-5 btn-sm">Guardar</button>
                        </div>
                    </div>   
           </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
    <!-- End Modal Actualizar Tramos -->
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
    <%: Scripts.Render("~/js/RedVial/jsTramosViales.js") %>
</asp:Content>