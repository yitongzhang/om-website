$(function () {

    function _enablePage() {
        $('body').css('opacity', 1);
    }

    try {
        Typekit.load({
            loading: function () {
                // JavaScript to execute when fonts start loading
            },
            active: function () {
                _enablePage();
            },
            inactive: function () {
                _enablePage();
            }
        })
    }
    catch (e) {
    }
});
