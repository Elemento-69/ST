<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmIncidenciasPantallaPrincipal.aspx.cs" Inherits="Covialgt.Incidencias.frmIncidenciasPantallaPrincipal" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/dashboard.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <style type="text/css">
        /* Set the size of the div element that contains the map */
        #map {
            width: 100%;
            /* The width is the width of the web page */
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
    <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>


    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%--Js para incidencias--%>
    <script src="../js/jsIncidenciasPantallaPrincipalToken.js"></script>
    <script src="../js/jsIncidenciasPantallaPrincipal.js"></script>



    <h1 class="mb-0">Incidencias</h1>
    <hr class="thick" />

   

    <br>


    <div class="row align-items-right">  
       
                <div id="divPlanAnual" class="col-3"  >                                        
                    <select class="form-control" id="cmbPlanAnual1" name="PlanAnual1"  required>
                            <option disabled selected>Plan anual</option>                                               
                    </select>
                </div>
                <div  id="divPrograma" class="col-3" >
                    <select class="form-control" id="cmbPrograma1" name="Programa1"  required>
                            <option disabled selected>Programa</option>
                    </select>
                </div>
                <div class="col-3"   >
                    <select class="form-control" id="cmbProyecto1" name="Proyecto1"  required>
                            <option disabled selected>Proyecto</option>
                    </select>
                </div>
                <div class="col-3" style="text-align: center;">
                    <button type="button" id="btnNuevaIncidencia" class="btn btn-primary btn-form" style="width: 90%;" onclick="fnAbrirPantallaNuevaIncidencia();">+ NUEVA INCIDENCIA</button>
                </div>            
    </div>

    <br />

    <div class="row">

        <div id="map" class="col-9">
            <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
            <script async
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI&callback=initMap">
            </script>
        </div>        

        <div class="col-3" >
            <div id="card-tramo" class="card custom-card" >
                <div class="card-body">

                    <h4 class="text-center ">Filtros de incidencias</h4>


                    <div class="form-group">
                        <label for="Tramo">Tramo</label>
                        <select class="form-control" id="cmbTramo" name="Tramo" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>

                        <div class="form-group custom-control custom-checkbox ">
                            <input type="checkbox" class="custom-control-input" id="chkFiltrarPorFechas" onclick='cambiarVisibilidadRangoFechas(this.checked);'>
                            <label class="custom-control-label" for="chkFiltrarPorFechas">Filtrar por fechas</label>
                        </div>

                        <div id="divRangoFechas" style="display: none;">
                            <label for="desde">Fecha inicial</label>
                            <div class="input-group date" id="desdedp" data-target-input="nearest">
                                <input id="dtDesde" type="text" name="desde" autocomplete="off" class="form-control"  title="dd/mm/aaaa" >
                                <div class="input-group-append" data-target="#desdedp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>

                            <br>

                            <label for="dtHasta">Fecha final</label>
                            <div class="input-group date" id="hastadp" data-target-input="nearest">
                                <input id="dtHasta" type="text" name="hasta" autocomplete="off" class="form-control" >
                                <div class="input-group-append" data-target="#hastadp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                        <%--divRangoFechas--%>

                        <br>

                        <label for="TipoIncidencia">Tipo de incidencia</label>
                        <select class="form-control" id="cmbTipoIncidencia" name="TipoIncidencia" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>
                        
                        <label for="Severidad">Severidad</label>
                        <select class="form-control" id="cmbSeveridad" name="Severidad" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>

                        <label for="Estado">Estado</label>
                        <select class="form-control" id="cmbEstado" name="Estado" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>

                        <div style="text-align: center;">
                            <button type="button" id="btnBuscar" class="btn btn-primary btn-form" onclick="fnCargarIncidenciasFiltradas();">BUSCAR</button>                            
                            <button type="button" id="btnInformes" class="btn btn-secondary btn-form" style="margin-top:15px;" onclick="fnImprimirInformeIndividual_X_Filtros();">generar informes</button>
                        </div>

                        <br><br>
                    </div>



                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <hr />
        <div class="table-responsive mt-5">
            <table class="table table-bordered" id="tableIncidencias">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th></th>
                        <th style="width: 160px">Fecha</th>
                        <th>Tramo</th>
                        <th>Tipo</th>
                        <th>Severidad</th>
                        <th>Estado</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/Chart.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
  

    <script type="text/javascript">
        

        $(document).ready(function () {
            loadDefaultComponents();
        });
    </script>
</asp:Content>
