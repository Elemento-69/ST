<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GestionTrabajosAdministracion.aspx.cs" Inherits="Covialgt.Ejecucion.GestionTrabajosAdministracion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/wizard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Gesti&oacute;n de Trabajos Por Administraci&oacute;n</h1>
    <hr class="thick" />
    <h2>Agregar Nuevo</h2>
      <div class="card custom-card border-0">
        <div id="msform">
            <div class="w25"></div>
            <ul id="progressbar" style="transform:translateX(25%)">
                <li class="active" id="general-wiz-header">
                    <div class="icon">
                        <i classas fa-file-alt fa-3x"></i>
                    </div>
                    <div class="number">1</div>
                    <div class="text-strong">Datos Generales</div>
                </li>
                <li id="componentes-wiz-header">
                    <div class="icon">
                        <i class="fas fa-adjust fa-3x"></i>
                    </div>
                    <div class="number">2</div>
                    <div class="text-strong">Componentes</div>
                </li>
            </ul>
            <div id="wizzard-content" class=" mx-2 mx-xl-5">
            <fieldset>
                 <div class="row justify-content-between">
                    <div class="form-group col-12 col-md-3 pr-md-4 pr-xl-5">
                        <label for="Anio">Año</label>
                        <input type="text" class="form-control" id="Anio" name="Anio" disabled value="<%= Session["plan"] %>">                                    
                    </div>
                    <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                        <label for="Proyecto">Proyecto</label>
                        <input type="text" class="form-control" id="Proyecto" name="Proyecto" disabled value="<%= Session["proyecto"] %>">                                    
                    </div>
                    <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                        <label for="Renglon">Renglon:</label>
                        <select class="form-control" id="Renglon" name="Renglon">
                        </select>
                    </div>
                    <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                        <label for="FechaTrabajo">Fecha de Trabajo:</label>
                        <div class="input-group date" id="FechaTrabajo-dp" data-target-input="nearest">
                            <input id="FechaTrabajo" type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input"  data-target="#FechaTrabajo-dp">
                            <div class="input-group-append" data-target="#FechaTrabajo-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>                                 
                    </div>
                    <div class="form-group col-12">
                        <label for="JustificacionGeneral">Justificaci&oacute;n</label>
                        <textarea class="form-control" id="JustificacionGeneral" name="JustificacionGeneral" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group col-12 text-right pt-5">
                    <button type="button" class="btn btn-primary btn-form next">
                        Siguiente
                    </button>
                </div>
            </fieldset>
            <fieldset>
                <div class="row justify-content-between" id="detail-form">
                    <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                        <label for="Unidad">Unidad</label>
                        <input type="text" class="form-control" id="Unidad" name="Unidad">                                    
                    </div>
                    <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                        <label for="Precio">Precio</label>
                        <input type="text" class="form-control frcurrency-mask" id="Precio" name="Precio">                                    
                    </div>
                    <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                        <label for="Cantidad">Cantidad</label>
                        <input type="text" class="form-control frdecimal-mask" id="Cantidad" name="Cantidad">                                    
                    </div>
                    <div class="form-group col-12">
                        <label for="Justificacion">Descripci&oacute;n</label>
                        <textarea class="form-control" id="Descripcion" name="Descripcion" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group col-12 text-right pt-5">
                    <button type="button" class="btn btn-primary btn-form" id="addDetail-btn">
                        Insertar
                    </button>
                </div>
                <hr class="my-5"/>
                <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="detail-table">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th></th>
                                <th>Descripci&oacute;n</th>
                                <th>Unidad</th>
                                <th class="text-right">Cantidad</th>
                                <th class="text-right">Precio</th>
                                <th class="text-right">Total</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody id="componentes-tbody">
                        </tbody>
                         <tfoot class="tfoot-no-border">
                            <tr>
                                <td colspan="7" class="justify-content-end">
                                    <div class="row">
                                        <div class="col-12 text-right">
                                            <p class="font-weight-bold d-inline mr-3">Monto Total</p>
                                            <p class="d-inline frcurrency-mask" id="totalDetail-table"></p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="form-group col-12 text-right">
                    <button type="button" class="previous btn btn-outline-secondary btn-form mb-3">
                        Anterior
                    </button>
                    <button type="button" class="btn btn-primary btn-form mb-3" id="finalizar-btn">
                        Finalizar
                    </button>
                </div>
            </fieldset>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/wizard.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsEditTableButtons.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
        usuario = "<%= Session["usuario"] %>"
        gestionId = "<%= ViewState["id"] ?? null %>"
    </script>
    <%: Scripts.Render("~/js/jsGestionTrabajosAdministracion.js") %>
</asp:Content>
