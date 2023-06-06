using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Covialgt.Models
{
    [Serializable]
    public class EstimacionGerencial
    {
        public string EstimacionCorr { get; set; }
        public string Periodo { get; set; }
        public Decimal MontoRetencion { get; set; }
        public Decimal MontoEjecutado { get; set; }
        public Decimal MontoaRecibir { get; set; }
        public Decimal MontoEmbargado { get; set; }
        public string CertificadoSup { get; set; }
        public string EstadoDesc { get; set; }
        public DateTime? DateModify { get; set; }
        public DateTime? FechaRecepcion { get; set; }
    }
}