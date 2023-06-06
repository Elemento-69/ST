using Covialgt.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Covialgt.Clases;
using Newtonsoft.Json;
using System.Data;
using System.Threading.Tasks;
using System.Drawing;
using System.IO;




namespace Covialgt.ReportesViales
{
    public partial class frmEdicionReportesViales : BasePage
    {
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
        }


        // funcion enviar email
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]

        public static int SendMailNotification(string destinatario, string body)
        {
            string micorreo = "";//ingresar correo de donde se envía
            var subjects = "NOTIFICACIÓN ASIGNACIÓN DE PROYECTO REPORTE VÍAL";

            try
            {
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(micorreo);
                mail.To.Add(destinatario);
                mail.Subject = subjects;
                mail.Body = body;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.Credentials = new NetworkCredential("", ""); //email y password del correo que envía las notificaciones
                smtp.EnableSsl = true;

                smtp.Send(mail);
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }


    }
}