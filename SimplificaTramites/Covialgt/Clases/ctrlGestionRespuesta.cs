using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Covialgt.Clases
{
    public class ctrlGestionRespuesta
    {
       
            public bool dioError { get; set; }
            public string descripcionError { get; set; }
            public string descripcionMensaje { get; set; }
            public int datoDevuelto { get; set; }
            public string datoDevueltoString { get; set; }
            public int bandera { get; set; }
            public DataTable tablaDevuelta { get; set; }
        
    }
}