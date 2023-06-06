using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt
{
    public partial class TrasladoDevengado : BasePage
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
            ViewState["AsignaDevengado"] = HttpContext.Current.User.IsInRole("ASIGNA DEVENGADO") ? 1 : 0;
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}