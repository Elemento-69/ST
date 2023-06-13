<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmCapacidadEconomica.aspx.cs" Inherits="Covialgt.Empresas.frmCapacidadEconomica" %>
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

    <h1>Capacidad econ&oacute;mica</h1>
    <hr class="thick" />

    <div class="form-group col-md-6 col-xl-5 ml-md-auto">
        <div class="row justify-content-between" style="padding-right:20px;" >
            <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                <a type="button" id="btnRegresar" class="btn btn-outline-secondary btn-block">REGRESAR</a>
            </div>
            <div class="col-sm-6 col-xl-5">
                <button type="button" id="btnAgregar" class="btn btn-primary btn-block" onclick="mostrarModalAgregarRegistro();" >+ AGREGAR</button>
            </div>
        </div>
    </div>
    <div id="card-capacidad-economica" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
    <div class="card-body" >
        <div class="row">
            <div class="col-3">
                <label for="nit">NIT</label>
                <input type="text" class="form-control" id="txtNIT" name="nit" >
            </div>
            <div class="col-2">
                <label for="Anio">Año</label>
                <input type="number" class="form-control" id="txtAnio" name="Anio"  step="1" pattern="^[-/d]/d*$">
            </div>
            <div class="col-3">
                <label for="CapacidadLiteral">Capacidad (literal)</label>
                <input type="text" class="form-control" id="txtCapacidadLiteral" name="CapacidadLiteral" >
            </div>
            <div class="col-4" style="padding-top:30px;">
                    <label>
                        <input type="radio" name="rangoLiteral" id="radioIgualA" value="IgualA" checked="checked"> Igual a
                    </label>
                    &nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="rangoLiteral" id="radioMenorQue" value="MenorQue"> Menor que
                    </label>
                    &nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="rangoLiteral" id="radioMayorQue" value="MayorQue"> Mayor que
                    </label>
            </div>            
        </div>
        <div class="row" style="padding-top:20px;" >            
            <div class="col-3" style="text-align: left;" >
                <button type="button" id="btnReporte" class="btn btn-secondary btn-form" style="text-align:center;" onclick="fnGenerarReporte();" >Generar reporte</button>
            </div>
            <div class="col-6" >
            </div>
            <div class="col-3" style="text-align: center;">
                <button type="button" id="btnFiltrar" class="btn btn-primary btn-form" style="text-align:center;" onclick="fnCargarTablaConsulta();" >Buscar registros</button>                
            </div>
        </div>
    </div></div>

    <br /><br />

    <div class="w-100"></div>
    <div class="col-12">
        <div class="table-responsive">
            <table id="tableCapacidadEconomica" class="table table-bordered">
                <thead>
                    <tr>
                        <th class="spacer" style="width: 30px"></th>
                         <th class="text-center" style="width: 70px"></th>
                        <th style="width: 70px">Año</th>
                        <th style="width: 70px">NIT</th>
                        <th>Empresa</th>
                        <th style="width: 100px">Capacidad econ&oacute;mica</th>
                        <th style="width: 100px">Monto</th>                        
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
                            <div class="row">
                                <div class="col-12">
                                    <h3 id="letreroEmpresa">identificación de la empresa</h3>
                                </div>
                            </div>
                            <br />
                            <div class="row" style="margin-top: 10px;">
                                <div class="col-6">
                                    <label for="Anio">Año</label>
                                    <select class="form-control" id="cmbAnio" name="Anio"  required ></select>   
                                </div>                                
                                <div class="col-6">
                                    <label for="Monto">Monto</label>
                                    <input type="number" class="form-control" id="txtMonto" name="Monto"  step="1" pattern="^[-/d]/d*$" required>
                                </div>
                            </div>
                            <br />
                            <div class="row" style="margin-top: 30px;">
                                <div class="col-6">
                                </div>
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

    <div id="divDialogo">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/Empresas/jsCapacidadEconomica.js") %>
</asp:Content>
