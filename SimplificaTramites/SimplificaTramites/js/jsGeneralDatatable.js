function getLanguage() {
    return {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "buttons": {
            "copy": "Copiar",
            "colvis": "Visibilidad"
        }
    }
}


function generateDataTable(columns, extras = {}, url = null) {
    const data = {
        responsive: {
            targets: 0
        },
        order: [[1, "desc"]],
        ajax: {
            url: url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"},
            dataSrc: (json) => {
                return json.map((dict) => {
                    let data = {}
                    for (let key in dict) {
                        let props = key.split(".")
                        if (props.length === 1) {
                            data[key] = dict[key]
                        } else {
                            let chain = {}
                            chain[props.pop()] = dict[key]
                            for (let prop in props.reverse()) {
                                let temp_chain = { ...chain }
                                chain = {}
                                chain[props[prop]] = temp_chain
                            }
                            data = { ...data, ...chain }
                        }
                    }
                    return data
                })
            }
        },
        columns: columns,
        processing: true,
        serverSide: true,
        destroy: true,
        language: getLanguage(),
    }
    for (const extra in extras) {
        if (extras.hasOwnProperty(extra)) {
            data[extra] = extras[extra]
        }
    }
    return data
}


function generateDataTableFilter(columns, extras = {}, url = null, DatoFiltrado) {
    const data = {
        responsive: {
            targets: 0
        },
        order: [[1, "desc"]],
        ajax: {
            url: url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            dataSrc: (json) => {
                var vArrayFiltrado = json.filter(function (item) {

                    return item.AnioID == DatoFiltrado 
                    
                })
                return vArrayFiltrado.map((dict) => {
                    let data = {}
                    for (let key in dict) {
                        let props = key.split(".")
                        if (props.length === 1) {
                            data[key] = dict[key]
                        } else {
                            let chain = {}
                            chain[props.pop()] = dict[key]
                            for (let prop in props.reverse()) {
                                let temp_chain = { ...chain }
                                chain = {}
                                chain[props[prop]] = temp_chain
                            }
                            data = { ...data, ...chain }
                        }
                    }
                    return data
                })
            }
        },
        columns: columns,
        processing: true,
        serverSide: true,
        destroy: true,
        language: getLanguage(),
    }
    for (const extra in extras) {
        if (extras.hasOwnProperty(extra)) {
            data[extra] = extras[extra]
        }
    }
    return data
}

function generateDataTableFilterDos(columns, extras = {}, url = null, DatoFiltrado, DatoFiltradoDos) {
    const data = {
        responsive: {
            targets: 0
        },
        order: [[1, "desc"]],
        ajax: {
            url: url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            dataSrc: (json) => {
                var vArrayFiltrado = json.filter(function (item) {

                    return item.AnioID == DatoFiltrado && item.ProgramaCodigo == DatoFiltradoDos

                })
                return vArrayFiltrado.map((dict) => {
                    let data = {}
                    for (let key in dict) {
                        let props = key.split(".")
                        if (props.length === 1) {
                            data[key] = dict[key]
                        } else {
                            let chain = {}
                            chain[props.pop()] = dict[key]
                            for (let prop in props.reverse()) {
                                let temp_chain = { ...chain }
                                chain = {}
                                chain[props[prop]] = temp_chain
                            }
                            data = { ...data, ...chain }
                        }
                    }
                    return data
                })
            }
        },
        columns: columns,
        processing: true,
        serverSide: true,
        destroy: true,
        language: getLanguage(),
    }
    for (const extra in extras) {
        if (extras.hasOwnProperty(extra)) {
            data[extra] = extras[extra]
        }
    }
    return data
}

function generateDataTableFilterTres(columns, extras = {}, url = null, DatoFiltrado, DatoFiltradoDos, DatosFiltradoTres) {
    const data = {
        responsive: {
            targets: 0
        },
        order: [[1, "desc"]],
        ajax: {
            url: url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            dataSrc: (json) => {
                var vArrayFiltrado = json.filter(function (item) {

                    return item.AnioID == DatoFiltrado && item.ProgramaCodigo == DatoFiltradoDos && item.SancionCodigo == DatosFiltradoTres

                })
                return vArrayFiltrado.map((dict) => {
                    let data = {}
                    for (let key in dict) {
                        let props = key.split(".")
                        if (props.length === 1) {
                            data[key] = dict[key]
                        } else {
                            let chain = {}
                            chain[props.pop()] = dict[key]
                            for (let prop in props.reverse()) {
                                let temp_chain = { ...chain }
                                chain = {}
                                chain[props[prop]] = temp_chain
                            }
                            data = { ...data, ...chain }
                        }
                    }
                    return data
                })
            }
        },
        columns: columns,
        processing: true,
        serverSide: true,
        destroy: true,
        language: getLanguage(),
    }
    for (const extra in extras) {
        if (extras.hasOwnProperty(extra)) {
            data[extra] = extras[extra]
        }
    }
    return data
}
function generateDataTableFilterNoUser(columns, extras = {}, url = null, DatoFiltrado) {
    const data = {
        responsive: {
            targets: 0
        },
        order: [[1, "desc"]],
        ajax: {
            url: url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            dataSrc: (json) => {
                var vArrayFiltrado = json.filter(function (item) {

                    return item.Usuariodb == DatoFiltrado

                })
                return vArrayFiltrado.map((dict) => {
                    let data = {}
                    for (let key in dict) {
                        let props = key.split(".")
                        if (props.length === 1) {
                            data[key] = dict[key]
                        } else {
                            let chain = {}
                            chain[props.pop()] = dict[key]
                            for (let prop in props.reverse()) {
                                let temp_chain = { ...chain }
                                chain = {}
                                chain[props[prop]] = temp_chain
                            }
                            data = { ...data, ...chain }
                        }
                    }
                    return data
                })
            }
        },
        columns: columns,
        processing: true,
        serverSide: true,
        destroy: true,
        language: getLanguage(),
    }
    for (const extra in extras) {
        if (extras.hasOwnProperty(extra)) {
            data[extra] = extras[extra]
        }
    }
    return data
}