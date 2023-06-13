using System.Net.Mail;
using System.Configuration;
using System.Web.Configuration;
using System.Net.Configuration;
using System.Net;
using System.Net.Security;
using Covialgt.Clases;
using Covialgt.Utils;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Web;
using System.Web.Script.Services;
using System.Web.Security;
using System.Web.Services;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using Stimulsoft.Report;
using System.IO;
using System.Reflection;
using Stimulsoft.Report.Web;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Newtonsoft.Json.Linq;

namespace Covialgt.Solicitudes
{
    //private bool _allowTIF = true;
    public partial class frmSolicitudes : BasePage
    {
        public StiWebViewer StiWebViewer1 { get; private set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            ViewState["plan"] = Request.QueryString["plan"];
            ViewState["proyecto"] = Request.QueryString["proyecto"];
            ViewState["periodo"] = Request.QueryString["periodo"];
            ViewState["programa"] = Request.QueryString["programa"];
            ViewState["baseurl"] = ConfigurationManager.AppSettings["baseURL"];
            ViewState["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
            ViewState["thumbnail"] = ConfigurationManager.AppSettings["thumbnail"];
            ViewState["ReportesVialesPath"] = ConfigurationManager.AppSettings["ReportesVialesPath"];
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);

            string strRol = "";
            string strUser = User.Identity.Name;
            if (Roles.IsUserInRole(strUser, "ADMINISTRADOR"))
            {
                strRol = "ADMINISTRADOR";
            }
            else if (Roles.IsUserInRole(strUser, "SUPERVISOR"))
            {
                strRol = "SUPERVISOR";
            }
            else if (Roles.IsUserInRole(strUser, "REGIONALES"))
            {
                strRol = "REGIONALES";
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
            dtUsuario.Columns.Add("rol_usuario", typeof(string));
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

        // funcion enviar email
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

        public static int SendMailNotification(string destinatario, string body)
        {
            string micorreo = "psantiago@covial.gob.gt";//ingresar correo de donde se envía
            var subjects = "NOTIFICACIÓN CONSTANCIA DE SANCIONES";
            var domain = "srv-dominio.covial.local";
            var user = "psantiago";
            var password = "Covial2022";
            try
            {
                SmtpClient sMail = new SmtpClient(domain);
                sMail.DeliveryMethod = SmtpDeliveryMethod.Network;
                sMail.Credentials = new NetworkCredential(user, password);
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(micorreo);
                mail.To.Add(destinatario);
                mail.Subject = subjects;
                mail.Body = body;
                //mail.Attachments.Add(email.file);
                mail.IsBodyHtml = true;
                sMail.Send(mail);
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}