<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="MensajesNomina.aspx.cs" Inherits="Covialgt.Mensajeria.MensajesNomina" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>

    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    
    <h1>Mensajes de nómina</h1>
    <hr class="thick" />

    <div id="card-mensajes-nomina" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
        <div class="card-body" >
                <div class="row">
                    <div class="col-3">
                        <label for="Anio">Año</label>
                                <select class="form-control" id="cmbAnio" name="Anio" required>
                                </select>
                    </div>
                    <div class="col-6" >
                        <label for="Nomina">Nómina</label>
                                <select class="form-control" id="cmbNomina" name="Nomina" required>
                                </select>
                    </div>         
                    <div class="col-3" style="text-align: right; padding-top:20px;" >
                        <div class="form-group custom-control custom-checkbox ">
                            <input type="checkbox" class="custom-control-input" id="chkAprobarNomina" onclick='fnActualizarEstadoNomina();'>
                            <label class="custom-control-label" for="chkAprobarNomina">Aprobar nómina</label>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    <br />

    <h2>Mensaje a enviar</h2>

    <div class="row">
        <div class="col-12">            
            <textarea class="form-control" id="txtMensaje" name="Mensaje" rows="10"></textarea>
        </div>
    </div>

    <div class="row" style="margin-top: 30px; margin-bottom: 30px;">
        <div class="col-3">
        </div>
        <div class="col-6" style="text-align: center;">
             <button type="button" id="btnEnviarCorreos" class="btn btn-primary btn-form" style="text-align:center;" onclick="fnEnviarCorreos();" >Enviar correos</button>
        </div>
        <div class="col-3">
        </div>
    </div>

    <div class="row" style="margin-bottom: 30px;">
        <div class="col-12">
            <div class="table-responsive">
                    <table id="tablePagos" class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="spacer" style="width: 30px"></th>                                 
                                <th style="width: 70px" >Año</th>
                                <th >Proyecto</th>                                
                                <th style="width: 120px">Estimación No.</th>
                                <th >Monto</th>
                                <th >ISR</th>
                                <th >Total</th>
                                <th >Usuario</th>
                                <th class="spacer" style="width: 30px"></th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                        </tbody>
                    </table>
                </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/Chart.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>

    <%--Archivos Js --%>
    <%: Scripts.Render("~/js/jsMensajesNomina.js") %>    
</asp:Content>
