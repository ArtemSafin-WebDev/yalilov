export default function fileUpload() {
    const elements = Array.from(document.querySelectorAll('.js-file-upload'));

    elements.forEach(element => {
        const input = element.querySelector('input[type="file"]');
        const label = element.querySelector('.js-file-upload-text');
        const originalLabelContent = label.innerHTML;
        input.addEventListener('change', () => {
            if (input.files.length) {
                // label.textContent = input.files[0].name;

                label.innerHTML = `
                    <svg width="14" height="14" aria-hidden="true" class="icon-file">
                        <use xlink:href="#file"></use>
                    </svg>
                    <span class="expert-form__file-upload-small-text">${input.files[0].name}</span>
                   
                    <span class="expert-form__file-upload-close">
                        <svg width="14" height="14" aria-hidden="true" class="icon-trashcan">
                            <use xlink:href="#trashcan"></use>
                        </svg>
                        Очистить
                    </span>
                `;
                element.classList.add('file-loaded');
            } else {
                label.innerHTML = originalLabelContent;
                element.classList.remove('file-loaded');
            }
        });

        input.addEventListener('dragenter', () => {
            element.classList.add('dragged');
        });
        input.addEventListener('dragend', () => {
            element.classList.remove('dragged');
        });
        input.addEventListener('dragleave', () => {
            element.classList.remove('dragged');
        });
        input.addEventListener('drop', () => {
            element.classList.remove('dragged');
        });

        element.addEventListener('click', event => {
            if (event.target.matches('.expert-form__file-upload-close') || event.target.closest('.expert-form__file-upload-close')) {
                event.preventDefault();
                input.value = '';
                label.innerHTML = originalLabelContent;
                element.classList.remove('file-loaded');
            }
        });
    });
}
