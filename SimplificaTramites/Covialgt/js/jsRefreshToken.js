$.ajaxPrefilter(function (options, originalOptions) {
    originalOptions._error = originalOptions.error;

    // overwrite error handler for current request
    options.error = function (jqxhr, _textStatus, _errorThrown) {
        if (!this.redirected && (jqxhr.status === 0 || jqxhr.status === 401)) {
            $.ajax({
                url: "/Helpers/RefreshToken.ashx",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.responseText) {
                        token = response.responseText
                        originalOptions.headers.Authorization = `Bearer ${response.responseText}`
                        originalOptions["redirected"] = true
                        setTimeout($.ajax(originalOptions), 0);
                    } else {
                        window.location.href = "/Auth/Login";
                    }
                },
                error: function (response) {
                    if (response.responseText) {
                        token = response.responseText
                        originalOptions.headers.Authorization = `Bearer ${response.responseText}`
                        originalOptions["redirected"] = true
                        setTimeout($.ajax(originalOptions),0);
                    } else {
                        window.location.href = "/Auth/Login";
                    }
                }
            });
        }
        else {
            if (originalOptions._error) originalOptions._error(jqxhr, _textStatus, _errorThrown);
            return;
        }
    };

});

