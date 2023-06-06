﻿using Covialgt.Utils;
using System;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace Covialgt.Ejecucion
{
    public partial class Multimedia : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["plan"] = Request.QueryString["plan"];
            ViewState["proyecto"] = Request.QueryString["proyecto"];
            ViewState["periodo"] = Request.QueryString["periodo"];
            ViewState["programa"] = Request.QueryString["programa"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int fRotarFoto(string nombreArchivo, bool rotarIzquierda)
        {
            string rutaCarpeta = ConfigurationManager.AppSettings["FotosMultimedia"];


            string extension = nombreArchivo.Substring(nombreArchivo.LastIndexOf(".") + 1);


            Bitmap bmImagen = (Bitmap)Bitmap.FromStream(new MemoryStream(File.ReadAllBytes(rutaCarpeta + nombreArchivo)));

            Bitmap bmTemp = bmImagen;
            Bitmap bmap = (Bitmap)bmTemp.Clone();

            if (rotarIzquierda)
            {
                bmap.RotateFlip(RotateFlipType.Rotate270FlipNone);
            }
            else
            {
                bmap.RotateFlip(RotateFlipType.Rotate90FlipNone);
            }

            bmImagen.Dispose();
            bmImagen = (Bitmap)bmap.Clone();
            Random rnd = new Random();
            int a = rnd.Next();

            bmImagen.Save(rutaCarpeta + a + "." + extension);

            bmImagen.Dispose();
            bmTemp.Dispose();
            bmap.Dispose();

            bmImagen = null;
            bmTemp = null;
            bmap = null;

            GC.Collect();

            fReemplazarArchivoFoto(nombreArchivo, a + "." + extension);


            return a;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean fReemplazarArchivoFoto(string archivoOriginal, string archivoTemporal)
        {
            string rutaCarpeta = ConfigurationManager.AppSettings["FotosMultimedia"];
            try
            {
                // Check if file exists with its full path    
                if (File.Exists(Path.Combine(rutaCarpeta, archivoOriginal)))
                {
                    // If file found, delete it    
                    File.Delete(Path.Combine(rutaCarpeta, archivoOriginal));
                    File.Move(Path.Combine(rutaCarpeta, archivoTemporal), Path.Combine(rutaCarpeta, archivoOriginal));
                    return true;
                }
                else
                {
                    Console.WriteLine("File not found");
                    return false;
                }
            }
            catch (IOException ioExp)
            {

                Console.WriteLine(ioExp.Message);
            }
            return true;
        }

    }
}