<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmRequisitosVisado.aspx.cs" Inherits="Covialgt.Visado.frmRequisitosVisado" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
        <style>        
        .ui-dialog {
            z-index: 1055 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>

    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <h1>Requisitos de visado</h1>
    <hr class="thick" />

    <div id="card-capacidad-economica" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
    <div class="card-body" >
        <div class="row">
            <div class="col-3">
                <label for="Anio">Año</label>
                        <select class="form-control" id="cmbAnio1" name="Anio" required>
                            <option value="0">[Incluir todos]</option>
                        </select>
            </div>
            <div class="col-3">
                <label for="Programa">Programa</label>
                        <select class="form-control" id="cmbPrograma1" name="Programa" required>
                            <option value="xx">[Incluir todos]</option>
                        </select>
            </div>
            <div class="col-3">
                <label for="GuiaVisado">Guia de visado</label>
                <input type="number" class="form-control" id="txtGuiaVisado" name="GuiaVisado"  step="1" pattern="^[-/d]/d*$" max="32767" min="-32768" >
            </div>
            <div class="col-3">
                <label for="CorrRequisito">Correlativo de requisito</label>
                <input type="number" class="form-control" id="txtCorrRequisito" name="CorrRequisito"  step="1" pattern="^[-/d]/d*$" max="32767" min="-32768" >
            </div>            
        </div>
        <div class="row" style="padding-top:10px;" >
            <div class="col-6" >
                <label for="Descripcion1">Descripción</label>
                <input type="text" class="form-control" id="txtDescripcion" name="Descripcion1"  >
            </div>
            <div class="col-3" style="text-align: right; padding-top:30px;" >
                <button type="button" id="btnFiltrar" class="btn btn-secondary btn-form" style="text-align:center;" onclick="fnCargarTablaConsulta();" >Buscar requisitos</button>
            </div>
            <div class="col-3" style="text-align: right; padding-top:30px;">
                <button type="button" id="btnAgregarNuevo" class="btn btn-primary btn-form" style="text-align:center;" onclick="mostrarModalAgregarRegistro();" >Agregar nuevo</button>                
            </div>
        </div>
    </div></div>

    <br /><br />

    <div class="w-100"></div>
    <div class="col-12">
        <div class="table-responsive">
            <table id="tableRequisitos" class="table table-bordered">
                <thead>
                    <tr>
                        <th class="spacer" style="width: 30px"></th>
                         <th class="text-center" style="width: 70px"></th>                        
                        <th style="width: 70px">Año</th>
                        <th style="width: 70px">Programa</th>
                        <th style="width: 70px">Guía de visado</th>
                        <th style="width: 70px">Requisito</th>
                        <th>Descripción</th>                        
                        <th class="spacer" style="width: 30px"></th>
                    </tr>
                </thead>
                <tbody id="registros-tbody">
                </tbody>
            </table>
        </div>
    </div>  


    <div class="modal" tabindex="-1" role="dialog" id="modalEdicion" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 id="letreroModalEdicion"></h1>
                    <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalEdicion').modal('toggle');">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                        <div id="card-capacidad-modal" class="card custom-card" style="margin-left: 10px; margin-top: 0px;  margin-right: 10px; margin-bottom: 10px;" >          
                        <div class="card-body" >
                            <div class="row" style="margin-top: 10px;">
                                <div class="col-3">
                                    <label for="Anio2">Año</label>
                                    <select class="form-control" id="cmbAnio2" name="Anio2" required>                                        
                                    </select>
                                </div>
                                <div class="col-3">
                                    <label for="Programa2">Programa</label>
                                    <select class="form-control" id="cmbPrograma2" name="Programa2" required>                                        
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="GuiaVisado2">Guia de visado</label>                                    
                                    <select class="form-control" id="cmbGuiaVisado2" name="GuiaVisado2" required>                                        
                                    </select>
                                </div>                                
                            </div>                            
                            <div class="row" style="margin-top: 10px;">
                                <div class="col-3">
                                    <label for="CorrRequisito2">Correlativo de requisito</label>
                                    <input type="number" class="form-control" id="txtCorrRequisito2" name="CorrRequisito2"  step="1" pattern="^[-/d]/d*$" max="32767" min="-32768" >
                                </div>
                                <div class="col-9" >
                                    <label for="Descripcion2">Descripción</label>
                                    <input type="text" class="form-control" id="txtDescripcion2" name="Descripcion2"  >
                                </div>
                            </div>
                            <div class="row" style="margin-top: 20px;">                                
                                <div class="col-6"></div>
                                <div class="col-3" style="text-align:center;">
                                    <button type="button" id="btnCancelar" class="btn btn-secondary btn-form" style="text-align:center;" onclick="$('#modalEdicion').hide();" >Cancelar</button>
                                </div>                                
                                <div class="col-3" style="text-align:center;">                                    
                                    <button type="button" id="btnGuardar" class="btn btn-primary btn-form" onclick="fnGrabarRegistro();">guardar registro</button>
                                </div>
                            </div>
                        </div></div>
                </div>
            </div>
        </div>
    </div>    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/js/jsRequisitosVisado.js") %>
</asp:Content>
