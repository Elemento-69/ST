(function ($) {
    "use strict"; // Start of use strict

    var WINDOW_SIZE = 0;
    $(document).ready(function () {
        // manejo de la redimension al cargar la página
        manageResize();
        $('#toggler').on('click', toggleSidebar);
    });

    $(window).on('resize', function (e) {
        e.preventDefault();
        manageResize();
    });

    function toggleSidebar(e) {
        e.preventDefault();
        if ($('#container').hasClass('collapsed')) {
            $('#container').removeClass('collapsed');
            $('#toggler .fa-chevron-circle-left').removeClass('fa-rotate-180');
        }
        else {
            $('#container').addClass('collapsed');
            $('.collapsed-list').removeClass('show');
            $('#toggler .fa-chevron-circle-left').addClass('fa-rotate-180');            
        }
    }

    function manageResize() {
        if (WINDOW_SIZE !== $(window).width()) {
            WINDOW_SIZE = $(window).width();
        }

        if (WINDOW_SIZE < 992) {
            $('#container').addClass('collapsed');
            $('#toggler .fa-chevron-circle-left').addClass('fa-rotate-180');            
        }
        else {
            $('#container').removeClass('collapsed');
            $('#toggler .fa-chevron-circle-left').removeClass('fa-rotate-180');
            $('.collapsed-list').removeClass('show');
        }
    }

})(jQuery); // End of use strict