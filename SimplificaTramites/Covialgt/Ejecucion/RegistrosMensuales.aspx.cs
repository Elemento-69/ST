using Covialgt.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web;

namespace Covialgt.Ejecucion
{
    public partial class RegistrosMensuales : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }

            ViewState["plan"] = Request.QueryString["plan"];
            ViewState["proyecto"] = Request.QueryString["proyecto"];
            ViewState["programa"] = Request.QueryString["programa"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["periodo"] = Request.QueryString["periodo"];
            ViewState["usuario"] = HttpContext.Current.Session["Usuario"]?.ToString();
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}