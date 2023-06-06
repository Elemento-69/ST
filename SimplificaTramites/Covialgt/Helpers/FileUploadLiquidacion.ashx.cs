using System;
using System.IO;
using System.Threading.Tasks;
using System.Web;

namespace Covialgt.Helpers
{
    /// <summary>
    /// Summary description for FileUploadLiquidacion
    /// </summary>
    public class FileUploadLiquidacion : HttpTaskAsyncHandler
    {
        public override async Task ProcessRequestAsync(HttpContext context)
        {
            try
            {
                var data = context.Request.Form;
                string foto_directory = AppDomain.CurrentDomain.BaseDirectory + "LiquidacionPdf";
                if (!Directory.Exists(foto_directory)) Directory.CreateDirectory(foto_directory);
                foto_directory = Path.Combine(foto_directory, data["AnioID"]);
                if (!Directory.Exists(foto_directory)) Directory.CreateDirectory(foto_directory);
                foto_directory = Path.Combine(foto_directory, data["ProyectoCodigo"]);
                if (!Directory.Exists(foto_directory)) Directory.CreateDirectory(foto_directory);
                if (context.Request.Files.Count > 0)
                {
                    HttpPostedFile file = context.Request.Files[0];
                    byte[] fileByte = new BinaryReader(file.InputStream).ReadBytes(file.ContentLength);
                    var path_to_save = Path.Combine(foto_directory, data["NombreArchivo"]);
                    MemoryStream stream2 = new MemoryStream(fileByte);
                    var stream = new FileStream(path_to_save, FileMode.Create);
                    await stream2.CopyToAsync(stream);   
                }
                context.Response.ContentType = "text/plain";
                context.Response.Write("Se logro guardar los datos correctamente");
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 409;
                context.Response.ContentType = "text/plain";
                context.Response.Write(ex.Message);
            }
        }
    }
}