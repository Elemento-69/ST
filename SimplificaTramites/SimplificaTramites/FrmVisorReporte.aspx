<%@ Page Title="" Language="C#" AutoEventWireup="true" CodeBehind="FrmVisorReporte.aspx.cs" Inherits="Covialgt.FrmVisorReporte" %>

<!DOCTYPE html>
<html lang="es">
<head></head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script
    src="https://code.jquery.com/jquery-3.5.1.js"
    integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
    crossorigin="anonymous"></script>
<%--<script src="Scripts/jquery-3.3.1.min.js"></script>--%>
<script src="js/jsPrincipal.js?a=1"></script>

<!-- Sweet Alert-->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<!-- Loading Overlay-->
<script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
<!-- Font-Awesome 4.7-->
<script src="https://kit.fontawesome.com/e7be630c3e.js" crossorigin="anonymous"></script>
<body>
    <form runat="server">


        <div class="container">
            <sti:StiWebViewer ID="StiWebViewer1" runat="server" Height="100%" Width="100%" PrintDestination="Pdf"
                ImageQuality="1" ImageResolution="1000" />
        </div>


    </form>
</body>
</html>
