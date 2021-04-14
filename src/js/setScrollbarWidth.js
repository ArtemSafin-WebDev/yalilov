export default function setScrollbarWidth() {
    const setWidth = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const scrollbarHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);

        document.documentElement.style.setProperty('--sb-width', scrollbarWidth + "px");
        document.documentElement.style.setProperty('--sb-height', scrollbarHeight + "px");
    }

    setWidth();

    window.addEventListener('resize', setWidth);
    
}