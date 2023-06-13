<%@ Page Title="Sanciones" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmSolicitudes.aspx.cs"                  Inherits="Covialgt.Solicitudes.frmSolicitudes" %>
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
	<h1>Trámites Sanciones</h1>
    <div class="row">
        <input type="text" name="DocPdf64" value="DocPdf64" style="display:none" />
        
        <div class="col-md-1">
            <strong>  
                <span class="form-control" style="border: none">ESTADO:</span>
              </strong>
        </div>
        <div class="col-3" >
                            <select class="form-control" id="cmbEstados" name="cmbEstados"  required>
                                    <option value="304">CREADA</option>    
                                    <option value="305">RECHAZADA</option>    
                                    <option value="306">APROBADA</option>
                                    <option value="307">EN REVISIÓN</option>
                            </select>
                        </div>
        <div class="col-md-1">
                <button type="button" id='btnBuscarNit' name="btnBuscarNit" class="btn btn-light" ><img src="~/Images/sidebar/search.svg" width="30" height="30" alt="Inicio" runat="server" onclick="fnCargarTablaSolicitudes();"/></button>
        </div>
        
    </div>
    <div class="col-12">
            <div class="row"> 
                <hr />
                <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="tableSolicitudes">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th></th>
                                <th>ID</th>
                                <th>Nit</th>
                                <th>Estado</th>
                                <th>FechaCreo</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
    </div>
    </div>  


   <!-- <div class="modal" tabindex="-1" role="dialog" id="modalEdicionSolicitud" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >-->
       <div class="modal" tabindex="-1" role="dialog" id="modalEdicionSolicitud" data-dismiss="modal" data-keyboard="false"  >
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 id="letreroModalEdicion"></h1>
                    <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalEdicionSolicitud').modal('toggle');">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab" aria-controls="nav-info" aria-selected="true"><i class="fas fa-info-circle"></i>&nbsp;&nbsp;Empresa y Representante
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="nav-docs-tab" data-toggle="tab" href="#nav-docs" role="tab" aria-controls="nav-docs" aria-selected="false"><i class="fas fa-book-open"></i>&nbsp;&nbsp;Documentos
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="nav-aprobacion-tab" data-toggle="tab" href="#nav-aprobacion" role="tab" aria-controls="nav-aprobacion" aria-selected="false"><i class="fas fa-user-check"></i>&nbsp;&nbsp;Generar Estado Solicitud
                            </a>
                        </li>
                   </ul>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">                            
                                <div class="card-body" >
                                    <h4>DATOS DEL SOLICITANTE</h4>
                                    <div class="row" >
                                         <div class="col-9" >
                                            <div class="row" >
                                                <div class="col-6" >
                                                    <label for="txtPrimerNombre">PRIMER NOMBRE</label>
                                                    <input type="text" class="form-control" id="txtPrimerNombre" name="txtPrimerNombre" disabled onchange="fnFormarUsername();" >
                                                </div>
                                                <div class="col-6" >
                                                    <label for="txtSegundoNombre">SEGUNDO NOMBRE</label>
                                                    <input type="text" class="form-control" id="txtSegundoNombre" name="txtSegundoNombre" disabled onchange="fnFormarUsername();" >
                                                </div>
                                            </div>
                                            <div class="row" >
                                                <div class="col-6" >
                                                    <label for="txtPrimerApellido">PRIMER APELLIDO</label>
                                                    <input type="text" class="form-control" id="txtPrimerApellido" name="txtPrimerApellido" disabled onchange="fnFormarUsername();" >
                                                </div>
                                                <div class="col-6" >
                                                    <label for="txtSegundoApellido">SEGUNDO APELLIDO</label>
                                                    <input type="text" class="form-control" id="txtSegundoApellido" name="txtSegundoApellido" disabled onchange="fnFormarUsername();" >
                                                </div>
                                            </div>
                                            <div class="row"  style="margin-top: 10px;" >
                                                <div class="col-6" >
                                                    <label for="txtGenero">GENERO</label>
                                                    <input type="text" class="form-control" id="txtGenero" name="txtGenero" disabled >
                                                </div>
                                                <div class="col-6" >
                                                    <label for="txtDPI">DPI</label>
                                                    <input type="text" class="form-control" id="txtDPI" name="txtDPI" disabled>
                                                </div>
                                            </div>
                                            <div class="row"  style="margin-top: 10px;" >
                                                <div class="col-6" >
                                                    <label for="txtEmail">CORREO ELECTRÓNICO</label>
                                                    <input type="text" class="form-control" id="txtEmail" name="txtEmail" disabled>
                                                </div>
                                                <div class="col-6" >
                                                    <label for="txtTelefono">TELEFÓNO</label>
                                                    <input type="text" class="form-control" id="txtTelefono" name="txtTelefono" disabled>
                                                </div>
                                             </div>
                                            <div class="row">
                                                <h4>DATOS DE LA EMPRESA</h4>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                     <label for="txtNombreEmpresa">NOMBRE DE LA EMPRESA</label>
                                                    <input type="text" class="form-control" id="txtNombreEmpresa" name="txtNombreEmpresa" disabled>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">
                                                     <label for="txtNitEmpresa">NIT</label>
                                                    <input type="text" class="form-control" id="txtNitEmpresa" name="txtNitEmpresa" disabled>
                                                </div>
                                                <div class="col-3">
                                                    <h5>PERÍODO A CONSULTAR</h5>
                                                </div>
                                                <div class="col-3">
                                                     <label for="txtAnioInicio">AÑO INICIO</label>
                                                    <input type="number" class="form-control" id="txtAnioInicio" name="txtAnioInicio" disabled>
                                                </div>
                                                <div class="col-3">
                                                     <label for="txtAnioFin">AÑO FIN</label>
                                                    <input type="number" class="form-control" id="txtAnioFin" name="txtAnioFin" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                            
                        </div>

                        <div class="tab-pane fade" id="nav-docs" role="tabpanel" aria-labelledby="nav-docs-tab">
                            <div class="card-body" >
                                    <div class="row"  style="padding-top:25px;" id="divDPI">                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Copia de DPI:</h1>   
                                                    <a id="hrefNombreArchivoDPI"  target="_blank" >
                                                    <h3 id="lblNombreArchivoDPI" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                    </div>
                                    <div class="row"  style="padding-top:25px;"  id="divPatenteComercio">                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Patente de Comercio:</h1> 
                                                    <a id="hrefNombreArchivoPatente"  target="_blank" >
                                                    <h3 id="lblNombreArchivoPatente" style="font-size:medium"></h3>
                                                    </a>
                                                </div>     
                                     </div>
                                    <div class="row"  style="padding-top:25px;"  id="divRepresentante">                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Representante Legal:</h1>    
                                                    <a id="hrefNombreArchivoRepresentacion"  target="_blank"  >
                                                    <h3 id="lblNombreArchivoRepresentacion" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                     </div>
                             </div>
                        </div>

                        <div class="tab-pane fade" id="nav-aprobacion" role="tabpanel" aria-labelledby="nav-aprobacion-tab">
                            <div class="card-body" >
                                    <div class="col-12"  >
                                            <label for="txtObservacionesAprobacion" style="display:none">Observaciones</label>
                                            <textarea class="form-control" id="txtObservacionesAprobacion" name="txtObservacionesAprobacion" rows="4" style="display:none"></textarea>
                                     </div>
                                                                  
                                    <div class="row" style="margin-top: 10px;">
                                        <div class="col-4" style=" text-align: center; margin-top: 35px;"  >
                                            <button type="button" id="btnDesaprobar" class="btn btn-primary btn-form" >Desaprobar</button>
                                        </div>
                                        <div class="col-4" style=" text-align: center; margin-top: 35px;" >
                                            <button type="button" id="btnRevision" class="btn btn-primary btn-form" >Revisión</button>
                                        </div>
                                        <div class="col-4" style=" text-align: center; margin-top: 35px;"  >
                                            <button type="button" id="btnImprimir" class="btn btn-primary btn-form" >Aprobar</button>
                                        </div>
                                        <div class="col-4" style=" text-align: center; margin-top: 35px;"  >
                                            <a href="" id="LinkDescargaConstancia" target="_blank" onclick="DescargarConstancia();">Descargue Constancia Generada</a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>  <%--modal edición--%>

    <!--Inicio Modal Rechazadas-->

    <!--Fin Modal Rechazadas-->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-transparent" role="document">
            <div style="height: 600px" class="modal-content">
                <div class="modal-header">
                    <h3>
                        <label id="lblTitulo"></label>
                    </h3>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="dModalBody" style="height: 600px" class="modal-body">
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
    <%: Scripts.Render("~/js/Solicitudes/jsSolicitudesSicop.js") %>
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

