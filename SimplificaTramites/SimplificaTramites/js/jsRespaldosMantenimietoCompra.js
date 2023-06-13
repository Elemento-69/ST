// Datos de prueba



$(document).ready(function () {
    var cmbSolicitudSeguimiento = $('#cmbSolicitudSeguimiento');
    var cmbTipoRespaldo = $('#');
    var tabla = $('#respaldoPresupuestarioTabla tbody');

    // Datos de prueba
    var datosPrueba = [
        { solicitud: 'Firmado', estado: 'firmado', tipo: 'prueba'},
        { solicitud: 'Procesado', estado: 'procesado', tipo: 'prueba1' },
        { solicitud: 'Rechazado', estado: 'rechazado', tipo: 'prueba2' }
    ];

    // Llenar el select con los datos de prueba
    for (var i = 0; i < datosPrueba.length; i++) {
        var opcion = $('<option>');
        opcion.val(datosPrueba[i].estado);
        opcion.text(datosPrueba[i].solicitud);
        cmbSolicitudSeguimiento.append(opcion);
    }

    // Función para llenar la tabla con los datos correspondientes al estado seleccionado
    function llenarTabla(estadoSeleccionado) {
        // Limpiar la tabla antes de rellenarla nuevamente
        tabla.empty();

        // Filtrar los datos de prueba según el estado seleccionado
        var datosFiltrados = datosPrueba.filter(function (dato) {
            return dato.estado === estadoSeleccionado;
        });

        // Rellenar la tabla con los datos filtrados
        for (var j = 0; j < datosFiltrados.length; j++) {
            var fila = $('<tr>');
            fila.append('<td class="spacer"></td>');
            fila.append('<td>' + datosFiltrados[j].solicitud + '</td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td></td>');
            fila.append('<td class="spacer"></td>');

            tabla.append(fila);
        }
    }

    // Asignar el evento click al select
    cmbSolicitudSeguimiento.click(function () {
        var estadoSeleccionado = $(this).val();
        llenarTabla(estadoSeleccionado);
    });

    // Asignar el evento click al select tipo respaldo
    cmbSolicitudSeguimiento.click(function () {
        var estadoSeleccionado = $(this).val();
        llenarTabla(estadoSeleccionado);
    });
});