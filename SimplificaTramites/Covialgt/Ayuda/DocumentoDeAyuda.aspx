<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DocumentoDeAyuda.aspx.cs" Inherits="Covialgt.Ayuda.DocumentoDeAyuda" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
     <div class="container row">
        <h1>Documentos de Ayuda</h1>
        <hr class="thick"/>
        <h2 class="mt-4">Hola, estamos aquí para ayudarte</h2>
        <div class="col-12 mt-5">
            <div class="mt-3">
                <h3><i class="fas fa-rocket fa-lg fa-fw"></i>Acciones más populares</h3>
            </div>
        </div>
        <div class="col-12 mt-5 ml-1">
            <div class="ml-5">
                <h5><a href="DocumentacionAyuda.aspx">Documentación de ayuda</a></h5>
            </div>
        </div>
        <div class="col-12 mt-5 ml-3">
            <label class="ml-5">Si estás buscando y necesitas el documento de ayuda, presiona el enlace para que puedas obtenerlo.</label>
        </div>
        <hr class="line-solid mt-4"/>
        <br />
        <div class="col-12 mt-4 ml-1">
            <div class="ml-5">
                <h5><a href="#">Ventanas Emergentes</a></h5>
            </div>
        </div>
        <div class="col-12 mt-3 ml-4">
            <a href="https://www.youtube.com/channel/UCtQ341v_HmYZkD3V1kkQoOA" class="ml-5">Canal Youtube</a>
        </div>
        <div class="col-12 mt-3 ml-4">
            <a href="Docs/VentanasEmergentes.pdf" class="ml-5">Ventanas emergentes</a>
        </div>
        <br />
        <hr class="line-solid mt-5"/>
        <br />
        <div class="col-12 mt-4 ml-1">
            <div class=" ml-5">
                <h5><a href="https://get.adobe.com/es/reader/">Descargar Adobe Reader</a></h5>
            </div>
        </div>
        <div class="col-12 mt-3 ml-4">
            <label class="ml-5">Para poder observar los documentos de ayuda presiona el enlace para obtenerlo</label>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
</asp:Content>
