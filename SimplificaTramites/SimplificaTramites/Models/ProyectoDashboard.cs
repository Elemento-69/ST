using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    public class ProyectoDashboard
    {
        public string ProyectoCodigo { get; set; }
        public string ProyectoDescripcion { get; set; }
        public int Plazo { get; set; }
        public string ProyectoEstatusDesc { get; set; }
        public string ProyectoNOG { get; set; }
        public string CDPctoOriginal { get; set; }
        public Decimal AvanceFisico { get; set; }
        public Decimal AvanceFinanciero { get; set; }
        public DateTime? FechaIngresoEjecucion { get; set; }
        public DateTime? FechaRealizado { get; set; }
        public string ContratoCodigo { get; set; }
        public DateTime? FechaContrato { get; set; }
        public DateTime? FechaInicioFisico { get; set; }
        public DateTime? FechaFinalOriginal { get; set; }
        public DateTime? FechaFinaModificado { get; set; }
        public string CodigoCert { get; set; }
        public DateTime? FechaCert { get; set; }
        public Decimal MontoOriginal { get; set; }
        public Decimal MontoModificado { get; set; }
        public string Nombre { get; set; }
        public string EmpresaNIT { get; set; }
        public string Representante { get; set; }
        public string TelefonosPrincipales { get; set; }
        public string CorreoE { get; set; }
        public string SupervisoraAnioID { get; set; }
        public string ProyectoSupervisionCodigo { get; set; }
        public string ResponsableProyecto { get; set; }
        public string Expr1 { get; set; }

    }
}