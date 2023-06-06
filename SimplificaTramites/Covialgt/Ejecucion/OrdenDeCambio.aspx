<%@ Page Title="OC" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="OrdenDeCambio.aspx.cs" Inherits="Covialgt.Ejecucion.OrdenDeCambio" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/wizard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Documentos de Cambio</h1>
    <hr class="thick" />
    <h2>Orden de Cambio (OC)</h2>
    <ul class="nav custom-nav mt-4" id="at-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link" id="informacionProyecto-tab" data-toggle="tab" href="#informacionProyecto" role="tab" aria-controls="informacionProyecto" aria-selected="true">Información del Proyecto
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" id="informacionCambio-tab" data-toggle="tab" href="#informacionCambio" role="tab" aria-controls="informacionCambio" aria-selected="false">Información del Documento de Cambio
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="estadoDocumento-tab" data-toggle="tab" href="#estadoDocumento" role="tab" aria-controls="estadoDocumento" aria-selected="false">Estado del Documento
            </a>
        </li>
    </ul>
    <div class="tab-content" id="at-tabcontent">
        <div class="tab-pane fade" id="informacionProyecto" role="tabpanel" aria-labelledby="informacionProyecto-tab">
            <div class="row justify-content-between">
                <div class="form-group col-md-5 col-lg-3">
                    <label for="Correlativo">Correlativo</label>
                    <input type="text" class="form-control" id="Correlativo" name="Correlativo" disabled>
                </div>
                <div class="form-group col-md-5">
                    <label for="Plan">Plan</label>
                    <input type="text" class="form-control" id="Plan" name="Plan" disabled>
                </div>
                <div class="w-100"></div>
                <div class="form-group col-12">
                    <label for="Programa">Programa</label>
                    <input type="text" class="form-control" id="Programa" name="Programa" disabled>
                </div>
                <div class="form-group col-12">
                    <label for="Proyecto">Proyecto</label>
                    <input type="text" class="form-control" id="Proyecto" name="Proyecto" disabled>
                </div>
                <div class="form-group pt-4 col-md-3 offset-md-9">
                    <label>Monto: <span id="monto_desc" class=" frcurrency-mask"></span></label>
                </div>
            </div>
        </div>
        <!-- segundo tab -->
        <div class="tab-pane fade show active" id="informacionCambio" role="tabpanel" aria-labelledby="informacionCambio-tab">
            <div class="card">
                <div id="msform">
                    <!-- progressbar -->
                    <ul id="progressbar">
                        <li class="active" id="general">
                            <div class="icon">
                                <i class="fas fa-file-alt fa-3x"></i>
                            </div>
                            <div class="number">1</div>
                            <div class="text-strong">Datos Generales</div>
                        </li>
                        <li id="alcance">
                            <div class="icon">
                                <i class="fas fa-road fa-3x"></i>
                            </div>
                            <div class="number">2</div>
                            <div class="text-strong">Alcances</div>
                        </li>
                        <li id="componentes">
                            <div class="icon">
                                <i class="fas fa-bars fa-3x"></i>
                            </div>
                            <div class="number">3</div>
                            <div class="text-strong">Componentes - Renglones</div>
                        </li>
                        <li id="tramos">
                            <div class="icon">
                                <i class="fas fa-file-alt fa-3x"></i>
                            </div>
                            <div class="number">4</div>
                            <div class="text-strong">Renglones - Tramos</div>
                        </li>
                    </ul>
                    <!-- fieldsets -->
                    <fieldset>
                        <div class="row big-gutter justify-content-between mt-4">
                            <div class="form-group col-md-5 col-lg-4">
                                <label for="FechaPresentacion">Fecha Presentación</label>
                                <div class="input-group date" id="FechaPresentacion-dp" data-target-input="nearest">
                                    <input id="FechaPresentacion" data-target="#FechaPresentacion-dp" type="text"
                                        class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#FechaPresentacion-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label>Modifica</label>
                                <div class="row ml-3">
                                    <div class="col">
                                        <div class="custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="anexo-check">
                                            <label class="custom-control-label" for="anexo-check">Anexo</label>
                                        </div>
                                    </div>
                                    <div class="w-100 d-sm-none my-2"></div>
                                    <div class="col">
                                        <div class="custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="plazo-check">
                                            <label class="custom-control-label" for="plazo-check">Plazo</label>
                                        </div>
                                    </div>
                                    <div class="w-100 d-xl-none my-2"></div>
                                    <div class="col">
                                        <div class="custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="sancion">
                                            <label class="custom-control-label" for="sancion">Sanci&oacute;n</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="TipoDocumento">Tipo de Documento</label>
                                        <input type="text" class="form-control" id="TipoDocumento" name="TipoDocumento" disabled value="Orden de Cambio(OC)">
                                    </div>
                                    <div class="form-group col-lg-6 col-md-8 col-10">
                                        <label for="TipoDocumento text-nowrap">Dias Afectados</label>
                                        <input type="text" class="form-control frNegDecimal-mask" id="DiasAfectados" name="DiasAfectados" disabled>
                                    </div>
                                    <div class="w-100"></div>
                                    <div class="form-group col-lg-6 col-md-8">
                                        <label for="TipoDocumento">Clausula</label>
                                        <input type="text" class="form-control" id="Clausula" name="Clausula">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Justificación">Justificacion</label>
                                <textarea class="form-control" id="Justificacion" name="Justificacion" rows="8"></textarea>
                            </div>
                            <div class="w-100 mt-3"></div>
                            <div class="form-group custom-control custom-checkbox col-md-4 col-lg-4 ml-4">
                                <input type="checkbox" class="custom-control-input" id="TieneCertificacion">
                                <label class="custom-control-label" for="TieneCertificacion">Tiene Certificaci&oacute;n</label>
                            </div>
                            <div class="w-100"></div>
                            <div class="form-group col-12 col-md-6  pr-md-4 pr-xl-5">
                                <label for="Certificacion" class="mb-4">Codigo Certificaci&oacute;n</label>
                                <select class="form-control cert-form" id="Certificacion" disabled></select>
                            </div>
                            <div class="form-group col-12 col-md-6  pr-md-4 pr-xl-5">
                                <div class="form-group custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input cert-form" id="otraCertificacionCheck" disabled>
                                    <label class="custom-control-label" for="otraCertificacionCheck">Otra Certificaci&oacute;n</label>
                                </div>
                                <input class="form-control" id="CertificacionNueva" disabled>
                            </div>
                            <div class="w-100"></div>
                            <div class="form-group col-12 text-right pt-4">
                                <button type="button" class="btn btn-primary btn-form next">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row justify-content-between mt-4">

                            <div class="col-12 pt-3">
                                <hr />
                                <h2><span class="title-bg px-sm-5">Tramos</span></h2>
                                <div class="table-responsive mt-5">
                                    <table class="table table-bordered" id="tramos-table">
                                        <thead>
                                            <tr>
                                                <th class="spacer"></th>
                                                <th class="text-center"></th>
                                                <th class="text-center">ID</th>
                                                <th class="text-center">Descripción</th>
                                                <th class="spacer"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="w-100"></div>
                            <div class="form-group col-12 text-right">
                                <button type="button" class="previous btn btn-outline-secondary btn-form mb-3">
                                    Anterior
                                </button>
                                <button type="button" class="btn btn-primary next btn-form mb-3">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row mt-4 big-gutter justify-content-between">
                            <div class="col-12">
                                <h4>Asociar Renglon Componente</h4>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Componente">Componente</label>
                                <select class="form-control" id="Componente" name="Componente">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="Renglon">Renglon</label>
                                <select class="form-control" id="Renglon" name="Renglon">
                                </select>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="Precio">Precio</label>
                                        <input type="text" class="form-control frcurrency-mask asociarRenglonRow" id="Precio" name="Precio" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="form-group col-md-9 col-lg-6">
                                        <label for="cantidad">Cantidad</label>
                                        <input type="text" class="form-control  frNegDecimal-mask asociarRenglonRow" id="cantidadRenglon" name="cantidad">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 pt-4">
                                <span class="text-danger h5">*Por Ejecutar: <span class="frdecimal-mask" id="porEjecutarVal"></span><span id="porEjecutarUnidad"></span></span>
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="renglon-add_btn">Insertar</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                                <hr />
                                <h2><span class="title-bg">Asociación de Renglones</span></h2>
                                <div class="table-responsive mt-5">
                                    <table class="table table-bordered" id="renglones-table">
                                        <thead>
                                            <tr>
                                                <th class="spacer"></th>
                                                <th></th>
                                                <th class="text-center">Componente</th>
                                                <th class="text-center">Renglon</th>
                                                <th class="text-center">Precio Unitario</th>
                                                <th class="text-center">Cantidad</th>
                                                <th class="text-center">Subtotal</th>
                                                <th class="spacer"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td class="border-0" colspan="8">
                                                    <div class="row">
                                                        <div class="col-12 text-right">
                                                            <p class="h5 d-inline font-weight-bold">Total</p>
                                                            <p class="h5 d-inline  frcurrency-mask total"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div class="w-100"></div>
                            <div class="form-group col-12 text-right pt-5">
                                <button type="button" class="previous btn btn-outline-secondary btn-form mb-3">
                                    Anterior
                                </button>
                                <button type="button" class="btn btn-primary next btn-form mb-3">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row mt-4 big-gutter">
                            <div class="col-12">
                                <h4>Asociar Renglon Tramo</h4>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Componente-cantidad">Componente</label>
                                <select class="form-control" id="Componente-cantidad" name="Componente2">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="#Renglon-tramo">Renglon</label>
                                <select class="form-control asociacionTramo-select" id="Renglon-tramo" name="Renglon2">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="#tramo-cantidad">Tramo</label>
                                <select class="form-control asociacionTramo-select" id="tramo-cantidad" name="Tramo2"></select>
                            </div>
                            <div class="form-group col-md-6 col-lg-4 col-xl-3">
                                <label for="Cantidad">Cantidad</label>
                                <input type="text" class="form-control  frNegDecimal-mask" id="Cantidad" name="Cantidad">
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="asociacion-addBtn">Insertar</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                                <hr />
                                <h2><span class="title-bg">Asociación de Renglones</span></h2>
                                <h5 class="text-danger mt-5">Cantidad a disminuir entre tramos: <span class="frdecimal-mask" id="tramo-total"></span></h5>
                                <h5 class="text-danger mt-5">Por Ejecutar el Tramo: <span class="frdecimal-mask" id="tramo-available"></span></h5>
                                <div class="table-responsive mt-5">
                                    <table class="table table-bordered" id="cantidadAsociacion-table">
                                        <thead>
                                            <tr>
                                                <th class="spacer"></th>
                                                <th></th>
                                                <th>Componente</th>
                                                <th>Renglon</th>
                                                <th>Tramo</th>
                                                <th>P. Unitario</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                                <th class="spacer"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td class="border-0" colspan="8">
                                                    <div class="row">
                                                        <div class="col-12 text-right">
                                                            <p class="h5 d-inline font-weight-bold">Total</p>
                                                            <p class="h5 d-inline  frcurrency-mask total"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div class="w-100"></div>
                            <div class="form-group col-12 text-right">
                                <button type="button" class="previous btn btn-outline-secondary btn-form mb-3">
                                    Anterior
                                </button>
                                <button type="button" class="btn btn-primary btn-form mb-3" id="finalizar-wizzard-btn">
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <!-- tercer tab -->
        <div class="tab-pane fade p-2" id="estadoDocumento" role="tabpanel" aria-labelledby="estadoDocumento-tab">
            <div class="row justify-content-between">
                <div class="form-group col-md-5 col-lg-4 col-xl-3">
                    <label for="Estado">Estado</label>
                    <select class="form-control" id="Estado" name="Estado" disabled></select>
                </div>
                <div class="form-group  col-md-5 col-lg-4 col-xl-3">
                    <label for="Aprobado" class="d-block">Aprobado</label>
                    <div class="custom-checkbox pl-4">
                        <input type="checkbox" class="custom-control-input" id="Aprobado" disabled>
                        <label class="custom-control-label" for="Aprobado"></label>
                    </div>
                </div>
                <div class="form-group col-12 ">
                    <label for="ComentarioEstado">Comentario</label>
                    <textarea class="form-control" id="ComentarioEstado" name="PlanDocumento" rows="5" disabled></textarea>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents();
            $('[data-toggle="popover"]').popover();
        });
    </script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsEditTableButtons.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
        usuario = "<%= Session["usuario"] %>"
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/jsOrdenCambio.js") %>
</asp:Content>
