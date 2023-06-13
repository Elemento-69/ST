using SimplificaTramites.Utils;
using System;
using System.Configuration;
using System.Web;
using System.Web.Security;
namespace SimplificaTramites.Liquidacion
{
    public partial class LiquidacionProyectos : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            string strRol = "ADMINISTRADORES";
            string strUser = User.Identity.Name;
            if (Roles.IsUserInRole(strUser, "CONTRATISTA"))
            {
                strRol = "CONTRATISTAS";
            }
            else if (Roles.IsUserInRole(strUser, "SUPERVISOR"))
            {
                strRol = "SUPERVISORES";
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            ViewState["baseurl"] = baseUrl;
            httpClient = new BaseClient(baseUrl, token);
            ViewState["rolConsultas"] = strRol;
            rolConsultas = strRol;
        }
    }
}