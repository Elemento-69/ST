using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace Covialgt.Helpers
{
    /// <summary>
    /// Summary description for RefreshToken
    /// </summary>
    public class RefreshToken : HttpTaskAsyncHandler, IRequiresSessionState
    {

        public async Task getToken()
        {
            string baseUrl = ConfigurationManager.AppSettings["baseURL"];
            string token = HttpContext.Current.Session["token"]?.ToString();
            var httpClient = new Utils.BaseClient(baseUrl, token);
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
                token = "";
            }
            HttpContext.Current.Response.Write(token);
        }

        public override Task ProcessRequestAsync(HttpContext context)
        {
            return getToken();
        }
     
    }
}