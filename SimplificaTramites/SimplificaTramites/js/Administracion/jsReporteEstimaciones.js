

$("#customRadio1, #caratulaFinanciera, #constanciaTrabajo2, #avanceGrafica, #avanceFinanciero, #ejecucionRenglones, #cuadroEstimacion, #recomendacionPago , #ReporteCertificadoContador , #ReporteEstimacion ,#ReporteSuspension").change(function () {
    $("#body-caratula-financiera").hide();
    $("#constanciaTrabajo-body-card").hide();
    $("#controlAvanceFinanciero-body-card").hide();
    $("#AvanceFinancieroBody-card").hide();
    $("#contador-body-card").hide();
    $("#ReporteSuspension").hide();
    $("#estimacion-body-card").hide();
    $(".checkeds").prop("checked", false);

    if ($("#avanceFinanciero").is(":checked")) {
        $("#AvanceFinancieroBody-card").show();
        $(".empresa-avance-financiero").hide();
    } else {
        $(".empresa-avance-financiero").hide();
        $("#AvanceFinancieroBody-card").hide();
    }

    if ($("#avanceGrafica").is(":checked")) {
        $("#controlAvanceFinanciero-body-card").show();
        $(".empresa-avance-grafico").hide();
    } else {
        $(".empresa-avance-grafico").hide();
        $("#controlAvanceFinanciero-body-card").hide();
    }

    if ($("#constanciaTrabajo2").is(":checked")) {
        $("#constanciaTrabajo-body-card").show();
        $(".empresa-constancia-trabajo").hide();
    }
    else {
        $("#constanciaTrabajo-body-card").hide();
        $(".empresa-constancia-trabajo").hide();
    }
    //Certificado de Contador
    if ($("#ReporteCertificadoContador").is(":checked")) {
        $("#contador-body-card").show();
        
        $(".empresa-constancia-trabajo").hide();
    } else {
        $("#contador-body-card").hide();
        $(".empresa-constancia-trabajo").hide();

    }
   
    //Certificado de Estimaciones
    if ($("#ReporteEstimacion").is(":checked")) {
        $("#estimacion-body-card").show();

        $(".empresa-constancia-trabajo").hide();
    } else {
        $("#estimacion-body-card").hide();

        $(".empresa-constancia-trabajo").hide();

    }
    

    if ($("#ejecucionRenglones").is(":checked")) {
        $("#ejecuccionRenglonesTrabajo-body-card").show();
    }
    else {
        $("#ejecuccionRenglonesTrabajo-body-card").hide();
    }

    if ($("#cuadroEstimacion").is(":checked")) {
        $("#periodoCardbody").show();
    }
    else {
        $("#periodoCardbody").hide();
    }

    if ($("#recomendacionPago").is(":checked")) {
        $("#periodoCardbody1").show();
    }
    else {
        $("#periodoCardbody1").hide();
    }
});

$("#btn-print-reporte").click(function () {
    //alert("Imprimir reporte de estimaciones")
});

$("#empresa-check").change(() => {
    if ($("#empresa-check").is(":checked") && $("#caratulaFinanciera").is(":checked"))
        $("#body-caratula-financiera").show();
    else
        $("#body-caratula-financiera").hide();
});

$("#empresa-check2").change(() => {
    if ($("#empresa-check2").is(":checked") && $("#constanciaTrabajo2").is(":checked")) {
        $(".empresa-constancia-trabajo").show();
    } else {
        $(".empresa-constancia-trabajo").hide();
    }
});

$("#empresa-check3").change(() => {
    if ($("#empresa-check3").is(":checked") && $("#avanceGrafica").is(":checked")) {
        $(".empresa-avance-grafico").show();
    } else {
        $(".empresa-avance-grafico").hide();
    }
});

$("#empresa-check4").change(() => {
    if ($("#empresa-check4").is(":checked") && $("#avanceFinanciero").is(":checked")) {
        $(".empresa-avance-financiero").show();
    } else {
        $(".empresa-avance-financiero").hide();
    }
});
