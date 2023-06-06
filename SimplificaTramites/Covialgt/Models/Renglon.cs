using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Covialgt.Models
{
    [Serializable]
    public class Renglon
    {
        public int RenglonID { get; set; }
        public string RenglonCodCOVIAL { get; set; }
        public string ComponenteDesc { get; set; }
        public string ProyectoRenglonNombre { get; set; }
        public string Unidad { get; set; }
        public decimal? Cantidad { get; set; }
        public decimal? RenglonPrecioUnitario { get; set; }
        public decimal? Costo { get; set; }
        public string CodigoDesc { get { return $"{RenglonCodCOVIAL}-{ProyectoRenglonNombre}"; } }

    }
}