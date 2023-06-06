using Covialgt.Utils;
using System;
using System.Configuration;
using System.Web;

namespace Covialgt.Estimaciones
{
    public partial class Recepciondocumentos : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            ViewState["baseurl"] = baseUrl;
            
            // Conseguir roles
            ViewState["AsignaDevengado"] = HttpContext.Current.User.IsInRole("ASIGNA DEVENGADO") ? 1 : 0;
            ViewState["RolTrasladoFinanciero"] = HttpContext.Current.User.IsInRole("TRASLADO FINANCIERO") ? 1 : 0;
            ViewState["RolReceptorDeVisa"] = HttpContext.Current.User.IsInRole("Receptor de Visa") ? 1 : 0;
            ViewState["RolCoordinadorDeVisa"] = HttpContext.Current.User.IsInRole("Coordinador de Visa") ? 1 : 0;
            ViewState["RolRegionales"] = HttpContext.Current.User.IsInRole("REGIONALES") ? 1 : 0;
            ViewState["RolIngenieroControlSeguimiento"] = HttpContext.Current.User.IsInRole("INGENIERO DE CONTROL Y SEGUIMIENTO") ? 1 : 0;
            ViewState["RolSubdirectorTEC"] = HttpContext.Current.User.IsInRole("SUB DIRECTOR TEC") ? 1 : 0;
            ViewState["RolDigitalizador"] = HttpContext.Current.User.IsInRole("Digitalizador") ? 1 : 0;
            ViewState["RolAuxiliarTecnico"] = HttpContext.Current.User.IsInRole("Auxiliar Tecnico") ? 1 : 0;
            ViewState["RolAsistenteSubdireccion"] = HttpContext.Current.User.IsInRole("ASISTENTE DE SUBDIRECCION") ? 1 : 0;
            ViewState["RolAuxiliarTecnico2"] = HttpContext.Current.User.IsInRole("Auxiliar Tecnico2") ? 1 : 0;
            ViewState["RolReceptorFinanciero"] = HttpContext.Current.User.IsInRole("Receptor Financiero") ? 1 : 0;            
            ViewState["RolAdministrador"] = HttpContext.Current.User.IsInRole("ADMINISTRADOR") ? 1 : 0;
            httpClient = new BaseClient(baseUrl, token);
        }
    }
}