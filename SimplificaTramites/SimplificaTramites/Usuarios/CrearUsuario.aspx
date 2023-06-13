<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" ClientIDMode="Static" Async="true" AutoEventWireup="true" CodeBehind="CrearUsuario.aspx.cs" Inherits="Covialgt.Usuarios.CrearUsuario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Usuarios</h1>
    <hr class="thick" />
    <h2 class="mt-4"><b>Crear Cuenta Nueva de Usuarios</b></h2>
    <div class="card custom-card bg-gray-custom p-x3 py-4 mb-5 mt-4 border-0">
        <div class="card-body">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 mb-3">
                        <label>Seleccionar</label>
                        <div class="d-flex flex-wrap justify-content-between fw-medium bg-white pt-2 pb-3 border-custom rounded-lg pr-3">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="todos" name="tipo"
                                    value="1">
                                <label class="custom-control-label" for="todos">Todos</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="noUsuarios" name="tipo"
                                    value="3" checked>
                                <label class="custom-control-label" for="noUsuarios">No Usuarios</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="usuarios" name="tipo"
                                    value="2">
                                <label class="custom-control-label" for="usuarios">Usuarios</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 class="mt-5"><b>Listado de Usuarios</b></h2>
            <div class="row justify-content-end">
                <div class="col-lg-4">
                    <label for="buscar"><b>Buscar</b></label>
                    <div class="d-flex">
                        <input type="text" class="form-control" id="buscar" name="buscar" placeholder="Buscar Personal">
                        <button type="button" class="btn btn-primary ml-2" title="Buscar" id="btn-buscar">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-1">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover mt-4 w-100" id="table-usuarios"></table>
                </div>
            </div>
            <h2 class="mt-5"><b>Crear Nueva Cuenta</b></h2>
            <div class="row mt-3">
                <div class="col-12" id="message-error"></div>
                <div class="col-sm-10 col-md-10 col-lg-5">
                    <label for="nombreUsuario">Nombre de Usuario</label>
                    <input type="text" class="form-control" id="nombreUsuario" name="nombreUsuario"
                        autocomplete="off" readonly>
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5">
                    <label for="correoElectronico">Correo Electrónico</label>
                    <input type="email" class="form-control" id="correoElectronico" name="correoElectronico"
                        autocomplete="off" runat="server">
                    <asp:RequiredFieldValidator ID="reqEmailRequerido" ControlToValidate="correoElectronico"
                        ValidationGroup="valusuario" CssClass="invalid-feedback" ErrorMessage="El campo es requerido"
                        runat="server" Display="Dynamic" Style="font-size: 15px" />
                    <asp:RegularExpressionValidator ID="reqEmailExp" ControlToValidate="correoElectronico"
                        ValidationExpression="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$" ValidationGroup="valusuario"
                        CssClass="invalid-feedback" ErrorMessage="Ingrese un correo electrónico válido" runat="server" Display="Dynamic"
                        Style="font-size: 15px" />
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5">
                    <label for="usuarioPasswod">Contraseña</label>
                    <input type="password" class="form-control" id="usuarioPasswod" name="usuarioPasswod"
                        runat="server" autocomplete="new-password">
                    <asp:RequiredFieldValidator ID="reqPassword" ControlToValidate="usuarioPasswod"
                        ValidationGroup="valusuario" CssClass="invalid-feedback" ErrorMessage="El campo es requerido"
                        runat="server" Display="Dynamic" Style="font-size: 15px" />
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5">
                    <label for="verificarPassword">Verificar Contraseña</label>
                    <input type="password" class="form-control" id="verificarPassword" name="verificarPassword"
                        runat="server" autocomplete="new-password">
                    <asp:RequiredFieldValidator ID="reqVerificarPassowrd" ControlToValidate="verificarPassword"
                        ValidationGroup="valusuario" CssClass="invalid-feedback" ErrorMessage="El campo es requerido"
                        runat="server" Display="Dynamic" Style="font-size: 15px" />
                    <asp:CompareValidator ID="reqComPass" ControlToValidate="verificarPassword" ControlToCompare="usuarioPasswod"
                        ValidationGroup="valusuario" CssClass="invalid-feedback" Style="font-size: 15px"
                        ErrorMessage="Las contraseñas no coinciden" runat="server" Display="Dynamic" />
                </div>
            </div>
        </div>
    </div>
    <div class="text-right mb-3">
        <a role="button" class="btn btn-outline-dark text-uppercase fs-7 px-md-5 py-2 mr-4">Cancelar</a>
        <button type="button" class="btn btn-primary text-uppercase fs-7 px-md-5 py-2" id="guardar-usuario" disabled>Crear Cuenta</button>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
    </script>
    <%: Scripts.Render("~/js/Usuarios/jsCrearUsuarios.js") %>
</asp:Content>
