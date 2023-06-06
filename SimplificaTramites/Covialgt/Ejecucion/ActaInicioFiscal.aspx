<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ActaInicioFiscal.aspx.cs" Inherits="Covialgt.Ejecucion.ActaInicioFiscal" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">  
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Acta de Inicio Fisico y Contractual</h1>
    <hr class="thick" />
      <div class="row justify-content-end">
       
                <div class="col-sm-3 col-xl-3">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
               
     
    </div>
    <div class="card custom-card border-0">
        <div class="card-body">
            <div class="row big-gutter">
                <div class="col-sm-6">
                    <label for="Categoria">Categor&iacute;a del proyecto</label>
                    <select class="form-control" id="Categoria" name="Categoria">
                    </select>
                </div>
                <div class="col-sm-6 d-none">
                    <label class="text-danger" for="OtraCategoria">**Escriba Categor&iacute;a del proyecto</label>
                    <input type="text" class="form-control" id="OtraCategoria" name="OtraCategoria">
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="fecha">Fecha</label>
                        <div class="input-group date" id="fecha-dp" data-target-input="nearest">
                            <input id="fecha" type="text" name="fecha" autocomplete="off" data-target="#fecha-dp" class="form-control">
                            <div class="input-group-append" data-target="#fecha-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="Departamento">Departamento</label>
                    <input type="text" class="form-control" id="Departamento" name="Departamento" placeholder="Ingresar Departamento">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="Municipio">Municipio</label>
                    <input type="text" class="form-control" id="Municipio" name="Municipio" placeholder="Ingresar Municipio">
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
                <div class=" col-md-6  form-group">
                    <label for="DirNotario">Direcci&oacute;n de Notario(En Letras)</label>
                    <input type="text" class="form-control" id="DirNotario" name="Municipio" placeholder="Ejemplo: dieciseis calle 0 guion treinta zona uno">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="NombreNotarioActa">Nombre Notario Acta</label>
                    <input type="text" class="form-control" id="NombreNotarioActa" name="NombreNotarioActa" placeholder="Ingresar Notario Acta">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="NombrePersonaRequiera">Nombre De Persona Requiere Acta</label>
                    <input type="text" class="form-control" id="NombrePersonaRequiera" name="NombrePersonaRequiera">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="CargoPersonaActa">Cargo De Persona Requiere Acta</label>
                    <select class="form-control d-none" id="CargoPersonaActa" name="CargoPersonaActa"></select>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="IngenieroSupervisorProyecto">Nombre Del Ingeniero Supervisor del Proyecto</label>
                    <input type="text" class="form-control" id="IngenieroSupervisorProyecto" name="IngenieroSupervisorProyecto">
                </div>
                <div class=" col-md-6  form-group">
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="EsEmpresa" name="EsEmpresa">
                        <label class="custom-control-label" for="EsEmpresa">Marque Si Es Empresa</label>
                    </div>
                </div>
                <div class="w-100"></div>
                <div class=" col-md-6  form-group d-none">
                    <label for="delegadoResidente">Nombre De Delegado Residente</label>
                    <input type="text" class="form-control empresa-input" id="delegadoResidente" name="delegadoResidente">
                </div>
                
                <div class=" col-md-6  form-group d-none">
                    <label for="nombreEmpresa">Nombre Empresa</label>
                    <input type="text" class="form-control  empresa-input" id="nombreEmpresa" name="nombreEmpresa">
                </div>
                <div class="w-100"></div>
                <div class=" col-md-6  form-group d-none">
                    <label for="IngenieroSupervisorRegional">Nombre Del Ingeniero Supervisor Regional</label>
                    <input type="text" class="form-control" id="IngenieroSupervisorRegional" name="IngenieroSupervisorRegional"
                        placeholder="Ingresar el Nombre del Supervisor Regional">
                </div>
                <div class=" col-md-6 form-group">
                    <label for="NumeroCertificacionFideicomiso">N&uacute;mero Certificaci&oacute;n Fideicomiso</label>
                    <input type="text" class="form-control" id="NumeroCertificacionFideicomiso" name="NumeroCertificacionFideicomiso"
                        placeholder="Ingresar N&uacute;mero de Certificaci&oacute;n Fideicomiso">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="FechaCertificacionFideicomiso">Fecha Certificaci&oacute;n Fideicomiso</label>
                    <div class="input-group date" id="FechaCertificacionFideicomiso-dp" data-target-input="nearest">
                        <input id="FechaCertificacionFideicomiso" type="text" name="fecha" autocomplete="off"
                             data-target="#FechaCertificacionFideicomiso-dp"
                            class="form-control">
                        <div class="input-group-append" data-target="#FechaCertificacionFideicomiso-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="FechaInicioEjecucion">Fecha Inicio Ejecuci&oacute;n</label>
                    <div class="input-group date" id="FechaInicioEjecucion-dp" data-target-input="nearest">
                        <input id="FechaInicioEjecucion" type="text" name="fecha" autocomplete="off"
                            data-target="#FechaInicioEjecucion-dp" class="form-control">
                        <div class="input-group-append" data-target="#FechaInicioEjecucion-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="NumeroEscrituraPublica">N&uacute;mero Contrato Escritura P&uacute;blica</label>
                    <input type="text" class="form-control" id="NumeroEscrituraPublica" name="NumeroEscrituraPublica"
                        placeholder="Ingresar N&uacute;mero de Contrato">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="FechaContratoEscrituraPublica">Fecha Contrato Escritura P&uacute;blica</label>
                    <div class="input-group date" id="FechaContratoEscrituraPublica-dp" data-target-input="nearest">
                        <input id="FechaContratoEscrituraPublica" type="text" name="fecha" autocomplete="off"
                            data-target="#FechaContratoEscrituraPublica-dp"
                            class="form-control">
                        <div class="input-group-append" data-target="#FechaContratoEscrituraPublica-dp"
                            data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="NotarioEscrituraPublica">Nombre de Notario Escritura P&uacute;blica</label>
                    <input type="text" class="form-control" id="NotarioEscrituraPublica" name="NotarioEscrituraPublica"
                        placeholder="Ingresar Nombre Notario Escritura P&uacute;blica">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="MandatarioEspecial">Nombre de Mandatario Especial</label>
                    <input type="text" class="form-control" id="MandatarioEspecial" name="MandatarioEspecial"
                        placeholder="Ingresar Nombre de Mandatario Especial" value="Luis Agusto Zelaya Estradé">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="CargoRepresentanteBanco">Cargo Representante Banco</label>
                    <select class="form-control" id="CargoRepresentanteBanco" name="CargoRepresentanteBanco">
                        <option value ="1">Mandatario especial con representaci&oacute;n del Banco Industrial Sociedad n&oacute;nima</option>
                        <option value ="2">Gerente y en consecuencia como representante legal Nato del Banco Industrial Sociedad n&oacute;nima</option>
                    </select>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="NumeroClausula">N&uacute;mero de Cl&aacute;usula (Plazo Contractual) en Letras</label>
                    <input type="text" class="form-control" id="NumeroClausula" name="Clausula">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="LiteralClausula">Literal (Plazo Contractual) solo si el contrato lo requiere</label>
                    <input type="text" class="form-control" id="LiteralClausula" name="LiteralClausula">
                </div>
                <div class=" col-md-6  form-group">
                    <div class="form-group">
                        <label for="InicioContrato">Fecha Inicio Contrato</label>
                        <div class="input-group date" id="InicioContrato-dp" data-target-input="nearest">
                            <input id="InicioContrato" type="text" name="fecha" autocomplete="off" 
                                data-target="#InicioContrato-dp"
                                class="form-control">
                            <div class="input-group-append" data-target="#InicioContrato-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-6  form-group">
                    <div class="form-group">
                         <label for="FinContrato">Fecha Fin Contrato</label>
                        <div class="input-group date" id="FinContrato-dp" data-target-input="nearest">
                            <input id="FinContrato" type="text" name="fecha" autocomplete="off" 
                                data-target="#FinContrato-dp"
                                class="form-control">
                            <div class="input-group-append" data-target="#FinContrato-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" col-md-6  form-group">
                    <label for="DiasContractuales">N&uacute;mero D&iacute;as Contractuales</label>
                    <input type="text" class="form-control" id="DiasContractuales frinteger-mask" name="DiasContractuales" placeholder="Ingresar N&uacute;mero D&iacute;as Contractuales">
                </div>
                <div class=" col-md-6  form-group">
                    <label for="TiempoLectura">Tiempo de Lectura</label>
                    <select class="form-control" id="TiempoLectura" name="TiempoLectura">
                        <option value="quince minutos">quince minutos</option>
                        <option value="treinta minutos">treinta minutos</option>
                        <option value="cuarenta y cinco">cuarenta y cinco</option>
                        <option value="sesenta minutos">sesenta minutos</option>
                    </select>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-primary float-right px-5" id="saveActa-btn">Guardar</button>
                </div>
                <div class="col-12 text-danger  h5 font-weight-bold mt-5">
                    **Si el informe es de 2 paginas imprimir duplex / doble cara
                </div>
                <div id="testDiv">
           
    </div>
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mt-4" id="acta-table">
                            <thead>
                                <tr>
                                    <th class="spacer"></th>
                                    <th class="text-center"></th>
                                    <th class="text-center">Fecha Acta</th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Proyecto Codigo</th>
                                    <th class="text-center">Certificaci&oacute;n  Fideicomiso</th>
                                    <th class="spacer"></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
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
    <%: Scripts.Render("~/js/jsActaInicioFiscal.js") %>
</asp:Content>
