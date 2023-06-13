<%@ Page Title="Declaración Jurada"       Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmDeclaracionJurada.aspx.cs" Inherits="Covialgt.Reportes.frmDeclaracionJurada" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Declaración Jurada</h1>
    <hr class="thick"/>
    <br />
        <div class="row justify-content-end">
       
                <div class="col-sm-3 col-xl-3">
                    <a type="button" id="btnRegresarconsultaestimaciones" class="btn btn-outline-secondary btn-block" style="display:none">REGRESAR</a>
                </div>
            </div>
               <div class="col-sm-1 col-xl-3">
                    <input type="date" class="form-control" id="fecha1" name="fecha1" style="display:none" >
                </div>
            <div class="col-sm-1 col-xl-2">
                    <input type="date" class="form-control" id="fecha2" name="fecha2"  style="display:none">
                </div>
            <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="txtempresa" name="txtempresa" style="display:none">
                </div>
            <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="letra" name="letra" style="display:none">
                </div>
            <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="correlproyecto" name="correlproyecto"  style="display:none">
                </div>
            <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="anioletras" name="anioletras" style="display:none">
                </div>
    <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="anioSupernumero" name="anioSupernumero" style="display:none">
                </div>
    <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="proyectoSupernumero" name="proyectoSupernumero" style="display:none">
                </div>
    <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="letraproyectoSuper" name="letraproyectoSuper" style="display:none">
                </div>
    <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="proyectosuper" name="proyectosuper" style="display:none">
                </div>
    <div class="col-sm-1 col-xl-1">
                    <input type="text" class="form-control" id="aniosuper" name="aniosuper"style="display:none" >
                </div>
     <div id="testDiv">
     </div>
    <div class="card custom-card border-0 mt-3">
        <div class="card-body">
            <div class="row big-gutter justify-content-center my-auto">
               <div class="form-group col-md-6">
                    <label>Fecha De Acta</label>
                    <div class="row">
                        <div class="col-1 pr-0 my-2">
                            <label>Dia</label>
                        </div>
                        <div class="col-2 px-0">
                            <select class="form-control" id="dia" name="dia">
                            <option value="primero">primero</option>
                            <option value="Dos">Dos</option>
                            <option value="Tres">Tres</option>
                            <option value="Cuatro">Cuatro</option>
                            <option value="Cinco">Cinco</option>
                            <option value="Seis">Seis</option>
                            <option value="Siete">Siete</option>
                            <option value="Ocho">Ocho</option>
                            <option value="Nueve">Nueve</option>
                            <option value="Diez">Diez</option>
                            <option value="Once">Once</option>
                            <option value="Doce">Doce</option>
                            <option value="Trece">Trece</option>
                            <option value="Catorce">Catorce</option>
                            <option value="Quince">Quince</option>
                            <option value="Dieciseis">Dieciseis</option>
                            <option value="Diecisite">Diecisite</option>
                            <option value="Dieciocho">Dieciocho</option>
                            <option value="Diecinueve">Diecinueve</option>
                            <option value="Veinte">Veinte</option>
                            <option value="Veintiuno">Veintiuno</option>
                            <option value="Veintidos">Veintidos</option>
                            <option value="Veintitres">Veintitres</option>
                            <option value="Veinticuatro">Veinticuatro</option>
                            <option value="Veinticinco">Veinticinco</option>
                            <option value="Veintiseis">Veintiseis</option>
                            <option value="Vevntisiete">Vevntisiete</option>
                            <option value="Veintiocho">Veintiocho</option>
                            <option value="Veintinueve">Veintinueve</option>
                            <option value="Treinta">Treinta</option>
                            <option value="Treinta y uno">Treinta y uno</option>
                        </select>
                        </div>
                        <div class="col-1 pr-0 my-2">
                            <label>Mes</label>
                        </div>
                        <div class="col-3 px-2">
                            <select class="form-control" id="mes" name="mes">
                            <option value="enero">enero</option>
                            <option value="febrero">febrero</option>
                            <option value="marzo">marzo</option>
                            <option value="abril">abril</option>
                            <option value="mayo">mayo</option>
                            <option value="junio">junio</option>
                            <option value="julio">julio</option>
                            <option value="agosto">agosto</option>
                            <option value="septiembre">septiembre</option>
                            <option value="octubre">octubre</option>
                            <option value="noviembre">noviembre</option>
                            <option value="diciembre">diciembre</option>
                        </select>  
                        </div>
                        <div class="col-1 pr-0 my-2">
                            <label>Año</label>
                        </div>
                        <div class="col-3 px-2">
                            <select class="form-control" id="anio" name="anio">
                            <option value="dos mil veintitres">dos mil veintitres</option>
                            <option value="dos mil veintidós">dos mil veintidós</option>
                            <option value="dos mil veintiuno">dos mil veintiuno</option>
                            <option value="dos mil veinte">dos mil veinte</option>
                            <option value="dos mil diecinueve">dos mil diecinueve</option>
                            <option value="dos mil dieciocho">dos mil dieciocho</option>
                            <option value="dos mil diecisiete">dos mil diecisiete</option>
                            <option value="dos mil dieciséis">dos mil dieciséis</option>
                            <option value="dos mil quince">dos mil quince</option>
                            <option value="dos mil catorce">dos mil catorce</option>
                            <option value="dos mil trece">dos mil trece</option>
                            <option value="dos mil doce">dos mil doce</option>
                            <option value="dos mil once">dos mil once</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="lugar">Lugar</label>
                    <input type="text" class="form-control" id="lugar" name="lugar" placeholder="ej: En la ciudad de Guatemala del departamento de Guatemala">
                </div>
                 <div class=" col-md-5 col-lg-6">
                    <label for="horaletras">Hora de Acta (En Letras)</label>
                    <input type="text" class="form-control" id="horaletras" name="horaletras" placeholder="ej: doce horas con treinta minutos">
                </div>
                <div class="form-group col-md-6">
                    <label for="direccion">Direccion</label>
                    <input type="text" class="form-control" id="direccion" name="direccion" >
                </div>
                <div class="form-group col-md-6">
                    <label for="notario">Notario</label>
                    <input type="text" class="form-control" id="notario" name="notario" >
                </div>
                <div class="form-group col-md-6">
                    <label for="requeridopor">Requerido Por</label>
                    <input type="text" class="form-control" id="requeridopor" name="requeridopor" >
                </div>
                 <div class="form-group col-md-6">
                    <label for="listaestimsuper">Estimación de Supervisión</label>
                    <select id="listaestimsuper" class="form-control"></select>
                </div>
                <div class="form-group col-md-6">
                    <label for="minutosredaccion">Minutos de redacción</label>
                    <div class="row ">
                    <div class="col-8 col-sm-4 mb-3 mb-sm-0">
                        <select class="form-control" id="minutosredaccion" name="minutosredaccion">
                            <option value="quince">quince</option>
                            <option value="veinte">veinte</option>
                            <option value="treinta">treinta</option>
                            <option value="cuarenta">cuarenta</option>
                            <option value="cuarenta y cinco">cuarenta y cinco</option>
                        </select>
                    </div>
                </div>
                </div>
               <div class="col-12">
                    <div class="form-group custom-control custom-checkbox">
                        <h1>Estimaciones de Contratistas a Incluir en la declaración</h1>
                    </div>
                </div>
                <div class="col-12">
                    
                </div>
                 <div class="form-group col-md-6">
                    <label for="listaproyectos">Proyecto</label>
                    <select id="listaproyectos" class="form-control"></select>
                </div>
                <div class="form-group col-md-6">
                    <label for="listaestimcontratista">Estimación</label>
                    <select id="listaestimcontratista" class="form-control"></select>
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="EsEmpresa">
                        <label class="custom-control-label" for="EsEmpresa">Estimación Unica</label>
                    </div>
                </div>
                
                <div class="col-md-6 form-group">
                    <label for="contratista">Contratista</label>
                    <input type="text" class="form-control" id="contratista" name="contratista">
                </div>
                <div class="col-md-6 form-group">
                    <label for="cargo">Cargo</label>
                    <input type="text" class="form-control" id="cargo" name="cargo" >
                </div>
                <div class="form-group col-md-6">
                    <label for="FechaInicio">Fecha Inicio</label>
                    <div class="input-group date" id="fechaInicio-dp" data-target-input="nearest">
                        <input id="FechaInicio" type="text" name="FechaInicio"  data-target="#fechaInicio-dp"  autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#fechaInicio-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="FechaHasta">Fecha Final</label>
                    <div class="input-group date" id="fechaFinal-dp" data-target-input="nearest">
                        <input id="FechaHasta" type="text" name="FechaHasta"  data-target="#fechaFinal-dp"  autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#fechaFinal-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                 <div class="col-md-6 ">
                    
                </div>
                 </div>
                <div class="row">
                    <p class="text-danger">*Fechas Aplican para trabajos que serán presentados Posteriormente</p>
                </div>   
            <div class="row">
                <div class="form-group col-md-2">
                    <button type="button" class="btn btn-primary btn-form float-right" id="btn-IncluirEstimacion">Incluir Estimación</button>
                </div>
                <div class="form-group col-md-2">
                    <button type="button" class="btn btn-primary btn-form float-right" id="btn-TrabajosSuspendidos">Trabajos Suspendidos</button>
                </div>
                <div class="form-group col-md-2">
                    <button type="button" class="btn btn-primary btn-form float-right" id="btn-AsignarContratista">Sin Asignar Contratista</button>
                </div>
                <div class="form-group col-md-2">
                    <button type="button" class="btn btn-primary btn-form float-right" id="btn-PresentacionPosterior">Presentación Posterior</button>
                </div>
            </div>
            <div class="row">
                
                <!--<div class="form-group col-md-12">
                    <textarea class="form-control" id="directorTecnico" name="directorTecnico" rows="5"></textarea>
                </div>-->
                <div class="w-100"></div>
                <div class="table-responsive mt-5">
                    <table class="table table-bordered" id="comentario_selected-table">
                        <thead>
                        <tr>
                            
                            <th style="display: none">ID</th> 
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <!--<button type="button" class="btn btn-danger" onclick="eliminarFila()"><i class="fas fa-trash fa-sm fa-fw"></i></button>-->
                </div>
                
                <div class="col-12 mt-5">
                    <button type="button" class="btn btn-primary btn-form float-right" id="btn-InsertarDeclaracion">GUARDAR</button>
                </div>
                </div>
            </div>
                
                
           
            <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4"  id="acta-table">
                <thead>
                    <tr>
                         <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Fecha Declaración</th>
                        <th class="text-center">Estimación</th>
                        <th class="text-center">Descripción</th>
                         <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
                </table>
            </div>
        </div>

        <!-- final del card -->
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">  
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>";
        token = "<%= Session["token"] ?? "null" %>";
        plan = "<%= Session["plan"] %>";
        proyecto = "<%= Session["proyecto"] %>";
        usuario = "<%= Session["usuario"] %>";
        docCambioId = "<%= ViewState["docCambioId"] ?? null %>";
        url_proyecto = "<%= HttpContext.Current.Request.Url.AbsoluteUri.Replace(HttpContext.Current.Request.Url.PathAndQuery, "/") %>";
        entidad = "<%= Session["entidad"] %>";
    </script>
    <%: Scripts.Render("~/js/jsDeclaracionJurada.js") %>
</asp:Content>
