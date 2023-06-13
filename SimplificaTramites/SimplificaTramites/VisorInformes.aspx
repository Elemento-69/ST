<%@ Page Title="" Language="C#" AutoEventWireup="true" CodeBehind="VisorInformes.aspx.cs" Inherits="Covialgt.VisorInformes" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Reportes -COVIAL-</title>
    <script type="text/javascript">
        window.onload = function () {
            window.frames['ReportFrame<%= ReportViewer1.ClientID %>'].
                window.frames['report'].
                document.getElementById('oReportCell').
                style.width = '100%';
        }
    </script>
</head>
<body>
    <form id="form1" runat="server" >
    
 <rsweb:ReportViewer ID="ReportViewer1" runat="server" Height="530px" Width="100%" ShowToolBar="true" SizeToReportContent="True" OnPreRender="ReportViewer1_PreRender">
        </rsweb:ReportViewer>    
         <asp:ObjectDataSource ID="OrigenDatos" runat="server" TypeName="Covialgt.Reportes.Reportes"/>
   
 </form>
</body>
</html>
