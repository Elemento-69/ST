using Covialgt.Clases;
using Covialgt.Utils;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace Covialgt.Ejecucion
{
    public partial class RegistroDatos : BasePage
    {
        public static string[] roles;
        protected void Page_Load(object sender, EventArgs e)
        {
            

        HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            ViewState["baseurl"]= baseUrl;
            ViewState["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
            httpClient = new BaseClient(baseUrl, token);
            ViewState["baseSitio"] = ConfigurationManager.AppSettings["Sitio"];
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
    }
}