using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SimplificaTramites.Utils
{
    public class BaseClient
    {
        protected string ApiAddress { get; }
        protected string RequestUri { set; get; }
        protected string AccessToken { get; }

        public BaseClient(string apiAddress, string accessToken)
        {
            ApiAddress = apiAddress;
            AccessToken = accessToken;
        }

        /// <summary>
        /// Configura un httpclient para hacer solicitudes a la API REST
        /// </summary>
        /// <param name="client">cliente http</param>
        public void PrepareRequest(HttpClient client)
        {
            // Establecemos la dirección base del servicio REST
            client.BaseAddress = new Uri(ApiAddress);

            // Limpiamos Encabezados de la petición
            client.DefaultRequestHeaders.Accept.Clear();

            // Agregamos header de autorizacion
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {AccessToken}");
        }

        /// <summary>
        /// Permite hacer una solicitud GET a la URL indicada
        /// </summary>
        /// <param name="uri">URL a utilizar</param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> GetAsync(string uri)
        {
            HttpResponseMessage response = null;
            // Utilizamos el objeto System.Net.HttpClient para consumir el servicio REST
            using (var client = new HttpClient())
            {
                PrepareRequest(client);

                // Maneja el error del certificado de seguridad
                ServicePointManager.ServerCertificateValidationCallback += (_, __, ___, ____) => true;

                response = await client.GetAsync(uri);
            }
            return response;
        }

        /// <summary>
        /// Permite hacer una solicitud POST a la URL indicada
        /// </summary>
        /// <param name="uri">URL a utilizar</param>
        /// <param name="json">Texto serializado con el contenido de la solicitud</param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> PostAsync(string uri, string json)
        {
            HttpResponseMessage response = null;
            // Utilizamos el objeto System.Net.HttpClient para consumir el servicio REST
            using (var client = new HttpClient())
            {
                PrepareRequest(client);

                // Maneja el error del certificado de seguridad
                ServicePointManager.ServerCertificateValidationCallback += (_, __, ___, ____) => true;

                // Serializamos el contenido
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                response = await client.PostAsync(uri, content);
            }

            return response;
        }

        /// <summary>
        /// Permite hacer una solicitud PUT a la URL indicada
        /// </summary>
        /// <param name="uri">URL a utilizar</param>
        /// <param name="json">Texto serializado con el contenido de la solicitud</param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> PutAsync(string uri, string json)
        {
            HttpResponseMessage response = null;
            // Utilizamos el objeto System.Net.HttpClient para consumir el servicio REST
            using (var client = new HttpClient())
            {
                PrepareRequest(client);

                // Maneja el error del certificado de seguridad
                ServicePointManager.ServerCertificateValidationCallback += (_, __, ___, ____) => true;

                // Serializamos el contenido
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                response = await client.PutAsync(uri, content);
            }

            return response;
        }

        /// <summary>
        /// Permite hacer una solicitud DELETE a la URL indicada
        /// </summary>
        /// <param name="uri">URL a utilizar</param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> DeleteAsync(string uri)
        {
            HttpResponseMessage response = null;
            // Utilizamos el objeto System.Net.HttpClient para consumir el servicio REST
            using (var client = new HttpClient())
            {
                PrepareRequest(client);

                // Maneja el error del certificado de seguridad
                ServicePointManager.ServerCertificateValidationCallback += (_, __, ___, ____) => true;

                response = await client.DeleteAsync(uri);
            }

            return response;
        }
    }
}