using Covialgt.Clases;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Covialgt
{
    public partial class frmPrincipal : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
             [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerToken()
        {
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            vGestion.datoDevueltoString= HttpContext.Current.Session["token"].ToString();
            vGestion.dioError = false;
            return JsonConvert.SerializeObject(vGestion);
        }
    }
}