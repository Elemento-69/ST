saveInputEditTableButtons = (input) => alert('es necesario sobreescribir la funcion saveInputEditTableButtons')
$('tbody').find("a[data-content=Editar]").on('click', ({ currentTarget }) => {
    const tr = $(currentTarget).closest('tr');
    tr.find('.no-editing-icons').addClass('d-none')
    tr.find('.editing-icons').removeClass('d-none')
    const editInput = tr.find('input')
    editInput.each((_, val) => {
        val.value = $(val).closest('td').find('.no-editing-icons').html().trim().replace('&nbsp;', ' ')
    })
}
);

$('tbody').find("a[data-content='Guardar Editado']").on('click', ({currentTarget}) => {
    const tr = $(currentTarget).closest('tr');
    tr.find('.editing-icons').addClass('d-none')
    tr.find('.no-editing-icons').removeClass('d-none')
    const editInput = tr.find('input')
    editInput.each((_, val) => {
        $(val).closest('td').find('.no-editing-icons').html(val.value.trim().replace(' ', '&nbsp;'))
        saveInputEditTableButtons(val)
    })
})

$('tbody').find("a[data-content='Cancelar Editado']").on('click', ({currentTarget}) => {
    const tr = $(currentTarget).closest('tr');
    tr.find('.editing-icons').addClass('d-none')
    tr.find('.no-editing-icons').removeClass('d-none')
})