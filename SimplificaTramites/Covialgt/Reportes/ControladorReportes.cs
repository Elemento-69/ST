using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using Microsoft.Reporting.WinForms;
using System.Configuration;

namespace Covialgt.Reportes
{
    public partial class ControladorReportes
    {
        public static void GenerarReporteWeb(Stimulsoft.Report.Web.StiWebViewer ReportViewer, string NombreCadenaConexionEnInforme, string Ruta, string ReporteNombre, object Parametros = null, object Valores = null, bool AllowDOCX = false, bool AllowXLS = false, bool AllowXLSX = false, bool AllowPDF = false, bool AllowHTML = false, bool AllowTXT = false, bool AllowXML = false,  bool ExportarDirectamentePDF = false)

    {

        // Deshabilitar del visor de reportes los formatos respectivos
        //ReportViewer.RenderMode = Stimulsoft.Report.Web.StiRenderMode.AjaxWithCache;
        //ReportViewer.ShowExportToBmp = false;
        ReportViewer.ShowExportToCsv = false;
        ReportViewer.ShowExportToDbf = false;
        ReportViewer.ShowExportToExcel = AllowXLS;
        ReportViewer.ShowExportToExcel2007 = AllowXLSX;
        ReportViewer.ShowExportToExcelXml = false;
        //ReportViewer.ShowExportToGif = false;
        ReportViewer.ShowExportToHtml = AllowHTML;
        //ReportViewer.ShowExportToJpeg = AllowJPG;
        //ReportViewer.ShowExportToMetafile = false;
        ReportViewer.ShowExportToMht = false;
        //ReportViewer.ShowExportToOds = false;
        //ReportViewer.ShowExportToOdt = false;
        //ReportViewer.ShowExportToPcx = false;
        ReportViewer.ShowExportToPdf = AllowPDF;
        //ReportViewer.ShowExportToPng = false;
        ReportViewer.ShowExportToPowerPoint = false;
        ReportViewer.ShowExportToRtf = false;
        ReportViewer.ShowExportToText = AllowTXT;
        //ReportViewer.ShowExportToTiff = AllowTIF;
        ReportViewer.ShowExportToWord2007 = AllowDOCX;
        ReportViewer.ShowExportToXml = AllowXML;
        ReportViewer.ShowExportToXps = false;
        


            // Verificar si es un reporte que necesita parametros
            if (Parametros is null | Valores is null)
        {
            var Informe = new Stimulsoft.Report.StiReport();
            Informe.Load(Ruta + ReporteNombre);
            Informe.Dictionary.Databases.Clear();
            Informe.Dictionary.Databases.Add(new Stimulsoft.Report.Dictionary.StiSqlDatabase(NombreCadenaConexionEnInforme, ConfigurationManager.ConnectionStrings["SICOPDATA"].ConnectionString));
            Informe.StopBeforePage = 600;
            Informe.Compile();

            // Asociar el visor de repotes al archivo mrt
            ReportViewer.Report = Informe;
            // Renderizar el reporte
            Informe.Render();
        }
        else
        
       // if (Parametros== Valores)
        {
            var Informe = new Stimulsoft.Report.StiReport();
            Informe.Load(Ruta + ReporteNombre);

            // Eliminar las cadenas de conexión que estan en "hardcode" en el xml del informe
            // para sustituirla por 
            Informe.Dictionary.Databases.Clear();
            Informe.Dictionary.Databases.Add(new Stimulsoft.Report.Dictionary.StiSqlDatabase(NombreCadenaConexionEnInforme, ConfigurationManager.ConnectionStrings["SICOPDATA"].ConnectionString));
            Informe.Compile();

            // Cuántos datasources tiene el informe
            int DataSources = Informe.CompiledReport.DataSources.Count;
            int DataSourceParameters;
            string ActualParamName = "";
            var ActualParamValue = new object();
            var list = (object[])Valores;
                for (int k = 0, loopTo = DataSources - 1; k <= loopTo; k++)
            {
                // Cuantos parámetros tiene el datasource
                DataSourceParameters = Informe.CompiledReport.DataSources[k].Parameters.Count;
                for (int j = 0, loopTo1 = DataSourceParameters - 1; j <= loopTo1; j++)
                {
                    // El nombre parametro j en el datasource k
                    ActualParamName = Informe.CompiledReport.DataSources[k].Parameters[j].Name;
                    // El valor del parametro j en el datasource k
                    ActualParamValue = list[j];
                    // Ásingar el valor al parametro del informe
                    Informe.CompiledReport.DataSources[k].Parameters[j].ParameterValue = list[j];
                    // Debug
                    //Response.Write(Informe.CompiledReport.DataSources(k).Parameters(ActualParamName).Name & " = " & Informe.CompiledReport.DataSources(k).Parameters(ActualParamName).GetParameterValue & " " & ActualParamValue.GetType.ToString & "<br/>")
                }
            }

            // Asociar el visor de repotes al archivo mrt
            ReportViewer.Report = Informe;
           // Renderizar el reporte
           Informe.Render();
            if (ExportarDirectamentePDF == true)
            {
                var PdfExport = new Stimulsoft.Report.Export.StiPdfExportService();
                PdfExport.Export(Informe, "doc.pdf");
            }
        }
    }

}
}