function loadComponents(parent) {
    try {
        $('.date').datetimepicker({
            format: "L",
            locale: "es",
            useStrict: true,
            useCurrent: false,
            keyBinds: {
                enter: function () {
                    this.hide();
                },
                escape: function () {
                    this.hide();
                }
            }
        });
        $('.date').on("change.datetimepicker", (e, date, oldate) => {
            if (e.date) {
                $(e.currentTarget).find("input").trigger("change")
            }
        })
    }
    catch (e) {
        if (!(e instanceof TypeError)) {
            throw e;
        }
    }

    $('input:visible:enabled:first', parent).focus();
}

function loadDefaultComponents() {
    loadComponents(null);
}