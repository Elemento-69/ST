using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace Covialgt.Auxiliares
{
    /// <summary>
    /// Summary description for AuxiliaresFileUploadHandler
    /// </summary>
    public class AuxiliaresFileUploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var vRuta = context.Request.QueryString["vRuta"];

            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    file.SaveAs(vRuta);  //vRuta contiene carpeta y nombre del archivo
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}