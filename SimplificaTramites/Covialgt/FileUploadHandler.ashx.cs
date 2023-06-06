using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace Covialgt
{
    /// <summary>
    /// Summary description for FileUploadHandler
    /// </summary>
    public class FileUploadHandler : IHttpHandler
    {
        enum TipoArchivo
        {
            Video = 2,
            PDF = 3
        }

        enum Modulo
        {
            Multimedia = 1,
            Emergencia = 2,
            Incidencia = 3,
            Rotulos = 4,
            Suspensiones = 5
        }
        public void ProcessRequest(HttpContext context)
        {
            var vModuloViene = context.Request.QueryString["vModuloViene"];
            var vTipoArchivo = context.Request.QueryString["vTipoArchivo"];
            var vIdEmergencia = context.Request.QueryString["vIdEmergencia"];
            var vIdIncidencia = context.Request.QueryString["vIdIncidencia"];
            var vIdProyecto = context.Request.QueryString["vIdProyecto"];

            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    string fname;
                    if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                    {
                        string[] testfiles = file.FileName.Split(new char[] { '\\' });
                        fname = testfiles[testfiles.Length - 1];
                    }
                    else
                    {
                        fname = file.FileName;
                    }
                    if (int.Parse(vModuloViene) == (int)Modulo.Multimedia) // PARA MULTIMEDIA FOTOS
                    {
                        if (int.Parse(vTipoArchivo) == (int)TipoArchivo.Video)
                            fname = ConfigurationManager.AppSettings["VideoMultimedia"] + fname;
                        // fname = Path.Combine(context.Server.MapPath("~/Videos/"), fname);
                        else
                            fname = ConfigurationManager.AppSettings["FotosMultimedia"] + fname;
                        // fname = Path.Combine(context.Server.MapPath("~/Fotos/"), fname);
                    }
                    else if (int.Parse(vModuloViene) == (int)Modulo.Emergencia) // VIENE DEL MÓDULO DE EMERGENCIAS
                    {
                        var vRuta = "";
                        if (vTipoArchivo == "Adjuntos")
                        {
                            vRuta = obtenerCarpetaArchivosAdjuntos(context.Server.MapPath("~/Emergencias/ArchivosAdjuntos/"), int.Parse(vIdEmergencia));
                            fname = Path.Combine(vRuta, fname);
                        }
                        else
                        {
                            if (vTipoArchivo == "Videos")
                            {
                                vRuta = obtenerCarpetaArchivosAdjuntos(context.Server.MapPath("~/Emergencias/Multimedia/Videos/"), int.Parse(vIdEmergencia));
                                fname = Path.Combine(vRuta, fname);
                            }
                            else
                            {
                                vRuta = obtenerCarpetaArchivosAdjuntos(context.Server.MapPath("~/Emergencias/Multimedia/Fotos/"), int.Parse(vIdEmergencia));
                                fname = Path.Combine(vRuta, fname);
                            }
                        }

                    }
                    else if (int.Parse(vModuloViene) == (int)Modulo.Rotulos) // VIENE DEL MÓDULO DE ROTULOS
                    {
                        fname = Path.Combine(context.Server.MapPath("~/Fotos/"), fname);

                    }
                    else if (int.Parse(vModuloViene) == (int)Modulo.Incidencia) // VIENE DEL MÓDULO DE INCIDENCIAS
                    {
                        var vRuta = "";
                        if (vTipoArchivo == "Adjuntos")
                        {
                            vRuta = obtenerCarpetaArchivosAdjuntos(context.Server.MapPath("~/Incidencias/ArchivosAdjuntos/"), int.Parse(vIdIncidencia));
                            fname = Path.Combine(vRuta, fname);
                        }
                        else
                        {
                            if (vTipoArchivo == "Videos")
                            {
                                vRuta = obtenerCarpetaArchivosAdjuntos(context.Server.MapPath("~/Incidencias/Multimedia/Videos/"), int.Parse(vIdIncidencia));
                                fname = Path.Combine(vRuta, fname);
                            }
                            else
                            {
                                vRuta = obtenerCarpetaArchivosAdjuntos(context.Server.MapPath("~/Incidencias/Multimedia/Fotos/"), int.Parse(vIdIncidencia));
                                fname = Path.Combine(vRuta, fname);
                            }
                        }
                    }
                    else if (int.Parse(vModuloViene) == (int)Modulo.Suspensiones) // VIENE DEL MÓDULO DE SUSPENSIONES
                    {
                        var vRuta = "";

                        vRuta = obtenerCarpetaActas(context.Server.MapPath("~/Suspensiones/Actas/"),vIdProyecto);
                        fname = Path.Combine(vRuta, fname);

                    }
                    file.SaveAs(fname);
                }
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("File Uploaded Successfully!");
        }

        private String obtenerCarpetaArchivosAdjuntos(String pathMultimedia, long idEmergencia)
        {
            String pathIDemergencia = pathMultimedia + "ID_" + idEmergencia.ToString();

            if (!Directory.Exists(pathIDemergencia))
            {
                Directory.CreateDirectory(pathIDemergencia);
            }

            return pathIDemergencia;
        }

        private String obtenerCarpetaActas(String path, string vIdProyecto)
        {
            String pathActas = path + vIdProyecto;

            if (!Directory.Exists(pathActas))
            {
                Directory.CreateDirectory(pathActas);
            }

            return pathActas;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}