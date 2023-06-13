using SimplificaTramites.Clases;
using SimplificaTramites.Utils;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.Security;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SimplificaTramites.Mensajeria
{
    public partial class EnvioMensajes : BasePage
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
        public static string fCargarRoles()
        {
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtRoles = new DataTable();
            dtRoles.Columns.Add("rol_usuario", typeof(string));
            DataRow _roles = dtRoles.NewRow();
            if (!(ctx.Session.Count == 0))
            {
                _roles["rol_usuario"] = fObtenerRolUsuarioActual();
                dtRoles.Rows.Add(_roles);

                vGestion.tablaDevuelta = dtRoles;
                vGestion.dioError = false;
            }
            return JsonConvert.SerializeObject(vGestion);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fCargarUsuariosPorRol(List<string> roles)
        {
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtUsuarios = new DataTable();
            dtUsuarios.Columns.Add("usuario", typeof(string));

            string[] usuarios = new string[roles.Count];
            for (int i = 0; i < roles.Count; i++) {
                usuarios[i] = fObtenerUsuariosPorRol(roles[i]);
            }
            DataRow _usuarios = dtUsuarios.NewRow();
            if (!(ctx.Session.Count == 0))
            {
                _usuarios["usuario"] = String.Join("|", usuarios);
                dtUsuarios.Rows.Add(_usuarios);

                vGestion.tablaDevuelta = dtUsuarios;
                vGestion.dioError = false;
            }
            return JsonConvert.SerializeObject(vGestion);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fPulirUsuarios(List<string> lstDestFinal)
        {
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtUsuarios = new DataTable();
            dtUsuarios.Columns.Add("UsuarioID_To", typeof(string));
            // dtUsuarios.Columns.Add("UserName", typeof(string));
            // dtUsuarios.Columns.Add("MensajeDeID", typeof(int));
            string error = "";

            foreach(string nombreUsuario in lstDestFinal){
                MembershipUser mu = Membership.GetUser(nombreUsuario, false);
                if (mu == null) {
                    // Mensaje no entregado
                    error += $"El mensaje no se envió a: '{nombreUsuario}' porque no se encuentra aprobado. <br/>";
                    continue;
                }
                if (mu.IsApproved) {
                    // Solo si el usuario esta aprobado
                    DataRow _usuarios = dtUsuarios.NewRow();
                    _usuarios["UsuarioID_To"] = mu.UserName;
                    // _usuarios["UserName"] = ctx.User.Identity.Name;
                    // _usuarios["MensajeDeID"] = MensajeDeID;
                    dtUsuarios.Rows.Add(_usuarios);
                } else {
                    // Mensaje no entregado
                    error += $"El mensaje no se envió a: '{mu.UserName}' porque no se encuentra aprobado. <br/>";
                }
            }
            if (!(ctx.Session.Count == 0))
            {
                vGestion.tablaDevuelta = dtUsuarios;
                vGestion.datoDevueltoString = ctx.User.Identity.Name;
                vGestion.descripcionMensaje = error;
                vGestion.dioError = false;
            }
            return JsonConvert.SerializeObject(vGestion);
        }
        public static string fObtenerRolUsuarioActual()
        {
            string resultado = "";
            // string[] roles = Roles.GetRolesForUser(Membership.GetUser().UserName);
            string[] roles = Roles.GetAllRoles();
            resultado = String.Join("|", roles);
            return resultado;
        }
        public static string fObtenerUsuariosPorRol(string rol)
        {
            string resultado = "";
            string[] usuarios = Roles.GetUsersInRole(rol);
            resultado = String.Join("|", usuarios);
            return resultado;
        }
    }
}