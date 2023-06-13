using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using Microsoft.Reporting.WebForms;
using SimplificaTramites.Reportes.Dataset;
using SimplificaTramites.Models;
using SimplificaTramites.Reportes;
using System.Configuration;
using System.Reflection;
using System.Collections;

namespace SimplificaTramites
{
    public partial class VisorInformes : System.Web.UI.Page
    {
        public string[] pIdReporte;
        public string[] pMostrar;
        private static DataSet Ds;
        private static object DataSources;
        private static ReportesInt ReporteSistema;
        private static System.Data.SqlClient.SqlConnection Conexion = new System.Data.SqlClient.SqlConnection();

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
            string Filtro = string.Empty;
            string ReporteNombre = string.Empty;
            DAL oAccesoDatos = new DAL();
            DAL accesoDatosModel = new DAL();
            int resultado = 0;
            Object[] ObjDatosRetorno = { resultado };
            //   DbTransaction Transaccion = null;
            if (!IsPostBack)
            {
                switch (pIdReporte[0])
                {

                    case "500":

                        Filtro = pMostrar[0] + "," + pMostrar[1] + "," + pMostrar[2];
                        var ImpresionAU = new ReportesInt(ReportesInt.Tipo.Estimaciones3, Filtro);
                        ReporteSistema = ImpresionAU;
                        OrigenDatos.SelectMethod = ImpresionAU.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", ImpresionAU.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", ImpresionAU.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = ImpresionAU.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(ImpresionAU.get_NombreOrigenDatos(1), "OrigenDatos"));

                        break;
                    case "511":

                        Filtro = pMostrar[0] + "," + pMostrar[1] + "," + pMostrar[2];
                        var ImpresionA = new ReportesInt(ReportesInt.Tipo.Estimaciones2, Filtro);
                        ReporteSistema = ImpresionA;
                        OrigenDatos.SelectMethod = ImpresionA.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", ImpresionA.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", ImpresionA.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = ImpresionA.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(ImpresionA.get_NombreOrigenDatos(1), "OrigenDatos"));

                        break;

                    case "1":

                        Filtro = pMostrar[0] + "," + pMostrar[1] + "," + pMostrar[2];
                        var Impresion = new ReportesInt(ReportesInt.Tipo.S_DatosAdministrativos, Filtro);
                        ReporteSistema = Impresion;
                        OrigenDatos.SelectMethod = Impresion.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", Impresion.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", Impresion.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = Impresion.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(Impresion.get_NombreOrigenDatos(1), "OrigenDatos"));

                        break;

                    case "14":

