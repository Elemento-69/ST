Imports System.Data
Imports System.Drawing
Imports ZedGraph
Imports ZedGraph.Web

Imports Covialgt.Models


Partial Class Covialgt_InformesTecnicos_GraficaAvance
    Inherits System.Web.UI.Page

    Private _AnioId As Integer
    Private _Proyecto As String
    Private _PeriodoCorrel As Integer
    Private _EstimacionCorr As Integer

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        _AnioId = Request.QueryString("AnioID")
        _Proyecto = Request.QueryString("ProyectoCodigo")
        _PeriodoCorrel = Request.QueryString("PeriodoCorrel")
        Dim intRet As Integer = 0
        'Solo cuando se ha llegado a traves de una reunión, se muestra
        'su texto como referencia y se muestra los acuerdos respectivos:
        If Not String.IsNullOrEmpty(_Proyecto) And _AnioId > 0 Then
            'Verificar que los parametros recibidos por la página no han sido alterados desde que fueron enviados por la página origen:

            If Not Page.IsPostBack Then
                Label1.Text = "Gráfica de avance para el proyecto: " + _Proyecto.ToString
                Page.Title = Page.Title + " para el proyecto: " + _Proyecto.ToString
            End If
        End If
    End Sub


    Protected Sub graficoLinear_RenderGraph(ByVal webObject As ZedGraph.Web.ZedGraphWeb, ByVal g As System.Drawing.Graphics, ByVal pane As ZedGraph.MasterPane) Handles graficoLinear.RenderGraph
        Try
            Dim oAccesoDatos As DAL = New DAL()
            Dim myPane As GraphPane = pane(0)
            Dim dsGrafico As Data.DataSet = oAccesoDatos.GetFilterDataModel("prObtenerGraficoLinear_XPeriodos", Request.QueryString("AnioID"), Request.QueryString("ProyectoCodigo"), Request.QueryString("PeriodoCorrel"))
            Dim Original As New Collections.Generic.List(Of Double)
            Dim Vigente As New Collections.Generic.List(Of Double)
            Dim Ejecutado As New Collections.Generic.List(Of Double)
            Dim Meses As New Collections.Generic.List(Of Double)
            Dim MesesEjecutado As New Collections.Generic.List(Of Double)
            Dim MesPrevio As Double
            Dim ProcentajeProg As Double
            Dim ProcentajeEjec As Double
            Dim FechaUltimoRegistro As Date
            Dim previo As Double

            ProcentajeEjec = -1
            For Each dr As DataRow In dsGrafico.Tables(0).Rows
                Meses.Add(Convert.ToDouble(dr("fecha")))
                Original.Add(Convert.ToDouble(IIf(dr("Original") Is DBNull.Value, 0, dr("Original"))))
                Vigente.Add(Convert.ToDouble(IIf(dr("Vigente") Is DBNull.Value, 0, dr("Vigente"))))
                If dr("Ejecutado") > 0 Then
                    Ejecutado.Add(Convert.ToDouble(IIf(dr("Ejecutado") Is DBNull.Value, 0, dr("Ejecutado"))))
                End If
                'FechaUltimoRegistro = dr("FechaMaxEjecutado")
                If Convert.ToDouble(dr("EjecutadoPeriodo")) > 0 Then
                    'If Convert.ToDouble(dr("EjecutadoPeriodo")) = 0 And previo > 0 Then
                    ProcentajeProg = Convert.ToDouble((dr("Vigente")))
                    ProcentajeEjec = Convert.ToDouble((dr("Ejecutado")))
                    previo = 0
                Else
                    previo = Convert.ToDouble(dr("EjecutadoPeriodo"))
                End If
            Next

            If dsGrafico.Tables(0).Rows.Count > 0 Then
                MesPrevio = (Convert.ToDouble(dsGrafico.Tables(0).Rows(0).Item(1)))
            End If
            For Each dr As DataRow In dsGrafico.Tables(0).Rows

                If Convert.ToDouble(dr("EjecutadoPeriodo")) > 0 Then

                    MesesEjecutado.Add(Convert.ToDouble(dr("fecha")))
                    MesPrevio = Convert.ToDouble(dr("fecha"))
                Else

                    MesesEjecutado.Add(MesPrevio)
                End If
            Next



            'Set the title and axis labels
            'myPane.Title.FontSpec.Size = 12
            myPane.Title.Text = "Ejecución Física" & Chr(10) & "Año: " & Request.QueryString("AnioID").ToString & ", Proyecto: " & Request.QueryString("ProyectoCodigo").ToString
            myPane.Title.FontSpec.IsBold = True
            'myPane.XAxis.Title.Text = "Mes"
            myPane.YAxis.Title.Text = "Porcentaje"

            'Fill the axis background with a color gradient
            myPane.Chart.Fill = New Fill(Color.FromArgb(255, 255, 245), Color.FromArgb(255, 255, 190), 90.0F)

            'Generate a red curve with "Original" in the legend
            Dim myCurve As LineItem = myPane.AddCurve("Original", Meses.ToArray, Original.ToArray, Color.Red, SymbolType.Diamond)
            'Make the symbols opaque by filling them with white
            myCurve.Symbol.Fill = New Fill(Color.White)

            'Generate a blue curve with "Vigente" in the legend
            myCurve = myPane.AddCurve("Vigente", Meses.ToArray, Vigente.ToArray, Color.Blue, SymbolType.Square)

            'Make the symbols opaque by filling them with white
            myCurve.Symbol.Fill = New Fill(Color.White)

            'Generate a green curve with "Ejecutado" in the legend
            myCurve = myPane.AddCurve("Ejecutado", MesesEjecutado.ToArray, Ejecutado.ToArray, Color.Green, SymbolType.Triangle)
            'Make the symbols opaque by filling them with white

            myCurve.Symbol.Fill = New Fill(Color.White)


            myPane.Legend.Position = 9

            'Manualmente se configuran las etiquetas de los meses

            'myPane.XAxis.Scale.MinAuto = False
            'myPane.XAxis.Scale.MaxAuto = False

            myPane.AxisChange()
            myPane.XAxis.Scale.MaxGrace = 0.02
            myPane.XAxis.Scale.MinGrace = 0.02


            myPane.AxisChange()
            myPane.XAxis.Scale.FormatAuto = True
            myPane.XAxis.Type = AxisType.Date

            'Display the Y axis grid lines
            myPane.XAxis.MajorGrid.IsVisible = True
            myPane.XAxis.MinorGrid.IsVisible = False
            myPane.YAxis.MajorGrid.IsVisible = True
            myPane.YAxis.MinorGrid.IsVisible = False

            myPane.Chart.Fill = New Fill(Color.White, Color.FromArgb(220, 220, 255), 45)
            myPane.Fill = New Fill(Color.White, Color.FromArgb(255, 255, 193), 45)

            myPane.AxisChange()
            ' Add a text item to decorate the graph
            If ProcentajeEjec <= 0 Then ProcentajeEjec = 0
            Dim text As TextObj = New TextObj("Avance Programado: " & System.Math.Round(ProcentajeProg, 2) & "%" & Chr(10) &
                    "Avance Real: " & System.Math.Round(ProcentajeEjec, 2, MidpointRounding.AwayFromZero) & "%", 0.75, 0.85, CoordType.PaneFraction)
            ' Align the text such that the Bottom-Center is at (175, 80) in user scale coordinates
            text.Location.AlignH = AlignH.Center
            text.Location.AlignV = AlignV.Bottom
            text.FontSpec.Fill = New Fill(Color.White, Color.YellowGreen, 45.0F)
            text.FontSpec.Size = 14
            text.FontSpec.IsBold = True
            text.FontSpec.FontColor = Color.DarkBlue
            text.FontSpec.StringAlignment = StringAlignment.Near
            myPane.GraphObjList.Add(text)
        Catch ex As Exception

        End Try
    End Sub

End Class

