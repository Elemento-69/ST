<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmMnttoUsuarios.aspx.cs" Inherits="Covialgt.Usuarios.frmMnttoUsuarios" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <h1>Usuarios</h1>
    <hr class="thick" />
    <h2>Mantenimiento de Usuarios</h2>
    <div class="row">
        <div class="col-md-2">
                <button type="button" id="btnAgregarEmpleado" class="btn btn-primary btn-block" > AGREGAR</button>
         </div>
        <div class="col-md-7">
                
         </div>
        <div class="col-md-3">
                <button type="button" id="btnConfigurarCambioPass" class="btn btn-primary btn-block" > CONFIGURAR VALIDÉZ CONTRASEÑA</button>
         </div>

        <!--<div class="col-md-3">
            <label for="txtParametro">Termino de Buscqueda:</label>
            <input type="text" class="form-control" id="txtParametro" name="txtParametro">
        </div>-->
    </div>
    <div class="row">
        <div class="col-md-3">
        
    </div>
   </div>
   <br />
    <div class="row">
        <div class="col-12">
            <div class="checkbox">
            <label>
                <input type="radio" name="usuarios" id="usuarios-todos" value="1" checked class="text-muted">Todos
                <input type="radio" name="usuarios" id="usuarios-user" value="2" class="text-muted">Usuarios
                <input type="radio" name="usuarios" id="usuarios-nouser" value="3 " class="text-muted">No Usuarios
            </label>
        </div>
            <div class="table-responsive">
                <table class="table table-bordered table-hover mt-4" id="usuarios-table">
                    <thead>

                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center"></th>
                            <th class="text-center">Identificador</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Apellido</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Cargo</th>
                            <th class="text-center">Telefonos</th>
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

           <!-- Start Modal CONFIGURAR PERIODO DE VALIDEZ DE Password -->
    <div class="modal fade" id="modalConfigurarTiempoPass" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Periódo de validez de contraseñas</h5>
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
                                                    <input type="number" id="periodo_dias" class="form-control w-100" />
                                                </div>
                                                
                                                <div class="col-12 pt-3 text-right">
                                                    <button type="button" id="btnGuardarTiempo" class="btn btn-primary px-5 btn-sm">Guardar</button>
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
    <%: Scripts.Render("~/js/Usuarios/jsMnttoUsuarios.js") %>
</asp:Content>