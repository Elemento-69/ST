using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Covialgt.Models.RegistroClimatico
{
    [Serializable]
    public class Lluvia
    {
        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime Fecha { get; set; }
        public string Evento { get; set; }
    }
    class CustomDateTimeConverter : IsoDateTimeConverter
    {
        public CustomDateTimeConverter()
        {
            base.DateTimeFormat = "dd/MM/yyyy";
        }
    }
}