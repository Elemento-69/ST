<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DocumentosDeCambio.aspx.cs" Inherits="Covialgt.Ejecucion.DocumentosDeCambio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Documentos de Cambio</h1>
    <hr class="thick" />
    <h4 class="mt-5">Registros Mensuales</h4>
     <div class="row mt-5 justify-content-end">
     <div class="col-md-5 " id="divRegresar">
            <div class="row justify-content-end">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>

            </div>
        </div>
         </div>
    <div class="row mt-5">
        <div class="form-group col-md-4">
             <a id="btnATE" class="btn btn-outline-secondary btn-form btn-block">ACUERDO DE TRABAJO EXTRA (ATE)</a>
        </div>
        <div class="form-group col-md-4">
            <a  id="btnOTS" type="button" class="btn btn-outline-secondary btn-form btn-block">ORDEN DE TRABAJO SUPLEMENTARIO (OTS)</a>
        </div>
        <div class="form-group col-md-4">
            <a type="button" id="btnOC" class="btn btn-outline-secondary btn-form btn-block">ORDEN DE CAMBIO (OC)</a>
        </div>
    </div>
    <div id="testDiv">
           
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="doc_cambio-table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Correlativo</th>
                    <th class="text-center">Descripción</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">Monto</th>
                    <th class="text-center">Días Plazo</th>
                    <th class="text-center">Estado</th>
                    <th class="text-center">Presentación</th>
                     <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/jsDocumentosCambio.js") %>
</asp:Content>
