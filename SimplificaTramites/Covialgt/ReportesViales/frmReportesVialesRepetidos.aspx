<%@ Page Title="Reportes Viales Repetidos" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmReportesVialesRepetidos.aspx.cs"  Inherits="Covialgt.ReportesViales.frmReportesVialesRepetidos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/Multimedia.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
   
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
      <script src="../Scripts/jquery-3.5.1.min.js"></script>
    <!-- Sweet Alert-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Loading Overlay-->
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <!-- Font-Awesome 4.7-->
      <!--<script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>-->
    <script src="https://kit.fontawesome.com/80edadb2cd.js" crossorigin="anonymous"></script>   <!-- version 6 -->
    <!-- Data Table v1.10.23 -->
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css" />
    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <%--<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>--%>

    <h1 class="mb-0">Reportes Viales Repetidos</h1>
    <hr class="thick" />
    <div style="display:flex;"> 
        <h5 id="Anio"> Plan</h5> <h5 id="idReporte" style ="margin-left: 5px;"></h5>
    </div>
    <h5 id="tramo"> tramo</h5>
    <hr/>
    <div class="row">
        <div class="col">
            <h5>Descripcion:</h5>
            <label id="LabelDes"></label>
        </div>
        <div class="col col-lg-2" style="display: flex; align-content: flex-end; flex-wrap: wrap; justify-content: flex-end;">
            <button type="button" id="btnRegresar" class="btn btn-outline-secondary btn-form">Regresar</button>
        </div>
    </div>
    <hr/>

    <!-- collapse 1-->
    <div class="panel panel-default my-4">
        <div class="panel-heading text-primary">
            <h5 class="panel-title" data-toggle="collapse" data-target="#collapseRepRepetidos" style="cursor: pointer;">Posibles Reportes Repetidos</h5>
            <hr class="my-2 collapse-hr"/>
        </div>
        <div id="collapseRepRepetidos" class="panel-collapse collapse">
             <div class="panel-body">
                 <!-- tabla-->
                  <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="tableReportesRep"> <!--table-bordered -->
                     <thead> 
                         <tr>
                            <th class="spacer"></th>
                            <th>Num.</th>
                             <th>Fotografias</th>
                            <th>Fecha</th>
                            <th>Descripción daño</th>
                            <th>Tipo de reporte</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                            <th class="text-center">Num.Reporte</th>
                            <th>Asociar Reporte</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                 </table>
             </div>
                 <!-- fin tabla-->
             </div>
        </div>
    </div>
    <!-- fin collapse-->

        <!-- collapse 2-->
    <div class="panel panel-default my-4">
        <div class="panel-heading text-primary">
            <h5 class="panel-title" data-toggle="collapse" data-target="#collapseRepUnidos" style="cursor: pointer;">Reportes Asociados</h5>
            <hr class="my-2 collapse-hr"/>
        </div>
        <div id="collapseRepUnidos" class="panel-collapse collapse">
             <div class="panel-body">
                <!-- tabla-->
                  <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="tableReportesRepUnido"> <!--table-bordered -->
                     <thead> 
                        <tr>
                            <th class="spacer"></th>
                            <th class="text-center">Num.</th>
                            <th class="text-center">Fotografias</th>
                            <th class="text-center">Reporte Principal</th>
                            <th class="text-center">Reporte Asociado </th>
                            <th>Descripcion Reporte Unido</th>
                            <th class="text-center">Fecha</th>
                            <th>Eliminar Reporte</th>
                            <th class="spacer"></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                 </table>
             </div>
                 <!-- fin tabla-->
             </div>
        </div>
    </div>
    <!-- fin collapse-->

    <div id="testDiv">
        <div id="contenedor" style="display: flex; justify-content: space-between; gap: 10px;
}">
        <!-- galeria-->
             <div id="columna2" style="width: 50%;">
            <h5 id="headerP" style="text-align: center;font-weight: bold;"></h5>
            <div  class="gallery-wrapper">
               <div class="gallery-bg" style="height: 441px;">
                    <div class="" id="fotografia-galeryPadre" style=" display: flex; justify-content: space-between; flex-wrap: wrap;">
                    </div>
                </div>
            </div>
            </div>

            <div id="columna1" style="width: 50%;"> 
            <!--<div id="header"></div>-->
            <h5 id="header" style="text-align: center;font-weight: bold;"> </h5>
           
            <div class="gallery-wrapper" >
                <div class="gallery-bg" style="height: 441px;">
                    <div class="" id="fotografia-galery" style=" display: flex; justify-content: space-between; flex-wrap: wrap;">
                    </div>
                </div>
            </div>
            </div>
        <!-- galeria -->
       </div>
   </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/fileInput.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
        usuario = "<%= Session["usuario"] %>"
        ReportesVialesPath = "<%= ViewState["ReportesVialesPath"] ?? "null" %>";
    </script>
    <!-- Scripts -->
    <script src="../js/jsReportesVialesRepetidos.js"></script>
</asp:Content>