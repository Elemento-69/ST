using SimplificaTramites.Clases;
using SimplificaTramites.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using SimplificaTramites.Utils;
using System.Collections;
using System.Net;
using System.Threading.Tasks;
using System.Web.Services;

using System.Web.UI;
using DevExpress.DashboardWeb;
using DevExpress.DashboardCommon;

namespace SimplificaTramites
{
    public partial class DashboardGerencial : BasePage
    {

        public DataTable dtDatosDashboard = new DataTable();
        public Boolean vglobalVerifica = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            DashboardConfigurator.PassCredentials = true;
            HttpContext ctx = HttpContext.Current;
          //  DashboardStorageFolder = "C:\GitHub\SICOP-Web\Covialgt\Covialgt\App_Data\Dashboards"
            ASPxDashboard1.DashboardStorageFolder = "~/App_Data/Dashboards/";
            if (ctx.Session.Count < 1)
            {
                Response.Redirect("~/Auth/Login.aspx");
            }
            baseUrl = ConfigurationManager.AppSettings["baseURL"];
            token = HttpContext.Current.Session["token"]?.ToString();
            httpClient = new BaseClient(baseUrl, token);

            //ASPxDashboard1.DashboardXmlPath = Server.MapPath("/XMLDASH/DashboardDesignerCovial.xml");
            //"C:\\GitHub\\SICOP-Web\\Covialgt\\Covialgt\\XMLDASH\\DashboardDesignerCovial.xml";
            if (!IsPostBack)
            {
                RegisterAsyncTask(new PageAsyncTask(CreatePlanAnualDataSource));
             

            }
        }



        private async Task CreatePlanAnualDataSource()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("AnioID", typeof(string)));
            dt.Columns.Add(new DataColumn("PlanAnualNombre", typeof(string)));

            var response = await httpClient.GetAsync($"{baseUrl}api/plananual/get");
            var content = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var planes = JsonConvert.DeserializeObject<List<PlanAnual>>(content);

                foreach (var plan in planes)
                {
                    dt.Rows.Add(CreateRow(plan.AnioID, plan.PlanAnualNombre, dt));
                }
            }
            else
            {
                CommonHelper.ErrorMsgBox(content, this.Page, this);
            }

            DataView dv = new DataView(dt);
            cmbPlanAnual.DataSource = dv;
            cmbPlanAnual.DataTextField = "AnioID";
            cmbPlanAnual.DataValueField = "PlanAnualNombre";

            // Bind the data to the control.
            cmbPlanAnual.DataBind();
        }



        private DataRow CreateRow(string Value, string Text, DataTable dt)
        {
            DataRow dr = dt.NewRow();
            dr[0] = Text;
            dr[1] = Value;

            return dr;
        }




        private async void CargarProgramas()
        {

            cmbProgramas.DataSource = await CreateProgramaDataSource();

            cmbProgramas.DataTextField = "ProgramaCodigo";
            cmbProgramas.DataValueField = "ProgramaNombre";

            // Bind the data to the control.
            cmbProgramas.DataBind();

            // Set the default selected item, if desired.
            //if (cmbProgramas.Items.Count > 0)
            //{
            //    cmbProgramas.SelectedIndex = 0;
            //}
          
        }


        private async Task<ICollection> CreateProgramaDataSource()
        {
            string vAnio = "";
            vAnio = cmbPlanAnual.SelectedValue;
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("ProgramaCodigo", typeof(string)));
            dt.Columns.Add(new DataColumn("ProgramaNombre", typeof(string)));

            var response = await httpClient.GetAsync($"{baseUrl}api/Programa/Get/" + vAnio);
            var content = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var planes = JsonConvert.DeserializeObject<List<Programa>>(content);

                foreach (var plan in planes)
                {
                    dt.Rows.Add(CreateRow(plan.ProgramaCodigo, plan.ProgramaNombre, dt));
                }
            }
            else
            {
                CommonHelper.ErrorMsgBox(content, this.Page, this);
            }

            DataView dv = new DataView(dt);
            return dv;
        }



      

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string fObtenerToken()
        {
            HttpContext ctx = HttpContext.Current;
            ctrlGestionRespuesta vGestion = new ctrlGestionRespuesta();
            DataTable dtUsuario = new DataTable();
            dtUsuario.Columns.Add("token", typeof(string));
            dtUsuario.Columns.Add("usuario", typeof(string));
            dtUsuario.Columns.Add("proxyURL", typeof(string));
            dtUsuario.Columns.Add("baseURL", typeof(string));
            DataRow _usuario = dtUsuario.NewRow();
            if (ctx.Session.Count > 0)
            {
                _usuario["token"] = HttpContext.Current.Session["token"].ToString();
                _usuario["usuario"] = HttpContext.Current.Session["Usuario"].ToString();
                _usuario["proxyURL"] = ConfigurationManager.AppSettings["vProxy"];
                _usuario["baseURL"] = ConfigurationManager.AppSettings["baseURL"];
                dtUsuario.Rows.Add(_usuario);

                vGestion.tablaDevuelta = dtUsuario;
                vGestion.dioError = false;
            }
            return JsonConvert.SerializeObject(vGestion);
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static bool fActualizarToken(string pToken)
        {
            HttpContext.Current.Session.Add("token", pToken);
            return true;
        }

  

        protected void cmbPlanAnual_SelectedIndexChanged(object sender, EventArgs e)
        {
           
            CargarProgramas();
 
        }

        protected void btnDash_Click1(object sender, EventArgs e)
        {
            vglobalVerifica = true;

        }

       

   
     

     

        protected void ASPxDashboard1_CustomParameters(object sender, CustomParametersWebEventArgs e)
        {

            //if (vglobalVerifica)
            //{
                var AnioID = e.Parameters[0];
                var ProgramaId = e.Parameters[1];

                if (AnioID != null)
                {
                    AnioID.Value = cmbPlanAnual.SelectedValue;
                }

                if (ProgramaId != null)
                {
                    ProgramaId.Value = cmbProgramas.SelectedValue;
                }
            //}

            
        }

        protected void ASPxDashboard1_SetInitialDashboardState(object sender, SetInitialDashboardStateEventArgs e)
        {

            e.InitialState = InitializeDashboardState();
        }

        public DashboardState InitializeDashboardState()
        {
            DashboardState dashboardState = new DashboardState();
            
            return dashboardState;
        }


        //protected void Application_Error(object sender, EventArgs e)
        //{
        //    TextLog.AddToLog(
        //        System.Web.HttpContext.Current.Server.GetLastError(),
        //        System.Web.HttpContext.Current.Server.MapPath("~/App_Data/Error.log"));
        //}

        //private static void Default_ConnectionError(object sender, ConnectionErrorWebEventArgs e)
        //{
        //    TextLog.AddToLog(
        //        e.Exception,
        //        System.Web.HttpContext.Current.Server.MapPath("~/App_Data/Error.log"));
        //}
    }

}