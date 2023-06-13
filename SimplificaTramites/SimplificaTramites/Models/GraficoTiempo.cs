using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    [Serializable]
    public class GraficoTiempo
    {
        public decimal AvanceTiempo { get; set; } = 0;
        public decimal PendienteTiempo { get; set; } = 100;
    }
}