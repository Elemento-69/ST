<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Mensajeria.aspx.cs" Inherits="Covialgt.Perfil.Mensajeria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
     <%: Styles.Render("~/Content/Mensajeria.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Mensajeria</h1>
    <hr class="thick"/>
   
    <div id="messages">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        deId = "<%= ViewState["deId"] ?? null %>"
    </script>
    <%: Scripts.Render("../js/jsMensajeria.js") %>
</asp:Content>
