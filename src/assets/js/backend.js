document.addEventListener('DOMContentLoaded', () => {
    var contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        var expertForm = document.querySelector('.expert-form');
        contactForm.addEventListener('submit', function(event) {
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
                setTimeout(function() {
                    expertForm.classList.remove('success');
                }, 2000);
            }
        });
    }
});
