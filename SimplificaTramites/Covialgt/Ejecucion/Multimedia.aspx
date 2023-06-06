<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Multimedia.aspx.cs" Inherits="Covialgt.Ejecucion.Multimedia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
    <%: Styles.Render("~/Scripts/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css") %>
    <%: Styles.Render("~/Content/Multimedia.css") %>
    <%: Styles.Render("~/Content/css/select2.min.css") %>
    <%: Styles.Render("~/Content/select2-bootstrap.css") %>
    <%: Styles.Render("~/Content/customSelect2.css") %>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Multimedia</h1>
     <hr class="thick"/>
    <div class="w-100"></div>
        <div class="form-group col-12 text-right">
        <button type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-form">
            Regresar
        </button>
                   
    </div>
     <div class="card custom-card border-0">
        <div id="msform" class="card-body">
            <h2>Fotograf&iacute;as</h2>
            <div class="row justify-content-between">
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <label for="Plan">Plan</label> 
                    <select class="form-control PlanAnualList" id="PlanAnualList" disabled name="Plan">
                    </select>                                  
                </div>
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <label for="ProyectoList">Proyecto</label> 
                    <select class="form-control ProyectoList" id="ProyectoList" disabled name="Proyecto">
                    </select>                                  
                </div>
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <label for="Periodos">Periodo</label>
                    <select disabled class="form-control Periodos" id="Periodos" name="Periodo"></select>                                    
                </div>
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <div class="wrapper d-inline-block text-center">
                        <img width="140" height="140" src="~/Images/dummy_143x143.png" runat="server" alt="imagen galeria" class="rounded" />
                        <div class="w-100"></div>
                        <label for="foto-input" class="custom-file-upload">Seleccionar Archivo</label>
                        <input id="foto-input" type="file" class="d-none"/>
                    </div>                                 
                </div>
            </div>
            
            <h2>Insertar Registro Fotogr&aacute;fico</h2>
            <hr />
            <div class="row justify-content-between">
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <label for="Tramo">Tramo</label> 
                    <select class="form-control tramoList" id="TramoFotografia" name="Tramo">
                    </select>                                  
                </div>
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <label for="Estacion">Estaci&oacute;n</label> 
                    <input type="text" class="form-control frdecimal-mask" id="EstacionFotografia" name="Estacion">                                    
                </div>
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <div class="form-group">
                        <label for="FechaFotografia" class="text-nowrap">Fecha</label>
                        <div class="input-group date periodo-date" id="FechaFotografia-dp" data-target-input="nearest">
                            <input id="FechaFotografia" type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#FechaFotografia-dp">
                            <div class="input-group-append" data-target="#FechaFotografia-dp" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <label for="Descripcion">Descripci&oacute;n</label>
                    <textarea  class="form-control" id="DescripcionFotografia" name="Descripcion" rows="5"></textarea>                                  
                </div>    
                <div class="w-100"></div>
                <div class="form-group col-12 text-right">
                    <button type="button" class="btn btn-outline-secondary btn-form">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-primary btn-form" id="agregar-fotografia">
                        Insertar
                    </button>
                </div>
            </div>
            
            <h2>Fotos de Tramos</h2>
      
            <div class="w-100 py-5 my-5"></div>
            <div class="gallery-wrapper">
                <div class="gallery-bg">
                    <div class="row justify-content-center" id="fotografia-galery">
                    </div>
                </div>
        </div>
        </div>
    </div>
     <div class="card custom-card mt-5 border-0">
         <div class="card-body">
            <h2>Videos</h2>
            <div class="row justify-content-between">
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <label for="PlanVideo">Plan</label> 
                    <select class="form-control PlanAnualList" id="PlanVideo" name="Plan" disabled>
                    </select>                                  
                </div>
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <label for="ProyectoVideo">Proyecto</label> 
                    <select class="form-control ProyectoList" disabled id="ProyectoVideo" name="Proyecto">
                    </select>                                  
                </div>
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <label for="PeriodoVideo">Periodo</label>
                    <select class="form-control Periodos" id="PeriodoVideo" disabled ></select>
                </div>
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                        <div class="wrapper d-inline-block text-center">
                            <video id="videoPrev" width="140" height="140" poster="~/Images/dummy_143x143.png" runat="server" class="rounded" controls></video>
                            <div class="w-100"></div>
                            <label for="video-input" class="custom-file-upload">Seleccionar Archivo</label>
                            <input id="video-input" type="file" class="d-none"/>
                        </div>                                 
                </div>
            </div>
            
            <h2>Insertar Registro de Video</h2>
            <hr />
            <div class="row justify-content-between">
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <label for="TramoVideo">Tramo</label> 
                    <select class="form-control tramoList" id="TramoVideo" name="Tramo">
                    </select>                                  
                </div>
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <label for="EstacionVideo">Estaci&oacute;n</label> 
                    <input class="form-control frdecimal-mask" id="EstacionVideo" name="Estacion">                                    
                </div>
                <div class="form-group col-12 col-md-6 pr-md-4 pr-xl-5">
                    <div class="form-group">
                        <label for="FechaFotografiaVideo" class="text-nowrap">Fecha</label>
                        <div class="input-group date periodo-date" id="FechaFotografia-dp-Video" data-target-input="nearest">
                            <input id="FechaFotografiaVideo" type="text" name="desde" autocomplete="off" class="form-control datetimepicker-input" data-target="#FechaFotografia-dp-Video">
                            <div class="input-group-append" data-target="#FechaFotografia-dp-Video" data-toggle="datetimepicker">
                                <div class="input-group-text"><i class="fas fa-calendar"></i></div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="form-group col-12 col-md-6 pl-md-4 pl-xl-5">
                    <label for="DescripcionVideo">Descripci&oacute;n</label>
                    <textarea  class="form-control" id="DescripcionVideo" name="Descripcion" rows="5"></textarea>                                  
                </div>    
                <div class="w-100"></div>
                <div class="form-group col-12 text-right">
                    <button type="button" class="btn btn-outline-secondary btn-form">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-primary btn-form" id="agregar-video"">
                        Insertar
                    </button>
                </div>
            </div>
            
            <h2>Videos de Tramos</h2>
            <div class="w-100 py-5 my-5"></div>
            <div class="gallery-wrapper">
                <div class="gallery-bg">
                    <div class="row justify-content-center" id="videos-galery">
                    </div>
                </div>
            </div>
        </div>
    </div>
     <div class="modal" tabindex="-1" id="fotografiaModal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="card border-0">
                      <div class="row g-0">
                        <div class="col-md-8">
                          
                                        <button type="button" id="btnRotarFotoIzquierda" class="btn btn-secondary btn-form mt-3 mb-3 mr-5" onclick="fnRotarFoto(true);"><i class="fas fa-undo fa-lg fa-fw"></i>&nbsp;&nbsp;Rotar</button>
                                                                                                 
                                        <button type="button" id="btnRotarFotoDerecha" class="btn btn-secondary btn-form  mt-3 mb-3" onclick="fnRotarFoto(false);">rotar&nbsp;&nbsp;<i class="fas fa-undo fa-lg fa-fw  fa-flip-horizontal"></i></button>
                                   
                           
                            <img class="img-fluid rounded-start  img-show" id="modal-img" alt="..." src=""/>
                            <video class="img-fluid rounded-start d-none" id="modal-video" controls></video>
                        </div>
                          
                        <div class="col-md-4">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                            <div class="card-body">
                                    <p class="card-text">Estaci&oacute;n: <span id="estacion-modal_text"></span></p>
                                    <p class="card-text">Tramo: <span id="tramo-modal_text"></span></p>
                                 <button type="button" id="btnEliminarFoto" class="btn btn-secondary btn-form mt-3 mb-3 mr-5"><i class="fas fa-trash fa-lg fa-fw"></i>&nbsp;&nbsp;Eliminar</button>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
    <%: Scripts.Render("~/Scripts/moment-with-locales.min.js") %>
    <%: Scripts.Render("~/Scripts/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js") %>
    <%: Scripts.Render("~/Scripts/covial/fileInput.js") %>
    <%: Scripts.Render("~/Scripts/inputmask/jquery.inputmask.min.js") %>
    <%: Scripts.Render("~/js/inputmask.js") %>
    <%: Scripts.Render("~/Scripts/select2.min.js") %>
    <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        user = "<%= Session["usuario"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
        proyecto = "<%= ViewState["proyecto"] %>"
        programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
        thumbnail = '<%= ViewState["thumbnail"] %>'
    </script>
    <%: Scripts.Render("~/js/jsMultimedia.js") %>
</asp:Content>
