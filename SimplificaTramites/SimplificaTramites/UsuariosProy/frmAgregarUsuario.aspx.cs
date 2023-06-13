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

namespace SimplificaTramites.UsuariosProy
{
    public partial class frmAgregarUsuario : BasePage
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
        public static string Save(string username, string password)
        {
            try
            {
                var usuario = Membership.CreateUser(username, password);
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
                case MembershipCreateStatus.DuplicateProviderUserKey:
                    return "Llave Duplicada";
                case MembershipCreateStatus.DuplicateUserName:
                    return "El campo del proyecto Usuariobd no esta actualizado. El usuario ya existe.";
                case MembershipCreateStatus.InvalidAnswer:
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string NuevaPassword(string username, string password)
        {
            try
            {
               // var usuario = Membership.CreateUser(username, passwordnew);
               // var usuarios = Membership.Provider.ResetPassword(username, password);
                MembershipUser vUsuario = Membership.GetUser(username);

                if (vUsuario != null)
                {
                    vUsuario.ChangePassword(vUsuario.ResetPassword(), password);

                }
                return "ok";
            }
            catch (MembershipCreateUserException e)
            {
                return GetErrorMessages(e.StatusCode);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string GetErrorMessages(MembershipCreateStatus status)
        {
            switch (status)
            {
                case MembershipCreateStatus.InvalidPassword:
                    return "Contraseña incorrecta";
                case MembershipCreateStatus.Success:
                    return "ok";
                default:
                    return "Error en la creación del usuario";
            };
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
      
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool IsApproved(string username, bool check)
        {
            try
            {
                var usuario = Membership.GetUser(username);
                usuario.IsApproved = check;
                Membership.UpdateUser(usuario);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool IsLockedOut(string username, bool check)
        {
            try
            {
                var usuario = Membership.GetUser(username);
                if (check == false)
                    Membership.GetUser(username).UnlockUser();
                    Membership.UpdateUser(usuario);
                    return true;
                
            }
            catch (Exception)
            {
                return false;
            }
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool ConsultUseriS(string username)
        {
            try
            {
                var usuario = Membership.GetUser(username);
                var estado = usuario.IsApproved;
                if (estado == true)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception )
            {
                return false;
            }
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool ConsultUseriSLocked(string username)
        {
            try
            {
                var usuario = Membership.GetUser(username);
                var estado = usuario.IsLockedOut;
                if (estado == true)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}