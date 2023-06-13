function WithoutPagination(languaje, columns, data) {
    return {
        language: { url: `${languaje}DataTables/lenguaje_es.json` },
        data: data,
        columns: columns,
        searching: true,
        ordering: false,
        destroy: true,
        lengthMenu: [1000000],
        sDom: "",
        sPaginationType: ""
    };
}
function PaginationData(languaje, columns, data) {
    return {
        language: { url: `${languaje}DataTables/lenguaje_es.json` },
        data: data,
        columns: columns,
        searching: true,
        ordering: false,
        destroy: true,
        lengthMenu: [10],
        sDom: "<tr><'row m-0 mt-3 mb-1'<'col-lg-12 d-flex justify-content-md-end justify-content-center align-items-center flex_wrap_c'p<'add-update-datatable'>>>",
        sPaginationType: "full_numbers"
    };
}

function ReloadTable() { }

function requestAjax(url, languaje, columns) {
    return {
        ajax: (params, callback) => {
            ReloadTable();
            $.ajax({
                contentType: "application/json; charset=utf-8",
                url: url,
                method: 'POST',
                datatype: "json",
                data: JSON.stringify({ limit: params.length, offset: params.start, search: params.search.value }),
                success: (r) => {
                    if (r && r.d)
                        callback({ recordsTotal: r.d.Count, recordsFiltered: r.d.Count, data: r.d.Data });
                    else
                        callback({ recordsTotal: 0, recordsFiltered: 0, data: [] })
                },
                error: () => {
                    callback({ recordsTotal: 0, recordsFiltered: 0, data: [] });
                }
            });
        },
        language: { url: `${languaje}DataTables/lenguaje_es.json` },
        lengthMenu: [10],
        searching: true,
        ordering: false,
        sDom: "<tr><'row m-0 mt-3 mb-1'<'col-lg-12 d-flex justify-content-md-end justify-content-center align-items-center flex_wrap_c'p<'add-update-datatable'>>>",
        sPaginationType: "full_numbers",
        processing: true,
        serverSide: true,
        paging: true,
        destroy: true,
        columns: columns
    };
}

function WithoutPaginationSelect(languaje, columns, data) {
    return {
        language: { url: `${languaje}DataTables/lenguaje_es.json` },
        data: data,
        columns: columns,
        searching: true,
        ordering: false,
        destroy: true,
        lengthMenu: [1000000],
        sDom: "",
        sPaginationType: "",
        select: true
    };
}


function format_currency(numero, prefix = '', sufix = '') {
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}

function format_date(fecha) {
    if (!fecha)
        return '';
    var today = new Date(fecha);
    var dd = Pad(today.getDate());
    var mm = Pad(today.getMonth() + 1);
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

function Pad(value, length = 2) {
    return (value.toString().length < length) ? Pad("0" + value, length) : value;
}

function EventSelectionRow(IdTable) {
    $(`#${IdTable}`).on('click', 'tbody tr', function (e) {
        $(`#${IdTable} tbody > tr`).removeClass("seleccionado");
        e.currentTarget.classList.add("seleccionado");
    });
}

function EventSelectionCheckbox(event, clase) {
    $(`.${clase}`).parent().parent().parent().removeClass("seleccionado");
    if (event.checked)
        event.parentElement.parentElement.parentElement.classList.add("seleccionado");
    else
        event.parentElement.parentElement.parentElement.classList.remove("seleccionado");
}