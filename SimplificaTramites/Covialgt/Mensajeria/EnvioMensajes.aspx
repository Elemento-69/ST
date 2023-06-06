<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EnvioMensajes.aspx.cs" Inherits="Covialgt.Mensajeria.EnvioMensajes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
	<%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
	<h1>Mensajer&iacute;a</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <div class="row justify-content-between">
    	<div class="form-group col-md-5 col-lg-5">
            <label for="busquedaInput">T&eacute;rmino de b&uacute;squeda:</label>
            <input type="text" class="form-control" id="busquedaInput" name="busquedaInput">
        </div>
        <div class="form-group col-md-2 col-lg-2">
            <button title="Buscar..." id="btnBusqueda" class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
        </div>
    </div>
    <div class="row justify-content-between">
        <div class="form-group col-md-5 col-lg-5">
            <label for="rolesSelect">Roles a recibir el mensaje</label>
            <select class="form-control for-remanente-renglon for-remanente-tramo" id="rolesSelect" name="rolesSelect"></select>
        </div>
        <div class="form-group col-md-2 col-lg-2">
            <button id="btnInsertarRol" class="btn btn-primary" type="button">Insertar Rol...</button>
        </div>
    </div>
    <hr class="thick" />
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="proyectosUsuarios-table">
            <thead>
                <tr>
                	<th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center"></th>
                    <th class="text-center"></th>
                    <th class="text-center"></th>
                    <th class="text-center"></th>
                    <th class="text-center"></th>
                    <th class="spacer"></th>
                </tr>
            </thead>
	        <tbody id="proyectosUsuarios-tbody">
        </table>
    </div>
    <hr class="thick" />
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="destinatarios-table">
            <thead>
                <tr>
                    <th class="spacer"></th>
                    <th class="text-center">Destinatario(s)</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <button title="Eliminar el destinatario seleccionado en la lista" id="btnQuitarDestinatario" class="btn btn-danger" type="button"><i class="fas fa-user-minus"></i></button>
    <div class="row justify-content-between">
    	<div class="form-group col-md-5 col-lg-5">
            <label for="tituloInput">T&iacute;tulo del mensaje:</label>
            <input type="text" class="form-control" id="tituloInput" name="tituloInput">
        </div>
        <div class="col-md-3 col-lg-3">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck1" name="motivo" checked="true" value="1">
                <label class="custom-control-label" for="customCheck1">Estimación</label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3">
            <div class="form-group custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="customCheck2" name="motivo" value="2">
                <label class="custom-control-label" for="customCheck2">Otros</label>
            </div>
        </div>
    </div>
    <div>
    	<div class="form-group col-md-5 col-lg-5">
            <label for="mensajeInput">Mensaje:</label>
            <input type="text" class="form-control" id="mensajeInput" name="mensajeInput">
        </div>
        <div class="form-group col-md-2 col-lg-2">
            <button title="Guardar Registros..." id="btnEnviar" class="btn btn-primary" type="button"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    <label>Estado del mensaje</label>
    <label id="lblEstadoMensaje"></label>
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
        usuario = "<%= Session["usuario"] %>"
    </script>
    <%: Scripts.Render("~/js/jsEnvioMensajes.js?a=52") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents()
        })
    </script>
</asp:Content>
