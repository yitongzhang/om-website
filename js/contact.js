$(function () {

    formInit('#contactForm');

    function formInit(form) {

        $(form).each(function () {

            var form = $(this);
            var fields = form.find('input,textarea,select');
            var errorDiv = form.find('.form-error-message');
            var contactForm = $('.contact-form');
            var submitSuccess = $('.submit-success');
            var submitSuccessDismiss = $('.submit-success-dismiss');

            function setErrorMessage(text) {
                errorDiv.text(text);
                errorDiv.addClass('active');
            }

            function hideErrorMessage() {
                errorDiv.text('');
                errorDiv.removeClass('active');
            }

            function clearFields() {
                form.find('input[type=text],input[type=email],select,textarea').each(function () {
                    $(this).val('');
                });
            }

            function validate() {

                var result = 'ok';

                var emailExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

                // empty
                fields.each(function () {
                    var field = $(this);
                    var name = field.attr('name');
                    if (field.val() == '') {
                        field.addClass('error');
                        result = ' Please input required fields!';
                    } else {
                        field.removeClass('error');
                    }
                });

                fields.each(function () {
                    var field = $(this);
                    var name = field.attr('name');
                    if (field.attr('type') == 'email' && !emailExp.test(field.val())) {
                        result = 'Please input valid email!';
                        field.addClass('error');
                        return false;
                    } else if (field.attr('type') == 'email' && emailExp.test(field.val())) {
                        field.removeClass('error');
                    }
                });

                return result;
            }

            fields.on('blur', function () {
                if ($(this).val() != '' && $(this).attr('type') != 'email') {
                    $(this).removeClass('error');
                }
            });

            form.find('input[type=email]').on('blur', function () {
                var field = $(this);
                var emailExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                if (field.val() != '' && !emailExp.test(field.val())) {
                    setErrorMessage('Please input valid email!');
                    field.addClass('error');
                } else if (emailExp.test(field.val())) {
                    field.removeClass('error');
                    hideErrorMessage();
                }
            });

            form.on('submit', function (event) {

                event.preventDefault();

                var fields = {};
                var form = $(this);
                var messageError = form.find('.form-error-message');
                var validateResult = validate();

                if (validateResult == 'ok') {

                    // collect data and validate
                    form.find('input,select,textarea').each(function () {
                        var name = $(this).attr('name');
                        var value = $(this).val();
                        fields[name] = value;
                    });

                    $.ajax({

                        dataType: "json",
                        url: '/email-rob.php',
                        type: 'post',
                        data: fields,
                        crossDomain: true,

                        beforeSend: function () {
                            messageError.removeClass('active');
                        },

                        success: function (resp) {

                            if (resp.success) {

                                contactForm.css('display', 'none');
                                submitSuccess.css('display', 'block');

                                clearFields();

                                submitSuccessDismiss.on('click', function (e) {
                                    e.preventDefault();
                                    contactForm.css('display', 'block');
                                    submitSuccess.css('display', 'none');
                                });

                            } else {
                                setErrorMessage("Hmm, something went wrong. Please try again.");
                            }
                        }
                    });
                } else {
                    setErrorMessage(validateResult);
                }
            });
        });
    }
});
