using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt
{
    public partial class RecomendacionPagoSupervisor : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            HttpContext.Current.Session["AnioID"] = Request.QueryString["AnioID"] ?? HttpContext.Current.Session["AnioID"];
            HttpContext.Current.Session["codigoproyecto"] = Request.QueryString["codigoproyecto"] ?? HttpContext.Current.Session["codigoproyecto"];
            HttpContext.Current.Session["Correlativo"] = Request.QueryString["Correlativo"] ?? HttpContext.Current.Session["Correlativo"];
            HttpContext.Current.Session["Delegado"] = Request.QueryString["Delegado"] ?? HttpContext.Current.Session["Delegado"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["usuario"] = HttpContext.Current.Session["Usuario"]?.ToString();
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}