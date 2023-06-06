<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TrasladoEstimaciones.aspx.cs" Inherits="Covialgt.Estimaciones.TrasladoEstimaciones" %>
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
    
    <h1>Traslado de estimaciones</h1>
    <hr class="thick" />

    <div id="card-traslado-estimaciones" class="card custom-card" style="margin-left: 10px; margin-top: 10px;  margin-right: 30px; margin-bottom: 10px;" >          
        <div class="card-body" >
                <div class="row">
                    <div class="col-3">
                        <label for="Anio">Año</label>
                                <select class="form-control" id="cmbAnio" name="Anio" required>
                                </select>
                    </div>
                    <div class="col-6" >
                        <label for="TerminoBusqueda">Término de búsqueda</label>
                        <input type="text" class="form-control" id="txtTerminoBusqueda" name="TerminoBusqueda"  >
                    </div>         
                    <div class="col-3" style="text-align: right; padding-top:30px;" >
                        <button type="button" id="btnBuscar" class="btn btn-secondary btn-form" style="text-align:center;" onclick="fnCargarTablaDocsCobro();" >Buscar</button>
                    </div>
                </div>
        </div>
    </div>

    <div class="row" style="margin-top: 10px; margin-left: 15px; margin-bottom: 50px; padding-right: 50px;">
        <div class="col-3" >
            <div class="form-group ">
            	        <label for="desdeInput">Fecha:</label>
	                    <div class="input-group date" id="desde-dp" data-target-input="nearest">
	                        <input id="fechaInput" type="text" name="desde" autocomplete="off" class="form-control">
	                        <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
	                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
	                        </div>
	                    </div>
            </div>
        </div>
        <div class="col-6" >
        </div>
        <div class="col-3" style="padding-top: 30px; text-align: right;" >
            <button type="button" id="btnSeleccionarTodos" class="btn btn-secondary btn-form" style="text-align:center;" onclick="fnAgregarTodosParaTraslado();" >Seleccionar todos</button>
        </div>
    </div>

    <h2>Documentos de cobro</h2>

    <div class="row">
        <div class="col-12">
                <div class="table-responsive">
                    <table id="tableDocumentos" class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="spacer" style="width: 30px"></th>
                                 <th class="text-center" style="width: 50px"></th>                        
                                <th style="width: 70px">Año</th>
                                <th style="width: 70px">Proyecto</th>
                                <th style="width: 70px">Correlativo</th>
                                <th >Período</th>
                                <th style="width: 100px">Monto</th>

                                <th style="width: 100px">Estado</th>                        
                                <th class="spacer" style="width: 30px"></th>
                            </tr>
                        </thead>
                        <tbody id="documentos-tbody">
                        </tbody>
                    </table>
                </div>
        </div>
    </div>

    <br />

    <h2>Documentos de cobro a incluir en el traslado</h2>

    <div class="row" style="margin-bottom: 50px; padding-right: 50px;">
        <div class="col-9">
                <div class="table-responsive">
                    <table id="tableDocsIncluir" class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="spacer" style="width: 30px"></th>
                                 <th class="text-center" style="width: 70px"></th>                        
                                <th >Año</th>
                                <th >Proyecto</th>                                
                                <th >Correlativo</th>                                         
                                <th class="spacer" style="width: 30px"></th>
                            </tr>
                        </thead>
                        <tbody id="registros-incluir-tbody">
                        </tbody>
                    </table>
                </div>
        </div>
        <div class="col-3" style="text-align: right;">
            <button type="button" id="btnTrasladar" class="btn btn-primary btn-form" style="text-align:center;" onclick="fnTrasladar();" >Trasladar</button>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>    
    <%: Scripts.Render("~/js/inputmask.js") %>

    <%--Archivos Js --%>
    <%: Scripts.Render("~/js/jsTrasladoEstimaciones.js") %>    
</asp:Content>
