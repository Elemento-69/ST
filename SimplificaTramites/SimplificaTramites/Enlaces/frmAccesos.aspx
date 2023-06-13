<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmAccesos.aspx.cs" Inherits="Covialgt.Enlaces.frmAccesos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Enlaces</h1>
    <hr class="thick" />
    <h2>Sistemas de apoyo</h2>
    <div class="row">
            <div class="col-md">
                <h4>EMERGENCIAS CIV</h4>
             <asp:HyperLink ID="hpemergencias" runat="server" ToolTip="Sitio de Emergencias"   NavigateUrl="http://www.covial.gob.gt:1090/emergencias" Target="_blank"  >
             <asp:Image ID="emergencias" runat="server"  ImageUrl="emergencia_civ.jpg"  Width="240" Height="200" CssClass="emergencia"  />
             </asp:HyperLink>
               <!-- <asp:Label ID="lblEmergencias"      runat="server"   Font-Bold="True" Text="EMERGENCIAS CIV"            CssClass="label"></asp:Label> -->
            </div>
    <div class="col-md">
        <h4>PUENTES</h4>
        <asp:HyperLink ID="hppuentes" runat="server" ToolTip="Sitio de Puentes"   NavigateUrl="http://www.covial.gob.gt:1090/puentes" Target="_blank">
             <asp:Image ID="puentes" runat="server"  ImageUrl="puentes.jpg"  Width="240" Height="200"    CssClass="puente"  />
             </asp:HyperLink>
        <!--<asp:Label ID="lblPuentes"          runat="server"   Font-Bold="True" Text="PUENTES"                    CssClass="label2"></asp:Label> -->
    </div>
        <div class="col-md">
            <h4>CONTRATOS</h4>
            <asp:HyperLink ID="hpcontratos" runat="server" ToolTip="Sitio de Contratos"   NavigateUrl="http://www.covial.gob.gt:1090/contratos" Target="_blank" >
             <asp:Image ID="contratos" runat="server"  ImageUrl="contrato.jpg"  Width="240" Height="200" CssClass="contrato"/>
             </asp:HyperLink>
            <!--<asp:Label ID="Label1"        runat="server"   Font-Bold="True" Text="CONTRATOS"                  CssClass="label3"></asp:Label> -->
        </div>
        <div class="col-md">
            <h4>GESTION DE INVENTARIOS</h4>
            <asp:HyperLink ID="hinventarios" runat="server" ToolTip="Sitio de Inventarios"   NavigateUrl="http://www.covial.gob.gt:1090/gestioninventario" Target="_blank">
             <asp:Image ID="inventarios" runat="server"  ImageUrl="inventarios.jpg"  Width="240" Height="200"    CssClass="inventario"  />
             </asp:HyperLink>
            <!--<asp:Label ID="lblInventarios"      runat="server"   Font-Bold="True" Text="GESTION DE INVENTARIOS"     CssClass="label4"></asp:Label> -->
        </div>
        <div class="col-md">
            <h4>GESTION ADMINISTRATIVA</h4>
            <asp:HyperLink ID="hadministrativo" runat="server" ToolTip="Administrativo"   NavigateUrl="frmAccesosAdmin.aspx" Target="_blank">
             <asp:Image ID="administrativo" runat="server"  ImageUrl="administrativo.jpg"  Width="240" Height="200"    CssClass="administrativo"  />
             </asp:HyperLink>
            <!--<asp:Label ID="lblAdministrativo"   runat="server"   Font-Bold="True" Text="GESTION ADMINISTRATIVA"     CssClass="label5"></asp:Label> -->
        </div>    
      </div>          
                
                
                
                
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    
</asp:Content>
