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
import publicationsSlider from './publicationsSlider';
import expertForm from './expertForm';
import anchorLinks from './anchorLinks';
import practicNav from './practicNav';
import contactsMap from './contactsMap';
import socialSlider from './socialSlider';
import socialNav from './socialNav';
import valuesAnimations from './valuesAnimations';
import textPageGallery from './textPageGallery';
import scrollableTable from './scrollableTable';
import copyCurrentLink from './copyCurrentLink';
import similarPublications from './similarPublications';
import socialShowMore from './socialShowMore';

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
    publicationsSlider();

    aboutAnimations();
    expertForm();
    anchorLinks();
    practicNav();
    contactsMap();
    socialSlider();
    socialNav();

    valuesAnimations();
    textPageGallery();
    scrollableTable();
    copyCurrentLink();
    similarPublications();
    socialShowMore();
    

    const imgLoaded = imagesLoaded(document.querySelector('.page-content'));

    imgLoaded.on('always', () => {
        ScrollTrigger.refresh();

        console.log('Images has been loaded');
    });

    document.addEventListener('lazyloaded', function() {
        ScrollTrigger.refresh();
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    clientsSlider();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
