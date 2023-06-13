<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmEmergenciasPantallaPrincipal.aspx.cs" Inherits="Covialgt.Emergencias.frmEmergenciasPantallaPrincipal" %>

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
    <%--Js para emergencias--%>
    <script src="../js/jsEmergenciasPantallaPrincipalToken.js"></script>
    <script src="../js/jsEmergenciasPantallaPrincipal.js"></script>


     
    <h1 class="mb-0">Emergencias</h1>
    <hr class="thick" />

   

    <br>

    <div class="row">

        <div id="map" class="col-9"></div>
        <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
        <script async
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkCxwYwhoIUlqJ3Wik-ULyoQmxbL30XKI&callback=initMap">
        </script>

        <div class="col-3">
            <div class="row">
                <div class="col-9"></div>
                <div class="col" style="text-align: center;">
                    <button type="button" id="btnNuevaEmergencia" class="btn btn-primary btn-form" style="width: 90%;" onclick="window.open('frmEmergenciasNueva.aspx?emergenciaID=0', '_blank');">+ NUEVA EMERGENCIA</button>
                </div>
            </div>
            <div id="card-tramo" class="card custom-card">
                <div class="card-body">

                    <h4 class="text-center ">Filtros de emergencia</h4>


                    <div class="form-group ">
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

                        <label for="TipoEmergencia">Tipo de emergencia</label>
                        <select class="form-control" id="cmbTipoEmergencia" name="TipoEmergencia" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>

                        <label for="CausaEmergencia">Causa de emergencia</label>
                        <select class="form-control" id="cmbCausaEmergencia" name="CausaEmergencia" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>

                        <label for="PasoHabilitado">Paso</label>
                        <select class="form-control" id="cmbPasoHabilitado" name="PasoHabilitado" required>
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

                        <label for="Departamento">Departamento</label>
                        <select class="form-control" id="cmbDepartamento" name="Departamento" required>
                            <option value="0">Todos</option>
                        </select>

                        <br>

                        <div style="text-align: center;">
                            <button type="button" id="btnBuscar" class="btn btn-primary btn-form" onclick="fnCargarEmergenciasFiltradas();">BUSCAR</button>                            
                            <button type="button" id="btnInformes" class="btn btn-secondary btn-form" style="margin-top:15px;" onclick="fnImprimirInformeIndividual_X_Filtros();">generar informes</button>
                        </div>
                    </div>



                </div>
            </div>


        </div>
    </div>

    <div class="row">
        <hr />
        <div class="table-responsive mt-5">
            <table class="table table-bordered" id="tableEmergencias">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th></th>
                        <th style="width: 160px">Fecha</th>
                        <th>Tramo</th>
                        <th>Tipo</th>
                        <th>Causa</th>
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
        thumbnail = '<%= ViewState["thumbnail"] %>'
        $(document).ready(function () {
            loadDefaultComponents();
        });
    </script>

</asp:Content>

