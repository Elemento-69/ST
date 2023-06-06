<%@ Page Title="Revision de Estimaciones" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RevisionEstimaciones.aspx.cs" Inherits="Covialgt.Administracion.RevisionEstimaciones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <%: Styles.Render("~/DataTables/select.bootstrap4.min.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/wizard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Revision de Estimaciones</h1>
    <hr class="thick" />
      <div id="testDiv">
           
    </div>
    <div class="tab-content px-3" id="myTabContent">
        <div id="msform">
            <!-- progressbar -->
            <ul id="progressbar" style="transform: translateX(10%)">
                <li class="active" id="general">
                    <div class="icon">
                        <i class="fas fa-bars fa-3x"></i>
                    </div>
                    <div class="number">1</div>
                    <div class="text-strong">Revisar Estimaciónes</div>
                </li>
                <li id="alcance">
                    <div class="icon">
                        <i class="fas fa-retweet fa-3x"></i>
                    </div>
                    <div class="number">2</div>
                    <div class="text-strong">Gestión de Reparo</div>
                </li>
                <li id="componentes">
                    <div class="icon">
                        <i class="fas fa-file-alt fa-3x"></i>
                    </div>
                    <div class="number">3</div>
                    <div class="text-strong">Observaciónes</div>
                </li>
            </ul>
            <div class="row align-items-end justify-content-end">
                <div class="col-xl-4 col-lg-5 col-md-7 col-sm-8">
                    <label for="estados">Opciones de Estimación</label>
                    <select class="form-control font" id="estados" disabled>
                        <option value="0" class="d-none" disabled selected>Seleccionar Opción</option>
                        <option value="2">Marcar Estimación: Sin Reparo</option>
                        <option value="4">Marcar Estimación: Con Reparos</option>
                        <option value="3">Asignada a visor</option>
                        <option value="5">No procede, anterior con proceso de revisión</option>
                        <option value="24">Firma autorizada visa</option>
                        <option value="10">Imprimir</option>
                        <option value="0">TÉCNICO - Marcar Estimación a Estado: Presentado en Visa</option>
                    </select>
                </div>
                <div class="col-12 pt-3" id="text-title-revision"></div>
            </div>
            <fieldset>
                <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="estimaciones-tab" data-toggle="tab" data-bs-target="#estimaciones"
                            href="#estimaciones" role="tab" aria-controls="estimaciones" aria-selected="true">Estimaci&oacute;nes</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="detalles-tab" data-toggle="tab" data-bs-target="#detalles"
                            href="#detalles" role="tab" aria-controls="detalles" aria-selected="false">Detalles</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="sanciones-tab" data-toggle="tab" href="#sanciones"
                            role="tab" aria-controls="sanciones" aria-selected="false">Sanciones</a>
                    </li>
                </ul>
                <div class="tab-content p-3 border-0" id="tabestimacion" style="box-shadow: inherit;">
                    <div class="tab-pane fade show active" id="estimaciones" role="tabpanel" aria-labelledby="estimaciones-tab">
                        <p class="fw-medium">Seleccionar</p>
                        <div class="d-flex flex-wrap fw-medium bg-white pt-2 pb-3 border-custom rounded-lg">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customCheck1" name="tipo" value="1">
                                <label class="custom-control-label" for="customCheck1">Todas</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customCheck2" name="tipo" value="2" checked>
                                <label class="custom-control-label" for="customCheck2">En Revisión</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customCheck3" name="tipo" value="3">
                                <label class="custom-control-label" for="customCheck3">Reparadas</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customCheck4" name="tipo" value="4">
                                <label class="custom-control-label" for="customCheck4">En Sello de Visado</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customCheck5" name="tipo" value="24">
                                <label class="custom-control-label" for="customCheck5">Firma Autorizada Visa</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customCheck6" name="tipo" value="5">
                                <label class="custom-control-label" for="customCheck6">No Revisada</label>
                            </div>
                        </div>
                        <div class="table-responsive rounded-custom py-3">
                            <table class="table table-bordered rounded-custom w-100" id="table-cantidadAsociacion"></table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="detalles" role="tabpanel" aria-labelledby="detalles-tab">
                        <div class="table-responsive rounded-custom py-3">
                            <table class="table table-bordered rounded-custom w-100" id="table-detalles"></table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="sanciones" role="tabpanel" aria-labelledby="sanciones-tab">
                        <div class="table-responsive rounded-custom py-3">
                            <table class="table table-bordered rounded-custom w-100" id="table-sanciones"></table>
                        </div>
                    </div>
                    <div class="form-group col-12 text-right pt-4">
                        <button type="button" class="btn btn-primary btn-form next" id="step1-next">
                            Siguiente
                        </button>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <ul class="nav custom-nav mt-4" id="myTab2" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="reparos-tab" data-toggle="tab" data-bs-target="#reparos"
                            href="#reparos" role="tab" aria-controls="reparos" aria-selected="true">Reparos</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="observaciones-tab" data-toggle="tab" data-bs-target="#observaciones"
                            href="#observaciones" role="tab" aria-controls="estimaciones" aria-selected="false">Observaciones</a>
                    </li>
                </ul>
                <div class="tab-content p-3 border-0" id="tabreparos" style="box-shadow: inherit;">
                    <div class="tab-pane fade show active" id="reparos" role="tabpanel" aria-labelledby="reparos-tab">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-9">
                                        <label for="Departamento">Guía de Visado a Aplicar</label>
                                        <select class="form-control" id="guiaVisado" name="guiaVisado" placeholder="Ingresar Guia de visado a aplicar"></select>
                                    </div>
                                    <div class="col-3 d-flex align-items-end">
                                        <button class="btn btn-primary rounded-circle btn-sm mb-1" type="button" id="crear-reparo"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group custom-checkbox ml-3 col-md-6 col-lg-6">
                                    <input type="checkbox" class="custom-control-input" id="estimacionDesvanecida" name="estimacionDesvanecida">
                                    <label class="custom-control-label" for="estimacionDesvanecida">
                                        Marcar la última estimaci&oacute;n como desvanecida
                                    </label>
                                </div>
                            </div>
                            <div class="table-responsive rounded-custom py-3">
                                <table class="table table-bordered rounded-custom w-100" id="table-reparos"></table>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="observaciones" role="tabpanel" aria-labelledby="observaciones-tab">
                        <div class="table-responsive rounded-custom py-3">
                            <table class="table table-bordered rounded-custom w-100" id="table-reparos-observaciones"></table>
                        </div>
                    </div>
                    <div class="form-group col-12 text-right">
                        <button type="button" class="previous btn btn-outline-secondary btn-form  mb-3" id="step2-back">
                            Anterior
                        </button>
                        <button type="button" class="btn btn-primary next btn-form mb-3" id="step2-next">
                            Siguiente
                        </button>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <ul class="nav custom-nav mt-4" id="myTab3" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="reparos2-tab" data-toggle="tab"
                            href="#reparos2" role="tab" aria-controls="proyecto" aria-selected="true">Reparos</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="observaciones2-tab" data-toggle="tab"
                            href="#observaciones2" role="tab" aria-controls="documento" aria-selected="false">Observaciones</a>
                    </li>
                </ul>
                <div class="tab-content p-3 border-0" id="tabreparos2" style="box-shadow: inherit;">
                    <div class="tab-pane fade show active" id="reparos2" role="tabpanel" aria-labelledby="reparos2-tab">
                        <div class="row big-gutter">
                            <div class=" col-md-6  form-group">
                                <label for="requisito">Requisito</label>
                                <select class="form-control" id="requisito" name="requisito" placeholder=""></select>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="comentario">Comentario</label>
                                <textarea class="form-control" id="txtcomentario" name="txtcomentario" rows="8"></textarea>
                            </div>
                            <div class="col-md-12 text-end pt-2 pb-3">
                                <button type="button" class="btn btn-primary btn-form mb-3" id="crear-observacion">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="observaciones2" role="tabpanel" aria-labelledby="observaciones2-tab">
                        <div class="table-responsive rounded-custom py-3">
                            <table class="table table-bordered rounded-custom w-100" id="table-reparos-observaciones-edicion"></table>
                        </div>
                    </div>
                    <div class="form-group col-12 text-right">
                        <button type="button" class="previous btn btn-outline-secondary btn-form mb-3" id="step3-back">
                            Anterior
                        </button>
                        <button type="button" class="btn btn-primary btn-form mb-3" id="step3-next">
                            Finalizar
                        </button>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>

    <!-- modal de editar observacion ulitmo reparo -->
    <div class="modal" tabindex="-1" id="modalUltimoReparo">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="row p-4">
                        <div class=" col-lg-6  form-group" hidden>
                            <label for="requisito">Requisito</label>
                            <select class="form-control" id="requisito2" name="requisito2" placeholder=""></select>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="comentario">Comentario</label>
                            <textarea class="form-control" id="txtcomentario2" name="txtcomentario2" rows="8"></textarea>
                        </div>
                        <div class="col-md-12 text-right py-1">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">
                                Cancelar
                            </button>
                            <button type="button" class="btn btn-warning text-white" id="editar-observacion">
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/DataTables/select.bootstrap4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
    </script>
    <%: Scripts.Render("~/js/Administracion/jsRevisionEstimacion.js") %>
</asp:Content>
