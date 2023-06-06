<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="InformacionDeRotulos.aspx.cs" Inherits="Covialgt.Ejecucion.InformacionDeRotulos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Información de Rotulos</h1>
    <hr class="thick"/>
    <div class="card custom-card border-0">
        <div class="card-body">
            <div class="row">
                <div class="form-group col-md-5 col-lg-5">
                    <label for="PlanAnualList">Plan Anual</label>
                    <select ID="PlanAnualList" Class="form-control"></select>
                </div>
                <div class="form-group col-md-5 col-lg-5 offset-lg-1">
                    <label for="ProgramaList">Programa</label>
                    <select ID="ProgramaList" Class="form-control"></select>
                </div>
                <div class="form-group col-md-3 col-lg-5">
                    <label for="ProyectoList">Proyecto</label>
                    <select Class="form-control" id="ProyectoList"></select>
                </div>
            </div>

            <div class="row justify-content-center my-auto">
                <div class="col-md-12 col-lg-12">
                    <div class="row mt-4">
                        <div class="col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="form-group col-sm-4 col-md-4 col-lg-4">
                            <label for="contratista">Contratista</label>
                            <select class="form-control" id="contratista" name="contratista">
                            </select>
                        </div>
                    </div>
                    <h4 class="mt-5">Fotografías</h4>
                    <hr class="solid-line"/>
                    <div class="row mt-5">
                        <div class="col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <div class="row">
                                <div class="col-12">
                                    <label for="tramo">Tramo</label>
                                    <select class="form-control" id="tramo" name="tramo">
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12">
                                    <label for="estacion">Estaci&oacute;n</label>
                                    <input class="form-control frdecimal-mask" id="estacion" name="estacion"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-md-2 col-lg-2"></div>
                        <div class="form-group col-sm-4 col-md-4 col-lg-4 mt-3">
                            <div class="wrapper d-inline-block text-center">
                                <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" class="rounded" />
                                <div class="w-100"></div>
                                <label for="foto-input" class="custom-file-upload">Seleccionar Archivo</label>
                                <input id="foto-input" type="file" class="d-none"/>
                            </div>
                        </div>
                    </div>
                    <h4 class="mt-5">Coordenadas</h4>
                    <hr class="solid-line"/>
                    <div class="row mt-5">
                        <div class="col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <label for="latitud">Latitud</label>
                            <input class="form-control frdecimal6-mask" id="latitud" name="latitud"/>
                        </div>
                        <div class="col-sm-2 col-md-2 col-lg-2"></div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <label for="longitud">Longitud</label>
                            <input class="form-control frdecimal6Neg-mask" id="longitud" name="longitud"/>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-sm-3 col-md-3 col-lg-3">
                            <div class="form-group">
                                <label for="FechaFotografia" class="text-nowrap">Fecha</label>
                                <div class="input-group date" id="FechaFotografia-dp" data-target-input="nearest">
                                    <input id="FechaFotografia" type="text" name="desde" autocomplete="off" class="form-control">
                                    <div class="input-group-append" data-target="#FechaFotografia-dp" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3 col-md-3 col-lg-3"></div>
                        <div class="form-group col-sm-4 col-md-4 col-lg-4">
                            <label for="comentario">Comentario</label>
                            <textarea class="form-control" id="comentario" rows="5"></textarea>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-7 col-md-7 col-lg-7"></div>
                        <div class="col-sm-4 col-md-4 col-lg-4 text-right">
                            <button type="button" class="btn btn-primary btn-form" id="insert-btn">
                                Insertar
                            </button>
                        </div>
                    </div>
                    <h4 class="mt-5">Fotografías</h4>
                    <div class="table-responsive">
                    <table class="table table-bordered" id="fotos-table">
                        <thead>
                            <tr>
                                <th class="spacer"></th>
                                <th></th>
                                <th>Tramo</th>
                                <th>Descripcion</th>
                                <th>Estacion</th>
                                <th>Fecha</th>
                                <th>Fotografía</th>
                                <th class="spacer"></th>
                            </tr>
                        </thead>
                        <tbody id="componentes-tbody">
                           
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
    <%: Scripts.Render("~/Scripts/covial/fileInput.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
    </script>
    <%: Scripts.Render("~/js/jsInformacionDeRotulos.js") %>
</asp:Content>
