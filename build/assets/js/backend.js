document.addEventListener('DOMContentLoaded', () => {
    var contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        var expertForm = document.querySelector('.expert-form');
        var closeForm = document.querySelector('.expert-form-menu');
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (
                $(contactForm)
                    .parsley()
                    .isValid()
            ) {
                contactForm.reset();
                $(contactForm)
                    .parsley()
                    .reset();
                expertForm.classList.add('success');
                setTimeout(function () {
                    expertForm.classList.remove('success');
                    if (typeof window.closeMenuForm === 'function') {
                        closeMenuForm();
                    }
                }, 2000);
            }
        });
    }
});
