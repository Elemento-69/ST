using System;
using SimplificaTramites.Utils;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Web.Services;
using System.Web.Script.Services;

namespace SimplificaTramites.Usuarios
{
    public partial class frmMnttoEliminarUsuario : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            ViewState["baseurl"] = baseUrl;
            ViewState["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
            httpClient = new BaseClient(baseUrl, token);
            ViewState["baseSitio"] = ConfigurationManager.AppSettings["Sitio"];
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string ConsultUser(string username)
        {
            try
            {
                var use = Membership.GetUser(username);
                var Datos = use.UserName;

                return Datos;

            }

            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}