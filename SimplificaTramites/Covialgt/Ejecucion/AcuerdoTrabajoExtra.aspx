<%@ Page Title="ATE" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AcuerdoTrabajoExtra.aspx.cs" Inherits="Covialgt.Ejecucion.AcuerdoTrabajoExtra" %>
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
    <h2>Acuerdo de Trabajo Extras (ATE)</h2>
    <div class="card custom-card border-0">
        <div class="card-body">
            <div id="msform">
                <!-- progressbar -->
                <ul id="progressbar">
                    <li class="active" id="general-wiz-header">
                        <div class="icon">
                            <i class="fas fa-file-alt fa-3x"></i>
                        </div>
                        <div class="number">1</div>
                        <div class="text-strong">Datos Generales</div>
                    </li>
                    <li id="renglones-wiz-header">
                        <div class="icon">
                            <i class="fa fa-window-maximize fa-3x"></i>
                        </div>
                        <div class="number">2</div>
                        <div class="text-strong">Renglones</div>
                    </li>
                    <li id="componentes-renglones-wiz-header">
                        <div class="icon">
                            <i class="fas fa-bars fa-3x"></i>
                        </div>
                        <div class="number">3</div>
                        <div class="text-strong">Componentes - Renglones</div>
                    </li>
                    <li id="tramos-wiz-header">
                        <div class="icon">
                            <i class="fas fa-file-alt fa-3x"></i>
                        </div>
                        <div class="number">4</div>
                        <div class="text-strong">Renglones - Tramos</div>
                    </li>
                </ul>
                <!-- fieldsets -->
                <div id="wizzard-content" class=" mx-md-2 mx-xl-5">
                    <fieldset>
                        <div class="row justify-content-between">
                            <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                                <label for="Plan">Plan</label>
                                <input type="text" class="form-control" id="Plan" name="Plan" value="<%= Session["plan"] %>" disabled>                                    
                             </div>
                            <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                                <label for="Proyecto">Proyecto</label>
                                <input type="text" class="form-control" id="Proyecto" name="Proyecto" value="<%= Session["proyecto"] %>" disabled>                                    
                            </div>
                            <div class="form-group col-12 col-md-6  pr-md-4 pr-xl-5">
                                <label for="TipoDocumento">Tipo de Documento</label>
                                <input type="text" class="form-control" id="TipoDocumento" name="TipoDocumento" disabled 
                                    value="Acuerdo de trabajo extra (ATE)">                                     
                            </div>
                            <div class="col-12 col-md-6  pl-md-4 pl-xl-5">
                                <div class="row">
                                    <div class="col-sm-6 pr-lg-4">
                                        <div class="form-group">
                                            <label for="FechaPresentacion" class="text-nowrap">Fecha Presentaci&oacute;n</label>
                                            <div class="input-group date" id="FechaPresentacion-dp" data-target-input="nearest">
                                                <input id="FechaPresentacion"  data-target="#FechaPresentacion-dp" type="text"
                                                    class="form-control datetimepicker-input"> 
                                                <div class="input-group-append" data-target="#FechaPresentacion-dp" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-6 pl-lg-4">
                                        <label for="Clausula">Clausula</label>
                                        <input type="text" class="form-control" id="Clausula" name="Clausula">                                    
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="Justificación">Justificacion</label>
                                <textarea class="form-control" id="Justificacion" name="Justificacion" rows="8"></textarea>
                            </div>
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
                                <button type="button" id="btnPaso1" class="btn btn-primary btn-form next" >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row justify-content-between">
                            <div class="col-12">
                                <h4>Insertar Renglones</h4>
                            </div>
                            <div class="form-group col-12">
                                <label for="Renglon">Rengl&oacute;n</label>
                                <select class="form-control" id="Renglon" name="Renglon">
                                </select>
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="add_renglon-btn">Insertar</button>
                            </div>
                            <div class="col-12 pt-3">
                                <hr />
                                <h2><span class="title-bg px-3">Renglones del Proyecto</span></h2>
                            </div>
                            <div class="w-100"></div>
                            <div class="table-responsive mt-5">
                                <table class="table table-bordered" id="renglon_selected-table">
                                    <thead>
                                        <tr>
                                            <th class="spacer"></th>
                                            <th></th>
                                            <th>Id</th>
                                            <th>Descripci&oacute;n</th>
                                            <th class="spacer"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="form-group col-12 text-right">
                                <button type="button" class="previous btn btn-outline-secondary btn-form mb-3">
                                    Anterior
                                </button>
                                <button type="button" id="btnPaso2" class="btn btn-primary next btn-form mb-3">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row" id="asociarRenglonRow">
                            <div class="col-12">
                                <h4>Asociar Rengl&oacute;n Componente</h4>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="Componente-set">Componente</label>
                                <select class="form-control" id="Componente-set" name="Componente">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="Renglon-set">Rengl&oacute;n</label>
                                <select class="form-control" id="Renglon-set" name="Renglon">
                                </select>
                            </div>
                            <div class="form-group col-md-5 col-lg-4 col-xl-3">
                                <label for="Precio">Precio Unitario</label>
                                <input type="text" class="form-control frcurrency-mask" id="Precio" name="Precio"
                                    data-submitbutton="#renglon-add_btn">
                            </div>
                            <div class="form-group col-md-5 offset-md-2 col-lg-4 offset-lg-3 col-xl-3 offset-xl-4">
                                <label for="Cantidad">Cantidad</label>
                                <input type="text" class="form-control frdecimal-mask" id="CantidadRenglon" name="Cantidad"
                                    data-submitbutton="#renglon-add_btn">
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="renglon-add_btn">Insertar</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                                <hr/>
                                <h2><span class="title-bg">Asociación de Renglones</span></h2>
                            </div>
                            <div class="w-100"></div>
                            
                            <div class="table-responsive mt-5">
                                <table class="table table-bordered" id="asociacion_renglon-table">
                                    <thead>
                                        <tr>
                                            <th class="spacer"></th>
                                            <th></th>
                                            <th>Componente</th>
                                            <th>Rengl&oacute;n</th>
                                            <th class="text-right">P. Unitario</th>
                                            <th class="text-right">Cantidad</th>
                                            <th class="text-right">Subtotal</th>
                                            <th class="spacer"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td class="border-0" ></td>
                                            <td colspan="6" class="border-0">
                                                <div class="row">
                                                    <div class="col-12 text-right h5">
                                                        <p class="font-weight-bold mr-5 d-inline">Total</p>
                                                        <p class="d-inline total frcurrency-mask"></p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div class="form-group col-12 text-right pt-5">
                                <button type="button" class="previous btn btn-outline-secondary btn-form mb-3">
                                    Anterior
                                </button>
                                <button type="button" id="btnPaso3" class="btn btn-primary next btn-form mb-3">
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row">
                            <div class="col-12">
                                <h4>Asociar Rengl&oacute;n Tramo</h4>
                            </div>
                            <div class="form-group col-md-5">
                                <label for="Componente2">Componente</label>
                                <select class="form-control" id="Componente-tramo" name="Componente2">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="Renglon-tramo">Rengl&oacute;n</label>
                                <select class="form-control" id="Renglon-tramo" name="Renglon2">
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="Tramos">Tramo</label>
                                <select class="form-control" id="Tramos"></select>
                            </div>
                            <div class="form-group col-md-5 col-lg-4  col-xl-3">
                                <label for="Cantidad">Cantidad</label>
                                <input type="text" class="form-control frdecimal-mask" id="Cantidad" name="Cantidad">
                            </div>
                            <div class="col-12 text-right pt-5">
                                <button type="button" class="btn btn-primary btn-form" id="asociarTramo-btn">Insertar</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="col-12 pt-3">
                                <hr />
                            </div>
                            <h2><span class="title-bg">Asociaci&oacute;n de Tramos</span></h2>
                            <p class="w-100 text-danger text-center mt-3">Componente: COMPONENTE ÚNICO; Rengl&oacute;n: <span id="renglon_select-desc"></span>; Cantidad Total: <span id="cant_reng-desc"></span></p>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="tramos_asociation-table">
                                    <thead>
                                        <tr>
                                            <th class="spacer"></th>
                                            <th></th>
                                            <th>Componente</th>
                                            <th>Rengl&oacute;n</th>
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
                                            <td class="border-0" ></td>
                                            <td colspan="7" class="border-0">
                                                <div class="row">
                                                    <div class="col-12 text-right h5">
                                                        <p class="font-weight-bold mr-5 d-inline">Total</p>
                                                        <p class="d-inline frcurrency-mask" id="asociacion_tramo-total"></p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
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
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
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
    <%: Scripts.Render("~/js/jsAcuerdoTrabajoExtra.js") %>
</asp:Content>
