using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Ejecucion
{
    public partial class GestionDeDocumentosDeCambio : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
            ViewState["baseurl"] = baseUrl;
            // Conseguir roles
            ViewState["rolpermitido"] = HttpContext.Current.User.IsInRole("ADMINISTRADORES") || HttpContext.Current.User.IsInRole("ADMINISTRADOR DOCUMENTOS DE CAMBIO") || HttpContext.Current.User.IsInRole("ASISTENTE DOCUMENTOS DE CAMBIO") ? 1 : 0;
            ViewState["rolasistente"] = HttpContext.Current.User.IsInRole("ASISTENTE DOCUMENTOS DE CAMBIO") ? 1 : 0;
        }
    }
}