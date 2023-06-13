<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmCuadrosDescriptivos.aspx.cs" Inherits="Covialgt.Liquidacion.frmCuadrosDescriptivos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
     <h1>Cuadros Descriptivos</h1>
    <hr class="thick"/>
    <br />
    <h5>CUADROS DESCRIPTIVOS</h5>
    <div class="row">
                <div class="col-md-1">
                                <strong> 
                                    <span class="form-control" style="border: none">AÑO</span>
                                    <br />
                                    <span class="form-control" style="border: none">PROGRAMA</span>
                                    <br />
                                    <span class="form-control" style="border: none">PROYECTO</span>
                                </strong>
                            </div>
                <div class="col-md-3">
                                <select class="form-control w-50" id="SelectPlanAnual">
                                    <option value="value"></option>
                                    <a href="../Perfil/">../Perfil/</a>
                                </select>
                                <br />
                                 <select class="form-control w-50" id="SelectPrograma">
                                    <option value="value"></option>
                                </select>
                                <br />
                                <select class="form-control w-50" id="SelectProyecto">
                                    <option value="value"></option>
                                </select>
                               
                    </div> 
                    <div class="col-md-2">
                        <strong>
                            <span class="form-control" style="border: none">Fecha Inicio contractual</span>
                            <br />
                            <span class="form-control" style="border: none">Fecha Fin contractual</span>
                        </strong>
                    </div>
                    <div class="col-md-2">
                        <input type="date" name="fechainiciocontractual" id="fechainiciocontractual" class="form-control" />
                            <br />
                        <input type="date" name="fechafincontractual" id="fechafincontractual" class="form-control" />                             
                    </div> 
                    <div class="col-md-2">
                        <strong>
                            <span class="form-control" style="border: none">Fecha Inicio</span>
                            <br />
                            <span class="form-control" style="border: none">Fecha Fin</span>
                        </strong>
                    </div>
                    <div class="col-md-2">
                        <input type="date" name="fechainicio" id="fechainicio" class="form-control" disabled/>
                            <br />
                        <input type="date" name="fechafin" id="fechafin" class="form-control" disabled />                             
                    </div> 
                    </div>
    <br />
    <br />
    <div class="row">
        <div class="col-md-10">
            <div class="form-check">
                                      <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio1" name="example1">
                        <label class="custom-control-label" for="customRadio1">Resumen de Pagos y Financiamientos</label>
                    </div>
                </div>
             </div>
            <div class="form-check">
                                      <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio2" name="example1">
                        <label class="custom-control-label" for="customRadio2">Análisis de ejecución de renglones de trabajo</label>
                    </div>
                </div>
            </div>
            <div class="form-check">
                                      <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio3" name="example1">
                        <label class="custom-control-label" for="customRadio3">Incremento y Decremento a las Cantidades Contratadas</label>
                    </div>
                </div>
            </div><div class="form-check">
                                      <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio4" name="example1">
                        <label class="custom-control-label" for="customRadio4">Cálculos y Valores Finales</label>
                    </div>
                </div>
            </div><div class="form-check">
                                      <div class="col-sm-6 pb-3">
                    <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customRadio5" name="example1">
                        <label class="custom-control-label" for="customRadio5">Balance de Pagos y Financiamiento</label>
                    </div>
                </div>
            </div>
        </div>
        </div>
      <div class="col-xs-4 col-md-4 col-lg-4">
        <button type="button" id="btnGenerarCuadro" class="btn btn-center">Generar Cuadro
                <i class="fas fa-print fa-2x"></i>
            </button>
       </div>
    <div id="testDiv">
           
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>  
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
    </script>
    <%: Scripts.Render("~/js/Liquidacion/jsCuadrosDescriptivos.js") %>
</asp:Content>
