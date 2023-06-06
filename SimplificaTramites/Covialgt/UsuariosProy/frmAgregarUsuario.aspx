<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmAgregarUsuario.aspx.cs" Inherits="Covialgt.UsuariosProy.frmAgregarUsuario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <h1>Usuarios</h1>
    <hr class="thick" />
    <h2>Gestión Usuarios de Proyectos</h2>
    <div class="row">

        <div class="col-md-3">
            <label for="txtParametro">Buscar Proyecto</label>
            <input type="text" class="form-control" id="txtParametro" name="txtParametro">
        </div>
        <div class="col-md-6">
            <label for="Selectplan">Plan Anual</label>
            <select id="Selectplan" class="form-control"></select>

        </div>
        <div class="col-md-3 pt-4">
            <button class="btn btn-primary" type="button" id="btnBuscar">Buscar</button>
        </div>

    </div>
    <div class="row justify-content-center">
        <div class="checkbox">
            <label>
                <input type="radio" name="usuarios" id="usuarios-nouser" value="3 " class="text-muted">No Usuarios
                    <input type="radio" name="usuarios" id="usuarios-user" value="2" class="text-muted">Usuarios
                    <input type="radio" name="usuarios" id="usuarios-todos" value="1" checked class="text-muted">Todos
            </label>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h4>Crear Nueva Cuenta</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <label for="txtUsusuario">Nombre de usuario</label>
            <input type="text" class="form-control" id="txtUsusuario" name="txtUsusuario" disabled>
            <input type="text" class="form-control" id="txtAnio" name="txtAnio" style="display: none">
            <input type="text" class="form-control" id="txtProy" name="txtProy" style="display: none">
        </div>
        <div class="col-md-2 pt-4">
            <button class="btn btn-primary btn-sm" type="button" id="btnGuardarUsuario" style="height: 38px">Guardar Usuario</button>
        </div>
        <div class="col-md-3 justify-content-center pt-4">
        
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkAprob" style="display: none">
                <label class="form-check-label" for="LabelchkAprob" id="LabelchkAprob" style="display: none">
                Aprobado?
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkBlock" style="display: none">
                <label class="form-check-label" for="LabelchkBlock" id="LabelchkBlock" style="display: none">
                Bloqueado?
                </label>
            </div>
            <!--<button id="btnRestablecerContraseña" class="closing" onClick="javascript:irDashboard()"><img src="RestablecerClave.jpg" Width="50" Height="50"  title="Reestablecer Clave"/></button> <a href="../Utils/">../Utils/</a> -->
                <span class="text-danger h5" id="EstadoBloqUsuario" ></span>
              </div>
        <div class="col-md-3 justify-content-center pt-4">
            <div class="form-group">
     <!--<a data-toggle="modal" id="imgresetclave" style="display: none" href="#exampleModal" onClick="javascript:cargarUsuario()"><img src="RestablecerClave.jpg" Width="50" Height="50"  title="Reestablecer Clave"/></a>-->
         <a data-toggle="modal" id="imgresetclave" style="display: none" href="#exampleModal" onClick="javascript:cargarUsuario()" class="btn btn-primary" >REESTABLECER CLAVE</a>
        </div>
        </div>
                  
        <div class="col-md-3 justify-content-center pt-4">
        <div class="checkbox">
            <label>
                <input type="radio" name="empresa" id="contrtatista" class="text-muted" disabled style="display: none">
                    <input type="radio" name="empresa" id="supervisor" class="text-muted" disabled style="display: none">
            </label>
        </div>
    </div>
        
    </div>
    

    <br />
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-bordered table-hover mt-4" id="proyectosUsuario-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center"></th>
                            <th class="text-center">Año</th>
                            <th class="text-center">Codigo Proyecto</th>
                            <th class="text-center">Descripción</th>
                            <th class="text-center">NIT</th>
                            <th class="text-center">Nombre</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
           <!-- Start Modal Reset Password -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Reestablecer Password</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                            <div class="col-xl-12 p-0">
                                <div class="card border-0 h-100">
                                    <div class="card-body border-left h-100 p-4">
                                        <div class="d-flex align-items-center h-100">
                                            <div class="row">
                                                <div class="col-12 py-1">
                                                    <label for="plan-anio">Usuario:</label>
                                                    <input type="text" id="usuario-password" class="form-control w-100" />
                                                </div>
                                                <div class="col-12 py-1">
                                                    <label for="plan-nombre">Nuevo Password:</label>
                                                    <input type="text" id="clave-password" class="form-control w-100" />
                                                </div>
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardarNuevaClave" class="btn btn-primary px-5 btn-sm">Guardar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <div class="modal-footer">
                
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
    <%: Scripts.Render("~/js/UsuariosProy/jsAgregarUsuario.js") %>
</asp:Content>
