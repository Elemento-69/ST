using Covialgt.Clases;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Covial
{
    public partial class _Default : Page
    {
        public static string[] roles;
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count == 0)
            {
                Response.Redirect("~/Auth/Login.aspx");
            } else
            {
                 roles = (string[])HttpContext.Current.Session["roles"];
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerToken()
        {
            roles = (string[])HttpContext.Current.Session["roles"];
            var vRolesUsuario = string.Join(",", roles);
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtUsuario = new DataTable();
            dtUsuario.Columns.Add("token", typeof(string));
            dtUsuario.Columns.Add("usuario", typeof(string));
            dtUsuario.Columns.Add("proxyURL", typeof(string));
            dtUsuario.Columns.Add("baseURL", typeof(string));
            dtUsuario.Columns.Add("rolesUsuario", typeof(string));
            DataRow _usuario = dtUsuario.NewRow();
            if (!(ctx.Session.Count == 0))
            {
                _usuario["token"] = HttpContext.Current.Session["token"].ToString();
                _usuario["usuario"] = HttpContext.Current.Session["Usuario"].ToString();
                _usuario["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
                _usuario["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
                _usuario["rolesUsuario"] = vRolesUsuario;
                dtUsuario.Rows.Add(_usuario);

                vGestion.tablaDevuelta = dtUsuario;
                vGestion.dioError = false;
            }
          
                
            
           
            return JsonConvert.SerializeObject(vGestion);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static Boolean fActualizarToken(string pToken)
        {

            HttpContext.Current.Session.Add("token", pToken);
            return true;
        }

    }
}