using System;
using System.Web;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using SimplificaTramites.Reportes;
using System.Data;
using SimplificaTramites.Models;
using Stimulsoft.Report;

namespace SimplificaTramites
{
    public partial class VisorInformesSti : System.Web.UI.Page
    {
        public  String reporteID = "100";
        private static DataSet Ds;
        DAL accesoDatosModel = new DAL();
        protected void Page_Load(object sender, EventArgs e)
        {
            Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHm5Zr4btO5vSKPzBy9Tc7KKbmORmC/seaWkev6yq3zYqUEuhf" +
"KMiHA2mGkUihU+2IHS4Vq5raUNImt2BylHUkZWkr4wISbsZrVOR2M3pfLf9dH4fFAMko8D43b/OkAzqLPWOYULmgKl" +
"OSqttb10HFOFR7s3OuV6yVjwbgnM3sUKs3Qmn8SmInjAfXFDoSg6sLJ8GPpA/cb5cvvn5gAkPdApXH58SUH0X3czy/" +
"eL7ThdtL7s+pZapQUuLS28k8C6gjClr2tnQBUvay2imi4yPV0PFwK1zmIITft/+5lkBmsO0ZdHRiaIBNpZ6yfO/NY/" +
"KaeE6wiQAyay5nNZlNjpatlyp+jQFMkqfVzOVgdxBl6NK7kebSTu2nSWY9T0XKdmY4SUe89WD7rOTz+L+Dhcidhlsn" +
"qZrUFYKN10mhHxuJeCk/IDY0do3gF3yDsTeWHuUaULnffg3fbkRkzSldriHlKSG5SivrEGF0q1DGWl/8/hoqt0gMi8" +
"42TDBd2hLRmC8LjW11ghIqowwWXYfOYe8EB2";
            if (Page.IsPostBack == false)
            {
                // 'Si es administrador, se muestra el botón diseñar.
                // If User.IsInRole("ADMINISTRADORES"] Then
                // Me.btnDisenar.Visible = True
                // Else
                // Me.btnDisenar.Visible = False
                // End If
                // Se genera el reporte


                reporteID =Request.QueryString["ReporteID"].ToString();
                switch (reporteID)
                {
                    case "48":
                        {
                            // Esto hay que definir cuál es su función ya que es parte de lo desarrollado por Hermio García?
                            // Agregado 13/06/2018 por Jorge Ramos
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnsprFichaTecnica2", ConfigurationManager.AppSettings["rutaReportes"], "FichaTecnicaResumen.mrt", Parametros: new object[] { "@AnioID", "@proyectocodigo", "@Tramos", "@Estimaciones", "@Pagos", "@Sanciones", "@Ejecucion", "@Renglones", "@Documentos", "@Fotografias", "@ids" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["proyectocodigo"], Request.QueryString["tramos"], Request.QueryString["Estimaciones"], Request.QueryString["Pagos"], Request.QueryString["Sanciones"], Request.QueryString["Ejecucion"], Request.QueryString["Renglones"], Request.QueryString["Documentos"], Request.QueryString["Fotografias"], Request.QueryString["ids"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "90":
                        {
                            // Esto hay que definir cuál es su función ya que es parte de lo desarrollado por Hermio García?
                            // Agregado 13/06/2018 por Jorge Ramos
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionObtenerCDP", ConfigurationManager.AppSettings["rutaReportes"], "CDP.mrt", Parametros: new object[] { "@Anio", "@ProyectoCodigo", "@EmpresaNit" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EmpresaNit"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "95":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionRP", ConfigurationManager.AppSettings["rutaReportes"], "ReporteRespaldoPresupuestario.mrt", Parametros: new object[] { "@Anio", "@ProyectoCodigo", "@EmpresaNit", "@Idcertificacion" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EmpresaNit"], Request.QueryString["Idcertificacion"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "97":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionReparoTecnico", ConfigurationManager.AppSettings["rutaReportes"], "ReporteReparoEstimacionesTecnico.mrt", Parametros: new object[] { "@Emcabezado" }, Valores: new object[] { Request.QueryString["Emcabezado"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "96":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionRP", ConfigurationManager.AppSettings["rutaReportes"], "ReporteRespaldoPresupuestarioReporte.mrt", Parametros: new object[] { "@Anio", "@ProyectoCodigo", "@Idcertificacion" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["ProyectoCodigo"], Request.QueryString["Idcertificacion"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "98":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionReparoTecnicoSupervisor", ConfigurationManager.AppSettings["rutaReportes"], "ReporteReparoEstimacionesTecnicoSupervision.mrt", Parametros: new object[] { "@Encabezado", "@AnioID", "@ProyectoCodigo", "@Estimacion" }, Valores: new object[] { Request.QueryString["Encabezado"], Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "101":
                        {
                            // Este reporte genera el contrato de adjudicación
                            // Add Jorge Ramos 13/06/2018
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnsContratoOferente", ConfigurationManager.AppSettings["rutaReportes"], "ContratoOferentes.mrt", Parametros: new object[] { "@anioid", "@nit", "@proyecto", "@nocontrato" }, Valores: new object[] { Request.QueryString["anioid"], Request.QueryString["nit"], Request.QueryString["proyecto"], Request.QueryString["nocontrato"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "100":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "Cnsppagosupervisor", ConfigurationManager.AppSettings["rutaReportes"], "EstructuraDePago.mrt", Parametros: new object[] { "@AnioID", "@EstimacionCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["EstimacionCorr"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    // Esto se agregó JE
                    case "200":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ReporteEntregaExpedientesEscaneo", ConfigurationManager.AppSettings["rutaReportes"], "TrasladoExpediente.mrt", Parametros: new object[] { "@IdTraslado" }, Valores: new object[] { Request.QueryString["IdTraslado"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "201":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ReporteExpedientesEscaneo", ConfigurationManager.AppSettings["rutaReportes"], "TrasladoExpedienteEscaneoV1.mrt", Parametros: new object[] { "@Fecha", "@EstadoFrom", "@EstadoTo" }, Valores: new object[] { Request.QueryString["Fecha"], Request.QueryString["EstadoFrom"], Request.QueryString["EstadoTo"] }, AllowPDF: true, AllowXLSX: true);

                            break;
                        }

                    case "202":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ReporteEntregaExpedientesEscaneo", ConfigurationManager.AppSettings["rutaReportes"], "TrasladoExpedienteVisa.mrt", Parametros: new object[] { "@IdTraslado" }, Valores: new object[] { Request.QueryString["IdTraslado"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "203":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionEventoCotLic", ConfigurationManager.AppSettings["rutaReportes"], "EventoCotLic.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@ProgramaCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["ProgramaCodigo"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "204":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "ConexionEventoCotLic", ConfigurationManager.AppSettings["rutaReportes"], "EventoCotLicTotal.mrt", AllowPDF: true, AllowXLSX: true);
                            break;
                        }
                    // Esto se agregó JE

                    case "500":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "SICOP_RPT", ConfigurationManager.AppSettings["rutaReportes"], "AvancePorcProyectoRenglonTramo.mrt", Parametros: new object[] { "@Anio", "@ProyectoCodigo", "@FechaInicial", "@FechaFinal" }, Valores: new object[] { Request.QueryString["AnioProyecto"], Request.QueryString["ProyectoCodigo"], Request.QueryString["FechaInicial"], Request.QueryString["FechaFinal"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "600":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "SICOP_RPT", ConfigurationManager.AppSettings["rutaReportes"], "ResumenFinanciamientoProyectoRenglon.mrt", Parametros: new object[] { "@anioid", "@proyectocodigo" }, Valores: new object[] { Request.QueryString["AnioProyecto"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "700":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "SICOP_RPT", ConfigurationManager.AppSettings["rutaReportes"], "CuentaCorriente.mrt", Parametros: new object[] { "@anioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioProyecto"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);
                            
                            break;
                        }

                    case "800":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "SICOP_RPT", ConfigurationManager.AppSettings["rutaReportes"], "CuentaCorrienteBanco.mrt", Parametros: new object[] { "@anioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioProyecto"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);

                            break;
                        }

                    case "900":
                    {
                        ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "Sicop", ConfigurationManager.AppSettings["rutaReportes"], "CantidadesTramosContratista.mrt", Parametros: new object[] { "@AnioId", "@ProyectoCodigo", "@DocCambioCorrel" }, Valores: new object[] { Request.QueryString["AnioId"], Request.QueryString["ProyectoCodigo"], Request.QueryString["DocCambioCorrel"] }, AllowPDF: true, AllowXLSX: true);

                        break;
                    }

                    case "1000":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Conexión", ConfigurationManager.AppSettings["rutaReportes"], "InformeFotosBitacora.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1100":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxEstadoProyectos", ConfigurationManager.AppSettings["rutaReportes"], "INFORME_ESTADO_PROYECTOS_EST.mrt", AllowPDF: true, AllowXLSX: true);
                            break;
                        }

                    case "1600":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "inventario", ConfigurationManager.AppSettings["rutaReportes"], "InformeDrenaje.mrt", Parametros: new object[] { "@codigo_supervisor", "@AnioID" }, Valores: new object[] { Request.QueryString["codigoSupervisor"], Request.QueryString["AnioID"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    // Case 1700
                    // ControladorReportes.GenerarReporteWeb( Me.StiWebViewer1, "inventario", ConfigurationManager.AppSettings["rutaReportes"], _
                    // "InformeLimpieza.mrt", Parametros:=New Object() _
                    // {"@codigo_supervisor"}, _
                    // Valores:=New Object() _
                    // {Request.QueryString["codigoSupervisor"]}, AllowPDF:=True, AllowXLSX:=True)

                    case "1700":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "inventario", ConfigurationManager.AppSettings["rutaReportes"], "InformeLimpieza.mrt", Parametros: new object[] { "@id_proyecto", "@AnioID" }, Valores: new object[] { Request.QueryString["id_Proyecto"], Request.QueryString["AnioID"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1800":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxEmpresa", ConfigurationManager.AppSettings["rutaReportes"], "BitacoraEmpresas.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1900":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxEncargadoProyecto", ConfigurationManager.AppSettings["rutaReportes"], "BitacoraEncargadoProyecto.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2000":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxRegional", ConfigurationManager.AppSettings["rutaReportes"], "BitacoraRegional.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2100":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxSupervisores", ConfigurationManager.AppSettings["rutaReportes"], "BitacoraSupervisores.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2200":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnPrObtenerReporteEjecucionPresupuestarioFinanciero", ConfigurationManager.AppSettings["rutaReportes"], "ReporteFinanciero.mrt", Parametros: new object[] { "@Anio", "@Mes", "@Dia", "@AnioF" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["Mes"], Request.QueryString["Dia"], Request.QueryString["AnioF"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2400":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "inventario", ConfigurationManager.AppSettings["rutaReportes"], "InformeTumulos.mrt", Parametros: new object[] { "@codigo_supervisor", "@AnioID" }, Valores: new object[] { Request.QueryString["codigoSupervisor"], Request.QueryString["AnioID"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2300":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "inventario", ConfigurationManager.AppSettings["rutaReportes"], "InformeMarcaje.mrt", Parametros: new object[] { "@id_proyecto", "@AnioID" }, Valores: new object[] { Request.QueryString["id_Proyecto"], Request.QueryString["AnioID"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2500":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxprObtenerInventario", ConfigurationManager.AppSettings["rutaReportes"], "RptInventarioTumulos.mrt", Parametros: new object[] { "@id_proyecto", "@codigo_configuracion", "@id_evento", "@corr_visita", "@corr_registro" }, Valores: new object[] { Request.QueryString["id_proyecto"], Request.QueryString["codigo_configuracion"], Request.QueryString["id_evento"], Request.QueryString["corr_visita"], Request.QueryString["corr_registro"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2600":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxprObtenerInventarioTumulo", ConfigurationManager.AppSettings["rutaReportes"], "RptInventarioTumulosCompleto.mrt", Parametros: new object[] { "@id_proyecto", "@codigo_configuracion", "@Anio", "@Proyecto" }, Valores: new object[] { Request.QueryString["id_proyecto"], Request.QueryString["codigo_configuracion"], Request.QueryString["Anio"], Request.QueryString["Proyecto"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2700":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "SICOP_RPT", ConfigurationManager.AppSettings["rutaReportes"], "CuentaCorrienteContaduria.mrt", Parametros: new object[] { "@anioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioProyecto"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2800":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerRptFichaTumulos", ConfigurationManager.AppSettings["rutaReportes"], "RptFichaTumulos.mrt", Parametros: new object[] { "@id_proyecto", "@codigo_configuracion", "@User", "@FechaInicio", "@FechaFin" }, Valores: new object[] { Request.QueryString["id_proyecto"], Request.QueryString["codigo_configuracion"], Request.QueryString["User"], Request.QueryString["FechaInicio"], Request.QueryString["FechaFin"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "2900":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "PrObtenerRptFichaTumulosCompletos", ConfigurationManager.AppSettings["rutaReportes"], "RptTumulosCompletos.mrt", Parametros: new object[] { "@codigo_configuracion", "@User", "@UserInicio", "@UserFin" }, Valores: new object[] { Request.QueryString["codigo_configuracion"], Request.QueryString["User"], Request.QueryString["UserInicio"], Request.QueryString["UserFin"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3000":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerRptLimpieza", ConfigurationManager.AppSettings["rutaReportes"], "RptLimpieza.mrt", Parametros: new object[] { "@id_proyecto", "@sup", "@FechaInicio", "@FechaFin" }, Valores: new object[] { Request.QueryString["id_proyecto"], Request.QueryString["sup"], Request.QueryString["FechaInicio"], Request.QueryString["FechaFin"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3100":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtnerMarcajeProyecto", ConfigurationManager.AppSettings["rutaReportes"], "RptMarcaje.mrt", Parametros: new object[] { "@id_proyecto", "@FechaInicio", "@FechaFin" }, Valores: new object[] { Request.QueryString["id_proyecto"], Request.QueryString["FechaInicio"], Request.QueryString["FechaFin"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    // Informe Cartas
                    case "3200":
                        {
                            string Nom_Rpt = "";
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) == 1)
                            {
                                Nom_Rpt = "RptEstimaciones_2016_Est_1.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) != 1)
                            {
                                if (Request.QueryString["ProyectoCodigo"] == "T-052" || Request.QueryString["ProyectoCodigo"] == "T-003" || Request.QueryString["ProyectoCodigo"] == "T-011")
                                {
                                    Nom_Rpt = "RptEstimaciones_2015_Con_Cov_M.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RptEstimaciones_2016_Est_Menos_La_1_Con_Cov.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptEstimaciones_2016_Est_Menos_La_1_Con_Cov.mrt";
                                // Nom_Rpt = "RptEstimaciones_Con_Cov.mrt" comentado por JE
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptEstimaciones_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenertblEstimacionReporte", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@ProyectoSupervisionCodigo", "@NombreEmpresa", "@EsUnica" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["NombreEmpresa"], Request.QueryString["EsUnica"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "32001":
                        {
                            string Nom_Rpt;
                            Nom_Rpt = "RptEstimaciones_2016_Est_1_Acta_Admin.mrt";
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenertblEstimacionReporte", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@ProyectoSupervisionCodigo", "@NombreEmpresa", "@EsUnica" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["NombreEmpresa"], Request.QueryString["EsUnica"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3300":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerCartaEstimacion", ConfigurationManager.AppSettings["rutaReportes"], "RptPagoContratistaEmpresa.mrt", Parametros: new object[] { "@fecha", "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@DelegadoResidente", "@NombreP", "@Puesto" }, Valores: new object[] { Request.QueryString["fecha"], Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["DelegadoResidente"], Request.QueryString["NombreP"], Request.QueryString["Puesto"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3400":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "ConstanciaDeProyectos.mrt", Parametros: new object[] { "@AnioID", "@CodigoSupervisor", "@CodigoProyecto", "@EstimacionCorr", "@FechaCarta" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["CodigoSupervisor"], Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"], Request.QueryString["FechaCarta"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3500":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerCartaEstimacion", ConfigurationManager.AppSettings["rutaReportes"], "RptPagoContratistaNoEmpresa.mrt", Parametros: new object[] { "@fecha", "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@DelegadoResidente", "@NombreP", "@Puesto" }, Valores: new object[] { Request.QueryString["fecha"], Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["DelegadoResidente"], Request.QueryString["NombreP"], Request.QueryString["Puesto"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3600":
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("PrObtenerCodigoSupervisor", Request.QueryString["AnioID"], Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"]);
                            string CodigoSupervisor = Ds.Tables[0].Rows[0]["ProyectoSupervisionCodigo"].ToString();
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "ConstanciaDeProyectos.mrt", Parametros: new object[] { "@AnioID", "@CodigoSupervisor", "@CodigoProyecto", "@EstimacionCorr", "@FechaCarta", "@SubDirector", "@EsUnico" }, Valores: new object[] { Request.QueryString["AnioID"], CodigoSupervisor, Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"], Request.QueryString["FechaCarta"], Request.QueryString["SubDirector"], Request.QueryString["EsUnico"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3700":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CNspcontador", ConfigurationManager.AppSettings["rutaReportes"], "CertificaciondelContadorContratista.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@Fecha", "@Titulado", "@NoSAT" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["estimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Titulado"], Request.QueryString["NoSAT"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3800":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["CorrEsti"]) == 1)
                            {
                                Nom_Rpt = "RptInformeFinanciero_2016_Est_1.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["CorrEsti"]) != 1)
                            {
                                if (Request.QueryString["Proyecto"] == "T-052" || Request.QueryString["Proyecto"] == "T-003" || Request.QueryString["Proyecto"] == "T-011")
                                {
                                    Nom_Rpt = "RptEstimaciones_2016_Con_Cov_M.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RptInformeFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                // Nom_Rpt = "RptInformeFinanciero_Con_Cov.mrt"
                                Nom_Rpt = "RptInformeFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptInformeFinanciero_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerDtsInformeFinanciero", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@Proyecto", "@CorrEsti", "@CodigoSupervisor" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["CorrEsti"], Request.QueryString["CodigoSupervisor"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "38001":
                        {
                            string Nom_Rpt;
                            Nom_Rpt = "RptInformeFinanciero_Nuevo.mrt";
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerDtsInformeFinanciero", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@Proyecto", "@CorrEsti", "@CodigoSupervisor" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["CorrEsti"], Request.QueryString["CodigoSupervisor"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "3900":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 && Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            {
                                Nom_Rpt = "RptEstimacionesDepartamentos_2016_Est_1.mrt";
                            }

                            if (int.Parse(Request.QueryString["AnioID"]) == 2016 && Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            {
                                Nom_Rpt = "RptEstimacionesDepartamentos_2016_Est_Menos_La_1_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptEstimacionesDepartamentos_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptEstimacionesDepartamentos_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenertblEstimacionReporte", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@ProyectoSupervisionCodigo", "@NombreEmpresa", "@EsUnica" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["NombreEmpresa"], Request.QueryString["EsUnica"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4000":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 && Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamento_2016_Est_1.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 && Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamento_2016_Est_Menos_La_1_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamento_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamento_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerDtsInformeFinanciero", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@Proyecto", "@CorrEsti", "@CodigoSupervisor" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["CorrEsti"], Request.QueryString["CodigoSupervisor"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }


                    case "4100":
                        {
                            // Componer este con los condicionantes

                            var Nom_Rpt = default(string);
                          

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["CorrEsti"]) != 1)
                            {
                                if (Request.QueryString["Proyecto"] == "T-052" | Request.QueryString["Proyecto"] == "T-003" | Request.QueryString["Proyecto"] == "T-011")
                                {
                                    Nom_Rpt = "RptInformeFinancieroEmpresa_2016_Con_Cov_M.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RptInformeFinancieroEmpresa.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["CorrEsti"]) == 1)
                            {
                                Nom_Rpt = "RptInformeFinancieroEmpresa_2016_Sin_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptInformeFinancieroEmpresa.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptInformeFinancieroEmpresa_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerDtsInformeFinanciero", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@Proyecto", "@CorrEsti", "@CodigoSupervisor", "@DelegadoResidente", "@EmpresaNombre" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["CorrEsti"], Request.QueryString["CodigoSupervisor"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaNombre"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "41001":
                        {
                            // Componer este con los condicionantes

                            string Nom_Rpt;
                            Nom_Rpt = "RptInformeFinancieroEmpresa_Acta.mrt";
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerDtsInformeFinanciero", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@Proyecto", "@CorrEsti", "@CodigoSupervisor", "@DelegadoResidente", "@EmpresaNombre" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["CorrEsti"], Request.QueryString["CodigoSupervisor"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaNombre"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4200":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamentoEmpresa_2016_Est_1.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamentoEmpresa_2016_Est_Menos_La_1_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamentoEmpresa_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptInformeFinancieroDepartamentoEmpresa_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerDtsInformeFinanciero", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@Proyecto", "@CorrEsti", "@CodigoSupervisor", "@DelegadoResidente", "@EmpresaNombre" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["CorrEsti"], Request.QueryString["CodigoSupervisor"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaNombre"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4300":
                        {
                            Ds = accesoDatosModel.GetFilterDataModel("PrObtenerCodigoSupervisor", Request.QueryString["AnioID"], Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"]);
                            string CodigoSupervisor = Ds.Tables[0].Rows[0]["ProyectoSupervisionCodigo"].ToString();
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "ConstanciaDeProyectosEmpresas.mrt", Parametros: new object[] { "@AnioID", "@CodigoSupervisor", "@CodigoProyecto", "@EstimacionCorr", "@FechaCarta", "@SubDirector", "@NombreEmpresa", "@EsUnico" }, Valores: new object[] { Request.QueryString["AnioID"], CodigoSupervisor, Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"], Request.QueryString["FechaCarta"], Request.QueryString["SubDirector"], Request.QueryString["NombreEmpresa"], Request.QueryString["EsUnico"] }, AllowPDF: true, AllowXLSX: true);
                            break;
                        }

                    case "4400":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObteneRptAlcantarias", ConfigurationManager.AppSettings["rutaReportes"], "RptAlcantarias.mrt", Parametros: new object[] { "@Codigo_configuracion", "@Anio", "@id_proyecto", "@usuario_creo", "@FechaInicio", "@FechaFin" }, Valores: new object[] { Request.QueryString["Codigo_configuracion"], Request.QueryString["Anio"], Request.QueryString["id_proyecto"], Request.QueryString["usuario_creo"], Request.QueryString["FechaInicio"], Request.QueryString["FechaFin"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4500":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "SicopSup", ConfigurationManager.AppSettings["rutaReportes"], "CertificaciondelContadorSupervisor.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Titulado", "@NoSAT", "@Visible", "@Fecha", "@ReciboIGSS", "@ckeckdelegado", "@nombredelegado" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Titulado"], Request.QueryString["NoSAT"], Request.QueryString["Visible"], Request.QueryString["Fecha"], Request.QueryString["ReciboIGSS"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4600":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "Cnsppagosupervisor", ConfigurationManager.AppSettings["rutaReportes"], "RecomendacionPagoSupervisorFinanciero.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Director", "@Fecha", "@Clausula", "@Numeral", "@CheckIGSS", "@NumeroPatronalIGSS", "@Clase", "@NoClase", "@Afianzadora", "@SupervisorClausula", "@ckeckdelegado", "@nombredelegado" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Director"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["CheckIGSS"], Request.QueryString["NumeroPatronalIGSS"], Request.QueryString["Clase"], Request.QueryString["NoClase"], Request.QueryString["Afianzadora"], Request.QueryString["SupervisorClausula"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4700":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], "RecomendacionContratistaFinanciero.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Director", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@NoClase", "@Afianzadora", "@SupervisorClausula", "@ckeckdelegado", "@nombredelegado" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Director"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["NoClase"], Request.QueryString["Afianzadora"], Request.QueryString["SupervisorClausula"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4800":
                        {
                            var Nom_Rpt = default(string);
                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            //{
                            //    Nom_Rpt = "RptControlAvanceFinancieroEmpresa_2016_Est_1.mrt";
                            //}
                            //// If Request.QueryString["AnioID"] = 2016 And Session("No_Estimacion_Crea_Paolo"] <> 1 Then
                            //// Nom_Rpt = "RptControlAvanceFinancieroEmpresa_2016_Est_Menos_La_1_Con_Cov.mrt"
                            //// End If

                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            //{
                            //    if (Request.QueryString["ProyectoCodigo"] == "T-052" | Request.QueryString["ProyectoCodigo"] == "T-003" | Request.QueryString["ProyectoCodigo"] == "T-011")
                            //    {
                            //        Nom_Rpt = "RptControlAvanceFinancieroEmpresa_2016_Con_Cov_M.mrt";
                            //    }
                            //    else
                            //    {
                            //        Nom_Rpt = "RptControlAvanceFinancieroEmpresa_2016_Est_Menos_La_1_Con_Cov.mrt";
                            //    }
                            //}

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptControlAvanceFinancieroEmpresa_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptControlAvanceFinancieroEmpresa_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaNombre", "@EmpresaContratista", "@FechaDesde", "@FechaHasta" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaNombre"], Request.QueryString["EmpresaContratista"], Request.QueryString["FechaDesde"], Request.QueryString["FechaHasta"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "4900":
                        {
                            var Nom_Rpt = default(string);
                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            //{
                            //    Nom_Rpt = "RptControlAvanceFinanciero_2016_Est_1.mrt";
                            //}
                            //// If Request.QueryString["AnioID"] = 2016 And Session("No_Estimacion_Crea_Paolo"] <> 1 Then
                            //// Nom_Rpt = "RptControlAvanceFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt"
                            //// End If

                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            //{
                            //    if (Request.QueryString["ProyectoCodigo"] == "T-052" | Request.QueryString["ProyectoCodigo"] == "T-003" | Request.QueryString["ProyectoCodigo"] == "T-011")
                            //    {
                            //        Nom_Rpt = "RptControlAvanceFinanciero_2016_Con_Cov_M.mrt";
                            //    }
                            //    else
                            //    {
                            //        Nom_Rpt = "RptControlAvanceFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt";
                            //    }
                            //}

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptControlAvanceFinanciero_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptControlAvanceFinanciero_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaContratista", "@FechaDesde", "@FechaHasta" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaContratista"], Request.QueryString["FechaDesde"], Request.QueryString["FechaHasta"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "5000":
                        {
                            var Nom_Rpt = default(string);
                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            //{
                            //    Nom_Rpt = "RptControlFinanciero_2016_Est_1.mrt";
                            //}
                            //// If Request.QueryString["AnioID"] = 2016 And Session("No_Estimacion_Crea_Paolo"] <> 1 Then
                            //// Nom_Rpt = "RptControlFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt"
                            //// End If
                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            //{
                            //    if (Request.QueryString["ProyectoCodigo"] == "T-052" | Request.QueryString["ProyectoCodigo"] == "T-003" | Request.QueryString["ProyectoCodigo"] == "T-011")
                            //    {
                            //        Nom_Rpt = "RptControlFinanciero_2016_Con_Cov_M.mrt";
                            //    }
                            //    else
                            //    {
                            //        Nom_Rpt = "RptControlFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt";
                            //    }
                            //}

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptControlFinanciero_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptControlFinanciero_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaContratista", "@FechaDesde", "@FechaHasta" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaContratista"], Request.QueryString["FechaDesde"], Request.QueryString["FechaHasta"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "5100":
                        {
                            var Nom_Rpt = default(string);
                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) == 1)
                            //{
                            //    Nom_Rpt = "RptControlFinancieroEmpresa_2016_Est_1.mrt";
                            //}
                            //// If Request.QueryString["AnioID"] = 2016 And Session("No_Estimacion_Crea_Paolo"] <> 1 Then
                            //// Nom_Rpt = "RptControlFinancieroEmpresa_2016_Est_Menos_La_1_Con_Cov.mrt"
                            //// End If

                            //if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse((string)Session["No_Estimacion_Crea_Paolo"]) != 1)
                            //{
                            //    if (Request.QueryString["ProyectoCodigo"] == "T-052" | Request.QueryString["ProyectoCodigo"] == "T-003" | Request.QueryString["ProyectoCodigo"] == "T-011")
                            //    {
                            //        Nom_Rpt = "RptControlFinancieroEmpresa_2016_Con_Cov_M.mrt";
                            //    }
                            //    else
                            //    {
                            //        Nom_Rpt = "RptControlFinancieroEmpresa_2016_Est_Menos_La_1_Con_Cov.mrt";
                            //    }
                            //}

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RptControlFinancieroEmpresa_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RptControlFinancieroEmpresa_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaNombre", "@EmpresaContratista", "@FechaDesde", "@FechaHasta" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaNombre"], Request.QueryString["EmpresaContratista"], Request.QueryString["FechaDesde"], Request.QueryString["FechaHasta"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "5200":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) == 1)
                            {
                                // Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_2016_Est_1.mrt"
                                if (Int32.Parse(Request.QueryString["NoPeriodos"]) > 1)
                                {
                                    Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Acta_periodos.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Acta.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) != 1)
                            {
                                if (Int32.Parse(Request.QueryString["NoPeriodos"]) > 1)
                                {
                                    Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Acta_periodos.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Acta.mrt";
                                }
                                // Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_2016_Est_Menos_La_1_Con_Cov.mrt"
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                if (Int32.Parse(Request.QueryString["NoPeriodos"]) > 1)
                                {
                                    Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Acta_periodos.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Con_Cov.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "Cnsppagosupervisor", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@nombresupervisor", "@empresasupervisora", "@poliza", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "52001":
                        {
                            string Nom_Rpt;
                            Nom_Rpt = "RecomendacionPagoSupervisorFinanciero_Acta.mrt";
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "Cnsppagosupervisor", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@nombresupervisor", "@empresasupervisora", "@poliza", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "5300":
                        {
                            string Nom_Rpt="";
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) == 1)
                            {
                                Nom_Rpt = "RecomendacionPagoProyectoMensual_2016_Est_1.mrt";
                            }
                            // If Request.QueryString("AnioID") = 2016 And Request.QueryString("EstimacionCorr") <> 1 Then
                            // Nom_Rpt = "RecomendacionPagoProyectoMensual_2016_Est_Menos_La_1_Con_Cov.mrt"
                            // End If
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) != 1)
                            {
                                if (Request.QueryString["ProyectoSupervisionCodigo"] == "T-052" || Request.QueryString["ProyectoSupervisionCodigo"] == "T-003" || Request.QueryString["ProyectoSupervisionCodigo"] == "T-011")
                                {
                                    Nom_Rpt = "RecomendacionPagoProyectoMensual_2016_Con_Cov_M.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RecomendacionPagoProyectoMensual_2016_Est_Menos_La_1_Con_Cov.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RecomendacionPagoProyectoMensual_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RecomendacionPagoProyectoMensual_2015_Ep.mrt";
                            }


                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagosupervisor", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@IndiceAvance", "@Razones", "@nombresupervisor", "@empresasupervisora", "@poliza", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["IndiceAvance"], Request.QueryString["Razones"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    case "5400":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) == 1)
                            {
                                Nom_Rpt = "RecomendacionPagoSupervisorDesglosados_2016_Est_1.mrt";
                                // Nom_Rpt = "RecomendacionPagoSupervisorDesglosados_2016_Est_Menos_La_1_Con_Cov.mrt"
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) != 1)
                            {
                                Nom_Rpt = "RecomendacionPagoSupervisorDesglosados_2016_Est_Menos_La_1_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RecomendacionPagoSupervisorDesglosados_Con_Cov.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RecomendacionPagoSupervisorDesglosados_2015_Ep.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@nombresupervisor", "@empresasupervisora", "@poliza" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    case "54001":
                        {
                            var Nom_Rpt = default(string);
                            Nom_Rpt = "RecomendacionPagoSupervisorDesglosados_Acta.mrt";
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@nombresupervisor", "@empresasupervisora", "@poliza" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"],  Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"] }, AllowPDF: true, AllowXLSX: true);

                            break;
                        }
                    case "5500":
                        {
                            string Nom_Rpt = string.Empty;
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) == 1)
                            {
                                Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2016_Est_1.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016 & Int32.Parse(Request.QueryString["EstimacionCorr"]) != 1)
                            {
                                if (Int32.Parse(Request.QueryString["NoPeriodos"]) > 1)
                                {
                                    Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2016_Est_Menos_La_1_Con_Cov_periodos.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2016_Est_Menos_La_1_Con_Cov.mrt";
                                }
                                // Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2016_Est_Menos_La_1_Con_Cov.mrt"
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                //int vPeriodos = 3;
                                //vPeriodos = 3;
                                //if (vPeriodos > 1)
                                if (Int32.Parse(Request.QueryString["NoPeriodos"]) > 1)
                                {
                                    Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2016_Est_Menos_La_1_Con_Cov_periodos.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2016_Est_Menos_La_1_Con_Cov.mrt";
                                }
                                // Nom_Rpt = "RecomendacionPagoProyectoDesglosados_Con_Cov.mrt"
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RecomendacionPagoProyectoDesglosados_2015_Ep.mrt";
                            }
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@IndiceAvance", "@Razones","@nombresupervisor", "@empresasupervisora", "@poliza" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["IndiceAvance"], Request.QueryString["Razones"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"] }, AllowPDF: true, AllowXLSX: true);

                            break;
                        }

                    case "5600":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxprSancionesxIntervalo", ConfigurationManager.AppSettings["rutaReportes"], "RptSanciones-Anio.mrt", Parametros: new object[] { "@AnioID", "@FechaInicio", "@FechaFin" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["FechaInicio"], Request.QueryString["FechaFin"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "5700":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxSabana2012", ConfigurationManager.AppSettings["rutaReportes"], "RptSabana2012.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    case "5702":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxSabana2012", ConfigurationManager.AppSettings["rutaReportes"], "RptSabana2012conSuspensiones.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    case "57001":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnxSabana2012", ConfigurationManager.AppSettings["rutaReportes"], "RptSabana2012.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    case "6200":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxprObtenerInventario", ConfigurationManager.AppSettings["rutaReportes"], "RptInventarioDrenajes.mrt", Parametros: new object[] { "@id_proyecto", "@codigo_configuracion", "@id_evento", "@corr_visita", "@corr_registro" }, Valores: new object[] { Request.QueryString["id_proyecto"], Request.QueryString["codigo_configuracion"], Request.QueryString["id_evento"], Request.QueryString["corr_visita"], Request.QueryString["corr_registro"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "6300":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagosupervisor", ConfigurationManager.AppSettings["rutaReportes"], "RecomendacionPagoProyectoMensualC1.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@IndiceAvance", "@Razones", "@nombresupervisor", "@empresasupervisora", "@poliza", "@EstimacionU" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["IndiceAvance"], Request.QueryString["Razones"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"], Request.QueryString["EstimacionU"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "63001":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], "RecomendacionPagoProyectoDesglosados_2016_Est_Menos_La_1_Con_Cov_periodos.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@IndiceAvance", "@Razones", "@nombresupervisor", "@empresasupervisora", "@poliza" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["IndiceAvance"], Request.QueryString["Razones"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "6400":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "ConstanciaDeProyectosC1.mrt", Parametros: new object[] { "@AnioID", "@CodigoSupervisor", "@CodigoProyecto", "@EstimacionCorr", "@FechaCarta", "@SubDirector" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["CodigoSupervisor"], Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"], Request.QueryString["FechaCarta"], Request.QueryString["SubDirector"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "64001":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "ConstanciaDeProyectosC2.mrt", Parametros: new object[] { "@AnioID", "@CodigoSupervisor", "@CodigoProyecto", "@EstimacionCorr", "@FechaCarta", "@SubDirector" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["CodigoSupervisor"], Request.QueryString["CodigoProyecto"], Request.QueryString["EstimacionCorr"], Request.QueryString["FechaCarta"], Request.QueryString["SubDirector"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "6500":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], "RptControlFinancieroC1.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaContratista" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaContratista"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "65001":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], "RptControlFinancieroC2.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaContratista" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaContratista"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "6600":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], "RptControlAvanceFinancieroC1.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaContratista" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaContratista"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "66001":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerRptControlFinancieroObra", ConfigurationManager.AppSettings["rutaReportes"], "RptControlAvanceFinancieroC2.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorrel", "@DelegadoResidente", "@EmpresaContratista" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["DelegadoResidente"], Request.QueryString["EmpresaContratista"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "6800":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncomentario", ConfigurationManager.AppSettings["rutaReportes"], "RptComentariosGeneral.mrt", Parametros: new object[] { "@Usuario", "@ProyectoCodigo", "@Fechadesde", "@fechahasta", "@Rol" }, Valores: new object[] { Request.QueryString["Usuario"], Request.QueryString["ProyectoCodigo"], Request.QueryString["FechaDesde"], Request.QueryString["FechaHasta"], Request.QueryString["Rol"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "6900":
                    {
                        ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "connection", ConfigurationManager.AppSettings["rutaReportes"], "rptProgramacionFisica2022.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr", "@PeriodoCorrImpresion", "@pFechaFiltro", "@pProgramaVersionID" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorr"], Request.QueryString["PeriodoCorrImpresion"], Request.QueryString["pFechaFiltro"], Request.QueryString["pProgramaVersionID"] }, AllowPDF: true); //

                            break;
                    }

                    case "7000":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "CnDeclaracionJurada", ConfigurationManager.AppSettings["rutaReportes"], "DeclaracionJurada.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr", "@DeclaracionJuradaCorrel", "@Empresa", "@Delegado", "@NombreEmpresa" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["DeclaracionJuradaCorrel"], Request.QueryString["Empresa"], Request.QueryString["Delegado"], Request.QueryString["NombreEmpresa"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7100":
                        {
                            ControladorReportes.GenerarReporteWeb( this.StiWebViewer1, "cntrabajosxadmon", ConfigurationManager.AppSettings["rutaReportes"], "TrabajosXAdmon.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@TrabajoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["TrabajoCorr"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7200":
                        {
                            var Nom_Rpt = default(string);
                            if (Int32.Parse(Request.QueryString["AnioID"]) == 2016)
                            {
                                if (Request.QueryString["ProyectoCodigo"] == "T-052" | Request.QueryString["ProyectoCodigo"] == "T-003" | Request.QueryString["ProyectoCodigo"] == "T-011")
                                {
                                    Nom_Rpt = "RrptDocumentosCambio_2016_Con_Cov_M.mrt";
                                }
                                else
                                {
                                    Nom_Rpt = "RrptDocumentosCambio_2016_Est_Menos_La_1_Con_Cov.mrt";
                                }
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) < 2016)
                            {
                                Nom_Rpt = "RrptDocumentosCambio.mrt";
                            }

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2016)
                            {
                                Nom_Rpt = "RrptDocumentosCambio.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxDocOrdenCambio", ConfigurationManager.AppSettings["rutaReportes"], Nom_Rpt, Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@DocCambioCorrel" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["DocCambioCorrel"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    // Case 72001
                    // ControladorReportes.GenerarReporteWeb( Me.StiWebViewer1, "CnxDocOrdenCambio", ConfigurationManager.AppSettings["rutaReportes"], _
                    // "RrptDocumentosCambio_Limpieza2015.mrt", Parametros:=New Object() _
                    // {"@AnioID", "@ProyectoCodigo", "@DocCambioCorrel"}, _
                    // Valores:=New Object() _
                    // {Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["DocCambioCorrel"]}, AllowPDF:=True, AllowXLSX:=True)

                    case "72001":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxDocOrdenCambio", ConfigurationManager.AppSettings["rutaReportes"], "RrptDocumentosCambio.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@DocCambioCorrel" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["DocCambioCorrel"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7300":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxDocOrdenCambio", ConfigurationManager.AppSettings["rutaReportes"], "RrptDocumentosCambio2.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@DocCambioCorrel" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["DocCambioCorrel"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7500":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncomentario", ConfigurationManager.AppSettings["rutaReportes"], "RptComentariosGeneralSupervisor.mrt", Parametros: new object[] { "@Usuario", "@Rol" }, Valores: new object[] { Request.QueryString["Usuario"], Request.QueryString["Rol"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7600":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncomentario", ConfigurationManager.AppSettings["rutaReportes"], "RptComentariosGeneralDirectores.mrt", Parametros: new object[] { "@Usuario", "@AnioID", "@Proyecto", "@Rol" }, Valores: new object[] { Request.QueryString["Usuario"], Request.QueryString["AnioID"], Request.QueryString["Proyecto"], Request.QueryString["Rol"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7700":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncomentario", ConfigurationManager.AppSettings["rutaReportes"], "RptTodosProyectosFecha.mrt", Parametros: new object[] { "@Usuario", "@Fechadesde", "@fechahasta", "@Rol" }, Valores: new object[] { Request.QueryString["Usuario"], Request.QueryString["FechaDesde"], Request.QueryString["FechaHasta"], Request.QueryString["Rol"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "7800":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnfideicomiso", ConfigurationManager.AppSettings["rutaReportes"], "RptFideicomiso.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@CertCorrel" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["CertCorrel"] }, AllowPDF: true, AllowXLSX: true);


                            break;
                        }

                    case "7900":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], "RecomendacionPagoProyectoDesglosadosC2.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@IndiceAvance", "@Razones", "@nombresupervisor", "@empresasupervisora", "@poliza" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["IndiceAvance"], Request.QueryString["Razones"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8000":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnactasupervisora", ConfigurationManager.AppSettings["rutaReportes"], "rptactasupervisora.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@fechaacta", "@contrato", "@fechacontrato", "@fechainspeccion", "@fechainicio", "@fechafinalreporte", "@aniogeneral" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["fechaacta"], Request.QueryString["contrato"], Request.QueryString["fechacontrato"], Request.QueryString["fechainspeccion"], Request.QueryString["fechainicio"], Request.QueryString["fechafinalreporte"], Request.QueryString["aniogeneral"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8100":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnactacontratista", ConfigurationManager.AppSettings["rutaReportes"], "rptactacontratista.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@fechaacta", "@contrato", "@fechacontrato", "@fechainspeccion", "@fechainicio", "@fechafinalreporte", "@aniogeneral", "@supervisor", "@codproy" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["fechaacta"], Request.QueryString["contrato"], Request.QueryString["fechacontrato"], Request.QueryString["fechainspeccion"], Request.QueryString["fechainicio"], Request.QueryString["fechafinalreporte"], Request.QueryString["aniogeneral"], Request.QueryString["supervisor"], Request.QueryString["codproy"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8300":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxActaInicioSupervisor", ConfigurationManager.AppSettings["rutaReportes"], "RptActaInicioSupervisor.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@CertificacionFideicomisoNumero" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["CertificacionFideicomisoNumero"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8400":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnactacontratista", ConfigurationManager.AppSettings["rutaReportes"], "RptActaInicioContratista.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@CertificacionFideicomisoNumero" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["CertificacionFideicomisoNumero"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8500":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptDocumentosCambio.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8600":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptAdjudicacion.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8700":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptSinMontoR.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8800":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptReasignacionRecursos.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "8900":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptDescripcionTramos.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9000":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptDocumentosCambioSinDetalle.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9100":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptNomina.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9200":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptSustitucionFuente.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9300":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxCertificaciones", ConfigurationManager.AppSettings["rutaReportes"], "RptModificacionNomina.mrt", Parametros: new object[] { "@CertCorrel", "@CodigoCert" }, Valores: new object[] { Request.QueryString["CertCorrel"], Request.QueryString["CodigoCert"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9400":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncuentas", ConfigurationManager.AppSettings["rutaReportes"], "reportecuentas.mrt", Parametros: new object[] { "@AnioID", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9500":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncredidebi", ConfigurationManager.AppSettings["rutaReportes"], "reportecredidebi.mrt", Parametros: new object[] { "@AnioID", "@CuentaID", "@TipoMovID", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["CuentaID"], Request.QueryString["TipoMovID"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);


                            break;
                        }

                    case "9600":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnfecha", ConfigurationManager.AppSettings["rutaReportes"], "Fecha.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);

                            break;
                        }

                    case "9700":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cntodosfuente", ConfigurationManager.AppSettings["rutaReportes"], "Todosfuente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);


                            break;
                        }

                    case "9800":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnactacontratista", ConfigurationManager.AppSettings["rutaReportes"], "RptActaInicioContratistaGisystems.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@CertificacionFideicomisoNumero" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["CertificacionFideicomisoNumero"] }, AllowPDF: true, AllowXLSX: true);


                            break;
                        }

                    case "9900":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Cnsppagocontratista", ConfigurationManager.AppSettings["rutaReportes"], "RecomendacionPagoProyectoDesglosadosC1.mrt", Parametros: new object[] { "@AnioID", "@ProyectoSupervisionCodigo", "@EstimacionCorr", "@Fecha", "@Clausula", "@Numeral", "@Clase", "@Afianzadora", "@ckeckdelegado", "@nombredelegado", "@EstadoContratista", "@Justificacion", "@fechaescritura", "@IndiceAvance", "@Razones", "@nombresupervisor", "@empresasupervisora", "@poliza" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoSupervisionCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["Fecha"], Request.QueryString["Clausula"], Request.QueryString["Numeral"], Request.QueryString["Clase"], Request.QueryString["Afianzadora"], Request.QueryString["ckeckdelegado"], Request.QueryString["nombredelegado"], Request.QueryString["EstadoContratista"], Request.QueryString["Justificacion"], Request.QueryString["fechaescritura"], Request.QueryString["IndiceAvance"], Request.QueryString["Razones"], Request.QueryString["nombresupervisor"], Request.QueryString["empresasupervisora"], Request.QueryString["poliza"] }, AllowPDF: true, AllowXLSX: true);


                            break;
                        }
                    case "1200":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnreportefinanciero", ConfigurationManager.AppSettings["rutaReportes"], "cnreportefinanciero.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1201":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cncertnoaplican", ConfigurationManager.AppSettings["rutaReportes"], "rptcertnoaplican.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1202":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cndumentos", ConfigurationManager.AppSettings["rutaReportes"], "rptdumentosctacorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@SaldoFinalCert", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["SaldoFinalCert"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1203":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnnominacorriente", ConfigurationManager.AppSettings["rutaReportes"], "rptnominactacorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1204":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnnotasctacorriente", ConfigurationManager.AppSettings["rutaReportes"], "rptnotasctacorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1205":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cndumenosmenoresnoaprob", ConfigurationManager.AppSettings["rutaReportes"], "rptdumentosmenoresnoaprobctacorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@SaldoFinalCert", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["SaldoFinalCert"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1206":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnresumenctacorriente", ConfigurationManager.AppSettings["rutaReportes"], "rptresumenctacorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1207":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnmayoresnoaprob", ConfigurationManager.AppSettings["rutaReportes"], "rptdumentosmayoresnoaprobctacorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@SaldoFinalCert", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["SaldoFinalCert"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1208":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cndumentosincertifica", ConfigurationManager.AppSettings["rutaReportes"], "rptdumentosincertifica.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "1300":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnfecha", ConfigurationManager.AppSettings["rutaReportes"], "FechaTecnico.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9901":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "SIAP_EV1", ConfigurationManager.AppSettings["rutaReportes"], "SAFDetalle.mrt", Parametros: new object[] { "@Anio", "@Proyecto", "@NoSAF" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["NoSAF"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9902":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnfinalreportecorriente", ConfigurationManager.AppSettings["rutaReportes"], "FechaReporteFinalCorriente.mrt", Parametros: new object[] { "@AnioID", "@IDFuente", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["IDFuente"], Request.QueryString["Usuario"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }
                    // Informe de Programacion fisica con firmas .... extencion del informe 6900  
                    case "69001":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxProgramacionFisica", ConfigurationManager.AppSettings["rutaReportes"], "RptProgramacionFisicaFirmas.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr", "@PeriodoCorrImpresion" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorr"], Request.QueryString["PeriodoCorrImpresion"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9903":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "rptSanciones.mrt", AllowPDF: true, AllowXLSX: true, ExportarDirectamentePDF: true);
                            break;
                        }

                    case "9904":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "rptSancionesEmpresa.mrt", Parametros: new object[] { "@EmpresaNIT", "@Fecha_Rep" }, Valores: new object[] { Request.QueryString["EmpresaNIT"], Request.QueryString["FechaRep"] }, AllowPDF: true);



                            break;
                        }

                    case "9905":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxdeclaracionrecepcion", ConfigurationManager.AppSettings["rutaReportes"], "rptDeclaracionjuradarecepcion.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9906":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "RptSabanaCantidades.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@mes" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["mes"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "99072":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxPrObtenerConstancia", ConfigurationManager.AppSettings["rutaReportes"], "RptSabanaCantidadeSinTramos.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@mes" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["mes"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9908":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxPresentacionCambio", ConfigurationManager.AppSettings["rutaReportes"], "rptPresentacionCambio.mrt", Parametros: new object[] { "@TipoSeleccion", "@NoPresentacion" }, Valores: new object[] { Request.QueryString["TipoSeleccion"], Request.QueryString["NoPresentacion"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9909":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptLiquidacion.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "99091":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptBitacoraLiquidacion.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "91":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptControlLiquidacionContratos.mrt", Parametros: new object[] { "@AnioID" }, Valores: new object[] { Request.QueryString["AnioID"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "99":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptActaLiquidacionSupervision.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowPDF: true, AllowXLSX: true, AllowDOCX: true);



                            break;
                        }

                    case "9910":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "SIAP_EV1", ConfigurationManager.AppSettings["rutaReportes"], "SAFResumen.mrt", Parametros: new object[] { "@Anio", "@Proyecto", "@NoSAF" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["NoSAF"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9911":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Conexión", ConfigurationManager.AppSettings["rutaReportes"], "RptFiniquitoLiquidacion.mrt", Parametros: new object[] { "@anio", "@proyecto" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["PROYECTO"] }, AllowPDF: true, AllowXLSX: true);



                            break;
                        }

                    case "9912":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Conexión", ConfigurationManager.AppSettings["rutaReportes"], "rptInformePormenorizado.mrt", Parametros: new object[] { "@anio", "@proyecto" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["PROYECTO"] }, AllowPDF: true, AllowXLSX: true);
                            //No esta el archivo en la carpeta reportes


                            break;
                        }

                    case "9913":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Conexión", ConfigurationManager.AppSettings["rutaReportes"], "rptInformePormenorizadoSupervision.mrt", Parametros: new object[] { "@anio", "@proyecto" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["PROYECTO"] }, AllowPDF: true, AllowXLSX: true);
                            //No esta el archivo en la carpeta reportes


                            break;
                        }

                    case "9":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptActaLiquidacion.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowPDF: true);



                            break;
                        }

                    case "10":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptActaLiquidacion Carlos_Mendez.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowPDF: true);



                            break;
                        }

                    case "11":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptActaLiquidacion Elfego_Bladimiro.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowPDF: true);



                            break;
                        }

                    case "12":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptActaLiquidacionSupervisionJuanCarlosMendez.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowPDF: true);



                            break;
                        }

                    case "13":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptResumenFacturasPendientes.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowPDF: true, AllowXLS: true);



                            break;
                        }

                    case "130331":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptResumenFacturasPendientes.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO", "@fechaIni", "@fechaFin" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"], Request.QueryString["fechaini"], Request.QueryString["fechafin"] }, AllowPDF: true, AllowXLS: true);



                            break;
                        }

                    case "14":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptResumenestimacionestrabajo.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }

                    case "15":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "RptDocumentosCambioCuadros.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }

                    case "16":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptBalanceGeneral.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }
                    // Case 17
                    // ControladorReportes.GenerarReporteWeb( Me.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], _
                    // "Report.mrt", Parametros:=New Object() _
                    // {"@ANIOID", "@PROYECTO"}, _
                    // Valores:=New Object() _
                    // {Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"]}, AllowXLS:=True)

                    case "17":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "RptBalancePagosFinanciamiento.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }

                    case "170331":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "RptBalancePagosFinanciamiento.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO", "@fechaIni", "@fechaFin" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"], Request.QueryString["fechaini"], Request.QueryString["fechafin"] }, AllowPDF: true, AllowXLS: true);



                            break;
                        }

                    case "170332":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "EstimacionesPagadasPorProyecto.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true, AllowXLS: true);



                            break;
                        }

                    case "18":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "ResumenInformeFinalSupervision.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }

                    case "19":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptValorActualizadoContrato.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }

                    case "20":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "RPTActaRecepcion.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO", "@PROYECTOL", "@CLASEFIANZA", "@CLASEFIANZASD" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"], Request.QueryString["PROYECTOL"], Request.QueryString["CLASEFIANZA"], Request.QueryString["CLASEFIANZASD"] }, AllowDOCX: true, AllowTXT: true, AllowPDF: true);



                            break;
                        }
                    // Case 21
                    // ControladorReportes.GenerarReporteWeb( Me.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], _
                    // "RPTActaRecepcion.mrt", Parametros:=New Object() _
                    // {"@ANIOID", "@PROYECTO", "@PROYECTOL", "@CLASEFIANZA"}, _
                    // Valores:=New Object() _
                    // {Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"], Request.QueryString["PROYECTOL"], Request.QueryString["CLASEFI
                    case "22":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection1", ConfigurationManager.AppSettings["rutaReportes"], "rptResumenestimacionestrabajoS.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowXLS: true);



                            break;
                        }

                    case "23":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "RPTActaRecepcionL.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO", "@PROYECTOL" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"], Request.QueryString["PROYECTOL"] }, AllowDOCX: true, AllowTXT: true, AllowPDF: true);



                            break;
                        }

                    case "24":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "RPTActaRecepcionS.mrt", Parametros: new object[] { "@ANIOID", "@PROYECTO", "@PROYECTOL" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"], Request.QueryString["PROYECTOL"] }, AllowDOCX: true, AllowTXT: true, AllowPDF: true);



                            break;
                        }

                    case "25":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptSaldoContractual.mrt", Parametros: new object[] { "@Anio", "@proyecto", "@NitEmpresa", "@reporte" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["proyecto"], Request.QueryString["NitEmpresa"], Request.QueryString["reporte"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "26":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptDeudaporEspecialidad.mrt", Parametros: new object[] { "@Anio", "@proyecto", "@NitEmpresa", "@reporte" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["proyecto"], Request.QueryString["NitEmpresa"], Request.QueryString["reporte"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "27":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptDeudaporTramo.mrt", Parametros: new object[] { "@Aniop", "@proyecto", "@NitEmpresa", "@reporte" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["proyecto"], Request.QueryString["NitEmpresa"], Request.QueryString["reporte"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "30":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptConstanciaLiquidacion.mrt", Parametros: new object[] { "@Empresap" }, Valores: new object[] { Request.QueryString["Empresap"] }, AllowDOCX: true, AllowPDF: true);



                            break;
                        }

                    case "32":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptSaldoTramoProyecto.mrt", Parametros: new object[] { "@Aniop", "@proyecto", "@NitEmpresa", "@reporte" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["proyecto"], Request.QueryString["NitEmpresa"], Request.QueryString["reporte"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "33":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptDeudaProyectodt.mrt", Parametros: new object[] { "@Aniop", "@proyecto", "@reporte" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["proyecto"], Request.QueryString["reporte"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "34":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptDeudaPrograma.mrt", Parametros: new object[] { "@Aniop", "@programa", "@reporte" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["programa"], Request.QueryString["reporte"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "35":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptDeudaProgramaRangoF.mrt", Parametros: new object[] { "@anio", "@programa", "@fechad", "@fechah" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["programa"], Request.QueryString["fechad"], Request.QueryString["fechah"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "36":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptEstimacionesFinanciero.mrt", Parametros: new object[] { "@aniop", "@programa" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["Proyecto"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "37":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "RptDetalleRespaldoPresupuestario.mrt", Parametros: new object[] { "@anio", "@programa" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["Proyecto"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "38":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "MontosPagadosXPrograma.mrt", Parametros: new object[] { "@anioNomina", "@mes" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["Mes"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "39":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "MontosPagadosXProgramaTotal.mrt", Parametros: new object[] { "@anioNomina", "@mes" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["Mes"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);



                            break;
                        }

                    case "40":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "MontosPagadosXProgramaAgrupadosTotal.mrt", Parametros: new object[] { "@anioNomina", "@mes" }, Valores: new object[] { Request.QueryString["Anio"], Request.QueryString["Mes"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);
                            break;
                        }

                    case "41":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "FotografiasAdministrativas.mrt", Parametros: new object[] { "@AnioID", "@Proyecto" }, Valores: new object[] { Request.QueryString["ANIOID"], Request.QueryString["PROYECTO"] }, AllowDOCX: true, AllowXLSX: true, AllowPDF: true);
                            break;
                        }

                    case "4606":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "reporteactainspect.mrt", Parametros: new object[] { "@id", "@printhead" }, Valores: new object[] { Request.QueryString["id"], Request.QueryString["printhead"] }, AllowDOCX: false, AllowTXT: false, AllowPDF: true, ExportarDirectamentePDF: true);



                            break;
                        }

                    case "8910":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "reportesuperwalo001.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@fechaini", "@fechafin", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["fechaini"], Request.QueryString["fechafin"], Request.QueryString["Usuario"] }, AllowPDF: true);
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "reportesuperwalo001.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@fechaini", "@fechafin", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["fechaini"], Request.QueryString["fechafin"], Request.QueryString["Usuario"] }, AllowPDF: true);


                            break;
                        }
                    case "8911":
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptReporteVialListado.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@pTramoID", "@pDanioID", "pIDReporteEstado", "@pFechaDesde", "@pFechaHasta" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["pTramoID"], Request.QueryString["pDanioID"], Request.QueryString["pIDReporteEstado"], Request.QueryString["pFechaDesde"],  Request.QueryString["pFechaHasta"] }, AllowDOCX: false, AllowTXT: false, AllowPDF: true, ExportarDirectamentePDF: true);
                            break;
                        }
                    case "1111":
                        {
                            //certificado del contador informe
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "rptCertificadoDelContador.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"] }, AllowPDF: true);
                            break;
                        }


                    case "7777":
                        {
                            //Saldo de Estimaciones Super
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "Connection", ConfigurationManager.AppSettings["rutaReportes"], "reportesuperwalo001.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@fechaini", "@fechafin", "@Usuario" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["fechaini"], Request.QueryString["fechafin"], Request.QueryString["Usuario"] }, AllowPDF: true);

                            break;
                        }
                    case "5555":
                        {
                            //Reportes viales generales
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxSicop", ConfigurationManager.AppSettings["rutaReportes"], "rptReporteVialListado.mrt", Parametros: new object[] { "@pTramo", "@pDanioID", "@pIDReporteEstado", "@pFechaDesde", "@pFechaHasta" }, Valores: new object[] { Request.QueryString["pTramo"], Request.QueryString["pDanioID"], Request.QueryString["pIDReporteEstado"], Request.QueryString["pFechaDesde"], Request.QueryString["pFechaHasta"] }, AllowPDF: true);
                            break;
                        }
                    case "2222":
                        {
                            // validacion de acta por proyecto C y CE 
                            string Proyecto = Request.QueryString["ProyectoCodigo"];
                            int index = Proyecto.IndexOf('-');
                            string programa = Proyecto.Substring(0, index);

                           if (String.Equals(programa, "C") || String.Equals(programa, "CE"))
                            {
        
                                ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxActaDeEstimacion", ConfigurationManager.AppSettings["rutaReportes"], "rptActaDeEstimacionServiciosDeIngenieria.mrt", Parametros: new object[] { "@anio", "@proyectoCodigo", "@estimacionCorr", "NoActa", "horaActa", "fechaActaIn", "NombreEncargadoPE", "NombreEncargadoPS", "TituloEncargadoPE", "TituloEncargadoPS", "noFolio", "CodigoProyLetras", "FechaDelNombramiento" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["NoActaEstimacion"], Request.QueryString["horaActa"], Request.QueryString["fechaActaIn"], Request.QueryString["NombreEncargadoPE"], Request.QueryString["NombreEncargadoPS"], Request.QueryString["TituloEncargadoPE"], Request.QueryString["TituloEncargadoPS"], Request.QueryString["noFolio"], Request.QueryString["CodigoProyLetras"], Request.QueryString["FechaDelNombramiento"] }, AllowPDF: true);

                            }
                            else
                            {
                                //Reporte Acta de Estimación
                                ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxActaDeEstimacion", ConfigurationManager.AppSettings["rutaReportes"], "rptActaDeEstimacion.mrt", Parametros: new object[] { "@anio", "@proyectoCodigo", "@estimacionCorr", "NoActa", "horaActa", "fechaActaIn", "NombreEncargadoPE", "NombreEncargadoPS", "TituloEncargadoPE", "TituloEncargadoPS", "noFolio", "CodigoProyLetras" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"], Request.QueryString["NoActaEstimacion"], Request.QueryString["horaActa"], Request.QueryString["fechaActaIn"], Request.QueryString["NombreEncargadoPE"], Request.QueryString["NombreEncargadoPS"], Request.QueryString["TituloEncargadoPE"], Request.QueryString["TituloEncargadoPS"], Request.QueryString["noFolio"], Request.QueryString["CodigoProyLetras"] }, AllowPDF: true);

                            }
                            break;                                                                                                                                                                          
                        }
                    case "3331":  // reporte modulo Informe Tecnico Mensual --- Datos Administrativos 
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxDatosAdministrativos", ConfigurationManager.AppSettings["rutaReportes"], "rptDatosAdministrativos.mrt", Parametros: new object[] { "@anio", "@proyectoCodigo", "@PeriodoCorrel" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3332": // reporte modulo Informe Tecnico Mensual --- Cantidades totales 2 reportes con distinto procedimiento almacenado 
                        {
                            var NombreReporte = default(string);

                            if (Int32.Parse(Request.QueryString["AnioID"]) > 2012)
                            {
                                NombreReporte = "rptCantidadesTotales2013.mrt";
                            }
                            else 
                            {
                                NombreReporte = "rptCantidadesTotales.mrt";
                            }

                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxCantidadesTotales", ConfigurationManager.AppSettings["rutaReportes"], NombreReporte, Parametros: new object[] { "@anio", "@proyectoCodigo", "@PeriodoCorrel" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3333":// reporte modulo Informe Tecnico Mensual --- Documento de cambio
                        {
                            string Doc = Request.QueryString["NIndividual"];
                            if (Doc == "0") {
                              ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxDocumentosDeCambio", ConfigurationManager.AppSettings["rutaReportes"], "rptDocumentosDeCambio.mrt ", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr", "@EstadoDoc" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["EstadoDoc"] }, AllowPDF: true);
                            }
                            else {
                              ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxDocumentosDeCambio", ConfigurationManager.AppSettings["rutaReportes"], "rptDocumentosDeCambioIndividual.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr", "@EstadoDoc", "NIndividual" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"], Request.QueryString["EstadoDoc"], Request.QueryString["NIndividual"] }, AllowPDF: true);
                            }
                            
                            break;
                        }
                    case "3334": // reporte modulo Informe Tecnico Mensual --- tabla ejecucion real 
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxEjecucionReal", ConfigurationManager.AppSettings["rutaReportes"], "rptEjecucionReal.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3335": // reporte modulo Informe Tecnico Mensual ---hoja de medicion (Analisis de Ejecucion de Renglones)
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxHojaDeMedicion", ConfigurationManager.AppSettings["rutaReportes"], "rptHojaDeMedicion.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3336": // reporte modulo Informe Tecnico Mensual --- tabla equipos 
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxEquipos", ConfigurationManager.AppSettings["rutaReportes"], "rptEquipo.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3337": // reporte modulo Informe Tecnico Mensual --- tabla LLuvias 
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxLluvias", ConfigurationManager.AppSettings["rutaReportes"], "rptLluvias.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3338": // reporte modulo Informe Tecnico Mensual ---- Grafica Ejecucion fisica
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxGrafica", ConfigurationManager.AppSettings["rutaReportes"], "rptGrafica.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            break;
                        }
                    case "3339": // reporte modulo Informe Tecnico Mensual ---- fotografias
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxFotografias", ConfigurationManager.AppSettings["rutaReportes"], "rptFotografias.mrt", Parametros: new object[] { "@PeriodoCorr" , "@AnioID", "@ProyectoCodigo"}, Valores: new object[] { Request.QueryString["PeriodoCorrel"], Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"] }, AllowPDF: true);
                            break;
                        }
                    case "3340": // reporte modulo Informe Tecnico Mensual ---- fotografiasPDF
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxFotografiasPDF", ConfigurationManager.AppSettings["rutaReportes"], "rptFotografiasPDF.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@PeriodoCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["PeriodoCorrel"] }, AllowPDF: true);
                            StiOptions.Export.Html.UseImageResolution = true;
                            break;
                        }
                    case "511": // reporte modulo ConsultaEstimacionesDetallada ---- Ejecución de renglones de trabajo
                        {
                            ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "cnxEjecucionDeRenglon", ConfigurationManager.AppSettings["rutaReportes"], "rptEstimacionesRenglones2.mrt", Parametros: new object[] { "@AnioID", "@ProyectoCodigo", "@EstimacionCorr" }, Valores: new object[] { Request.QueryString["AnioID"], Request.QueryString["ProyectoCodigo"], Request.QueryString["EstimacionCorr"] }, AllowPDF: true);
                            break;
                        }
                    case "512": {//reporte modulo EdicionReportesViales con reportes Asociados y no Asociados

                            string asociado = Request.QueryString["asociado"]; // asociado 0 = general  y 1 = con reportes asosciados 
                            if (asociado == "0")
                            {
                                ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxSicop", ConfigurationManager.AppSettings["rutaReportes"], "rptReporteVial.mrt", Parametros: new object[] { "@pReporteID", "@pUsuarioCreo", "@idPadre" }, Valores: new object[] { Request.QueryString["pReporteID"], Request.QueryString["pUsuarioCreo"], Request.QueryString["idPadre"] }, AllowPDF: true);
                            }
                            else
                            {
                                ControladorReportes.GenerarReporteWeb(this.StiWebViewer1, "CnxSicop", ConfigurationManager.AppSettings["rutaReportes"], "rptReporteVialReportesAsociados.mrt", Parametros: new object[] { "@pReporteID", "@pUsuarioCreo", "@idPadre" }, Valores: new object[] { Request.QueryString["pReporteID"], Request.QueryString["pUsuarioCreo"], Request.QueryString["idPadre"] }, AllowPDF: true);
                            }
                            break;
                        }

                }
            }
        }
    }
}