using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplificaTramites.Models.RegistroDatos
{
    public class Periodo
    {
        public int PeriodoCorrel { get; set; }
        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime PeriodoDesde { get; set; }
        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime PeriodoHasta { get; set; }
        public bool PeriodoHabilitado { get; set; }

        class CustomDateTimeConverter : IsoDateTimeConverter
        {
            public CustomDateTimeConverter()
            {
                base.DateTimeFormat = "dd/MM/yyyy";
            }
        }
    }
}