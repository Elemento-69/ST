using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.Security;

namespace Covialgt.Configuracion
{
    public partial class CambiarPassword : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            httpClient = new BaseClient(baseUrl, token);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean fCambiarPassword(string nombreUsuario, string contrasena, string nuevaContrasena, string confirmarContrasena)
        {
            if (nuevaContrasena != confirmarContrasena)
            {
                return false;
            }
            String rol = HttpContext.Current.Session["rol"].ToString();
            if (rol != "ADMINISTRADORES"){
                // Ignorar el nombre usuario enviado
                nombreUsuario = HttpContext.Current.Session["Usuario"].ToString();
            }
            try
            {
                MembershipUser mu = Membership.GetUser(nombreUsuario, false);
                if (mu == null)
                {
                    return false;
                }
                Boolean resultado = mu.ChangePassword(contrasena, nuevaContrasena);
                return resultado;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}