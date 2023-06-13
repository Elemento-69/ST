<%@ Page Title="Dashboard" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" 
    Inherits="SimplificaTramites.Default" Async="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h1 class="mb-0">Dashboard</h1>
    <hr class="thick" />
    <div class="row justify-content-between">
         <%if (!HttpContext.Current.User.IsInRole("SUPERVISOR") && !HttpContext.Current.User.IsInRole("SUPERVISOR  CONSULTA"))
                { %>
        <div class="form-group col-md-5 col-lg-5">
            <label for="PlanAnual">Plan Anual</label>
            <select id="PlanAnualList" class="form-control"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 offset-lg-1">
            <label for="cmbPrograma">Programa</label>
            <select ID="ProgramaList" class="form-control"></select>
        </div>
        <div class="form-group col-md-12">
            <label for="ProyectoList">Proyecto</label>
            <select Class="form-control" id="ProyectoList"></select>
        </div>
        
        <%} %>
          <%if (HttpContext.Current.User.IsInRole("SUPERVISOR") || (HttpContext.Current.User.IsInRole("SUPERVISOR CONSULTA")))
                { %>
       
        <div class="form-group col-md-12">
            <label for="ProyectoListSup">Proyectos</label>
            <select Class="form-control" id="ProyectoListSup"></select>
        </div>
        
        <%} %>
    </div>
    <section class="project-info mt-3">
        <h4 class="text-uppercase mb-5" id="TituloProyecto"></h4>
        <div class="row justify-content-end">
            <div class="col-md-4 pt-3">
                <span class="bg-warning text-dark h5" id="ProyEnActividades"></span>
            </div>
            <div class="col-md-4 pt-3">
                <span class="text-danger h5" id="ProyTieneAutorizacion"></span>
            </div>
            <div class="col-md-4 pt-3">
                <div class="form-group custom-checkbox ">
                    <input type="checkbox" class="custom-control-input" id="checkCantidadesTramo" disabled>
                    <label class="custom-control-label" for="checkCantidadesTramo">Cantidades Tramo Ingresadas</label>
                </div>
            </div>
        </div>
        <div class="row justify-content-between">
            <div class="col-sm-6 col-md-4 col-lg-3 py-3">
                <div class="card card-info border-green m-auto">
                    <div class="card-body text-center px-0">
                        <canvas id="chart-0"></canvas>
                        <div class="card-text pt-2" >
                            Avance F&iacute;sico
                            <br />
                            <div class="d-inline" id="fisicoChartText">
                                0
                            </div> %
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 py-3">
                <div class="card card-info border-blue  m-auto">
                    <div class="card-body text-center  px-0">
                        <canvas id="chart-1"></canvas>
                        <div class="card-text pt-2">
                            Avance Financiero
                            <br />
                            <div class="d-inline" id="financieroChartText">
                                 0
                            </div>
                             %
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 py-3">
                <div class="card card-info border-yellow  m-auto">
                    <div class="card-body text-center px-0">
                        <svg width="76" height="84" viewBox="0 0 76 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75.5 75.3334V17C75.5 12.4042 71.7625 8.66668 67.1667 8.66668H58.8333V0.333344H50.5V8.66668H25.5V0.333344H17.1667V8.66668H8.83333C4.2375 8.66668 0.5 12.4042 0.5 17V75.3334C0.5 79.9292 4.2375 83.6667 8.83333 83.6667H67.1667C71.7625 83.6667 75.5 79.9292 75.5 75.3334ZM25.5 67H17.1667V58.6667H25.5V67ZM25.5 50.3333H17.1667V42H25.5V50.3333ZM42.1667 67H33.8333V58.6667H42.1667V67ZM42.1667 50.3333H33.8333V42H42.1667V50.3333ZM58.8333 67H50.5V58.6667H58.8333V67ZM58.8333 50.3333H50.5V42H58.8333V50.3333ZM67.1667 29.5H8.83333V21.1667H67.1667V29.5Z" fill="#F2C94C" />
                        </svg>
                        <p class="card-text pt-2">
                            Ultimo Periodo
                            <br />
                            Ejecutado
                            <br />
                            <span id="UltimoPeriodoEjecutado"></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 py-3">
                <div class="card card-info border-purple m-auto">
                    <div class="card-body text-center px-0">
                        <svg width="76" height="84" viewBox="0 0 76 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.5 37.8333H17.1667V46.1667H25.5V37.8333ZM42.1667 37.8333H33.8333V46.1667H42.1667V37.8333ZM58.8333 37.8333H50.5V46.1667H58.8333V37.8333ZM67.1667 8.66668H63V0.333344H54.6667V8.66668H21.3333V0.333344H13V8.66668H8.83333C4.20833 8.66668 0.541667 12.4167 0.541667 17L0.5 75.3334C0.5 77.5435 1.37797 79.6631 2.94078 81.2259C4.50358 82.7887 6.6232 83.6667 8.83333 83.6667H67.1667C71.75 83.6667 75.5 79.9167 75.5 75.3334V17C75.5 12.4167 71.75 8.66668 67.1667 8.66668ZM67.1667 75.3334H8.83333V29.5H67.1667V75.3334Z" fill="#BB6BD9" />
                        </svg>
                        <p class="card-text pt-2">
                            Ultimo Ingreso
                            <br />
                            <span id="UltimoIngreso"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-12 mb-11">
                <h2><span class="title-bg">Datos Generales</span></h2>
                <ul class="nav custom-nav mt-4" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="general-tab" data-toggle="tab" href="#general" role="tab" aria-controls="general" aria-selected="true">General
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="contrato-tab" data-toggle="tab" href="#contrato" role="tab" aria-controls="contrato" aria-selected="false">Contrato
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="contratista-tab" data-toggle="tab" href="#contratista" role="tab" aria-controls="contratista" aria-selected="false">Contratista
                        </a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="supervision-tab" data-toggle="tab" href="#supervision" role="tab" aria-controls="supervision" aria-selected="false">Supervision
                        </a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                        <ul class="list-unstyled">
                            <li>Codigo: 
                                <span id="GeneralCodigo"></span>
                            </li>
                            <li>Descripción: 
                                <span id="GeneralDescripcion" ></span>
                            </li>
                            <li>Estado: 
                                <span id="GeneralEstado"></span>
                            </li>
                              <li>Regional: 
                                <span id="GeneralRegional"></span>
                            </li>
                          <%--  <li>CDP: 
                                 <span id="GeneralCDP" ></span>
                            </li>--%>
                        </ul>
                        <ul class="list-unstyled text-primary">
                            <li><a id="LinkGuateCompras">
                                 <span id="GeneralNOG"></span>
                                </a>
                               
                            </li>
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="contrato" role="tabpanel" aria-labelledby="contrato-tab">
                        <ul class="list-unstyled">
                            <li>Contrato: 
                                <span id="ContratoContrato"></span>
                            </li>
                            <li>Fecha de Inicio: 
                                <span id="ContratoInicio"></span>
                            </li>
                            <li>Plazo: 
                                <span id="ContratoPlazo"></span>
                            </li>
                            <li>InicioFisico: 
                                 <span id="ContratoInicioFisico"></span>
                            </li>
                            <li>Monto Original: 
                                 <span class="
                                     
                                     
                                     " id="ContratoMontoOriginal"></span>
                            </li>
                            <li>Monto Actual: 
                                 <span id="ContratoMontoActual"></span>
                            </li>
                            <li>FechaFinal: 
                                 <span id="ContratoFechaFinal"></span>
                            </li>
                            <li>FinalActual: 
                                 <span id="ContratoFinalActual"></span>
                            </li>
                            <li>Certificaci&oacute;n: 
                                 <span id="ContratoCertificacion"></span>
                            </li>
                            <li>FechaCertificaci&oacute;n: 
                                 <span id="ContratoFechaCert"></span>
                            </li>
                            <li>Acuerdo Ministerial: 
                                 <span id="AcuerdoMinisterial"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="contratista" role="tabpanel" aria-labelledby="contratista-tab">
                         <ul class="list-unstyled">
                            <li>Nombre: 
                                <span id="ContratistaNombre"></span>
                            </li>
                            <li>NIT: 
                                <span id="ContratistaNit"></span>
                            </li>
                            <li>Representante: 
                                <span id="ContratistaRepresentante"></span>
                            </li>
                            <li>Telefonos: 
                                 <span id="ContratistaTelefonos"></span>
                            </li>
                            <li>e-mail: 
                                 <span id="ContratistaEmail"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="supervision" role="tabpanel" aria-labelledby="supervision-tab">
                        <div id="divSupervision">  
                        <ul class="list-unstyled">
                            <li>Año: 
                                <span id="SupAnio"></span>
                            </li>
                            <li>Codigo: 
                                <span id="SupCodigo"></span>
                            </li>
                            <li>Nombre: 
                                <span id="SupNombre"></span>
                            </li>
                            <li>NIT: 
                                 <span id="SupNit"></span>
                            </li>
                            <li>Representante: 
                                 <span id="SupRepresentante"></span>
                            </li>
                            <li>Telefonos: 
                                 <span id="SupTelefonos"></span>
                            </li>
                            <li>e-mail: 
                                 <span id="SupEmail"></span>
                            </li>
                        </ul>
                        </div>  
                         <div id="divSinSupervision">  
                             <h3><span class="badge badge-light">Proyectos Supervisados</span></h3>
                        <ul class="list-unstyled" id="ulProyectosSupervisados">
                          <%--  <li>Año: 
                                <span id="SupAnio"></span>
                            </li>--%>
                            
                        </ul>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="col-lg-12 mb-11 h-100">
                <h2><span class="title-bg">Tramos de Proyecto</span></h2>
                <div id="card-tramo" class="card custom-card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="TramosTable">
                                <thead>
                                    <tr>
                                        <th>Tramo</th>
                                        <th>Descripci&oacute;n</th>
                                        <th>SNIP</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="areaFinanciera">
        <h2 class="mt-5"><span class="title-bg">Area Financiera</span></h2>
        <hr />
        <ul class="nav custom-nav mt-4" id="af-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="estimaciones-tab" data-toggle="tab" href="#estimaciones" role="tab" aria-controls="estimaciones" aria-selected="true">Estimaciones
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="pagos-tab" data-toggle="tab" href="#pagos" role="tab" aria-controls="pagos" aria-selected="false">Pagos
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="sanciones-tab" data-toggle="tab" href="#sanciones" role="tab" aria-controls="sanciones" aria-selected="false">Sanciones
                </a>
            </li>
        </ul>
        <div class="tab-content no-border" id="af-tabcontent">
            <div class="tab-pane fade show active" id="estimaciones" role="tabpanel" aria-labelledby="estimaciones-tab">
                <div class="table-responsive">
                    <Table Class="table table-bordered mb-0" ID="EstimacionesTable">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th>Detalle</th>
                                <th>No.</th>
                                <th>Periodo</th>
                                <th>Monto Retención</th>
                                <th>Monto Ejecutado</th>
                                <th>Monto a Recibir</th>
                                <th>Monto Embargado</th>
                                <th>Aprobado por Supervisión</th>
                                <th>Estado de la estimación</th>
                                <th>Fecha del estado</th>
                                <th>IVA/ISR</th>
                            <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td Class="table-total border-0" colspan="11" >
                                    Total Monto Recibir: <span class="frcurrency-mask" id="total-estimaciones"></span>
                                </td>
                            </tr>    
                        </tfoot>
                    </Table>
                </div>
            </div>
            <div class="tab-pane fade p-5" id="pagos" role="tabpanel" aria-labelledby="pagos-tab">
                <Table Class="table table-bordered mb-0" ID="PagosTable">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th class="text-center">Año de Nomina</th>
                                <th class="text-center">Correlativo</th>
                                <th class="text-center">Estimación</th>
                                <th class="text-center">Monto Facturado</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td Class="table-total border-0" colspan="11" >
                                    Total Monto Facturado: <span class="frcurrency-mask" id="total-pagos"></span>
                                </td>
                            </tr>    
                        </tfoot>
                    </Table>
            </div>
            <div class="tab-pane fade p-5" id="sanciones" role="tabpanel" aria-labelledby="sanciones-tab">
                <Table Class="table table-bordered mb-0" ID="SancionesTable">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th class="text-center">Correlativo</th>
                                <th class="text-center">Fecha</th>
                                <th class="text-center">C&oacute;digo</th>
                                <th class="text-center">Justificación</th>
                                <th class="text-center">Monto</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
            </div>
        </div>
    </section>
    <section id="areaTecnica">
        <h2 class="mt-5"><span class="title-bg px-5">Area Técnica</span></h2>
        <hr />
        <ul class="nav custom-nav mt-4" id="at-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="ejecucion-tab" data-toggle="tab" href="#ejecucion" role="tab" aria-controls="ejecucion" aria-selected="true">
                    Ejecución
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="renglones-tab" data-toggle="tab" href="#renglones" role="tab" aria-controls="renglones" aria-selected="false">
                    Renglones
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="documentos-tab" data-toggle="tab" href="#documentos" role="tab" aria-controls="documentos" aria-selected="false">
                    Documentos de Cambio
                </a>
            </li>
        </ul>
        <div class="tab-content no-border" id="at-tabcontent">
            <div class="tab-pane fade show active p-1" id="ejecucion" role="tabpanel" aria-labelledby="ejecucion-tab">
                <div class="row align-items-end p-3">
                    <div class="col-md-5 col-lg-4 col-xl-3">
                        <div class="form-group">
                            <label for="DesdeEjecucion">Ejecuci&oacute;n por Fechas
                            </label>
                            <div class="input-group date" id="DesdeEjecucion" data-target-input="nearest">
                                <input  Class="form-control  datetimepicker-input ejecucion-date" data-target="#DesdeEjecucion" autocomplete="off"/>
                                <div class="input-group-append" data-target="#DesdeEjecucion" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1 text-center">
                        <label class="pb-3" for="HastaEjecucion">Al</label>
                    </div>
                    <div class="col-md-5 col-lg-4 col-xl-3">
                        <div class="form-group">
                            <div class="input-group date " id="HastaEjecucion" data-target-input="nearest">
                                <input  Class="form-control  datetimepicker-input ejecucion-date" data-target="#HastaEjecucion" autocomplete="off"/>
                                <div class="input-group-append" data-target="#HastaEjecucion" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="col-md-1 text-center">
                          <button type="button" id="btnBuscarEjecucion" class="btn btn-primary btn-form">
                              Buscar
                    </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table Class="table table-bordered mb-0" ID="EjecucionesTable">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th>Renglon</th>
                                <th>Descripción</th>
                                <th>Unidad</th>
                                <th>Precio Unitario</th>
                                <th>Cantidad Contratada</th>
                                <th>Cantidades Ejecutadas</th>
                                <th>Monto Vigente</th>
                                <th>Acumulado</th>
                                <th>% Físico Ejecutado</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                             
                                <td Class="table-total border-0" ColSpan="10">Total Acumulado: <span class="frcurrency-mask" id="TableTotalAcumuladoEjecucion"></span></td>
                            </tr> 
                        </tfoot>   
                    </table>
                </div>
            </div>
            <div class="tab-pane fade p-1" id="renglones" role="tabpanel" aria-labelledby="renglones-tab">
                <div class="table-responsive">
                    <table Class="table table-bordered mb-0" ID="RenglonesTable">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th>Componente</th>
                                <th>C&oacute;digo</th>
                                <th>Descripci&oacute;n</th>
                                <th>Unidad</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                                <td  Class="table-total border-0" ColSpan="10" >Total: <span class="frcurrency-mask" id="renglon-total"></span></td>
                            </tr> 
                        </tfoot>   
                    </table>
                </div>
            </div>
            <div class="tab-pane fade p-1" id="documentos" role="tabpanel" aria-labelledby="documentos-tab">
                <div class="table-responsive">
                    <table Class="table table-bordered mb-0" ID="DocCambioTable">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th>Correlativo</th>
                                <th>Tipo</th>
                                <th>Justificaci&oacute;n</th>
                                <th>Dias</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Fecha de Estado</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                                <td  Class="table-total border-0"
                                    ColSpan="10">Total: <span class="frcurrency-mask" id="documentos-total"></span></td>
                            </tr>    
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <section id="project-gallery">
        <h2 class="mt-5"><span class="title-bg">Galeria Multimedía</span></h2>
        <hr />
        <ul class="nav custom-nav mt-4" id="gallery-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="afinanciera-tab" data-toggle="tab" href="#af" role="tab" aria-controls="area tecnica" aria-selected="false">
                    Área Administrativa                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="atecnica-tab" data-toggle="tab" href="#at" role="tab" aria-controls="area financiera" aria-selected="true">
                    Área Técnica
                </a>
            </li>
        </ul>
        <div class="tab-content no-border" id="gallery-tabcontent">
            <div class="tab-pane fade p-5" id="af" role="tabpanel" aria-labelledby="afinanciera-tab">
           
                <div class="gallery-wrapper">
                    <div class="row justify-content-around">
                        <div class="col-md-6 d-flex align-items-center">
                            <ul class="list-inline custom-list " id="galery-tabsAdmon">
                                <li class="list-inline-item  active"  >Fotograf&iacute;as Administrativas</li>
            
                            </ul>
                        </div>
                       
                    </div>
                    <div class="gallery-bg">
                        <div class="row justify-content-center">
                            <div ID="GaleryViewAdmin" >
                                    
                            </div>
                        </div>
                    </div>
                </div>
          
            </div>
            <div class="tab-pane fade show active" id="at" role="tabpanel" aria-labelledby="atecnica-tab">
                <div class="gallery-wrapper">
                    <div class="row ">
                        <div class="col-md-4 d-flex align-items-center" style="padding-left: 0px  !important;">
                            <ul class="list-inline custom-list " id="galery-tabs">
                                <li class="list-inline-item active" data-url_galery="api/Dashboard/FotografiasXperiodo/" data-url="api/Dashboard/PeriodosExistenFotos/">Fotograf&iacute;as</li>
                                <li class="list-inline-item" data-url_galery="api/Dashboard/Rotulos/">Rotulos</li>
                                <li class="list-inline-item" data-type="10" data-url_galery="api/Dashboard/VideosXPeriodo/" data-url="api/Dashboard/PeriodosExistenVideos/" >Videos</li>
                            </ul>
                        </div>

                        
                        <div class="col-md-3 col-12 mb-4" style="padding-left: 0px  !important;">

                            <label for="periodo">Seleccione un Periodo</label>
                                <select ID="periodoGaleria" Class="form-control">
                                </select>
                        </div>

                         <div class="col-md-5 col-12 mb-4" style="padding-left: 0px  !important;">
                                <label for="tramoGaleria">Seleccione un Tramo</label>
                                <select ID="tramoGaleria" Class="form-control">
                                </select>
                        </div>
                         
                    </div>
                    <div class="gallery-bg">
                        <div class="row justify-content-center">
                            <div ID="GaleryView" >
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-pane fade p-5" id="cti" role="tabpanel" aria-labelledby="cantidadestramos-tab">
                <p>Documentos de Cambio</p>
            </div>
        </div>
    </section>
    <section id="cti-section">
        <h2 class="mt-5"><span class="title-bg">GRÁFICOS</span></h2>
        <hr />
        <ul class="nav custom-nav mt-4" id="ctichart-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="fisico-tab" data-toggle="tab" href="#fisico" role="tab" aria-controls="grafica fisico" aria-selected="true">
                     Gr&aacute;fica Financiero
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="financiero-tab" data-toggle="tab" href="#financiero" role="tab" aria-controls="grafica financiero" aria-selected="false">
                    Gr&aacute;fica F&iacute;sico
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="tiempo-tab" data-toggle="tab" href="#tiempo" role="tab" aria-controls="grafico tiempo" aria-selected="false">
                    Gr&aacute;fica Tiempo
                </a>
            </li>
        </ul>
        <div class="tab-content" id="ctichart-tabcontent">
            <div class="tab-pane fade show active" id="fisico" role="tabpanel" aria-labelledby="graficafisico-tab">
                <div class="row">
                    <div class="col-6 col-lg-6">
                         <canvas id="chart-fisico" style="max-width: 768px;"></canvas>
                    </div>
                     <div class="col-6 col-lg-6">
                         <ul class="list-group" id="EtiquetasGrafico">
                             <li class="list-group-item" id="liContratado"></li>
                             <li class="list-group-item" id="liEjecutdo"></li>
                             <li class="list-group-item" id="liPagado"></li>
                             <li class="list-group-item" id="liParaPago"></li>
                             <li class="list-group-item" id="liEnRevision"></li>
                             <li class="list-group-item" id="liObservado"></li>
                             <li class="list-group-item" id="liNoPresentado"></li>
                             <li class="list-group-item" id="liNoEjecutado"></li>
                         </ul>   
                     </div>
                     
                </div>
               
            </div>
            <div class="tab-pane fade" id="financiero" role="tabpanel" aria-labelledby="graficafinanciero-tab">
                <div class="row">
                    <div class="col-6 col-lg-6">
                        <canvas id="chart-financiero" style="max-width: 768px;"></canvas>
                    </div>
                    <div class="col-6 col-lg-6">
                         <div class="table-responsive">
                    <table Class="table table-bordered mb-0" ID="DetalleGraficoLineal">
                        <thead>
                            <tr>
                                <th Class="spacer"></th>
                                <th>Avance Programado</th>
                                <th>Avance Real</th>
                                <th>&Uacute;ltimo Registro</th>
                                <th Class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td Class="spacer"></td>
                                <td id="thAvanceProgramado"></td>
                                <td id="thAvanceReal"></td>
                                <td id="thUltimoRegistro"></td>
                                <td Class="spacer"></td>
                            </tr>
                        </tbody>
                       
                    </table>
                </div>
                    </div>
                </div>


            </div>
            <div class="tab-pane fade" id="tiempo" role="tabpanel" aria-labelledby="graficatiempo-tab">
                <canvas id="chart-tiempo" style="max-width: 768px;"></canvas>
            </div>
        </div>
    </section>

    <div class="modal fade" id="estimacionModal" tabindex="-1" role="dialog" aria-labelledby="estimacionModal" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalle de Estimaciones</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0" id="estimacion_detail-table">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th>Renglon</th>
                                    <th>Descripción</th>
                                    <th>Unidad</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                             
                               
                            </tbody>
                             <tfoot>
                            <tr>
                                <td Class="table-total border-0" colspan="11" >
                                    Total Acumulado: <span class="frcurrency-mask" id="total-estimaciones-detail"></span>
                                </td>
                            </tr>    
                        </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="fotografiaModal" tabindex="-1" role="dialog" aria-labelledby="fotografiaModal" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Fotografías de Proyectos</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row justify-content-around">
                        <div class="col-md-6 col-lg-5">
                            <ul class="list-unstyled">
                                <li><strong>Periodo:</strong> <span id="galery-periodo"></span></li>
                                <li><strong>Tramo:</strong> <span id="galery-tramo"></span></li>
                                <li><strong>Estación:</strong> <span id="galery-estacion"></span></li>
                                <li><strong>Fecha:</strong> <span id="galery-fecha"></span></li>
                            </ul>
                            
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <button type="button" id="btnRotarFotoIzquierda" class="btn btn-secondary btn-form mt-3 mb-3 mr-5" onclick="fnRotarFoto(true);"><i class="fas fa-undo fa-lg fa-fw"></i>&nbsp;&nbsp;Rotar</button>
                                </div>
                                <div class="col-12 col-md-6">
                                    <button type="button" id="btnRotarFotoDerecha" class="btn btn-secondary btn-form  mt-3 mb-3" onclick="fnRotarFoto(false);">rotar&nbsp;&nbsp;<i class="fas fa-undo fa-lg fa-fw  fa-flip-horizontal"></i></button>
                                </div>
                            </div>
                            
                                                                                                 
                            
                            <img width="262" height="262" class="img-fluid rounded-start" id="galery-img" alt="..." src="/Images/img-example.png"/>
                            <video class="img-fluid rounded-start d-none" id="galery-video" controls></video>
                            <p><strong>Descripción</strong><br/> <span id="galery-descripcion"></span></p>
                        </div>
                        <div class="col-md-6 col-lg-5">
                            <h4>Ubicacion Georeferenciada</h4>
                            <div style="width: 262px; height: 262px;" id="map"></div>
                            <button type="button" id="btnEliminarFoto" class="btn btn-secondary btn-form mt-3 mb-3 mr-5"><i class="fas fa-trash fa-lg fa-fw"></i>&nbsp;&nbsp;Eliminar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI&callback=initMap">
    </script>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/Chart.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>

    <script type="text/javascript">
        base_url = '<%= ViewState["baseURL"] %>'
        thumbnail = '<%= ViewState["thumbnail"] %>'
        token = '<%= Session["token"] %>'
        rol = '<%= Session["rol"] %>'
        usuario = "<%= Session["usuario"] %>"
        $(document).ready(function () {
            loadDefaultComponents();
            $('[data-toggle="popover"]').popover();   
        });
    </script>
    <%: Scripts.Render("~/Scripts/covial/dashboard.js") %>

</asp:Content>
