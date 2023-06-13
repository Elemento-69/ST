<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmFotosPresenciales.aspx.cs" Inherits="Covialgt.Fotografias.frmFotosPresenciales" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
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

        <h1 class="mb-0">Fotografías presenciales</h1>
    <hr class="thick" />

   

    <br>


    <div class="row">        
                <div class="col-2"  >         
                    <label for="PlanAnual1">Año</label>
                    <select class="form-control" id="cmbPlanAnual1" name="PlanAnual1"  required>                                              
                    </select>
                </div>
                <div class="col-3"   >
                    <label for="Proyecto1">Proyecto</label>
                    <select class="form-control" id="cmbProyecto1" name="Proyecto1"  required>
                    </select>
                </div>
                <div class="col-2"   >
                    <label for="desde">Fecha inicial</label>
                            <div class="input-group date" id="desdedp" data-target-input="nearest">
                                <input id="dtDesde" type="text" name="desde" autocomplete="off" class="form-control"  title="dd/mm/aaaa" >
                                <div class="input-group-append" data-target="#desdedp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                </div>
                <div class="col-2"   >
                    <label for="dtHasta">Fecha final</label>
                            <div class="input-group date" id="hastadp" data-target-input="nearest">
                                <input id="dtHasta" type="text" name="hasta" autocomplete="off" class="form-control" required>
                                <div class="input-group-append" data-target="#hastadp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                </div>
                <div class="col-3" style="text-align: center; margin-top: 30px;">
                    <button type="button" id="btnBuscar" class="btn btn-primary btn-form" style="width: 90%;" onclick="fnCargarTablaFotos();">Buscar</button>
                </div>                   
    </div>

    <br />

    <div class="row">
        <hr />
        <div class="table-responsive mt-5">
            <table class="table table-bordered" id="tableFotos">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th>Año</th>
                        <th>Código del proyecto</th>
                        <th>Fecha</th>                        
                        <th style="width: 150px;">Foto</th>  
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
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/js/jsFotosPresenciales.js") %>
    <script type="text/javascript">
         thumbnail = '<%= ViewState["thumbnail"] %>'      
    </script>
</asp:Content>
