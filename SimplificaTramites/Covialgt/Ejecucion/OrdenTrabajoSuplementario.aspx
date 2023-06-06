<%@ Page Title="OTS" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="OrdenTrabajoSuplementario.aspx.cs" Inherits="Covialgt.Ejecucion.PrdenTrabajoSuplementario" %>
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
    <h2>Orden de Trabajo Suplementario (OTS)</h2>
    <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="proyecto-tab" data-toggle="tab"
                href="#proyecto" role="tab" aria-controls="proyecto" aria-selected="true">Información del Proyecto</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="documento-tab" data-toggle="tab"
                href="#documento" role="tab" aria-controls="documento" aria-selected="false">Información del Documento de Cambio</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="estado-tab" data-toggle="tab" href="#estado"
                role="tab" aria-controls="estado" aria-selected="false">Estado del Documento</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
         <div class="tab-pane fade" id="proyecto"  role="tabpanel" aria-labelledby="proyecto-tab">
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
        <div class="tab-pane fade  show  active" id="documento" role="tabpanel" aria-labelledby="documento-tab">
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
                        <div class="row justify-content-between">
                            <div class="form-group col-md-5 col-lg-4 col-xl-3">
                                <label for="FechaPresentacion">Fecha Presentaci&oacute;n</label>
                                <div class="input-group date" id="FechaPresentacion-dp" data-target-input="nearest">
                                    <input id="hasta" type="text" name="FechaPresentacion" autocomplete="off" class="form-control  datetimepicker-input">
                                    <div class="input-group-append" data-target="#FechaPresentacion-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-5 ">
                                <label>Modifica</label>
                                <div class="row pl-4">
                                    <div class="col-sm-6 pb-3">
                                        <div class="custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="anexo-check">
                                            <label class="custom-control-label" for="anexo-check">Anexo</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="plazo-check">
                                            <label class="custom-control-label" for="plazo-check">Plazo</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="TipoDocumento">Tipo de Documento</label>
                                        <input type="text" class="form-control" id="TipoDocumento" name="TipoDocumento" disabled 
                                            value="Orden de Trabajo Suplementario(OTS)">                                    
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="TipoDocumento">Dias Afectados</label>
                                        <input type="text" class="form-control frinteger-mask" id="DiasAfectados" name="DiasAfectados" disabled>
                                    </div>
                                    <div class="w-100"></div>
                                    <div class="form-group col-md-6">
                                        <label for="TipoDocumento">Clausula</label>
                                        <input type="text" class="form-control" id="Clausula" name="Clausula">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="Justificacion">Justificacion</label>
                                <textarea class="form-control" id="Justificacion" name="Justificacion" rows="8"></textarea>
                            </div>
                            <div class="w-100 mt-3"></div>
                             <div class="form-group custom-control custom-checkbox col-md-4 col-lg-4">
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
                        <div class="row justify-content-between">
                            <div class="col-12">
                                <h4>Insertar Tramo</h4>
                            </div>
                            <div class="form-group col-12">
                                <label for="Tramo">Tramo</label>
                                <select class="form-control" id="Tramo" name="Tramo">
                                </select>
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="tramos-add_btn">Insertar</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                                <hr />
                                <h2><span class="title-bg px-3">Tramos</span> </h2>
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
                                <button type="button" class="previous btn btn-outline-secondary btn-form  mb-3">
                                    Anterior
                                </button>
                                <button type="button" class="btn btn-primary next btn-form mb-3">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row">
                            <div class="col-12">
                                <h4>Asociar Renglon Componente</h4>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="Componente">Componente</label>
                                <select class="form-control" id="Componente" name="Componente">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="Renglon">Renglon</label>
                                <select class="form-control" id="Renglon" name="Renglon">
                                </select>
                            </div>
                            <div class="form-group col-md-5 col-lg-4 col-xl-3">
                                <label for="Precio">Precio</label>
                                <input type="text" class="form-control  frcurrency-mask asociarRenglonRow" id="Precio" name="Precio" disabled>
                            </div>
                            <div class="form-group col-md-5 offset-md-2 col-lg-4 offset-lg-3 col-xl-3 offset-xl-4">
                                <label for="PlanRenglon">Cantidad</label>
                                <input type="text" class="form-control  frdecimal-mask asociarRenglonRow" id="CantidadRenglon" name="Cantidad">
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="renglon-add_btn">Insertar</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                                <hr />
                                <h2><span class="title-bg px-3">Asociaci&oacute;n de Renglones</span></h2>
                                <div class="table-responsive mt-5">
                                    <table class="table table-bordered" id="renglones-table">
                                        <thead>
                                            <tr>
                                                <th class="spacer"></th>
                                                <th class="text-center"></th>
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
                                                <td class="border-0" colspan="7">
                                                    <div class="row">
                                                        <div class="col-12 text-right">
                                                            <p class="h5 d-inline font-weight-bold pr-3">Total</p>
                                                            <p class="h5 d-inline  frcurrency-mask total">Q 0.00</p>
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
                        <div class="row">
                            <div class="col-12">
                                <h4>Asociar Renglon Tramo</h4>
                            </div>
                            <div class="form-group col-12">
                                <label for="Componente-cantidad">Componente</label>
                                <select class="form-control" id="Componente-cantidad" name="Componente2">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="Renglon-tramo">Renglon</label>
                                <select class="form-control" id="Renglon-tramo" name="Renglon2">
                                </select>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="tramo-cantidad">Tramo</label>
                                <select class="form-control" id="tramo-cantidad" name="Tramo2"></select>
                            </div>
                            <div class="form-group col-md-5 offset-md-2 col-lg-4 offset-lg-2 col-xl-3 offset-xl-2">
                                <label for="Cantidad">Cantidad</label>
                                <input type="text" class="form-control frdecimal-mask" id="Cantidad" name="Cantidad">
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="asociacion-addBtn">Insertar</button>
                            </div>
                            <div class="col-md-6 py-4">
                                <span class="text-danger h5">*Por Ejecutar: <span class="frdecimal-mask" id="porEjecutarVal"></span> <span id="porEjecutarUnidad"></span></span>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                            <hr />
                            <h2><span class="title-bg px-3">Asociaci&oacute;n de Tramos</span> </h2>
                            <div class="table-responsive mt-5">
                                <table class="table table-bordered" id="cantidadAsociacion-table">
                                    <thead>
                                        <tr>
                                            <th class="spacer"></th>
                                            <th class="text-center"></th>
                                            <th class="text-center">Componente</th>
                                            <th class="text-center">Renglon</th>
                                            <th class="text-center">Tramo</th>
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
                                                            <p class="h5 d-inline font-weight-bold pr-3">Total</p>
                                                            <p class="h5 d-inline  frcurrency-mask total">Q 0.00</p>
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
        <div class="tab-pane fade" id="estado" role="tabpanel" aria-labelledby="estado-tab">
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
                    <textarea  class="form-control" id="ComentarioEstado" name="PlanDocumento" rows="5" disabled></textarea>
                </div>
            </div>
        </div>
    </div>    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat=  "server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
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
    <%: Scripts.Render("~/js/jsOrdenTrabajoSuplementario.js") %>
</asp:Content>
