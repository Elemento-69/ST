<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmAccesosAdmin.aspx.cs" Inherits="Covialgt.Enlaces.frmAccesosAdmin" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <h1>Enlaces</h1>
    <hr class="thick" />
    <h2>Gestión Administrativa</h2>
    <div class="row">
            <div class="col-md">
                <h4>COMPRAS</h4>
             <asp:HyperLink ID="hpemergencias" runat="server" ToolTip="Sitio de Compras"   NavigateUrl="http://www.covial.gob.gt:10850/Paginas/frmLogIn.aspx?ReturnUrl=%2f" Target="_blank"  >
             <asp:Image ID="Compras" runat="server"  ImageUrl="compras2.png"  Width="240" Height="200" CssClass="emergencia"  />
             </asp:HyperLink>
             </div>
            <div class="col-md">
                <h4>ALMACEN</h4>
                <asp:HyperLink ID="hppuentes" runat="server" ToolTip="Sitio de Almacen"   NavigateUrl="http://www.covial.gob.gt:10852/Paginas/frmLogIn.aspx?ReturnUrl=%2f" Target="_blank">
                     <asp:Image ID="Almacen" runat="server"  ImageUrl="almacen1.png"  Width="240" Height="200"    CssClass="puente"  />
                     </asp:HyperLink>
            </div>
            <div class="col-md">
                <h4>INVENTARIO</h4>
                <asp:HyperLink ID="hpcontratos" runat="server" ToolTip="Sitio de Inventario"   NavigateUrl="http://www.covial.gob.gt:10851/Paginas/frmLogIn.aspx" Target="_blank" >
                 <asp:Image ID="Inventario" runat="server"  ImageUrl="inventario1.png"  Width="240" Height="200" CssClass="contrato"/>
                 </asp:HyperLink>
            </div>
            <div class="col-md">
                <h4>COMBUSTIBLE</h4>
                <asp:HyperLink ID="hinventarios" runat="server" ToolTip="Vehiculos"   NavigateUrl="http://www.covial.gob.gt:10853/Paginas/frmLogIn.aspx?ReturnUrl=%2f" Target="_blank">
                 <asp:Image ID="Vehiculos" runat="server"  ImageUrl="combustible.png"  Width="240" Height="200"    CssClass="inventario"  />
                 </asp:HyperLink>
            </div>
            <div class="col-md">
                <h4>REGISTRO DE PERSONAL</h4>
                <asp:HyperLink ID="hadministrativo" runat="server" ToolTip="Registro de Personal"   Target="_blank">
                 <asp:Image ID="administrativo" runat="server"  ImageUrl="rrhh.png"  Width="240" Height="200"    CssClass="administrativo"  />
                 </asp:HyperLink>
            </div>    
      </div>          
                
                
                
                
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    
</asp:Content>
