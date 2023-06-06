<%@ Page Title="Suspensiones" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmSuspensiones.aspx.cs" Inherits="Covialgt.Suspensiones.frmSuspensiones" %>

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
    <h1 class="mb-0">Suspensiones</h1>
    <hr class="thick" />
    <br />
    <div class="w-100"></div>
    <div class="row">
        <div class="form-group col-md-2 col-lg-4">
            <label for="cmbPlanAnual">Plan</label>
            <select class="form-control" id="cmbPlanAnual">
            </select>
        </div>
        <div class="form-group col-md-8 col-lg-8">
            <label for="cmbProyecto">Proyecto</label>
            <select class="form-control" id="cmbProyecto"></select>
        </div>

    </div>
    <div class="text-right pt-2">
        <button type="button" id="btnNuevaSuspension" class="btn btn-outline-primary btn-form">Nueva suspensión</button>
    </div>
    <h2 class="mt-5"><span class="title-bg">Suspensiones generadas</span></h2>
    <hr />
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="tableSuspensiones">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th>Acciones</th>
                    <th>Proyecto</th>
                    <th>Del</th>
                    <th>Al</th>
                    <th>Días afectados</th>
                    <th>No. Acta de suspensión</th>
                    <th>Acta de suspensión</th>
                    <th>No. Acta de reactivación</th>
                    <th>Acta de reactivación</th>
                    <th>Aprobada</th>
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
    <div class="modal fade" id="winSuspension"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-transparent">
            <div style="height: 750px" class="modal-content">
                <div class="modal-header">
                    <h3>
                        <label id="lblTituloSuspension"></label>
                    </h3>
                    <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="dModalBodySuspension" style="height: 600px" class="modal-body">
                    <div class="row">
                        <div class="form-group col-md-2 col-lg-4">
                            <label for="cmbPlanAnualW">Plan</label>
                            <select class="form-control" id="cmbPlanAnualW">
                            </select>
                        </div>
                        <div class="form-group col-md-8 col-lg-8">
                            <label for="cmbProyectoW">Proyecto</label>
                            <select class="form-control" id="cmbProyectoW"></select>
                        </div>
                    </div>
                    <div class="row align-items-end">
                        <div class="col-md-4 col-lg-3">
                            <div class="form-group">
                                <label for="desde">Del:</label>
                                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                                    <input id="desde" type="text" data-target="#desde-dp" name="desde" autocomplete="off" class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="col-md-4 col-lg-3">
                            <div class="form-group">
                                <label for="desde">Al:</label>
                                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <label for="lblDiasAfectadas">Días Afectados</label>
                            <input class="form-control" id="lblDiasAfectadas" disabled />
                        </div>
                        <div class="col-md-2 col-lg-2" id="divAprobar">
                            <label for="checkAprobada">Aprobada</label>
                            <input type="checkbox" id="checkAprobada" class="form-control">
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <label for="txtActaSuspension">Acta de suspensión:</label>
                            <input id="txtActaSuspension" type="text" class="form-control">
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <div class="form-group">
                                <label for="factasuspension">Fecha acta suspensión:</label>
                                <div class="input-group date" id="factasuspension-dp" data-target-input="nearest">
                                    <input id="factasuspension" type="text" data-target="#factasuspension-dp" name="factasuspension" autocomplete="off" class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#factasuspension-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 col-lg-5">
                            <label for="fileActaSuspension">Subir acta de suspensión:</label>
                            <input id="fileActaSuspension" type="file" accept="application/pdf" name="fileActaSuspension" />
                            <label id="factasuspensionLoad" style="font-weight:bold; font-size:80%; color:darkblue"></label>

                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-4 col-lg-3">
                            <label for="txtActaReactivacion">Acta de reactivación:</label>
                            <input id="txtActaReactivacion" type="text" class="form-control">
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <div class="form-group">
                                <label for="factasuspension" >Fecha acta reactivación:</label>
                                <div class="input-group date" id="factareactivacion-dp" data-target-input="nearest">
                                    <input id="factareactivacion" type="text" data-target="#factareactivacion-dp" name="factareactivacion" autocomplete="off" class="form-control datetimepicker-input">
                                    <div class="input-group-append" data-target="#factareactivacion-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-5">
                            <label for="fileActaReactivacion">Subir acta de reactivación:</label>
                            <input id="fileActaReactivacion" type="file" accept="application/pdf" name="fileActaReactivacion" />
                            <label id="factareactivacionLoad" style="font-weight:bold; font-size:80%; color:darkblue"></label>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="form-group col-md-12 col-lg-12">
                            <label for="txtComentarioArchivoAdjuntar">Comentario</label>
                            <textarea class="form-control" id="txtComentarioArchivoAdjuntar" name="txtComentarioArchivoAdjuntar" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="text-right pt-2">
                        <button type="button" id="btnGuardarSuspension" class="btn btn-outline-secondary btn-form">Guardar</button>
                        <button type="button" id="btnEditarSuspension" class="btn btn-outline-secondary btn-form">Guardar</button>
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
    <script src="../js/jsSuspensiones.js?v=2"></script>
</asp:Content>
