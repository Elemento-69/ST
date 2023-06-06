
<%@ Page Title="" Language="C#" Async="true" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DashboardGerencial.aspx.cs" Inherits="Covialgt.DashboardGerencial" %>

<%@ Register Assembly="DevExpress.Dashboard.v19.1.Web.WebForms, Version=19.1.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.DashboardWeb" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="js/jsDashboardGerencial.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
    <h1 class="mb-0">Dashboard Gerencial</h1>
    <hr class="thick" />
    <div class="row">
        <div class="form-group col-md-5">
            <label for="cmbPlanAnual">Plan Anual</label>
            <asp:DropDownList ID="cmbPlanAnual" CssClass="form-control" runat="server"  OnSelectedIndexChanged="cmbPlanAnual_SelectedIndexChanged" AutoPostBack="true"></asp:DropDownList>

        </div>
        <div class="form-group col-md-5">
            <label for="cmbPrograma">Programa</label>
            <asp:DropDownList ID="cmbProgramas" CssClass="form-control" runat="server" AutoPostBack="true"></asp:DropDownList>

        </div>
     
    </div>

    <div class="row" >
        
        <dx:ASPxDashboard  WorkingMode="Designer"
                ID="ASPxDashboard1" 
                runat="server" 
                Height="1000" 
                Width="100%" 
               OnCustomParameters="ASPxDashboard1_CustomParameters" OnSetInitialDashboardState="ASPxDashboard1_SetInitialDashboardState"></dx:ASPxDashboard>
      
       
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents();
        });
    </script>
</asp:Content>
