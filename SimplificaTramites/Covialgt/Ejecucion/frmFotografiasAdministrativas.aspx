<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="frmFotografiasAdministrativas.aspx.cs" Inherits="Covialgt.Ejecucion.frmFotografiasAdministrativas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <h1>Fotograf&iacute;as Administrativas</h1>
    <hr class="thick" />
    <div class="font-weight-bold my-2">Plan: <%= Session["plan"] %></div>
    <div class="font-weight-bold my-2">Proyecto: <%= Session["proyecto"] %></div>
    <div class="col-xs-4 col-md-4 col-lg-4">
        <button type="button" id="btnImprimir" class="btn btn-light">
            <i class="fas fa-print fa-2x"></i>
        </button>
    </div>
    <div id="testDiv">
    </div>
    <div class="row justify-content-end">
 
       
        <div class="form-group col-md-6 col-xl-5 ml-md-auto">
            <div class="row justify-content-between">
                <div class="mb-1 mb-sm-0 col-sm-6 col-xl-5">
                    <a type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-block">REGRESAR</a>
                </div>
                
            </div>
        </div>
     
    </div>
    <div class="card custom-card border-0">
      <div class="card-body">
         <div class="table-responsive mt-5">
            <table class="table table-bordered" id="fotografiasadmin-table">
                <thead>
                    <tr>
                        <th class="spacer"></th>
                        <th></th>
                        <th>Tramo</th>
                        <th>Descripci&oacute;n</th>
                        <th>Estaci&oacute;n</th>
                        <th>Fecha</th>
                        <th>Foto</th>
                        <th>Imprimir en Informe</th>
                        <th>Fotograf&iacute;a</th>
                        <th class="spacer"></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
      </div>    
    </div>
    <div class="modal fade" id="verModal" tabindex="-1" role="dialog" aria-labelledby="verModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="verModalLabel">Imagen Previa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body text-center">
                      <div class="row" style="margin-top: 30px;  margin-bottom:30px; height: auto; min-height: 100% !important; "  >
                                    <div class="col-6" style="text-align:center;"  >
                                        <button type="button" id="btnRotarFotoIzquierda" class="btn btn-secondary btn-form" onclick="fnRotarFoto(true);"><i class="fas fa-undo fa-lg fa-fw"></i>&nbsp;&nbsp;Rotar</button>
                                    </div>
                                    
                                    <div class="col-6" style="text-align:center;"  >                                                                              
                                        <button type="button" id="btnRotarFotoDerecha" class="btn btn-secondary btn-form" onclick="fnRotarFoto(false);">rotar&nbsp;&nbsp;<i class="fas fa-undo fa-lg fa-fw  fa-flip-horizontal"></i></button>
                                    </div>
                            </div>
                                    <img class="img-fluid" src="../Images/dummy_143x143.png" id="modal-img" />
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="verModal-Act" tabindex="-1" role="dialog" aria-labelledby="verModal-Act" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="verModalLabel-Act">Datos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body text-center">
                    <div class="row">
                        <div class="col-md-3">
                            <strong>
                                <span class="form-control" style="border: none">Descripcion</span>
                                <br />
                                <span class="form-control" style="border: none">Imprime Tecnico</span>
                            </strong>
                        </div>
                        <div class="col-md-7">
                            <input type="text" id="txtfoto" name="txtfoto" style="display: none">
                            <input type="text" class="form-control w-80" id="txtDescripcion" name="txtDescripcion" >
                            <br />
                            <div class="form-check">
                                      <input class="form-check-input" type="checkbox" id="chks" >
                                          <label class="form-check-label" for="chs">
                                          </label>
                                      </div>
                        </div>
                    </div>
                    <div class="col-12 pt-3 text-right">
                            <button type="button" id="btnGuardarAct" class="btn btn-primary px-5 btn-sm">Guardar</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
     <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/js/jsGeneralDatatable.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
         token = "<%= Session["token"] ?? "null" %>"
         plan = "<%= Session["plan"] %>"
         proyecto = "<%= Session["proyecto"] %>"
        usuario = "<%= Session["usuario"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
    </script>
    <%: Scripts.Render("../js/jsFotografiasAdministrativas.js") %>
</asp:Content>
