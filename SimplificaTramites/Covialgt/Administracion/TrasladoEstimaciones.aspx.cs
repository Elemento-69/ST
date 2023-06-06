using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;
using System.Web.Security;

namespace Covialgt.Administracion
{
    public partial class TrasladoEstimaciones : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            HttpContext.Current.Session["plan"] = Request.QueryString["plan"];
            HttpContext.Current.Session["proyecto"] = Request.QueryString["proyecto"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);
            Boolean Entidad = false;
            if (User.IsInRole("RECEPTOR DE VISA")) { Entidad = false; }
            if (User.IsInRole("AUXILIAR TECNICO")) { Entidad = true; }
            HttpContext.Current.Session["entidad"] = Entidad;



        }
    }
}