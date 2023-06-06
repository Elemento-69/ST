﻿using Covialgt.Clases;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace Covialgt.Incidencias
{
    public partial class frmIncidenciasPantallaPrincipal : System.Web.UI.Page
    {

        public static string[] roles;
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count == 0)
            {
                Response.Redirect("/Auth/Login.aspx");
            }
            else
            {
                roles = (string[])HttpContext.Current.Session["roles"];
            }

            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerToken()
        {
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtUsuario = new DataTable();
            dtUsuario.Columns.Add("token", typeof(string));
            dtUsuario.Columns.Add("usuario", typeof(string));
            dtUsuario.Columns.Add("proxyURL", typeof(string));
            dtUsuario.Columns.Add("baseURL", typeof(string));
            dtUsuario.Columns.Add("baseSitio", typeof(string));
            DataRow _usuario = dtUsuario.NewRow();
            if (!(ctx.Session.Count == 0))
            {
                _usuario["token"] = HttpContext.Current.Session["token"].ToString();
                _usuario["usuario"] = HttpContext.Current.Session["Usuario"].ToString();
                _usuario["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
                _usuario["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
                _usuario["baseSitio"] = ConfigurationManager.AppSettings["Sitio"];
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

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerRoles()
        {

            roles = (string[])HttpContext.Current.Session["roles"];
            var vRolesUsuario = string.Join(",", roles);
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();

            if (!(ctx.Session.Count == 0))
            {
                vGestion.datoDevueltoString = vRolesUsuario;
                vGestion.dioError = false;
            }

            return JsonConvert.SerializeObject(vGestion);
        }
    }
}