using Covialgt.Utils;
using System;
using System.Configuration;
using System.Data;
using System.Threading.Tasks;
using System.Web;
using Covialgt.Clases;
using Newtonsoft.Json;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.IO;

namespace Covialgt
{
    public partial class Default : BasePage
    {
        public static string[] roles;
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count == 0)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            else
            {
                roles = (string[])HttpContext.Current.Session["roles"];
            }
            ViewState["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerRoles()
        {

            roles = (string[])HttpContext.Current.Session["roles"];
            var vRolesUsuario = string.Join(",", roles);
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
           
            if (!(ctx.Session.Count == 0))
            {
                vGestion.datoDevueltoString = vRolesUsuario;
                vGestion.dioError = false;
            }

            return JsonConvert.SerializeObject(vGestion);
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