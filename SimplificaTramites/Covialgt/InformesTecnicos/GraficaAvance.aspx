<%@ Page Language="VB" AutoEventWireup="false" CodeFile="GraficaAvance.aspx.vb" Inherits="Covialgt_InformesTecnicos_GraficaAvance" %>
<%@ Register Assembly="ZedGraph.Web" Namespace="ZedGraph.Web" TagPrefix="cc2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Gráfica de avance</title>
</head>
<body>
    <form id="form1" runat="server">
       <img border="0" onclick="javascript:print()" src="../Images/print_32.png" /><br />
        <table style="width: 700px; height: 60px">
            <tr>
                <td style="width: 100px">
                    <asp:Image ID="Image1" runat="server" ImageUrl="../Images/COVIAL.png" /></td>
                <td style="width: 600px; text-align: center">
                    <span style="font-family: Arial"><strong>MINISTERIO DE COMUNICACIONES INFRAESTRUCTURA
                        Y VIVIENDA<br />
                        UNIDAD EJECUTORA DE CONSERVACION VIAL</strong></span></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center; height: 37px;">
                    <hr />
                </td>
            </tr>
        </table>

        <asp:Label ID="Label1" runat="server" Font-Bold="True" Font-Size="12pt"></asp:Label><br />
        <br />

        <cc2:ZedGraphWeb ID="graficoLinear" runat="server" AxisChanged="True" BarBase="X"
            BarType="Cluster" BaseDimension="8" CacheDuration="0" CacheSuffix="" DataMember=""
            Height="500" IsFontsScaled="True" IsIgnoreInitial="False" IsIgnoreMissing="False"
            IsImageMap="False" IsPenWidthScaled="False" IsShowTitle="True" LineType="Normal"
            MinBarGap="0.2" MinClusterGap="1" RenderedImagePath="~/Temporales/Graficos" TmpImageDuration="12"
            Width="685">
            <XAxis AxisColor="Black" Cross="0" CrossAuto="True" IsOmitMag="False" IsPreventLabelOverlap="True"
                IsShowTitle="True" IsTicsBetweenLabels="True" IsUseTenPower="False" IsVisible="True"
                IsZeroLine="False" MinSpace="0" Title="" Type="Linear">
                <FontSpec Angle="0" Family="Arial" FontColor="Black" IsBold="True" IsItalic="False"
                    IsUnderline="False" Size="14" StringAlignment="Center">
                    <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                        IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                    <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                </FontSpec>
                <MinorGrid Color="Black" DashOff="5" DashOn="1" IsVisible="False" PenWidth="1" />
                <MinorTic Color="Black" IsInside="True" IsOpposite="True" IsOutside="True" PenWidth="1"
                    Size="5" />
                <MajorTic Color="Black" IsInside="True" IsOpposite="True" IsOutside="True" PenWidth="1"
                    Size="5" />
                <Scale Align="Center" Format="g" FormatAuto="False" IsReverse="False" Mag="0" MagAuto="False"
                    MajorStep="1" MajorStepAuto="True" MajorUnit="Day" Max="0" MaxAuto="True" MaxGrace="0.1"
                    Min="0" MinAuto="True" MinGrace="0.1" MinorStep="1" MinorStepAuto="True" MinorUnit="Day">
                    <FontSpec Angle="0" Family="Arial" FontColor="Black" IsBold="False" IsItalic="False"
                        IsUnderline="False" Size="14" StringAlignment="Center">
                        <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                            IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                        <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                    </FontSpec>
                </Scale>
                <MajorGrid Color="Black" DashOff="5" DashOn="1" IsVisible="False" PenWidth="1" />
            </XAxis>
            <Y2Axis AxisColor="Black" Cross="0" CrossAuto="True" IsOmitMag="False" IsPreventLabelOverlap="True"
                IsShowTitle="True" IsTicsBetweenLabels="True" IsUseTenPower="False" IsVisible="False"
                IsZeroLine="True" MinSpace="0" Title="" Type="Linear">
                <FontSpec Angle="0" Family="Arial" FontColor="Black" IsBold="True" IsItalic="False"
                    IsUnderline="False" Size="14" StringAlignment="Center">
                    <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                        IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                    <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                </FontSpec>
                <MinorGrid Color="Black" DashOff="5" DashOn="1" IsVisible="False" PenWidth="1" />
                <MinorTic Color="Black" IsInside="True" IsOpposite="True" IsOutside="True" PenWidth="1"
                    Size="5" />
                <MajorTic Color="Black" IsInside="True" IsOpposite="True" IsOutside="True" PenWidth="1"
                    Size="5" />
                <Scale Align="Center" Format="g" FormatAuto="False" IsReverse="False" Mag="0" MagAuto="False"
                    MajorStep="1" MajorStepAuto="True" MajorUnit="Day" Max="0" MaxAuto="True" MaxGrace="0.1"
                    Min="0" MinAuto="True" MinGrace="0.1" MinorStep="1" MinorStepAuto="True" MinorUnit="Day">
                    <FontSpec Angle="-90" Family="Arial" FontColor="Black" IsBold="False" IsItalic="False"
                        IsUnderline="False" Size="14" StringAlignment="Center">
                        <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                            IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                        <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                    </FontSpec>
                </Scale>
                <MajorGrid Color="Black" DashOff="5" DashOn="1" IsVisible="False" PenWidth="1" />
            </Y2Axis>
            <MasterPaneBorder Color="Black" InflateFactor="0" IsVisible="True" Width="1" />
            <MasterPaneFill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100"
                IsScaled="True" IsVisible="True" RangeMax="0" RangeMin="0" Type="Solid" />
            <PaneBorder Color="Black" InflateFactor="0" IsVisible="True" Width="1" />
            <YAxis AxisColor="Black" Cross="0" CrossAuto="True" IsOmitMag="False" IsPreventLabelOverlap="True"
                IsShowTitle="True" IsTicsBetweenLabels="True" IsUseTenPower="False" IsVisible="True"
                IsZeroLine="True" MinSpace="0" Title="" Type="Linear">
                <FontSpec Angle="-180" Family="Arial" FontColor="Black" IsBold="True" IsItalic="False"
                    IsUnderline="False" Size="14" StringAlignment="Center">
                    <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                        IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                    <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                </FontSpec>
                <MinorGrid Color="Black" DashOff="5" DashOn="1" IsVisible="False" PenWidth="1" />
                <MinorTic Color="Black" IsInside="True" IsOpposite="True" IsOutside="True" PenWidth="1"
                    Size="5" />
                <MajorTic Color="Black" IsInside="True" IsOpposite="True" IsOutside="True" PenWidth="1"
                    Size="5" />
                <Scale Align="Center" Format="g" FormatAuto="False" IsReverse="False" Mag="0" MagAuto="False"
                    MajorStep="1" MajorStepAuto="True" MajorUnit="Day" Max="0" MaxAuto="True" MaxGrace="0.1"
                    Min="0" MinAuto="True" MinGrace="0.1" MinorStep="1" MinorStepAuto="True" MinorUnit="Day">
                    <FontSpec Angle="90" Family="Arial" FontColor="Black" IsBold="False" IsItalic="False"
                        IsUnderline="False" Size="14" StringAlignment="Center">
                        <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                            IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                        <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                    </FontSpec>
                </Scale>
                <MajorGrid Color="Black" DashOff="5" DashOn="1" IsVisible="False" PenWidth="1" />
            </YAxis>
            <PaneFill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                IsVisible="True" RangeMax="0" RangeMin="0" Type="Solid" />
            <ChartFill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                IsVisible="True" RangeMax="0" RangeMin="0" Type="Brush" />
            <ChartBorder Color="Black" InflateFactor="0" IsVisible="True" Width="1" />
            <FontSpec Angle="0" Family="Arial" FontColor="Black" IsBold="True" IsItalic="False"
                IsUnderline="False" Size="16" StringAlignment="Center">
                <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                    IsVisible="True" RangeMax="0" RangeMin="0" Type="None" />
                <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
            </FontSpec>
            <Margins Bottom="10" Left="10" Right="10" Top="10" />
            <Legend IsHStack="True" IsReverse="False" IsVisible="True" Position="Top">
                <Location AlignH="Left" AlignV="Center" CoordinateFrame="ChartFraction" Height="0"
                    Width="0" X="0" Y="0">
                    <TopLeft X="0" Y="0" />
                    <BottomRight X="0" Y="0" />
                </Location>
                <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                    IsVisible="True" RangeMax="0" RangeMin="0" Type="Brush" />
                <Border Color="Black" InflateFactor="0" IsVisible="True" Width="1" />
                <FontSpec Angle="0" Family="Arial" FontColor="Black" IsBold="False" IsItalic="False"
                    IsUnderline="False" Size="12" StringAlignment="Center">
                    <Fill AlignH="Center" AlignV="Center" Color="White" ColorOpacity="100" IsScaled="True"
                        IsVisible="True" RangeMax="0" RangeMin="0" Type="Solid" />
                    <Border Color="Black" InflateFactor="0" IsVisible="False" Width="1" />
                </FontSpec>
            </Legend>
        </cc2:ZedGraphWeb>


    </form>
</body>
</html>
