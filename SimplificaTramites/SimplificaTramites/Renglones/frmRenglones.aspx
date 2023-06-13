<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmRenglones.aspx.cs" Inherits="Covialgt.Renglones.frmRenglones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Renglones de Trabajo</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
            <h4>Gestión de Renglones de Trabajo</h4> 
        <div class="col-xs-4 col-md-4 col-lg-4">
            <div class="form-group">
                <a data-toggle="modal" href="#ModalagregarRenglon" class="btn btn-primary">AGREGAR</a>
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
            <table class="table table-bordered table-hover mt-4" id="renglones-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Rengl&oacute;n ID</th>
                        <th class="text-center">Rengl&oacute;n C&oacute;digo</th>
                        <th class="text-center">Rengl&oacute;n Descripci&oacute;n</th>
                        <th class="text-center">Unidad</th>
                        <th class="text-center">Secci&oacute;n Descripci&oacute;n</th>
                        <th class="text-center">Divisi&oacute;n C&oacute;digo</th>
                        <th class="text-center">Especificaci&oacute;n C&oacute;digo</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>  
        <!-- Start Modal Agregar Planes Anuales -->
    <div class="modal fade" id="ModalagregarRenglon" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">AGREGAR RENGLONES</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-md-3">
                                <strong> 
                                    <span class="form-control" style="border: none">Año:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Código Renglón:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Descripción del Renglón:</span>
                                    <br />
                                    <br />
                                    <br />
                                    <span class="form-control" style="border: none">Unidad de Medida:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Precio:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Sección:</span>
                                </strong>
                            </div>
                <div class="col-md-7">
                                <select class="form-control w-50" id="cmbAnio">
                                    <option value="value"></option>
                                </select>
                                <br />
                                <input type="text" class="form-control w-60" id="txtCodigoRenglon" name="txtCodigoRenglon" >
                                <br />
                                <textarea class="form-control w-60" id="txtDescRenglon" name="txtDescRenglon" rows="3" ></textarea>
                                <br />
                                <select class="form-control w-50" id="cmbUnidadMedida">
                                    <option value="value"></option>
                                </select>
                                <br />
                                <input type="text" class="form-control w-60" id="txtPrecio" name="txtPrecio" >
                                <br />
                                <select class="form-control w-100" id="cmbSeccion">
                                    <option value="value"></option>
                                </select>
                                <br />
                                </div>
                         <div class="col-12 pt-3 text-right">
                            <button type="button" id="btnGuardarRenglon" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
                <h5 class="modal-title" id="exampleModalLabelActualizar">ACTUALIZAR RENGLON</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-md-3">
                                <strong> 
                                    <span class="form-control" style="border: none">Código Renglón:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Descripción del Renglón:</span>
                                    <br />
                                    <br />
                                    <br />
                                    <span class="form-control" style="border: none">Unidad de Medida:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Precio:</span>
                                    <br />
                                    <span class="form-control" style="border: none">Sección:</span>
                                </strong>
                            </div>
                <div class="col-md-7">
                                <input type="text" class="form-control w-60" id="txtIDRenglon-Act" name="txtIDRenglon-Act" style="display: none">
                                <input type="text" class="form-control w-60" id="txtCodigoRenglon-Act" name="txtCodigoRenglon-Act" >
                                <br />
                                <textarea class="form-control w-60" id="txtDescRenglon-Act" name="txtDescRenglon-Act" rows="3" ></textarea>
                                <br />
                                <select class="form-control w-50" id="cmbUnidadMedida-Act"></select>
                                <br />
                                <input type="text" class="form-control w-60" id="txtPrecio-Act" name="txtPrecio-Act" >
                                <br />
                                <select class="form-control w-100" id="cmbSeccion-Act"></select>
                                <br />
                                </div>
                         <div class="col-12 pt-3 text-right">
                            <button type="button" id="btnGuardarRenglonAct" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
    <%: Scripts.Render("~/js/Renglones/jsrenglones.js") %>
</asp:Content>