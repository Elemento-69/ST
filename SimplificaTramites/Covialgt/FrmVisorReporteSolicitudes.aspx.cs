using Stimulsoft.Report;
using System;
using System.Configuration;
using iTextSharp.text.pdf;
using System.IO;
using iTextSharp.text;
using System.Web.Services;
using System.Web.Script.Services;
using Newtonsoft.Json;
using Covialgt.Solicitudes;

namespace Covialgt
{
    public partial class FrmVisorReporteSolicitudes : System.Web.UI.Page
    {
        public string pathReporte = ConfigurationManager.AppSettings["pathReporte"];
        public int vIdAnio;
        public string vIdProyecto;
        public string[] pMostrar;
        public string[] pIdReporte;
        public string[] pReporte;
        public string[] pId;
        private Document document;
        private readonly bool _allowDOCX = true;
        private readonly bool _allowXLS = true;
        private readonly bool _allowXLSX = true;
        //readonly private bool _allowJPG = true;
        private readonly bool _allowPDF = true;
        private readonly bool _allowHTML = true;
        private readonly bool _allowTXT = true;
        private readonly bool _allowXML = false;
        //private bool _allowTIF = true;
        public string reporte { get; set; }

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
        public void fPrepararReportViewer()
        {
            try
            {
                Stimulsoft.Report.Web.StiWebViewer ReportViewer = StiWebViewer1;
                ReportViewer.ShowExportToCsv = false;
                ReportViewer.ShowExportToDbf = false;
                ReportViewer.ShowExportToExcel = _allowXLS;
                ReportViewer.ShowExportToExcel2007 = _allowXLSX;
                ReportViewer.ShowExportToExcelXml = false;
                ReportViewer.ShowExportToHtml = _allowHTML;
                ReportViewer.ShowExportToMht = false;
                ReportViewer.ShowExportToPdf = _allowPDF;
                ReportViewer.ShowExportToPowerPoint = false;
                ReportViewer.ShowExportToRtf = false;
                ReportViewer.ShowExportToText = _allowTXT;
                ReportViewer.ShowExportToWord2007 = _allowDOCX;
                ReportViewer.ShowExportToXml = _allowXML;
                ReportViewer.ShowExportToXps = false;
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
                pId = Request.QueryString["Id"].ToString().Split(',');
            }
        }
        public void fGenerarReporte()
        {
            StiReport report = new StiReport();
            switch (pIdReporte[0])
            {
                case "1":
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));
                    report.Dictionary.DataSources["prObtenerUnaSolicitudReprote"].Parameters["@Empresanit"].Value = pMostrar[0].ToString();
                    report.Dictionary.DataSources["prObtenerUnaSolicitudReprote"].Parameters["@Anio1"].Value = pMostrar[1];
                    report.Dictionary.DataSources["prObtenerUnaSolicitudReprote"].Parameters["@Anio2"].Value = pMostrar[2];
                    report.Dictionary.DataSources["prObtenerUnaSolicitudReprote"].Parameters["@Id"].Value = pId[0];

                    report.Dictionary.DataSources["prTieneOnoSanciones"].Parameters["@Empresanit"].Value = pMostrar[0].ToString();
                    report.Dictionary.DataSources["prTieneOnoSanciones"].Parameters["@Anio1"].Value = pMostrar[1];
                    report.Dictionary.DataSources["prTieneOnoSanciones"].Parameters["@Anio2"].Value = pMostrar[2];
                    report.Dictionary.DataSources["prTieneOnoSanciones"].Parameters["@Id"].Value = pId[0];

                    report.Dictionary.DataSources["probtenerDatosEmpresaSolicitud"].Parameters["@Empresanit"].Value = pMostrar[0].ToString();
                    report.Dictionary.DataSources["probtenerDatosEmpresaSolicitud"].Parameters["@Anio1"].Value = pMostrar[1];
                    report.Dictionary.DataSources["probtenerDatosEmpresaSolicitud"].Parameters["@Anio2"].Value = pMostrar[2];
                    report.Dictionary.DataSources["probtenerDatosEmpresaSolicitud"].Parameters["@Id"].Value = pId[0];

                    report.Dictionary.DataSources["prObtenerIdSolicitud"].Parameters["@Empresanit"].Value = pMostrar[0].ToString();
                    report.Dictionary.DataSources["prObtenerIdSolicitud"].Parameters["@Anio1"].Value = pMostrar[1];
                    report.Dictionary.DataSources["prObtenerIdSolicitud"].Parameters["@Anio2"].Value = pMostrar[2];
                    report.Dictionary.DataSources["prObtenerIdSolicitud"].Parameters["@Id"].Value = pId[0];
                    break;
            }
            StiWebViewer1.Report = report;
            //string urls = "http://covial.gob.gt:1090/SICOPV1/Solicitudes/";
            string urlsLocal = "G:\\SRV2\\wwwroot\\SICOPV1\\Solicitudes\\";
            //String vRutaServer = ConfigurationManager.AppSettings["PathSolicitudes"];
            //report.ExportDocument(StiExportFormat.Pdf, "C:\\Users\\psantiago\\Documents\\SISTEMAS\\SICOP-Web\\Covialgt\\Covialgt\\Solicitudes\\" + report + pId[0] + ".pdf");// Carga el archivo PDF desde el sistema de archivos
            //report.ExportDocument(StiExportFormat.Pdf, "http://covial.gob.gt:1090/apirest/Solicitudes\\Report" + pId[0] + ".pdf");
            report.ExportDocument(StiExportFormat.Pdf, urlsLocal + "Report" + pId[0] + ".pdf");
        }
        // funcion reornar pdf
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string Pdf64(string Id)
        {
            //string urls = "http://covial.gob.gt:1090/SICOPV1/Solicitudes/";
            string urlsLocal = "G:\\SRV2\\wwwroot\\SICOPV1\\Solicitudes\\";
            //String vRutaServer = ConfigurationManager.AppSettings["PathSolicitudes"];
            //using (PdfReader reader = new PdfReader("C:\\Users\\psantiago\\Documents\\SISTEMAS\\SICOP-Web\\Covialgt\\Covialgt\\Solicitudes\\Report" + Id + ".pdf"))
            //using (PdfReader reader = new PdfReader("http://covial.gob.gt:1090/apirest/Solicitudes\\Report" + Id + ".pdf"))
            using (PdfReader reader = new PdfReader(urlsLocal + "Report" + Id + ".pdf"))
            {
                // Guarda el contenido del PDF en un MemoryStream
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    Document document = new Document();
                    PdfCopy copy = new PdfCopy(document, memoryStream);
                    document.Open();
                    copy.AddDocument(reader);
                    document.Close();

                    // Convierte el contenido del PDF en una cadena de bytes codificada en base64
                    byte[] pdfBytes = memoryStream.ToArray();
                    string base64String = Convert.ToBase64String(pdfBytes);
                    //Pdf64(base64String);
                    // Envía la cadena codificada en base64 al script de JavaScript en la página web
                    //ClientScript.RegisterStartupScript(this.GetType(), "pdfContentScript", "var pdfContent = atob('" + base64String + "');", true);
                    return JsonConvert.SerializeObject(base64String);
                }
            }
        }
    }
}


