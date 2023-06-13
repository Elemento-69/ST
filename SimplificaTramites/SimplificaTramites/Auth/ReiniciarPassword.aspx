<%@ Page Title="Iniciar Sesión" Language="C#" AutoEventWireup="true" CodeBehind="ReiniciarPassword.aspx.cs" Inherits="Covialgt.Auth.ReiniciarPassword" Async="true" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title><%: Page.Title %> - COVIAL</title>
    <script src="../Scripts/jquery-3.5.1.min.js"></script>
    <script src="../js/jsResetPassword.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">
 <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" runat="server" />
    <link href="~/Content/login.css" rel="stylesheet" runat="server" />
    <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="../Scripts/strength.css" rel="stylesheet" />
    <script src="../Scripts/strength.js"></script>
    <script src="../Scripts/js.js"></script>
       
    <asp:PlaceHolder runat="server">
     <%: Scripts.Render("~/Scripts/fontawesome/js/all.min.js") %>
        <%: Scripts.Render("~/Scripts/sweetalert2/dist/sweetalert2.all.min.js") %>
        <%: Scripts.Render("~/bundles/modernizr") %>
    </asp:PlaceHolder>
    <style type="text/css">
        .responsive {
            width: 20%;
            height: 10%;
        }

        .ocultar {
            display: none;
        }

        .mostrar {
            display: block;
        }

       

        .progress-bar {
            border-radius: 5px;
        }
    </style>


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
                                    <h3 class="text-center heading">Por seguridad
                                        <br />
                                        es necesario que cambie contraseña</h3>
                                    <hr class="line mx-md-4" />
                                    <div class="mx-auto text-center mt-4 mb-4">
                                        <img src="../img/cambiarpass.png" alt="Logo Covial" class="responsive" />
                                    </div>
                                    <fieldset class="mx-md-5">

                                        <div class="form-group">
                                            <label>Contraseña actual  </label> 
                                            <input id="txtPassActual" type="password" alt="strongPass" class="form-control" runat="server" placeholder="Ingresa tu Contraseña actual" required />
                                        </div>
                                        <div class="form-group">
                                            <div class="mb-3 pb-2">
                                            
                                                <b>RECOMENDACIÓN:  La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un numero y un caracter especial</b>
                                            
                                           
                                        </div>
                                            <label>Nueva contraseña  </label><small class="help-block" id="bloq-text" style="color:cornflowerblue;"></small>
                                            <input id="txtNuevoPass" type="password" alt="strongPass" class="form-control" runat="server" placeholder="Ingresa tu nueva Contraseña" onkeyup="fnNuevoPassStrong();" required />
                                           <div class="mt-1">
                                                <small class="help-block" id="password-text"></small>
                                           </div>
                                            
                                           
                                        </div>
                                        
                           
                                <div class="form-group">
                                    <label>Confirmar contraseña</label>
                                    <input id="txtReNewPass" type="password" class="form-control" runat="server" placeholder="Confirmar contraseña" onkeyup="verificarPasswords();" required />
                                    <div id="msg"></div>

                                    <!-- Mensajes de Verificación -->
                                    <div id="error" class="ocultar">
                                        <span class="text-danger h7" id="ProyTieneAutorizacion">Las Contraseñas no coinciden, vuelve a intentar !</span>
                                    </div>
                                    <div id="ok" class="ocultar">
                                       <span class="text-success h7">Las Contraseñas coinciden!</span>
                                    </div>
                                </div>
                                <div class="text-center">

                                    <button type="button" id="ResetButton" class="btn btn-primary mt-5" runat="server" onclick="fnCambiarPassword();" disabled>Guardar</button>

                                </div>

                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-lg-6 d-flex flex-lg-row align-items-center text-center login-bg-2 min-vh-100">
            </div>
        </div>
        </div>
    </form>
</body>
</html>
