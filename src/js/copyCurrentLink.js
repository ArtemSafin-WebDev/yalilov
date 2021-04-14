


const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export default function copyCurrentLink() {
    const elements = Array.from(document.querySelectorAll('.js-copy-current-link'));
    elements.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                        console.log('Ссылка скопирована', window.location.href)
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                copyToClipboard(window.location.href);
                if (window.showMessage) {
                    console.log('Ссылка скопирована', window.location.href)
                }
            }
        });
    });
}