<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DocumentacionAyuda.aspx.cs" Inherits="Covialgt.Ayuda.DocumentacionAyuda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    ' <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
	<%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Scripts/sweetalert2/dist/sweetalert2.min.css") %>
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <ul class="nav nav-pills nav-tabs nav-justified" id="departamentosCovialLista"></ul>
    <div class="row justify-content-start mt-4">
        <div class="col-md-4 col-lg-3">
            <div class="form-group">
                <label for="seccionesSICOP" class="fw-medium">Secci&oacute;n SICOP</label>
                <select id="seccionesSICOP" class="form-control plan-select">
                    <option>Seleccione departamento</option>
                </select>
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="articulosAyuda-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center">Video</th>
                    <th></th>
                    <!-- <th class="text-center"></th> -->
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
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        urlVideosAyuda = "<%= ViewState["VideosAyuda"] ?? "null" %>";
        urlPdfsAyuda = "<%= ViewState["PdfsAyuda"] ?? "null" %>";
    </script>
    <%: Scripts.Render("~/js/jsDocumentacionAyuda.js?a=24") %>
</asp:Content>
