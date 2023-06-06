function listaParaComboEstadoActual() {
    let posiblesEstados = [];

    //if (rolAsignaDevengado) {
    //    posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
    //    posiblesEstados.push({ id: 40, txt: 'Devengado', });
    //}

  
    if (rolTrasladoFinanciero) {
        posiblesEstados.push({ id: 41, txt: 'Digitalizado, a espera de recepción D.Financiero', });
    } else {
        if (rolReceptorDeVisa || rolCoordinadorDeVisa) {
            posiblesEstados.push({ id: 1, txt: 'No Presentado', });
            posiblesEstados.push({ id: 2, txt: 'Presentado en Visa', });
            posiblesEstados.push({ id: 3, txt: 'Asignada a Visor', });
            posiblesEstados.push({ id: 18, txt: 'No procede anterior en proceso de revisión', });
            posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
            posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', });
            posiblesEstados.push({ id: 24, txt: 'Firma Autorizada Visa', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }

        if (rolRegionales || rolIngenieroControlSeguimiento || rolSubdirectorTEC) {
            posiblesEstados.push({ id: 15, txt: 'Trasladado a Auxiliar Sub. Técnica', });
            posiblesEstados.push({ id: 22, txt: 'Regional C.& S.', });
            posiblesEstados.push({ id: 23, txt: 'Firma Sub-Director Técnico', });
            posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica', });
        }

        if (rolDigitalizador) {
            posiblesEstados.push({ id: 43, txt: 'Por recibir Depto. Informática', });
            posiblesEstados.push({ id: 27, txt: 'Firmada Por SDT,  En Digitalización', });
        }

        if (rolAuxiliarTecnico && !rolDigitalizador && rolAsistenteSubdireccion) {
            posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
            posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
            posiblesEstados.push({ id: 21, txt: 'Reparada por Decisión Técnica', });
            posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica', });
            posiblesEstados.push({ id: 8, txt: 'Reparado Sub. Técnica no Retirado', });
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
            posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
            posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
            posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
        }

        if (rolAuxiliarTecnico2) {
            posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
        }

        if (rolReceptorFinanciero) {
            posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
            posiblesEstados.push({ id: 10, txt: 'Reparado en Financiero no Retirado', });
            posiblesEstados.push({ id: 11, txt: 'Listo para Pago sin Nómina', });
            posiblesEstados.push({ id: 12, txt: 'Asignado a Nómina no Aprobada', });
            posiblesEstados.push({ id: 13, txt: 'Asignado a Nómina Aprobada', });
            posiblesEstados.push({ id: 14, txt: 'Pagado', });
            posiblesEstados.push({ id: 17, txt: 'Pagado Parcialmente', });
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
        }

        if (rolAsistenteSubdireccion) {
            posiblesEstados.push({ id: 23, txt: 'Firma Sub-Director Técnico', });
        }    
    }
    if (rolAdministrador) {
        posiblesEstados.push({ id: 1, txt: 'No Presentado', });
        posiblesEstados.push({ id: 2, txt: 'Presentado en Visa', });
        posiblesEstados.push({ id: 3, txt: 'Asignada a Visor', });
        posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
        posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
        posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', });
        posiblesEstados.push({ id: 8, txt: 'Reparado Sub. Técnica no Retirado', });
        posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica', });
        posiblesEstados.push({ id: 10, txt: 'Reparado en Financiero no Retirado', });
        posiblesEstados.push({ id: 11, txt: 'Listo para Pago sin Nómina', });
        posiblesEstados.push({ id: 12, txt: 'Asignado a Nómina no Aprobada', });
        posiblesEstados.push({ id: 13, txt: 'Asignado a Nómina Aprobada', });
        posiblesEstados.push({ id: 14, txt: 'Pagado', });
        posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
        posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
        posiblesEstados.push({ id: 17, txt: 'Pagado Parcialmente', });
        posiblesEstados.push({ id: 18, txt: 'No procede, anterior en proceso de revisión', });
        posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
        posiblesEstados.push({ id: 21, txt: 'Reparada por Decisión Técnica', });
        posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
        posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
        posiblesEstados.push({ id: 24, txt: 'Firma Autorizada Visa', });
        posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        posiblesEstados.push({ id: 27, txt: 'Firmada Por SDT, En Digitalización', });
    }
   


    return posiblesEstados;
}

function listaParaComboNuevoEstado(idEstadoActual) {
    let posiblesEstados = [];

    //if (rolAsignaDevengado) {
    //    if (idEstadoActual == 16) {
    //        posiblesEstados.push({ id: 40, txt: 'Devengado', });
    //    }
    //    if (idEstadoActual == 40) {
    //        posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
    //    }                
    //}

    if (rolAdministrador) {
        if (idEstadoActual == 1) {                        
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 2, txt: 'Presentado en Visa', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }
        
        if (idEstadoActual == 2) {            
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);
            
            posiblesEstados.push({ id: 1, txt: 'No Presentado', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }

        if (idEstadoActual == 3) {            
            //cambio de false a true y estado 25 por visor de técnicos
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }

        if (idEstadoActual == 4) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);
            
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }

        if (idEstadoActual == 5) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 3, txt: 'Asignado a Visor', });
            posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
            posiblesEstados.push({ id: 8, txt: 'Observada Sub. Técnica no Retirada', });
            posiblesEstados.push({ id: 10, txt: 'Observada Retirada', });
            posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
            posiblesEstados.push({ id: 24, txt: 'Firma Autorizada Visa', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }

        if (idEstadoActual == 6) {
            $("#estadoSelect").prop("disabled", true);
            $("#btnAsignarEstado").prop("disabled", true);
        }

        if (idEstadoActual == 8) {            
            posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });            
        }

        if (idEstadoActual == 9) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 10, txt: 'Documento Observado en Financiero no Retirado', });
            posiblesEstados.push({ id: 11, txt: 'Documento Listo para Pago', });
            posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
        }

        if (idEstadoActual == 10) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 5, txt: 'Documento Observado Retirada', });
            posiblesEstados.push({ id: 9, txt: 'Documento Recibido Financiero', });
        }

        if (idEstadoActual == 11 || idEstadoActual == 12 || idEstadoActual == 14) {
            $("#estadoSelect").prop("disabled", true);
            $("#btnAsignarEstado").prop("disabled", true);
        }

        if (idEstadoActual == 13) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 14, txt: 'Pagada', });            
        }

        if (idEstadoActual == 15) {            
            posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', }); // NUEVO ESTADO
            posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', }); //Cambio por solicitud de AUXILIAR TÉCNICO PARA REGRESAR REGISTROS ESTIMACIONES A VISA        
            posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
            posiblesEstados.push({ id: 8, txt: 'Reparado Sub. Técnica no Retirado', });
            posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
        }

        if (idEstadoActual == 16) {
            $("#estadoSelect").prop("disabled", true);
            $("#btnAsignarEstado").prop("disabled", true);
        }

        if (idEstadoActual == 18) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 3, txt: 'Asignado a Visor', });
            posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }
        

        if (idEstadoActual == 20) {
            posiblesEstados.push({ id: 21, txt: 'Reparada por Decisión Técnica', });
            posiblesEstados.push({ id: 9, txt: 'Aprobada Sub. Técnica', });
            posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
            posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
        }

        if (idEstadoActual == 21) {
            posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
        }
        
        if (idEstadoActual == 22) {
            posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
            posiblesEstados.push({ id: 8, txt: 'Reparado Sub. Técnica no Retirado', });
            posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
        }
        
        if (idEstadoActual == 23) {
            posiblesEstados.push({ id: 27, txt: 'Firmada Por SDT, En Digitalización', });
        }

        if (idEstadoActual == 24) {
            $("#estadoSelect").prop("disabled", false);
            $("#btnAsignarEstado").prop("disabled", false);

            posiblesEstados.push({ id: 3, txt: 'Asignado a Visor', });
            posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
            posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', });
            posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
        }

        if (idEstadoActual == 25) {
            $("#estadoSelect").prop("disabled", true);
            $("#btnAsignarEstado").prop("disabled", true);
        }

        if (idEstadoActual == 27) {
            posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
            posiblesEstados.push({ id: 8, txt: 'Observada Sub. Técnica no Retirada (Obsoleto)', });
            posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', }); //Cambio por solicitud de AUXILIAR TÉCNICO PARA REGRESAR REGISTROS ESTIMACIONES A VISA
            posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica ', });
            posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
            posiblesEstados.push({ id: 27, txt: 'Firmada Por SDT,  En Digitalización', });
            posiblesEstados.push({ id: 41, txt: 'Digitalizado,  a espera de recepción D.Financiero', });
        }

        if (idEstadoActual == 39) {         
            posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica', });
        }

        if (idEstadoActual == 41) {
            posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
        }

        $("#card-reporte").show();
    //Hasta acá el IF if (rolAdministrador)
    } else {
        if (rolDigitalizador) {
            if (idEstadoActual == 43) {
                posiblesEstados.push({ id: 27, txt: 'Firmada Por SDT, En Digitalización', });
            }
            if (idEstadoActual == 27) {
                posiblesEstados.push({ id: 41, txt: 'Digitalizado, por recibir Depto. Financiero', });
            }
            $("#card-reporte").show();
        }

        if (rolTrasladoFinanciero) {
            if (idEstadoActual == 41) {
                posiblesEstados.push({ id: 16, txt: 'Trasladado a Depto. Financiero', });
            }
            $("#card-reporte").show();
        }

        if (rolReceptorDeVisa || rolCoordinadorDeVisa) {
            if (idEstadoActual == 1) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);

                posiblesEstados.push({ id: 2, txt: 'Presentado en Visa', });
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 2) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);

                posiblesEstados.push({ id: 1, txt: 'No Presentado', });
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 3) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);                
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 4) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 5) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 3, txt: 'Asignado a Visor', });
                posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
                posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
                posiblesEstados.push({ id: 24, txt: 'Firma Autorizada Visa', });
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 18) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 3, txt: 'Asignado a Visor', });
                posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 6) {
                $("#estadoSelect").prop("disabled", true);
                $("#btnAsignarEstado").prop("disabled", true);
            }

            if (idEstadoActual == 24) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 3, txt: 'Asignado a Visor', });
                posiblesEstados.push({ id: 4, txt: 'Reparado en Visa no Retirado', });
                posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', });
                posiblesEstados.push({ id: 25, txt: 'Asignado a Regional Técnico Visor', });
            }

            if (idEstadoActual == 25) {
                $("#estadoSelect").prop("disabled", true);
                $("#btnAsignarEstado").prop("disabled", true);
            }
        }  //if (RolReceptorDeVisa || RolCoordinadorDeVisa) {

        if (rolAsistenteSubdireccion) {
            if (idEstadoActual == 23) {
                $("#card-reporte").show();

                posiblesEstados.push({ id: 43, txt: 'Por recibir Depto. Informática', });
            }
        } //if (RolAsistenteSubdireccion) {

        if (rolAuxiliarTecnico2) {
            if (idEstadoActual == 22) {
                posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
            }
        }  //if (RolAuxiliarTecnico2) {

        if (rolAuxiliarTecnico) {
            if (idEstadoActual == 15) {
                posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });  //NUEVO ESTADO
                posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', }); //Cambio por solicitud de AUXILIAR TÉCNICO PARA REGRESAR REGISTROS ESTIMACIONES A VISA        
                posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
                posiblesEstados.push({ id: 8, txt: 'Reparado Sub. Técnica no Retirado', });
                posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });

            }

            if (idEstadoActual == 27) {
                posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });  //NUEVO ESTADO
                posiblesEstados.push({ id: 8, txt: 'Observada Sub. Técnica no Retirada (Obsoleto)', });
                posiblesEstados.push({ id: 6, txt: 'En Sello de Visa', });  //Cambio por solicitud de AUXILIAR TÉCNICO PARA REGRESAR REGISTROS ESTIMACIONES A VISA
                posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica ', });
                posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
                posiblesEstados.push({ id: 27, txt: 'Firmada Por SDT,  En Digitalización', });
                posiblesEstados.push({ id: 41, txt: 'Digitalizado,  a espera de recepción D.Financiero', });
            }

            if (idEstadoActual == 22) {
                posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
                posiblesEstados.push({ id: 8, txt: 'Observada Sub. Técnica no Retirado', });
                posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
            }

            if (idEstadoActual == 39) {
                posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica', });
            }

            if (idEstadoActual == 8) {
                posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
                posiblesEstados.push({ id: 5, txt: 'Reparado con Contratista', });
            }

            if (idEstadoActual == 9) {
                posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
            }

            if (idEstadoActual == 5) {
                posiblesEstados.push({ id: 15, txt: 'Trasladado a Sub. Técnica', });
                posiblesEstados.push({ id: 8, txt: 'Observada Sub. Técnica no Retirada', });
            }

            if (idEstadoActual == 20) {
                posiblesEstados.push({ id: 21, txt: 'Reparada por Decisión Técnica', });
                posiblesEstados.push({ id: 9, txt: 'Aprobado Sub. Técnica', });
                posiblesEstados.push({ id: 22, txt: 'Control y Seguimiento Tecnico', });
                posiblesEstados.push({ id: 23, txt: 'Sub-Direccion Tecnico (Firma)', });
            }

            if (idEstadoActual == 21) {
                posiblesEstados.push({ id: 20, txt: 'En Revisión Técnica', });
            }

            if (idEstadoActual == 16) {
                $("#estadoSelect").prop("disabled", true);
                $("#btnAsignarEstado").prop("disabled", true);
            }
        } //if (RolAuxiliarTecnico && !RolDigitalizador && RolAsistenteSubdireccion)

        if (rolReceptorFinanciero) {
            if (idEstadoActual == 9) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 10, txt: 'Documento Observado en Financiero no Retirado', });
                posiblesEstados.push({ id: 11, txt: 'Documento Listo para Pago', });
            }

            if (idEstadoActual == 10) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 5, txt: 'Documento Observado Retirada', });
                posiblesEstados.push({ id: 9, txt: 'Documento Recibido Financiero', });
            }

            if (idEstadoActual == 11 || idEstadoActual == 12 || idEstadoActual == 14) {
                $("#estadoSelect").prop("disabled", true);
                $("#btnAsignarEstado").prop("disabled", true);
            }

            if (idEstadoActual == 13) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 14, txt: 'Pagada', });
            }

            if (idEstadoActual == 5) {
                $("#estadoSelect").prop("disabled", false);
                $("#btnAsignarEstado").prop("disabled", false);
                posiblesEstados.push({ id: 10, txt: 'Observada Retirada', });
            }
        }  //if (RolReceptorFinanciero) {

        if (rolRegionales || rolIngenieroControlSeguimiento || rolSubdirectorTEC) {
            if (idEstadoActual == 15
                || idEstadoActual == 22
                || idEstadoActual == 23
                || idEstadoActual == 9) {
                posiblesEstados.push({ id: 8, txt: 'Reparado Sub. Técnica no Retirado', });
            }
        } // if (RolRegionales || RolIngenieroControlSeguimiento || RolSubdirectorTEC) 

    }

    return posiblesEstados;
}

