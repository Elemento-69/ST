using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.InformesTecnicos
{
    public partial class InformeTecnicoMensual : BasePage
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
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}