<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ReporteFotografias.aspx.vb" Inherits="Paginas_Procesos_Formularios_InformeTecnico_ReporteFotografias" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Reporte Fotográfico</title>
</head>
<body>
    <img border="0" onclick="javascript:print()" src="../Images/print_32.png" /><br /><br />
    <form id="form1" runat="server">
    <div>
        <table style="width: 700px; height: 60px">
            <tr>
                <td style="width: 100px">
                    <asp:Image ID="Image1" runat="server" ImageUrl="../Images/COVIAL.png" /></td>
                <td style="width: 600px; text-align: center;">
                    <span style="font-family: Arial"><strong>MINISTERIO DE COMUNICACIONES INFRAESTRUCTURA
                        Y VIVIENDA<br />
                        UNIDAD EJECUTORA DE CONSERVACION VIAL</strong></span></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center">
        <hr />
                </td>
            </tr>
        </table>
        <strong><span style="font-family: Arial">
            <br />
            REPORTE FOTOGRÁFICO<br />
            <asp:Label ID="lblInfo" runat="server" Font-Size="12pt"></asp:Label><br />
            <br />
        </span></strong>
        <asp:Repeater ID="Repeater1" runat="server" DataSourceID="OrigenFoto">
            <ItemTemplate>
           
                <table>
                    <tr>
                        <td align="right">
                            <b>Fotografía:</b></td>
                        <td>
                            <a href='<%# obtenerFoto(eval("FotografiaID")) %>' target="_blank" >
                                <asp:Image ID="imgFoto" ImageUrl='<%# obtenerImagen(eval("Path"), eval("FotoNombre")) %>' Width="250px" Height="175px" runat="server" />
                            </a>                        
                        </td>
                    </tr>

                    <tr>
                        <td align="right">
                            <b>Tramo:</b></td>
                        <td>
                            <%#Eval("TramoDesc")%>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <b>Descripción:</b></td>
                        <td>
                            <%#Eval("Descripcion")%>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <b>Estación:</b></td>
                        <td>
                            <%#Eval("Estacion")%>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <b>Fecha Realizó:</b></td>
                        <td>
                            <%#Eval("Fecha")%>
                        </td>
                    </tr>
                                     
                </table>
                <br />
            </ItemTemplate>
        </asp:Repeater>
        <br />
        <asp:ObjectDataSource ID="OrigenFoto" runat="server" DeleteMethod="Operacion" InsertMethod="Operacion"
            SelectMethod="ObtenerUno" TypeName="Covialgt.Reportes.Catalogos" UpdateMethod="Operacion">
        </asp:ObjectDataSource>
    
    </div>
    </form>
</body>
</html>
