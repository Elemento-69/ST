<%@ Page Title="Iniciar Sesión" Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Covialgt.Auth.Login" Async="true" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title><%: Page.Title %> - COVIAL</title>    
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" runat="server" />
    <link href="~/Content/login.css" rel="stylesheet" runat="server" />
    <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/Scripts/fontawesome/js/all.min.js") %>
        <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
        <%: Scripts.Render("~/bundles/modernizr") %>
    </asp:PlaceHolder>
</head>
<body>
    <form runat="server">
        <asp:ScriptManager runat="server">
            <Scripts>
                <%--To learn more about bundling scripts in ScriptManager see https://go.microsoft.com/fwlink/?LinkID=301884 --%>
                <%--Framework Scripts--%>
                <asp:ScriptReference Name="MsAjaxBundle" />
                <asp:ScriptReference Name="jquery" />
                <asp:ScriptReference Path="~/Scripts/umd/popper.js" />
                <asp:ScriptReference Name="bootstrap" />
                <asp:ScriptReference Name="WebForms.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebForms.js" />
                <asp:ScriptReference Name="WebUIValidation.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebUIValidation.js" />
                <asp:ScriptReference Name="MenuStandards.js" Assembly="System.Web" Path="~/Scripts/WebForms/MenuStandards.js" />
                <asp:ScriptReference Name="GridView.js" Assembly="System.Web" Path="~/Scripts/WebForms/GridView.js" />
                <asp:ScriptReference Name="DetailsView.js" Assembly="System.Web" Path="~/Scripts/WebForms/DetailsView.js" />
                <asp:ScriptReference Name="TreeView.js" Assembly="System.Web" Path="~/Scripts/WebForms/TreeView.js" />
                <asp:ScriptReference Name="WebParts.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebParts.js" />
                <asp:ScriptReference Name="Focus.js" Assembly="System.Web" Path="~/Scripts/WebForms/Focus.js" />
                <asp:ScriptReference Name="WebFormsBundle" />
                <%--Site Scripts--%>
            </Scripts>
        </asp:ScriptManager>
        <div class="container-fluid">
            <div class="row min-vh-100">
                <div class="col-lg-6 login-bg-1 min-vh-100">
                    <div class="row align-items-center justify-content-center h-100">
                        <div class="col-11 col-md-10 col-lg-11 col-xl-9">
                            <div class="card card-login">
                                <div class="card-body p-md-4">
                                    <h3 class="text-center heading">Sistema Integral de Control de <br /> Proyectos-SICOP</h3>
                                    <hr class="line mx-md-4" />
                                    <div class="mx-auto text-center mt-4 mb-4">
                                        <img src="../Images/covial-logo-172px.png" alt="Logo Covial" />
                                    </div>
                                    <fieldset class="mx-md-5">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <asp:TextBox ID="TxtUser" CssClass="form-control" runat="server" placeholder="Ingresa tu Usuario"></asp:TextBox>
                                            <asp:RequiredFieldValidator ID="RfvUser" runat="server" ErrorMessage="Usuario es obligatorio"
                                                CssClass="text-danger" ControlToValidate="TxtUser"></asp:RequiredFieldValidator>
                                        </div>
                                        <div class="form-group">
                                            <label>Contraseña</label>
                                            <asp:TextBox ID="TxtPassword" CssClass="form-control" runat="server" placeholder="Ingresa tu Contraseña" TextMode="Password"></asp:TextBox>                                            
                                            <asp:RequiredFieldValidator ID="RfvPassword" runat="server" ErrorMessage="Contraseña es obligatorio" 
                                                CssClass="text-danger" ControlToValidate="TxtPassword"></asp:RequiredFieldValidator>
                                        </div>
                                        <div class="text-center">                                            
                                            <asp:Button ID="LoginButton" CssClass="btn btn-primary mt-5" runat="server" Text="Iniciar Sesión" OnClick="BtnLogin_Click" />
                                        </div>
                                        <div class="text-center mt-4">
                                            <a href="#"><small class="text-muted text-primary">Olvide mi Contraseña</small></a>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 d-flex flex-lg-row align-items-center text-center login-bg-2 min-vh-100">
                    <div class="col-lg-12">
                        <h3 class="text-white">Pronto aldea Shin Shin en Gualán, Zacapa; tendrá nuevo asfalto.</h3>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
