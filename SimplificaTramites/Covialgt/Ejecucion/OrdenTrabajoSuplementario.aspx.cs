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
    public partial class PrdenTrabajoSuplementario : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
            ViewState["docCambioId"] = Request.QueryString["doc"];
            ViewState["baseSitio"] = ConfigurationManager.AppSettings["Sitio"];
        }
    }
}