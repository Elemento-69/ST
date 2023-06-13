using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    public class Ejecucion
    {
        public string Renglon { get; set; }
        public string Descripcion { get; set; }
        public decimal MontoVigente { get; set; }
        public decimal PorcentajeEjecutado { get; set; }
        public decimal MontoAcumulado { get; set; }
        public decimal RenglonCantidadtotal { get; set; }
        public string RenglonUni { get; set; }
        public decimal CantidadTotal { get; set; }
        public decimal RenglonPrecioUnitario { get; set; }
    }
}