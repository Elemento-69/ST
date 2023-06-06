﻿using Covialgt.Clases;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Covialgt.Utils;

namespace Covialgt.Partidas
{
    public partial class frmPartidaPresupuestaria : BasePage
    {
      protected void Page_Load(object sender, EventArgs e)
    {

        HttpContext ctx = HttpContext.Current;
        if (ctx.Session.Count < 1)
        {
            Response.Redirect("~/Auth/Login");
        }

        string strRol = "ADMINISTRADORES";
        string strUser = User.Identity.Name;
        if (Roles.IsUserInRole(strUser, "ADMINISTRADOR") || (Roles.IsUserInRole(strUser, "ADMINISTRADORES")))
        {
            strRol = "ADMINISTRADOR";
        }
        else if (Roles.IsUserInRole(strUser, "SUPERVISOR"))
        {
            strRol = "SUPERVISORES";
        }
        else if (Roles.IsUserInRole(strUser, "ENCARGADOPRESUPUESTO"))
        {
            strRol = "ENCARGADOPRESUPUESTO";
        }
        rolConsultas = strRol;
        ViewState["rolConsultas"] = rolConsultas;

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
        dtUsuario.Columns.Add("rol", typeof(string));
        DataRow _usuario = dtUsuario.NewRow();
        if (ctx.Session.Count > 0)
        {
            _usuario["token"] = HttpContext.Current.Session["token"].ToString();
            _usuario["usuario"] = HttpContext.Current.Session["Usuario"].ToString();
            _usuario["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
            _usuario["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
            _usuario["rol"] = HttpContext.Current.Session["rol"].ToString();


            dtUsuario.Rows.Add(_usuario);

            vGestion.tablaDevuelta = dtUsuario;
            vGestion.dioError = false;
        }
        return JsonConvert.SerializeObject(vGestion);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public static bool fActualizarToken(string pToken)
    {
        HttpContext.Current.Session.Add("token", pToken);
        return true;
    }
  }
}