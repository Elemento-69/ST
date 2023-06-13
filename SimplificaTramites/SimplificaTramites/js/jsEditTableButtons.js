saveInputEditTableButtons = (row, values, olds = {}) => alert('es necesario sobreescribir la funcion saveInputEditTableButtons')
$('tbody').on('click', "button[data-content=Editar]", ({ currentTarget }) => {
    const tr = $(currentTarget).closest('tr');
    tr.find('.no-editing-icons').addClass('d-none')
    tr.find('.editing-icons').removeClass('d-none')
    const editInput = tr.find('input')
    editInput.each((_, val) => {
        let input = $(val).closest('td').find('.no-editing-icons')
        val.value = input.val() || input.html().trim().replace('&nbsp;', ' ')
    })
}
);
dictButtonsEditTable = {
    "edit": {
        "icon": "fa-pencil-alt",
        "color": "blue",
        "content": "Editar",
        "class": "edit"
    },
    "delete": {
        "class": "delete",
        "icon": "fa-trash",
        "color": "red",
        "content": "Eliminar"
    },
    "anular": {
        "class": "anular",
        "icon": "fa-ban",
        "color": "red",
        "content": "Anular"
    },
    "activar": {
        "class": "activar",
        "icon": "fa-sync",
        "color": "green",
        "content": "Activar"
    }
}

/**
 * @param {list} buttons list of buttons to create from dictButtonsEditTable
 */
function createButtonWrapperEdit(buttons = ["edit"]) {
    buttons = buttons.map((el) => {
        el = dictButtonsEditTable[el]
        return ` <button type="button" class="action-icon hover-${el.color} btn btn-light table_edit_${el.class}-btn" data-toggle="popover" data-trigger="hover" 
                            data-content="${el.content}" data-placement="top" style="cursor:pointer">
                            <i class="fas ${el.icon} fa-lg fa-fw"></i>
                </button>`
    })
    return `<div class="no-editing-icons">
                ${buttons.join("")}
            </div>
            <div class="editing-icons d-none">
                <button type="button" class="action-icon hover-blue btn btn-light" data-toggle="popover" data-trigger="hover"
                    data-content="Guardar Editado" data-placement="top" style = "cursor:pointer" >
                <i class="fas fa-save fa-lg fa-fw"></i></button>
                <button type="button" class="action-icon hover-red btn btn-light" data-toggle="popover" data-trigger="hover"
                    data-content="Cancelar Editado" data-placement="top">
                    <i class="fas fa-times-circle fa-lg fa-fw"></i>
                </button>
            </div>`
}


function createFormWrapperEdit(value, name = "descripcion", valueClass="") {
    return `<div class="no-editing-icons ${valueClass} table_edit_${name}-name">
                ${value}
            </div>
            <div class="editing-icons d-none">
                <input type="text" name="${name}" class="table-input ${valueClass}"  style="min-width:90%" >
            </div>`
}

$('tbody').on('click', "button[data-content='Guardar Editado']", (e) => {
    prepareSaveEditTable(e)
})

function validateEditTable(row, inputs) {
    return true;
}

prepareSaveEditTable = ({ currentTarget }) => {
    const tr = $(currentTarget).closest('tr');
    const editInput = tr.find('input')
    if(!validateEditTable(tr, editInput)) return
    tr.find('.editing-icons').addClass('d-none')
    tr.find('.no-editing-icons').removeClass('d-none')
    vals = {}
    old_vals = {}
    editInput.each((_, val) => {
        const $selector = $(val).closest('td').find('.no-editing-icons');
        old_vals[val.name] = $selector.inputmask ? $selector.inputmask('unmaskedvalue') : $selector.html() || $selector.val()
        vals[val.name] = val.inputmask ? val.inputmask.unmaskedvalue() : val.value
    })
    saveInputEditTableButtons(tr, vals, old_vals)
}

$('tbody').on('click', "button[data-content='Cancelar Editado']", ({ currentTarget }) => {
    cancelEditTableButtons(currentTarget)
})

cancelEditTableButtons = (el) => {
    const tr = $(el).closest('tr');
    tr.find('.editing-icons').addClass('d-none')
    tr.find('.no-editing-icons').removeClass('d-none')
}

$('tbody').on("keydown", "input", (e) => {
    if (e.key === "Enter") {
        prepareSaveEditTable(e)
        return false
    }
    return true
})

