using Covialgt.Clases;
using Covialgt.Models;
using Covialgt.Utils;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Security;
using System.Web.Services;

namespace Covialgt.Auth
{
    public partial class ReiniciarPassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fCambiarPass(string pPassActual, string pPssNew)
        {
            var vUsuarioActual = HttpContext.Current.Session["Usuario"];
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();

            try
            {
                // var usuario = Membership.CreateUser(username, passwordnew);
                MembershipUser vUsuario;
                bool EsUsuarioValido = Membership.ValidateUser(vUsuarioActual.ToString(), pPassActual);
              

                if (EsUsuarioValido)
                {
                    vUsuario = Membership.GetUser(vUsuarioActual.ToString());
                    vUsuario.ChangePassword(pPassActual, pPssNew);
                    vGestion.dioError = false;
                    vGestion.descripcionMensaje = "Su contraseña se actualizó correctamente, por favor inicie sesión";

                }
                else {

                    vGestion.dioError = true;
                    vGestion.descripcionError = "El usuario no existe en base de datos";

                }


               
            }
            catch (MembershipCreateUserException e)
            {
                vGestion.dioError = true;
                vGestion.descripcionError = e.Message;
            }
            catch (Exception ex)
            {
                vGestion.dioError = true;
                vGestion.descripcionError = ex.Message;
            }


            return JsonConvert.SerializeObject(vGestion);
        }
    }
}