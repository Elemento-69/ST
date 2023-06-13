using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

//namespace Covialgt.Reportes
//{
//    public class ReportesInt
//    {
//    }
//}


[Serializable()]
public class ReportesInt
{
    private Tipo _tipoReporte;
    private string _MetodoObtener;
    private string _Filtro;
    private string _RutaFisica;
    private object _Parametros;
    private string[] _NombreOrigenDatos = new string[11];
    private string[] _Procedimiento = new string[11];
    private string[] _NombreSubReporte = new string[11];


    /// <summary>
    ///     ''' Enum que se utilizara para tener ayuda Intellisense sobre todos los reportes posibles que se pueden mostrar
    ///     ''' </summary>
    ///     ''' <remarks>Solo ha sido creado por elegancia y mejor llamado mnemónico de los reportes</remarks>
    public enum Tipo
    {
        Anexos = 1,
        Estimaciones = 2,
        S_DatosAdministrativos = 3,
        S_HojaDeMedicion = 4,
        Estimaciones2 = 5,
        Estimaciones3 = 500,
        EstimacionesMantenimiento = 6,
        EstimacionesMantenimientoLimpieza = 7,
        S_DatosAdministrativosPeriodo = 8,
        S_HojaDeMedicionPeriodo = 9,
        ge_AnexosOriginales = 10,
        EstimacionesNuevas = 11,
        Nominadepago = 12,
        DocumentosdeCambio = 13,
        DocumentosdeCambio1 = 99,
        PruebaReportes = 100,
        DocumentosdeCambio2 = 101,
        s_ObtenerEstimacionesTramiteDetalle = 14,
        AnexosPublico = 15,
        prReporteProyectosPorRegional = 16,
        ReporteSupervisionActividades = 103
    }

    public string NombreReporte
    {
        get
        {
            return Enum.GetName(typeof(Tipo), _tipoReporte);
        }
    }

    public string MetodoObtener
    {
        get
        {
            return _MetodoObtener;
        }
    }

    public string Filtro
    {
        get
        {
            return _Filtro;
        }
    }

    public string RutaFisica
    {
        get
        {
            return _RutaFisica;
        }
    }

    public string get_NombreOrigenDatos(int Index)
    {
        return _NombreOrigenDatos[Index];
    }


    public string get_Procedimiento(int Index)
    {
        return _Procedimiento[Index];
    }

    public int get_IndiceSR(string Nombre)
    {
        return getNombre(Nombre);
    }

    public ReportesInt(Tipo TipoReporte, string Filtro)
    {
        _tipoReporte = TipoReporte;
        _Filtro = Filtro;
        switch (_tipoReporte)
        {
            case Tipo.Anexos:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\Anexos.rdlc"; // Obvio
                    _Procedimiento[1] = "prObtenerProyectoToReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsAnexos_prObtenerProyectoToReporte"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerProyectosTramos_Rep2"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsAnexosTramos_prObtenerProyectosTramos_Rep2"; // Tabla del Dataset
                    _NombreSubReporte[2] = "AnexosTramos";
                    _Procedimiento[3] = "prObtenerRenglonesToReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[3] = "dsAnexosRenglones_prObtenerRenglonesToReporte"; // Tabla del Dataset
                    _NombreSubReporte[3] = "AnexosRenglones";
                    _Procedimiento[4] = "prObtenerTramosSupToReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[4] = "dsAnexosTramosSup_prObtenerTramosSupToReporte"; // Tabla del Dataset
                    _NombreSubReporte[4] = "AnexosTramosSup";
                    break;
                }

            case Tipo.AnexosPublico:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\AnexosPublico.rdlc"; // Obvio
                    _Procedimiento[1] = "prObtenerProyectoToReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsAnexos_prObtenerProyectoToReporte"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerProyectosTramos_Rep2"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsAnexosTramos_prObtenerProyectosTramos_Rep2"; // Tabla del Dataset
                    _NombreSubReporte[2] = "AnexosTramos";
                    _Procedimiento[3] = "prObtenerRenglonesToReporte"; // roimiento Almacenado
                    _NombreOrigenDatos[3] = "dsAnexosRenglones_prObtenerRenglonesToReporte"; // Tabla del Dataset
                    _NombreSubReporte[3] = "AnexosRenglonesPublico";
                    _Procedimiento[4] = "prObtenerTramosSupToReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[4] = "dsAnexosTramosSup_prObtenerTramosSupToReporte"; // Tabla del Dataset
                    _NombreSubReporte[4] = "AnexosTramosSup";
                    break;
                }

