<%@ Page Title="Gestion de Usuarios" ClientIDMode="Static" Async="true" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionUsuario.aspx.cs" Inherits="Covialgt.Usuarios.GestionUsuario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
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
    <h2 class="mt-4">Gestión de Usuarios</h2>
    <div class="card custom-card bg-gray-custom p-x3 py-4 mb-5 mt-4 border-0">
        <div class="card-body">
            <div class="row ml-3">
                <div class="col-sm-4 col-md-4 col-lg-4">
                    <label for="buscar"><b>Buscar:</b></label>
                    <input type="text" class="form-control" id="buscar" name="buscar" placeholder="Buscar Personal">
                </div>
                <div class="col-sm-1 col-md-1 col-lg-2">
                    <button type="button" class="btn btn-primary custom-button-icon" id="btn-buscar">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="col-sm-3 col-md-4 col-lg-4">
                    <div class="form-group">
                        <label for="SelectRoles">Rol</label>
                        <asp:ListBox ID="SelectRoles" CssClass="form-control plan-select" runat="server"
                            Rows="1" SelectionMode="Single" />
                    </div>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-2 custom-button-icon">
                    <button type="button" class="btn btn-primary btn-block text-uppercase fs-7" id="add-rol" disabled>Agregar rol</button>
                </div>
            </div>
            <div class="row justify-content-end mt-3 ml-2">
                <div class="col-sm-7 col-md-6 col-lg-4">
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">Rol Seleccionados</label>
                        <select multiple="multiple" class="form-control fs-8 scroll" style="overflow: auto" id="roles_user"></select>
                    </div>
                </div>
                <div class="col-sm-4 col-md-6 col-lg-2 d-flex align-items-center">
                    <a href="#" class="action-icon hover-red" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar Role" data-placement="top" id="delete-role">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </a>
                </div>
            </div>
            <div class="table-responsive rounded-custom">
                <table class="table table-bordered rounded-custom w-100" id="table-usuarios"></table>
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
    <%: Scripts.Render("~/js/Usuarios/jsGestionUsuarios.js?1") %>
</asp:Content>
