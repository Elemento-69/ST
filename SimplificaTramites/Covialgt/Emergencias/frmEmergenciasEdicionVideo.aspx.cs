﻿using Covialgt.Clases;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace Covialgt.Emergencias
{
    public partial class frmEmergenciasEdicionVideo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count == 0)
            {
                Response.Redirect("/Auth/Login.aspx");
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
            DataRow _usuario = dtUsuario.NewRow();
            if (!(ctx.Session.Count == 0))
            {
                _usuario["token"] = HttpContext.Current.Session["token"].ToString();
                _usuario["usuario"] = HttpContext.Current.Session["Usuario"].ToString();
                _usuario["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
                _usuario["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
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