
﻿using System;
using Covialgt.Utils;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Web.Services;
using System.Web.Script.Services;

namespace Covialgt.Usuarios
{
    public partial class frmMnttoUsuarios : BasePage
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
        public static string NuevaPassword(string username, string password)
        {
            try
            {
                // var usuario = Membership.CreateUser(username, passwordnew);
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
    }
}