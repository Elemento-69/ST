<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TrabajosAdmon.aspx.cs" Inherits="Covialgt.Catalogos.TrabajosAdmon" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Trabajos por Administraci&oacute;n</h1>
    <hr class="thick" />
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="trabajosAdmon-table">
            <thead>
                <tr>
                	<th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">A&#241;o</th>
                    <th class="text-center">Proyecto</th>
                    <th class="text-center">Corr</th>
                    <th class="text-center">Justificaci&#243;n</th>
                    <th class="text-center">Comentario</th>
                    <th class="text-center">Monto</th>
                    <th class="text-center">Fecha presentado</th>
                    <th class="text-center">Aprobado</th>
                    <th class="text-center">Fecha Aprobado</th>
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
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
    </script>
    <%: Scripts.Render("~/js/jsTrabajosAdmon.js?a=6") %>
</asp:Content>
