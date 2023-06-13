using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    [Serializable]
    public class GraficaFinanciero
    {
        public decimal Contratado { get; set; }
        public decimal Ejecutado { get; set; }
        public decimal Pagado { get; set; }
        public decimal ParaPago { get; set; }
        public decimal EnRevision { get; set; }
        public decimal Observado { get; set; }
        public decimal NoPresentado { get; set; }
        public decimal NoEjecutado { get; set; }
    }
}