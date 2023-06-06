<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AsociacionCantidadesTramos.aspx.cs" Inherits="Covialgt.Ejecucion.AsociacionCantidadesTramos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Asociación de cantidades-tramos</h1>
    <hr class="thick" />
    <div class="row mt-5">
        <div class="col-md-6">
            <h4>Asociación de cantidades-tramos proyecto:<%= ViewState["plan"] %> - <%= ViewState["proyecto"] %></h4>
        </div>
        <div class="col-md-3 text-center">
            <button type="button" id="btnImprimir" class="btn btn-light">
                <i class="fas fa-print fa-2x"></i>
            </button>
            <button type="button" class="btn btn-light">
                <i class="far fa-file-pdf fa-2x"></i>
            </button>
            <button type="button" class="btn btn-light">
                <i class="fas fa-tv fa-2x"></i>
            </button>
            
        </div>
        <div class="col-md-3 text-center">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
    </div>
     <div id="testDiv">
           
    </div>
    <div class="row mt-4">
        <div class="form-group col-md-5 col-lg-5">
            <label for="tramo">Escoja un tramo</label>
            <select class="form-control" id="Tramo" name="tramo"></select>
        </div>
        <div class="form-group col-md-2 col-lg-2">
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="region">Escoja un renglon</label>
            <select  class="form-control" id="Renglon" name="region"></select>
        </div>
    </div>
    <div class="row justify-content-around justify-content-md-between">
        <div class="col-md-4 col-sm-6">
            <div class="card border-info mb-3 mx-auto mx-sm-0" style="max-width: 11rem;">
                <button type="button" class="btn btn-light text-info">
                    <i class="fas fa-briefcase fa-2x"></i>
                </button>
                <div class="card-body text-info py-4">
                <p class="card-text text-center">CONTRATO: <span id="contratado-total">0</span> [GLOBAL]</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6">
            <div class="card border-warning mb-3 mx-auto mx-sm-0 ml-sm-auto mx-md-auto" style="max-width: 11rem;">
                <button type="button" class="btn btn-light text-warning">
                    <i class="fas fa-clipboard-list fa-2x"></i> 
                </button>
                <div class="card-body text-warning py-4">
                <p class="card-text text-center">ASIGNADO:  <span id="asignado-total">0</span> [GLOBAL]</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-6">
            <div class="card border-success mb-3 mx-auto mx-md-0 ml-md-auto" style="max-width: 11rem;">
                <button type="button" class="btn btn-light text-success">
                    <i class="fas fa-calendar-plus fa-2x"></i>
                </button>
                <div class="card-body text-success py-3">
                <p class="card-text text-center">PENDIENTE POR ASIGNAR: <span id="pendiente-total">0</span> [GLOBAL]</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="form-group col-md-5 col-lg-5">
            <label for="cantidad">Ingrese la Cantidad</label>
            <input type="text" class="form-control frdecimal6-mask" id="cantidad" name="cantidad">
        </div>
        <div class="form-group col-md-2 col-lg-2">
        </div>
        <div class="form-group col-md-5 col-lg-5">
        </div>
    </div>
    <div class="row text-right mt-2">
        <div class="form-group col-md-6 col-lg-5">
        </div>
        <div class="form-group col-md-6 col-lg-5 ml-md-auto">
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary btn-form" id="addCantidad-btn">AGREGAR</button>
                </div>
            </div>
        </div>
    </div>
    <hr class="pearator-line"/>
    <h5>Cantidades - Tramos</h5>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4 w-100" id="asociacion_table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Componente</th>
                    <th class="text-center">Código de Region</th>
                    <th class="text-center">Renglon</th>
                    <th class="text-center">Unidad</th>
                    <th class="text-center">Código Tramo</th>
                    <th class="text-center">Tramo</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-center">Ingresado</th>
                     <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
        </div>
    <div class="row text-right mt-2">
        <div class="form-group col-md-6 col-lg-5">
        </div>
        <div class="form-group col-md-6 col-lg-5 ml-md-auto">
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary btn-form">ACTUALIZAR</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
     <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        usuario = "<%= Session["usuario"] %>"
     </script>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <%: Scripts.Render("~/js/jsAsociacionCantidadTramo.js?v=1") %>
</asp:Content>
