<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmCur.aspx.cs" Inherits="Covialgt.Ejecucion.frmCur" %>

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
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>CUR Consulta Única de Registro</h1>
    <hr class="thick" />


            <div class="row">
               
            
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
                                                <input type="text" id="cur_isrB" runat="server" class="form-control w-100">
                                                <asp:RequiredFieldValidator ID="reqisr" ControlToValidate="cur_isrB" ValidationGroup="valoperar" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                                            </div>
                                            <div class="col-2 p-0 text-left">
                                                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                                    <input type="checkbox" class="custom-control-input" name="isr" id="cur_isr2B">
                                                    <label class="custom-control-label" for="cur_isr2B"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Descuento IVA:</div>
                                            <div class="col-lg-5 col-10">
                                                <input type="text" id="cur_descuento_ivaB" runat="server" class="form-control w-100">
                                                <asp:RequiredFieldValidator ID="reqiva" ControlToValidate="cur_descuento_ivaB" ValidationGroup="valoperar" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                                            </div>
                                            <div class="col-2 p-0 text-left">
                                                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                                    <input type="checkbox" class="custom-control-input" name="iva" id="cur_descuento_iva2B">
                                                    <label class="custom-control-label" for="cur_descuento_iva2B"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-lg-5 font-weight-bold d-flex align-items-center">Retención 25%:</div>
                                            <div class="col-lg-5 col-10">
                                                <input type="text" id="cur_retencionB" runat="server" class="form-control w-100">
                                                <asp:RequiredFieldValidator ID="reqretencion" ControlToValidate="cur_retencionB" ValidationGroup="valoperar" CssClass="invalid-feedback" ErrorMessage="El campo es requerido." runat="server" Display="Dynamic" />
                                            </div>
                                            <div class="col-2 p-0 text-left">
                                                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                                                    <input type="checkbox" class="custom-control-input" name="descuentoIva" id="cur_retencion2B">
                                                    <label class="custom-control-label" for="cur_retencion2B"></label>
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
    <%: Scripts.Render("~/js/jsConsultaCur.js") %>
</asp:Content>
