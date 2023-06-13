using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    [Serializable]
    public class Tramo
    {
        public string RutaCode { get; set; }
        public string TramoCodigo { get; set; }
        public string TramoId { get; set; }
        public string TramoDesc { get; set; }
        public string SNIP { get; set; }
        public decimal? TramoLong { get; set; }

        public string CodigoDesc { get { return $"{TramoCodigo}-{TramoDesc}"; } }
    }
}