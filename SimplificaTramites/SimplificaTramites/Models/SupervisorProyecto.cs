using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    public class SupervisorProyecto
    {
        public int AnioId { get; set; }
        public string ProyectoCodigo { get; set; }
        public string Nombre { get; set; }
        public string EmpresaNIT { get; set; }
        public string Representante { get; set; }
        public string TelefonosPrincipales { get; set; }
        public string CorreoE { get; set; }
        public string ProyectoDescripcion { get; set; }
    }
}