<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Recepciondocumentos.aspx.cs" Inherits="Covialgt.Estimaciones.Recepciondocumentos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
	<%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Gesti&oacute;n de Estimaciones</h1>
    <h2>Estado de Estimaciones</h2>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <hr class="thick" />

    <div class="row">
        <div class="col-9" >
            <div id="card-estado" class="card custom-card">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-md-9 col-lg-9">
                            <label for="criterioSelect">Estado Actual de la Estimaci&oacute;n:</label>
                            <select class="form-control for-remanente-renglon for-remanente-tramo" id="criterioSelect" name="criterioSelect"></select>
                        </div>                    
                        <div class="col-3" ></div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-9 col-lg-9">
                            <label for="parametroInput">T&eacute;rminos de B&uacute;squeda: </label>
                            <input type="text" class="form-control" id="parametroInput" name="parametroInput">
                            <h4 id="lblInstrucciones" style="margin-top: 10px; font-size:small;">* Términos de búsqueda: C&oacute;digo del Proyecto, NIT, Nombre de la Empresa, Plan Anual, Correlativo de la Estimaci&oacute;n, Monto Ejecutado, Estado</h4>
                        </div>
                        <div class="col-3" >
                            <button type="button" id="btnBuscar" class="btn btn-secondary btn-form" style="margin-top:30px;" onclick="fnCargarEmergenciasFiltradas();">BUSCAR</button>
                        </div>
                    </div>
                    <div class="row"  style="margin-top:15px;">
                        <div class="form-group col-md-9 col-lg-9">
                            <label for="estadoSelect">Nuevo Estado de la Estimaci&oacute;n:</label>
                            <select class="form-control for-remanente-renglon for-remanente-tramo" id="estadoSelect" name="estadoSelect"></select>
                        </div>
                        <div class="col-3">
                            <button type="button" id="btnAsignarEstado" class="btn btn-primary btn-form" style="margin-top:30px;" >Asignar Estado</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-3" >
                <div id="card-reporte" class="card custom-card">
                    <div class="card-body" style="text-align:center;">
                        <h4 class="text-center ">Filtros para reporte</h4>

                        <div class="form-group ">
            	                    <label for="desdeInput">Fecha:</label>
	                                <div class="input-group date" id="desde-dp" data-target-input="nearest">
	                                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control">
	                                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
	                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
	                                    </div>
	                                </div>
                        </div>

                        <label for="horaSelect"  style="margin-top:15px;">Hora:</label>
                        <select class="form-control for-remanente-renglon for-remanente-tramo" id="horaSelect" name="horaSelect"></select>

                        <button type="button" id="btnReportePorHora"
                            class="btn btn-light" style="margin-top:15px;">
                            <i class="fas fa-print fa-2x"></i> Reporte por Hora
                        </button>
                        <button type="button" id="btnReportePorDia" class="btn btn-light" style="margin-top:15px;">
                            <i class="fas fa-print fa-2x"></i> Reporte por D&iacute;a
                        </button>
                    </div>
                </div>
        </div>
    </div>

    <hr class="pearator-line"/>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="estimaciones-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center">A&#241;o</th>
                    <th class="text-center">Proyecto Codigo</th>
                    <th class="text-center">Corr.</th>
                    <th class="text-center">Periodo</th>
                    <th class="text-center">Monto</th>
                    <th class="text-center">Estado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div id="testDiv"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "" %>"        
        token = "<%= Session["token"] ?? "" %>"
        user = "<%= Session["usuario"] %>"

        rolAsignaDevengado = ("<%= ViewState["AsignaDevengado"] ?? "" %>" == 1);
        rolTrasladoFinanciero = ("<%= ViewState["RolTrasladoFinanciero"] ?? "" %>" == 1);
        rolReceptorDeVisa = ("<%= ViewState["RolReceptorDeVisa"] ?? "" %>" == 1);
        rolCoordinadorDeVisa = ("<%= ViewState["RolCoordinadorDeVisa"] ?? "" %>" == 1);
        rolRegionales = ("<%= ViewState["RolRegionales"] ?? "" %>" == 1);
        rolIngenieroControlSeguimiento = ("<%= ViewState["RolIngenieroControlSeguimiento"] ?? "" %>" == 1);
        rolSubdirectorTEC = ("<%= ViewState["RolSubdirectorTEC"] ?? "" %>" == 1);
        rolDigitalizador = ("<%= ViewState["RolDigitalizador"] ?? "" %>" == 1);
        rolAuxiliarTecnico = ("<%= ViewState["RolAuxiliarTecnico"] ?? "" %>" == 1);
        rolAsistenteSubdireccion = ("<%= ViewState["RolAsistenteSubdireccion"] ?? "" %>" == 1);
        rolAuxiliarTecnico2 = ("<%= ViewState["RolAuxiliarTecnico2"] ?? "" %>" == 1);
        rolReceptorFinanciero = ("<%= ViewState["RolReceptorFinanciero"] ?? "" %>" == 1);
        rolAdministrador = ("<%= ViewState["RolAdministrador"] ?? "" %>" == 1);

    </script>
    <%: Scripts.Render("~/js/jsRecepciondocumentosRoles.js") %>
    <%: Scripts.Render("~/js/jsRecepciondocumentos.js?a=8") %>
</asp:Content>
