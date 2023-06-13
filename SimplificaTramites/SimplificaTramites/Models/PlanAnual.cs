using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models
{
    public class PlanAnual
    {
        public string AnioID { get; set; }

        public string PlanAnualNombre { get; set; }

        public override string ToString()
        {
            return $"{AnioID} - {PlanAnualNombre}";
        }
    }
}