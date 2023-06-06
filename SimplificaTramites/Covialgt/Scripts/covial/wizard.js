(function ($) {
    "use strict"; // Start of use strict

    $(document).ready(function () {
        var current_fs, next_fs, previous_fs;
        var opacity;

        $(".next").click(function () {
            current_fs = $(this).closest("fieldset");
            next_fs = current_fs.next();

            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            next_fs.show();
            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        });

        $(".previous").click(function () {
            current_fs = $(this).closest("fieldset");
            previous_fs = current_fs.prev();

            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            previous_fs.show();

            current_fs.animate({ opacity: 0 }, {
                step: function (now) {
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    previous_fs.css({ 'opacity': opacity });
                },
                duration: 600
            });
        });
    });

})(jQuery); // End of use strict