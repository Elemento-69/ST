<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DescripcionActualProyecto.aspx.cs" Inherits="Covialgt.Ejecucion.DescripcionActualProyecto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    
    <h1>Descripción Actual del Proyecto</h1>
    <hr class="thick"/>
    <div class="accordion" id="accordionExample">
        <div data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h4 class="mt-4">
            Creaci&oacute;n de Comentario
            </h4>
            <hr class="line-solid" />
        </div>
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card">
            <div class="card-body">
                <div class="row justify-content-center my-auto">
                    <div class="col-md-11 col-lg-11">
                        <div class="row big-gutter" id="add-form">
                             <%if ((HttpContext.Current.User.IsInRole("Administradores"))||(HttpContext.Current.User.IsInRole("DIRECTOR")))
                { %>
                            <div class="form-group col-md-6">
                                <label for="PlanAnualList">Plan Anual</label>
                                <select ID="PlanAnualList" Class="form-control plan-select"></select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="ProgramaList">Programa</label>
                                <select ID="ProgramaList" Class="form-control program-select"></select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="ProyectoList">Proyecto</label>
                                <select Class="form-control proyecto-select" id="ProyectoList"></select>
                            </div>
                             <%} %>
           <%if (HttpContext.Current.User.IsInRole("Supervisor"))
                { %>
       
        <div class="form-group col-md-12">
            <label for="ProyectoListSup">Proyectos</label>
            <select Class="form-control" id="ProyectoListSup"></select>
        </div>
        
        <%} %>
                            <div class="form-group col-md-6">
                                <label for="textareaComentario">Comentario</label>
                                <textarea class="form-control" id="textareaComentario" rows="4"></textarea>
                            </div> 
                        </div>
                        <button type="button" id="AddComent-btn" class="btn btn-primary btn-form float-right ml-3 mb-3">AGREGAR</button>
                        <button type="button" class="btn btn-outline-secondary btn-form float-right" id="getLast-btn">OBTENER EL ÚLTIMO</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <!-- collapse 2 -->
        <div data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <h4 class="mt-4">
            Búsqueda de Comentario
            </h4>
            <hr class="line-solid" />
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingOne" data-parent="#collapseTwo">
          <div class="card">
            <div class="card-body">
                <div class="big-gutter row  my-auto">
                         <%if ((HttpContext.Current.User.IsInRole("Administradores"))||(HttpContext.Current.User.IsInRole("DIRECTOR")))
                { %>
                    <div class="form-group col-md-6">
                        <label for="PlanAnualList-busqueda">Plan Anual</label>
                        <select ID="PlanAnualList-busqueda" Class="form-control plan-select"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="ProgramaList-busqueda">Programa</label>
                        <select ID="ProgramaList-busqueda" Class="form-control program-select"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="ProyectoList-busqueda">Proyecto</label>
                        <select Class="form-control proyecto-select" id="ProyectoList-busqueda"></select>
                    </div>
                       <%} %>
           <%if (HttpContext.Current.User.IsInRole("Supervisor"))
                { %>
       
        <div class="form-group col-md-12">
            <label for="ProyectoListSup">Proyectos</label>
            <select Class="form-control" id="ProyectoListSupBusqueda"></select>
        </div>
        
        <%} %>
                    <div class="col-12">
                        <label class="mt-4 mb-0">Tipo de busqueda</label>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="row h-100">
                            <div class="col-3 my-auto">
                                <label>Por Proyecto</label>
                            </div>
                            <div class="col-9">
                                <div class="card h-100">
                                    <div class="card-body row no-gutters py-2 px-3">
                                        <div class="col-xl-6 mb-3">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" class="custom-control-input" id="customRadio1" name="tipoFiltro"
                                                    value="proyXfecha" checked>
                                                <label class="custom-control-label" for="customRadio1">Por Fecha</label>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" class="custom-control-input" id="customRadio2" name="tipoFiltro"
                                                    value="proyecto">
                                                <label class="custom-control-label" for="customRadio2">Todos los Comentarios</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="row h-100">
                            <div class="col-3 my-auto">
                                <label>Todos los Proyectos</label>
                            </div>
                            <div class="col-9">
                                <div class="card h-100">
                                    <div class="card-body px-2 py-3">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" class="custom-control-input" id="customRadio3" name="tipoFiltro" value="todosXfecha">
                                            <label class="custom-control-label" for="customRadio3">Por Fecha</label>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-5 col-lg-4 mt-3">
                        <div class="form-group">
                            <label for="desdeBusqueda">Fecha desde</label>
                            <div class="input-group date" id="desdeBusqueda-dp" data-target-input="nearest">
                                <input id="desdeBusqueda" type="text" name="desdeBusqueda" autocomplete="off" class="form-control">
                                <div class="input-group-append" data-target="#desdeBusqueda-dp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-5 col-lg-4 offset-md-1 offset-lg-2 mt-3">
                        <div class="form-group">
                            <label for="hastaBusqueda">Fecha hasta</label>
                            <div class="input-group date" id="hastaBusqueda-dp" data-target-input="nearest">
                                <input id="hastaBusqueda" type="text" name="hastaBusqueda" autocomplete="off" class="form-control">
                                <div class="input-group-append" data-target="#hastaBusqueda-dp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="button" class="btn btn-primary btn-form float-right" id="searchProys-btn">BUSCAR</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <!-- collapse 3 -->
        <div data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <h4 class="mt-3">
                Reportes de Comentario
            </h4>
            <hr class="line-solid" />
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card">
            <div class="card-body">
                <div class="row big-gutter my-auto">
                    <div class="form-group col-md-6">
                        <label for="PlanAnualList-reporte">Plan Anual</label>
                        <select ID="PlanAnualList-reporte" Class="form-control plan-select"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="ProgramaList-reporte">Programa</label>
                        <select ID="ProgramaList-reporte" Class="form-control program-select"></select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="ProyectoList-reporte">Proyecto</label>
                        <select Class="form-control proyecto-select" id="ProyectoList-reporte"></select>
                    </div>
                    <div class="col-12">
                        <label class="mt-4 mb-0">Tipo de busqueda</label>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="row h-100">
                            <div class="col-3 my-auto">
                                <label >Todos los Proyecto</label>
                            </div>
                            <div class="col-9">
                                <div class="card h-100">
                                    <div class="card-body px-2 py-3 row no-gutters">
                                        <div class="col-xl-6 mb-3">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" class="custom-control-input" id="customRadio5" name="example1">
                                                <label class="custom-control-label" for="customRadio5">Por Fecha</label>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" class="custom-control-input" id="customRadio6" name="example1">
                                                <label class="custom-control-label" for="customRadio6">Todos los Comentarios</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="row h-100">
                            <div class="col-3  my-auto">
                                <label class="py-4">Todos los Proyectos</label>
                            </div>
                            <div class="col-9">
                                <div class="card h-100">
                                    <div class="card-body px-2 py-3 row no-gutters">
                                        <div class="col-xl-6 mb-3">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" class="custom-control-input" id="customRadio7" name="example2">
                                                <label class="custom-control-label" for="customRadio7">Por Fecha</label>
                                            </div>  
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" class="custom-control-input" id="customRadio4" name="example2">
                                                <label class="custom-control-label" for="customRadio4">Todos los Comentarios</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label for="desde">Fecha desde</label>
                            <div class="input-group date" id="desde-dp" data-target-input="nearest">
                                <input id="desde" type="text" name="desde" autocomplete="off" class="form-control">
                                <div class="input-group-append" data-target="#desde-dp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4  offset-sm-2">
                        <div class="form-group">
                            <label for="hasta">Fecha hasta</label>
                            <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                                <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                                <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                                    <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-form float-right">IMPRIMIR</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4" id="comentarios-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Proyecto</th>
                        <th class="text-center">Fecha</th>
                        <th class="text-center">Comentario</th>
                        <th class="text-center">Usuario</th>
                        <th class="text-center">Rol</th>
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
    <%: Scripts.Render("~/js/jsEditTableButtons.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        rol = '<%= Session["rol"] %>'
        EsSupervisor = '<%= EsSupervisor%>'
        $(document).ready(function () {
            loadDefaultComponents();
            $('[data-toggle="popover"]').popover();
        });
    </script>
    <%: Scripts.Render("~/js/jsDescripcionActualProyecto.js") %>
</asp:Content>
