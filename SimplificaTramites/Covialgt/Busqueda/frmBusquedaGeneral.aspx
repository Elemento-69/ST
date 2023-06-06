<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmBusquedaGeneral.aspx.cs" Inherits="Covialgt.Busqueda.frmBusquedaGeneral" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
 
    <style type="text/css">
        /* Set the size of the div element that contains the map */
        #map {
            width: 100%;
            /* The width is the width of the web page */
        }
        td {
            width: auto;
        }

        td.min {
            width: 1%;
            white-space: nowrap;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
            <script src="../js/jsBusquedaGeneral.js"></script>

            <!-- Sweet Alert-->
            <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

            <!-- Loading Overlay-->
            <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
            <!-- Font-Awesome 4.7-->
            <script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>


            <!-- Data Table v1.10.23 -->
            <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
            <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
               
    
            <h1 class="mb-0">Búsqueda general</h1>
            <hr class="thick" />
    
            <br>

            <div class="row">      
                <div class="col-2"  >                                                            
                    <label  >Ingrese el criterio de búsqueda:</label>
                </div>
                <div class="col-7"   >
                    <input type="text" class="form-control" id="txtCriterioBusqueda" >
                </div>
                <div class="col-3" style="text-align: right;">
                    <button type="button" id="btnBuscar" class="btn btn-primary btn-form" style="width: 90%;" onclick="fnCargarResultadosBusqueda();">Buscar proyectos</button>
                </div>            
            </div>

            <div class="row">
                <hr />
                <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="tableResultados">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th style="width: 50px"></th>
                                <th>Año</th>
                                <th>Proyecto</th>
                                <th>Empresa</th>
                                <th>Año supervisión</th>
                                <th>Supervisión</th>
                                <th>Supervisor</th>
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
        <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
        <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>

        <script type="text/javascript">
        thumbnail = '<%= ViewState["thumbnail"] %>'
        $(document).ready(function () {
            loadDefaultComponents();
        });
        </script>
</asp:Content>
