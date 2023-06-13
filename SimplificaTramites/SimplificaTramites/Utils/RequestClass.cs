using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace SimplificaTramites.Utils
{
    public class RequestClass<T>: BasePage
    {
        private string uri;
        public RequestClass(BaseClient httpClient , string url)
        {
            this.httpClient = httpClient;
            this.uri = url;
        }

        public async Task<List<T>> GetRequest()
        {
            HttpResponseMessage response = await httpClient.GetAsync(uri);
            string content = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                return JsonConvert.DeserializeObject<List<T>>(content);
            }
            else if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                // Reintentamos una sola vez refrescar el token
                await RefreshToken();
                httpClient = new BaseClient(baseUrl, token);
                response = await httpClient.GetAsync(uri);
                content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<T>>(content);
            }
            else
            {
                CommonHelper.ErrorMsgBox(content, this.Page, this);
                return null;
            }
        }
    }
}