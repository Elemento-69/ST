<%@ Page Title="Traslado de Estimaciones" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TrasladoEstimaciones.aspx.cs" Inherits="Covialgt.Administracion.TrasladoEstimaciones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
    <style>
        .dataTables_wrapper .dataTables_paginate .paginate_button, .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
            color: #a9a9a9 !important;
        }
        .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
            color: black !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Traslado de Estimaciones</h1>
    <hr class="thick" />
    <div class="row mt-5 justify-content-between">
        <div class="col-md-12 col-lg-6">
            <label for="Descripcion">Traslado</label>
            <div class="d-flex">
                <input type="text" class="form-control" id="search-traslado" name="search-traslado">
                <button type="button" class="btn btn-primary ml-2" id="btn-search-traslado">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
        <div class="col-sm-2 col-lg-4 text-right mt-2 mt-lg-0 text-center">
            <button type="button" class="btn btn-outline-dark print-button" id="btnImprimir">
                <i class="fas fa-print fa-2x"></i>
                <br />
                Imprimir
            </button>
        </div>
    </div>
    <div id="testDiv">
           
    </div>
    <div class="row mt-2 justify-content-end">
        <div class="col-md-4 text-center">
            <a href="#" data-toggle="modal" class="px-5 btn btn-primary text-uppercase my-3"
                data-target="#trasladoEstimacionesModal" id="btn-add-traslado">Agregar
            </a>
        </div>
    </div>
    <div class="row mt-2 justify-content-end">
        <div class="col-md-4 text-center">
            <a href="#" data-toggle="modal" class="px-5 btn btn-primary text-uppercase my-3"
                id="btn-edit-traslado">Editar
            </a>
        </div>
    </div>
    <div class="table-responsive mt-2 w-100">
        <table id="table-traslado" class="table table-bordered table-hover w-100"></table>
    </div>

    <!-- modal de consulta estimaciones -->
    <div class="modal" tabindex="-1" id="trasladoEstimacionesModal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="trasladoEstimacionesModalLabel">Traslado de Estimaciones</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-3 mt-4 text-lg-right">
                                <p>Fecha de Traslado</p>
                            </div>
                            <div class="col-lg-3 mt-lg-3">
                                <div class="form-group">
                                    <div class="input-group date" id="desdeBusqueda-dp" data-target-input="nearest">
                                        <input id="desdeBusqueda" type="text" name="desdeBusqueda" autocomplete="off" class="form-control">
                                        <div class="input-group-append" data-target="#desdeBusqueda-dp" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 mt-4 text-lg-right">
                                <p>Estimación</p>
                            </div>
                            <div class="col-lg-3 mt-lg-3">
                                <div class="form-group">
                                    <select class="form-control" id="estimacion-tras-add-select"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 text-lg-right">
                                <p class="mt-2">Termino de Busqueda</p>
                            </div>
                            <div class="col-lg-7">
                                <input type="text" class="form-control" id="search-add-traslado" name="nombreEmpresa">
                            </div>
                            <div class="col-lg-2 pt-2 pt-lg-0">
                                <button type="button" class="btn btn-primary" id="search-btn-traslado-add">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <hr class="solid-line" />
                        <h4 class="mt-4">
                            <b>Documentos de Cobros a Trasladar</b>
                        </h4>
                        <div class="w-100">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover mt-4 w-100" id="trasladar-items"></table>
                            </div>
                            <div class="text-right">
                                <p class="my-1">Incluir a Traslado</p>
                                <a href="#" data-toggle="modal" class="px-5 btn btn-primary text-uppercase my-1"
                                    data-target="#TrasladoEstimacionesModal" id="add-traslado-items-save">Agregar
                                </a>
                            </div>
                        </div>
                        
                        <h4 class="mt-4">
                            <b>Documentos de Cobro a Incluir en el Traslado</b>
                        </h4>
                        <div class="w-100">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover mt-4 w-100" id="traslado-items-save"></table>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="my-1">Guardar Documento en el Traslado</p>
                            <a href="#" data-toggle="modal" class="px-5 btn btn-primary text-uppercase my-1" id="save-trasladar"
                                data-target="#TrasladoEstimacionesModal">Guardar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal de consulta estimaciones -->
    <div class="modal" tabindex="-1" id="estimacionDetalle">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detalle de Estimaci&oacute;n</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-2 col-md-2 col-lg-2 text-right">
                            <p class="mt-2">Traslado</p>
                        </div>
                        <div class="col-sm-8 col-md-8 col-lg-3">
                            <input type="text" class="form-control" id="traslado-detalle-input" name="traslado-detalle-input" readonly>
                        </div>
                        <div class="col-sm-2 col-md-2 col-lg-1">
                            <button type="button" class="btn btn-primary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <div class="col-sm-2 col-md-2 col-lg-1 text-right">
                             <p class="mt-2">Estimaci&oacute;n</p>
                        </div>
                        <div class="col-sm-10 col-md-10 col-lg-3">
                             <input type="text" class="form-control" id="estimacion-traslado-detalle" name="estimacion-traslado-detalle">
                        </div>
                        <div class="col-lg-2"></div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-sm-3 col-md-2 col-lg-2 text-right">
                            <p class="mt-2">Proyecto</p>                           
                        </div>
                        <div class="col-sm-9 col-md-10 col-lg-3">
                            <input type="text" class="form-control" id="proyecto-traslado-detalle" name="proyecto-traslado-detalle">                           
                        </div>
                        <div class="col-sm-0 col-md-0 col-lg-1">
                        </div>
                        <div class="col-sm-3 col-md-2 col-lg-1 text-right">
                            <p class="mt-2">Año</p>
                        </div>
                        <div class="col-sm-9 col-md-10 col-lg-3">
                            <input type="text" class="form-control" id="anio-traslado-detalle" name="anio-traslado-detalle">
                        </div>
                        <div class="col-lg-2"></div>
                    </div>
                    <hr class="solid-line mt-4" />
                    <div class="col-12">
                        <div class="table-responsive py-4">
                            <table class="table table-bordered table-hover mt-4 w-100" id="table-traslado-detalle"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

      <!-- modal de edicion traslado -->
    <div class="modal" tabindex="-1" id="trasladoEdicionEstimacionesModal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title" id="trasladoEdicionEstimacionesModalLabel">Traslado de Estimaciones</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-3 mt-4 text-lg-right">
                                <p>Fecha de Traslado</p>
                            </div>
                            <div class="col-lg-3 mt-lg-3">
                                <div class="form-group">
                                    <div class="input-group date" id="desdeBusquedaEdicion-dp" data-target-input="nearest">
                                        <input id="desdeBusquedaEdicion" type="text" name="desdeBusquedaEdicion" autocomplete="off" class="form-control">
                                        <div class="input-group-append" data-target="#desdeBusquedaEdicion-dp" data-toggle="datetimepicker">
                                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 mt-4 text-lg-right">
                                <p>Estimación</p>
                            </div>
                            <div class="col-lg-3 mt-lg-3">
                                <div class="form-group">
                                    <select class="form-control" id="estimacionEdicion-tras-add-select"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-lg-3 text-lg-right">
                                <p class="mt-2">Termino de Busqueda</p>
                            </div>
                            <div class="col-lg-7">
                                <input type="text" class="form-control" id="search-add-trasladoEdicion" name="nombreEmpresa">
                            </div>
                            <div class="col-lg-2 pt-2 pt-lg-0">
                                <button type="button" class="btn btn-primary" id="search-btn-trasladoEdicion-add">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <hr class="solid-line" />
                        <div class="col-12">
                        <h4 class="mt-4">
                            <b>Documentos agregados al traslado</b>
                        </h4>
                        <div class="table-responsive py-4">
                            <table class="table table-bordered table-hover mt-4 w-100" id="table-traslado-detalleEdit"></table>
                        </div>
                        </div>
                        <h4 class="mt-4">
                            <b>Documentos de Cobros a Trasladar</b>
                        </h4>
                        <div class="w-100">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover mt-4 w-100" id="trasladarEdicion-items"></table>
                            </div>
                            <div class="text-right">
                                <p class="my-1">Incluir a Traslado</p>
                                <a href="#" data-toggle="modal" class="px-5 btn btn-primary text-uppercase my-1"
                                    data-target="#TrasladoEdicionEstimacionesModal" id="add-trasladoEdicion-items-save">Agregar
                                </a>
                            </div>
                        </div>
                        
                        <h4 class="mt-4">
                            <b>Documentos de Cobro a Incluir en el Traslado</b>
                        </h4>
                        <div class="w-100">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover mt-4 w-100" id="trasladoEdicion-items-save"></table>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="my-1">Guardar Documento en el Traslado</p>
                            <a href="#" data-toggle="modal" class="px-5 btn btn-primary text-uppercase my-1" id="save-trasladarEdicion"
                                data-target="#TrasladoEdicionEstimacionesModal">Guardar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
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
        entidad = "<%= Session["entidad"] %>";
    </script>
    <%: Scripts.Render("~/js/Administracion/TrasladoEstimaciones.js") %>
</asp:Content>
