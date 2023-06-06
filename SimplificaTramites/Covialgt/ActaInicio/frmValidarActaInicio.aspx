<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmValidarActaInicio.aspx.cs" Inherits="Covialgt.ActaInicio.frmValidarActaInicio" %>
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
	<h1>BUSCAR ACTAS DE INICIO POR PORYECTO</h1>
    <div id="card-datos-proyecto" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >  
        <h5>PROYECTO</h5>
    <div class="card-body" >
        <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <input type="text" id="IdBitacora" name="idBitacora" class="btn btn-primary px-5 btn-sm" style="display:none">
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
    </div>

        <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="estadoacta">Estado Actas</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="estadoacta" name="estadoacta"></select>
        </div>
      </div>
   <!--
        <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
      </div>

    -->  
     
    </div>
  </div>
      <div id="card-tabla-solicitudes" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >  
    <div class="card-body" >
        
   <h1>Solicitudes</h1>
    <div class="col-12">
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="validaractainicio-table">
                <thead>
                    <tr><th class="spacer"></th>
                        <th class="text-center">Codigo</th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Proyecto</th>
                        <th class="text-center">Fecha Creación</th>
                        <th class="text-center">Fecha Modificación</th>
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
    </div>
  </div>


    <div class="row">

 <div class="modal fade" id="ModalRevisarActa" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">VISTA ACTA DE INICIO</h5>
          <input type="text" name="CodActa" id="CodActa" class="btn btn-primary px-5 btn-sm" style="display:none">
          <input type="text" name="AnioActa" id="AnioActa" class="btn btn-primary px-5 btn-sm" style="display:none">
          <input type="text" name="ProyectoActa" id="ProyectoActa" class="btn btn-primary px-5 btn-sm" style="display:none">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="col-xl-12">
                           <!--<textarea class="form-control" id="DescripcionBitacoraComentar" rows="5" disabled></textarea>-->
                            <iframe name="TextoVistaActa" id="TextoVistaActa" style="width: 1075px; height:700px;">
                            </iframe>
                        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btncancelar" data-dismiss="modal">REGRESAR</button>
          <button type="button" id="btnRechazarActa" class="btn btn-danger">RECHAZAR ACTA</button>
        <button type="button" id="btnIngresar" class="btn btn-primary">APROBAR</button>
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
                       
                    </div>
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
    <%: Scripts.Render("~/js/ActaInicio/jsValidarActaInicio.js") %>
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

