using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Informes
{
    public partial class InformeGeneralDocsCambio : BasePage
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
        }
    }
}