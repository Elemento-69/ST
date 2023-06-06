using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Estimaciones
{
    public partial class EstimacionesFacturas : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            ViewState["baseurl"] = baseUrl;
            // Conseguir roles
            ViewState["rolpermitido"] = HttpContext.Current.User.IsInRole("ADMINISTRADORES") || HttpContext.Current.User.IsInRole("COORDINADOR DE VISA") || HttpContext.Current.User.IsInRole("VISOR") ? 1 : 0;
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}