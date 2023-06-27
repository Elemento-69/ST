<%@ Page Title="frmAtencionSolicitud" Language="C#" MasterPageFile="../Site.Master" AutoEventWireup="true"  CodeBehind="frmAtencionSolicitud.aspx.cs" Inherits="SimplificaTramites.SolicitudConstanciaLS.frmAtencionSolicitud" %>






<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>

    <asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1 class="mb-0">Atención de Solicitudes</h1>
    <hr class="thick" />
    <br />
             
    <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label for="txtNombre" class="form-label">Nombre:</label>
                                    <input type="text" class="form-control" id="txtNombre" runat="server" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="txtDPI" class="form-label">DPI:</label>
                                    <input type="text" class="form-control" id="txtDPI" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="mb-3">
                                    <label for="txtUltimoSueldo" class="form-label">Último Sueldo:</label>
                                    <input type="text" class="form-control" id="txtUltimoSueldo" runat="server" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="ddlEstado" class="form-label">Estado:</label>
                                    <select id="ddlEstado" runat="server" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <table class="table table-bordered" id="tblContratos">
                            <thead>
                                <tr>
                                    <th>Contrato</th>
                                    <th>Renglón Presupuestario</th>
                                    <th>Tipo de Servicio prestado</th>
                                    <th>Puesto</th>
                                    <th>Sueldo u Honorarios</th>
                                    <th>Fecha de Inicio</th>
                                    <th>Fecha de Fin</th>
                                    <th>Controles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" class="form-control" id="txtContrato_1" runat="server" /></td>
                                    <td>
                                        <select id="ddlRenglon_1" runat="server" class="form-control">
                                            <option value="021">Renglón 021</option>
                                            <option value="022">Renglón 022</option>
                                            <option value="029">Renglón 029</option>
                                            <option value="Subrenglon 18">Subrenglón 18</option>
                                        </select>
                                    </td>
                                    <td><input type="text" class="form-control" id="txtTipoServicio_1" runat="server" /></td>
                                    <td><input type="text" class="form-control" id="txtPuesto_1" runat="server" /></td>
                                    <td><input type="text" class="form-control" id="txtSueldo_1" runat="server" /></td>
                                    <td>
                                        <div class="input-group date" id="inicio-dp_1" data-target-input="nearest">
                                            <input id="dpInicio_1" type="text" data-target="#inicio-dp_1" name="dpInicio_1" autocomplete="off" class="form-control datetimepicker-input">
                                            <div class="input-group-append" data-target="#inicio-dp_1" data-toggle="datetimepicker">
                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group date" id="fin-dp_1" data-target-input="nearest">
                                            <input id="dpFin_1" type="text" data-target="#fin-dp_1" name="dpFin_1" autocomplete="off" class="form-control datetimepicker-input">
                                            <div class="input-group-append" data-target="#fin-dp_1" data-toggle="datetimepicker">
                                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><button type="button" class="btn btn-danger btnDeleteRow"><i class="fas fa-trash"></i></button><button type="button" class="btn btn-danger btnUpdateRow"><i class="fas fa-save"></i></button></td>
                                    
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-primary" id="btnAgregarFila">Agregar Fila</button>
                        <button type="button" class="btn btn-primary" id="btnCancelarAtencion">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnGenerarConstancia">Generar Constancia</button>
                        <button type="button" class="btn btn-primary" id="btnSolicitudArchivo">Solicitud Archivo</button>
                    </div>
                </div>

        <div class="modal fade" id="winSolicitudArchivo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-transparent" role="document">
            <div style="height: 500px" class="modal-content">
                <div class="modal-header">
                    <h3>
                        <label id="lblTitulo">Solicitar información a Archivo</label>
                    </h3>
                    
                    <button class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="dModalBody" style="height: 400px" class="modal-body">
                    <textarea class="form-control" rows="10" maxlength="1000">
                    </textarea>
                    <br/>
                    <button class="btn btn-form btn-primary" id="btnEnviarSolicitud" type="button">Enviar solicitud</button>
                </div>
            </div>
        </div>
    </div>

    </asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/DataTables/defaultTable.js") %>
    <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%--    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    --%>
    <%--<script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>--%>

    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
        usuario = "<%= Session["usuario"] %>"
        ReportesVialesPath = "<%= ViewState["ReportesVialesPath"] ?? "null" %>";
        rolConsultas = '<%= ViewState["rolConsultas"] %>'
    </script>
    <!-- Scripts -->
                       
    <script src="../js/jsAtencionSolicitudConstancias.js"></script>
</asp:Content>