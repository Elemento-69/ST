<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReportesGenerales.aspx.cs" Inherits="Covialgt.Informes.ReportesGenerales" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Reportes Generales</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="anioSelect">A&ntilde;o</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="anioSelect" name="anioSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="supervisoraSelect">Supervisora</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="supervisoraSelect" name="supervisoraSelect" disabled></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="filtrarSelect">Filtrar</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="filtrarSelect" name="filtrarSelect" disabled>
                <option value="1" selected>Departamentos</option>
                <option value="2">Rutas</option>
                <option value="3">Supervisora</option>
                <option value="4">Departamento y Supervisora</option>
            </select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="programaSelect">Programa</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="programaSelect" name="programaSelect" disabled></select>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="departamentoSelect">Departamento</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="departamentoSelect" name="departamentoSelect"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="proyectoSelect">Proyecto</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="proyectoSelect" name="proyectoSelect" disabled></select>
        </div>
    </div>
    <div class="row justify-content-between align-items-end">
        <div class="form-group col-md-5 col-lg-5">
            <label for="rutaSelect">Ruta</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="rutaSelect" name="rutaSelect" disabled>
                <option selected>Todas</option>
                <option value="CA">CentroAmericana</option>
                <option value="RN">Nacionales</option>
                <option value="INTER">Interconexión</option>
                <option value="RD">Departamentales</option>
                <option value="CR">Caminos Rurales</option>
                <option value="CPR">Municipales</option>

            </select>
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="avanceSelect">Avance</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="avanceSelect" name="avanceSelect">
                <option value="0">******* AVANCES FISICOS *******</option>
                <option value="1" selected>Directorio de Contratistas</option>
                <option value="2">Tramos y Cantidades Actualizadas</option>
                <option value="3">Avance Fisico por Proyecto</option>
                <option value="4">Avance Fisico por Tramo</option>
                <option value="5">Avance Fisico por Tramo y Estacion</option>
                <option value="6">Avance Fisico</option>
                <option value="20">******* AVANCES FINANCIEROS ******</option>
                <option value="7">Avance Financiero de Proyectos</option>
                <option value="8">Avance Financiero por Tramo</option>
                <option value="9">Avance Financiero General de Proyectos</option>
                <option value="10">Avance Financiero General por Departamento</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha desde</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control" disabled>
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <label for="hastaInput">Fecha hasta</label>
            <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                <input id="hastaInput" type="text" name="hasta" autocomplete="off" class="form-control" disabled>
                <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-2 col-lg-2">
            <label for="tipoSelect">Tipo:</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="tipoSelect" name="tipoSelect" disabled>
                <option value="1">SEMANAL</option>
                <option value="2" selected>MENSUAL</option>
            </select>
        </div>
    </div>
    <div class="row align-items-center">
        <div class="column col-md-2 col-lg-2">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck1" name="tipo" checked="true" value="1">
                <label class="custom-control-label" for="customCheck1">Tramos Viales</label>
            </div>
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck2" name="tipo" value="2">
                <label class="custom-control-label" for="customCheck2">Rutas Viales</label>
            </div>
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck3" name="tipo" value="3">
                <label class="custom-control-label" for="customCheck3">Tramos por Proyecto</label>
            </div>
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck4" name="tipo" value="4">
                <label class="custom-control-label" for="customCheck4">Anexos Originales</label>
            </div>
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck5" name="tipo" value="5">
                <label class="custom-control-label" for="customCheck5">Directorio</label>
            </div>
        </div>
        <div class="form-group col-md-3 col-lg-3">
            <div class="text-center">
                <button type="button" id="btnGenerarReporte" class="btn btn-light" title="Generar Reporte">
                    <i class="fas fa-print fa-2x"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="row big-gutter">
        <div id="testDiv"></div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
	<%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
        user = "<%= Session["usuario"] %>"
        rolpermitido = "<%= ViewState["rolpermitido"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/jsReportesGenerales.js?a=28") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
