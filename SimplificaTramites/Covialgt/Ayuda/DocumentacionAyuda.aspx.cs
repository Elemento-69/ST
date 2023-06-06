using Covialgt.Utils;
using System;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace Covialgt.Ayuda
{
    public partial class DocumentacionAyuda : BasePage
    {
        public string usersInRole;
        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["VideosAyuda"] = ConfigurationManager.AppSettings["VideosAyuda"];
            ViewState["PdfsAyuda"] = ConfigurationManager.AppSettings["PdfsAyuda"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
        }
    }
}