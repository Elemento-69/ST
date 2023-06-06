<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="InformeDeuda.aspx.cs" Inherits="Covialgt.Ejecucion.InformeDeuda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Reporte de Deuda</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="anteriorInput">Fecha Anterior</label>
                <div class="input-group date" id="anterior-dp" data-target-input="nearest">
                    <input id="anteriorInput" type="text" name="anterior" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#anterior-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group col-md-2 col-lg-4">
        </div>
        <div class="form-group col-md-5 col-lg-3">
            <label for="actualInput">Fecha Actual</label>
            <div class="input-group date" id="actual-dp" data-target-input="nearest">
                <input id="actualInput" type="text" name="actual" autocomplete="off" class="form-control">
                <div class="input-group-append" data-target="#actual-dp" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <img id="btnGenerar" border="0" src="../Images/print_32.png" /><br />
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
    <%: Scripts.Render("~/js/jsInformeDeuda.js?a=4") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