            case Tipo.Estimaciones:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\Estimaciones.rdlc"; // Obvio
                    _Procedimiento[1] = "prObtenerProyectosTramos_Rep3Mod"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsProgramaFisicoTramos_prObtenerProyectosTramos_Rep3"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerProyectosTramos_Rep2"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsAnexosTramos_prObtenerProyectosTramos_Rep2"; // Tabla del Dataset
                    _NombreSubReporte[2] = "ProgramaFisicoTramos";
                    _Procedimiento[3] = "prObtenerProgramaFisico4Reporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[3] = "dsProgramaFisico_prObtenerProgramaFisico4Reporte"; // Tabla del Dataset
                    _NombreSubReporte[3] = "ProgramaFisico";
                    break;
                }

            case Tipo.S_DatosAdministrativos:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\S_DatosAdministrativos.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporte_S_DatosAdministrativosMod"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsS_DatosAdministrativos_ObtenerReporte_S_DatosAdministrativos"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporte_S_ComponentesDatosAdministrativos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsS_ComponentesDatosAdministrativos_ObtenerReporte_S_ComponentesDatosAdministrativos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "S_ComponentesDatosAdministrativos";
                    _Procedimiento[3] = "ObtenerReporte_S_EquipoDatosAdministrativos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[3] = "dsS_EquipoDatosAdministrativos_ObtenerReporte_S_EquipoDatosAdministrativos"; // Tabla del Dataset
                    _NombreSubReporte[3] = "S_EquipoDatosAdministrativos";
                    break;
                }

            case Tipo.S_DatosAdministrativosPeriodo:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\S_DatosAdministrativosPeriodo.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporte_S_DatosAdministrativosMod_NEW"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsS_DatosAdministrativos_ObtenerReporte_S_DatosAdministrativos"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporte_S_ComponentesDatosAdministrativos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsS_ComponentesDatosAdministrativos_ObtenerReporte_S_ComponentesDatosAdministrativos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "S_ComponentesDatosAdministrativos";
                    _Procedimiento[3] = "ObtenerReporte_S_EquipoDatosAdministrativos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[3] = "dsS_EquipoDatosAdministrativos_ObtenerReporte_S_EquipoDatosAdministrativos"; // Tabla del Dataset
                    _NombreSubReporte[3] = "S_EquipoDatosAdministrativos";
                    break;
                }

            case Tipo.S_HojaDeMedicion:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\S_HojaDeMedicion.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporte_S_HojaDeMedicionMod"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsS_HojaDeMedicion_ObtenerReporte_S_HojaDeMedicion"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporte_S_HojaDeMedicion_Tramos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsS_HojaDeMedicion_Tramos_ObtenerReporte_S_HojaDeMedicion_Tramos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "S_HojaDeMedicion_Tramos";
                    break;
                }

            case Tipo.S_HojaDeMedicionPeriodo:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\S_HojaDeMedicionPeriodo.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporte_S_HojaDeMedicionMod_NEW"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsS_HojaDeMedicion_ObtenerReporte_S_HojaDeMedicion"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporte_S_HojaDeMedicion_Tramos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsS_HojaDeMedicion_Tramos_ObtenerReporte_S_HojaDeMedicion_Tramos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "S_HojaDeMedicion_Tramos";
                    break;
                }

            case Tipo.Estimaciones2:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\EstimacionesRenglones2.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteEstimacionesMod"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsEstimaciones_ObtenerReporteEstimaciones"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporteEstimacionesTramos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsEstimacionesTramos_ObtenerReporteEstimacionesTramos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "EstimacionesTramos";
                    break;
                }
            case Tipo.Estimaciones3:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\EstimacionesRenglones3.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteEstimacionesMod"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsEstimaciones_ObtenerReporteEstimaciones"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporteEstimacionesTramos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsEstimacionesTramos_ObtenerReporteEstimacionesTramos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "EstimacionesTramos";
                    break;
                }

            case Tipo.EstimacionesMantenimiento:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\EstimacionesMantenimiento.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteEstimacionesMantenimiento2Mod"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsEstimacionesMantenimiento_ObtenerReporteEstimacionesMantenimiento2"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporteEstimacionesTramos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsEstimacionesTramos_ObtenerReporteEstimacionesTramos"; // Tabla del Dataset
                    _NombreSubReporte[2] = "EstimacionesTramos2";
                    break;
                }

            case Tipo.EstimacionesMantenimientoLimpieza:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\EstimacionesMantenimientoLimpieza2012.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteEstimacionesMantenimientoLimpieza2012"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsEstimacionesMantenimientoLimpieza_ObtenerReporteEstimacionesMantenimientoLimpieza"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerProyectosTramos_Rep2"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "prObtenerProyectosTramos_Rep2_prObtenerProyectosTramos_Rep2"; // Tabla del Dataset
                    _NombreSubReporte[2] = "prObtenerProyectosTramos_Rep2";
                    break;
                }

            case Tipo.ge_AnexosOriginales:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\ge_AnexosOriginales.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporte_Ge_AnexosOriginalesTramos"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "ge_AnexosOriginales_ObtenerReporte_Ge_AnexosOriginalesTramos"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerReporte_Ge_AnexosOriginalesRenglones"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "ge_AnexosOriginalesRenglones_ObtenerReporte_Ge_AnexosOriginalesRenglones"; // Tabla del Dataset
                    _NombreSubReporte[2] = "ge_AnexosOriginalesRenglones";
                    break;
                }

            case Tipo.EstimacionesNuevas:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\Estimaciones2.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporte_Estimaciones2"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "Estimaciones2_ObtenerReporte_Estimaciones2"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerProyectosTramos_Rep2"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "prObtenerProyectosTramos_Rep2_prObtenerProyectosTramos_Rep2"; // Tabla del Dataset
                    _NombreSubReporte[2] = "prObtenerProyectosTramos_Rep2";
                    break;
                }

            case Tipo.Nominadepago:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\NominaparaReporte_3.rdlc"; // Obvio
                    _Procedimiento[1] = "prObtenerUnaNominaparaReporte_3"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsObtenerNomonasparaReporte_New_prObtenerUnaNominaparaReporte_3"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerSRNominaparaReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsObtenerSRParaNomidadePago_prObtenerSRNominaparaReporte"; // Tabla del Dataset
                    _NombreSubReporte[2] = "srNomina";
                    break;
                }

            case Tipo.PruebaReportes:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\NominaparaReporte_3.rdlc"; // Obvio
                    _Procedimiento[1] = "prObtenerUnaNominaparaReporte_3"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsObtenerNomonasparaReporte_New_prObtenerUnaNominaparaReporte_3"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtenerSRNominaparaReporte"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsObtenerSRParaNomidadePago_prObtenerSRNominaparaReporte"; // Tabla del Dataset
                    _NombreSubReporte[2] = "srNomina";
                    break;
                }

            case Tipo.DocumentosdeCambio:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\DocumentosDeCambio.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteDocumentosCambioConFiltro"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsDocumentodeCambio_ObtenerReporteDocumentosCambioConFiltro"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtertblProyectosTramosBitacora_Info"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsTramosenDC_prObtertblProyectosTramosBitacora_Info"; // Tabla del Dataset
                    _NombreSubReporte[2] = "TramosenDC";
                    break;
                }

            case Tipo.DocumentosdeCambio1:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\DocumentosDeCambio1.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteDocumentosCambioConFiltro2011"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsDocumentodeCambio_ObtenerReporteDocumentosCambioConFiltro"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtertblProyectosTramosBitacora_Info"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsTramosenDC_prObtertblProyectosTramosBitacora_Info"; // Tabla del Dataset
                    _NombreSubReporte[2] = "TramosenDC";
                    break;
                }

            case Tipo.DocumentosdeCambio2:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\DocumentosDeCambio2.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerReporteDocumentosCambioConFiltro2011"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsDocumentodeCambio_ObtenerReporteDocumentosCambioConFiltro"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "prObtertblProyectosTramosBitacora_Info"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "dsTramosenDC_prObtertblProyectosTramosBitacora_Info"; // Tabla del Dataset
                    _NombreSubReporte[2] = "TramosenDC";
                    break;
                }

            case Tipo.s_ObtenerEstimacionesTramiteDetalle:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\ObtenerEstimacionesTramiteDetalle.rdlc"; // Obvio
                    _Procedimiento[1] = "ObtenerEstimacionesTramiteDetalle"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "ObtenerEstimacionesTramiteDetalle01_ObtenerEstimacionesTramiteDetalle"; // Tabla del Dataset
                    _NombreSubReporte[1] = "";
                    _Procedimiento[2] = "ObtenerEstimacionesTramiteResumen"; // Procedimiento Almacenado
                    _NombreOrigenDatos[2] = "ObtenerEstimacionesTramiteResumen_ObtenerEstimacionesTramiteResumen"; // Tabla del Dataset
                    _NombreSubReporte[2] = "ObtenerEstimacionesTramiteResumen";
                    break;
                }

            case Tipo.prReporteProyectosPorRegional:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\ReporteProyectosPorRegional.rdlc"; // Obvio
                    _Procedimiento[1] = "prReporteProyectosPorRegional"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "prReporteProyectosPorRegional_prReporteProyectosPorRegional"; // Tabla del Dataset    
                    break;
                }

            case Tipo.ReporteSupervisionActividades:
                {
                    _MetodoObtener = "ObtenerDatosXParametros"; // No Cambia
                    _RutaFisica = @"Reportes\InformeSupervision.rdlc"; // Obvio
                    _Procedimiento[1] = "DatosEstadoProyecto"; // Procedimiento Almacenado
                    _NombreOrigenDatos[1] = "dsSupervisor_DataTable1"; // Tabla del Dataset
                    break;
                }
        }
    }

    private int getNombre(string Nombre)
    {
        int getNombreRet = default;
        int i = 0;
        for (i = 1; i <= 10; i++)
        {
            if (_NombreSubReporte[i] == Nombre)
            {
                getNombreRet = i;
                return getNombreRet;
            }
        }

        getNombreRet = 0;
        return getNombreRet;
    }

}
