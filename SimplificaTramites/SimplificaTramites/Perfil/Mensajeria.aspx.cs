using SimplificaTramites.Utils;
using System;
using System.Configuration;
using System.Web;

namespace SimplificaTramites.Perfil
{
    public partial class Mensajeria : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
            ViewState["deId"] = Request.QueryString["deId"];
        }
    }
}