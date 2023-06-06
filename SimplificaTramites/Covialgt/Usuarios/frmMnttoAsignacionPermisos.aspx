<%@ Page Title="Gestion de Usuarios" ClientIDMode="Static" Async="true" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmMnttoAsignacionPermisos.aspx.cs" Inherits="Covialgt.Usuarios.MnttoAsignacionPermisos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
    <style>
        .scroll::-webkit-scrollbar-track {
            background: none !important;
        }
        .dataTables_wrapper .dataTables_paginate .paginate_button, .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
            color: #a9a9a9 !important;
        }
        .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
            color: black !important;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Usuarios</h1>
    <hr class="thick" />
    <h2 class="mt-4">Asiganación de Permisos</h2>
    <div class="card custom-card bg-gray-custom p-x3 py-4 mb-5 mt-4 border-0">
        <div class="card-body">
            <h4>Usuario: <span class="text h5" id="NombreUsuario" ></span> </h4>
            <div class="row">
                <div class="col-md-2">
            <strong>
                <span class="form-control" style="border: none">Codigo Empleado</span>
                <br />
                <span class="form-control" style="border: none">Dependencia</span>
                <br />  
                <span class="form-control" style="border: none">Cargo</span>  
                <br />
                <span class="form-control" style="border: none">Nombres</span>
                <br />
                <span class="form-control" style="border: none">Apellidos</span>
                <br />
                <span class="form-control" style="border: none">Telefonos</span>
            </strong>
            </div>
            <div class="col-md-4">
                 <input type="text" class="form-control" id="txtCodigoEmpleado" name="txtCodigoEmpleado" disabled>
                <br />
                 <input type="text" class="form-control" id="txtDependencia" name="txtDependencia" disabled>
                <br />
                 <input type="text" class="form-control" id="txtCargo" name="txtCargo" disabled>
                <br />
                 <input type="text" class="form-control" id="txtNombres" name="txtNombres" disabled>
                <br />
                 <input type="text" class="form-control" id="txtApellidos" name="txtApellidos" disabled>
                <br />
                 <input type="text" class="form-control" id="txtTelefonos" name="txtTelefonos" disabled>
            </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="SelectRoles">Rol</label>
                        <asp:ListBox ID="SelectRoles" CssClass="form-control plan-select" runat="server"
                            Rows="1" SelectionMode="Single" />
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">Rol Seleccionados</label>
                        <select multiple="multiple" class="form-control fs-8 scroll" style="overflow: auto" id="roles_user"></select>
                    </div>
                </div>
                <br />
                <div class="col-md-2 custom-button-icon">
                    <button type="button" class="btn btn-primary btn-block text-uppercase fs-7" id="add-rol" >Agregar rol</button>
                    <br />
                    <br />
                    <br />
                    <a href="#" class="action-icon hover-red" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar Role" data-placement="top" id="delete-role">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </a>
                </div>

            </div>
            <br />
            <br />
            <div class="row">
                <div class="col-md-3">

                </div>
                <div class="col-md-3">
                    <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkAprob" >
                <label class="form-check-label" for="LabelchkAprob" id="LabelchkAprob" >
                Aprobado?
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkBlock" >
                <label class="form-check-label" for="LabelchkBlock" id="LabelchkBlock" >
                Bloqueado?
                </label>
            </div>
                </div>
                <div class="col-md 3">
                    <a id="linregresarMnttoUsuario" href="#" class="link-primary">Regresar...</a>
                </div>
            </div>
        </div>
    </div>
    <!-- modal de detalle usuario -->
    <div class="modal" tabindex="-1" id="detalles">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="curRegistro">Detalle de Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mt-5 mb-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-5 text-right">
                                <p><b>Código Empleado</b></p>
                            </div>
                            <div class="col-6 text-left">
                                <p id="UsuarioID"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5 text-right">
                                <p><b>Dependencia</b></p>
                            </div>
                            <div class="col-6 text-left">
                                <p id="DependenciaNombre"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5 text-right">
                                <p><b>Cargo</b></p>
                            </div>
                            <div class="col-6 text-left">
                                <p id="CargoDesc"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5 text-right">
                                <p><b>Nombres y Apellidos</b></p>
                            </div>
                            <div class="col-6 text-left">
                                <p id="NombreCompleto"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5 text-right">
                                <p><b>Teléfonos</b></p>
                            </div>
                            <div class="col-6 text-left">
                                <p id="Telefonos"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- fin de modal detalle usuario -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>  
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <script>
        $(function () {
            $('[data-toggle="popover"]').popover();
        });
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
    </script>
    <%: Scripts.Render("~/js/Usuarios/jsAsignacionPermisos.js?1") %>
</asp:Content>
