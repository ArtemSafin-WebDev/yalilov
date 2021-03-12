import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import phoneMask from './phoneMask';
import onlyNumeric from './onlyNumeric';
import fileUpload from './fileUpload';
import pressCenterSlider from './pressCenterSlider';
import teamSlider from './teamSlider';
import newsSlider from './newsSlider';
import footerReveal from './footerReveal';
import stickyLogo from './stickyLogo';
import mobileMenu from './mobileMenu';
import clientsSlider from './clientsSlider';
import aboutAnimations from './aboutAnimations';
import imagesLoaded from 'imagesloaded';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    validation();
    customSelects();
    phoneMask();
    onlyNumeric();
    fileUpload();
    pressCenterSlider();
    teamSlider();
    newsSlider();
    footerReveal();
    stickyLogo();
    mobileMenu();
    clientsSlider();
    aboutAnimations();

    const imgLoaded = imagesLoaded(document.querySelector('.page-content'));

    imgLoaded.on('always', () => {
        ScrollTrigger.refresh();

        console.log('Images has been loaded')
    });

    document.addEventListener('lazyloaded', function(){
        ScrollTrigger.refresh();
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300)
})
