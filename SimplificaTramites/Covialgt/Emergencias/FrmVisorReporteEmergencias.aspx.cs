using Stimulsoft.Report;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Covialgt.Emergencias
{
    public partial class FrmVisorReporteEmergencias : System.Web.UI.Page
    {
        public string pathReporte = ConfigurationManager.AppSettings["pathReporte"];
        public int vIdAnio;
        public string vIdProyecto;
        public string[] pMostrar;
        public string[] pIdReporte;
        public string[] pReporte;
        private readonly bool _allowDOCX = true;
        private readonly bool _allowXLS = true;
        private readonly bool _allowXLSX = true;
        //private bool _allowJPG = true;
        private readonly bool _allowPDF = true;
        private readonly bool _allowHTML = true;
        private readonly bool _allowTXT = true;
        private readonly bool _allowXML = false;
        //private bool _allowTIF = true;

        protected void Page_Load(object sender, EventArgs e)
        {
            Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHm5Zr4btO5vSKPzBy9Tc7KKbmORmC/seaWkev6yq3zYqUEuhf" +
"KMiHA2mGkUihU+2IHS4Vq5raUNImt2BylHUkZWkr4wISbsZrVOR2M3pfLf9dH4fFAMko8D43b/OkAzqLPWOYULmgKl" +
"OSqttb10HFOFR7s3OuV6yVjwbgnM3sUKs3Qmn8SmInjAfXFDoSg6sLJ8GPpA/cb5cvvn5gAkPdApXH58SUH0X3czy/" +
"eL7ThdtL7s+pZapQUuLS28k8C6gjClr2tnQBUvay2imi4yPV0PFwK1zmIITft/+5lkBmsO0ZdHRiaIBNpZ6yfO/NY/" +
"KaeE6wiQAyay5nNZlNjpatlyp+jQFMkqfVzOVgdxBl6NK7kebSTu2nSWY9T0XKdmY4SUe89WD7rOTz+L+Dhcidhlsn" +
"qZrUFYKN10mhHxuJeCk/IDY0do3gF3yDsTeWHuUaULnffg3fbkRkzSldriHlKSG5SivrEGF0q1DGWl/8/hoqt0gMi8" +
"42TDBd2hLRmC8LjW11ghIqowwWXYfOYe8EB2";
            fObtenerParametrosReporte();
            fPrepararReportViewer();
            fGenerarReporte();
        }



        private void fPrepararReportViewer()
        {
            try
            {
                Stimulsoft.Report.Web.StiWebViewer ReportViewer = StiWebViewer1;
                //ReportViewer.RenderMode = Stimulsoft.Report.Web.StiRenderMode.AjaxWithCache;
                //ReportViewer.ShowExportToBmp = false;
                ReportViewer.ShowExportToCsv = false;
                ReportViewer.ShowExportToDbf = false;
                ReportViewer.ShowExportToExcel = _allowXLS;
                ReportViewer.ShowExportToExcel2007 = _allowXLSX;
                ReportViewer.ShowExportToExcelXml = false;
                //ReportViewer.ShowExportToGif = false;
                ReportViewer.ShowExportToHtml = _allowHTML;
                //ReportViewer.ShowExportToJpeg = _allowJPG;
                //ReportViewer.ShowExportToMetafile = false;
                ReportViewer.ShowExportToMht = false;
                //ReportViewer.ShowExportToOds = false;
                //ReportViewer.ShowExportToOdt = false;
                //ReportViewer.ShowExportToPcx = false;
                ReportViewer.ShowExportToPdf = _allowPDF;
                //ReportViewer.ShowExportToPng = false;
                ReportViewer.ShowExportToPowerPoint = false;
                ReportViewer.ShowExportToRtf = false;
                ReportViewer.ShowExportToText = _allowTXT;
                //ReportViewer.ShowExportToTiff = _allowTIF;
                ReportViewer.ShowExportToWord2007 = _allowDOCX;
                ReportViewer.ShowExportToXml = _allowXML;
                ReportViewer.ShowExportToXps = false;
                //ReportViewer.ShowSave = (ReportViewer.ShowExportToBmp | ReportViewer.ShowExportToCsv | ReportViewer.ShowExportToDbf | ReportViewer.ShowExportToExcel | ReportViewer.ShowExportToExcel2007 | ReportViewer.ShowExportToExcelXml | ReportViewer.ShowExportToGif | ReportViewer.ShowExportToHtml | ReportViewer.ShowExportToJpeg | ReportViewer.ShowExportToMetafile | ReportViewer.ShowExportToMht | ReportViewer.ShowExportToOds | ReportViewer.ShowExportToOdt | ReportViewer.ShowExportToPcx | ReportViewer.ShowExportToPdf | ReportViewer.ShowExportToPng | ReportViewer.ShowExportToPowerPoint | ReportViewer.ShowExportToRtf | ReportViewer.ShowExportToText | ReportViewer.ShowExportToTiff | ReportViewer.ShowExportToWord2007 | ReportViewer.ShowExportToXml | ReportViewer.ShowExportToXps);
                ReportViewer.ShowPrintButton = _allowPDF;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void fObtenerParametrosReporte()
        {
            if (Request.QueryString.Count != 0)
            {
                pMostrar = Request.QueryString["Parameters"].ToString().Split(',');
                pIdReporte = Request.QueryString["IdReporte"].ToString().Split(',');
                pReporte = Request.QueryString["Reporte"].ToString().Split(',');
            }
        }

        private void fGenerarReporte()
        {
            string baseUrl = Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/') + "/";

            StiReport report = new StiReport();
            report.Compile();
            switch (pIdReporte[0])
            {
                case "1": ///Informe de emergencia
                    report.Load(Server.MapPath("../Reportes/RptInformeIndividualEmergencia.mrt"));

                    report.Dictionary.DataSources[0].Parameters["@IdEmergencia"].Value = pMostrar[0].ToString();
                    report.Dictionary.DataSources[1].Parameters["@IdEmergenciaFotos"].Value = pMostrar[0].ToString();

                    //  report.Dictionary.DataSources[1].Parameters[1].Value = "httplocalhost";

                    break;
                case "2": //Informe de emergencia individual, generado por filtros de consulta de emergencias

                    int fechaDesde_dia, fechaDesde_mes, fechaDesde_anio;
                    int fechaHasta_dia, fechaHasta_mes, fechaHasta_anio;

                    if ((pMostrar[1].Length < 8) || (pMostrar[1].ToString()=="undefined"))
                    {
                        fechaDesde_dia = 0;
                        fechaDesde_mes = 0;
                        fechaDesde_anio = 0;
                    }
                    else
                    {
                        string[] fD = pMostrar[1].Split('/');
                        fechaDesde_dia = Int32.Parse(fD[0]);
                        fechaDesde_mes = Int32.Parse(fD[1]);
                        fechaDesde_anio = Int32.Parse(fD[2]);
                    }

                    if ((pMostrar[2].Length < 8) || (pMostrar[2].ToString() == "undefined"))
                    {
                        fechaHasta_dia = 0;
                        fechaHasta_mes = 0;
                        fechaHasta_anio = 0;
                    }
                    else
                    {
                        string[] fH = pMostrar[2].Split('/');
                        fechaHasta_dia = Int32.Parse(fH[0]);
                        fechaHasta_mes = Int32.Parse(fH[1]);
                        fechaHasta_anio = Int32.Parse(fH[2]);
                    }

                    report.Load(Server.MapPath("../Reportes/RptInformeIndividualEmergencia_X_Filtros.mrt"));

                    //@IdTramo, @IdTipo, @IdCausa, @IdPaso,
                    //@IdSeveridad, @IdEstado, @IdDepartamento
                    //@FechaDesde_dia, @FechaDesde_mes, @FechaDesde_anio,
                    //@FechaHasta_dia, @FechaHasta_mes, @FechaHasta_anio, 

                    report.Dictionary.DataSources[0].Parameters["@IdTramo"].Value = pMostrar[0];                                       
                    report.Dictionary.DataSources[0].Parameters["@IdTipo"].Value =  pMostrar[3];
                    report.Dictionary.DataSources[0].Parameters["@IdCausa"].Value = pMostrar[4];
                    report.Dictionary.DataSources[0].Parameters["@IdPaso"].Value = pMostrar[5];
                    report.Dictionary.DataSources[0].Parameters["@IdSeveridad"].Value = pMostrar[6];
                    report.Dictionary.DataSources[0].Parameters["@IdEstado"].Value = pMostrar[7];
                    report.Dictionary.DataSources[0].Parameters["@IdDepartamento"].Value = pMostrar[8];
                    report.Dictionary.DataSources[0].Parameters["@FechaDesde_dia"].Value = fechaDesde_dia.ToString();
                    report.Dictionary.DataSources[0].Parameters["@FechaDesde_mes"].Value = fechaDesde_mes.ToString();
                    report.Dictionary.DataSources[0].Parameters["@FechaDesde_anio"].Value = fechaDesde_anio.ToString();
                    report.Dictionary.DataSources[0].Parameters["@FechaHasta_dia"].Value = fechaHasta_dia.ToString();
                    report.Dictionary.DataSources[0].Parameters["@FechaHasta_mes"].Value = fechaHasta_mes.ToString();
                    report.Dictionary.DataSources[0].Parameters["@FechaHasta_anio"].Value = fechaHasta_anio.ToString();

                    report.Dictionary.DataSources[1].Parameters["@IdTramo"].Value = pMostrar[0];                    
                    report.Dictionary.DataSources[1].Parameters["@IdTipo"].Value = pMostrar[3];
                    report.Dictionary.DataSources[1].Parameters["@IdCausa"].Value = pMostrar[4];
                    report.Dictionary.DataSources[1].Parameters["@IdPaso"].Value = pMostrar[5];
                    report.Dictionary.DataSources[1].Parameters["@IdSeveridad"].Value = pMostrar[6];
                    report.Dictionary.DataSources[1].Parameters["@IdEstado"].Value = pMostrar[7];
                    report.Dictionary.DataSources[1].Parameters["@IdDepartamento"].Value = pMostrar[8];
                    report.Dictionary.DataSources[1].Parameters["@FechaDesde_dia"].Value = fechaDesde_dia.ToString();
                    report.Dictionary.DataSources[1].Parameters["@FechaDesde_mes"].Value = fechaDesde_mes.ToString();
                    report.Dictionary.DataSources[1].Parameters["@FechaDesde_anio"].Value = fechaDesde_anio.ToString();
                    report.Dictionary.DataSources[1].Parameters["@FechaHasta_dia"].Value = fechaHasta_dia.ToString();
                    report.Dictionary.DataSources[1].Parameters["@FechaHasta_mes"].Value = fechaHasta_mes.ToString();
                    report.Dictionary.DataSources[1].Parameters["@FechaHasta_anio"].Value = fechaHasta_anio.ToString();

                    //    report.Dictionary.DataSources["prObtenerInformeIndividualEmergencias_Fotos"].Parameters["@WebsiteURL"].Value = baseUrl;


                    break;

                case "3": ///Informe de emergencia
                    report.Load(Server.MapPath("../Reportes/RptInformeCausaDanhoEmergencia.mrt"));

                    report.Dictionary.DataSources[0].Parameters[0].Value = pMostrar[0];
                    report.Dictionary.DataSources[1].Parameters[0].Value = pMostrar[0];

                    break;
            }
          
            
            
            
            
            
            
            
            StiWebViewer1.Report = report;
        }


    }

}