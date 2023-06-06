using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.Services;

namespace Covialgt.Usuarios
{
    public partial class CrearUsuario : BasePage
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
        }

        [WebMethod]
        public static string Save(string username, string email, string password)
        {
            try
            {
                var usuario = Membership.CreateUser(username, password, email);
                return "ok";
            }
            catch (MembershipCreateUserException e)
            {
                return GetErrorMessage(e.StatusCode);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string GetErrorMessage(MembershipCreateStatus status)
        {
            switch (status)
            {
                case MembershipCreateStatus.DuplicateEmail:
                    return "Email Duplicado";
                case MembershipCreateStatus.DuplicateProviderUserKey:
                    return "Llave Duplicada";
                case MembershipCreateStatus.DuplicateUserName:
                    return "Nombre de Usuario en Uso, Por Favor Seleccione Otro Nombre de Usuario";
                case MembershipCreateStatus.InvalidAnswer:
                case MembershipCreateStatus.InvalidEmail:
                    return "Correo Electronico Inválido";
                case MembershipCreateStatus.InvalidPassword:
                    return "Password Inválido";
                case MembershipCreateStatus.InvalidProviderUserKey:
                    return "Llave Incorrecta";
                case MembershipCreateStatus.InvalidQuestion:
                case MembershipCreateStatus.InvalidUserName:
                    return "Nombre de Usuario Inválido";
                case MembershipCreateStatus.ProviderError:
                    return "Ha Sucedido un error en la Creación de la Cuenta";
                case MembershipCreateStatus.UserRejected:
                    return "El Usuario ha sido Rechazado";
                case MembershipCreateStatus.Success:
                    return "ok";
                default:
                    return "Error en la creación del usuario";
            };
        }
    }
}