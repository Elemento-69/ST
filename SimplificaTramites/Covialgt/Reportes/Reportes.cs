using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.VisualBasic;
using System.Data;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using Covialgt.Models;

namespace Covialgt.Reportes
{
    public class Reportes
    {
        [DebuggerNonUserCode]
        public Reportes()
        {
        }

        public static DataSet ObtenerDatos(string Procedimiento, string Filtro)
        {
            DAL accesoDatosModel = new DAL();
            DataSet dataSet1 = accesoDatosModel.GetFilterDataModel(Procedimiento);
            DataSet dataSet2 = new DataSet();
            DataRow[] dataRowArray1 = dataSet1.Tables[0].Select(Filtro);
            dataSet2.Tables.Add(dataSet1.Tables[0].Clone());
            DataRow[] dataRowArray2 = dataRowArray1;
            int index = 0;
            while (index < dataRowArray2.Length)
            {
                DataRow dataRow = dataRowArray2[index];
                DataRow row = dataSet2.Tables[0].NewRow();
                int num = checked(dataSet2.Tables[0].Columns.Count - 1);
                int columnIndex = 0;
                while (columnIndex <= num)
                {
                    row[columnIndex] = RuntimeHelpers.GetObjectValue(dataRow[columnIndex]);
                    checked { ++columnIndex; }
                }
                dataSet2.Tables[0].Rows.Add(row);
                checked { ++index; }
            }
            return dataSet2;
        }

        public static DataSet ObtenerDatosXParametros(string Procedimiento, string Filtro)
        {
            DAL accesoDatosModel = new DAL();
            object[] objArray = (object[])Filtro.Split(',');
            return accesoDatosModel.GetFilterDataModel(Procedimiento, objArray);
        }
    }
}