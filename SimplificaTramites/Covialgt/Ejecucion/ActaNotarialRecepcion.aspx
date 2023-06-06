<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ActaNotarialRecepcion.aspx.cs" Inherits="Covialgt.Ejecucion.ActaNotarialRecepcion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Informes Técnicos</h1>
    <hr class="thick"/>
    <br />
    <h4>Acta Notarial de Recepción</h4>
        <div class="row justify-content-end">
       
                <div class="col-sm-3 col-xl-3">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
               
     
    </div>
     <div id="testDiv">
     </div>
    <div class="card custom-card border-0 mt-3">
        <div class="card-body">
            <div class="row big-gutter justify-content-center my-auto">
                <div class="form-group col-md-6">
                    <label for="proyecto">Categoría del Proyecto</label>
                    <select class="form-control" id="Categoria" name="proyecto">
                    </select>
                </div>
               <div class="form-group col-md-6">
                        <label for="fecha">Fecha</label>
                        <div class="input-group date" id="fecha-dp" data-target-input="nearest">
                            <input id="fecha" type="text" name="fecha" autocomplete="off" data-target="#fecha-dp" class="form-control">
                            <div class="input-group-append" data-target="#fecha-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                <div class="form-group col-md-6">
                    <label for="departamento">Departamento</label>
                    <input type="text" class="form-control" id="departamento" name="departamento" placeholder="Ingresar Departamento">
                </div>
                <div class="form-group col-md-6">
                    <label for="municipio">Municipio</label>
                    <input type="text" class="form-control" id="municipio" name="municipio" placeholder="Ingresar Municipio">
                </div>
                <div class="form-group col-md-6">
                    <label for="proyecto">Hora</label>
                    <div class="row ">
                    <div class="col-8 col-sm-4 mb-3 mb-sm-0">
                        <select class="form-control" id="hora" name="hora">
                            <option value="doce">(12:00)</option>
                            <option value="trece">(13:00)</option>
                            <option value="catorce">(14:00)</option>
                            <option value="quince">(15:00)</option>
                            <option value="dieciseis">(16:00)</option>
                            <option value="diecisiete">(17:00)</option>
                            <option value="dieciocho">(18:00)</option>
                            <option value="diecinueve">(19:00)</option>
                            <option value="veinte">(20:00)</option>
                            <option value="veintiuno">(21:00)</option>
                            <option value="veintidos">(22:00)</option>
                            <option value="veintitres">(23:00)</option>
                            <option value="veinticuatro">(24:00)</option>
                            <option value="una">(01:00)</option>
                            <option value="dos">(02:00)</option>
                            <option value="tres">(03:00)</option>
                            <option value="cuatro">(04:00)</option>
                            <option value="cinco">(05:00)</option>
                            <option value="seis">(06:00)</option>
                            <option value="siete">(07:00)</option>
                            <option value="ocho">(08:00)</option>
                            <option value="nueve">(09:00)</option>
                            <option value="diez">(10:00)</option>
                            <option value="once">(11:00)</option>
                        </select>
                    </div>
                    <div class="d-inline pt-2">Horas</div>
                </div>
                </div>
                <div class=" col-md-5 col-lg-6">
                    <label for="direccion">Dirección(En Letras)</label>
                    <input type="text" class="form-control" id="direccion" name="direccion" placeholder="Ejemplo: dieciséis calle cero guión treinta zona uno.">
                </div>
                <div class="form-group col-md-6">
                    <label for="notario">Nombre Notario Acta</label>
                    <input type="text" class="form-control" id="notario" name="notario" placeholder="Ingresar Notario Acta">
                </div>
                <div class="form-group col-md-6">
                    <label for="departamento">Superintendente</label>
                    <input type="text" class="form-control" id="superintendente" name="superintendente">
                </div>
                <div class="form-group col-md-6">
                    <label for="notarioProyecto">Notario Proyecto</label>
                    <input type="text" class="form-control" id="notarioProyecto" name="notarioProyecto" placeholder="Ingresar Notario Proyecto">
                </div>
                <div class="form-group col-md-6">
                    <label for="supervisorRegional">Supervisor Regional</label>
                    <input type="text" class="form-control" id="supervisorRegional" name="supervisorRegional" placeholder="Ingresar Supervisor Regional">
                </div>
                <div class="col-12">
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="EsEmpresa">
                        <label class="custom-control-label" for="EsEmpresa">Es Empresa</label>
                    </div>
                </div>
                <div class="col-md-6 form-group d-none">
                    <label for="cargoEmpresa">DelegadoResidente</label>
                    <input type="text" class="form-control empresa-input" id="delegado" name="delegado">
                </div>
                <div class="col-md-6 form-group d-none">
                    <label for="cargoPersona">Empresa</label>
                    <input type="text" class="form-control empresa-input" id="empresa" name="empresa">                      
                </div>
                <div class="col-md-6 form-group">
                    <label for="cargoEmpresa">Nombre Persona que Actua a Cargo de Empresa</label>
                    <input type="text" class="form-control" id="cargoEmpresa" name="cargoEmpresa">
                </div>
                <div class="col-md-6 form-group">
                    <label for="cargoPersona">Cargo Persona que Actua a Cargo Empresa</label>
                    <select class="form-control" id="cargoPersona" name="cargoPersona">                      
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label>Codigo Nombramiento</label>
                    <div class="row">
                        <div class="col-4 pr-0 my-2">
                            <label>No. SDT-COVIAL-</label>
                        </div>
                        <div class="col-4 px-0">
                            <input type="text" class="form-control" id="codigoCovial1" name="codigoCovial">
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" id="codigoCovial2" name="codigoCovial">
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="fechaInspeccion">Fecha Nombramiento</label>
                    <div class="input-group date" id="fechaNombramiento-dp" data-target-input="nearest">
                        <input id="hasta" type="text" name="fechaNombramiento"  data-target="#fechaNombramiento-dp"  autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#fechaNombramiento-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="directorTecnico">Nombre Sub-Director-Técnico</label>
                    <input type="text" class="form-control" id="directorTecnico" name="directorTecnico">
                </div>
                <div class="form-group col-md-6">
                    <label for="hasta">Fecha Inspeccion</label>
                    <div class="input-group date" id="inspeccionFecha-dp" data-target-input="nearest">
                        <input id="fechaInspeccion" type="text" name="fechaFinalInspeccion" data-target="#inspeccionFecha-dp" autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#inspeccionFecha-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="fechaInicio">Fecha Inicio</label>
                    <div class="input-group date" id="fechaInicio-dp" data-target-input="nearest">
                        <input id="fechaInicio" type="text" name="fechaInicio"  data-target="#fechaInicio-dp" autocomplete="off" class="form-control" >
                        <div class="input-group-append" data-target="#fechaInicio-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="fechaInicio">Fecha Final</label>
                    <div class="input-group date" id="fechaFinal-dp" data-target-input="nearest">
                        <input id="fechaFinal" type="text" name="fechaInicio" data-target="#fechaFinal-dp" autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#fechaFinal-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="clase">Clase</label>
                    <input type="text" class="form-control" id="clase" name="clase" placeholder="Ingresar Clase">
                </div>
                <div class="form-group col-md-6">
                    <label for="poliza">Poliza</label>
                    <input type="text" class="form-control" id="poliza" name="poliza" placeholder="Ingresar Poliza">
                </div>
                <div class="form-group col-md-6">
                    <label for="aseguradora">Aseguradora</label>
                    <select class="form-control poliza-input" id="aseguradora" name="aseguradora"> 
                        <option>Afianzadora General, Sociedad Anónima<option>
                        <option>Fianzas de Occidente, Sociedad Anónima</option>
                        <option>Afianzadora Solidaria, Sociedad Anónima</option>
                        <option>Afianzadora G&amp;T, Sociedad Anónima</option>
                        <option>Aseguradora Fidelis, Sociedad Anónima</option>
                        <option>Afianzadora CHN</option>
                        <option>Aseguradora Rural, Sociedad Anónima</option>
                        <option>Aseguradora Guatemalteca, Sociedad Anónima</option>
                        <option>La Ceiba, Sociedad Anónima</option>
                        <option>El Roble, Sociedad Anónima</option>
					    <option>Seguros Privanza, Sociedad Anónima</option>
					    <option>Afianzadora Provinza</option>
                        <option>Seguros Alianza, Sociedad Anónima</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="valorPoliza">Valor Poliza</label>
                    <input type="text" class="form-control" id="valorPoliza" name="valorPoliza" placeholder="Ingresar Valor Acta">
                </div>
                <div class="form-group col-md-6">
                    <label for="minutosActa">Minutos después de inicio de acta</label>
                    <select class="form-control" id="minutosActa" name="minutosActa">
                        <option value="quince minutos">quince minutos</option>
                        <option value="treinta minutos">treinta minutos</option>
                        <option value="cuarenta y cinco">cuarenta y cinco</option>
                        <option value="sesenta minutos">sesenta minutos</option>
                    </select>
                </div>
                <div class="col-md-6 py-4">
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheckFianza">
                        <label class="custom-control-label" for="customCheckFianza">Fianza de Conservacion de Obra</label>
                    </div>
                </div>
                 <div class="col-md-6 form-group d-none">
                    <label for="clasep">Clase</label>
                    <input type="text" class="form-control poliza-input" id="clasep" name="clasep">
                </div>
                <div class="col-md-6 form-group d-none">
                    <label for="polizap">Poliza</label>
                    <input type="text" class="form-control poliza-input" id="polizap" name="polizap">                      
                </div>
                <div class="col-md-6 form-group d-none">
                    <label for="valor">Valor</label>
                    <input type="text" class="form-control poliza-input" id="valorp" name="valorp">
                </div>
                <div class="col-md-6 form-group d-none">
                    <label for="Aseguradora">Aseguradora</label>
                    <select class="form-control poliza-input" id="Aseguradorap" name="Aseguradorap"> 
                        <option>Afianzadora General, Sociedad Anónima<option>
                        <option>Fianzas de Occidente, Sociedad Anónima</option>
                        <option>Afianzadora Solidaria, Sociedad Anónima</option>
                        <option>Afianzadora G&amp;T, Sociedad Anónima</option>
                        <option>Aseguradora Fidelis, Sociedad Anónima</option>
                        <option>Afianzadora CHN</option>
                        <option>Aseguradora Rural, Sociedad Anónima</option>
                        <option>Aseguradora Guatemalteca, Sociedad Anónima</option>
                        <option>La Ceiba, Sociedad Anónima</option>
                        <option>El Roble, Sociedad Anónima</option>
					    <option>Seguros Privanza, Sociedad Anónima</option>
					    <option>Afianzadora Provinza</option>
                        <option>Seguros Alianza, Sociedad Anónima</option>
                    </select>
                </div>
                <div class="col-12 mt-5">
                    <button type="button" class="btn btn-primary btn-form float-right" id="saveActa-btn">GUARDAR</button>
                </div>
            </div>
            <div class="table-responsive">
            <table class="table table-bordered table-hover mt-4"  id="acta-table">
                <thead>
                    <tr>
                         <th class="spacer"></th>
                        <th class="text-center"></th>
                        <th class="text-center">Fecha Acta</th>
                        <th class="text-center">Año</th>
                        <th class="text-center">Proyecto Codigo</th>
                        <th class="text-center">Acta</th>
                        <th class="text-center">Descripcion Proyecto</th>
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
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= Session["plan"] %>"
        proyecto = "<%= Session["proyecto"] %>"
    </script>
    <%: Scripts.Render("~/js/jsActaNotarialRecepcion.js") %>
</asp:Content>
