using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Covialgt.Models
{
    [Serializable]
    public class GraficoFisico
    {
        public decimal Mes { get; set; }
        public decimal Fecha { get; set; }
        public decimal Original { get; set; }
        public decimal Vigente { get; set; }
        public decimal Ejecutado { get; set; }
        public decimal Periodo { get; set; }
        public string FechaMaxEjecutado { get; set; }
    }
}