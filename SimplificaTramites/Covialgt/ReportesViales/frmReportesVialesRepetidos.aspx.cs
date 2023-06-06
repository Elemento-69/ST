using Covialgt.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Covialgt.ReportesViales
{
    public partial class frmReportesVialesRepetidos : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["plan"] = Request.QueryString["plan"];
            ViewState["proyecto"] = Request.QueryString["proyecto"];
            ViewState["periodo"] = Request.QueryString["periodo"];
            ViewState["programa"] = Request.QueryString["programa"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
            ViewState["ReportesVialesPath"] = ConfigurationManager.AppSettings["ReportesVialesPath"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);

        }
    }
}