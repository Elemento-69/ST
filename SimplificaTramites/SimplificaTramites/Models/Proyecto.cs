using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    [Serializable]
    public class Proyecto
    {
        public string ProyectoCodigo { get; set; }
        public string ProyectoDescripcion { get; set; }
        public DateTime? FechaInicioFisico { get; set; }
        public DateTime? FechaFinaModificado { get; set; }
    }
}