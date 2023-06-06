using Stimulsoft.Report;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Covialgt
{
    public partial class FrmVisorReporte : System.Web.UI.Page
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
        //readonly private bool _allowJPG = true;
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
            StiReport report = new StiReport();
            switch (pIdReporte[0])
            {
                case "1": ///Reporte de Ficha Técnica
                    //report.Load(Server.MapPath("Reportes/RptFichasTecnicas.mrt"));
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));

                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarCaratula"].Value = pMostrar[0];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@PorcentajesAvance"].Value = pMostrar[1];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@InformacionSupervision"].Value = pMostrar[2];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@InformacionContratista"].Value = pMostrar[3];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarDatosContrato"].Value = pMostrar[4];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarDatosRegional"].Value = pMostrar[5];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarDatosSuperintendente"].Value = pMostrar[6];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@GraficaAvanceFisico"].Value = pMostrar[7];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@GraficaAvancefinanciero"].Value = pMostrar[8];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarTramos"].Value = pMostrar[9];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarEstimaciones"].Value = pMostrar[10];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarPagos"].Value = pMostrar[11];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarSanciones"].Value = pMostrar[12];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarEjecucion"].Value = pMostrar[13];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarRenglones"].Value = pMostrar[14];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarAnalitico"].Value = pMostrar[15];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarResumenAnalitico"].Value = pMostrar[16];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarDocCambio"].Value = pMostrar[17];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarFotografiasEjecucion"].Value = pMostrar[18];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarFotografiasAdministrativas"].Value = pMostrar[19];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@MostrarComentarios"].Value = pMostrar[20];
                    report.Dictionary.DataSources["FdMostrar"].Parameters["@Dirigido"].Value = pMostrar[21].ToString();
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@Usuario"].Value = pMostrar[22].ToString();
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@TramoID"].Value = pMostrar[28];
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@RenglonID"].Value = pMostrar[29];
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@FechaInicio"].Value = pMostrar[26].ToString();
                    report.Dictionary.DataSources["FdFotografiasSupervision"].Parameters["@FechaFin"].Value = pMostrar[27].ToString();


                    report.Dictionary.DataSources["FdFotografiasAdministrativas"].Parameters["@Usuario"].Value = pMostrar[22].ToString();
                    report.Dictionary.DataSources["FdFotografiasAdministrativas"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdFotografiasAdministrativas"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();
                    report.Dictionary.DataSources["FdFotografiasAdministrativas"].Parameters["@TramoID"].Value = pMostrar[25];
                    report.Dictionary.DataSources["FdFotografiasAdministrativas"].Parameters["@FechaInicio"].Value = pMostrar[26].ToString();
                    report.Dictionary.DataSources["FdFotografiasAdministrativas"].Parameters["@FechaFin"].Value = pMostrar[27].ToString();

                    report.Dictionary.DataSources["FdInformacionGeneral"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdInformacionGeneral"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdSupervisora"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdSupervisora"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdRenglones"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdRenglones"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdGrafica"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdGrafica"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdEstimaciones"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdEstimaciones"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdPagos"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdPagos"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdTramos"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdTramos"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdSanciones"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdSanciones"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdDocCambio"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdDocCambio"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdComentarios"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdComentarios"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();


                    report.Dictionary.DataSources["FdGraficoBarras"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdGraficoBarras"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();

                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@IdAnio"].Value = pMostrar[23];
                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@IdProyecto"].Value = pMostrar[24].ToString();
                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@FechaDesde"].Value = pMostrar[26].ToString();
                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@FechaHasta"].Value = pMostrar[27].ToString();
                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@TramoID"].Value = pMostrar[30];
                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@RenglonID"].Value = pMostrar[31];
                    report.Dictionary.DataSources["FdAnalitico"].Parameters["@MostrarAnalitico"].Value = pMostrar[15];
                    break;
                case "2": //Reporte de Estimaciones Supervisor

                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));
                    report.Dictionary.DataSources["FDCnxSabana2012Encabezado"].Parameters["@AnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["FDCnxSabana2012Encabezado"].Parameters["@ProyectoCodigo"].Value = pMostrar[1].ToString();
                    report.Dictionary.DataSources["FDCnxSabana2012Encabezado"].Parameters["@EstimacionCorr"].Value = pMostrar[2];

                    report.Dictionary.DataSources["FDCnxSabana2012Tabla1"].Parameters["@AnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["FDCnxSabana2012Tabla1"].Parameters["@ProyectoCodigo"].Value = pMostrar[1].ToString();
                    report.Dictionary.DataSources["FDCnxSabana2012Tabla1"].Parameters["@EstimacionCorr"].Value = pMostrar[2];

                    report.Dictionary.DataSources["CnxSabana2012Tabla2"].Parameters["@AnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["CnxSabana2012Tabla2"].Parameters["@ProyectoCodigo"].Value = pMostrar[1].ToString();
                    report.Dictionary.DataSources["CnxSabana2012Tabla2"].Parameters["@EstimacionCorr"].Value = pMostrar[2];
                    break;

                case "3":
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));
                    report.Dictionary.DataSources["fdReporte"].Parameters["@pReporteID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["fdReporte"].Parameters["@pUsuarioCreo"].Value = pMostrar[1].ToString();

                    report.Dictionary.DataSources["fdFotosReporte"].Parameters["@pReporteID"].Value = pMostrar[0];

                    report.Dictionary.DataSources["prReportesAsociados"].Parameters["@idPadre"].Value = pMostrar[0];
                    report.Dictionary.DataSources["prReportesAsociadosFotos"].Parameters["@idPadre"].Value = pMostrar[0];

                    break;

                case "4":
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@AnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@ProyectoCodigo"].Value = pMostrar[1].ToString(); 
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@pTramoID"].Value = pMostrar[2];
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@pDanioID"].Value = pMostrar[3];
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@pIDReporteEstado"].Value = pMostrar[4];
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@pFechaDesde"].Value = pMostrar[5].ToString(); 
                    report.Dictionary.DataSources["fdListadoReporte"].Parameters["@pFechaHasta"].Value = pMostrar[6].ToString(); 
                    break;
                case "5":
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));
                    report.Dictionary.DataSources["prReporteSuspensionesAFinanciera"].Parameters["@pAnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["prReporteSuspensionesAFinanciera"].Parameters["@pProyectoCodigo"].Value = pMostrar[1].ToString();
                    report.Dictionary.DataSources["prReporteSuspensionesAFinanciera"].Parameters["@pEstimacionCorr"].Value = pMostrar[2];

                    report.Dictionary.DataSources["prReporteSuspensionesOC"].Parameters["@pAnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["prReporteSuspensionesOC"].Parameters["@pProyectoCodigo"].Value = pMostrar[1].ToString();

                    report.Dictionary.DataSources["prReporteSuspensionesOTS"].Parameters["@pAnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["prReporteSuspensionesOTS"].Parameters["@pProyectoCodigo"].Value = pMostrar[1].ToString();

                    report.Dictionary.DataSources["prReporteSuspensionesReactivaciones"].Parameters["@pAnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["prReporteSuspensionesReactivaciones"].Parameters["@pProyectoCodigo"].Value = pMostrar[1].ToString();
                    report.Dictionary.DataSources["prReporteSuspensionesReactivaciones"].Parameters["@pEstimacionCorr"].Value = pMostrar[2].ToString();

                    report.Dictionary.DataSources["prReporteSuspensionesPeriodosEstimaciones"].Parameters["@AnioID"].Value = pMostrar[0];
                    report.Dictionary.DataSources["prReporteSuspensionesPeriodosEstimaciones"].Parameters["@ProyectoCodigo"].Value = pMostrar[1].ToString();
                    report.Dictionary.DataSources["prReporteSuspensionesPeriodosEstimaciones"].Parameters["@EstimacionCorr"].Value = pMostrar[2].ToString();

                    break;
                case "6":
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));

                    report.Dictionary.DataSources["prObtenerDatosActaContratista"].Parameters["@AnioID"].Value = pMostrar[1];
                    report.Dictionary.DataSources["prObtenerDatosActaContratista"].Parameters["@ProyectoCodigo"].Value = pMostrar[2].ToString();
                    report.Dictionary.DataSources["prObtenerDatosActaContratista"].Parameters["@Codigo"].Value = pMostrar[0].ToString();

                    break;
                case "7":
                    report.Load(Server.MapPath("Reportes/" + pReporte[0]));

                    report.Dictionary.DataSources["prObtenerDatosActaContratista"].Parameters["@AnioID"].Value = pMostrar[1];
                    report.Dictionary.DataSources["prObtenerDatosActaContratista"].Parameters["@ProyectoCodigo"].Value = pMostrar[2].ToString();
                    report.Dictionary.DataSources["prObtenerDatosActaContratista"].Parameters["@Codigo"].Value = pMostrar[0].ToString();

                    break;
            }
            StiWebViewer1.Report = report;
        }


    }
}