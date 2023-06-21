<%@ Page Title="SolicitudConstanciaLS" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmSolicitudConstanciaLS.aspx.cs" Inherits="SimplificaTramites.SolicitudConstanciaLS.frmSolicitudConstanciaLS" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%--  <%: Styles.Render("~/Content/Multimedia.css") %>--%>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%--  <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/Multimedia.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%-- <script src="../Scripts/jquery-3.5.1.min.js"></script>--%>
    <!-- Sweet Alert-->
    <%--  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>--%>
    <!-- Loading Overlay-->
    <%-- <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>--%>
    <!-- Font-Awesome 4.7-->
    <%--  <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>--%>
    <!-- Data Table v1.10.23 -->
    <%--    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>--%>



    <style>
        td.details-control {
            background: url('../Images/Icons/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        tr.shown td.details-control {
            background: url('../Images/Icons/details_close.png') no-repeat center center;
        }
    </style>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1 class="mb-0">Solicitud de Constancias Laborales y/o Prestación de Servicios Técnicos y/o Profesionales</h1>
    <hr class="thick" />
    <br />
    <div class="w-100"></div>
    <div class="row">
        <div class="form-group col-md-2 col-lg-4">
            <label for="cmbEstadoSolicitud">Estado</label>
            <select class="form-control" id="cmbEstadoSolicitud">
            </select>
        </div>
        

    </div>
    
    <h2 class="mt-5"><span class="title-bg">Solicitudes recibidas</span></h2>
    <hr />
    <div class="table-responsive mt-5">         
        <table class="table table-bordered" id="tblSolicitudesRecibidas">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>DPI</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Fecha Creación</th>
                    <th>Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

    </div>
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
    <div class="modal fade" id="winSolicitudConstancia"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-transparent">
            <div style="height: 1050px" class="modal-content">
                <div class="modal-header">
                    <h3>
                        <label id="lblTituloSolicitudConstancia"></label>
                    </h3>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="dModalBodySolicitudConstancias" style="height: 600px" class="modal-body">
                    <div class="row">
                        <div class="form-group col-md-10 col-lg-7">
                            <label for="txtNombre">Nombre</label>
                            <input type="text" class="form-control" id="txtNombre">   
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <label for="txtDPI">DPI:</label>
                            <input id="txtDPI" type="text" class="form-control">
                        </div>
                        
                    </div>
                    
                

                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <label for="txtNIT">NIT:</label>
                            <input id="txtNIT" type="text" class="form-control">
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <label for="txtCorreoElectronico">Correo Electrónico:</label>
                            <input id="txtCorreoElectronico" type="text" class="form-control">
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <label for="txtTelefono">Teléfono:</label>
                            <input id="txtTelefono" type="text" class="form-control">
                        </div>
                       
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-md-6 col-lg-5">
                            <label for="txtUltimoSueldo">Ultimo Sueldo/Honorarios:</label>
                            <input id="txtUltimoSueldo" type="text" class="form-control"/>
                        </div>
                        <div class="col-md-6 col-lg-5">
                            <label for="txtEstado">Estado</label>
                            <input id="txtEstado" type="text" class="form-control"/>
                        </div>
                    </div>
                    <br/>
                    
                    

                    <div class="row col-md-10 col-lg-10">
                            <div class="col-md-2 col-lg-2" id="lblRenglonPresupuestario">
                                <label for="chk21">Renglon Presupuestario</label>
                            </div>
                            <div class="row col-md-8 col-lg-8">
                                <div class="col-md-2 col-lg-2" id="div21">
                                    <label for="chk021">21</label>
                                    <input type="checkbox" id="chk021" class="form-control">
                                </div>
                                <div class="col-md-2 col-lg-2" id="div22">
                                    <label for="chk022">22</label>
                                    <input type="checkbox" id="chk022" class="form-control">
                                </div>
                                <div class="col-md-2 col-lg-2" id="div29">
                                    <label for="chk029">29</label>
                                    <input type="checkbox" id="chk029" class="form-control">
                                </div>
                                <div class="col-md-3 col-lg-3" id="divSubgrupo18">
                                    <label for="chkSubgrupo18">Subgrupo 18</label>
                                    <input type="checkbox" id="chkSubgrupo18" class="form-control">
                                </div>
                            </div>
                    </div>
                   
                   
                    <br />
                    <div class="row justify-content-center mt-6">
            <div class="col-md-6 mb-3">
                <label class="fw-medium">¿Se encuentra laborando o prestando servicios actualmente en COVIAL?</label>
                <div class="d-flex justify-content-between flex-wrap fw-medium bg-white pt-2 pb-3 border-custom rounded-lg">
                    <div class="custom-control custom-radio mr-2">
                        <input type="radio" class="custom-control-input" id="radioActivo" name="optActivo"
                            value="1">
                        <label class="custom-control-label" for="radioActivo">Si</label>
                    </div>
                    <div class="custom-control custom-radio mr-2">
                        <input type="radio" class="custom-control-input" id="radioInactivo" name="optActivo"
                            value="2" >
                        <label class="custom-control-label" for="radioInactivo">No</label>
                    </div>
                   
                </div>
            </div>
        </div>
                    <br />
                    <div class="row ">
                        <div class="form-group col-md-5 col-lg-5">
                            <label for="cmbTipoServicio">Tipo de servicio prestado</label>
                            <select id="cmbTipoServicio" class="form-control"></select>
                        </div>
                        <div class="form-group col-md-5 col-lg-5">
                            <label for="txtPuesto">Puesto</label>
                            <input id="txtPuesto" type="text" class="form-control"/>
                        </div>
                    </div>
                    
                    <div class="row align-items-end">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="dpInicio">Fecha de inicio laboral y/o prestación de servicios</label>
                                <div class="input-group date" id="inicio-dp" data-target-input="nearest">
                                    <input id="dpInicio" type="text" data-target="#inicio-dp" name="dpInicio" autocomplete="off" class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#inicio-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="dpFin">Fecha de finalización laboral y/o de prestación de servicios </label>
                                <div class="input-group date" id="fin-dp" data-target-input="nearest">
                                    <input id="dpFin" type="text" name="dpFin" autocomplete="off" class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#fin-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                   
                    <br />
                    <div class="row">
                        <div class="form-group col-md-12 col-lg-12">
                            <label for="txtObservaciones">Observaciones</label>
                            <textarea class="form-control" id="txtObservaciones" name="txtObservaciones" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="text-right pt-2">
                        <button type="button" id="btnAtenderSolicitud" class="btn btn-outline-secondary btn-form">Atender Solicitud</button>
                        <button type="button" id="btnRechazar" class="btn btn-outline-secondary btn-form">Rechazar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%--    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    --%>
    <%--<script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>--%>

    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
        usuario = "<%= Session["usuario"] %>"
        ReportesVialesPath = "<%= ViewState["ReportesVialesPath"] ?? "null" %>";
        rolConsultas = '<%= ViewState["rolConsultas"] %>'
    </script>
    <!-- Scripts -->
    <script src="../js/jsSolicitudConstanciaLS.js?v=1"></script>
</asp:Content>
