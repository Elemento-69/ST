using Covialgt.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;


namespace Covialgt.ReportesViales
{
    public class FotoReporte
    {
        string Foto { get; set; }
    }

    public partial class frmGridFotosReporte : System.Web.UI.Page
    {
        string Fotografias;



        protected void Page_Load(object sender, EventArgs e)
        {
            string vFotografias = "";
            int vReporteID = 0;

            vFotografias = Request.QueryString.Get("vFotografias");
            vReporteID = Int32.Parse(Request.QueryString.Get("vReporteID"));
            if (vFotografias != "")
            {
                Fotografias = vFotografias;
                int n = 0;
                HtmlGenericControl ul = new HtmlGenericControl("ul");

                string[] vFotos = Fotografias.Split(',');
                foreach (string Foto in vFotos)
                {
                   
                    HtmlGenericControl anchor = new HtmlGenericControl("a");
                    HtmlGenericControl li = new HtmlGenericControl("li");
                    oggrid.Controls.Add(li);
                    string url = ObtenerUrlImagen(Foto, vReporteID);
                    anchor.InnerHtml = "<img src='" + url + "' height='110' width='140'/>";
                    li.Controls.Add(anchor);
                    li.ID = n.ToString();
                    n += 1;
                }

                //fnObtenerFotografias(reporteID);
            }
        }

        string ObtenerUrlImagen(string nombreFoto, Int32 ReporteID)
        {
            var respuesta = string.Empty;
            try
            {
                respuesta = "../GetThumbnail.aspx?Tipo=12&MaxPixels=200&ReporteID=" + ReporteID + "&Fotografia=" + nombreFoto;
            }
            catch (Exception ex)
            {
                CommonHelper.ErrorMsgBox(ex.Message, this.Page, this);
            }

            return respuesta;
        }


        //private async void fnObtenerFotografias(int vReporteID)
        //{

        //    string baseUrl = ConfigurationManager.AppSettings["baseURL"];
        //    string token = HttpContext.Current.Session["token"]?.ToString();

        //    using (var client = new HttpClient())
        //    {
        //        // Establecemos la dirección base del servicio REST
        //        client.BaseAddress = new Uri(baseUrl);

        //        // TODO: Maneja el error del certificado de seguridad en produccion debe quitarse y usar HTTPS
        //        ServicePointManager.ServerCertificateValidationCallback += (_, __, ___, ____) => true;

        //        try
        //        {
        //            var json = JsonConvert.SerializeObject(new { IdReporteVial = reporteID });
        //            var requestContent = new StringContent(json, Encoding.UTF8, "application/json");
        //            var response = await client.PostAsync($"{baseUrl}api/login/authenticateweb", requestContent);
        //            if (response.StatusCode == HttpStatusCode.OK)
        //            {
        //                var content = await response.Content.ReadAsStringAsync();
        //                JavaScriptSerializer js = new JavaScriptSerializer();
        //                var planes = JsonConvert.DeserializeObject<List<FotoReporte>>(content);
        //                FotoReporte blogObject = js.Deserialize<FotoReporte>(content);

        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            CommonHelper.ErrorMsgBox(ex.Message, this.Page, this);
        //        }
        //    }




        //}


    }
}