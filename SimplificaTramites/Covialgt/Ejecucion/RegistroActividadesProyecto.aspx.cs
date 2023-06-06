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
    public partial class RegistroActividadesProyecto : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["plan"] = Request.QueryString["plan"];
            ViewState["proyecto"] = Request.QueryString["proyecto"];
            ViewState["periodo"] = Request.QueryString["periodo"];
            ViewState["programa"] = Request.QueryString["programa"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}