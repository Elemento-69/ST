<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CambiarPassword.aspx.cs" Inherits="Covialgt.Configuracion.CambiarPassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h1>Cambiar Contrase&ntilde;a</h1>
    <hr class="thick" />
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="nombreUsuarioInput">Nombre de usuario:</label>
            <input type="text" class="form-control" id="nombreUsuarioInput" name="nombreUsuarioInput" required disabled minlength="5">
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="contrasenaInput">Contrase&ntilde;a</label>
            <input type="password" class="form-control" id="contrasenaInput" name="contrasenaInput">
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="nuevaContrasenaInput">Nueva contrase&ntilde;a:</label>
            <input type="password" class="form-control" id="nuevaContrasenaInput" name="nuevaContrasenaInput">
        </div>
        <div class="form-group col-md-5 col-lg-5">
            <label for="confirmarContrasenaInput">Confirmar la nueva contrase&ntilde;a:</label>
            <input type="password" class="form-control" id="confirmarContrasenaInput" name="confirmarContrasenaInput">
        </div>
    </div>
	<div class="row justify-content-center">
        <button type="button" id="btnCambiarContrasena" class="btn btn-primary btn-form">Cambiar contrase&ntilde;a</button>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        rol = "<%= Session["rol"] %>"
        user = "<%= Session["usuario"] ?? "null" %>"
    </script>
    <%: Scripts.Render("~/js/jsCambiarPassword.js?a=8") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
