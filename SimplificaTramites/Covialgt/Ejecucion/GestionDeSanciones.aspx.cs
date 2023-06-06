using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Ejecucion
{
    public partial class GestionDeSanciones : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }

            ViewState["plan"] = Request.QueryString["Plan"];
            ViewState["programa"] = Request.QueryString["Programa"];
            ViewState["proyecto"] = Request.QueryString["Proyecto"];
            ViewState["VieneRegistro"] = Request.QueryString["VieneRegistro"];
            ViewState["proyecto2"] = Request.QueryString["proyecto2"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["usuario"] = HttpContext.Current.Session["Usuario"]?.ToString();
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}