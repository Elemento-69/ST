using Covialgt.Utils;
using System;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace Covialgt.Administracion
{
    public partial class ReAsignacionEstimaciones : BasePage
    {
        public string usersInRole;
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
            usersInRole = string.Join(",", Roles.GetUsersInRole("visor").Select(x => "'" + x + "'"));
        }
    }
}