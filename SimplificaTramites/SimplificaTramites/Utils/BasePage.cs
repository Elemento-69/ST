using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;

namespace SimplificaTramites.Utils
{
    public class BasePage : Page
    {
        protected string baseUrl;
        protected string token;
        protected HttpContext ctx;
        protected BaseClient httpClient;
        protected int EsSupervisor;
        protected string rolConsultas;


        /// <summary>
        /// Refresca el token del usuario
        /// </summary>
        /// <returns></returns>
        protected async Task RefreshToken()
        {                        
            var json = JsonConvert.SerializeObject(new { TokenVencido = token });
            var response = await httpClient.PostAsync($"{baseUrl}api/login/refreshtoken", json);
            var content = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                token = JsonConvert.DeserializeObject<string>(content);
                HttpContext.Current.Session.Add("token", token);
            }
            else
            {
                CommonHelper.ErrorMsgBox(content, this.Page, this);
            }
        }

        protected void setBasePageVars()
        {
            if (ConfigurationManager.AppSettings["vProxy"] != "")
            {
                ViewState["proxyURL"] = "/" + ConfigurationManager.AppSettings["vProxy"];
            } else
            {
                ViewState["proxyURL"] = "";
            }
        }
    }
}