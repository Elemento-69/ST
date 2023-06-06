<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProgramacionFisicaProyecto.aspx.cs" Inherits="Covialgt.Ejecucion.ProgramacionFisicaProyecto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/wizard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
 
   
    <h1>Programacion Fisica Proyecto</h1>
    <hr class="thick"/>
       <div class="w-100"></div>
                <div class="form-group col-12 text-right">
                    <button type="button" id="btnRegresarRegistroDatos" class="btn btn-secondary btn-form">
                        Regresar
                    </button>
                   
      </div>
    <br />
    <div class="row">
        <div class="form-group col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <label for="componente">Componente</label>
            <select class="form-control" id="componente" name="componente">
            </select>
        </div>
       <%-- <div class="col-12">
            <label>Programa:</label>
        </div>
        <div class="form-group col-sm-5 col-md-3">
            <div class="custom-control custom-radio pl-4">
                <input type="radio" class="custom-control-input" checked id="planVigente" name="plan">
                <label class="custom-control-label text-nowrap" for="planVigente">Plan Vigente</label>
            </div> 
        </div>
        <div class="form-group col-sm-6 col-md-3">
            <div class="custom-control custom-radio pl-4">
                <input type="radio" class="custom-control-input" id="planOriginal" name="plan">
                <label class="custom-control-label text-nowrap" for="planOriginal">Plan Original</label>
            </div> 
        </div>--%>
           
        <div class="col-12"></div>
        <h5 class="col-12 mt-3">Año: <%= ViewState["plan"] %> Proyecto: <%= ViewState["proyecto"] %></h5>
        <div class="col-12">
             <div class="w-100"></div>
                <div class="form-group col-12 text-right">
                    <button type="button" id="btnActualizarProgramacion" class="btn btn-info btn-form">
                        ACTUALIZAR PROGRAMACIÓN ACTUAL
                    </button>
                   
                </div>
               <div class="w-100"></div>
                <div class="form-group col-12 text-right">
                    <button type="button" id="btnGuardarProgramacion" class="btn btn-primary btn-form">
                        GUARDAR NUEVA PROGRAMACIÓN
                    </button>
                </div>
        <div class="table-responsive mt-5">
            <table class="table table-bordered" id="renglones-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                          <th class="text-center"></th>
                        <th class="text-center">Renglon</th>
                        <th class="text-center">Descripción</th>
                        <th class="text-center">Unidad</th>
                        <th class="text-center">Cantidad Original</th>
                        <th class="text-center">Cantidad Vigente</th>
                        <th class="text-center">Cantidad Programada</th>
                        <th class="text-center">Diferencia</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        </div>
     
    </div>
    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Detalle de Programación de Renglón</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div id="bodyModalPeriodos" class="modal-body">
            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="detalle_renglones-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">Correlativo</th>
                            <th class="text-center">Periodo Desde</th>
                            <th class="text-center">Periodo Hasta</th>
                            <th class="text-center">Valor del Períoido</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-right">
                <button type="button" class="btn  btn-primary btn-form" id="update_modal-btn">ACEPTAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <%--Modal2--%>
      <div class="modal fade bd-example-modal-lg" id="exampleModalCenterPreview" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitlePreview">Detalle de Programación de Renglón</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div id="bodyModalPeriodosPreview" class="modal-body">
            <div class="table-responsive mt-5">
                <table class="table table-bordered" id="detalle_renglones-tablePreview">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">No. Periodo</th>
                            <th class="text-center">Cantidad Programada</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
          </div>
          <div class="modal-footer">
            <div class="text-right">
                <%--<button type="button" class="btn  btn-primary btn-form" id="update_modal-btnPreview">ACEPTAR</button>--%>
            </div>
          </div>
        </div>
      </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
   


    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        user = "<%= Session["usuario"] ?? "null" %>"
    </script>
    <%: Scripts.Render("~/js/jsProgramacionFisicaProyecto.js") %>

</asp:Content>
