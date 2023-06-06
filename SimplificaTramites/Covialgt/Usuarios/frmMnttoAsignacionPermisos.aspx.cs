using Covialgt.Utils;
using System;
using System.Linq;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI.WebControls;
using System.Configuration.Provider;
using System.Web.Script.Services;


namespace Covialgt.Usuarios
{
    public partial class MnttoAsignacionPermisos : BasePage
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
            SelectRoles.DataSource = Roles.GetAllRoles();
            SelectRoles.DataBind();
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
            catch (Exception)
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
        [WebMethod]
        public static dynamic GetUsers(int limit, int offset, string search)
        {
            int total = 0;
            MembershipUserCollection users;

            if (string.IsNullOrEmpty(search) || string.IsNullOrWhiteSpace(search))
            {
                users = Membership.GetAllUsers(offset / limit, limit, out total);
            }
            else
            {
                users = Membership.FindUsersByName(search, offset / limit, limit, out total);
            }
            return new
            {
                Data = users.Cast<MembershipUser>().ToList()
                .Select<MembershipUser, dynamic>(x => new { x.UserName, x.IsApproved, x.Email }).ToList(),
                Count = total
            };
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
        public static bool Delete(string username)
        {
            try
            {
                Membership.DeleteUser(username, true);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [WebMethod]
        public static string[] GetRolesUser(string username)
        {
            return Roles.GetRolesForUser(username);
        }

        [WebMethod]
        public static dynamic AddRoleUser(string username, string role)
        {
            try
            {
                Roles.AddUserToRole(username, role);
                return Roles.GetRolesForUser(username);
            }
            catch (ProviderException ex)
            {
                if (ex.Message.Contains("already "))
                {
                    return $"El usuario '{username}' ya tiene el rol '{role}' asignado.";
                }
                return ex.Message;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static dynamic DeleteRoleUser(string username, string[] roles)
        {
            try
            {
                Roles.RemoveUserFromRoles(username, roles);
                return Roles.GetRolesForUser(username);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}