using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Informes
{
    public partial class ReportesGenerales : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            httpClient = new BaseClient(baseUrl, token);
            // Conseguir roles
            ViewState["rolpermitido"] = HttpContext.Current.User.IsInRole("SUPERVISOR") ? 1 : 0;
        }
    }
}