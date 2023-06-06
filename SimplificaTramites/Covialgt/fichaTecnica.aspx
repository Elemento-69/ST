<%@ Page Title="Ficha Técnica" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="fichaTecnica.aspx.cs" Inherits="Covial._Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
</asp:Content>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script src="js/jsFichaTecnica.js"></script>
     <!-- Sweet Alert-->
  <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>

    <h1 class="mb-0">Ficha Técnica</h1>
    <hr class="thick" />
  
    <div class="row">
        <div class="form-group col-md-5 col-lg-5" id="divPlanAnual">
            <label for="PlanAnual">Plan Anual</label>
            <select class="form-control" id="cbmPlanAnual" name="PlanAnual">
                  <option></option>
            </select>
        </div>
            <div class="form-group col-md-5 col-lg-5 offset-lg-1"  id="divPrograma">
                <label for="cmbPrograma">Programa</label>
                <select class="form-control" id="cmbPrograma" name="Programa">
                     <option></option>
                </select>
            </div>      
        </div>
      <div class="row">   
            <div class="form-group col-md-3 col-lg-5">
            <label for="Proyecto">Proyecto</label>
            <select class="form-control" id="Proyecto" name="Proyecto">
                <option></option>
               
            </select>
        </div>
        <div class="form-group col-md-5 col-lg-5 offset-lg-1"">
            <label for="Descripcion2">Descripcion</label>
            <input type="text" class="form-control" id="Descripcion2" name="Descripcion2" disabled>
        </div>
    </div>
    <div class="row align-items-center">

        <div class="col-md-4 col-lg-2" >
            <div class="form-group   was-validated">
                <label for="desde">Fecha desde </label>
                <div class="input-group date" id="desdedp" data-target-input="nearest">
                    <input id="dtDesde" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desdedp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
     <%--   <div class="col-md-1 text-center">
            <label class="pb-3" for="desde">Al</label>
        </div>--%>
        <div class="col-md-4 col-lg-2">
            <div class="form-group   was-validated">
                <label for="dtHasta">Hasta</label>
                <div class="input-group date" id="hastadp" data-target-input="nearest">
                    
                    <input id="dtHasta" type="text" name="hasta" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#hastadp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-4 col-lg-4 offset-lg-2" >
            <input type="checkbox" class="custom-control-input" id="chkImprimirFichaGral">
            <label class="custom-control-label" for="chkImprimirFichaGral">Imprimir ficha general</label>
        </div>
    </div>

    <h2 class="mt-5"><span class="title-bg">Secciones de Informe</span></h2>
  
    <hr class="thick2" />

    <div class="row">
        <div class="form-group col-md-6 col-lg-5   was-validated">
            <label for="Destinatario">Destinatario</label>
            <input type="text" class="form-control" id="Destinatario" name="Destinatario">
        </div>
        <div class="w-100"></div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkCaratula" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkCaratula">Caratula de Informe</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkPAvance" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkPAvance">Porcentaje de Avance</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkInfoContrato" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkInfoContrato">Información de contrato</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkRegional" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkRegional">Incluir información de regional asignado</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkContratista" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkContratista">Información de contratista</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkSuperintendente" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkSuperintendente">Incluir información de superintendente</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkSupervision" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkSupervision">Información de Supervisión</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkPagos" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkPagos">Pagos</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkGraficaAvances" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkGraficaAvances">Gráfica de Avance Fisico</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkSanciones" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkSanciones">Sanciones</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkAvancesFinancieros"  onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkAvancesFinancieros">Gráfica de Avance Financiero</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkDocCambio" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkDocCambio">Documentos de cambio</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkTramos" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkTramos">Tramos</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkFotosSupervision" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkFotosSupervision">Fotografías de supervisión</label>
        </div>
         <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkEstimaciones" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkEstimaciones">Estimaciones</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkFotosAdmin" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkFotosAdmin">Fotografías Administrativas</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkComentarios" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkComentarios">Comentarios</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkMarcaAgua" onclick="fnValidarFichaGral(this)">
            <label class="custom-control-label" for="chkMarcaAgua">Marca de Agua en fotografías</label>
        </div>
    </div>
     <h2 class="mt-5"><span class="title-bg">Sección Renglones</span></h2>
    <hr  class="thick2" />
    <div class="row">
       
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkAvance">
            <label class="custom-control-label" for="chkAvance">Avance general de renglones</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkAnexo">
            <label class="custom-control-label" for="chkAnexo">Anexo actual</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5">
            <input type="checkbox" class="custom-control-input" id="chkAnalitico">
            <label class="custom-control-label" for="chkAnalitico">Analítico de ejecución</label>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 offset-lg-2">
            <input type="checkbox" class="custom-control-input" id="chkResumen">
            <label class="custom-control-label" for="chkResumen">Resumen Analítico</label>
        </div>
      <div class="w-100"></div>
        
            <div class="form-group col-md-12 col-lg-12">
                <label for="cmbTramos">Tramos</label>
                <select class="form-control" id="cmbTramos" name="cmbTramos">
                    <option></option>

                </select>
            </div>

            <div class="form-group col-md-12 col-lg-12">
                <label for="cmbRenglones">Renglones</label>
                <select class="form-control" id="cmbRenglones" name="cmbRenglones">
                    <option></option>

                </select>
            </div>
    
        
       
    </div>
    <h2 class="mt-5"><span class="title-bg">Fotos de Supervisión</span></h2>
    <hr class="thick2" />
    <div class="row align-items-end">
         <div class="form-group col-md-12 col-lg-12">
            <label for="FiltroTramo">Filtrar por Tramo</label>
            <select class="form-control" id="FiltroTramo" name="FiltroRegion1">
                <option></option>
                
            </select>
        </div>
    </div>
    <div class="row align-items-center">
        <div class="form-group col-md-12 col-lg-12">
            <label for="FiltroRenglones">Filtrar por Renglón</label>
            <select class="form-control" id="FiltroRenglones" name="FiltroRegion1">
                <option></option>
               
            </select>
        </div>
         <br />
      
        <div class="col-md-5 col-lg-3">
            <div class="form-group">
                <label  for="desde">Fecha desde</label>
                <div class="input-group date" id="desde-dp" data-target-input="nearest">
                    <input id="desde" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="col-md-5 col-lg-3">
            <div class="form-group">
                    <label  >Hasta</label>
                <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                    <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group custom-control custom-checkbox col-md-3 col-lg-3  offset-lg-1 align-items-center">
            <input type="checkbox" class="custom-control-input" id="chkFavoritas">
            <label class="custom-control-label" for="chkFavoritas">Mostrar Favoritas</label>
        </div>
     
        
        <div class="d-flex ml-auto p-2" >
         <button type="button" id="btnMostrarFotos" class="btn btn-primary btn-form">Mostrar Fotos</button>

         </div>

        <div class="w-100"></div>
        <div class="col-12">
            <div class="gallery-wrapper row">
                <div class="col-lg-6">
                    <h4>Galería de Fotos</h4>
                   
                    <div id="dFotosSupervision" class="gallery-bg">
                  <%--    <div class="col-md-12 pt-3">
                <span class="bg-warning text-dark h5" >TRAMO RD GUA14</span>
            </div>
                        <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                                                <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                          <div class="col-md-12 pt-3">
                <span class="bg-warning text-dark h5" >TRAMO RD GUA 18</span>
            </div>
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                          <div class="col-md-12 pt-3">
                <span class="bg-warning text-dark h5" >TRAMO RD GUA 17</span>
            </div>
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />--%>
                    </div>
                    <br />
                      <div class="form-group custom-control custom-checkbox col-md-6 col-lg-5 ">
                        <input type="checkbox" class="custom-control-input" id="chkFotosSelectAll">
                        <label class="custom-control-label" for="chkFotosSelectAll">Seleccionar todas</label>
                        
                    </div>
                    <button type="button" id="btnAgregarReporte" class="btn btn-primary btn-form">Agregar a Reporte</button>
                   <%-- <div class="form-group custom-control custom-checkbox pt-2">
                        <input type="checkbox" class="custom-control-input" id="selectAllCheck">
                        <label class="custom-control-label" for="selectAllCheck">Seleccionar todos</label>
                    </div>--%>
                </div>

                <div class="col-lg-6">
                    <h4>Fotos Seleccionadas</h4>
                      
                   
                    <div id="dFotosSeleccionadas" class="gallery-bg">
                      <%--  <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />
                        <img width="143" height="143" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" />--%>
                    </div>
                    <br />
                     <br />
                     
                         <button type="button" id="btnQuitarReporteEjecucion" class="btn btn-primary btn-form">Quitar todas</button>
                   
                    <%--<a class="btn btn-link">Limpiar Galería</a>--%>
                </div>
            </div>
        </div>
    </div>
     <h2 class="mt-5"><span class="title-bg">Fotos Administrativas</span></h2>
    <hr  class="thick2" />
    <div class="row align-items-end">
         <div class="form-group col-md-12 col-lg-12">
            <label for="FiltroTramoAdmon">Filtrar por Tramo</label>
            <select class="form-control" id="FiltroTramoAdmon" name="FiltroRegion1">
                <option></option>
                
            </select>
        </div>
    </div>
    <div class="row align-items-center">
    
        <div class="col-md-5 col-lg-3">
            <div class="form-group">
                <label for="desdeAdmon">Fecha desde</label>
                <div class="input-group date" id="desdeAdmon-dp" data-target-input="nearest">
                    <input id="desdeAdmon" type="text" name="desde" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#desdeAdmon-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="col-md-5 col-lg-3">
            <div class="form-group">
                     <label for="hastaAdmon">Hasta</label>
                <div class="input-group date" id="hastaAdmon-dp" data-target-input="nearest">
                    <input id="hastaAdmon" type="text" name="hasta" autocomplete="off" class="form-control">
                    <div class="input-group-append" data-target="#hastaAdmon-dp" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <%--<div class="form-group custom-control custom-checkbox col-md-3 col-lg-3  offset-lg-1 align-items-center">
            <input type="checkbox" class="custom-control-input" id="chkFavoritasAdmon">
            <label class="custom-control-label" for="chkFavoritasAdmon">Mostrar Favoritas</label>
        </div>--%>
         <div class="d-flex ml-auto p-2">
         <button type="button" id="btnMostrarFotosAdmon" class="btn btn-primary btn-form">Mostrar Fotos</button>

         </div>

        <div class="w-100"></div>
        <div class="col-12">
            <div class="gallery-wrapper row">
                <div class="col-lg-6">
                    <h4>Galería de Fotos</h4>
                     <div class="w-100"></div>
                   
                     
                    <div class="w-100"></div>
                    <div id="dFotosAdmon" class="gallery-bg">
                  
                    </div>
                    <div class="form-group custom-control custom-checkbox pt-2">
                        <input type="checkbox" class="custom-control-input" id="selectAllCheckAdmon">
                        <label class="custom-control-label" for="selectAllCheckAdmon">Seleccionar todas</label>
                        
                    </div>
                    <button type="button" id="btnAgregarAdminReporte" class="btn btn-primary btn-form">Agregar a Reporte</button>
                     
                      
                </div>

                <div class="col-lg-6">
                    <h4>Fotos Seleccionadas</h4>
                       <div class="w-100"></div>
                    
                    <div id="dFotosSeleccionadasAdmon" class="gallery-bg">
                  
                    </div>
                    <br />
                     <br />
                    
                         <button type="button" id="btnQuitarReporteAdmin" class="btn btn-primary btn-form">Quitar todas</button>

                </div>
            </div>
        </div>
    </div>
    <div class="text-right pt-5">
        <button type="button" class="btn btn-outline-secondary btn-form">Cancelar</button>
        <button type="button" id="btnImprimir" class="btn btn-primary btn-form">Imprimir</button>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents();
        });
    </script>
</asp:Content>
