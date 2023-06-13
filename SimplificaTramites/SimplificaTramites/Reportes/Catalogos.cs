using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using SimplificaTramites.Models;

namespace SimplificaTramites.Reportes
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
        /// <returns></returns>
        /// <remarks></remarks>
        public static DataSet ObtenerTodos(string Procedimiento) => SimplificaTramites.Reportes.DALSICOP.Catalogos.ObtenerTodos(Procedimiento);

        /// <summary>
        /// Obtiene una fila de datos en base a la funcionalidad del procedimiento almacenado especificado
        /// </summary>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <param name="Datos">Arreglo de tipo objeto que contiene los datos de la llave primaria</param>
        /// <returns>Devuelve una fila de resultado</returns>
        /// <remarks></remarks>
        /// 
       
        public static DataSet ObtenerUno(string Procedimiento, params object[] Datos)
        {
            DAL accesoDatosModel = new DAL();
            return accesoDatosModel.GetFilterDataModel(Procedimiento, Datos);
        }

        /// <summary>Ejecuta una actualización de los datos almacenados en un DataTable</summary>
        /// <param name="Usuario">Nombre del usuario que efectuara las operaciones</param>
        /// <param name="Procedimientos">Nombre de los procedimientos almacenados a invocar</param>
        /// <param name="tabla">DataTable que contiene los datos a actualizar</param>
        /// <returns>Retorna el numero de errores durante las operaciones</returns>
        /// <remarks></remarks>
        public static int Operacion(string Usuario, DataTable tabla, params string[] Procedimientos)
        {
            int num1 = 0;
            int num2 = 0;
            List<object> objectList = new List<object>();
            DataTable dataTable = tabla.Copy();
            dataTable.RejectChanges();
            try
            {
                foreach (DataRow row in tabla.Rows)
                {
                    objectList.Clear();
                    objectList.Add((object)Usuario);
                    if (row.RowState != DataRowState.Deleted & row.RowState != DataRowState.Unchanged)
                    {
                        object[] itemArray = row.ItemArray;
                        int index = 0;
                        while (index < itemArray.Length)
                        {
                            object objectValue = RuntimeHelpers.GetObjectValue(itemArray[index]);
                            objectList.Add(RuntimeHelpers.GetObjectValue(objectValue));
                            checked { ++index; }
                        }
                    }
                    checked { ++num1; }
                    Catalogos.TipoOperacion tipoOperacion;
                    switch (row.RowState)
                    {
                        case DataRowState.Added:
                            tipoOperacion = Catalogos.TipoOperacion.Agregar;
                            break;
                        case DataRowState.Deleted:
                            int num3 = checked(dataTable.Columns.Count - 1);
                            int columnIndex = 0;
                            while (columnIndex <= num3)
                            {
                                objectList.Add(RuntimeHelpers.GetObjectValue(dataTable.Rows[checked(num1 - 1)][columnIndex]));
                                checked { ++columnIndex; }
                            }
                            tipoOperacion = Catalogos.TipoOperacion.Eliminar;
                            break;
                        case DataRowState.Modified:
                            tipoOperacion = Catalogos.TipoOperacion.Modificar;
                            break;
                        default:
                          
                            continue;
                    }
                    if (SimplificaTramites.Reportes.DALSICOP.Catalogos.Operacion(Procedimientos[(int)tipoOperacion], objectList.ToArray()) == 0)
                        checked { ++num2; }
                    continue;
                }
            }
            finally
            {
                IEnumerator enumerator=null;
                if (enumerator is IDisposable)
                    (enumerator as IDisposable).Dispose();
            }
            if (num2 == 0)
                tabla.AcceptChanges();
            else
                tabla.Dispose();
            return num2;
        }

        /// <summary>Ejecuta una actualización de los datos almacenados en un DataTable</summary>
        /// <param name="Procedimientos">Nombre de los procedimientos almacenados a invocar</param>
        /// <param name="tabla">DataTable que contiene los datos a actualizar</param>
        /// <returns></returns>
        /// <remarks></remarks>
        public static int Operacion(DataTable tabla, params string[] Procedimientos)
        {
            int num1 = 0;
            int num2 = 0;
            List<object> objectList = new List<object>();
            DataTable dataTable = tabla.Copy();
            dataTable.RejectChanges();
            try
            {
                foreach (DataRow row in tabla.Rows)
                {
                    objectList.Clear();
                    if (row.RowState != DataRowState.Deleted & row.RowState != DataRowState.Unchanged)
                    {
                        object[] itemArray = row.ItemArray;
                        int index = 0;
                        while (index < itemArray.Length)
                        {
                            object objectValue = RuntimeHelpers.GetObjectValue(itemArray[index]);
                            if (objectValue != DBNull.Value)
                                objectList.Add(RuntimeHelpers.GetObjectValue(objectValue));
                            checked { ++index; }
                        }
                    }
                    checked { ++num1; }
                    Catalogos.TipoOperacion tipoOperacion;
                    switch (row.RowState)
                    {
                        case DataRowState.Added:
                            tipoOperacion = Catalogos.TipoOperacion.Agregar;
                            break;
                        case DataRowState.Deleted:
                            objectList.Add(RuntimeHelpers.GetObjectValue(dataTable.Rows[checked(num1 - 1)][0]));
                            tipoOperacion = Catalogos.TipoOperacion.Eliminar;
                            break;
                        case DataRowState.Modified:
                            tipoOperacion = Catalogos.TipoOperacion.Modificar;
                            break;
                        default:
                           
                            continue;
                    }
                    if (SimplificaTramites.Reportes.DALSICOP.Catalogos.Operacion(Procedimientos[(int)tipoOperacion], objectList.ToArray()) == 0)
                        checked { ++num2; }
                    continue;
                }
            }
            finally
            {
                IEnumerator enumerator=null;
                if (enumerator is IDisposable)
                    (enumerator as IDisposable).Dispose();
            }
            if (num2 == 0)
                tabla.AcceptChanges();
            else
                tabla.Dispose();
            return num2;
        }

        /// <summary>Ejecuta una actualización de los datos almacenados en un DataTable</summary>
        /// <param name="Transaccion">Transaccion a la cual se asociaran las operaciones a efectuar</param>
        /// <param name="Usuario">Nombre del usuario que efectuara las operaciones</param>
        /// <param name="Procedimientos">Nombre de los procedimientos almacenados a invocar</param>
        /// <param name="tabla">DataTable que contiene los datos a actualizar</param>
        /// <returns>Retorna el numero de errores durante las operaciones</returns>
        /// <remarks></remarks>
        public static int Operacion(
          DbTransaction Transaccion,
          string Usuario,
          DataTable tabla,
          params string[] Procedimientos)
        {
            int num1 = 0;
            int num2 = 0;
            List<object> objectList = new List<object>();
            DataTable dataTable = tabla.Copy();
            dataTable.RejectChanges();
            try
            {
                foreach (DataRow row in tabla.Rows)
                {
                    objectList.Clear();
                    objectList.Add((object)Usuario);
                    if (row.RowState != DataRowState.Deleted & row.RowState != DataRowState.Unchanged)
                    {
                        object[] itemArray = row.ItemArray;
                        int index = 0;
                        while (index < itemArray.Length)
                        {
                            object objectValue = RuntimeHelpers.GetObjectValue(itemArray[index]);
                            objectList.Add(RuntimeHelpers.GetObjectValue(objectValue));
                            checked { ++index; }
                        }
                    }
                    checked { ++num1; }
                    Catalogos.TipoOperacion tipoOperacion;
                    switch (row.RowState)
                    {
                        case DataRowState.Added:
                            tipoOperacion = Catalogos.TipoOperacion.Agregar;
                            break;
                        case DataRowState.Deleted:
                            int num3 = checked(dataTable.Columns.Count - 1);
                            int columnIndex = 0;
                            while (columnIndex <= num3)
                            {
                                objectList.Add(RuntimeHelpers.GetObjectValue(dataTable.Rows[checked(num1 - 1)][columnIndex]));
                                checked { ++columnIndex; }
                            }
                            tipoOperacion = Catalogos.TipoOperacion.Eliminar;
                            break;
                        case DataRowState.Modified:
                            tipoOperacion = Catalogos.TipoOperacion.Modificar;
                            break;
                        default:
                            
                            continue;
                    }
                    if (SimplificaTramites.Reportes.DALSICOP.Catalogos.Operacion(Transaccion, Procedimientos[(int)tipoOperacion], objectList.ToArray()) == 0)
                        checked { ++num2; }
                     continue;
                }
            }
            finally
            {
                IEnumerator enumerator=null;
                if (enumerator is IDisposable)
                    (enumerator as IDisposable).Dispose();
            }
            if (num2 == 0)
                tabla.AcceptChanges();
            else
                tabla.Dispose();
            return num2;
        }

        /// <summary>Ejecuta una actualización en la base de datos de una sola fila</summary>
        /// <param name="Procedimiento">Nombre del procedimiento almacenado a invocar</param>
        /// <param name="Datos">Lod datos a actualizar pertenecientes a una fila</param>
        /// <returns></returns>
        /// <remarks></remarks>
        public static int Operacion(string Procedimiento, params object[] Datos) => SimplificaTramites.Reportes.DALSICOP.Catalogos.Operacion(Procedimiento, Datos);

        private enum TipoOperacion
        {
            Agregar,
            Modificar,
            Eliminar,
        }
    }
}
