﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProyectosSinFotosPresenciales.aspx.cs" Inherits="Covialgt.Financiera.ProyectosSinFotosPresenciales" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Área Técnica</h1>
    <hr class="thick" />
    <h4 class="mt-5">Proyectos Sin Fotografías Presenciales</h4>
    <div class="row mt-5">
       <%-- <div class="form-group col-md-4">
             <a href="/Ejecucion/AcuerdoTrabajoExtra" class="btn btn-outline-secondary btn-form btn-block">ACUERDO DE TRABAJO EXTRA (ATE)</a>
        </div>
        <div class="form-group col-md-4">
            <a href="/Ejecucion/OrdenTrabajoSuplementario" type="button" class="btn btn-outline-secondary btn-form btn-block">ORDEN DE TRABAJO SUPLEMENTARIO (OTS)</a>
        </div>
        <div class="form-group col-md-4">
            <a href="/Ejecucion/OrdenDeCambio" type="button" class="btn btn-outline-secondary btn-form btn-block">ORDEN DE CAMBIO (OC)</a>
        </div>--%>
    </div>
    <div id="testDiv">
           
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-hover mt-4" id="proyectos-table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                    <th class="text-center"></th>
                    <th class="text-center">Año</th>
                    <th class="text-center">Proyecto</th>
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
    </script>
    <%: Scripts.Render("~/js/jsProyectosSinFotosPresenciales.js") %>
</asp:Content>
