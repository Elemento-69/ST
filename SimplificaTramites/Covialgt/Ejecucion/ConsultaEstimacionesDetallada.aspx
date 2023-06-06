<%@ Page Title="Consulta Detallada de Estimaciones" Language="C#" ClientIDMode="Static" Async="true" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ConsultaEstimacionesDetallada.aspx.cs" Inherits="Covialgt.Ejecucion.ConsultaEstimacionesDetallada" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
    <style>
        .panel-title ~ .collapse-hr {
            position: relative;
            border: 1px solid #285DCE;
            margin-right: 35px;
        }

            .panel-title ~ .collapse-hr::after {
                content: "▼";
                color: #E2E2E2;
                font-size: 15px;
                top: -11px;
                right: -35px;
                position: absolute;
            }

        .panel-title[aria-expanded="true"] ~ .collapse-hr::after {
            content: "▲";
            font-size: 15px;
        }

        .small-texts {
            font-size: 11px;
            margin-bottom: 4px;
        }

        .th-text {
            padding-bottom: 5px !important;
            padding-top: 5px !important;
            font-size: 14px !important;
        }

        .t-text {
            padding-bottom: 5px !important;
            padding-top: 5px !important;
            font-size: 11px !important;
        }

        .min-th {
            width: 120px;
        }

        .ui-dialog {
            z-index: 1055 !important;
        }

        .nav-profile label {
            color:#285DCE;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://kit.fontawesome.com/80edadb2cd.js" crossorigin="anonymous"></script>
    <script src="../js/jsNumeroALetras.js" type="text/javascript"></script>
    <!--time-->
    
    
    <!--time-->

    <h1>Consulta de Estimaciones</h1>
    <hr class="thick" />

    <div class="row justify-content-between">
        <div class="col-lg-7">
            <div class="form-group my-1">
                <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-4 font-weight-bold">
                        <label for="plananual">Año:</label>
                    </div>
                    <div class="col-xl-6 col-lg-5 col-md-6 col-10">
                        <select id="plananual" class="form-control w-100" placeholder="Seleccione año del proyecto"></select>
                    </div>
                </div>
            </div>
            <div class="form-group my-1">
                <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-4 font-weight-bold">
                        <label for="proyecto">Proyecto o Contrato:</label>
                    </div>
                    <div class="col-xl-6 col-lg-5 col-md-6 col-10">
                        <input type="text" id="proyecto" class="form-control w-100" placeholder="Escriba de proyecto o contrato">
                    </div>
                    <div class="col-2 p-0 text-start">
                        <button class="btn btn-primary btn-sm" id="btn-proyecto" type="button" style="height: 38px">
                            <img src="~/Images/search.svg" width="20" height="20" alt="Buscar" runat="server" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-5 text-right py-2">
            <div class="d-inline-block h-100 text-center px-4 mx-4">
                <button type="button" id="btnImprimir" class="btn btn-light">
                    <i class="fas fa-print fa-2x"></i>
                </button>
                <div class="font-weight-bold text-center">Imprimir</div>
            </div>
        </div>
    </div>
    <div id="testDiv">
    </div>
    <h4 class="mt-5">Información General</h4>
    <div class="panel-group" id="accordion">
        <!-- Información del Contratista -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapseOne">Información del Contratista</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapseOne" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="pl-3 pr-4 my-3">
                        <div class="row m-0 p-0" style="box-shadow: 0px 4px 8px rgb(0 0 0 / 15%); border-radius: 0.25rem">
                            <div class="col-xl-4 m-o p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-header bg-primary text-white" style="border-radius: 0 !important">
                                        <h6>Información de la Empresa</h6>
                                    </div>
                                    <div class="card-body border-right h-100">
                                        <div class="data-contratista d-none">
                                            <h6 class="card-title" id="textspecial-Nombre"></h6>
                                            <hr />
                                            <p class="small-texts"><strong>Representante Legal: </strong><span id="textspecial-Representante"></span></p>
                                            <p class="small-texts"><strong>No. DPI: </strong><span id="textspecial-DPI"></span></p>
                                            <p class="small-texts"><strong>Teléfonos: </strong><span id="textspecial-TelefonosPrincipales"></span></p>
                                            <p class="small-texts"><strong>Dirección: </strong><span id="textspecial-DireccionPrincipal"></span></p>
                                            <p class="small-texts"><strong>NIT: </strong><span id="textspecial-EmpresaNIT"></span></p>
                                            <p class="small-texts"><strong>Correo Electrónico: </strong><span id="textspecial-CorreoE"></span></p>
                                            <br />
                                            <p class="small-texts"><strong>Observación:</strong></p>
                                            <textarea rows="4" class="form-control small-texts" id="textspecial-ObservacionFyF" disabled style="resize: none"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 m-o p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-header bg-primary text-white" style="border-radius: 0 !important">
                                        <h6>Información de Contrato</h6>
                                    </div>
                                    <div class="card-body border-right border-left h-100">
                                        <div class="data-contratista d-none">
                                            <h6 class="card-title">Proyecto: 
                                                <span id="textspecial-proyecto"></span>/
                                                <span class="text-primary ml-1">Supervisión: <span id="textspecial-Supervision" class="mr-1"></span>Supervisor: <span id="textspecial-EmpresaSup"></span></span>
                                            </h6>
                                            <hr />
                                            <p class="small-texts"><strong>Contrato: </strong><span id="textspecial-ContratoCodigo"></span></p>
                                            <p class="small-texts"><strong>Contrato Modificado: </strong><span id="textspecial-ContratoModificado"></span></p>
                                            <p class="small-texts"><strong>Contrato Ampliatorio: </strong><span id="textspecial-ContratoAmpliatorio"></span></p>
                                            <p class="small-texts"><strong>Monto Original: </strong><span id="textspecial-MontoOriginal"></span></p>
                                            <p class="small-texts"><strong>Modificado: </strong><span id="textspecial-Vigente"></span></p>
                                            <p class="small-texts"><strong>Empresas Asociadas al Proyecto:</strong></p>
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-sm" id="table-proyectos">
                                                    <thead>
                                                        <tr>
                                                            <th class="spacer" style="padding-bottom: 5px; padding-top: 5px"></th>
                                                            <th class="text-center" style="padding-bottom: 5px; padding-top: 5px">Empresa</th>
                                                            <th class="text-center" style="padding-bottom: 5px; padding-top: 5px">NIT</th>
                                                            <th class="text-center" style="padding-bottom: 5px; padding-top: 5px">Estado</th>
                                                            <th class="spacer" style="padding-bottom: 5px; padding-top: 5px"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="spacer"></td>
                                                            <td>Condial</td>
                                                            <td>4578457-7</td>
                                                            <td>Vigente</td>
                                                            <td class="spacer"></td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 m-o p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-header bg-primary text-white" style="border-radius: 0 !important">
                                        <h6>Información del Proyecto</h6>
                                    </div>
                                    <div class="card-body border-left">
                                        <div class="data-contratista d-none h-100">
                                            <div class="data-contratista d-none">
                                                <h6 class="card-title">Datos del Proyecto</h6>
                                                <hr />
                                                <p class="small-texts"><strong>Estimaciones por pagar: </strong><span id="textspecial-MontoPago"></span></p>
                                                <p class="small-texts"><strong>Saldo Contractual sin Estimar: </strong><span id="textspecial-MontoSinEstimar"></span></p>
                                                <p class="small-texts"><strong>Saldo Contractual: </strong><span id="textspecial-DeudaContractual"></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Información del Contratista -->
        <!-- Tramos del proyecto -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapseTramos">Tramos del Proyecto</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapseTramos" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="table-responsive my-3">
                        <table class="table table-bordered" id="table-tramos">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center">Código</th>
                                    <th class="text-center">Departamento</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Longitud (Kms)</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Tramos del proyecto -->
        <!-- Renglones Vigentes del Proyecto -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapseRenglones">Renglones Vigentes del Proyecto</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapseRenglones" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="table-responsive my-3">
                        <table class="table table-bordered" id="table-renglones">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center">Renglón Código</th>
                                    <th class="text-center">Componente Descripción</th>
                                    <th class="text-left">Renglón Descripción</th>
                                    <th class="text-center">Unidad</th>
                                    <th class="text-right">Cantidad</th>
                                    <th class="text-right">Precio Unitario</th>
                                    <th class="text-right">Subtotal</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Renglones Vigentes del Proyecto -->
        <!-- Sanciones del Proyecto -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapseSanciones">Sanciones del Proyecto</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapseSanciones" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="table-responsive mt-4">
                        <table class="table table-bordered" id="table-sanciones">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center">Correlativo</th>
                                    <th class="text-center">Código Sanción</th>
                                    <th class="text-center">Descripcion de Responsabilidad</th>
                                    <th class="text-center">Recurrencia</th>
                                    <th class="text-center">Justificación</th>
                                    <th class="text-center">Monto</th>
                                    <th class="text-center">Fecha de Sanción</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Sanciones del Proyecto -->
        <!-- Pagos -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapsePagos">Pagos</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapsePagos" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="table-responsive my-3">
                        <table class="table table-bordered" id="table-pagos">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center">Año Nómina</th>
                                    <th class="text-center">Nómina</th>
                                    <th class="text-center">Estimación Corre.</th>
                                    <th class="text-right">Monto de Estimación</th>
                                    <th class="text-right">Monto a Pagar</th>
                                    <th class="text-right">ISR (Q)</th>
                                    <th class="text-right">Total a Recibir</th>
                                    <th class="text-center">Empresa</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Pagos -->
        <!-- Estimaciones -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapseEstimaciones">Estimaciones</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapseEstimaciones" class="panel-collapse collapse show">
                <div class="panel-body">
                    <div class="table-responsive mt-4">
                        <table class="table table-bordered" id="table-estimaciones">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center" style="min-width: 120px"></th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Proy</th>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Período</th>
                                    <th class="text-center">Monto Ejecutado</th>
                                    <th class="text-center">Monto de Estimación</th>
                                    <th class="text-center">Pagado</th>
                                    <th class="text-center">Pendiente</th>
                                    <th class="text-center">Deuda Contractual</th>
                                    <th class="text-center">Saldo Real</th>
                                    <th class="text-center">Estado de la Estimación</th>
                                    <th class="text-center">Fecha de Ingreso</th>
                                    <th class="text-center">Fecha de Estado</th>
                                    <th class="text-center">Días de Recepción de Estado</th>
                                    <th class="text-center">Visor</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Estimaciones -->
        <!-- Clausulas y Ampliaciones -->
        <div class="panel panel-default my-4">
            <div class="panel-heading text-primary">
                <h5 class="panel-title" data-toggle="collapse" data-target="#collapseClausulas">Cláusulas y Ampliaciones</h5>
                <hr class="my-2 collapse-hr" />
            </div>
            <div id="collapseClausulas" class="panel-collapse collapse">
                <div class="panel-body">
                    <div class="row justify-content-center">
                        <div class="col-2 align-self-end">
                            <div style="margin-bottom: 32px">
                                <p class="small-texts d-flex align-items-center" style="min-height: 32px">CLÁUSULA CUARTA</p>
                                <p class="small-texts d-flex align-items-center" style="min-height: 32px">CLÁUSULA QUITA</p>
                                <p class="small-texts d-flex align-items-center" style="min-height: 32px">AMPLIATORIO</p>
                                <p class="small-texts d-flex align-items-center" style="min-height: 32px">TOTAL</p>
                            </div>
                        </div>
                        <div class="col-xl-9 col-10">
                            <div class="table-responsive">
                                <table class="table table-bordered table-sm" id="table-montos">
                                    <thead>
                                        <tr>
                                            <th class="spacer th-text" style=""></th>
                                            <th class="text-center th-text">Monto Cláusula y/o Ampliatorio</th>
                                            <th class="text-center th-text">Monto Pagado</th>
                                            <th class="text-center th-text">Monto Pendiente de pago</th>
                                            <th class="text-center th-text">Monto sin Contrato y/o Estimar</th>
                                            <th class="spacer th-text"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="spacer"></td>
                                            <td class="text-right" id="tdspecial-MontoPorClausulaCuarta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoPagadoClausulaCuarta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoPendienteClausulaCuarta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoSinEstimar">Q0.00</td>
                                            <td class="spacer"></td>
                                        </tr>
                                        <tr>
                                            <td class="spacer"></td>
                                            <td class="text-right" id="tdspecial-MontoPorClausulaQuinta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoPagadoClausulaQuinta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoPendienteClausulaQuinta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoSinEstimar4">Q0.00</td>
                                            <td class="spacer"></td>
                                        </tr>
                                        <tr>
                                            <td class="spacer"></td>
                                            <td class="text-right" id="tdspecial-MontoPorClausulaSexta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoPagadoClausulaSexta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoPendienteClausulaSexta">Q0.00</td>
                                            <td class="text-right" id="tdspecial-MontoSinEstimar6">Q0.00</td>
                                            <td class="spacer"></td>
                                        </tr>
                                        <tr>
                                            <td class="spacer"></td>
                                            <td class="text-right" id="tdspecial-totalPor">Q0.00</td>
                                            <td class="text-right" id="tdspecial-totalPagado">Q0.00</td>
                                            <td class="text-right" id="tdspecial-totalPendiente">Q0.00</td>
                                            <td class="text-right" id="tdspecial-totalSinEstimar">Q0.00</td>
                                            <td class="spacer"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive mt-4">
                        <table class="table table-bordered" id="table-clausulas">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center">No. de Estimación</th>
                                    <th class="text-center">Cláusula</th>
                                    <th class="text-center">Monto de Cláusula</th>
                                    <th class="text-center">Monto Pagado</th>
                                    <th class="text-center">Monto Pendiente</th>
                                    <th class="text-center">Departamento</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Clausulas y Ampliaciones -->
    </div>

    <!-- Start Modal de Bitacoras de Estimacion -->
    <div class="modal fade" id="ModalBitacoraEstimacion" tabindex="-1" role="dialog" aria-labelledby="ModalBitacoraEstimacionTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalBitacoraEstimacionTitle">Bítacora de Estimación</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xl-10">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6">
                                    <div class="form-group mt-4">
                                        <div class="row">
                                            <div class="col-md-4 font-weight-bold pr-md-0">
                                                <label for="search-bitacora">ID:</label>
                                            </div>
                                            <div class="col-md-6 col-10 pl-md-0">
                                                <input type="text" id="search-bitacora" class="form-control w-100">
                                            </div>
                                            <div class="col-2 p-0 text-start">
                                                <button class="btn btn-primary btn-sm" id="btn-search-bitacora" type="button" style="height: 38px">
                                                    <img src="~/Images/search.svg" width="20" height="20" alt="Buscar" runat="server" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mt-4">
                                        <div class="row">
                                            <div class="col-md-4 font-weight-bold pr-md-0">
                                                <label for="proyecto-bitacora">Proyecto:</label>
                                            </div>
                                            <div class="col-md-6 col-10 pl-md-0">
                                                <input id="proyecto-bitacora" class="form-control w-100" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-lg-6">
                                    <div class="form-group mt-4">
                                        <div class="row">
                                            <div class="col-md-4 font-weight-bold pr-md-0">
                                                <label for="fecha-bitacora">Año:</label>
                                            </div>
                                            <div class="col-md-6 col-10 pl-md-0">
                                                <input type="text" id="fecha-bitacora" class="form-control w-100" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mt-4">
                                        <div class="row">
                                            <div class="col-md-4 font-weight-bold pr-md-0">
                                                <label for="estimacion-bitacora">Estimación:</label>
                                            </div>
                                            <div class="col-md-6 col-10 pl-md-0">
                                                <input id="estimacion-bitacora" class="form-control w-100" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-2 text-right py-2 h-100 align-self-center">
                            <button type="button" id="btnImprimirBitacora" class="btn btn-light">
                                <i class="fas fa-print fa-2x"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="table-responsive mt-4">
                        <table class="table table-bordered datatable" id="table-bitacoras-estimacion"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal de Bitacoras de Estimacion -->

    <!-- Start Modal CUR Consulta Única de Registro -->
    <div class="modal fade" id="ModalCUR" tabindex="-1" role="dialog" aria-labelledby="ModalCURTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalCURTitle">CUR Consulta Única de Registro</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mx-5 my-2" style="box-shadow: 0px 4px 8px rgb(0 0 0 / 15%); border-radius: 0.25rem">
                        <div class="row">
                            <div class="col-xl-6 p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-body border-right h-100">
                                        <div class="row mt-2 mx-2">
                                            <label for="cur-tipoPago">Tipo pago</label>
                                            <select id="cur-tipoPago" class="form-control w-100"></select>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Año:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-AnioID"></span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Proyecto:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-ProyectoCodigo"></span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Estimación:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-EstimacionCorr"></span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold">Monto Factura:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-MontoFactura"></span>
                                            </div>

                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Descuentos:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-descuentos"></span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">ISR:</div>
                                            <div class="col-lg-5 col-10">
                                                <input type="text" id="cur_isr" runat="server" class="form-control w-100">
                                                <asp:RequiredFieldValidator ID="reqisr" ControlToValidate="cur_isr" ValidationGroup="valoperar" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                                            </div>
                                            <div class="col-2 p-0 text-left">
                                                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                                    <input type="checkbox" class="custom-control-input" name="isr" id="cur_isr2">
                                                    <label class="custom-control-label" for="cur_isr2"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Descuento IVA:</div>
                                            <div class="col-lg-5 col-10">
                                                <input type="text" id="cur_descuento_iva" runat="server" class="form-control w-100">
                                                <asp:RequiredFieldValidator ID="reqiva" ControlToValidate="cur_descuento_iva" ValidationGroup="valoperar" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                                            </div>
                                            <div class="col-2 p-0 text-left">
                                                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                                    <input type="checkbox" class="custom-control-input" name="iva" id="cur_descuento_iva2">
                                                    <label class="custom-control-label" for="cur_descuento_iva2"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Retención 25%:</div>
                                            <div class="col-lg-5 col-10">
                                                <input type="text" id="cur_retencion" runat="server" class="form-control w-100">
                                                <asp:RequiredFieldValidator ID="reqretencion" ControlToValidate="cur_retencion" ValidationGroup="valoperar" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                                            </div>
                                            <div class="col-2 p-0 text-left">
                                                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                                    <input type="checkbox" class="custom-control-input" name="descuentoIva" id="cur_retencion2">
                                                    <label class="custom-control-label" for="cur_retencion2"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5"></div>
                                            <div class="col-lg-5 col-10 text-right">
                                                <button type="button" class="btn btn-primary px-5 btn-sm" id="cur-operar">OPERAR</button>
                                            </div>
                                        </div>
                                        <input type="hidden" id="cur-MontoFac" />
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Total Recibe:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-TotalRecibe"></span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">No. Factura:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-NoFactura">-</span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Fecha de Factura:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-FechaFactura"></span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Nota de Crédito:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-nota-credito">-</span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">No. De CUR Devengado:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-NoCurr">-</span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Año de Nomina:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-fecha-nomina">-</span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Nomina:</div>
                                            <div class="col-lg-7">
                                                <span id="cur-nomina">-</span>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Correlativo de Pago:</div>
                                            <div class="col-lg-5 col-10">
                                                <select id="cur-correlativo-pago" class="form-control w-100"></select>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Documentos ISR IVA:</div>
                                            <div class="col-lg-5 col-10">
                                                <select id="cur-documentos-isr-iva" class="form-control w-100"></select>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5"></div>
                                            <div class="col-lg-5 col-10 text-center">
                                                <button type="button" id="btnDescargar" class="btn btn-primary px-5 btn-sm">Descargar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-body border-left h-100 p-4">
                                        <a id='btnAbrirCur' class="dropdown-item  text-wrap"><i class='fa fa-eye fa-lg fa-fw mr-3'></i>Ver</a>
                                        <div class="d-flex align-items-center h-100">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h3 class="font-weight-bolder text-center">Datos CUR</h3>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="cur-num">Número de CUR</label>
                                                    <input type="text" id="cur-num" class="form-control w-100" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="cur-estado">Estado CUR</label>
                                                    <select id="cur-estado" class="form-control w-100"></select>
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="cur-fecha">Fecha CUR</label>
                                                    <div class="form-group">
                                                        <div class="input-group date" id="fechaCur" data-target-input="nearest">
                                                            <input type="text" name="fechaCur" autocomplete="off" class="form-control datetimepicker-input" id="cur-fecha">
                                                            <div class="input-group-append" data-target="#fechaCur" data-toggle="datetimepicker">
                                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <%--  <input type="text" id="cur-fecha" class="form-control w-100" />--%>
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardar" class="btn btn-primary px-5 btn-sm">Guardar</button>
                                                </div>
                                                <div class="col-12 pt-5 pb-3">
                                                    <span class="font-weight-bolder">Estado del pago: </span><span id="cur-estado-pago"></span>
                                                </div>
                                                <%if (HttpContext.Current.User.IsInRole("ACTUALIZAR CUR"))
                                                    { %>
                                                <div class="col-12 text-right pt-2">
                                                    <button type="button" id="btnDesaprobar" class="btn btn-outline-dark font-weight-bolder px-5 btn-sm"></button>
                                                </div>
                                                <%} %>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div class="row mt-2">

                            <div class="col-lg-12">
                                <div class="panel-group" id="accordion2">
                                    <div class="panel panel-default">
                                        <div class="panel-heading text-primary">
                                            <p class="panel-title m-0" data-toggle="collapse" id="title-cur-facturas" data-target="#collapseCUR">Mostrar Facturas</p>
                                            <hr class="my-2 collapse-hr" />
                                        </div>
                                        <div id="collapseCUR" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered table-sm" id="table-facturas">
                                                        <thead>
                                                            <tr>
                                                                <th class="spacer t-text"></th>
                                                                <th class="t-text"></th>
                                                                <th class="text-center t-text">Serie</th>
                                                                <th class="text-center t-text">No. de Factura</th>
                                                                <th class="text-center t-text">Monto</th>
                                                                <th class="spacer t-text"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody></tbody>
                                                        <tfoot></tfoot>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal CUR Consulta Única de Registro -->

    <!-- Start Modal de Consulta de Reparos y Observaciones -->
    <div class="modal fade" id="ModalReparos" tabindex="-1" role="dialog" aria-labelledby="ModalReparosTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalReparosTitle">Consulta de Reparos y Observaciones</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive mt-2">
                        <table class="table table-bordered datatable" id="table-reparos" style="margin: 0 0; min-width: 1110px;"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal de Consulta de Reparos y Observaciones -->

    <!-- Modal reportes de Estimaciones-->
    <div class="modal" tabindex="-1" id="reporteEstimaciones">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="estimacionesTitle">Reporte de Estimaciones</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mt-3">
                    <div class="container">
                        <div class="row py-3 align-items-center">
                            <div class="col-md-10">
                                <p class="mb-0"><b>Seleccione el reporte de estimaciones que desea generar para el proyecto: <span id="reporte-text-proyecto"></span>, estimación: <span id="reporte-text-estimacion"></span></b></p>
                            </div>
                            <div class="col-md-2 text-right">
                                <div class="d-inline-block h-100 text-center px-4 mx-4">
                                    <button type="button" id="btn-print-reporte" class="btn btn-light bg-white">
                                        <i class="fas fa-print fa-2x"></i>
                                        <br />
                                        <span class="font-weight-bold text-center">Imprimir</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 px-0 pl-2">
                                            <input type="radio" class="custom-control-input" id="customRadio1" name="tipoFiltro"
                                                value="estimacion caratula">
                                            <label class="custom-control-label" for="customRadio1">Estimacion Caratula</label>
                                        </div>
                                        <div class="custom-checkbox px-0" hidden>
                                            <input type="checkbox" class="custom-control-input checkeds" id="estimacion-unica-caratura">
                                            <label class="custom-control-label mr-2" for="estimacion-unica-caratura">Estimación Única</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3">
                                            <input type="radio" class="custom-control-input" id="caratulaFinanciera" name="tipoFiltro"
                                                value="caratula financiera">
                                            <label class="custom-control-label" for="caratulaFinanciera">Caratula Financiera</label>
                                        </div>
                                        <div class="custom-checkbox mr-4">
                                            <input type="checkbox" class="custom-control-input checkeds" id="empresa-check">
                                            <label class="custom-control-label mr-2" for="empresa-check">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary mb-5 mt-5 hidden-div" id="body-caratula-financiera">
                                        <div class="card-text text-blue mt-3 mb-4">
                                            <label for="Descripcion">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado" name="nombreDelegado">
                                        </div>
                                        <div class="card-text text-blue mt-3 mb-4">
                                            <label for="Descripcion">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa2" name="nombreEmpresa2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input" id="constanciaTrabajo2" name="tipoFiltro"
                                                value="constancia trabajo">
                                            <label class="custom-control-label" for="constanciaTrabajo2">Constancia de Trabajo</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pr-5">
                                            <input type="checkbox" class="custom-control-input checkeds" id="empresa-check2">
                                            <label class="custom-control-label mr-2" for="empresa-check2">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="constanciaTrabajo-body-card">
                                        <div class="form-group text-blue mt-3 mb-4">
                                            <label for="FechaPresentacion">Ingresar Fecha</label>
                                            <div class="input-group date" id="FechaPresentacion-dp" data-target-input="nearest">
                                                <input id="FechaPresentacion" data-target="#FechaPresentacion-dp" type="text"
                                                    class="form-control datetimepicker-input">
                                                <div class="input-group-append" data-target="#FechaPresentacion-dp" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-text text-blue mt-3 mb-4 empresa-constancia-trabajo">
                                            <label for="Descripcion">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado2" name="nombreDelegado2">
                                        </div>
                                        <div class="card-text text-blue mt-3 mb-4 empresa-constancia-trabajo">
                                            <label for="Descripcion">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa3" name="nombreEmpresa3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-4">
                                            <input type="radio" class="custom-control-input" id="avanceGrafica" name="tipoFiltro"
                                                value="avance grafica">
                                            <label class="custom-control-label" for="avanceGrafica">Control Avance Financiero Grafica</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pr-5 pl-4">
                                            <input type="checkbox" class="custom-control-input checkeds" id="empresa-check3">
                                            <label class="custom-control-label mr-2" for="empresa-check3">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="controlAvanceFinanciero-body-card">
                                        <div class="card-text text-blue mt-2 empresa-avance-grafico">
                                            <label for="nombreDelegado4">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado4" name="nombreDelegado4">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-grafico">
                                            <label for="nombreEmpresa1">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa1" name="nombreEmpresa1">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-grafico">
                                            <label for="empresaContratista">Empresa Contratista</label>
                                            <input type="text" class="form-control" id="empresaContratista" name="empresaContratista">
                                        </div>
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos">Periodos</label>
                                            <select class="form-control" id="periodos" name="periodos">
                                            </select>
                                        </div>
                                        <div class="form-group mt-2">
                                            <p>Periodo del Supervisor</p>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Inicial</label>
                                            <div class="input-group date" id="fecha-inicial" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-inicial" id="fecha-desde">
                                                <div class="input-group-append" data-target="#fecha-inicial" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Final</label>
                                            <div class="input-group date" id="fecha-final" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-final" id="fecha-hasta">
                                                <div class="input-group-append" data-target="#fecha-final" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-4">
                                            <input type="radio" class="custom-control-input" id="avanceFinanciero" name="tipoFiltro"
                                                value="avanceFinanciero">
                                            <label class="custom-control-label" for="avanceFinanciero">Control Avance Financiero</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pr-5 pl-4">
                                            <input type="checkbox" class="custom-control-input" id="empresa-check4">
                                            <label class="custom-control-label mr-2" for="empresa-check4">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="AvanceFinancieroBody-card">
                                        <div class="card-text text-blue mt-2 empresa-avance-financiero">
                                            <label for="nombreDelegado5">Nombre Completo Delegado Residente</label>
                                            <input type="text" class="form-control" id="nombreDelegado5" name="nombreDelegado4">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-financiero">
                                            <label for="nombreEmpresa4">Nombre de Empresa</label>
                                            <input type="text" class="form-control" id="nombreEmpresa4" name="nombreEmpresa4">
                                        </div>
                                        <div class="card-text text-blue mt-2 empresa-avance-financiero">
                                            <label for="empresaContratista">Empresa Contratista</label>
                                            <input type="text" class="form-control" id="empresaContratista2" name="empresaContratista2">
                                        </div>
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos2">Periodos</label>
                                            <select class="form-control" id="periodos2" name="periodos2">
                                            </select>
                                        </div>
                                        <div class="form-group mt-2">
                                            <p>Periodo del Supervisor</p>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Inicial</label>
                                            <div class="input-group date" id="fecha-inicial2" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-inicial2"
                                                    id="fecha-desde2">
                                                <div class="input-group-append" data-target="#fecha-inicial2" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group mt-2">
                                            <label for="desde" class="text-blue">Fecha Final</label>
                                            <div class="input-group date" id="fecha-final2" data-target-input="nearest">
                                                <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-final2"
                                                    id="fecha-hasta2">
                                                <div class="input-group-append" data-target="#fecha-final2" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-4 mb-4 pl-3">
                                            <input type="radio" class="custom-control-input" id="ejecucionRenglones" name="tipoFiltro"
                                                value="ejecucionRenglones">
                                            <label class="custom-control-label" for="ejecucionRenglones">Ejecución de renglones de trabajo</label>
                                        </div>
                                        <div class="custom-checkbox px-0" hidden>
                                            <input type="checkbox" class="custom-control-input checkeds" id="estimacion-unica-renglones">
                                            <label class="custom-control-label mr-2" for="estimacion-unica-renglones">Estimación Única</label>
                                        </div>
                                    </div>
                                    <%--<div class="card-body text-secondary hidden-div" id="ejecuccionRenglonesTrabajo-body-card">
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos">Periodos</label>
                                            <select class="form-control" id="periodos8" name="periodos">
                                            </select>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header text-center bg-white">
                                        <div class="custom-control custom-radio mt-4 mb-4 pl-3">
                                            <input type="radio" class="custom-control-input" id="cuadroEstimacion" name="tipoFiltro"
                                                value="cuadroEstimacion">
                                            <label class="custom-control-label" for="cuadroEstimacion">Cuadro de  Estimación</label>
                                        </div>
                                        <div class="custom-checkbox px-0" hidden>
                                            <input type="checkbox" class="custom-control-input checkeds" id="estimacion-unica-sabana">
                                            <label class="custom-control-label mr-2" for="estimacion-unica-sabana">Estimación Única</label>
                                        </div>
                                    </div>
                                    <%-- <div class="card-body text-secondary hidden-div" id="periodoCardbody">
                                        <div class="form-group text-blue mt-2">
                                            <label for="periodos4">Periodos</label>
                                            <select class="form-control" id="periodos4" name="periodos4">
                                            </select>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input" id="recomendacionPago" name="tipoFiltro"
                                                value="recomendacionPago">
                                            <label class="custom-control-label" for="recomendacionPago">Recomendacion de Pago</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pl-3">
                                            <input type="checkbox" class="custom-control-input" id="empresa-check7">
                                            <label class="custom-control-label mr-2" for="empresa-check7">Empresa</label>
                                        </div>
                                    </div>
                                    <div class="card-body text-secondary hidden-div" id="periodoCardbody1">
                                        <div class="form-group text-blue" hidden>
                                            <label for="periodos7">Periodos</label>
                                            <select class="form-control" id="periodos7" name="periodos7">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div class="col-lg-3">
                                <h6 class="text-primary">Seleccionar</h6>
                                <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input" id="ReporteSuspension" name="tipoFiltro"
                                                value="ReporteSuspension">
                                            <label class="custom-control-label" for="ReporteSuspension">Detalle de plazo contractual</label>
                                        </div>
                                        <div class="custom-checkbox mr-4 pl-3">
                                            <input type="checkbox" class="custom-control-input" id="Suspensiones-check8">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--Certificado contador-->
                             <div class="col-lg-3">
                             <h6 class="text-primary">Seleccionar</h6>
                             <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input ReporteCertificadoContador" id="ReporteCertificadoContador" name="tipoFiltro"
                                                value="vReporteCertificadoContador">
                                            <label class="custom-control-label" for="ReporteCertificadoContador">Certificado del Contador</label>
                                        </div>
                                
                                    </div>
                                  <div class="card-body text-secondary hidden-div" id="contador-body-card">
                                  <div class="form-group text-blue mt-3 mb-4">
                                    <label for="nombreContador" class="form-label">Nombre de Contador:</label>
                                    <input type="text"  class="form-control" pattern="[a-zA-Z\u00C0-\u00FF\s]*" id="nombreContador" placeholder="Contador">

                                    <label for="nitContador" class="form-label">NIT Contador (sin guion):</label>
                                    <input type="text"  class="form-control cNIT" pattern="[0-9a-zA-Z\s]*" id="nitContador" placeholder="80112233">   
                                  </div>
                                  </div> 
                              </div>
                            </div>
                            
                        <!--Acta de Estimación-->
                            <div id='contentActaEstimacion' class="col-lg-3">
                             <h6 class="text-primary">Seleccionar</h6>
                             <div class="card border-secondary mb-3 card-custom" style="max-width: 18rem;">
                                    <div class="card-header bg-white">
                                        <div class="custom-control custom-radio mt-2 mb-3 pl-3">
                                            <input type="radio" class="custom-control-input ReporteEstimacion" id="ReporteEstimacion" name="tipoFiltro"
                                                value="vReporteEstimacion" onclick="">
                                            <label class="custom-control-label" for="ReporteEstimacion">Acta de Estimación</label>
                                        </div>
                                
                                    </div>
                             
                                <div class=" text-secondary hidden-div" id="estimacion-body-card">
                                    <div >
                                        <nav>
                                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" style="width:48%; font-size:13px">Datos Acta</a>
                                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" style="width:52%; font-size:13px; padding:8px;">Datos Encargados</a>
                                            </div>
                                        </nav>
                                        <div class="tab-content" id="nav-tabContent" style="padding-left: 10px; padding-right: 25px; padding-top:9px;">
                                            <div class="tab-pane fade text-primary show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <div style="display: flex; flex-direction:column;">
                                                    <label for="numeroFolio" class="form-label" style="font-weight: bold;">Estimación no. <span id="estimacionActaEstimacion" style="font-weight: bold;"> </span></label>
                                                    <label for="numeroFolio" class="form-label">Número Folio:</label>
                                                    <input type="text" class="form-control" pattern="[0-9 -]*" id="numeroFolio" placeholder="0">

                                                    <label for="numeroacta" class="form-label">Número de Acta:</label>
                                                    <input type="text" class="form-control" pattern="[0-9 -]*" id="numeroacta" placeholder="Ej: 001 o 017 ">
                                                    <!--time-->
                                                    <label for="horaActa" class="form-label">Hora del Acta:</label>
                                                    <div class='input-group date' id='datetimepicker3' data-target-input="nearest">
                                                        <input id="horaActa" type="text" data-target="#datetimepicker3" name="datetime" autocomplete="off" class="form-control datetimepicker-input">
                                                        <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                                                            <div class="input-group-text"><i class="fa-regular fa-clock"></i></div>
                                                        </div>
                                                    </div>
                                                    <!--time-->
                                                    <!-- fecha acta-->
                                                    <label for="fechaActa" class="form-label">Fecha del Acta:</label>
                                                    <div class="input-group date" id="fechaActa" data-target-input="nearest">
                                                        <input id="fechaActaIn" type="text" data-target="#fechaActa" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                                                        <div class="input-group-append" data-target="#fechaActa" data-toggle="datetimepicker">
                                                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                        </div>
                                                    </div>
                                                    <!-- fecha acta-->
                                                </div>
                                            </div>
                                            <div class="tab-pane text-primary fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <!-- encargado proyecto ejecucion-->
                                                <label for="nombreEncargadoP" class="form-label">Nombre Encargado Proyecto Ejecucion:</label>
                                                <input type="text" class="form-control" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*" id="nombreEncargadoP" placeholder="Encargado Proyecto Ejecucion">
                                                <!-- encargado proyecto ejecucion-->
                                                <!-- titulo proyecto ejecucion-->
                                                <label for="tituloEncargado" class="form-label">Titulo Encargado Proyecto Ejecucion:</label>
                                                <input type="text" class="form-control" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*" id="tituloEncargadoP" placeholder="Ingeniero,Ingeniero civil,etc">
                                                <!--  titulo proyecto ejecucion-->
                                                <!-- encargado proyecto ejecucion-->
                                                <label for="nombreEncargadoS" class="form-label">Nombre Encargado Proyecto Supervisión:</label>
                                                <input type="text" class="form-control" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*" id="nombreEncargadoS" placeholder="Encargado Proyecto Supervisión">
                                                <!-- encargado proyecto ejecucion-->
                                                 <!-- titulo proyecto ejecucion-->
                                                <label for="tituloEncargadoS" class="form-label">Titulo Encargado Proyecto Supervisión:</label>
                                                <input type="text" class="form-control" pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*" id="tituloEncargadoS" placeholder="Ingeniero,Ingeniero civil,etc">
                                                <!--  titulo proyecto ejecucion-->
                                                 <!-- fecha fecha del nombramiento-->
                                                    <label for="fechaNom" id="labelfechaNom"  class="form-label">Fecha del Nombramiento:</label>
                                                    <div class="input-group date" id="fechaNom" data-target-input="nearest">
                                                        <input id="fechaNombramiento" type="text" data-target="#fechaNom" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                                                        <div class="input-group-append" data-target="#fechaNom" data-toggle="datetimepicker">
                                                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                        </div>
                                                    </div>
                                                    <!-- fecha fecha del nombramiento-->
                                            </div>
                                        </div>
                                    </div>
                                    <%-- 
                                  <!-- INPUTS -->
                                  <div class="form-group text-blue mt-3 mb-4">
                                    <label for="numeroacta" class="form-label">Número de Acta:</label>
                                    <input type="text"  class="form-control" pattern="[0-9 -]*" id="numeroacta" placeholder="0"> 
                                      <!--time-->
                                       <label for="horaActa" class="form-label">Hora del Acta:</label>
                                        <div class='input-group date' id='datetimepicker3' data-target-input="nearest">
                                           <input id="horaActa" type="text" data-target="#datetimepicker3" name="datetime" autocomplete="off" class="form-control datetimepicker-input">
                                           <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fa-regular fa-clock"></i></div>
                                        </div>
                                        </div>
                                      <!--time-->
                                      <!-- fecha acta-->
                                        <label for="fechaActa" class="form-label">Fecha del Acta:</label>
                                        <div class="input-group date" id="fechaActa" data-target-input="nearest">
                                            <input id="fechaActaIn" type="text" data-target="#fechaActa" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                                            <div class="input-group-append" data-target="#fechaActa" data-toggle="datetimepicker">
                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                            </div>
                                        </div>
                                    <!-- fecha acta-->
                                    <!-- encargado proyecto ejecucion-->
                                        <label for="nombreEncargadoP" class="form-label">Nombre de Encargado Proyecto Ejecucion:</label>
                                        <input type="text" class="form-control" pattern="[a-zA-Z\s]*" id="nombreEncargadoP" placeholder="Encargado Proyecto Ejecucion">
                                    <!-- encargado proyecto ejecucion-->
                                    <!-- encargado proyecto ejecucion-->
                                       <label for="nombreEncargadoS" class="form-label">Nombre de Encargado Proyecto Supervicion:</label>
                                        <input type="text" class="form-control"  pattern="[a-zA-Z\s]*" id="nombreEncargadoS" placeholder="Encargado Proyecto Ejecucion">
                                    <!-- encargado proyecto ejecucion-->

                                  </div>
                                    <!--  FIN INPUTS --> --%>
                                    
                                </div>                   
                            </div>
                                 </div><!-- fin acta de estimaciones -->
                            <!-- <dialog id="dialogActaEstimacion">  hola soy dialog</dialog>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- fin de modal de reportes -->

    <!-- Modal períodos de suspensión -->
    <div class="modal fade" id="winPeriodosSuspension" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg " role="document">
            <div style="height: 550px" class="modal-content">
                <div class="modal-header">
                    <h3>Períodos de suspensiones y reactivaciones
                    </h3>                   
                    <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="dModalBodyPeriodosSuspension" style="height: 600px" class="modal-body">

                    <div class="table-responsive mt-2">
                        <table class="table table-bordered" id="tablePeriodosSuspensiones">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th>No. Acta de suspensión</th>            
                                    <th style="min-width:100px !important">Tipo período</th>
                                    <th style="min-width:250px !important">Período</th>
                                    <th style="min-width:150px !important">Días afectados</th>
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


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
        usuario = "<%= Session["usuario"] %>"
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>"
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>"

        function evaluarOperar() {
            if (!Page_ClientValidate('valoperar')) return true;
            return false;
        }
    </script>
    <%: Scripts.Render("~/js/jsConsultaEstimacionesDetallada.js?x=1") %>
    <%: Scripts.Render("~/js/Administracion/jsReporteEstimaciones.js") %>
</asp:Content>

