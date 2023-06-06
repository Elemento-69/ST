using Covialgt.Clases;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Drawing;
using System.IO;

namespace Covialgt.Emergencias
{
    public partial class frmEmergenciasEdicionFoto : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count == 0)
            {
                Response.Redirect("/Auth/Login.aspx");
            }
            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerToken()
        {
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtUsuario = new DataTable();
            dtUsuario.Columns.Add("token", typeof(string));
            dtUsuario.Columns.Add("usuario", typeof(string));
            dtUsuario.Columns.Add("proxyURL", typeof(string));
            dtUsuario.Columns.Add("baseURL", typeof(string));
            DataRow _usuario = dtUsuario.NewRow();
            if (!(ctx.Session.Count == 0))
            {
                _usuario["token"] = HttpContext.Current.Session["token"].ToString();
                _usuario["usuario"] = HttpContext.Current.Session["Usuario"].ToString();
                _usuario["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
                _usuario["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
                dtUsuario.Rows.Add(_usuario);

                vGestion.tablaDevuelta = dtUsuario;
                vGestion.dioError = false;
            }
            return JsonConvert.SerializeObject(vGestion);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean fActualizarToken(string pToken)
        {

            HttpContext.Current.Session.Add("token", pToken);
            return true;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static int fRotarFoto(long idEmergencia, string nombreArchivo, bool rotarIzquierda)
        {
            string rutaCarpeta = ConfigurationManager.AppSettings["Emergencias"] + "Fotos\\ID_" + idEmergencia + "\\";


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

            fReemplazarArchivoFoto(idEmergencia, nombreArchivo, a + "." + extension);


            return a;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean fReemplazarArchivoFoto(long idEmergencia, string archivoOriginal, string archivoTemporal)
        {
            string rutaCarpeta = ConfigurationManager.AppSettings["Emergencias"] + "Fotos\\ID_" + idEmergencia + "\\";
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