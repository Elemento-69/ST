<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RegistroDatos.aspx.cs"
    Inherits="Covialgt.Ejecucion.RegistroDatos" Async="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <style type="text/css"> 
        .not-active { 
            pointer-events: none; 
            cursor: default; 
        } 

    </style>


    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Registro de Datos</h1>
    <hr class="thick" />
    <h2>Registros Mensuales</h2>

    <div class="row justify-content-between">
          <%if ((HttpContext.Current.User.IsInRole("Administradores"))||(HttpContext.Current.User.IsInRole("DIRECTOR")))
                { %>
        <div class="form-group col-md-5 col-lg-5">
            <label for="PlanAnual">Plan Anual</label>
            <select id="PlanAnualList" class="form-control"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 offset-lg-1">
            <label for="cmbPrograma">Programa</label>
            <select id="ProgramaList" class="form-control"></select>
        </div>
        <div class="form-group col-md-5 col-lg-5 col-xl-5">
            <label for="ProyectoList">Proyecto</label>
            <select class="form-control" id="ProyectoList"></select>
        </div>
         <%} %>
           <%if (HttpContext.Current.User.IsInRole("Supervisor"))
                { %>
       
        <div class="form-group col-md-12">
            <label for="ProyectoListSup">Proyectos</label>
            <select Class="form-control" id="ProyectoListSup"></select>
        </div>
        
        <%} %>
         <div id="testDiv">
           
             </div>
        <div id="Bloqueo">
        <h2 style="color:red" id="vEtiquetaProyectoInhablitado"></h2>
             </div>
        <div class="form-group col-md-4 col-xl-3">
            <label for="OpcionUsuario">Opciones de Usuario</label>
            <div class="dropdown">
                <button class="form-control btn btn-light dropdown-toggle" data-display="static" type="button" id="OpcionUsuario" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Seleccionar Opci&oacute;n
                </button>
                <div class="dropdown-menu dropdown-menu-right col-12" aria-labelledby="OpcionUsuario">
                    <a id='btnImprimirAnexo' class="dropdown-item  text-wrap"><i class='fas fa-print fa-lg fa-fw mr-3'></i>Imprimir</a>
                    <a id='btnHistorialAnexos' class="dropdown-item  text-wrap"><i class='fas fa-inbox fa-lg fa-fw mr-3'></i>Historial de Anexos</a>
                    <a id='btngEquipos' data-urlbase="GestionEquiposProyecto" class="dropdown-item  text-wrap option-proyect"><i class='fas fa-briefcase fa-lg fa-fw mr-3'></i>Gesti&oacute;n de Equipos</a>
                    <a id='btnProgra' data-urlbase="ProgramacionFisicaProyecto" class="dropdown-item  text-wrap option-proyect"><i class='fas fa-calendar fa-lg fa-fw mr-3'></i>Gesti&oacute;n de Programas de Trabajo</a>
                    <a id='btnTrabajos' class="dropdown-item text-wrap "><i class='fas fa-file fa-lg fa-fw mr-3'></i>Gesti&oacute;n de Trabajo por Administraci&oacute;n</a>
                    <a id='btngEstimaciones' data-urlbase="GestionDeEstimaciones" class="dropdown-item text-wrap option-proyect"><i class='fas fa-folder-plus fa-lg fa-fw mr-3'></i>Agregar Estimaci&oacute;n</a>
                    <a id='btncEstimaciones' data-urlbase="ConsultaEstimaciones?VieneRegistroDatos=1&" class="dropdown-item  text-wrap option-proyect"><i class='fas fa-edit fa-lg fa-fw mr-3'></i>Consultar Estimaciones</a>
                    <a id='btnSanciones' class="dropdown-item  text-wrap"><i class='fas fa-book-open fa-lg fa-fw mr-3'></i>Sanciones</a>
                    <a id='btnDocumentosCambio' data-urlbase="DocumentosDeCambio" class="dropdown-item  text-wrap option-proyect"><i class='fas fa-share-square fa-lg fa-fw mr-3'></i>Documentos de Cambio</a>
                    <%--<a href="Registro" class="dropdown-item  text-wrap"><i class='fas fa-plus-square fa-lg fa-fw mr-3'></i>Emergencias</a>--%>
                    <%--<a class="dropdown-item  text-wrap"><i class='fas fa-camera fa-lg fa-fw mr-3'></i>Fotograf&iacute;as de Ejecuci&oacute;n a Emergencia</a>--%>
                    <a id='btnIngresarCT' data-urlbase="AsociacionCantidadesTramos" class="dropdown-item  text-wrap  option-proyect"><i class='fas fa-road fa-lg fa-fw mr-3'></i>Asociaci&oacute;n cantidades-tramos</a>
                    <a id='btnFotoAdmin' data-urlbase="frmFotografiasAdministrativas" class="dropdown-item  text-wrap  option-proyect" ><i class='fas fa-camera fa-lg fa-fw mr-3'></i>Fotograf&iacute;as Administrativas</a>
                    <a id='btnImprimirCT' class="dropdown-item  text-wrap"><i class='fas fa-print fa-lg fa-fw mr-3'></i>Imprimir Cantidades/Tramos</a>
                    <a id='btnFotoB' data-urlbase="FotografiasBitacora" class="dropdown-item  text-wrap  option-proyect"><i class='fas fa-archive fa-lg fa-fw mr-3'></i>Bitacora</a>
                    <%--<a class="dropdown-item  text-wrap"><i class='fas fa-video fa-lg fa-fw mr-3'></i>Videos</a>--%>
                    <a id='btnActaNotarial' class="dropdown-item  text-wrap"><i class='fas fa-file fa-lg fa-fw mr-3'></i>Acta Notarial</a>
                    <a id='btnActaInicio' class="dropdown-item  text-wrap"><i class='fas fa-file fa-lg fa-fw mr-3'></i>Acta de Inicio</a>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive mt-5">
        <table id="PeriodosTable" class="table table-bordered">
            <thead>
                <tr>
                    <th class="spacer" style="width: 90px;"></th>
                   <th class="text-center">Acciones</th>
                    <th class="text-center">Desde</th>
                    <th class="text-center">Hasta</th>
                    <th class="text-center">Estado Habilitado</th>
                    <th class="spacer"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        base_url = '<%= ViewState["baseURL"] %>'
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        usuario = "<%= Session["usuario"] %>"
        baseSitio = "<%= ViewState["baseSitio"] ?? "" %>"
    </script>
    <%: Scripts.Render("~/js/jsRegistroDatos.js") %>
</asp:Content>
