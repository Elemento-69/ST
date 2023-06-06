using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Ejecucion
{
    public partial class InformacionDeRotulos : BasePage
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
            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}