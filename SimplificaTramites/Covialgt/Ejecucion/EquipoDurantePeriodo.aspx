<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="EquipoDurantePeriodo.aspx.cs" Inherits="Covialgt.Ejecucion.EquipoDurantePeriodo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Estado de Equipo Durante el Período</h1>
    <hr class="thick" />
    <br/>
    <h5>Plan: <%= ViewState["plan"] %></h5>
    <h5>Proyecto: <%= ViewState["proyecto"] %></h5>
    <h5>Periodo: <%= ViewState["periodo"] %></h5>
    <div class="row justify-content-between mt-5">
        <div class="form-group col-md-6 col-lg-4 col-xl-3">
            <label for="equipos">Equipo</label>
            <select class="form-control" id="equipos"></select>
        </div>
        <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" class="btn btn-outline-secondary btn-block text-uppercase"  id="btnRegresarRegistroDatos">REGRESAR</a>
                </div>
                <div class="col-sm-6 col-xl-5">
                    <button type="submit" class="btn btn-primary btn-block">ACTUALIZAR</button>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive ">
        <table class="table table-bordered" id="equipos-table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Evento</th>
                     <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
        </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= ViewState["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        programa = "<%= ViewState["programa"] %>"
    </script>
    <%: Scripts.Render("~/js/jsEquipoDurantePeriodo.js") %>
</asp:Content>