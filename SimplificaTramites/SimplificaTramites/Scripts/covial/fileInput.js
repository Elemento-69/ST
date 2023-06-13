$('input[type=file]').on('change', ({ currentTarget }) => {
    let prevContainer = $(currentTarget).siblings('img, video')[0]
    var fr = new FileReader();
    fr.onload = function () {
        if (prevContainer.tagName == 'IMG')
            prevContainer.src = fr.result;
        else {
            $(prevContainer).html(`<source src="${fr.result}#t=0.1" type="${fr.result.split(";")[0].replace("data:", "")}">`)
            prevContainer.load()
        }
    }
    fr.readAsDataURL(currentTarget.files[0]);
})