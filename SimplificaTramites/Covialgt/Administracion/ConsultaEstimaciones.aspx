<%@ Page Title="Consulta de Estimaciones" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ConsultaEstimaciones.aspx.cs" Inherits="Covialgt.Administracion.ConsultaEstimaciones" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/DataTables/datatables.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1 class="mb-0">Consulta de Estimaciones</h1>
    <hr class="thick" />
    <div class="row justify-content-between mb-5">
        <div class="col-md-7">
            <div class="form-row mb-3">
                <div class="col-md-4 mt-auto">
                    <label for="PlanAnual" class="mr-1">Plan Anual</label>
                </div>
                <div class="col-md-6">
                    <select id="PlanAnualList" class="form-control">
                        <option>Seleccione año de proyecto</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mt-auto">
                    <label for="ProyectoList">Proyecto o Contrato</label>
                </div>
                <div class="col-md-6">
                    <select class="form-control" id="ProyectoList">
                        <option>Escriba numero de proyecto o contrato</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                </div>
            </div>
        </div>
        <div class="col-md-5 text-right">
            <button type="button" class="btn btn-outline-dark print-button">
                <i class="fas fa-print fa-2x"></i>
                <br />
                Imprimir
            </button>
        </div>
    </div>
    <div class="accordion" id="informacionGeneral">
        <div id="contratistaHeader" class="accordion-header">
            <a class="text-primary h4" brole="button" data-toggle="collapse" data-target="#contratistaCollapse" aria-expanded="true"
                aria-controls="contratistaCollapse">Información del Contratista
                <i class="fas fa-chevron-down fa-fw float-right"></i>
            </a>
        </div>
        <div id="contratistaCollapse" class="collapse mb-4 show" aria-labelledby="contratistaHeader" data-parent="#informacionGeneral">
            <div class="row">
                <div class="col-lg-4 pr-lg-1 mb-3 d-flex">
                    <div class="card rounded-custom shadow-custom">
                        <div class="card-header bg-primary text-white fw-medium fs-6">
                            Información de la Empresa                            
                        </div>
                        <div class="card-body p-2">
                            <h6>"Condial"<small class="text-primary fw-medium"><br />&nbsp;</small></h6>

                            <hr />
                            <dl class="row fs-8">
                                <dt class="col-md-5 pr-1 fw-medium">Representante Legal:</dt>
                                <dd class="col-md-7 pl-1">Hector Rafael Díaz Alarcon</dd>

                                <dt class="col-md-5 pr-1 fw-medium">No. DPI:</dt>
                                <dd class="col-md-7 pl-1">2559-12356-0506</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Teléfonos:</dt>
                                <dd class="col-md-7 pl-1">5598-5965</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Dirección:</dt>
                                <dd class="col-md-7 pl-1">9av. 34-45 Zona 1, Colonia las Chacras, apartamento 801 Jardines las Chacras 2</dd>

                                <dt class="col-md-5 pr-1 fw-medium">NIT:</dt>
                                <dd class="col-md-7 pl-1">4849984-9</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Correo Electrónico:</dt>
                                <dd class="col-md-7 pl-1">Condial.hr2017@gmail.com</dd>
                            </dl>
                            <div class="form-group">
                                <label for="observacion" class="fw-medium fs-8">Observación:</label>
                                <textarea class="form-control fs-8" id="observacion" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 px-lg-1 mb-3 d-flex">
                    <div class="card rounded-custom shadow-custom">
                        <div class="card-header bg-primary text-white fw-medium fs-6">
                            Información de Contrato
                        </div>
                        <div class="card-body p-2">
                            <h6>Proyecto: B001 - 2020/<small class="text-primary fw-medium">Supervisión: S-001-2020
                                <br />
                                Supervisor: GRUPO REPLO</small></h6>
                            <hr />
                            <dl class="row fs-8">
                                <dt class="col-md-5 pr-1 fw-medium">Contrato:</dt>
                                <dd class="col-md-7 pl-1">257-2020-COV</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Contrato Modificado:</dt>
                                <dd class="col-md-7 pl-1">N/A</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Contrato Ampliatorio:</dt>
                                <dd class="col-md-7 pl-1">N/A</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Monto Original:</dt>
                                <dd class="col-md-7 pl-1">Q.9,695,390.50</dd>

                                <dt class="col-md-5 pr-1 fw-medium">Modificado:</dt>
                                <dd class="col-md-7 pl-1">Q.9,695,390.50</dd>
                            </dl>
                            <h6 class="fw-medium fs-8">Empresas Asociadas al Proyecto:</h6>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="empresas-table">
                                    <thead>
                                        <tr>
                                            <th class="spacer p-2"></th>
                                            <th class="text-center fs-8 p-2">Empresa</th>
                                            <th class="text-center fs-8 p-2">NIT</th>
                                            <th class="text-center fs-8 p-2">Estado</th>
                                            <th class="spacer p-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="spacer p-2"></td>
                                            <td class="text-center fs-8 p-2">CONDIAL</td>
                                            <td class="text-center fs-8 p-2">4849984-6</td>
                                            <td class="text-center fs-8 p-2">Vigente</td>
                                            <td class="spacer p-2"></td>
                                        </tr>
                                        <tr>
                                            <td class="spacer p-2"></td>
                                            <td class="text-center fs-8 p-2">CONDIAL</td>
                                            <td class="text-center fs-8 p-2">4849984-6</td>
                                            <td class="text-center fs-8 p-2">Vigente</td>
                                            <td class="spacer p-2"></td>
                                        </tr>
                                        <tr>
                                            <td class="spacer p-2"></td>
                                            <td class="text-center fs-8 p-2">CONDIAL</td>
                                            <td class="text-center fs-8 p-2">4849984-6</td>
                                            <td class="text-center fs-8 p-2">Vigente</td>
                                            <td class="spacer p-2"></td>
                                        </tr>
                                        <tr>
                                            <td class="spacer p-2"></td>
                                            <td class="text-center fs-8 p-2">CONDIAL</td>
                                            <td class="text-center fs-8 p-2">4849984-6</td>
                                            <td class="text-center fs-8 p-2">Vigente</td>
                                            <td class="spacer p-2"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 pl-lg-1 mb-3 d-flex">
                    <div class="card rounded-custom shadow-custom">
                        <div class="card-header bg-primary text-white fw-medium fs-6">
                            Información de Proyecto
                        </div>
                        <div class="card-body p-2">
                            <h6>Datos del Proyecto<small class="text-primary fw-medium"><br />
                                &nbsp;</small></h6>
                            <hr />
                            <dl class="row fs-8">
                                <dt class="col-md-7 pr-1 fw-medium">Estimaciones por Pagar:</dt>
                                <dd class="col-md-5 pl-1">Q.83,500.00</dd>

                                <dt class="col-md-7 pr-1 fw-medium">Saldo Contractual sin Estimar:</dt>
                                <dd class="col-md-5 pl-1">Q.576,708.35</dd>

                                <dt class="col-md-7 pr-1 fw-medium">Saldo Contractual:</dt>
                                <dd class="col-md-5 pl-1">Q.660,208.35</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="tramosHeader" class="accordion-header">
            <a class="text-primary h4 collapsed" brole="button" data-toggle="collapse" data-target="#tramosCollapse" aria-expanded="false"
                aria-controls="tramosCollapse">Tramos del Proyecto
                <i class="fas fa-chevron-down fa-fw float-right"></i>
            </a>
        </div>
        <div id="tramosCollapse" class="collapse mb-4" aria-labelledby="tramosHeader" data-parent="#informacionGeneral">
            <div class="table-responsive">
                <table class="table table-bordered" id="tramos-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">Código</th>
                            <th class="text-center">Departamento</th>
                            <th class="text-center">Descripción</th>
                            <th class="text-center">Longitud (Kms)</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">RD-GUA-05-01</td>
                            <td class="text-center">Guatemala</td>
                            <td class="text-center">BIFURCACIÓN EL MILAGRO - CIUDAD QUETZAL</td>
                            <td class="text-center">7.800 Kms</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">RD-GUA-08</td>
                            <td class="text-center">Guatemala</td>
                            <td class="text-center">BIFURCACIÓN RD-GUA-11, SAN PEDRO SACATEPÉQUEZ - BIFURCACIÓN EL PILAR, LIMITE DEPARTAMENTAL SACATEPÉQUEZ/GUATEMALA</td>
                            <td class="text-center">2.420 Kms</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">RD-CHM-28-A</td>
                            <td class="text-center">Chimaltenango</td>
                            <td class="text-center">BIFURCACIÓN RD-GUA-18 -  RUINAS DE MIXCO VIEJO</td>
                            <td class="text-center">0.850 kms</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">RD-GUA-56-01</td>
                            <td class="text-center">Guatemala</td>
                            <td class="text-center">BIFURCACIÓN RN-05 -  ALDEA SAJCAVILLA</td>
                            <td class="text-center">4.250 kms</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">RD-GUA-04-01</td>
                            <td class="text-center">Guatemala</td>
                            <td class="text-center">BIFURCACIÓN RN-05, PACHALI - SAN RAYMUNDO</td>
                            <td class="text-center">4.240 kms</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td colspan="3" class="fs-4 font-weight-bold spacer border-left-0 text-right pr-5">TOTAL</td>
                            <td class="fs-6 text-center spacer border-right-0">87.21 kms</td>
                            <td class="spacer"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="renglonesHeader" class="accordion-header">
            <a class="text-primary h4 collapsed" brole="button" data-toggle="collapse" data-target="#renglonesCollapse" aria-expanded="false"
                aria-controls="renglonesCollapse">Renglones Vigentes del Proyecto
                <i class="fas fa-chevron-down fa-fw float-right"></i>
            </a>
        </div>
        <div id="renglonesCollapse" class="collapse mb-4" aria-labelledby="renglonesHeader" data-parent="#informacionGeneral">
            <div class="table-responsive">
                <table class="table table-bordered" id="renglones-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">Renglón Código</th>
                            <th class="text-center">Componente Descripción</th>
                            <th class="text-center">Renglón Descripción</th>
                            <th class="text-center">Unidad</th>
                            <th class="text-center">Cantidad</th>
                            <th class="text-center">Precio Unitario</th>
                            <th class="text-center">Subtotal</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">Az 203.03(e)</td>
                            <td class="text-center">COMPONENTE ÚNICO</td>
                            <td class="text-center">Remoción y Prevención de Derrumbes</td>
                            <td class="text-center">m³</td>
                            <td class="text-center">718.00</td>
                            <td class="text-center">Q.111.30</td>
                            <td class="text-center">Q.79,913.40</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">Az 205.05</td>
                            <td class="text-center">COMPONENTE ÚNICO</td>
                            <td class="text-center">Excavación Estructural</td>
                            <td class="text-center">m³</td>
                            <td class="text-center">413.40</td>
                            <td class="text-center">Q.226.80</td>
                            <td class="text-center">Q.93,759.12</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">Az 205.12</td>
                            <td class="text-center">COMPONENTE ÚNICO</td>
                            <td class="text-center">Relleno Estructural</td>
                            <td class="text-center">m³</td>
                            <td class="text-center">416.70</td>
                            <td class="text-center">Q.296.80</td>
                            <td class="text-center">Q.93,759.12</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">Az 208.02</td>
                            <td class="text-center">COMPONENTE ÚNICO</td>
                            <td class="text-center">Acarreo</td>
                            <td class="text-center">m³-Km</td>
                            <td class="text-center">10,262.50</td>
                            <td class="text-center">Q.9.40</td>
                            <td class="text-center">Q.96,467.50</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">Az 253.03 (f)</td>
                            <td class="text-center">COMPONENTE ÚNICO</td>
                            <td class="text-center">Tele geotextil (Suministro y Colocación)</td>
                            <td class="text-center">m²</td>
                            <td class="text-center">1,331.22</td>
                            <td class="text-center">Q.80.00</td>
                            <td class="text-center">Q.106,497.60</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td colspan="6" class="fs-4 font-weight-bold spacer border-left-0 text-right pr-5">TOTAL</td>
                            <td class="fs-6 text-center spacer border-right-0">Q.9,695,390.49</td>
                            <td class="spacer"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="sancionesHeader" class="accordion-header">
            <a class="text-primary h4 collapsed" brole="button" data-toggle="collapse" data-target="#sancionesCollapse" aria-expanded="false"
                aria-controls="sancionesCollapse">Sanciones de Proyecto
                <i class="fas fa-chevron-down fa-fw float-right"></i>
            </a>
        </div>
        <div id="sancionesCollapse" class="collapse mb-4" aria-labelledby="sancionesHeader" data-parent="#informacionGeneral">
            <div class="table-responsive">
                <table class="table table-bordered" id="sanciones-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">&nbsp;</th>
                            <th class="text-center">&nbsp;</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="spacer"></td>
                            <td colspan="2" class="spacer font-weight-bold fs-5 border-0 pl-5">No existe registro de sanciones actualmente
                            </td>
                            <td class="spacer"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="pagosHeader" class="accordion-header">
            <a class="text-primary h4 collapsed" brole="button" data-toggle="collapse" data-target="#pagosCollapse" aria-expanded="false"
                aria-controls="pagosCollapse">Pagos
                <i class="fas fa-chevron-down fa-fw float-right"></i>
            </a>
        </div>
        <div id="pagosCollapse" class="collapse mb-4" aria-labelledby="pagosHeader" data-parent="#informacionGeneral">
            <div class="table-responsive">
                <table class="table table-bordered" id="pagos-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">Año Nómina</th>
                            <th class="text-center">Nómina</th>
                            <th class="text-center">Estimación Corre.</th>
                            <th class="text-center">Monto de Estimación</th>
                            <th class="text-center">Monto a Pagar</th>
                            <th class="text-center">ISR (Q)</th>
                            <th class="text-center">Total a Recibir</th>
                            <th class="text-center">Empresa</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">2021</td>
                            <td class="text-center">1.0</td>
                            <td class="text-center">1</td>
                            <td class="text-center">Q.958,323.28</td>
                            <td class="text-center">Q.958,323.28</td>
                            <td class="text-center">Q.59,925.20</td>
                            <td class="text-center">Q.873,358.71</td>
                            <td class="text-center">*CONDIAL*</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">2021</td>
                            <td class="text-center">11.0</td>
                            <td class="text-center">2</td>
                            <td class="text-center">Q.980,291.62</td>
                            <td class="text-center">Q.980,291.62</td>
                            <td class="text-center">Q.60,668.23</td>
                            <td class="text-center">Q.919,623.39</td>
                            <td class="text-center">*CONDIAL*</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">2021</td>
                            <td class="text-center">32.0</td>
                            <td class="text-center">3</td>
                            <td class="text-center">Q.1,434,236.67</td>
                            <td class="text-center">Q.1,434,236.67</td>
                            <td class="text-center">Q.89,039.79</td>
                            <td class="text-center">Q.1,306,779.83</td>
                            <td class="text-center">*CONDIAL*</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">2021</td>
                            <td class="text-center">97.0</td>
                            <td class="text-center">4</td>
                            <td class="text-center">Q.3,870,834.10</td>
                            <td class="text-center">Q.3,870,834.10</td>
                            <td class="text-center">Q.241,137.13</td>
                            <td class="text-center">Q.3,629,506.97</td>
                            <td class="text-center">*CONDIAL*</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">2021</td>
                            <td class="text-center">40.0</td>
                            <td class="text-center">5</td>
                            <td class="text-center">Q.1,791,496.48</td>
                            <td class="text-center">Q.1,791,496.48</td>
                            <td class="text-center">Q.111,368.53</td>
                            <td class="text-center">Q.1,632,141.44</td>
                            <td class="text-center">*CONDIAL*</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td colspan="3" class="fs-4 font-weight-bold spacer border-left-0 pl-5 text-right">TOTAL</td>
                            <td class="fs-6 text-center spacer">Q.9,035,182.15</td>
                            <td class="fs-6 text-center spacer">Q.9,035,182.15</td>
                            <td class="fs-6 text-center spacer">Q.561,698.88</td>
                            <td class="fs-6 text-center spacer">Q.8,361,410.34</td>
                            <td class="spacer border-right-0"></td>
                            <td class="spacer"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="estimacionesHeader" class="accordion-header">
            <a class="text-primary h4 collapsed" brole="button" data-toggle="collapse" data-target="#estimacionesCollapse" aria-expanded="false"
                aria-controls="estimacionesCollapse">Estimaciones
                <i class="fas fa-chevron-down fa-fw float-right"></i>
            </a>
        </div>
        <div id="estimacionesCollapse" class="collapse mb-4" aria-labelledby="estimacionesHeader" data-parent="#informacionGeneral">
            <div class="table-responsive">
                <table class="table table-bordered" id="estimaciones-table">
                    <thead>
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center" style="min-width: 160px"></th>
                            <th class="text-center">Año</th>
                            <th class="text-center">Proy</th>
                            <th class="text-center">No.</th>
                            <th class="text-center">Período</th>
                            <th class="text-center">Monto Ejecutado</th>
                            <th class="text-center">Monto de Estimación</th>
                            <th class="text-center">Pagado</th>
                            <th class="text-center">Pendiente</th>
                            <th class="text-center">Deuda Contractual</th>
                            <th class="text-center">Saldo Real</th>
                            <th class="text-center">Estado de la Estimación</th>
                            <th class="text-center">Fecha de Ingreso</th>
                            <th class="text-center">Fecha de Estado</th>
                            <th class="text-center">Días de Recepción de Estado</th>
                            <th class="text-center">Visor</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">
                                <a role="button" class="bitacora-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consulta bítacora de estimación"><i class="fas fa-archive fa-lg fa-fw"></i></a>
                                <a role="button" class="estimacion-btn action-icon hover-gray" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar estimación"><i class="fas fa-print fa-lg fa-fw"></i></a>
                                <a role="button" class="reparos-btn action-icon hover-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar reparos para el documento de cobro"><i class="fas fa-info-circle fa-lg fa-fw"></i></a>
                                <a role="button" class="cur-btn action-icon hover-dark-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar CUR"><i class="fas fa-file fa-lg fa-fw"></i></a>
                                <a role="button" class="toolbox-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="?????"><i class="fas fa-toolbox fa-lg fa-fw"></i></a>
                            </td>
                            <td class="text-center">2020</td>
                            <td class="text-center">DC-009</td>
                            <td class="text-center">1</td>
                            <td class="text-center">01/05/2015 - 31/05/2015</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q0.00</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Pagado</td>
                            <td class="text-center">22/03/2013</td>
                            <td class="text-center">20/06/2013</td>
                            <td class="text-center">90 días</td>
                            <td class="text-center">Josué González</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">
                                <a role="button" class="bitacora-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consulta bítacora de estimación"><i class="fas fa-archive fa-lg fa-fw"></i></a>
                                <a role="button" class="estimacion-btn action-icon hover-gray" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar estimación"><i class="fas fa-print fa-lg fa-fw"></i></a>
                                <a role="button" class="reparos-btn action-icon hover-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar reparos para el documento de cobro"><i class="fas fa-info-circle fa-lg fa-fw"></i></a>
                                <a role="button" class="cur-btn action-icon hover-dark-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar CUR"><i class="fas fa-file fa-lg fa-fw"></i></a>
                                <a role="button" class="toolbox-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="?????"><i class="fas fa-toolbox fa-lg fa-fw"></i></a>
                            </td>
                            <td class="text-center">2020</td>
                            <td class="text-center">DC-009</td>
                            <td class="text-center">1</td>
                            <td class="text-center">01/05/2015 - 31/05/2015</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q0.00</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Pagado</td>
                            <td class="text-center">22/03/2013</td>
                            <td class="text-center">20/06/2013</td>
                            <td class="text-center">90 días</td>
                            <td class="text-center">Josué González</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">
                                <a role="button" class="bitacora-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consulta bítacora de estimación"><i class="fas fa-archive fa-lg fa-fw"></i></a>
                                <a role="button" class="estimacion-btn action-icon hover-gray" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar estimación"><i class="fas fa-print fa-lg fa-fw"></i></a>
                                <a role="button" class="reparos-btn action-icon hover-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar reparos para el documento de cobro"><i class="fas fa-info-circle fa-lg fa-fw"></i></a>
                                <a role="button" class="cur-btn action-icon hover-dark-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar CUR"><i class="fas fa-file fa-lg fa-fw"></i></a>
                                <a role="button" class="toolbox-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="?????"><i class="fas fa-toolbox fa-lg fa-fw"></i></a>
                            </td>
                            <td class="text-center">2020</td>
                            <td class="text-center">DC-009</td>
                            <td class="text-center">1</td>
                            <td class="text-center">01/05/2015 - 31/05/2015</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q0.00</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Pagado</td>
                            <td class="text-center">22/03/2013</td>
                            <td class="text-center">20/06/2013</td>
                            <td class="text-center">90 días</td>
                            <td class="text-center">Josué González</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">
                                <a role="button" class="bitacora-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consulta bítacora de estimación"><i class="fas fa-archive fa-lg fa-fw"></i></a>
                                <a role="button" class="estimacion-btn action-icon hover-gray" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar estimación"><i class="fas fa-print fa-lg fa-fw"></i></a>
                                <a role="button" class="reparos-btn action-icon hover-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar reparos para el documento de cobro"><i class="fas fa-info-circle fa-lg fa-fw"></i></a>
                                <a role="button" class="cur-btn action-icon hover-dark-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar CUR"><i class="fas fa-file fa-lg fa-fw"></i></a>
                                <a role="button" class="toolbox-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="?????"><i class="fas fa-toolbox fa-lg fa-fw"></i></a>
                            </td>
                            <td class="text-center">2020</td>
                            <td class="text-center">DC-009</td>
                            <td class="text-center">1</td>
                            <td class="text-center">01/05/2015 - 31/05/2015</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q0.00</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Pagado</td>
                            <td class="text-center">22/03/2013</td>
                            <td class="text-center">20/06/2013</td>
                            <td class="text-center">90 días</td>
                            <td class="text-center">Josué González</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td class="text-center">
                                <a role="button" class="bitacora-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consulta bítacora de estimación"><i class="fas fa-archive fa-lg fa-fw"></i></a>
                                <a role="button" class="estimacion-btn action-icon hover-gray" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar estimación"><i class="fas fa-print fa-lg fa-fw"></i></a>
                                <a role="button" class="reparos-btn action-icon hover-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar reparos para el documento de cobro"><i class="fas fa-info-circle fa-lg fa-fw"></i></a>
                                <a role="button" class="cur-btn action-icon hover-dark-blue" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="Consultar CUR"><i class="fas fa-file fa-lg fa-fw"></i></a>
                                <a role="button" class="toolbox-btn action-icon hover-black" data-toggle="popover" data-placement="top" data-trigger="hover"
                                    data-content="?????"><i class="fas fa-toolbox fa-lg fa-fw"></i></a>
                            </td>
                            <td class="text-center">2020</td>
                            <td class="text-center">DC-009</td>
                            <td class="text-center">1</td>
                            <td class="text-center">01/05/2015 - 31/05/2015</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q437,538.97</td>
                            <td class="text-center">Q0.00</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Q4,831,198.53</td>
                            <td class="text-center">Pagado</td>
                            <td class="text-center">22/03/2013</td>
                            <td class="text-center">20/06/2013</td>
                            <td class="text-center">90 días</td>
                            <td class="text-center">Josué González</td>
                            <td class="spacer"></td>
                        </tr>
                        <tr>
                            <td class="spacer"></td>
                            <td colspan="5" class="fs-4 font-weight-bold spacer border-left-0 pl-5">TOTAL</td>
                            <td class="fs-6 text-center spacer">Q5,268,737.50</td>
                            <td class="fs-6 text-center spacer">Q5,268,737.50</td>
                            <td class="fs-6 text-center spacer">Q5,268,737.50</td>
                            <td class="fs-6 text-center spacer">Q0.00</td>
                            <td colspan="7" class="spacer border-right-0"></td>
                            <td class="spacer"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="bitacoraModal" tabindex="-1" aria-labelledby="bitacoraModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content p-lg-5">
                <div class="modal-header">
                    <h5 class="modal-title" id="bitacoraModalLabel">Bitacora de Estimación</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="form-group row">
                                <label for="id" class="col-md-2 col-form-label">Email</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control mr-1" id="id">
                                </div>
                                <div class="col-sm-2 pl-0">
                                    <button type="button" class="btn btn-primary">
                                        <i class="fa fa-search fa-lg"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-group row">
                                <label for="year" class="col-sm-2 col-form-label">Año</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="year" value="2013" readonly="readonly">
                                </div>
                            </div>
                        </div>
                        <div class="w-100"></div>
                        <div class="col-lg-5">
                            <div class="form-group my-auto mb-0 row">
                                <label for="proyecto" class="col-md-2 col-form-label">Proyecto</label>
                                <div class="col-md-8 d-flex">
                                    <input type="text" class="form-control" id="proyecto" value="B-001" readonly="readonly">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="form-group mt-auto mb-0 row">
                                <label for="estimacion" class="col-sm-2 col-form-label">Año</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="estimacion" value="1" readonly="readonly">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 text-lg-right">
                            <button type="button" class="btn btn-outline-dark print-button">
                                <i class="fas fa-print fa-lg"></i>
                                <br />
                                Imprimir
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div class="table-responsive">
                        <table class="table table-bordered" id="bitacora-table">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Proyecto</th>
                                    <th class="text-center">Estimación</th>
                                    <th class="text-center">Estado Inicial</th>
                                    <th class="text-center">Estado Final</th>
                                    <th class="text-center">Usuario que Modificó</th>
                                    <th class="text-center">Fecha</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="spacer"></td>
                                    <td class="text-center">2013</td>
                                    <td class="text-center">B-001</td>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Se creó la estimación en el sistema.</td>
                                    <td class="text-center">No Presentado</td>
                                    <td class="text-center">Supervisor</td>
                                    <td class="text-center">08/03/2013 05:06:38 p.m.</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td class="text-center">2013</td>
                                    <td class="text-center">B-001</td>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Se creó la estimación en el sistema.</td>
                                    <td class="text-center">No Presentado</td>
                                    <td class="text-center">Supervisor</td>
                                    <td class="text-center">08/03/2013 05:06:38 p.m.</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td class="text-center">2013</td>
                                    <td class="text-center">B-001</td>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Se creó la estimación en el sistema.</td>
                                    <td class="text-center">No Presentado</td>
                                    <td class="text-center">Supervisor</td>
                                    <td class="text-center">08/03/2013 05:06:38 p.m.</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td class="text-center">2013</td>
                                    <td class="text-center">B-001</td>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Se creó la estimación en el sistema.</td>
                                    <td class="text-center">No Presentado</td>
                                    <td class="text-center">Supervisor</td>
                                    <td class="text-center">08/03/2013 05:06:38 p.m.</td>
                                    <td class="spacer"></td>
                                </tr>
                                <tr>
                                    <td class="spacer"></td>
                                    <td class="text-center">2013</td>
                                    <td class="text-center">B-001</td>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Se creó la estimación en el sistema.</td>
                                    <td class="text-center">No Presentado</td>
                                    <td class="text-center">Supervisor</td>
                                    <td class="text-center">08/03/2013 05:06:38 p.m.</td>
                                    <td class="spacer"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal de consulta estimaciones -->
        <!-- #include virtual="ConsultaReparosObservaciones.html" -->
    <!-- fin de modal de consulta de estimaciones -->
    <!-- modal de reporte de estimaciones -->
        <!-- #include virtual="ReporteEstimaciones.html" -->
    <!-- fin de modal de reporte de estimaciones -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/DataTables/datatables.min.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <%: Scripts.Render("~/js/Administracion/jsConsultaReparosObservaciones.js") %>
    <%: Scripts.Render("~/js/Administracion/jsReporteEstimaciones.js") %>
    <script>
        $('.bitacora-btn').click(function (e) {
            $('#bitacoraModal').modal('show');
        });

        $('.reparos-btn').click(function (e) {
            $('#consultaRO').modal('show');
        });

        $('.estimacion-btn').click(function (e) {
            $('#reporteEstimaciones').modal('show');
        });

        $(function () {
            $('[data-toggle="popover"]').popover();
        });
    </script>
</asp:Content>
