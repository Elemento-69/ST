using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Covialgt.Models
{
    public class AuthModel
    {
       
            public string token { get; set; }
            public string rol { get; set; }
            public bool isSupervisor { get; set; }
            public Boolean NecesitaCambioPass { get;  set; }



    }
    public class SupervisorActaInicioAprobada
    {
        public int actaInicio { get; set; } = 0;
    }
}