using Covialgt.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Covialgt.Ejecucion
{
    public partial class GestionDeEstimaciones : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            HttpContext.Current.Session["plan"] = Request.QueryString["plan"] ?? HttpContext.Current.Session["plan"];
            HttpContext.Current.Session["proyecto"] = Request.QueryString["proyecto"] ?? HttpContext.Current.Session["proyecto"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["programa"] = Request.QueryString["programa"];
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}