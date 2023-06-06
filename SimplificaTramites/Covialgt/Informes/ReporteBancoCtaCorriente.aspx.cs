using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Informes
{
    public partial class ReporteBancoCtaCorriente : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }

            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["usuario"] = HttpContext.Current.Session["Usuario"]?.ToString();
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}