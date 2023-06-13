<%@ Page Title="" Language="C#"  MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="InformeTecnicoMensual.aspx.cs" Inherits="Covialgt.InformesTecnicos.InformeTecnicoMensual" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
     <h1>Informes Técnicos</h1>
    <hr class="thick"/>
    <br />
    <h5>Informe Técnico Mensual</h5>
    <div class="card custom-card border-0 mt-5">
        <div class="card-body">
            <div class="row big-gutter">
                <div class="col-12">
                    <a href="../Ejecucion/ActaNotarialRecepcion" class="btn btn-primary btn-form float-right">ACTA NOTARIAL</a>
                </div>
                <hr class="pearator-line mt-5"/>
                 <%if ((HttpContext.Current.User.IsInRole("ADMINISTRADOR"))|| (HttpContext.Current.User.IsInRole("ADMINISTRADORES"))||(HttpContext.Current.User.IsInRole("Receptor de Visa")) ||(HttpContext.Current.User.IsInRole("Coordinador de Visa")) ||(HttpContext.Current.User.IsInRole("Visor")) || (HttpContext.Current.User.IsInRole("Director"))  || (HttpContext.Current.User.IsInRole("Auxiliar Tecnico")) || (HttpContext.Current.User.IsInRole("AUXILIAR SUPERVISOR")) || (HttpContext.Current.User.IsInRole("Supervisor Consulta")))
                { %>
                <div class="form-group col-md-6">
                    <label for="PlanAnualList">Plan Anual</label>
                    <select ID="PlanAnualList" Class="form-control"></select>
                </div>
                <div class="form-group col-md-6">
                    <label for="ProgramaList">Programa</label>
                    <select ID="ProgramaList" Class="form-control"></select>
                </div>
                <div class="form-group col-md-6">
                    <label for="ProyectoList">Proyecto</label>
                    <select Class="form-control" id="ProyectoList"></select>
                </div>
                <%} %>
                 <%if (HttpContext.Current.User.IsInRole("SUPERVISOR") || (HttpContext.Current.User.IsInRole("SUPERVISOR CONSULTA")))
                { %>       
                <div class="form-group col-md-6">
                    <label for="ProyectoListSup">Proyectos</label>
                    <select Class="form-control" id="ProyectoListSup"></select>
                </div>        
                <%} %>
                <div class="form-group col-md-6">
                    <label for="periodo">Periodo</label>
                    <select class="form-control sPeriodo"  id="periodo" name="periodo">
                     
                    </select>
                </div>
             </div>
            <div class="row big-gutter">
               <div id="testDiv">
           
             </div>
                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio" name="example1">
                        <label class="custom-control-label" for="customRadio">Datos Administrativos</label>
                    </div> 
                </div>
                 <div class="col-sm-6 pb-3 ">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio11" name="example1">
                        <label class="custom-control-label" for="customRadio11">Analisis de Ejecucion de Renglones</label>
                    </div>
                </div>
              
                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio3" name="example1">
                        <label class="custom-control-label" for="customRadio3">Cantidades Totales</label>
                    </div>
                </div>

                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio2" name="example1">
                        <label class="custom-control-label" for="customRadio2">Equipos</label>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="row">
                        <div class="col-sm-6 col-md-4 col-xl-5 pb-3">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="customRadio7" name="example1">
                                <label class="custom-control-label" for="customRadio7">Programación Física</label>
                            </div>
                        </div>
                        
                        <div class="col-sm-3 pl-4">
                            <div class="form-group">
                                <input type="text" class="form-control" id="textNumero" placeholder="No.">
                            </div>  
                         </div>
                        <div class="col-sm-3 col-xl-4 pb-3 pl-4">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Imprimir Firmas</label>
                            </div>
                        </div>                        
                    </div>
                    <div class="row">
                        <div id="selectPrograVersion" class="col-sm-6 col-md-4 col-xl-8 pb-3 ml-4">
                            <label for="ProgramaListVersion">Versión Programación Física</label>
                            <select ID="ProgramaListVersion"  Class="form-control prograV"></select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio4" name="example1">
                        <label class="custom-control-label" for="customRadio4">Lluvias</label>
                    </div>
                </div>
                <%-- --%>
                  <div class="col-xl-6">
                    <div class="row">
                        <div class="col-sm-6 col-md-4 col-xl-5 pb-3">
                            <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio5" name="example1">
                        <label class="custom-control-label" for="customRadio5">Documentos de cambio</label>
                    </div> 
                        </div>
  
                    </div>
                    <div id="selectDocCambioV" class="row">
                        <div class="col-sm-6 col-md-4 col-xl-8 pb-3 ml-4">
                              <label for="selectLisDocCambioE">Estado Documento de Cambio</label>
                              <select id="selectLisDocCambioE" class="form-control CambioE">
                                  <option value="8">Aprobado</option>
                                  <option value="0"> No Presentado</option>
                                  <option value="1">Recibido</option>
                              </select>
                          </div>
                        <div class="col-sm-6 col-md-4 col-xl-8 pb-3 ml-4">
                            <label for="selectLisDocCambioV">No.Documento de Cambio</label>
                            <select ID="selectLisDocCambioV"  Class="form-control prograC"></select>
                        </div>
                    </div>
                  </div>

                <%-- --%>

                  <%-- 
                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio5" name="example1">
                        <label class="custom-control-label" for="customRadio5">Documentos de cambio</label>
                    </div> 
                </div>--%>
                <div class="col-sm-6 pb-3 d-none"> <%-- commbo desabilitado--%>
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio8" name="example1">
                        <label class="custom-control-label" for="customRadio8">Fotografias</label>
                    </div>
                </div>
                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio6" name="example1">
                        <label class="custom-control-label" for="customRadio6">Gráfico</label>
                    </div>
                </div>
                <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio9" name="example1">
                        <label class="custom-control-label" for="customRadio9">Programación Real</label>
                    </div>
                </div>
                  <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio10" name="example1">
                        <label class="custom-control-label" for="customRadio10">Fotografias</label>
                    </div>
                </div>
                <div class="col-12">
                    <button  id="btnGenerar" type="button" class="btn btn-primary btn-form float-right">GENERAR</button>
                </div>
                <!-- fin del div dentro del card -->
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>  
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
    </script>
    <%: Scripts.Render("~/js/InformesTecnicos/jsInformeTecnicoMensual.js") %>
</asp:Content>
