<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SaldosDeEstimacionesSuper.aspx.cs" Inherits="Covialgt.Ejecucion.Saldos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <location path="somefile.aspx">
        <system.web>
            <httpruntime executiontimeout="80" />
        </system.web>
    </location>

    <h1 id="titulo">Gestion de Estimaciones Supervisores</h1>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>

    <hr class="thick" />
    <div class="row justify-content">
          
        <div class="form-group col-md-5 col-lg-5">
            <label for="saldoAnio">Año</label>
            <select id="selecAnio" class="form-control " placeholder="Seleccione año del proyecto"></select>
        </div>

        <div class="form-group col-md-5 col-lg-3 offset-lg-1">
            <label for="Monto">Monto a cobrar</label>
             <input type="text" id="Montoinput" class="form-control w-100" placeholder="Monto" disabled="disabled" >
        </div>

        <div class="form-group col-md-5 col-lg-5 col-xl-5">
            <label for="ProyectoTexto">Proyecto</label>
            <select type=¨text¨ id="selecProy" class="form-control w-100" placeholder="Seleccione proyecto"></select>
        </div>       
    </div>
       <!-- div form fechas -->
       <div class="row">
        <div class="form-group col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha desde</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest" >
                    <input class="form-control  datetimepicker-input ejecucion-date" id = "fechaDesde" data-target="#desde-hp" autocomplete="off"/>
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group col-md-2 col-lg-3">
            <div class="form-group">
                <label for="desdeInput">Fecha Hasta</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest" >
                    <input class="form-control  datetimepicker-input ejecucion-date" id = "fechaHasta" data-target="#hasta-hp" autocomplete="off"/>
                    <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" row form-group col-md-5 col-lg-4 align-content-center">    
            <button class="btn btn-primary" id="btn-proyecto" type="button" style="height: 38px" >
                <img src="~/Images/search.svg" width="20" height="20" alt="Buscar" runat="server" />
            </button>
            <div class=" text-center " id="contImprimir">
                <button type="button" id="btnImprimir" class="btn btn-light">
                    <i class="fas fa-print fa-2x"></i>
                </button>
                <div class="font-weight-bold text-center">Imprimir</div>
            </div>
        </div>
    </div>
    <!-- fin div form fechas -->

    <!--inicio estimacion del supervisor en el periodo-->
     <div class="panel panel-default my-4">
        <div class="panel-heading text-primary">
            <h5 class="panel-title" data-toggle="collapse" data-target="#collapseSupervision">Estimacion del Supervisor en el Periodo</h5>
            <hr class="my-2 collapse-hr" />
        </div>
        <div id="collapseSupervision" class="panel-collapse collapse">
            <div class="panel-body">
                <div class="table-responsive my-3">
                    <table class="table table-bordered" id="table-Supervisor">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th class="text-center">Correlativo de la Estimacion</th>
                                <th class="text-center">Monto de la Estimacion</th>
                                <th class="text-left">Estado de la estimacion</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!--fin tabla estimacion-->

    <!-- inicio tabla Ejecucion por tramo-->
    <div class="panel panel-default my-4">
        <div class="panel-heading text-primary">
            <h5 class="panel-title" data-toggle="collapse" data-target="#collapseTramos">Ejecucíon por Tramo</h5>
            <hr class="my-2 collapse-hr" />
        </div>
        <div id="collapseTramos" class="panel-collapse collapse">     
                <div class="table-responsive ">
                    <table class="table table-bordered" id="table-tramos" >
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th class="text-center">Año de Ejecutora</th>
                                <th class="text-center">Proyecto Codigo de Ejecutora</th>
                                <th class="text-center">Tramo</th>
                                <th class="text-center">Codigo de Ruta</th>
                                <th class="text-center">Deuda a Ejecutora</th>
                                <th class="text-center">Factor Deuda a Supervisor</th>
                                <th class="text-center">Deuda a Supervisor</th>
                                <th class="text-center">Pago a Ejecutora</th>
                                <th class="text-center">Porcentaje a Supervisor</th>
                                <th class="text-center">Pago a Supervisor</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
            </div>
        
    </div>
    <!-- fin ejecucion por tramo-->

    <!--Inicio CDP-->
    <div class="panel my-4">
        <div class="panel-heading text-primary">
            <h5 class="panel-title" data-toggle="collapse" data-target="#collapseRenglones">CDP<span id="vCDP"></span></h5>
        </div>
        <div id="collapseRenglones" class="panel-collapse collapse">
                    <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="table-CDP" > 
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th class="text-center">Año de Ejecutora</th>
                                <th class="text-center">Proyecto Codigo de Ejecutora</th>
                                <th class="text-left">Tramo</th>
                                <th class="text-center">Codigo de Ruta</th>
                                <th class="text-left">Deuda a Ejecutora</th>
                                <th class="text-left">Factor a Deuda a Supervisor</th>
                                <th class="text-center">CDP</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                         </tfoot>
                    </table>
                   </div>
            </div>
        </div>
    
    <!--fin CDP-->

    <div id="testDiv"></div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/Chart.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
        usuario = "<%= Session["usuario"] %>"
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>"
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>"

        function evaluarOperar() {
            if (!Page_ClientValidate('valoperar')) return true;
            return false;
        }
    </script>
    <%: Scripts.Render("~/js/jsSaldosDeEstimacionesSuper.js") %>

</asp:Content>

