<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RegistrosMensuales.aspx.cs" Inherits="Covialgt.Ejecucion.RegistrosMensuales" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
     <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Registros Mensuales</h1>
    <hr class="thick" />

    <div class="w-100"></div>
    <div class="form-group col-12 text-right">
        <button type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-form">
            Regresar
        </button>

    </div>
    <br />
    <h4>Registros Mensuales</h4>
    <br />
    <h5>Plan: <span id="plan"></span></h5>
    <h5>Proyecto: <span id="proyecto"></span></h5>
    <div class="row">
        <div class="form-group col-md-5 col-lg-5">
            <label for="componenteSelect">Componente</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="componenteSelect" name="componenteSelect">
            </select>
        </div>
        <div class="form-group col-md-5 col-lg-5 ml-md-auto">
            <label for="renglon">Renglon</label>
            <select class="form-control  for-remanente-renglon  for-remanente-tramo" id="renglon" name="renglon">
            </select>
        </div>
        <div class="form-group col-md-2 col-lg-2 ml-md-auto">
            <label for="remanenteRenglon">Remanente Renglon</label>
            <input type="text" class="form-control" id="remanenteRenglon" name="remanenteRenglon" value="0" disabled>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-5">
            <label for="tiposDeEjecucion">Tipo de Ejecución</label>
            <select class="form-control" id="tiposDeEjecucion" name="tiposDeEjecucion"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 ml-md-auto">
            <label for="Tramo">Tramo</label>
            <select class="form-control for-remanente-tramo" id="Tramo" name="Tramo"></select>
        </div>
        <div class="form-group col-md-2 col-lg-2 ml-md-auto">
            <label for="remanenteTramo">Remanente Tramo</label>
            <input type="text" class="form-control" id="remanenteTramo" name="remanenteTramo" value="0" disabled>
        </div>
    </div>
    <div class="row">
        <div class="form-group was-validated col-md-5 col-lg-5">
            <label for="estacionInicio">Estación de inicio</label>
            <input type="number" step="0.01" class="form-control estacion-control" id="estacionInicio" name="estacionInicio" required>
        </div>
        <div class="form-group was-validated col-md-5 col-lg-5 ml-md-auto">
            <label for="estacionFinal">Estación Final</label>
            <input type="number" step="0.01" class="form-control estacion-control" id="estacionFinal" name="estacionFinal" required>
        </div>
        <div class="form-group col-md-2 col-lg-2 ml-md-auto">
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-5">
            <label for="lado">Lado</label>
            <select type="text" class="form-control" id="lado" name="lado">
                <option>TOTAL</option>
                <option>IZQUIERDO</option>
                <option>DERECHO</option>
            </select>
        </div>
        <div class="form-group was-validated col-md-5 col-lg-5 ml-md-auto">
            <label for="distanciaEje">Distancia del eje</label>
            <input type="number" step="0.01" class="form-control" id="distanciaEje" name="distanciaEje" required>
        </div>
        <div class="form-group col-md-2 col-lg-2 ml-md-auto">
        </div>
    </div>
    <hr class="pearator-line"/>
    <h5  id="Uni">General</h5>
    <div class="row">
        <div class="col-5">
            <div class="card card0">
                <div class="card card1">
                    <div class="row justify-content-center my-auto">
                        <div class="col-md-12 col-12">
                            <div class="row container">
                                <div class="col-lg-8 col-md-11 my-auto">
                                    <img src="../Images/excavacion.png" alt="Alternate Text" class="img-fluid" id="imageTipo" />
                                </div>
                                <div class="col-lg-4 col-md-1 my-5">
                                    <div class="row" id="variables-container">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5">
            <div class="form-group">
                <label for="cantidadEjecutada">Cantidades Ejecutadas</label>
                <input type="text" class="form-control" id="cantidadEjecutada" disabled name="cantidadEjecutada">
                <div class="mt-3">
                    <div class="form-group">
                        <label for="desde">Fecha</label>
                        <div class="input-group date" id="fecha-general" data-target-input="nearest">
                            <input type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#fecha-general">
                            <div class="input-group-append" data-target="#fecha-general" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Observaciones</label>
                    <textarea class="form-control" id="Observaciones" rows="3"></textarea>
                </div>
                <div class="text-right">
                    <button type="button" class="btn  btn-primary btn-form" id="btn-guardar-detalle">GUARDAR</button>
                </div>
            </div>
        </div>
        <div class="col-2"></div>
    </div>
   <%-- <div class="row align-items-end">
        <div class="col-md-3 col-lg-2">
            <div class="form-group ">
                <label for="desde">Fecha</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desde" type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#desde-dp">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-1 text-center">
            <label class="pb-3" for="desde">Al</label>
        </div>
        <div class="col-md-3 col-lg-2">
            <div class="form-group was-validated">
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control datetimepicker-input" data-target="#hasta-dp">
                    <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4"  id="detalleestimaciones-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Componente</th>
                    <th class="text-center">Renglon</th>
                    <th class="text-center">Tramo</th>
                    <th class="text-center">Estación Inicial</th>
                    <th class="text-center">Estación Final</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-center">Fecha</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
        </div>
     <div class="text-right">
          <button class="btn  btn-primary btn-form" hidden>ACTUALIZAR</button>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
     <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        usuario = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsRegistroMensual.js?v=1") %>
</asp:Content>
