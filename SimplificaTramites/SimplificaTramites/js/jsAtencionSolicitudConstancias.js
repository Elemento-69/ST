$(document).ready(function () {
    var contadorFilas = 1;
    
    $("#btnCancelarAtencion").on("click", function () {
        
        window.location.href = `../SolicitudConstanciaLS/frmSolicitudConstanciaLS.aspx`
    })
    $("#btnSolicitudArchivo").on("click", function () {
        $("#winSolicitudArchivo").modal("show");
    })
    $("#btnAgregarFila").on("click",function () {
        contadorFilas++;
        alert("clic")
        var fila = $("<tr>");

        var columnas = "";
        columnas += '<td><input type="text" class="form-control" id="txtContrato_' + contadorFilas + '" runat="server" /></td>';
        columnas += '<td>';
        columnas += '   <select id="ddlRenglon_' + contadorFilas + '" runat="server" class="form-control">';
        columnas += '       <option value="021">Renglón 021</option>';
        columnas += '       <option value="022">Renglón 022</option>';
        columnas += '       <option value="029">Renglón 029</option>';
        columnas += '       <option value="Subrenglón 18">Subrenglón 18</option>';
        columnas += '   </select>';
        columnas += '</td>';
        columnas += '<td><input type="text" class="form-control" id="txtTipoServicio_' + contadorFilas + '" runat="server" /></td>';
        columnas += '<td><input type="text" class="form-control" id="txtPuesto_' + contadorFilas + '" runat="server" /></td>';
        columnas += '<td><input type="text" class="form-control" id="txtSueldo_' + contadorFilas + '" runat="server" /></td>';
        columnas += '<td>';
        columnas += '<div class="input-group date" id="inicio-dp_' + contadorFilas + '" data-target-input="nearest">';
        columnas += '<input id="dpInicio_' + contadorFilas + '" type="text" data-target="#inicio-dp_' + contadorFilas + '" name="dpInicio_' + contadorFilas + '" autocomplete="off" class="form-control datetimepicker-input">';
        columnas += '<div class="input-group-append" data-target="#inicio-dp_' + contadorFilas + '" data-toggle="datetimepicker">';
        columnas += '<div class="input-group-text"><i class="fas fa-calendar"></i></div>';
        columnas += '</div>';
        columnas += '</div>';

        /*columnas += '   <div class="input-group date">';
        columnas += '       <input type="text" class="form-control datepickertime-" id="txtFechaInicio_' + contadorFilas + '" runat="server" />';
        columnas += '       <div class="input-group-append">';
        columnas += '           <span class="input-group-text"><i class="fa fa-calendar"></i></span>';
        columnas += '       </div>';
        columnas += '   </div>';*/
        columnas += '</td>';
        columnas += '<td>';
        /*columnas += '   <div class="input-group date">';
        columnas += '       <input type="text" class="form-control datepicker" id="txtFechaFin_' + contadorFilas + '" runat="server" />';
        columnas += '       <div class="input-group-append">';
        columnas += '           <span class="input-group-text"><i class="fa fa-calendar"></i></span>';
        columnas += '       </div>';
        columnas += '   </div>';*/
        columnas += '<div class="input-group date" id="fin-dp_' + contadorFilas + '" data-target-input="nearest">';
        columnas += '<input id="dpfin_' + contadorFilas + '" type="text" data-target="#fin-dp_' + contadorFilas + '" name="dpfin_' + contadorFilas + '" autocomplete="off" class="form-control datetimepicker-input">';
        columnas += '<div class="input-group-append" data-target="#fin-dp_' + contadorFilas + '" data-toggle="datetimepicker">';
        columnas += '<div class="input-group-text"><i class="fas fa-calendar"></i></div>';
        columnas += '</div>';
        columnas += '</div>';
        columnas += '</td>';
        columnas += '<td><button type="button" class="btn btn-danger btnDeleteRow"><i class="fas fa-trash"></i>'
        columnas += '</button> <button type="button" class="btn btn-danger btnUpdateRow"><i class="fas fa-save"></i></button> </td > ';
        
        fila.html(columnas);

        $("#tblContratos tbody").append(fila);

        
        



    });

    // Inicializar datepicker
    $('.datepicker').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true
    });

    $("#tblContratos").on("click", ".btnDeleteRow", function () {
        var eliminar = confirm("Desea eliminar el registro ")
        if (eliminar == true) {
            $(this).closest("tr").remove();
        } else {

        }
    });

    $("#tblContratos").on("click", ".btnUpdateRow", function () {
        
        var fila = $(this).closest("tr");
        var vContrato = fila.find('.form-control:eq(0)').val();
        var vRenglon = fila.find('.form-control:eq(1)').val();
        var vTipoServicio = fila.find('.form-control:eq(2)').val();
        var vPuesto = fila.find('.form-control:eq(3)').val();
        var vSueldo = fila.find('.form-control:eq(4)').val();
        var vInicio = fila.find('.form-control:eq(5)').val();
        var vFin = fila.find('.form-control:eq(6)').val();
        
        
        alert("Almacenado con exito " + vContrato + "\n"+vRenglon+"\n"+vTipoServicio +"\n"+vPuesto + "\n"+vInicio+"\n"+vFin)

    });
   
});