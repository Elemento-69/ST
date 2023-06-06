<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ActaNotarialRecepcion.aspx.cs" Inherits="Covialgt.InformesTecnicos.ActaNotarialRecepcion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <h1>Informes Técnicos</h1>
    <hr class="thick"/>
    <br />
    <h4>Acta Notarial de Recepción</h4>
    <div class="card custom-card border-0 mt-3">
        <div class="card-body">
            <div class="row big-gutter justify-content-center my-auto">
                <div class="form-group col-md-6">
                    <label for="proyecto">Categoría del Proyecto</label>
                    <select class="form-control" id="proyecto" name="proyecto">
                        <option>Seleccione una Categoría</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="hasta">Fecha:</label>
                    <div class="input-group date" id="fecha-db" data-target-input="nearest">
                        <input id="fecha" type="text" name="hasta" autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#fecha" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="departamento">Departamento</label>
                    <input type="text" class="form-control" id="departamento" name="departamento" placeholder="Ingresar Departamento">
                </div>
                <div class="form-group col-md-6">
                    <label for="municipio">Municipio</label>
                    <input type="text" class="form-control" id="municipio" name="municipio" placeholder="Ingresar Municipio">
                </div>
                <div class="form-group col-md-7 col-lg-6">
                    <label for="proyecto">Hora</label>
                    <div class="row">
                        <div class="col-8 col-sm-4 mb-3 mb-sm-0">
                            <select class="form-control" id="hora" name="hora">
                                <option>01</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="d-inline pt-2">Horas</div>
                         <div class="col-8 col-sm-4">
                            <select class="form-control" id="minutos" name="minutos">
                                <option>00</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="d-inline pt-2">
                            Minutos
                        </div>
                    </div>
                </div>
                <div class=" col-md-5 col-lg-6">
                    <label for="direccion">Dirección(En Letras)</label>
                    <input type="text" class="form-control" id="direccion" name="direccion" placeholder="Ejemplo: dieciséis calle cero guión treinta zona uno.">
                </div>
                <div class="form-group col-md-6">
                    <label for="notario">Nombre Notario Acta</label>
                    <input type="text" class="form-control" id="notario" name="notario" placeholder="Ingresar Notario Acta">
                </div>
                <div class="form-group col-md-6">
                    <label for="departamento">Superintendente</label>
                    <input type="text" class="form-control" id="superintendente" name="superintendente">
                </div>
                <div class="form-group col-md-6">
                    <label for="notarioProyecto">Notario Proyecto</label>
                    <input type="text" class="form-control" id="notarioProyecto" name="notarioProyecto" placeholder="Ingresar Notario Proyecto">
                </div>
                <div class="form-group col-md-6">
                    <label for="supervisorRegional">Supervisor Regional</label>
                    <input type="text" class="form-control" id="supervisorRegional" name="supervisorRegional" placeholder="Ingresar Supervisor Regional">
                </div>
                <div class="col-12">
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Es Empresa</label>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="cargoEmpresa">Nombre Persona que Actua a Cargo de Empresa</label>
                    <input type="text" class="form-control" id="cargoEmpresa" name="cargoEmpresa">
                </div>
                <div class="form-group col-md-6">
                    <label for="cargoPersona">Cargo Persona que Actua a Cargo Empresa</label>
                    <select class="form-control" id="cargoPersona" name="cargoPersona">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>Codigo Nombramiento</label>
                    <div class="row">
                        <div class="col-4 pr-0 my-2">
                            <label>No. SDT-COVIAL-</label>
                        </div>
                        <div class="col-4 px-0">
                            <input type="text" class="form-control" id="codigoCovial" name="codigoCovial">
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" id="codigoCovial" name="codigoCovial">
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="fechaInspeccion">Fecha Nombramiento</label>
                    <div class="input-group date" id="fechaInspeccion-dp" data-target-input="nearest">
                        <input id="hasta" type="text" name="fechaInspeccion" autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#fechaInspeccion-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="directorTecnico">Nombre Sub-Director-Técnico</label>
                    <input type="text" class="form-control" id="directorTecnico" name="directorTecnico">
                </div>
                <div class="form-group col-md-6">
                    <label for="hasta">Fecha Inspeccion</label>
                    <div class="input-group date" id="inspeccionFecha" data-target-input="nearest">
                        <input id="fechaInspeccion" type="text" name="fechaFinalInspeccion" autocomplete="off" class="form-control" placeholder="Ingresar Fecha Inspeccion">
                        <div class="input-group-append" data-target="#fechaFinalInspeccion" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="fechaInicio">Fecha Inicio</label>
                    <div class="input-group date" id="fechaInicio-dp" data-target-input="nearest">
                        <input id="fechaInicio" type="text" name="fechaInicio" autocomplete="off" class="form-control" placeholder="Ingresar Fecha Inicio">
                        <div class="input-group-append" data-target="#fechaInicio-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="fechaInicio">Fecha Final</label>
                    <div class="input-group date" id="fechaFinal-dp" data-target-input="nearest">
                        <input id="fechaFinal2" type="text" name="fechaInicio" autocomplete="off" class="form-control" placeholder="Ingresar Fecha Final">
                        <div class="input-group-append" data-target="#fechaFinal-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="clase">Clase</label>
                    <input type="text" class="form-control" id="clase" name="clase" placeholder="Ingresar Clase">
                </div>
                <div class="form-group col-md-6">
                    <label for="poliza">Poliza</label>
                    <input type="text" class="form-control" id="poliza" name="poliza" placeholder="Ingresar Poliza">
                </div>
                <div class="form-group col-md-6">
                    <label for="aseguradora">Aseguradora</label>
                    <input type="text" class="form-control" id="aseguradora" name="aseguradora">
                </div>
                <div class="form-group col-md-6">
                    <label for="valorPoliza">Valor Poliza</label>
                    <input type="text" class="form-control" id="valorPoliza" name="valorPoliza" placeholder="Ingresar Valor Acta">
                </div>
                <div class="form-group col-md-6">
                    <label for="minutosActa">Minutos después de inicio de acta</label>
                    <select class="form-control" id="minutosActa" name="minutosActa">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div class="col-md-6 py-4">
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheckFianza">
                        <label class="custom-control-label" for="customCheckFianza">Fianza de Conservacion de Obra</label>
                    </div>
                </div>
                <div class="col-12 mt-5">
                    <button type="submit" class="btn btn-primary btn-form float-right">GUARDAR</button>
                </div>
            </div>
            <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4">
                <thead>
                    <tr>
                         <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Fecha Acta</th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Proyecto Codigo</th>
                        <th class="text-center">Acta</th>
                        <th class="text-center">Descripcion Proyecto</th>
                         <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center td-custom">
                        <td class="spacer bg-light"></td>
                        <td>
                            <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-trash fa-lg fa-fw"></i>
                            </a>
                            <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-print fa-lg fa-fw"></i>
                            </a>
                        </td>
                        <td>25/11/2015 12:00:00 a.m.</td>
                        <td>2015</td>
                        <td>T-024</td>
                        <td>Acta-2015-T-024</td>
                        <td></td>
                        <td class="spacer bg-light"></td>
                    </tr>
                    <tr class="text-center td-custom">
                        <td class="spacer bg-light"></td>
                        <td>
                            <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-trash fa-lg fa-fw"></i>
                            </a>
                            <a href="#" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-print fa-lg fa-fw"></i>
                            </a>
                        </td>
                        <td>25/11/2015 12:00:00 a.m.</td>
                        <td>2015</td>
                        <td>T-024</td>
                        <td>Acta-2015-T-024</td>
                        <td></td>
                        <td class="spacer bg-light"></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
</asp:Content>
