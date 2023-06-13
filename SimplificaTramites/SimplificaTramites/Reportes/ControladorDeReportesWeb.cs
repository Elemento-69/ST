using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Microsoft.Reporting.WebForms;

namespace SimplificaTramites.Reportes
{
    public partial class ControladorDeReportesWeb
    {
        public static DataSet ds;
        /// <summary>
        /// Genera un reporte con datos de un dataset no tipeado a partir de un reporte
        /// realizado con el diseñador de reportes y un dataset tipeado
        /// </summary>
        /// <param name="visorDeReportes"></param>
        /// <param name="datos"></param>
        /// <param name="reporte"></param>
        /// <param name="Nombres_ReportSources"></param>
        /// <remarks></remarks>
        public static void GenerarReporte(ref ReportViewer visorDeReportes, ref DataSet datos, ref string reporte,  object[] Nombres_ReportSources)


        {

            // asignando el dataset que se envia a una variable de clase para el proceso de reportes
            ds = datos;
            // asignando el reporte al visor de reportes
            visorDeReportes.LocalReport.ReportPath = reporte;
            visorDeReportes.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(cargarDataSourcesDeSubReporte);
            visorDeReportes.LocalReport.EnableExternalImages = true;

            // colocando el nombres de los reportsources a las 
            // tablas del dataset no tipeado para posterior uso
            for (int elemento = 0, loopTo = Nombres_ReportSources.Length - 1; elemento <= loopTo; elemento++)
                ds.Tables[elemento].TableName = Nombres_ReportSources[elemento].ToString();

            // se asigna el nombre del reporte con Namespace.reporte.rdlc
            // por cada ReportSource dentro de los reportsources se realiza un
            // nuevo reportdatasource y se le asigna al visor de reportes
            foreach (object source in Nombres_ReportSources)
            {
                var rs = new ReportDataSource((string)source, ds.Tables[source.ToString()]);
                visorDeReportes.LocalReport.DataSources.Add(rs);
            }
            // agregando el delegado para el evento de subreportprocessing
        

        }

        public static void cargarDataSourcesDeSubReporte(object sender, SubreportProcessingEventArgs e)
        {
            foreach (string elem in e.DataSourceNames)
                e.DataSources.Add(new ReportDataSource(elem, ds.Tables[elem]));
        }
    }
}