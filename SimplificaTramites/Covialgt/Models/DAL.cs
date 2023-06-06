using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Data;
using Gisystems.Architecture.DAL;

namespace Covialgt.Models
{
    public class DAL : DController

    {
        //Cadena de conexión para realizar la petición desde webconfig

        String ConnectionSt = ConfigurationManager.ConnectionStrings["SICOPDATA"].ConnectionString;


        //Indica el proveedor de datos que es SQL
        public static DController.DbProvider DataProvider
        {
            get
            {
                return DController.DbProvider.SqlServer;
            }
        }


        //Obtiene datos sin de procedimiento almacenado sin parametros
        public DataSet GetDataModel(string procedimiento)
        {
            return GetData(DataProvider, ConnectionSt, procedimiento);
        }


        //Obtiene un conjunto de datos, filtrado desde la base de datos de acuerdo al procedimiento almacenado especificado y los parámetros
        public DataSet GetFilterDataModel(string procedimiento, params object[] parametros)
        {
            return GetFilteredData(DataProvider, ConnectionSt, procedimiento, parametros);
        }


        //Ejecuta una operación de inserción, modificación ó eliminación en base a los datos y procedimiento almacenado
        //Devuelve el número de filas afectadas
        public int DMLrowModel(string procedimiento, params object[] parametros)
        {
            return DMLrow(DataProvider, ConnectionSt, procedimiento, parametros);
        }

        //Ejecuta una operación de inserción, modificación ó eliminación en base a los datos y 
        //procedimiento almacenado tomando en cuenta la respectiva transaccion
        //Devuelve el número de filas afectadas
        //public int DMLrowTransactModel(string procedimiento, System.Data.Common.DbTransaction transaccion, params object[] parametros)
        //{
        //    return DMLrowTransact(DataProvider, ConnectionSt, transaccion, procedimiento, parametros);
        //}


        //Ejecuta una operación de inserción, modificación ó eliminación en base a los datos y procedimiento almacenado,
        //devolviendo datos de salida y tomando en cuenta la respectiva transaccion

        public int DMLrowTransactModel(string procedimiento,
                                       System.Data.Common.DbCommand dbCommand,
                                       Object[] datosEntrada,
                                       Object[] datosSalida,
                                       System.Data.Common.DbTransaction transaccion = null)
        {

            return DMLrowTransact(DataProvider, ConnectionSt, transaccion, procedimiento, datosEntrada);
        }

        public int DMLrowTransactReturnsData(string procedimiento,
                                      System.Data.Common.DbCommand dbCommand,
                                      Object[] datosEntrada,
                                      Object[] datosSalida,
                                      System.Data.Common.DbTransaction transaccion = null)
        {

            return DMLrowTransact(DataProvider, ConnectionSt, procedimiento, dbCommand, datosEntrada, datosSalida, transaccion);
        }


        public int DMLtableModel(string usuario, DataTable tabla, params string[] parametros)
        {
            return DMLtable(DataProvider, ConnectionSt, usuario, tabla, parametros);
        }

        public int DMLtableTransactModel(System.Data.Common.DbTransaction transaccion,
                                          string usuario,
                                          DataTable tabla,
                                          params string[] parametros)
        {
            return DMLtableTransact(DataProvider, ConnectionSt, transaccion, usuario, tabla, parametros);
        }

        public System.Data.Common.DbCommand ObtenerBDComandoModel(string procedimiento)
        {
            return ObtenerBDComando(DataProvider, ConnectionSt, procedimiento);
        }

        public static System.Data.Common.DbTransaction IniciarTransac(IsolationLevel nivelAislamiento = IsolationLevel.ReadCommitted)
        {
            return IniciarTransaccion(DataProvider, ConfigurationManager.ConnectionStrings["SICOPDATA"].ConnectionString, nivelAislamiento);
        }


        public void FinalizarTransac(System.Data.Common.DbTransaction transaccion, Boolean aceptarOperaciones)
        {
            FinalizarTransaccion(transaccion, aceptarOperaciones);
        }
    }
}