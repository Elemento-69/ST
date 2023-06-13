Imports System.Data

Partial Class Paginas_Procesos_Formularios_InformeTecnico_ReporteFotografias
    Inherits System.Web.UI.Page

    Private _ds As DataSet
    Private _AnioID As Integer
    Private _ProyectoCodigo As String
    Private _dsPeriodos As DataSet
    Private _dsTramos As DataSet
    Private _PathFotos As String
    Private _UrlFotos As String
    Private _PeriodoCorrel As Integer

#Region "OrigenFoto"

    Protected Sub OrigenFoto_Deleting(ByVal sender As Object, ByVal e As System.Web.UI.WebControls.ObjectDataSourceMethodEventArgs) Handles OrigenFoto.Deleting
    End Sub

    Protected Sub OrigenFoto_Inserting(ByVal sender As Object, ByVal e As System.Web.UI.WebControls.ObjectDataSourceMethodEventArgs) Handles OrigenFoto.Inserting
    End Sub

    Protected Sub OrigenFoto_Selecting(ByVal sender As Object, ByVal e As System.Web.UI.WebControls.ObjectDataSourceSelectingEventArgs) Handles OrigenFoto.Selecting
        Dim datos As Object() = {_PeriodoCorrel, _AnioID, _ProyectoCodigo}
        e.InputParameters.Clear()
        e.InputParameters.Add("Procedimiento", "prObtenertblFotografiasXperiodoInforme")
        e.InputParameters.Add("Datos", datos)
        'setearRangoFecha()
        'Me.gridFotos.DataBind()
    End Sub

#End Region

#Region "Funciones"

    Public Function obtenerImagen(ByVal strRuta As String, ByVal strArchivo As String) As String
        'Return String.Format(_UrlFotos & "{0}", strArchivo)
        Return String.Format(System.Configuration.ConfigurationManager.AppSettings("thumbnail") & "Tipo=1&MaxPixels=500&Fotografia=" & "{0}", strArchivo)
    End Function

    Public Function obtenerFoto(ByVal strFotoID As String) As String
        Return String.Format("../Fotografia.aspx?FotografiaID={0}", Server.UrlEncode(strFotoID))
    End Function
#End Region

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load




        _AnioID = Request.QueryString("AnioID")
        _ProyectoCodigo = Request.QueryString("ProyectoCodigo")
        _PeriodoCorrel = Request.QueryString("PeriodoCorrel")
        _PathFotos = ConfigurationManager.AppSettings("rutaFotos")
        _UrlFotos = ConfigurationManager.AppSettings("urlFotos")
        'Me.gridFotos.AllowPaging = False
        'Me.gridFotos.HeaderStyle.Height = 100

        lblInfo.Text = "Proyecto: " & _ProyectoCodigo & ", Año: " & _AnioID & ", Periodo: " & _PeriodoCorrel


    End Sub
End Class
