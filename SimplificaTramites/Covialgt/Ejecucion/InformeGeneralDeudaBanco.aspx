<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="InformeGeneralDeudaBanco.aspx.cs" Inherits="Covialgt.Ejecucion.InformeGeneralDeudaBanco" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Reporte de Deuda General Banco</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha de deuda:</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desdeInput" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="column mt-4">
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck25" name="tipo" checked="true" value="1">
                <label class="custom-control-label" for="customCheck25">Informe de Saldos</label>
            </div>
        </div>
        <div class="col-md-4 col-lg-4">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck26" name="tipo" value="2">
                <label class="custom-control-label" for="customCheck26">Informe de Monto Modificado</label>
            </div>
        </div>
    </div>
    <div class="row text-right mt-5">
        <div class="form-group col-md-6 col-lg-5 mt-2">
        </div>
        <div class="form-group col-md-6 col-lg-5 ml-md-auto">
            <div class="row">
                <div class="col">
                    <button type="button" id="btnGenerar" class="btn btn-light">
                        <i class="fas fa-print fa-2x"></i>
                        Generar informe de deuda
                    </button>
                </div>
                <div class="col">
                    <button type="button" id="btnGenerarALDIA" class="btn btn-light">
                        <i class="fas fa-print fa-2x"></i>
                        Generar informe AL DIA
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="testDiv"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
    </script>
    <%: Scripts.Render("~/js/jsInformeGeneralDeudaBanco.js?a=1") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
