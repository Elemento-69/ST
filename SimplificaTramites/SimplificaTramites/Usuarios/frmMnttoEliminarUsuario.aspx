<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmMnttoEliminarUsuario.aspx.cs" Inherits="Covialgt.Usuarios.frmMnttoEliminarUsuario" %>


<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <h1>Usuarios</h1>
    <hr class="thick" />
    <h2>Eliminar Usuarios</h2>
    <div class="container ">
  <h4>Eliminar Usuario: <span class="text h5" id="NombreUsuario" ></span> </h4>
  <div class="panel panel-default ">
    <div class="panel-body">
        <div class="row">
            <div class="col-md-2">
            <strong>
                <span class="form-control" style="border: none">Codigo Empleado</span>
                <br />
                <span class="form-control" style="border: none">Nombres</span>
                <br />
                <span class="form-control" style="border: none">Apellidos</span>
                <br />
                <span class="form-control" style="border: none">Telefonos</span>
                <br />
                <span class="form-control" style="border: none">Dependencia</span>
                <br />
                <span class="form-control" style="border: none">Cargo</span>
            </strong>
            </div>
            <div class="col-md-6">
                 <input type="text" class="form-control" id="txtCodigoEmpleado" name="txtCodigoEmpleado" disabled>
                <br />
                 <input type="text" class="form-control" id="txtNombres" name="txtNombres" disabled>
                <br />
                 <input type="text" class="form-control" id="txtApellidos" name="txtApellidos" disabled>
                <br />
                 <input type="text" class="form-control" id="txtTelefonos" name="txtTelefonos" disabled>
                <br />
                 <input type="text" class="form-control" id="txtDependencia" name="txtDependencia" disabled>
                <br />
                 <input type="text" class="form-control" id="txtCargo" name="txtCargo" disabled>
            </div>
        </div>
        <br />
        <div class="row">
            <a id="LinkDenegarAcceso" class="link-primary">Denegar Acceso al Sstema</a>
        </div>
        <div class="row">
            <div class="col-md-3">
                <button class="btn btn-primary btn-sm" type="button" id="btnEliminarUser" style="height: 38px">Eliminar...
                            <!--<img src="~/Images/search.svg" width="20" height="20" alt="Ir" runat="server" />-->
                        </button>
                <button class="btn btn-primary btn-sm" type="button" id="btnCancelar" style="height: 38px">Cancelar...
                            <!--<img src="~/Images/search.svg" width="20" height="20" alt="Ir" runat="server" />-->
                        </button>
            </div>
        </div>
    </div>
  </div>
</div>
    
 

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <script>
        base_url = '<%= ViewState["baseURL"] %>'
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        usuario = "<%= Session["usuario"] %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/Usuarios/jsMnttoEliminarUsuario.js") %>
</asp:Content>