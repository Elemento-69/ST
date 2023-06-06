<%@ Page Title="Reportes Viales" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmReportesViales.aspx.cs" Inherits="Covialgt.ReportesViales.frmReportesViales" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/Multimedia.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <style type="text/css">
        /* Set the size of the div element that contains the map */
        #map {
            height: 600px;
            /* The height is 400 pixels */
            width: 100%;
            /* The width is the width of the web page */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Scripts/jquery-3.5.1.min.js"></script>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <%--<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>--%>

    <style>
        td.details-control {
            background: url('../Images/Icons/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        tr.shown td.details-control {
            background: url('../Images/Icons/details_close.png') no-repeat center center;
        }
    </style>
    <h1 class="mb-0">Gestión Reportes Viales</h1>
    <hr class="thick" />   
    <br />
    <div class="w-100"></div>

    <div class="row">
        <div class="form-group col-md-5 col-lg-5">
            <label for="cmbTramo">Tramo</label>
            <select class="form-control" id="cmbTramo">
            </select>
        </div>
        <div class="form-group col-md-4 col-lg-4">
            <label for="cmbTipoDanio">Tipo de daño</label>
            <select class="form-control" id="cmbTipoDanio">
            </select>
        </div>
        <div class="form-group col-md-3 col-lg-3">
            <label for="cmbEstado">Estado</label>
            <select class="form-control" id="cmbEstado" name="cmbEstado">
            </select>
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
        <div class="text-right pt-5">
            <button type="button" id="btnGenerarReporteGeneral" class="btn btn-outline-secondary btn-form">Generar reporte</button>
            <button type="button" id="btnVer" class="btn btn-outline-primary btn-form">Ver reportes</button>
            <!--<button type="button" id="btnPrueba" class="btn btn-outline-primary btn-form">prueba consola</button> -->
        </div>
    </div>
    <div class="form-group " style="display: flex; flex-direction: row; align-items: flex-end;">  
        <h2 class="mt-5"><span class="title-bg">Reportes</span></h2>
        <label class="rounded-circle" style="background-color:#f5c6cb; height:20px; width:20px; margin-left:5px;"></label> <label style="margin-left:3px;">Reporte sin atención</label>
       <!-- <label class="rounded-circle" style="background-color:#ffffff; height:20px; width:20px; border:1px solid #000; margin-left:5px;"></label> <label style="margin-left:3px">Ingresado limite de tiempo sin expirar</label>
        <label class="rounded-circle" style="background-color:#ffeeba; height:20px; width:20px; margin-left:5px;"></label> <label style="margin-left:3px;">Revision</label>
        <label class="rounded-circle" style="background-color:#c3e6cb; height:20px; width:20px; margin-left:5px;"></label> <label style="margin-left:3px;">Aprobado</label>
        <label class="rounded-circle" style="background-color:#c6c8ca; height:20px; width:20px; margin-left:5px;"></label> <label style="margin-left:3px;">Rechazado</label> -->
    </div>
    <hr />
    <div class="table-responsive mt-5">
        <table class="table table-bordered" id="tableReportes"> <!--table-bordered -->
            <thead> 
                <tr>
                    <th class="spacer"></th>
                    <th>Acciones</th>
                    <th>Fecha</th>
                    <th>Tramo</th>
                    <th>Descripción daño</th>
                    <th>Tipo de reporte</th>
                    <th>Prioridad</th>
                    <th>Usuario reporta</th>
                    <th>Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <script src="../js/jsAcuerdoTrabajoExtra.js"></script>
    <h2 class="mt-5"><span class="title-bg">Mapa de reportes</span></h2>
    <hr />
    <div class="row">

        <script async
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI">
        </script>
        <div id="map"></div>

    </div>
    <div class="row big-gutter">
        <div id="testDiv"></div>
    </div>
    <hr />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/fileInput.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
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
    <script src="../js/jsReportesViales.js?v=1"></script>
</asp:Content>
