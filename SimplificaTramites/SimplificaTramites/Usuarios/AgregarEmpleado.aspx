<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" ClientIDMode="Static" Async="true" AutoEventWireup="true" CodeBehind="AgregarEmpleado.aspx.cs" Inherits="Covialgt.Usuarios.AgregarEmpleado" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Usuarios</h1>
    <hr class="thick" />
    <h2 class="h3 mt-4"><b id="title-empleado">Agregar Empleados</b></h2>
    <div class="card custom-card bg-gray-custom p-5 mb-5 mt-4 border-0">
        <div class="card-body">
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="dependencia">Dependencia</label>
                    <select class="form-control" id="dependencia" name="dependencia" runat="server"></select>
                    <asp:RequiredFieldValidator ID="reqdependecia" Style="font-size: 15px" ControlToValidate="dependencia"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="cargo">Cargo</label>
                    <select class="form-control" id="cargo" name="cargo" runat="server"></select>
                    <asp:RequiredFieldValidator ID="reqcargo" Style="font-size: 15px" ControlToValidate="cargo"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="titulo">Título</label>
                    <input type="text" class="form-control" id="titulo" name="titulo" runat="server">
                    <asp:RequiredFieldValidator ID="reqtitulo" Style="font-size: 15px" ControlToValidate="titulo"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="primerNombre">Primer Nombre</label>
                    <input type="text" class="form-control" id="primerNombre" name="primerNombre" runat="server">
                    <asp:RequiredFieldValidator ID="reqPrimerNombre" Style="font-size: 15px" ControlToValidate="primerNombre"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="segundoNombre">Segundo Nombre</label>
                    <input type="text" class="form-control" id="segundoNombre" name="segundoNombre" runat="server">
                    <%--<asp:RequiredFieldValidator ID="reqSegundoNombre" Style="font-size: 15px" ControlToValidate="segundoNombre"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />--%>
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="primerApellido">Primer Apellido</label>
                    <input type="text" class="form-control" id="primerApellido" name="primerApellido" runat="server">
                    <asp:RequiredFieldValidator ID="reqPrimerApellido" Style="font-size: 15px" ControlToValidate="primerApellido"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="segundoApellido">Segundo Apellido</label>
                    <input type="text" class="form-control" id="segundoApellido" name="segundoApellido" runat="server">
                    <%--<asp:RequiredFieldValidator ID="reqSegundoApellido" Style="font-size: 15px" ControlToValidate="segundoApellido"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />--%>
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="nombramiento">Nombramiento</label>
                    <div class="form-group">
                        <div class="input-group date" id="nombramiento-dp" data-target-input="nearest">
                            <input id="nombramiento" type="text" name="nombramiento" autocomplete="off" class="form-control datetimepicker-input"
                                data-target="#nombramiento-dp" runat="server">
                            <div class="input-group-append" data-target="#nombramiento-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                    <%--<asp:RequiredFieldValidator ID="reqNombramiento" Style="font-size: 15px" ControlToValidate="nombramiento"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />--%>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <div class="row">
                        <div class="col-xl-6">
                            <label for="genero">Sexo</label>
                            <select class="form-control" id="genero" name="genero" runat="server">
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                            </select>
                            <asp:RequiredFieldValidator ID="reqGenero" Style="font-size: 15px" ControlToValidate="genero"
                                ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                                runat="server" Display="Dynamic" />
                        </div>
                        <div class="col-xl-6">
                            <label for="fechaNacimiento">Fecha de Nacimiento</label>
                            <div class="form-group">
                                <div class="input-group date" id="fechaNacimiento-dp" data-target-input="nearest">
                                    <input id="fechaNacimiento" type="text" name="fechaNacimiento" autocomplete="off" class="form-control datetimepicker-input"
                                        data-target="#fechaNacimiento-dp" runat="server">
                                    <div class="input-group-append" data-target="#fechaNacimiento-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <asp:RequiredFieldValidator ID="reqFechaNacimiento" Style="font-size: 15px" ControlToValidate="fechaNacimiento"
                                ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                                runat="server" Display="Dynamic" />
                        </div>
                    </div>
                </div>
                <div class="col-sm-0 col-md-0 col-lg-2"></div>
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <div class="row">
                        <div class="col-xl-6">
                            <label for="fechaContratacion">Fecha de Contratación</label>
                            <div class="form-group">
                                <div class="input-group date" id="fechaContratacion-dp" data-target-input="nearest">
                                    <input id="fechaContratacion" type="text" name="fechaContratacion" autocomplete="off" class="form-control datetimepicker-input"
                                        data-target="#fechaContratacion-dp" runat="server">
                                    <div class="input-group-append" data-target="#fechaContratacion-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <asp:RequiredFieldValidator ID="reqFechaContratacion" Style="font-size: 15px" ControlToValidate="fechaContratacion"
                                ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                                runat="server" Display="Dynamic" />
                        </div>
                        <div class="col-xl-6">
                            <div class="form-group custom-control custom-checkbox custom-button-icon">
                                <input type="checkbox" class="custom-control-input" id="checkAprobado" checked>
                                <label class="custom-control-label" for="checkAprobado">Aprobado</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-10 col-md-10 col-lg-5 p-0">
                    <label for="telefonos">Teléfonos</label>
                    <input type="text" class="form-control" id="telefonos" name="telefonos" runat="server">
                    <%--<asp:RequiredFieldValidator ID="reqTelefonos" Style="font-size: 15px" ControlToValidate="telefonos"
                        ValidationGroup="valempleado" CssClass="invalid-feedback" ErrorMessage="El campo es requerido."
                        runat="server" Display="Dynamic" />--%>
                </div>
            </div>
        </div>
    </div>
    <div class="text-right mb-3" id="buttons">
        <a role="button" class="btn btn-outline-dark text-uppercase fs-7 px-md-5 py-2 mr-4">Cancelar</a>
        <button type="button" id="guardar" class="btn btn-primary text-uppercase fs-7 px-md-5 py-2">Guardar</button>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
    </script>
    <%: Scripts.Render("~/js/Usuarios/jsAgregarEmpleado.js?1") %>
</asp:Content>
