<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BandejaDeEntrada.aspx.cs" Inherits="Covialgt.Perfil.BandejaDeEntrada" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">   
    <h1>Mensajeria</h1>
    <hr class="thick" />
    <br />
    <h5>Bandeja de Entrada</h5>
    <div class="table-responsive">
        
    <table class="table table-bordered table-hover" id="bandeja_entrada-table">
    <thead>
        <tr>
            <th class="spacer"></th>
            <th class="text-center"></th>
            <th class="text-center">De</th>
            <th class="text-center">Asunto</th>
            <th class="text-center">Fecha de Envio</th>
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
            token = "<%= Session["token"] ?? "null" %>"
            usuario = "<%= Session["usuario"] %>"
        </script>
    <%: Scripts.Render("../js/jsBandejaDeEntrada.js?1") %>
</asp:Content>
