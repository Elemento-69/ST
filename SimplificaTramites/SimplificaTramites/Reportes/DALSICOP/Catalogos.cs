using Microsoft.Practices.EnterpriseLibrary.Data;
//using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace SimplificaTramites.Reportes.DALSICOP
{
    public class Catalogos
    {
        [DebuggerNonUserCode]
        public Catalogos()
        {
        }

        /// <summary>
        /// Obtiene un conjunto de datos en base a la funcionalidad del procedimiento almacenado especificado
        /// </summary>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <returns>Devuelve un conjunto de resultados</returns>
        /// <remarks></remarks>
        public static DataSet ObtenerTodos(string Procedimiento) => DatabaseFactory.CreateDatabase().ExecuteDataSet(Procedimiento);

        /// <summary>
        /// Obtiene una fila de datos en base a la funcionalidad del procedimiento almacenado especificado
        /// </summary>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <param name="Datos">Arreglo de tipo objeto que contiene los datos de la llave primaria</param>
        /// <returns>Devuelve una fila de resultado</returns>
        /// <remarks></remarks>
        public static DataSet ObtenerUno(string Procedimiento, params object[] Datos) => DatabaseFactory.CreateDatabase().ExecuteDataSet(Procedimiento, Datos);

        /// <summary>
        /// Ejecuta una operación de inserción, modificación ó eliminación en base a los datos y procedimiento almacenado
        /// </summary>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <param name="Datos">Arreglo de tipo objeto que contiene los datos a actualizar</param>
        /// <returns>Devuelve el número de filas afectadas</returns>
        /// <remarks></remarks>
        public static int Operacion(string Procedimiento, params object[] Datos) => DatabaseFactory.CreateDatabase().ExecuteNonQuery(Procedimiento, Datos);

        /// <summary>
        /// Ejecuta una operación de inserción, modificación ó eliminación en base a los datos y procedimiento almacenado
        /// </summary>
        /// <param name="Transaccion">Interfaz que representa una transaccion, que sera utilizada para realizar operaciones en la base de datos de manera transaccional</param>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <param name="Datos">Arreglo de tipo objeto que contiene los datos a actualizar</param>
        /// <returns>Devuelve el número de filas afectadas</returns>
        /// <remarks></remarks>
        public static int Operacion(
          DbTransaction Transaccion,
          string Procedimiento,
          params object[] Datos)
        {
            return DatabaseFactory.CreateDatabase().ExecuteNonQuery(Transaccion, Procedimiento, Datos);
        }

        /// <summary>
        /// Ejecuta una operación de inserción, modificación ó eliminación en base a los datos y procedimiento almacenado
        /// </summary>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <param name="dbCommand">Objeto Comando necesario para obtener la informacion del procedimiento almacenado estipulado</param>
        /// <param name="DatosEntrada">Arreglo de tipo objeto que contiene los datos a actualizar</param>
        /// <param name="DatosSalida">Arreglo de tipo objeto que contiene los datos a actualizar</param>
        /// <param name="Transaccion">Interfaz que representa una transaccion opcional, que sera utilizada para realizar operaciones en la base de datos de manera transaccional, si no se especifica el valor por defecto es Nothing</param>
        /// <returns>Devuelve el número de filas afectadas</returns>
        /// <remarks></remarks>
        public static int Operacion(
          string Procedimiento,
          DbCommand dbCommand,
          object[] DatosEntrada,
          ref object[] DatosSalida,
          DbTransaction Transaccion = null)
        {
            Database database = DatabaseFactory.CreateDatabase();
            int index1 = 0;
            int index2 = 0;
            try
            {
                foreach (DbParameter parameter in dbCommand.Parameters)
                {
                    switch (parameter.Direction)
                    {
                        case ParameterDirection.Input:
                            parameter.Value = RuntimeHelpers.GetObjectValue(DatosEntrada[index1]);
                            checked { ++index1; }
                            break;
                        case ParameterDirection.InputOutput:
                            parameter.Value = RuntimeHelpers.GetObjectValue(DatosSalida[index2]);
                            checked { ++index2; }
                            break;
                    }
                }
            }
            finally
            {
                IEnumerator enumerator=null;
                if (enumerator is IDisposable)
                    (enumerator as IDisposable).Dispose();
            }
            int num = Transaccion != null ? database.ExecuteNonQuery(dbCommand, Transaccion) : database.ExecuteNonQuery(dbCommand);
            int index3 = 0;
            try
            {
                foreach (DbParameter parameter in dbCommand.Parameters)
                {
                    if (parameter.Direction == ParameterDirection.InputOutput)
                        DatosSalida[index3] = RuntimeHelpers.GetObjectValue(parameter.Value);
                }
            }
            finally
            {
                IEnumerator enumerator=null;
                if (enumerator is IDisposable)
                    (enumerator as IDisposable).Dispose();
            }
            return num;
        }

        public static DbCommand ObtenerBDComando(string Procedimiento)
        {
            Database database = DatabaseFactory.CreateDatabase();
            DbCommand storedProcCommand = database.GetStoredProcCommand(Procedimiento);
            database.DiscoverParameters(storedProcCommand);
            return storedProcCommand;
        }

        /// <summary>
        /// Funcion que devuelve un objeto transaccion para realizar varias operaciones en una base de datos de manera segura y transaccional
        /// </summary>
        /// <param name="NivelAislamiento">Especifica el comportamiento de bloqueo de la transacción para la conexión. El valor predeterminado es ReadCommited.</param>
        /// <returns>Retorna el objeto transacción que se utilizara para realizar las operaciones seguras.</returns>
        /// <remarks></remarks>
        //public static DbTransaction IniciarTransaccion(IsolationLevel NivelAislamiento = IsolationLevel.ReadCommitted)
        //{
        //    IDbConnection connection = (IDbConnection)DatabaseFactory.CreateDatabase().CreateConnection();
        //    DbTransaction dbTransaction;
        //    try
        //    {
        //        connection.Open();
        //        dbTransaction = (DbTransaction)connection.BeginTransaction(NivelAislamiento);
        //    }
        //    catch (Exception ex)
        //    {
        //        ProjectData.SetProjectError(ex);
        //        throw ex;
        //    }
        //    return dbTransaction;
        //}

        /// <summary>
        /// Finaliza la transaccion especificada ya sea aceptando o rechazando todas las operaciones asociadas
        /// </summary>
        /// <param name="Transaccion">Interfaz que representa una transaccion, que sera utilizada para realizar operaciones en la base de datos de manera transaccional</param>
        /// <param name="AceptarOperaciones">Parametro booleano que indica si las operaciones asociadas a la transaccion se aceptaran o se rechazaran</param>
        /// <remarks></remarks>
        //public static void FinalizarTransaccion(DbTransaction Transaccion, bool AceptarOperaciones)
        //{
        //    DbConnection connection = Transaccion.Connection;
        //    try
        //    {
        //        if (AceptarOperaciones)
        //            Transaccion.Commit();
        //        else
        //            Transaccion.Rollback();
        //    }
        //    catch (Exception ex)
        //    {
        //        ProjectData.SetProjectError(ex);
        //        throw ex;
        //    }
        //    finally
        //    {
        //        connection.Close();
        //    }
        //}
    }
}
