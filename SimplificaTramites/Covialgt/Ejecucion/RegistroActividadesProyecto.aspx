<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="RegistroActividadesProyecto.aspx.cs" Inherits="Covialgt.Ejecucion.RegistroActividadesProyecto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CustomStyles" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h1>Registro de Actividades en el Proyecto</h1>
    <hr class="thick"/>
    <br />
    <h5>Plan: <%= ViewState["plan"] %></h5>
    <h5>Proyecto:  <%= ViewState["proyecto"] %></h5>
    <div class="w-100"></div>
                <div class="form-group col-12 text-right">
                    <button type="button" id="btnRegresarRegistroDatos" class="btn btn-outline-secondary btn-form">
                        Regresar
                    </button>
                   
                </div>
    <div class="form-group col-md-6 col-lg-4 col-xl-3">
        <label for="Periodo">Periodo</label>
        <select class="form-control" id="Periodos" name="Periodo"></select>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered" id="actividades-table">
            <thead>
                <tr>
                     <th class="spacer"></th>
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Evento</th>
                     <th class="spacer"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center">
                    <td class="spacer"></td>
                    <td>17/03/2015</td>
                    <td>
                        <div class="col-md-6 mx-auto">
                            <select class="form-control" id="selectEvento" name="selectEvento">
                                <option>Trabajando</option>
                                <option>Sabado o Medio dia</option>
                            </select>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
                <tr class="text-center">
                    <td class="spacer"></td>
                    <td>17/03/2015</td>
                    <td>
                        <div class="col-md-6 mx-auto"">
                            <select class="form-control" id="selectEvento" name="selectEvento">
                                <option>Trabajando</option>
                                <option>Sabado o Medio dia</option>
                            </select>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
                <tr class="text-center">
                    <td class="spacer"></td>
                    <td>17/03/2015</td>
                    <td>
                        <div class="col-md-6 mx-auto"">
                            <select class="form-control" id="selectEvento" name="selectEvento">
                                <option>Trabajando</option>
                                <option>Sabado o Medio dia</option>
                            </select>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
                <tr class="text-center">
                    <td class="spacer"></td>
                    <td>17/03/2015</td>
                    <td>
                        <div class="col-md-6 mx-auto"">
                            <select class="form-control" id="selectEvento" name="selectEvento">
                                <option>Trabajando</option>
                                <option>Sabado o Medio dia</option>
                            </select>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
                <tr class="text-center">
                    <td class="spacer"></td>
                    <td>17/03/2015</td>
                    <td>
                        <div class="col-md-6 mx-auto"">
                            <select class="form-control" id="selectEvento" name="selectEvento">
                                <option>Trabajando</option>
                                <option>Sabado o Medio dia</option>
                            </select>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
                <tr class="text-center">
                    <td class="spacer"></td>
                    <td>17/03/2015</td>
                    <td>
                        <div class="col-md-6 mx-auto"">
                            <select class="form-control" id="selectEvento" name="selectEvento">
                                <option>Trabajando</option>
                                <option>Sabado o Medio dia</option>
                            </select>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
            </tbody>
            </table>
        </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="CustomScripts" runat="server">
     <script>
        urlbase = "<%= ViewState["baseurl"] ?? "null" %>"
        token = "<%= Session["token"] ?? "null" %>"
        plan = "<%= ViewState["plan"] %>"
         proyecto = "<%= ViewState["proyecto"] %>"
         programa = "<%= ViewState["programa"] %>"
        periodo = "<%= ViewState["periodo"] %>"
     </script>
    <%: Scripts.Render("~/js/jsRegistroActividadesProy.js") %>
</asp:Content>
