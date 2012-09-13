var SITE = {

    init: function() {
        $(document).on('mouseenter', '.upper', function() {
            $('.social').slideDown();
        });
        $(document).on('mouseleave', '.upper', function() {
            $('.social').slideUp();
        });

        $(document).on('click', '.box ul a', function(e) {
            e.preventDefault();
            SITE.load($(this).attr('href'), function(html) {
                $('#frame').empty().append(html);
            });
        });
        $('.box ul a').first().trigger('click');
    },

    load: function(url, cb) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            complete: function(xhr, textStatus) {
            },
            success: function(data, textStatus, xhr) {
                cb(data);
            },
            error: function(xhr, textStatus, errorThrown) {
            }
        });

    }

}

jQuery(document).ready(function($) {
    SITE.init();
});