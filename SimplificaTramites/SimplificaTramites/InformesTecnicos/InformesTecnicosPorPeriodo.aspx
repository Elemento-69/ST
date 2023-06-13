<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="InformesTecnicosPorPeriodo.aspx.cs" Inherits="Covialgt.InformesTecnicos.InformesTecnicosPorPeriodo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Informes Técnicos</h1>
    <hr class="thick" />
    <br />
    <h4>Informe Técnico por Per&iacute;odos</h4>
    <div class="card custom-card border-0">
        <div class="card-body">
            <div class="row mt-4">
                <div class="form-group col-md-5 col-lg-5">
                    <label for="year">Año</label>
                    <select class="form-control" id="year" name="year">
                    </select>
                </div>
                <div class="form-group col-md-2 col-lg-2">
                </div>
                <div class="form-group col-md-5 col-lg-5">
                    <label for="supervisora">Supervisora</label>
                    <select class="form-control" id="supervisora" name="supervisora">
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-5 col-lg-5">
                    <label for="proyecto">Proyecto</label>
                    <select class="form-control" id="proyecto" name="proyecto">
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-5 col-lg-3">
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
                <div class="form-group col-md-2 col-lg-4">
                </div>
                <div class="form-group col-md-5 col-lg-3">
                    <label for="hasta">Fecha hasta</label>
                    <div class="input-group date" id="hasta-dp" data-target-input="nearest">
                        <input id="hasta" type="text" name="hasta" autocomplete="off" class="form-control">
                        <div class="input-group-append" data-target="#hasta-dp" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div id="testDiv">
           
                </div>
                <div class="col-md-4 col-lg-4">
                    <div class="form-group custom-control custom-radio">
                        <input type="radio" class="custom-control-input" name="tipo" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Datos Administrativos</label>
                    </div>
                </div>
                <div class="col-md-4 col-lg-4">
                    <div class="form-group custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customCheck2" name="tipo">
                        <label class="custom-control-label" for="customCheck2">Cantidades Totales</label>
                    </div>
                </div>
                <div class="col-md-4 col-lg-4">
                    <div class="form-group custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id="customCheck3" name="tipo">
                        <label class="custom-control-label" for="customCheck3">Hojas de Medición</label>
                    </div>
                </div>
            </div>
            <div class="row text-right mt-5">
                    <div class="form-group col-md-6 col-lg-5 mt-2">
                    </div>
                    <div class="form-group col-md-6 col-lg-5 ml-md-auto">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col">
                                <button id="btnGenerar" type="button" class="btn btn-primary btn-form">GENERAR</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/select2.min.js") %>  
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <script type="text/javascript">
        $(document).ready(function () {
            loadDefaultComponents();
        });
    </script>   
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        usuario = "<%= Session["usuario"] %>"
        rolConsultas = '<%= ViewState["rolConsultas"] %>'
    </script>
    <%: Scripts.Render("~/js/informesTecnicos/jsInformesTecnicosPorPeriodo.js?2") %>
</asp:Content>
