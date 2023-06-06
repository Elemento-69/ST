<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmActaInicio.aspx.cs" Inherits="Covialgt.ActaInicio.frmActaInicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<h1>Solicitudes Acta de Inicio</h1>
    <div class="col-12">
        <button type="button" id="btnNuevaSolicitud" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-plus"></i>Nueva Solicitud</button>
        <div id="NoSupervisor" class="d-none"> <!--class="d-none"-->
            <div class="col-12">
                  <div class="form-group col-md-5 col-lg-5">
                  <label for="planSelect">Plan Anual</label>
                  <select class="form-control cplanSelect" id="planSelect" name="planSelect"></select>
                  </div>
            </div>
            <div class="col-12">
                 <div class="form-group col-md-5 col-lg-5">
                 <label for="proyectoSelect">Proyecto</label>
                 <select class="form-control cproyectoSelect" id="proyectoSelect" name="proyectoSelect"></select>
                 </div>
            </div>
            <div class="col-12">
                 <div class="form-group col-md-5 col-lg-5">
                 <label for="estadoselect">Estado Acta</label>
                 <select class="form-control Cestadoselect" id="estadoselect" name="estadoselect"></select>
                 </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="actainicio-table">
                <thead>
                    <tr><th class="spacer"></th>
                        <th class="text-center">Codigo</th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Proyecto</th>
                        <th class="text-center">Fecha Creación</th>
                        <th class="text-center">Observaciones</th>
                        <th class="text-center">Estado</th>
                        <th class="text-center">Acciones</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>  
    <!--Inicia Modal elejir super o ejecución -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">NUEVA SOLICITUD</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" value="1" id="Contratista" checked><label class="form-check-label" for="Contratista">ACTA CONTRATISTA</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" value="2" id="Supervision" ><label class="form-check-label" for="Contratista">ACTA SUPERVISIÓN</label>
              </div>
       </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="tbnNuevaActa">ACEPTAR</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">CANCELAR</button>
      </div>
    </div>
  </div>
</div>

    <!--Fin Modal elejir super o ejecución -->
<!--Modal para ver contenido del acta si tiene observaciones aquí se mostraran -->
 <div class="modal fade" id="ModalRevisarActaObservaciones" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">OBSERVACIONES ACTA DE INICIO</h5>
          <input type="text" name="CodActa" id="CodActaObservacion" class="btn btn-primary px-5 btn-sm" style="display:none">
          <input type="text" name="AnioActa" id="AnioActaObservacion" class="btn btn-primary px-5 btn-sm" style="display:none">
          <input type="text" name="ProyectoActa" id="ProyectoActaObservacion" class="btn btn-primary px-5 btn-sm" style="display:none">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="col-xl-12">
                           <!--<textarea class="form-control" id="DescripcionBitacoraComentar" rows="5" disabled></textarea>-->
                            <iframe name="TextoVistaActaObservaciones" id="TextoVistaActaObservaciones" style="width: 1075px; height:700px;">
                            </iframe>
                        </div>
      </div>
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-secondary" id="btncancelar" data-dismiss="modal">IMPRIMIR</button>-->
      </div>
        <div class="col-xl-12" id="contenedorobservaciones" style="display:none">
                           <!--<textarea class="form-control" id="DescripcionBitacoraComentar" rows="5" disabled></textarea>-->
                            <textarea name="observacion" id="observacion" rows="10" cols="118">Ingrese las observaciones por las que el acta fue rechazada</textarea>
            <div class="col-xl-4">
                <button type="button" id="btnCancelarObservacion" class="btn btn-secondary">CENACELAR</button>
                <button type="button" id="btnAgregarObservacion" class="btn btn-primary">AGREGAR</button>
            </div>
                        </div>
      
    </div>
  </div>
</div>
<!-- -->
    <div class="row big-gutter">
        <div id="testDiv"></div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script>
        base_url = '<%= ViewState["baseURL"] %>'
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        usuario = "<%= Session["usuario"] %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/ActaInicio/jsActaInicio.js?a=0") %>
    <style>
        body {
  font: 90%/1.45em "Helvetica Neue", HelveticaNeue, Verdana, Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #fff;
}
</style>
</asp:Content>

