using Stimulsoft.Report;
using System;
using System.Configuration;

namespace Covialgt.Incidencias
{
    public partial class frmIncidenciasVisorReportes : System.Web.UI.Page
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
            switch (pIdReporte[0])
            {
                case "1": ///Informe de incidencia
                    report.Load(Server.MapPath("../Reportes/RptInformeIndividualIncidencia.mrt"));

                    report.Dictionary.DataSources[0].Parameters[0].Value = pMostrar[0];
                    report.Dictionary.DataSources[1].Parameters[0].Value = pMostrar[0];

                    break;

                case "2": //Informe de incidencia individual, generado por filtros de consulta de emergencias
                    int fechaDesde_dia, fechaDesde_mes, fechaDesde_anio;
                    int fechaHasta_dia, fechaHasta_mes, fechaHasta_anio;

                    if (pMostrar[3].Length < 8) {
                        fechaDesde_dia = 0;
                        fechaDesde_mes = 0;
                        fechaDesde_anio = 0;
                    } else
                    {
                        string[] fD = pMostrar[3].Split('-');                        
                        fechaDesde_dia = Int32.Parse(fD[0]);
                        fechaDesde_mes = Int32.Parse(fD[1]);
                        fechaDesde_anio = Int32.Parse(fD[2]);
                    }

                    if (pMostrar[4].Length < 8)
                    {
                        fechaHasta_dia = 0;
                        fechaHasta_mes = 0;
                        fechaHasta_anio = 0;
                    }
                    else
                    {
                        string[] fH = pMostrar[4].Split('-');
                        fechaHasta_dia = Int32.Parse(fH[0]);
                        fechaHasta_mes = Int32.Parse(fH[1]);
                        fechaHasta_anio = Int32.Parse(fH[2]);
                    }

                    report.Load(Server.MapPath("../Reportes/RptInformeIndividualIncidencia_X_Filtros.mrt"));

                    //@AnioID, @ProyectoCodigo, @IdTramo,
                    //@FechaDesde_dia, @FechaDesde_mes, @FechaDesde_anio,
                    //@FechaHasta_dia, @FechaHasta_mes, @FechaHasta_anio,
                    //@IdTipo, @IdSeveridad, @IdEstado
                    report.Dictionary.DataSources[0].Parameters[0].Value = pMostrar[0];
                    report.Dictionary.DataSources[0].Parameters[1].Value = "\"" + pMostrar[1] + "\"";
                    report.Dictionary.DataSources[0].Parameters[2].Value = pMostrar[2];
                    report.Dictionary.DataSources[0].Parameters[3].Value = fechaDesde_dia.ToString();
                    report.Dictionary.DataSources[0].Parameters[4].Value = fechaDesde_mes.ToString();
                    report.Dictionary.DataSources[0].Parameters[5].Value = fechaDesde_anio.ToString();
                    report.Dictionary.DataSources[0].Parameters[6].Value = fechaHasta_dia.ToString();
                    report.Dictionary.DataSources[0].Parameters[7].Value = fechaHasta_mes.ToString();
                    report.Dictionary.DataSources[0].Parameters[8].Value = fechaHasta_anio.ToString();
                    report.Dictionary.DataSources[0].Parameters[9].Value = pMostrar[5];
                    report.Dictionary.DataSources[0].Parameters[10].Value = pMostrar[6];
                    report.Dictionary.DataSources[0].Parameters[11].Value = pMostrar[7];

                    report.Dictionary.DataSources[1].Parameters[0].Value = pMostrar[0];
                    report.Dictionary.DataSources[1].Parameters[1].Value = "\"" + pMostrar[1] + "\"";
                    report.Dictionary.DataSources[1].Parameters[2].Value = pMostrar[2];
                    report.Dictionary.DataSources[1].Parameters[3].Value = fechaDesde_dia.ToString();
                    report.Dictionary.DataSources[1].Parameters[4].Value = fechaDesde_mes.ToString();
                    report.Dictionary.DataSources[1].Parameters[5].Value = fechaDesde_anio.ToString();
                    report.Dictionary.DataSources[1].Parameters[6].Value = fechaHasta_dia.ToString();
                    report.Dictionary.DataSources[1].Parameters[7].Value = fechaHasta_mes.ToString();
                    report.Dictionary.DataSources[1].Parameters[8].Value = fechaHasta_anio.ToString();
                    report.Dictionary.DataSources[1].Parameters[9].Value = pMostrar[5];
                    report.Dictionary.DataSources[1].Parameters[10].Value = pMostrar[6];
                    report.Dictionary.DataSources[1].Parameters[11].Value = pMostrar[7];

                    break;
            }
            StiWebViewer1.Report = report;
        }


    }
}