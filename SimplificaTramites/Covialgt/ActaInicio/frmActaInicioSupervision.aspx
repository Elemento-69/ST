<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmActaInicioSupervision.aspx.cs" Inherits="Covialgt.ActaInicio.frmActaInicio" %>
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
	<h1>ACTA DE INICIO SUPERVISION</h1>
    <div id="card-datos-proyecto" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >  
        <h5>PROYECTO</h5>
    <div class="card-body" >
        <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <input type="text" id="ID" name="ID" class="btn btn-primary px-5 btn-sm" style="display:none">
                  <input type="text" class="form-control" id="anioSelect" placeholder="2019">

        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect"></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="proyectoSelect" name="proyectoSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Tramos</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="tramosSelect" name="tramosSelect"></select>
        </div>
      </div>
        <div class="form-row">
      <div class="col-md-4 mb-3">
          <label for="regional">Regional</label>
          <input type="text" class="form-control" id="regional" placeholder="regional" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>

      <div class="col-md-4 mb-3">
          <label for="validationServer02">Delegado Residente</label>
          <input type="text" class="form-control" id="delegado" placeholder="Delegado Residente" required>
          <div class="valid-feedback">
            Looks good!
      </div>
    </div>
      <div class="col-md-2 mb-3">
      <label for="timepoProyecto">Tiempo del Proyecto</label>
      <input type="text" class="form-control" id="tiempoProyecto" placeholder="Tiempo" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
            <div class="col-md-2 mb-3">
                <br />
                <br />
               Meses
         </div>
        </div>
    </div>
  </div>
  
    <div id="card-datos-empresa" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >     
        <h5>EMPRESA SUPERVISORA</h5>
    <div class="card-body" >
        <div class="row">
            <div class="col-md-4 mb-3">
          <label for="empresaSuper">Empresa</label>
          <input type="text" class="form-control" id="empresaSuper" placeholder="Empresa" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
            <div class="col-md-2 mb-3">
          <label for="proyectoSuper">Proyecto Supervision</label>
          <input type="text" class="form-control" id="proyectoSuper" placeholder="S-001" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
              <div class="col-md-2 mb-3">
          <label for="AnioproyectoSuper">Año Proyecto Supervision</label>
          <input type="text" class="form-control" id="AnioproyectoSuper" placeholder="2022" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
        </div>
     <div class="form-row">
      <div class="col-md-4 mb-3">
          <label for="representante">Representante Empresa</label>
          <input type="text" class="form-control" id="representante" placeholder="Representante" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
      <div class="form-group col-md-5 col-lg-5">
            <label for="PuestoSelect">Puesto</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="PuestoSelect" name="PuestoSelect">
            <option value="1">Propietario</option>
            <option value="2">Representante</option>
            <option value="2">Mandatario</option>
            </select>
        </div>
        </div>
    </div>
  </div>

  <div id="card-datos-acta" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >  
      <h5>ACTA</h5>
    <div class="card-body" >
     <div class="form-row">
      <div class="col-md-2 mb-3">
          <label for="validationServer01">Número</label>
          <input type="text" class="form-control" id="numeroActa" placeholder="001" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
         <div class="col-md-2 mb-3">
          <label for="validationServer01">Año</label>
          <input type="text" class="form-control" id="anioActa" placeholder="2022" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
         <div class="col-md-2 mb-3">
          <label for="validationServer01">Hora</label>
          <input type="text" class="form-control" id="horaActa" placeholder="9:00" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
       <div class="col-md-2 mb-3">
          <label for="validationServer01">Fecha</label>
          <input type="date" class="form-control" id="fechaActa" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
       <div class="col-md-3 mb-3">
          <label for="clausula">Clausula</label>
          <input type="text" class="form-control" id="clausula" placeholder="CUARTA" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
   
  </div>
 </div>
</div>
     <div id="card-datos-contrato" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >  
      <h5>CONTRATO</h5>
    <div class="card-body" >
     <div class="form-row">
      <div class="col-md-2 mb-3">
          <label for="numeroContrato">Número</label>
          <input type="text" class="form-control" id="numeroContrato" placeholder="001" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
         <div class="col-md-2 mb-3">
          <label for="anioContrato">Año</label>
          <input type="text" class="form-control" id="anioContrato" placeholder="2022" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
       <div class="col-md-2 mb-3">
          <label for="fechaContrato">Fecha</label>
          <input type="date" class="form-control" id="fechaContrato" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div> 
        <div class="col-md-2 mb-3">
          <label for="numeroAcuerdo">Acuerdo Ministerial</label>
          <input type="text" class="form-control" id="numeroAcuerdo" placeholder="997" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
         <div class="col-md-2 mb-3">
          <label for="AnioAcuerdo">Año Acuerdo Ministerial</label>
          <input type="text" class="form-control" id="AnioAcuerdo" placeholder="2022" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
      <div class="col-md-2 mb-3">
          <label for="fechaAcuerdo">Fecha Acuerdo Ministerial</label>
          <input type="date" class="form-control" id="fechaAcuerdo" required>
          <div class="valid-feedback">
            Looks good!
          </div>
      </div>
  </div>
 </div>
</div>
    <div class="row">
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalVistaPrevia" id="btnVistaPrevia">
  VISTA PREVIA
</button>
 <div class="modal fade" id="ModalVistaPrevia" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">VISTA PREVIA</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="col-xl-12">
                           <!--<textarea class="form-control" id="DescripcionBitacoraComentar" rows="5" disabled></textarea>-->
                            <iframe name="TextoVistaPrevia" id="TextoVistaPrevia" style="width: 1075px; height:700px;">
                            </iframe>
                        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">REGRESAR</button>
        <button type="button" id="btnIngresarActaSuper" class="btn btn-primary">GENERAR ACTA</button>
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
    <%: Scripts.Render("~/js/ActaInicio/jsActaInicioSupervision.js") %>
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

