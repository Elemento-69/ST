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
using System.Web.Security;

namespace Covialgt.Auth
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected async void BtnLogin_Click(object sender, EventArgs e)
        {
            string encryptedData = CommonHelper.Encrypt($"{TxtUser.Text},{TxtPassword.Text}", "Pas5pr@se", "s@1tValue", "SHA1", 2, "@1B2c3D4e5F6g7H8", 256);
            string baseUrl = ConfigurationManager.AppSettings["baseURL"];
            string token = string.Empty;
            string rol = string.Empty;
            using (var client = new HttpClient())
            {
                // Establecemos la dirección base del servicio REST
                client.BaseAddress = new Uri(baseUrl);

                // TODO: Maneja el error del certificado de seguridad en produccion debe quitarse y usar HTTPS
                ServicePointManager.ServerCertificateValidationCallback += (_, __, ___, ____) => true;

                try
                {
                    // Hacemos una peticion POST al servicio enviando el objeto JSON
                    var json = JsonConvert.SerializeObject(new { Credenciales = encryptedData });
                    var requestContent = new StringContent(json, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync($"{baseUrl}api/login/authenticateweb", requestContent);
                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        AuthModel blogObject = js.Deserialize<AuthModel>(content);
                        if (blogObject.NecesitaCambioPass)
                        {
                            HttpContext.Current.Session.Add("Usuario", TxtUser.Text);
                            Response.Redirect("~/Auth/ReiniciarPassword.aspx", false);
                        }
                        else
                        {
                            Membership.ValidateUser(TxtUser.Text, TxtPassword.Text);
                            FormsAuthentication.SetAuthCookie(TxtUser.Text, true);
                            token = blogObject.token;
                            rol = blogObject.rol;
                            //var jsonString = JsonConvert.DeserializeObject<string>(content);
                            //var respuesta = jsonString.Split(',');
                            //token    = respuesta[0].Split(':')[1].ToString();
                            //rol = respuesta[1].Split(':')[1].ToString();
                            HttpContext.Current.Session.Add("token", token);
                            HttpContext.Current.Session.Add("rol", rol);
                            HttpContext.Current.Session.Add("roles", Roles.GetRolesForUser(TxtUser.Text));
                            HttpContext.Current.Session.Add("LoginEncriptados", encryptedData);
                            HttpContext.Current.Session.Add("Usuario", TxtUser.Text);

                        // Si es supervisor, buscar acta de inicio aprobada
                        
                        if (blogObject.isSupervisor)
                        {
                            BaseClient httpClient = new BaseClient(baseUrl, token);
                            var responseActainicio = await httpClient.GetAsync("api/login/actainicio");
                            if (responseActainicio.IsSuccessStatusCode)
                            {
                                String contenido = await responseActainicio.Content.ReadAsStringAsync();
                                SupervisorActaInicioAprobada saia = js.Deserialize<SupervisorActaInicioAprobada>(contenido);
                                HttpContext.Current.Session.Add("ActaInicioAprobada", saia.actaInicio);
                                if (saia.actaInicio == 0)
                                {
                                    Response.Redirect("~/ActaInicio/frmActaInicio.aspx", false);
                                    return; // fin del evento BtnLogin_Click
                                }
                            }
                        } else {
                            HttpContext.Current.Session.Add("ActaInicioAprobada", 1); // se cambio false por 1 
                        }
                        Response.Redirect("~/default.aspx", false);
                        }
                    }
                    else
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        CommonHelper.ErrorMsgBox(content.ToString(), this.Page, this);
                    }
                }
                catch (Exception ex)
                {
                    CommonHelper.ErrorMsgBox(ex.Message, this.Page, this);
                }                
            }
        }
    }
}
