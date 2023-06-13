using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    [Serializable]
    public class DocumentosCambio
    {
        public int DocCambioCorrel { get; set; }
        public string TipoDocumento { get; set; }
        public string DocCamioJustifica { get; set; }
        public int DiasDocCambio { get; set; }
        public decimal MontoDocCambio { get; set; }
        public string Estado { get; set; }
        public DateTime FechaEstado { get; set; }

    }
}