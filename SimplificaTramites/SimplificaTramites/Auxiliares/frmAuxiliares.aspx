<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmAuxiliares.aspx.cs" Inherits="Covialgt.Auxiliares.frmAuxiliares" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
     <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
   
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>


    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
               
    
    <h1 class="mb-0">Auxiliares</h1>
    <hr class="thick" />
    
    <br>

    <div class="row"   id="divComboRegionales" style="display:none;"  >        
                <div class="col-4"  >                                        
                    <select class="form-control" id="cmbSupervisorRegional" name="Regional1"  required>
                            <option disabled selected>Regional</option>                                               
                    </select>
                </div>
                <div class="col-8" >                   
                </div>       
    </div>

    <br>

    <div class="row">        
                <div class="col-8"  id="divComboProyectosXRegional" style="display:none;"  >
                    <div class="row">  
                        <div class="col-6" >
                            <select class="form-control" id="cmbPlanAnual1" name="PlanAnual1"  required>
                                    <option disabled selected>Plan anual</option>                                               
                            </select>
                        </div>
                        <div class="col-6" >
                            <select class="form-control" id="cmbProyecto1" name="Proyecto1"  required>
                                    <option disabled selected>Proyecto</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-8" id="divComboProyectosXSupervisor" style="display:none;" >
                   <select class="form-control" id="cmbProyectoXSupervisor" name="cmbProyectoXSupervisor"  required>
                            <option disabled selected>Proyecto</option>
                    </select>
                </div>       
                <div class="col-1" ></div>
                <div class="col-3" style="text-align: center;">
                    <button type="button" id="btnBuscar" class="btn btn-primary btn-form" style="width: 90%;" onclick="fnCargarTablaAuxiliares();">Buscar</button>
                </div>
    </div>

    <br>

    <div class="row"> 
                <div class="col-9"  >  
                    <h1 id="lblProyecto" style="font-size:medium"></h1>
                </div>
                <div class="col-3"  style="text-align: center;" >  
                    <button type="button" id="btnAgregar" class="btn btn-secondary btn-form" style="width: 90%;" onclick="mostrarModalAgregarAuxiliar();">+ Agregar</button>
                </div>
    </div>


    <div class="row"> 
                <hr />
                <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="tableAuxiliares">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th></th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Tipo de usuario</th>
                                <th>Username</th>
                                <th>No. Colegiado</th>
                                <th>Estado de aprobación</th>
                                <th>Estado</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="modalEdicionAuxiliar" data-dismiss="modal" data-backdrop="static" data-keyboard="false"  >
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 id="letreroModalEdicion"></h1>
                    <button class="close" data-dismiss="modal" aria-label="Close" onclick="$('#modalEdicionAuxiliar').modal('toggle');">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab" aria-controls="nav-info" aria-selected="true"><i class="fas fa-info-circle"></i>&nbsp;&nbsp;Datos del usuario
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="nav-docs-tab" data-toggle="tab" href="#nav-docs" role="tab" aria-controls="nav-docs" aria-selected="false"><i class="fas fa-book-open"></i>&nbsp;&nbsp;Documentos
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="nav-aprobacion-tab" data-toggle="tab" href="#nav-aprobacion" role="tab" aria-controls="nav-aprobacion" aria-selected="false"><i class="fas fa-user-check"></i>&nbsp;&nbsp;Aprobación
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">                            
                                <div class="card-body" >
                                    <div class="row" >
                                        <div class="col-3" >
                                            <img id="imgFoto" src="../img/ImgAuxiliar.png" alt="Fotografía" style="max-height:100%; max-width:100%"  />
                                           
                                        </div>
                                        <div class="col-9" >
                                            <div class="row" >
                                                <div class="col-4" >
                                                    <label for="txtNombreAuxiliar">Nombres</label>
                                                    <input type="text" class="form-control" id="txtNombreAuxiliar" name="txtNombreAuxiliar" onchange="fnFormarUsername();" >
                                                </div>
                                                <div class="col-4" >
                                                    <label for="txtApellidoAuxiliar">Apellidos</label>
                                                    <input type="text" class="form-control" id="txtApellidoAuxiliar" name="txtApellidoAuxiliar" onchange="fnFormarUsername();" >
                                                </div>
                                                <div class="col-4" >
                                                    <label for="txtUsername">Username</label>
                                                    <input type="text" class="form-control" id="txtUsername" name="txtUsername" >
                                                </div>
                                            </div>
                                            <div class="row"  style="margin-top: 10px;" >
                                                <div class="col-4" >
                                                    <label for="cmbTipoUsuario">Tipo de usuario</label>
                                                    <select class="form-control" id="cmbTipoUsuario" name="cmbTipoUsuario"  required>                                            
                                                    </select>
                                                </div>
                                                <div class="col-4" >
                                                    <label for="txtDPI">DPI</label>
                                                    <input type="text" class="form-control" id="txtDPI" name="txtDPI" >
                                                </div>
                                                <div class="col-4" >
                                                    <label for="txtNIT">NIT</label>
                                                    <input type="text" class="form-control" id="txtNIT" name="txtNIT" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="margin-top: 10px;" >                                       
                                        <div class="col-3" id="divColegiado">
                                            <label for="txtColegiado" id="labelColegiado" >No. Colegiado</label>
                                            <input type="number" class="form-control" id="txtColegiado" name="txtColegiado" >
                                        </div>
                                        <div class="col-3"  >
                                            <label for="dtFechaColegiacion" id="labelFechaColegiacion" >Fecha de colegiación</label>
                                            <div class="input-group date" id="divFechaColegiacion" data-target-input="nearest">
                                                <input id="dtFechaColegiacion" type="text" name="dtFechaColegiacion"  class="form-control"  title="dd/mm/aaaa" >
                                                <div class="input-group-append" data-target="#divFechaColegiacion"  data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-3" >
                                            <label for="txtTelefono" id="labelTelefono" >No. Teléfono</label>
                                            <input type="number" class="form-control" id="txtTelefono" name="txtTelefono" >
                                        </div>
                                        <div class="col-3" > </div>
                                    </div>

                                    <div class="row" style="margin-top: 35px;">
                                        <div class="col-6" >  </div>                             
                                        <div class="col-3" style=" text-align: right; "  >
                                            <button type="button" id="btnCancelar" class="btn btn-secondary btn-form" onclick="$('#modalEdicionAuxiliar').hide();">Cancelar</button>
                                        </div>
                                        <div class="col-3" style=" text-align: right; "  >
                                            <button type="button" id="btnGrabar" class="btn btn-primary btn-form" onclick="fnGrabarDatosUsuario();">Grabar</button>
                                        </div>
                                    </div>
                                </div>                            
                        </div>

                        <div class="tab-pane fade" id="nav-docs" role="tabpanel" aria-labelledby="nav-docs-tab">
                            <div class="card-body" >
                                    <div class="row"  >                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Fotografía:</h1> 
                                                    <a id="hrefNombreArchivoFoto"  target="_blank" >
                                                    <h3 id="lblNombreArchivoFoto" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileFoto" type="file" NAME="fileFoto"  accept="image/*" >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirArchivoFoto" class="btn btn-secondary" onclick="fnValidarArchivo('fileFoto');">Subir archivo</button>
                                                </div>
                                     </div>
                                    <div class="row"  style="padding-top:25px;" >                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Copia de DPI:</h1>   
                                                    <a id="hrefNombreArchivoDPI"  target="_blank" >
                                                    <h3 id="lblNombreArchivoDPI" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileDPI" type="file" NAME="fileDPI" accept="application/pdf"  >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirArchivoDPI" class="btn btn-secondary" onclick="fnValidarArchivo('fileDPI');">Subir archivo</button>
                                                </div>
                                    </div>
                                    <div class="row"  style="padding-top:25px;"  id="divActaNotarial" >                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Acta notarial:</h1>  
                                                    <a id="hrefNombreArchivoActaNotarial"  target="_blank" >
                                                    <h3 id="lblNombreArchivoActaNotarial" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileActaNotarial" type="file" NAME="fileActaNotarial" accept="application/pdf"  >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirArchivoActaNotarial" class="btn btn-secondary" onclick="fnValidarArchivo('fileActaNotarial');">Subir archivo</button>
                                                </div>
                                     </div>
                                    <div class="row"  style="padding-top:25px;"  id="divConstSupReg">                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Constancia de Sup. Regional:</h1>    
                                                    <a id="hrefNombreArchivoConstanciaSupRegional"  target="_blank"  >
                                                    <h3 id="lblNombreArchivoConstanciaSupRegional" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileConstanciaSupRegional" type="file" NAME="fileConstanciaSupRegional" accept="application/pdf" >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirfileConstanciaSupRegional" class="btn btn-secondary" onclick="fnValidarArchivo('fileConstanciaSupRegional');">Subir archivo</button>
                                                </div>
                                     </div>
                                    <div class="row"  style="padding-top:25px;" >                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Curriculum vitae:</h1>   
                                                    <a id="hrefNombreArchivoCV"  target="_blank"  >
                                                    <h3 id="lblNombreArchivoCV" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileCV" type="file" NAME="fileCV" accept="application/pdf"  >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirArchivoCV" class="btn btn-secondary" onclick="fnValidarArchivo('fileCV');">Subir archivo</button>
                                                </div>
                                     </div>
                                    <div class="row"  style="padding-top:25px;" id="divConstanciaColegiadoActivo" >                                    
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Constancia de colegiado activo:</h1>   
                                                    <a id="hrefNombreArchivoColegiado"  target="_blank" >
                                                    <h3 id="lblNombreArchivoColegiado" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileColegiadoActivo" type="file" NAME="fileColegiadoActivo" accept="application/pdf" >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirArchivoColegiado" class="btn btn-secondary" onclick="fnValidarArchivo('fileColegiadoActivo');">Subir archivo</button>
                                                </div>
                                     </div>
                                    <div class="row"  style="padding-top:25px;" id="divCopiaCarneCIG" >
                                                <div class="col-5" >
                                                    <h1  style="font-size:large">Copia de carné CIG actualizado:</h1>   
                                                    <a id="hrefNombreArchivoCarneCIG"  target="_blank" >
                                                    <h3 id="lblNombreArchivoCarneCIG" style="font-size:medium"></h3>
                                                    </a>
                                                </div>
                                                <div class="col-5" style="padding-top:20px;" >
                                                    <INPUT id="fileCopiaCarneCIG" type="file" NAME="fileCopiaCarneCIG" accept="application/pdf" >
                                                </div>
                                                <div class="col-2" style="padding-top:20px;"  >
                                                    <button type="button" id="btnSubirArchivoCopiaCarneCIG" class="btn btn-secondary" onclick="fnValidarArchivo('fileCopiaCarneCIG');">Subir archivo</button>
                                                </div>
                                     </div>
                                    

                             </div>
                        </div>

                        <div class="tab-pane fade" id="nav-aprobacion" role="tabpanel" aria-labelledby="nav-aprobacion-tab">
                            <div class="card-body" >
                                    <div class="col-12"  >
                                            <label for="txtObservacionesAprobacion">Observaciones</label>
                                            <textarea class="form-control" id="txtObservacionesAprobacion" name="txtObservacionesAprobacion" rows="4"></textarea>
                                     </div>
                                                                  
                                    <div class="row" style="margin-top: 10px;">
                                        <div class="col-4" style=" text-align: center; margin-top: 35px;"  >
                                            <button type="button" id="btnDesaprobar" class="btn btn-primary btn-form" onclick="fnConfimarAprobarUsuario(false);">Desaprobar</button>
                                        </div>
                                        <div class="col-4" >
                                        </div>
                                        <div class="col-4" style=" text-align: center; margin-top: 35px;"  >
                                            <button type="button" id="btnAprobar" class="btn btn-primary btn-form" onclick="fnConfimarAprobarUsuario(true);">Aprobar</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>  <%--modal edición--%>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/Chart.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>

    <%--Archivos Js --%>
    <%: Scripts.Render("~/js/jsAuxiliares.js") %>    
</asp:Content>
