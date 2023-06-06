<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Maquinaria.aspx.cs" Inherits="Covialgt.Ejecucion.Maquinaria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Registros Clímaticos</h1>
    <hr class="thick" />
    <br />
    <h5>Plan:  <%= ViewState["plan"] %></h5>
    <h5>Proyecto: <%= ViewState["proyecto"] %></h5>
    <div class="row justify-content-between">
        <div class="form-group col-md-6 col-lg-4 col-xl-3">
            <label for="Periodo1">Periodo</label>
            <select class="form-control" id="Periodos">
            </select>
        </div>
        <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" class="btn btn-outline-secondary btn-block" href="../Ejecucion/RegistroDatos">REGRESAR</a>
                </div>
                <div class="col-sm-6 col-xl-5">
                    <button type="submit" class="btn btn-primary btn-block">ACTUALIZAR</button>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered" id="registros-table">
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
</asp:Content>
