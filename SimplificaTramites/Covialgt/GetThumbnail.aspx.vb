Imports System.IO
Imports System.Drawing.Image
Imports System.Drawing
Imports System.Windows.Forms
Imports System
Imports System.Drawing.Imaging
Imports System.Drawing.Drawing2D
Imports System.Collections.Generic
Imports OverlayImage

''''''-------------------------MODIFICACIONES----------------------------------
'''----------------------------------------------------------------------------
'''FECHA: 2013.04.05
'''DESCRIPCION: 
''' 1. AGREGAR MARCA DE AGUA A LAS IMAGENES DEVUELTAS POR EL THUMBNAIL
''' 2. Si MaxPix = 0 Devolver la imagen con su tamano original (sin thumbnail), 
'''    de lo contrario devuelve la imagen con el tamano requerido.
'''AUTOR: ANDRES IXPEC
'''----------------------------------------------------------------------------



Partial Class GetThumbnail
    Inherits System.Web.UI.Page

    ''Width and Height Proportion Constant
    ''for the proportion of the watermark into the image
    Const w_Proportion = 0.25
    Const h_Proportion = 0.25

    Private Enum TipoFotografia
        Ejecucion = 1
        Rotulos = 2
        EmergenciaFoto = 3
        Admin = 4
        Bitacora = 5
        Inventario = 6
        EmergenciaVideo = 7
        IncidenciaFoto = 8
        IncidenciaVideo = 9
        MultimediaVideo = 10
        MultimediaFoto = 11
        ReportesViales = 12
    End Enum

    Dim MaxPix As Integer

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        ''Try
        Dim Fotografia As String = Request.QueryString("Fotografia")
        MaxPix = Request.QueryString("MaxPixels")
        Dim Tipo As TipoFotografia = Request.QueryString("Tipo")
        Dim EMID As String = Request.QueryString("EMID")
        Dim ReporteID As Integer = Request.QuerySTring("ReporteID")

        Dim RutaFoto As String = ""
        If Not Fotografia = "" Then
            Select Case Tipo
                Case TipoFotografia.Ejecucion
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("Fotografias") & Fotografia
                Case TipoFotografia.Rotulos
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("urlFotosRotulos") & Fotografia
                Case TipoFotografia.EmergenciaFoto
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("Emergencias") & "Fotos\" & EMID & "\" & Fotografia
                Case TipoFotografia.EmergenciaVideo
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("Emergencias") & "Videos\" & EMID & "\" & Fotografia
                Case TipoFotografia.Admin
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("FotografiasAdministrativas") & Fotografia
                Case TipoFotografia.Bitacora
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("urlFotosBitacora") & Fotografia

                Case TipoFotografia.Inventario
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("FotografiasInventarios") & Fotografia
                Case TipoFotografia.MultimediaVideo
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("VideoMultimedia") & "snapshot_" & Fotografia & ".jpg"
                Case TipoFotografia.MultimediaFoto
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("FotosMultimedia") & Fotografia
                Case TipoFotografia.IncidenciaFoto
                    Dim ID_incidencia As String = Request.QueryString("ID")
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("Incidencias") & "Multimedia\Fotos\ID_" & ID_incidencia & "\" & Fotografia
                Case TipoFotografia.IncidenciaVideo
                    Dim ID_incidencia As String = Request.QueryString("ID")
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("Incidencias") & "Multimedia\Videos\ID_" & ID_incidencia & "\" & Fotografia
                Case TipoFotografia.ReportesViales
                    RutaFoto = System.Configuration.ConfigurationManager.AppSettings("rutaReportesViales") & "Fotos\ID_" & ReporteID & "\" & Fotografia
            End Select
        End If

        'Si MaxPix=0 devuelve la imagen con su tamano original
        'de lo contrario devuelve la imagen con el tamano requerido
        If MaxPix > 0 Then
            GenerateThumbNail(RutaFoto, System.Drawing.Imaging.ImageFormat.Jpeg)
        Else
            WithoutThumbNail(RutaFoto, System.Drawing.Imaging.ImageFormat.Jpeg)
        End If


        ' GenerateThumbNail(RutaFoto, System.Drawing.Imaging.ImageFormat.Jpeg)

        'Catch ex As Exception

        '    'Si ocurre algun error, mostramos el logo de covial
        '    Dim img As Image = Image.FromFile("D:\srv2\wwwroot\SICOP\App_Themes\Tema1\Imagenes\COVIAL.png") ''("D:\srv2\wwwroot\SICOP\Fotos\" & Fotografia)
        '    Dim thumbnailSize As Size = GetThumbnailSize(img, 70)
        '    Dim thumbnail As Image = img.GetThumbnailImage(thumbnailSize.Width, thumbnailSize.Height, Nothing, IntPtr.Zero)
        '    'El response será una imagen en formato jpg
        '    Response.ContentType = "image/jpeg"
        '    thumbnail.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Jpeg)
        '    thumbnail.Dispose()
        '    Response.End()

        '    Dim fp As StreamWriter

        '    Try
        '        fp = File.CreateText(Server.MapPath("D:\srv2\PhoneLogs\ERROR_") & Date.Now.Ticks.ToString & ".txt")
        '        fp.WriteLine(ex.Message)
        '        fp.Close()
        '    Catch err As Exception

        '    Finally

        '    End Try





        '' End Try

    End Sub


    Public Sub GenerateThumbNail(ByVal sPhysicalPath As String, ByVal oFormat As Imaging.ImageFormat)

        If Not (File.Exists(sPhysicalPath)) Then

            'sPhysicalPath = System.Configuration.ConfigurationManager.AppSettings("FotosMultimedia") & "FotoSiNoExiste.jpg"
            sPhysicalPath = System.Configuration.ConfigurationManager.AppSettings("urlImages") & "NoImage.png"

        End If


        'Try
        Dim img As Image = Image.FromStream(New MemoryStream(File.ReadAllBytes(sPhysicalPath)))

        Dim thumbnailSize As Size = GetThumbnailSize(img, MaxPix)

        Dim oThumbNail As System.Drawing.Image = New Bitmap(thumbnailSize.Width, thumbnailSize.Height, img.PixelFormat)

        Dim oGraphic As Graphics = Graphics.FromImage(oThumbNail)

        oGraphic.CompositingQuality = Drawing2D.CompositingQuality.HighQuality

        oGraphic.SmoothingMode = Drawing2D.SmoothingMode.HighQuality

        oGraphic.InterpolationMode = Drawing2D.InterpolationMode.HighQualityBicubic

        Dim oRectangle As New Rectangle(0, 0, thumbnailSize.Width, thumbnailSize.Height)

        oGraphic.DrawImage(img, oRectangle)
        Response.ContentType = "image/jpeg"
        oThumbNail.Save(Response.OutputStream, oFormat)

        Response.End()
        Response.Clear()
        oGraphic.Dispose()
        'oImg.Dispose()
        img.Dispose()
        oThumbNail.Dispose()
        oGraphic = Nothing
        'oImg = Nothing
        img = Nothing
        oThumbNail = Nothing

        GC.Collect()

        'Catch generatedExceptionName As Exception
        'End Try

    End Sub

    Public Sub WithoutThumbNail(ByVal sPhysicalPath As String, ByVal oFormat As Imaging.ImageFormat)
        If Not (File.Exists(sPhysicalPath)) Then

            'sPhysicalPath = System.Configuration.ConfigurationManager.AppSettings("FotosMultimedia") & "FotoSiNoExiste.jpg"
            sPhysicalPath = System.Configuration.ConfigurationManager.AppSettings("urlImages") & "NoImage.png"

        End If

        Dim img As Image = Image.FromStream(New MemoryStream(File.ReadAllBytes(sPhysicalPath)))
        'SetWaterMark
        'Dim LogoCovial As OverlayImage = New OverlayImage(CType(Image.FromFile(System.Configuration.ConfigurationManager.AppSettings("RutaVirtualWaterMarks") & "Covial.png"), Bitmap), 'POSITION.MIDDLE_CENTER, w_proportion, h_proportion)
        'Dim LogoCovial_X As Single = (img.Width * w_proportion) / 2
        'Dim LogoCovial_Y As Single = (img.Height - (img.Height * h_proportion)) / 2
        'Dim LogoCovial As OverlayImage = New OverlayImage(CType(Image.FromFile(System.Configuration.ConfigurationManager.AppSettings("RutaVirtualWaterMarks") & "Covial.png"), Bitmap), LogoCovial_X, 'LogoCovial_Y, w_proportion, h_proportion)
        'Dim LogoCIV As OverlayImage = New OverlayImage(CType(Image.FromFile(System.Configuration.ConfigurationManager.AppSettings("RutaVirtualWaterMarks") & "Civ.png"), Bitmap), POSITION.TOP_RIGHT, 'w_proportion, h_proportion)

        'Dim imgWithWaterMark As image = SetWaterMark(CType(img, Bitmap), LogoCovial, LogoCIV)

        'Dim oImg As System.Drawing.Image = imgWithWaterMark 'System.Drawing.Image.FromFile(sPhysicalPath)

        Response.ContentType = "image/jpeg"
        'oImg.Save(Response.OutputStream, oFormat)
        img.Save(Response.OutputStream, oFormat)

        Response.End()
        Response.Clear()
        Response.Close()

        'oImg.Dispose()
        img.Dispose()
        'imgWithWaterMark.dispose()

        'oImg = Nothing
        img = Nothing
        'imgWithWaterMark = Nothing

        GC.Collect()

    End Sub

    ''' <summary>
    ''' Obtener un thumbnail de una imagen con un máximo de pixels
    ''' </summary>
    ''' <param name="original">Imagen original</param>
    ''' <param name="maxPixels">Cantidad máxima de pixeles de ancho</param>
    ''' <returns>Devuelve una imagen con el ancho especificado</returns>
    ''' <remarks></remarks>
    Private Shared Function GetThumbnailSize(ByVal original As Image, ByVal maxPixels As Integer) As Size

        ' Largo y alto de la fotografía
        Dim originalWidth As Integer = original.Width
        Dim originalHeight As Integer = original.Height

        ' Calcular el mejor factor de escala para redimensionar la fotografía.
        Dim factor As Double
        If originalWidth > originalHeight Then
            factor = CDbl(maxPixels) / originalWidth
        Else
            factor = CDbl(maxPixels) / originalHeight
        End If
        'original.Dispose()

        ' Retornar el thumbnail.
        Return New Size(CInt(Math.Truncate(originalWidth * factor)), CInt(Math.Truncate(originalHeight * factor)))
    End Function
End Class
