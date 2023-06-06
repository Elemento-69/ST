using Covialgt.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

namespace Covialgt.InformesTecnicos
{
    public partial class InformesTecnicosPorPeriodo : BasePage
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
            rolConsultas = strRol;
            ViewState["rolConsultas"] = strRol;
        }
    }
}