                        Filtro = pMostrar[0];
                        var ImpresionEst = new ReportesInt(ReportesInt.Tipo.s_ObtenerEstimacionesTramiteDetalle, Filtro);
                        ReporteSistema = ImpresionEst;
                        OrigenDatos.SelectMethod = ImpresionEst.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", ImpresionEst.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", ImpresionEst.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = ImpresionEst.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(ImpresionEst.get_NombreOrigenDatos(1), "OrigenDatos"));

                        break;
                    case "2":
                        if (Int32.Parse(pMostrar[0]) > 2012)
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("CW_CantidadesTotales2013", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        }
                        else
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("CW_CantidadesTotales", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        }
                        DataSources = new object[] { "dsCantidadesTotales_CantidadesTotales" };
                        ReporteNombre = Server.MapPath(@"Reportes\CantidadesTotales.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "3":

                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_S_DocumentosDeCambioMod", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsS_DocumentosDeCambio_ObtenerReporte_S_DocumentosDeCambio" };
                        ReporteNombre = Server.MapPath(@"Reportes\S_DocumentosDeCambio.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "4":

                        Ds = accesoDatosModel.GetFilterDataModel("CW_ObtenerReporteEjecucionReal", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsS_EjecucionReal_ObtenerReporte_S_EjecucionReal" };
                        ReporteNombre = Server.MapPath(@"Reportes\S_EjecucionRealNuevo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "5":

                        Filtro = pMostrar[0] + "," + pMostrar[1] + "," + pMostrar[2];
                        var ImpresionDoc = new ReportesInt(ReportesInt.Tipo.S_HojaDeMedicion, Filtro);
                        ReporteSistema = ImpresionDoc;
                        OrigenDatos.SelectMethod = ImpresionDoc.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", ImpresionDoc.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", ImpresionDoc.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = ImpresionDoc.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(ImpresionDoc.get_NombreOrigenDatos(1), "OrigenDatos"));

                        break;

                    case "6":

                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_S_EquipoMod", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsS_Equipo_ObtenerReporte_S_Equipo" };
                        ReporteNombre = Server.MapPath(@"Reportes\S_Equipo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "7":

                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_S_LLuviaMod", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsS_LLuvia_ObtenerReporte_S_LLuvia" };
                        ReporteNombre = Server.MapPath(@"Reportes\S_LLuvia.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "8":

                        Filtro = pMostrar[0] + "," + pMostrar[1] + "," + pMostrar[2] + "," + pMostrar[3];
                        var impresionAdmin = new ReportesInt(ReportesInt.Tipo.S_DatosAdministrativosPeriodo, Filtro);
                        ReporteSistema = impresionAdmin;
                        OrigenDatos.SelectMethod = impresionAdmin.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", impresionAdmin.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", impresionAdmin.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = impresionAdmin.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(impresionAdmin.get_NombreOrigenDatos(1), "OrigenDatos"));
                        break;

                    case "9":

                        Filtro = pMostrar[0] + "," + pMostrar[1] + "," + pMostrar[2] + "," + pMostrar[3];
                        var impresionHoja = new ReportesInt(ReportesInt.Tipo.S_HojaDeMedicionPeriodo, Filtro);
                        ReporteSistema = impresionHoja;
                        OrigenDatos.SelectMethod = impresionHoja.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", impresionHoja.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", impresionHoja.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = impresionHoja.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(impresionHoja.get_NombreOrigenDatos(1), "OrigenDatos"));


                        break;

                    case "1000":
                        Filtro = pMostrar[0] + "," + pMostrar[1];
                        var impresionAnexo = new ReportesInt(ReportesInt.Tipo.ge_AnexosOriginales, Filtro);
                        ReporteSistema = impresionAnexo;
                        OrigenDatos.SelectMethod = impresionAnexo.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", impresionAnexo.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", impresionAnexo.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = impresionAnexo.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(impresionAnexo.get_NombreOrigenDatos(1), "OrigenDatos"));
                        break;

                    case "10":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_S_CantidadesTotalesMod_NEW", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3]);
                        DataSources = new object[] { "dsS_CantidadesTotales_ObtenerReporte_S_CantidadesTotales" };
                        ReporteNombre = Server.MapPath(@"Reportes\S_CantidadesTotalesPeriodo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "11":
                        Ds = accesoDatosModel.GetFilterDataModel("Rep_prObtenerAnexo_CovialDesktop_Versiones", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsAnexos_Empresa", "dsAnexos_Tramos", "dsAnexos_Alcance", "dsAnexos_ProyectosSupervision", "dsAnexos_ComponentesRenglones", "dsAnexos_Proyectos" };
                        ReporteNombre = Server.MapPath(@"Reportes\AnexosJuridicoVersiones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "12"://reporte de tramos viales
                        Ds = accesoDatosModel.GetDataModel("prObtenerRutaTramoVista");
                        DataSources = new object[] { "dsRutasTramos_prObtenerRutaTramoVista" };
                        ReporteNombre = Server.MapPath(@"Reportes\RutasTramosViales.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "15":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerPlanesProgramas", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsProgramas_ObtenerPlanesProgramas" };
                        ReporteNombre = Server.MapPath(@"Reportes\Programas.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    ////Reportes de Nomina
                    case "16":
                        Ds = accesoDatosModel.GetFilterDataModel("CD_prObtenerReporteNomina", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsNomina_NominaDetalle", "dsNomina_NominaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes\Nomina.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "17":
                        Ds = accesoDatosModel.GetFilterDataModel("CD_CW_prObtenerNomina", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsCDCWInformeNomina_CDCWInformeNomina", "dsCDCWInformeNomina_CDCWInformeNominaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWInformeNominaFinanciero.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "18":
                        Ds = accesoDatosModel.GetFilterDataModel("CD_CW_prObtenerNominaEnvioBanco", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsCDCWInformeNominaEnvioBanco_CDCWInformeNominaEB", "dsCDCWInformeNominaEnvioBanco_CDCWInformeNominaResumenEB", "dsCDCWInformeNominaEnvioBanco_CDCWInformeNominaResumenEB2" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWInformeNominaEnvioBanco.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "22":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReparosparaReporteNEW", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]), Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "dsReparos_prObtenerReparosparaReporte" };
                        ReporteNombre = Server.MapPath(@"Reportes\Reparos.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "27":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerTrasladoEstimaParaReporte", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsTraslados_prObtenerTrasladoEstimaParaReporte" };
                        ReporteNombre = Server.MapPath(@"Reportes\TrasladoDocumentos.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "29":
                        Ds = accesoDatosModel.GetFilterDataModel("[prObtenertblEstimaciones3Filtro]", Int32.Parse(pMostrar[0]), pMostrar[1]);
                        DataSources = new object[] { "dsEstimacionEstado_prObtenertblEstimaciones3" };
                        ReporteNombre = Server.MapPath(@"Reportes\EstadoEstimaciones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "40":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerNominasRptMinisterio", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsObtenerNominasparaReporte_prObtenerNominasRptMinisterio" };
                        ReporteNombre = Server.MapPath(@"Reportes\NominasSumarioMin.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "41"://Reporte Ingreso y Egreso de Estimaciones
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prReporteIngresosEgresosEstimaciones", pMostrar[0], pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsReporteIngresosEgresosEstimaciones_ReporteIngresosEgresosEstimaciones" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteIngresosEgresosEstimaciones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "42"://Reporte Ingreso de Estimaciones
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prReporteIngresosEstimacionesDia", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "dsReporteIngresosEstimacionesDia_ReporteIngresosEstimacionesDia" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteIngresosEstimacionesDia.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "43"://Reporte Egreso de Estimaciones
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prReporteEgresosEstimacionesDia", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "dsReporteEgresosEstimacionesDia_ReporteEgresosEstimacionesDia" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteEgresosEstimacionesDia.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "44"://Reporte Ingreso y Egreso de Estimaciones
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prReporteIngresosEgresosEstimacionesMes", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "dsReporteIngresosEgresosEstimacionesMes_ReporteIngresosEgresosEstimacionesMes" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteIngresosEgresosEstimacionesMes.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "45"://Reporte Ingreso y Egreso de Estimaciones
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prReporteIngresosEgresosEstimacionesVisor", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "dsReporteIngresosEgresosEstimacionesVisor_ReporteIngresosEgresosEstimacionesVisor" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteIngresosEgresosEstimacionesVisor.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "46"://Reporte Ingreso y Egreso de Estimaciones
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prReporteGeneralEstimaciones", pMostrar[0]);
                        DataSources = new object[] { "dsReporteGeneralEstimaciones_ReporteGeneralEstimaciones" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteGeneralEstimaciones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "48":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\su_AvanceFisicoPorProyecto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "49": // Reporte fotografias administrativas
                       
                        var anio = pMostrar[0];
                        var proyectocodigo = pMostrar[1];
                        var Tramos = pMostrar[2];
                        var Estimaciones = pMostrar[3];
                        var Pagos = pMostrar[4];
                        var Sanciones = pMostrar[5];
                        var Ejecucion = pMostrar[6];
                        var Renglones = pMostrar[7];
                        var Documentos = pMostrar[8];
                        var Fotografias  = pMostrar[9];
                        var ids = pMostrar[10];
                        ids = ids.Replace("_", ",");

                        Ds = accesoDatosModel.GetFilterDataModel("prFichaTecnica3", anio, proyectocodigo, ids, Tramos, Estimaciones, Pagos, Sanciones, Ejecucion, Renglones, Documentos, Fotografias);
                        DataSources = new object[] { "dsFichaTecnica_AvanceFisicoFinanciero", "dsFichaTecnica_InfoGeneral", "dsFichaTecnica_supervisora", "dsFichaTecnica_Tramos", "dsFichaTecnica_GraficaFinanciera", "dsFichaTecnica_GraficaTecnica", "dsFichaTecnica_Estimaciones", "dsFichaTecnica_Pagos", "dsFichaTecnica_Sanciones", "dsFichaTecnica_Ejecucion", "dsFichaTecnica_Renglones", "dsFichaTecnica_DocCambios", "dsFichaTecnica_Fotografias", "dsFichaTecnica_visibilidad" };
                        ReporteNombre = Server.MapPath(@"Reportes\FichaTecnicaRegional.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "451":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\su_AvanceFinancieroPorTramo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "461":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\su_AvanceFinancieroPorProyecto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "471":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\su_AvanceFisicoPorTramo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "481":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\su_AvanceFisicoPorProyecto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "491":
                        Ds = accesoDatosModel.GetFilterDataModel("TrabajosEjecutados", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_Estacionamientos_TrabajosEjecutados" };
                        ReporteNombre = Server.MapPath(@"Reportes\su_Estacionamientos.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "50":
                        Ds = accesoDatosModel.GetFilterDataModel("prReporteObtenerProyectosSancionesXSancion", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsProyectosSanciones_prReporteObtenerProyectosSanciones" };
                        ReporteNombre = Server.MapPath(@"Reportes\ProyectosSanciones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "51":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_TramosViales", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "ge_TramosViales_ObtenerReporte_Ge_TramosViales" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_TramosViales.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "52":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_RutasViales", Int32.Parse(pMostrar[0]), pMostrar[1]);
                        DataSources = new object[] { "ge_RutasViales_ObtenerReporte_Ge_RutasViales" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_RutasViales.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "53":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_TramosPorProyecto", Int32.Parse(pMostrar[0]), pMostrar[1]);
                        DataSources = new object[] { "ge_TramosPorProyecto_ObtenerReporte_Ge_TramosPorProyecto" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_TramosPorProyecto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "54":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_Directorio", Int32.Parse(pMostrar[0]), pMostrar[1]);
                        DataSources = new object[] { "ge_DirectorioDeContratistas_ObtenerReporte_Ge_Directorio" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_DirectorioDeContratistas.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "55":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFisicoPorTramo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "56":
                        Ds = accesoDatosModel.GetFilterDataModel("CD_prObtenerReporteNomina", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsNomina_NominaDetalle", "dsNomina_NominaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes\NominaProyectosPorPagar.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "566":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFisicoPorTramoEstacion", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "ge_AvanceFisicoPorTramoEstacion_ObtenerReporte_Ge_AvanceFisicoPorTramoEstacion" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFisicoPorTramoEstacion.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "577":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFisicoPorTramoEstacion", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "ge_AvanceFisicoPorTramoEstacion_ObtenerReporte_Ge_AvanceFisicoPorTramoEstacion" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFisico.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "62": //Reporte de Consolidado de Nómina
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerDumentosCambioGeneral", Int32.Parse(pMostrar[0]),"B-001",false);
                        DataSources = new object[] { "dsReporteDCGeneral_ReporteDCGeneral" };
                        ReporteNombre = Server.MapPath(@"Reportes/ReporteDCGeneral.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "622":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFinancieroPorDeparmaneto", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "dsGE_ObtenerAvanceFinancieroXDepartamento_ObtenerReporte_Ge_AvanceFinancieroPorDeparmaneto" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFinancieroPorDepartamentoGeneral.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "67": //Reporte de Consolidado de Nómina
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prConsolidadoNominaResumen", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsConsolidadoNominaResumen_ConsolidadoNominaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes/ConsolidadoNominaResumen.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "68": //Reporte Detalle Consolidado de Nómina
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prConsolidadoNominaDetalle", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsConsolidadoNominaDetalle_ConsolidadoNominaDetalle" };
                        ReporteNombre = Server.MapPath(@"Reportes/ConsolidadoNominaDetalle.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;


                    case "57":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerEstimacionesTramiteDetalleActividad", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsResumenEstimacionesActividad_ResumenEstimacionesActividad" };
                        ReporteNombre = Server.MapPath(@"Reportes\ResumenEstimacionesActividad.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "58":
                        Ds = accesoDatosModel.GetFilterDataModel("Deuda_Ap", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]), Int32.Parse(pMostrar[4]), Int32.Parse(pMostrar[5]));
                        DataSources = new object[] { "DataSet1_DataTable1" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteDeudas.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "588":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFinancieroPorProyecto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "59":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_TramosPorProyectoDepto", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "ge_TramosPorProyectoDepto_ObtenerReporte_Ge_TramosPorProyectoDepto" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_TramosPorProyectoDepto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "60":
                        Ds = accesoDatosModel.GetFilterDataModel("AvanceProyectoTramo", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "su_AvanceFinancieroPorTramo_AvanceProyectoTramo" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFinancieroPorTramo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "61":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFinancieroPorProyecto", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], pMostrar[3], Int32.Parse(pMostrar[4]));
                        DataSources = new object[] { "ge_AvanceFinancieroPorProyectosGeneral_ObtenerReporte_Ge_AvanceFinancieroPorProyecto" };
                        ReporteNombre = Server.MapPath(@"Reportes\ge_AvanceFinancieroPorProyectosGeneral.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "611":
                        Ds = accesoDatosModel.GetFilterDataModel("Deuda_General");
                        DataSources = new object[] { "DataSet1_DataTable1" };
                        ReporteNombre = Server.MapPath(@"Reportes\DeudaGeneral.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "64":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReporteBitacoraEstimaciones", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "prObtenerReporteBitacoraEstimaciones_prObtenerReporteBitacoraEstimaciones" };
                        ReporteNombre = Server.MapPath(@"Reportes\prObtenerReporteBitacoraEstimaciones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "65":
                        Ds = accesoDatosModel.GetFilterDataModel("probtenerEstimacionesFechaRecepcion", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "probtenerEstimacionesFechaRecepcion_probtenerEstimacionesFechaRecepcion" };
                        ReporteNombre = Server.MapPath(@"Reportes\probtenerEstimacionesFechaRecepcion.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "66":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerProyectosCuentaCorriente", pMostrar[0]);
                        DataSources = new object[] { "prObtenerProyectosCuentaCorriente_prObtenerProyectosCuentaCorriente" };
                        ReporteNombre = Server.MapPath(@"Reportes\prObtenerProyectosCuentaCorriente.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "69":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerPagosEstadosEmpresa", pMostrar[0]);
                        DataSources = new object[] { "prObtenerPagosEstadosEmpresa_prObtenerPagosEstadosEmpresa" };
                        ReporteNombre = Server.MapPath(@"Reportes\prObtenerPagosEstadosEmpresa.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "70":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerPagosEstadosEmpresaResumen", pMostrar[0]);
                        DataSources = new object[] { "prObtenerPagosEstadosEmpresaResumen_prObtenerPagosEstadosEmpresaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes\prObtenerPagosEstadosEmpresaResumen.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "711":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerSancionesDetalle", pMostrar[0]);
                        DataSources = new object[] { "prObtenerSancionesDetalle_prObtenerSancionesDetalle" };
                        ReporteNombre = Server.MapPath(@"Reportes\prObtenerSancionesDetalle.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "71":
                        Ds = accesoDatosModel.GetFilterDataModel("CD_CW_prObtenerNomina", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                        DataSources = new object[] { "dsCDCWInformeNomina_CDCWInformeNomina", "dsCDCWInformeNomina_CDCWInformeNominaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWInformeNomina.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                    case "72":
                        Ds = accesoDatosModel.GetFilterDataModel("prReporteProyectosPorEmpresa", pMostrar[0]);
                        DataSources = new object[] { "dsReportesProyectosPorEmpresa_prReporteProyectosPorEmpresa" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReportesProyectosPorEmpresa.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "73":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesNoNominaDepartamentoInforme", pMostrar[0]);
                        DataSources = new object[] { "dsVistaGeneralEstimaciones_VistaGeneralEstimaciones" };
                        ReporteNombre = Server.MapPath(@"Reportes/VistaGeneralEstimacionesSinNomina.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "74":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenertblFotografiasXperiodoInformePDF", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "Fotografiaxperiodo_DataTable1" };
                        ReporteNombre = Server.MapPath(@"Reportes\Fotografiaxperiodo.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "76":
                        Ds = accesoDatosModel.GetFilterDataModel("Rep_prObtenerAnexo_CovialDesktop_Versiones", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2]);
                        DataSources = new object[] { "dsAnexos_Empresa", "dsAnexos_Tramos", "dsAnexos_Alcance", "dsAnexos_ProyectosSupervision", "dsAnexos_ComponentesRenglones", "dsAnexos_Proyectos" };
                        ReporteNombre = Server.MapPath(@"Reportes\AnexosJuridicoVersiones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "77":
                        Ds = accesoDatosModel.GetFilterDataModel("Rep_prObtenerAnexo_CovialDesktop_FechaActual", Int32.Parse(pMostrar[0]), pMostrar[1]);
                        DataSources = new object[] { "dsAnexos_Empresa", "dsAnexos_Tramos", "dsAnexos_Alcance", "dsAnexos_ProyectosSupervision", "dsAnexos_ComponentesRenglones", "dsAnexos_Proyectos" };
                        ReporteNombre = Server.MapPath(@"Reportes\AnexosJuridico.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "78":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prDeudaBancoV1", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsDeudaBanco_DeudaBanco" };
                        ReporteNombre = Server.MapPath(@"Reportes\DeudaBanco.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "79":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReporteDeudaGeneralModificado", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "Ds_DeudaGeneral" };
                        ReporteNombre = Server.MapPath(@"Reportes\InformeGeneralDeudaModificado.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "80":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReporteDeudaAgatha", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]));
                        DataSources = new object[] { "DsDeuda_Clausulas" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteDeudaClausulasEMA.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "82":
                        Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporteContratadoSaldoPresupuesto", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "DataSetInformePresupuesto_TablaConsulta" };
                        ReporteNombre = Server.MapPath(@"Reportes\RptContratadoSaldoPresupuesto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "84":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReporteDeudaAgatha", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]));
                        DataSources = new object[] { "DsDeuda_Clausulas" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteDeudaClausulasEMAS.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "85":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReporteDeudaAgatha", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]));
                        DataSources = new object[] { "DsDeuda_Clausulas" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteDeudaClausulasEMAyEMAS.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "86":
                        Ds = accesoDatosModel.GetFilterDataModel("prObtenerReporteDeudaGeneralModificado", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "Ds_DeudaGeneral" };
                        ReporteNombre = Server.MapPath(@"Reportes\InformeGeneralDeudaModificadoCIV.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "87": //Informe pendiente de pago visa
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamento", pMostrar[0],pMostrar[1]);
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes/CDCWPendientePagoNominaEstado.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "88": 
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamento", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes/CDCWPendientePagoNominaEstado.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "89":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamento", pMostrar[0], pMostrar[1]);
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes/CDCWPendientePagoNominaEstado.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "90"://Informe de Nómina Pendiente de Pago
                        Ds = accesoDatosModel.GetFilterDataModel("CD_CW_prObtenerNominaNoPagado", Int32.Parse(pMostrar[0]), pMostrar[1]);
                        DataSources = new object[] { "dsCDCWInformeNomina_CDCWInformeNomina", "dsCDCWInformeNomina_CDCWInformeNominaResumen" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWInformeNominaNoPagado.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "91"://Vista General de Estimaciones DETALLE
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamentoTotal", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWPendientePagoNominaEstadoTotal.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "92"://Vista General de Estimaciones No Nomina DETALLE
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamentoTotalNoNomina", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWPendientePagoNominaEstadoTotalNoNomina.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "93":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prDeudaBancoV1", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsDeudaBanco_DeudaBanco" };
                        ReporteNombre = Server.MapPath(@"Reportes\DeudaBanco2.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "94"://Reporte comparativo de estimaciones (No esta el archivo en la carpeta)
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerComparativoEstimaciones", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsReporteEstadoEstCuentaCorriente_ReporteEstadoEstCuentaCorriente" };
                        ReporteNombre = Server.MapPath(@"Reportes\CW_prObtenerComparativoEstimaciones.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "95"://Reporte comparativo de estimaciones (No esta el archivo en la carpeta)
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesDepartamentoInformeBK", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]));
                        DataSources = new object[] { "dsVistaGeneralEstimaciones_VistaGeneralEstimaciones" };
                        ReporteNombre = Server.MapPath(@"Reportes\VistaGeneralEstimacionesBK.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "96"://'Vista General de Estimaciones DETALLE BK
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamentoTotalBK", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), Int32.Parse(pMostrar[2]), Int32.Parse(pMostrar[3]));
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWPendientePagoNominaEstadoTotalBK.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "104":
                        Ds = accesoDatosModel.GetFilterDataModel("prDocumentosCambioGeneralResumen", Int32.Parse(pMostrar[0]), pMostrar[1],pMostrar[2]);
                        DataSources = new object[] { "dsReporteDocumentosCambio_ReporteDocumentosCambio" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteDocumentosCambio.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "105":
                        Ds = accesoDatosModel.GetFilterDataModel("prDocumentosCambioGeneralDetalle", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2]);
                        DataSources = new object[] { "dsReporteDocumentosCambio_ReporteDocumentosCambio" };
                        ReporteNombre = Server.MapPath(@"Reportes\ReporteDocumentosCambioDetalle.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "106":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prDeudaBancoAlDia");
                        DataSources = new object[] { "dsDeudaBanco_DeudaBanco" };
                        ReporteNombre = Server.MapPath(@"Reportes\DeudaBancoAlDia.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "108":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamentoTotal", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWPendientePagoNominaEstadoTotalCO.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "109":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesPendientePagoDepartamentoTotalNoNomina", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsPendientePagoNomina_PendientePagoNomina" };
                        ReporteNombre = Server.MapPath(@"Reportes\CDCWPendientePagoNominaEstadoTotalNoNominaCO.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "112":
                        Ds = accesoDatosModel.GetFilterDataModel("prInformeFacturas", Int32.Parse(pMostrar[0]), pMostrar[1], pMostrar[2], Int32.Parse(pMostrar[3]));
                        DataSources = new object[] { "dsInformeFacturas_InformeFacturas" };
                        ReporteNombre = Server.MapPath(@"Reportes\InformeFacturas.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "113":
                        Ds = accesoDatosModel.GetFilterDataModel("CW_prObtenerEstimacionesDepartamentoInforme", Int32.Parse(pMostrar[0]));
                        DataSources = new object[] { "dsVistaGeneralEstimaciones_VistaGeneralEstimaciones" };
                        ReporteNombre = Server.MapPath(@"Reportes\VistaGeneralEstimacionesDirector.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "114": // Informe de Nómina ENVÍO
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("CD_CW_prObtenerNominaCodigo", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]));
                            ReporteNombre = @"Reportes\CDCWInformeNominaCodigo.rdlc";
                            DataSources = new object[] { "dsCDCWInformeNomina_CDCWInformeNomina", "dsCDCWInformeNomina_CDCWInformeNominaResumen" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "1147": // Informe de REnglones
                        {
                            Ds = accesoDatosModel.GetDataModel("prObtenerSeccionesRenglones");
                            ReporteNombre = @"Reportes\Renglones.rdlc";
                            DataSources = new object[] { "dsRenglones_prObtenerSeccionesRenglones" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "1148": // Informe de capacidad economica
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("ObtenerEmpresasCapacidad_Reporte", pMostrar[0], pMostrar[1], pMostrar[2], pMostrar[3]);
                            ReporteNombre = @"Reportes\EmpresasCapacidad.rdlc";
                            DataSources = new object[] { "dsEmpresasCapacidad_ObtenerEmpresasCapacidad" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "117": // orte Saldos Negativos y Positivos - 30/10/2015'
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("CW_prSaldosPositivosNegativos");
                            ReporteNombre = @"Reportes\CWSaldosPositivosNegativos.rdlc";
                            DataSources = new object[] { "dsSaldosPositivosNegativos_SaldosPositivosNegativos" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "118": // informe Congreso
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("prInformeCongreso", Int32.Parse(pMostrar[0]), pMostrar[1]);
                            ReporteNombre = @"Reportes\InformeCongreso.rdlc";
                            DataSources = new object[] { "dsInformeCongreso_General", "dsInformeCongreso_EstPagadas", "dsInformeCongreso_EstPendientes", "dsInformeCongreso_Personal", "dsInformeCongreso_Fotos", "dsInformeCongreso_Junta" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "10003":
                        {

                            String Conexiont = ConfigurationManager.ConnectionStrings["SICOPDATA"].ConnectionString;
                            Conexion.ConnectionString = Conexiont;
                            Conexion.Open();
                            System.Data.SqlClient.SqlTransaction transaccion;
                            transaccion = Conexion.BeginTransaction();
                            var com = new System.Data.SqlClient.SqlCommand();
                            try
                            {
                                com.Connection = Conexion;
                                com.CommandTimeout = 0;
                                com.Transaction = transaccion;
                                com.CommandType = System.Data.CommandType.StoredProcedure;
                                com.CommandText = "ObtenerReporte_Ge_DeudaContraloria";
                                com.Parameters.Add("@anio1", System.Data.SqlDbType.Int).Value = Int32.Parse(pMostrar[0]);
                                com.Parameters.Add("@mes1", System.Data.SqlDbType.Int).Value = Int32.Parse(pMostrar[1]);
                                com.ExecuteNonQuery();
                            }
                            catch (Exception ex)
                            {
                                transaccion.Rollback();
                                Conexion.Close();
                            }

                            Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_DeudaContraloriaEjecucion");
                            ReporteNombre = @"Reportes\ReporteDeudaContraloria.rdlc";
                            DataSources = new object[] { "DataSet2_DataTable1" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "10004":
                        {

                            String Conexiont = ConfigurationManager.ConnectionStrings["SICOPDATA"].ConnectionString;
                            Conexion.ConnectionString = Conexiont;
                            Conexion.Open();
                            System.Data.SqlClient.SqlTransaction transaccion;
                            transaccion = Conexion.BeginTransaction();
                            var com = new System.Data.SqlClient.SqlCommand();
                            try
                            {
                                com.Connection = Conexion;
                                com.CommandTimeout = 0;
                                com.Transaction = transaccion;
                                com.CommandType = System.Data.CommandType.StoredProcedure;
                                com.CommandText = "ObtenerReporte_Ge_DeudaContraloria";
                                com.Parameters.Add("@anio1", System.Data.SqlDbType.Int).Value = Int32.Parse(pMostrar[0]);
                                com.Parameters.Add("@mes1", System.Data.SqlDbType.Int).Value = Int32.Parse(pMostrar[1]);
                                com.ExecuteNonQuery();
                            }
                            catch (Exception ex)
                            {
                                transaccion.Rollback();
                                Conexion.Close();
                            }

                            Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_DeudaContraloriaEjecucion");
                            ReporteNombre = @"Reportes\ReporteDeudaContraloria.rdlc";
                            DataSources = new object[] { "DataSet2_DataTable1" };
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "30":
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFinancieroPorDeparmanetoActual", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), pMostrar[2], pMostrar[3], pMostrar[4], 2);
                            //Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFinancieroPorDeparmanetoActualEjecucion");
                            DataSources = new object[] { "dsAvanceFinancieroDepto_AvanceFinancieroDepto" };
                            ReporteNombre = Server.MapPath(@"Reportes\AvanceFinancieroDeptoEmpresas1.rdlc");
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "31":
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("ObtenerReporte_Ge_AvanceFinancieroPorDeparmanetoActual", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), pMostrar[2], pMostrar[3], pMostrar[4], 2);
                            //Ds = accesoDatosModel.GetDataModel("ObtenerReporte_Ge_AvanceFinancieroPorDeparmanetoActualEjecucion");
                            DataSources = new object[] { "dsAvanceFinancieroDepto_AvanceFinancieroDepto" };
                            ReporteNombre = Server.MapPath(@"Reportes\AvanceFinancieroDepto1.rdlc");
                            ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                            break;
                        }
                    case "32":
                        // Gobernando con la Gente detalle - Seleccion de actividades
                        Ds = accesoDatosModel.GetFilterDataModel("DepartamentosProporcionTramosDetalleActual", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), 0, String.Join(",", pMostrar.Skip(2).Take(100).ToArray()));
                        DataSources = new object[] { "DeptoProporcionTramos_DeptoProporcionTramos", "DeptoProporcionTramos_Departamento" };
                        ReporteNombre = Server.MapPath(@"Reportes\DepartamentosProporcionTramosDetalle.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "33":
                        // Gobernando con la Gente resumen - Seleccion de actividades
                        Ds = accesoDatosModel.GetFilterDataModel("DepartamentosProporcionTramosResumenActual", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), 0, String.Join(",", pMostrar.Skip(2).Take(100).ToArray()));
                        DataSources = new object[] { "dsProyectosEjecucion_ProyectosEjecucion", "dsProyectosEjecucion_Departamento" };
                        ReporteNombre = Server.MapPath(@"Reportes\DepartamentosProporcionTramosResumen.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "34":
                        // Gobernando con la Gente detalle
                        Ds = accesoDatosModel.GetFilterDataModel("DepartamentosProporcionTramosDetalle", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), 0);
                        DataSources = new object[] { "DeptoProporcionTramos_DeptoProporcionTramos", "DeptoProporcionTramos_Departamento" };
                        ReporteNombre = Server.MapPath(@"Reportes\DepartamentosProporcionTramosDetalle.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "35":
                        // Gobernando Con la Gente Resumen
                        Ds = accesoDatosModel.GetFilterDataModel("DepartamentosProporcionTramosResumen", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), 0);
                        DataSources = new object[] { "dsProyectosEjecucion_ProyectosEjecucion", "dsProyectosEjecucion_Departamento" };
                        ReporteNombre = Server.MapPath(@"Reportes\DepartamentosProporcionTramosResumen.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "36":
                        // Proyectos por Departamento
                        Ds = accesoDatosModel.GetFilterDataModel("prAvanceGerencial", pMostrar[0], String.Join(",", pMostrar.Skip(2).Take(100).ToArray()), pMostrar[1]);
                        DataSources = new object[] { "dsReporteViceMinistro_reporteViceMinistro", "dsReporteViceMinistro_datosGenerales", "dsReporteViceMinistro_totales" };
                        ReporteNombre = Server.MapPath(@"Reportes\proyectosPorDepto.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "37":
                        // Proyectos por regional por Departamento
                        Filtro = String.Join(",", pMostrar);
                        var impresionHoja2 = new ReportesInt(ReportesInt.Tipo.prReporteProyectosPorRegional, Filtro);
                        ReporteSistema = impresionHoja2;
                        OrigenDatos.SelectMethod = impresionHoja2.MetodoObtener;
                        OrigenDatos.SelectParameters.Add("Filtro", impresionHoja2.Filtro);
                        OrigenDatos.SelectParameters.Add("Procedimiento", impresionHoja2.get_Procedimiento(1));
                        ReportViewer1.ProcessingMode = ProcessingMode.Local;
                        ReportViewer1.LocalReport.ReportPath = impresionHoja2.RutaFisica;
                        ReportViewer1.LocalReport.SubreportProcessing += new SubreportProcessingEventHandler(LocalReport_SubreportProcessing);
                        ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(impresionHoja2.get_NombreOrigenDatos(1), "OrigenDatos"));
                        break;
                    case "38":
                        // AvanceFinancieroXDepto
                        Ds = accesoDatosModel.GetFilterDataModel("pr_ObtenerAnexoDepartamentos", Int32.Parse(pMostrar[0]), pMostrar[1], Int32.Parse(pMostrar[2]));
                        DataSources = new object[] { "dsAnexosDepartamento_AnexosDepartamentoAlcances", "dsAnexosDepartamento_AnexosDepartamentoRenglones" };
                        ReporteNombre = Server.MapPath(@"Reportes\AnexosDepartamento.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;
                    case "39":
                        // Detalle de Proyectos por Actividad y Departamento
                        Ds = accesoDatosModel.GetFilterDataModel("prReporteDeProyectosPorRegional", Int32.Parse(pMostrar[0]), Int32.Parse(pMostrar[1]), pMostrar[2], pMostrar[3]);
                        DataSources = new object[] { "dsReporteProyDepartamentoRegional_proyPorDepartamento" };
                        ReporteNombre = Server.MapPath(@"Reportes\proyectosPorDeptoParaRegionales.rdlc");
                        ControladorDeReportesWeb.GenerarReporte(ref ReportViewer1, ref Ds, ref ReporteNombre, (object[])DataSources);
                        break;

                }
            }
        }

        void LocalReport_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            int ii = 0;
            int i = 0;
            var OD = new ObjectDataSource();
            string Prefijo;
            string status;
            string Filtro = string.Empty;
            ii = ReporteSistema.get_IndiceSR(e.ReportPath);

            // Crea el filtro del dataset, de acuerdo a los parámetros del Subreporte
            var loopTo = e.Parameters.Count - 1;
            for (i = 0; i <= loopTo; i++)
            {
                // Establece el Prefijo de acuerdo al Tipo de Dato
                if (e.Parameters[i].DataType == ParameterDataType.String)
                {
                    Prefijo = "'";
                }
                else
                {
                    Prefijo = string.Empty;
                }
                if (i != 0)
                {
                    status = " AND ";
                }
                else
                {
                    status = string.Empty;
                }

                Filtro += status + e.Parameters[i].Name + "=" + Prefijo + e.Parameters[i].Values[0] + Prefijo;
            }

            OD.TypeName = "Covialgt.Reportes.Reportes";
            OD.SelectMethod = "ObtenerDatos";
            OD.SelectParameters.Add("Filtro", Filtro);
            OD.SelectParameters.Add("Procedimiento", ReporteSistema.get_Procedimiento(ii));
            e.DataSources.Add(new ReportDataSource(ReporteSistema.get_NombreOrigenDatos(ii), OD));
        }
        public void fObtenerParametrosReporte()
        {
            if (Request.QueryString.Count != 0)
            {
                if (Request.QueryString["Parameters"] != null)
                {
                    pMostrar = Request.QueryString["Parameters"].ToString().Split(',');
                }
                pIdReporte = Request.QueryString["IdReporte"].ToString().Split(',');
                //  pReporte = Request.QueryString["Reporte"].ToString().Split(',');
            }
        }
        protected void ReportViewer1_PreRender(object sender, EventArgs e)
        {

            // Disable EXCEL format
            if (User.IsInRole("ADMINISTRADORES") | User.IsInRole("REPORTES EXCEL"))
            {
            }
            else
            {
                DisableFormat(this.ReportViewer1, "Excel");
            }
        }

        protected void DisableFormat(ReportViewer viewer, string formatName)
        {

            const System.Reflection.BindingFlags Flags = System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance;
            System.Reflection.FieldInfo m_previewService = viewer.LocalReport.GetType().GetField("m_previewService", Flags);

            System.Reflection.MethodInfo ListRenderingExtensions = m_previewService.FieldType.GetMethod("ListRenderingExtensions", Flags);
            Object previewServiceInstance = m_previewService.GetValue(viewer.LocalReport);

            IList extensions = (IList)ListRenderingExtensions.Invoke(previewServiceInstance, null); System.Reflection.PropertyInfo name = extensions[0].GetType().GetProperty("Name", Flags);
            //Object extension;



            foreach (Object extension in extensions)
            {

                if (String.Compare(name.GetValue(extension, null).ToString(), formatName, true) == 0)
                {

                    System.Reflection.FieldInfo m_isVisible = extension.GetType().GetField("m_isVisible", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
                    System.Reflection.FieldInfo m_isExposedExternally = extension.GetType().GetField("m_isExposedExternally", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);

                    m_isVisible.SetValue(extension, false);
                    m_isExposedExternally.SetValue(extension, false);

                    break;
                }

            }

        }
    }
}