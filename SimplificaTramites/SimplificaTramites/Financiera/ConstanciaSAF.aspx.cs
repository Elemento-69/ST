using Covialgt.Utils;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Web;
using System.Web.Script.Services;
using System.Web.Security;
using System.Web.Services;

namespace Covialgt.Financiera
{
    public partial class ConstanciaSAF : BasePage
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