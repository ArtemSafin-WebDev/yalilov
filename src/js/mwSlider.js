import gsap from 'gsap';
import { debounce } from 'lodash';

class CardSlider {
    constructor(element, options) {
        this.rootElement = element;
        this.loop = true;
        this.cardsWrapper = element.querySelector('.js-slider-cards');
        this.cards = Array.from(element.querySelectorAll('.js-slider-card'));
        this.originalCards = this.cards.map(card => card.cloneNode(true));
        this.nextArrow = element.querySelector('.js-slider-arrow-next');
        this.prevArrow = element.querySelector('.js-slider-arrow-prev');
        if (this.loop) {
            const clonedCards = this.originalCards.map(card => card.cloneNode(true));
            this.cardsWrapper.append(...clonedCards);
            this.cards = Array.from(element.querySelectorAll('.js-slider-card'));
        }

        this.cardsPositions = this.cards.map(card => ({
            card,
            position: 0,
            opacity: 1,
            scale: 1,
            width: card.offsetWidth
        }));
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.offset = 0;
        this.direction = '';
        this.pointerDown = false;
        this.activeIndex = 0;
        this.locked = false;
        this.clonedSlides = [];
        this.filterClicks = false;
        this.filterClicksDelay = 200;
        this.scaleMultiplier = options?.scaleMultiplier || 1;
        this.onSlideChange = options?.onSlideChange;
       
        this.movingByClick = false;
        this.slideToClickedSlides = true;
        this.TRANSITION_DURATION = 0.65;
        
        if (this.cards.length < 1) {
            console.warn('No cards present');
            return;
        }

        this.cardWidth = this.cards[0].offsetWidth;
        this.cardLargeWidth = this.cardWidth * this.scaleMultiplier;
        this.threshold = this.cardWidth * 0.3;

        this.margin = parseInt(window.getComputedStyle(this.cards[0]).marginRight, 10);
        this.thresholdReached = false;
        this.cloneIndex = this.originalCards.length;
        this.doneCloning = false;
        this.debug = false;

        this.initializeSlider();

        this.bindListeners();

        this.initializeArrows();
    }

    handleDragStart = event => {
        event.preventDefault();
        if (this.locked) {
            if (this.debug) console.log('Slider is locked');

            return;
        }
        this.startX = event.pageX;
        this.startY = event.pageY;
        this.pointerDown = true;

        if (this.debug) {
            console.log('Drag started', {
                startValue: this.startX
            });
        }
    };

    preventPhantomClicks = event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            if (this.filterClicks) {
                event.preventDefault();
                event.stopPropagation();
                if (this.debug) {
                    console.log('Click filtered', {
                        target: event.target,
                        filterClicks: this.filterClicks
                    });
                }
            }
        }
    };

    handleCardsClick = event => {
        if (event.target.matches('.js-slider-card') || event.target.closest('.js-slider-card')) {
            const card = event.target.matches('.js-slider-card') ? event.target : event.target.closest('.js-slider-card');

            if (card.classList.contains('active')) return;
            // event.preventDefault();
            if (this.debug) {
                console.log('Card', card, this.cards);
            }

            const cardIndex = this.cards.findIndex(element => element === card);
            if (this.debug) {
                console.log('Clicked on card width index:', cardIndex);
            }

            if (this.filterClicks) return;

            this.movingByClick = true;
            this.setActiveSlide(cardIndex);
        }
    };

    initializeSlider = () => {
        const currentCardPos = this.cardsPositions[this.activeIndex];

        gsap.set(currentCardPos.card, {
            width: this.cardLargeWidth
        });

        currentCardPos.width = this.cardLargeWidth;

        this.cards.forEach(card => card.classList.remove('active'));
        this.cards[this.activeIndex].classList.add('active');

        if (this.debug) {
            console.log('Slider initialized', this.cardsPositions);
        }
    };

    cloneSlides = (removePrevSlides = false) => {
        if (removePrevSlides) {
            this.cards.forEach((card, cardIndex) => {
                if (cardIndex < this.cloneIndex) {
                    card.remove();
                }
            });
        }
        const clonedCards = this.originalCards.map(card => card.cloneNode(true));
        this.cardsWrapper.append(...clonedCards);
        this.clonedSlides = clonedCards;
        this.resetSlider();

        if (removePrevSlides) {
            if (this.movingByClick) {
                if (this.debug) {
                    console.log('Cloning and setting active index', this.activeIndex - this.originalCards.length);
                }

                this.setActiveSlide(this.activeIndex - this.originalCards.length, true);
                this.movingByClick = false;
            } else {
                this.setActiveSlide(0, true);
            }
        }

        if (this.clonedSlides.length) {
            gsap.fromTo(
                this.clonedSlides,
                {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    duration: 0.3,
                    stagger: 0.2
                }
            );

            this.clonedSlides = [];
        }
    };

    resetSlider = () => {
        const savedIndex = this.activeIndex;
        this.cards = Array.from(this.rootElement.querySelectorAll('.js-slider-card'));
        this.cards.forEach(card => {
            gsap.killTweensOf(card);
            gsap.set(card, {
                clearProps: 'all'
            });
        });

        this.cardsPositions = this.cards.map(card => ({
            card,
            position: 0,
            opacity: 1,
            scale: 1,
            width: card.offsetWidth
        }));

        this.cardWidth = this.cards[0].offsetWidth;
        this.cardLargeWidth = this.cardWidth * this.scaleMultiplier;
        this.threshold = this.cardWidth * 0.3;
        this.margin = parseInt(window.getComputedStyle(this.cards[0]).marginRight, 10);

        this.activeIndex = 0;

        this.initializeSlider();

        if (this.activeIndex !== savedIndex) {
            this.setActiveSlide(savedIndex, true);
        }
    };

    translateSlides = () => {
        this.cardsPositions.forEach((item, itemIndex) => {
            if (this.direction === 'left') {
                if (itemIndex < this.activeIndex) {
                    gsap.set(item.card, {
                        x: item.position
                    });
                } else if (itemIndex === this.activeIndex) {
                    gsap.set(item.card, {
                        x: item.position,
                        autoAlpha: gsap.utils.interpolate(1, 0, Math.abs(this.offset / this.cardWidth / 1.2)),
                        scale: gsap.utils.interpolate(1, 0, Math.abs(this.offset / this.cardWidth / 1.2))
                    });
                } else {
                    gsap.set(item.card, {
                        x: item.position + this.offset
                    });
                }
            } else {
                if (itemIndex < this.activeIndex) {
                    if (itemIndex === this.activeIndex - 1) {
                        gsap.set(item.card, {
                            x: item.position,
                            autoAlpha: gsap.utils.interpolate(0, 1, Math.abs((this.offset / this.cardWidth) * 2.2)),
                            scale: gsap.utils.interpolate(0, 1, Math.abs((this.offset / this.cardWidth) * 2.2))
                        });
                    } else {
                        gsap.set(item.card, {
                            x: item.position
                        });
                    }
                } else if (itemIndex === this.activeIndex) {
                    gsap.set(item.card, {
                        x: item.position + this.offset
                    });
                } else {
                    gsap.set(item.card, {
                        x: item.position + this.offset
                    });
                }
            }
        });
    };

    translateToOriginalPositions = () => {
        this.locked = true;
        gsap.delayedCall(0.4, () => {
            this.locked = false;
        });
        this.cardsPositions.forEach(item => {
            gsap.to(item.card, {
                x: item.position,
                width: item.width,
                duration: 0.4,
                scale: item.scale,
                autoAlpha: item.opacity
            });
        });
    };

    setActiveSlide = (index, force = false) => {
        if (index === this.activeIndex) {
            console.warn('Setting the same index');
            return;
        }

        if (!this.cards[index]) {
            console.error('No card with such index');
            return;
        }

        this.locked = true;

        console.log('Setting index', index);

        const prevIndex = this.activeIndex;

        const DURATION = force ? 0 : this.TRANSITION_DURATION;
        gsap.delayedCall(DURATION, () => {
            this.locked = false;

            if (this.activeIndex === this.cloneIndex && !this.doneCloning) {
                this.doneCloning = true;
                this.cloneSlides(true);
            } else if (this.movingByClick && prevIndex < this.cloneIndex && this.activeIndex >= this.cloneIndex) {
                this.cloneSlides(true);
            } else {
                this.doneCloning = false;
            }
        });

        if (index > this.activeIndex) {
            this.cardsPositions.forEach((item, itemIndex) => {
                if (itemIndex < index) {
                    if (itemIndex < this.activeIndex) {
                        item.opacity = 0;
                        item.scale = 0;
                        item.width = this.cardLargeWidth;
                        gsap.to(item.card, {
                            duration: DURATION,
                            autoAlpha: 0,
                            scale: 0,
                            x: item.position,
                            width: this.cardLargeWidth
                        });
                    } else {
                        const newPos =
                            item.position - ((itemIndex - this.activeIndex) * this.cardLargeWidth + (itemIndex - this.activeIndex) * this.margin);
                        item.position = newPos;
                        item.opacity = 0;
                        item.scale = 0;
                        item.width = this.cardLargeWidth;
                        gsap.to(item.card, {
                            duration: DURATION,
                            autoAlpha: 0,
                            scale: 0,
                            x: newPos,
                            width: this.cardLargeWidth
                        });
                    }
                } else if (itemIndex === index) {
                    const newPos = item.position - ((index - this.activeIndex) * this.cardLargeWidth + (index - this.activeIndex) * this.margin);
                    item.position = newPos;
                    item.opacity = 1;
                    item.scale = 1;
                    item.width = this.cardLargeWidth;
                    gsap.to(item.card, {
                        duration: DURATION,
                        autoAlpha: 1,
                        scale: 1,
                        x: newPos,
                        width: this.cardLargeWidth
                    });
                } else {
                    const newPos = item.position - ((index - this.activeIndex) * this.cardLargeWidth + (index - this.activeIndex) * this.margin);
                    item.position = newPos;
                    item.opacity = 1;
                    item.scale = 1;
                    item.width = this.cardWidth;
                    gsap.to(item.card, {
                        duration: DURATION,
                        autoAlpha: 1,
                        scale: 1,
                        x: newPos,
                        width: this.cardWidth
                    });
                }
            });
        } else {
            this.cardsPositions.forEach((item, itemIndex) => {
                if (itemIndex < index) {
                    item.opacity = 0;
                    item.scale = 0;
                    item.width = this.cardLargeWidth;
                    gsap.to(item.card, {
                        duration: DURATION,
                        autoAlpha: 0,
                        scale: 0,
                        x: item.position,
                        width: this.cardLargeWidth
                    });
                } else if (itemIndex === index) {
                    item.opacity = 1;
                    item.scale = 1;
                    item.width = this.cardLargeWidth;
                    gsap.to(item.card, {
                        duration: DURATION,
                        autoAlpha: 1,
                        scale: 1,
                        x: item.position,
                        width: this.cardLargeWidth
                    });
                } else {
                    if (itemIndex > index && itemIndex <= this.activeIndex) {
                        const newPos = item.position + (itemIndex - index) * this.cardLargeWidth + (itemIndex - index) * this.margin;
                        item.position = newPos;
                        item.opacity = 1;
                        item.scale = 1;
                        item.width = this.cardWidth;
                        gsap.to(item.card, {
                            duration: DURATION,
                            autoAlpha: 1,
                            scale: 1,
                            x: newPos,
                            width: this.cardWidth
                        });
                    } else {
                        const newPos = item.position + (this.activeIndex - index) * this.cardLargeWidth + (this.activeIndex - index) * this.margin;
                        item.position = newPos;
                        item.opacity = 1;
                        item.scale = 1;
                        item.width = this.cardWidth;
                        gsap.to(item.card, {
                            duration: DURATION,
                            autoAlpha: 1,
                            scale: 1,
                            x: newPos,
                            width: this.cardWidth
                        });
                    }
                }
            });
        }

      

        this.activeIndex = index;

        this.cards.forEach(card => card.classList.remove('active'));
        this.cards[this.activeIndex].classList.add('active');

        this.handleArrowsActivity();

        if (typeof this.onSlideChange === 'function' && !force) {
            this.onSlideChange(prevIndex, this.activeIndex);
        }
    };

    slideNext = () => {
        if (this.cards[this.activeIndex + 1]) {
            this.setActiveSlide(this.activeIndex + 1);
        }
    };
    slidePrev = () => {
        if (this.cards[this.activeIndex - 1]) {
            this.setActiveSlide(this.activeIndex - 1);
        }
    };

    initializeArrows = () => {
        if (this.nextArrow) {
            this.nextArrow.addEventListener('click', event => {
                event.preventDefault();
                this.slideNext();
            });
        }
        if (this.prevArrow) {
            this.prevArrow.addEventListener('click', event => {
                event.preventDefault();
                this.slidePrev();
            });
        }

        this.handleArrowsActivity();
    };

    handleArrowsActivity = () => {
        const cards = Array.from(this.rootElement.querySelectorAll('.js-slider-card'));
        const currentIndex = this.activeIndex;

        const prevCards = cards.filter((card, cardIndex) => {
            if (cardIndex < currentIndex) {
                return true;
            } else {
                return false;
            }
        });
        const nextCards = cards.filter((card, cardIndex) => {
            if (cardIndex > currentIndex) {
                return true;
            } else {
                return false;
            }
        });

        if (this.prevArrow) {
            this.prevArrow.classList.remove('disabled');
            if (!prevCards.length) {
                this.prevArrow.classList.add('disabled');
            }
        }

        if (this.nextArrow) {
            this.nextArrow.classList.remove('disabled');
            if (!nextCards.length) {
                this.nextArrow.classList.add('disabled');
            }
        }
    };

    handleDragMove = event => {
        event.preventDefault();
        if (!this.pointerDown) return;

        if (this.debug) {
            console.log('Dragmove');
        }

        this.moveX = event.pageX;
        this.moveY = event.pageY;
        this.offset = this.moveX - this.startX;
        
        this.direction = this.offset > 0 ? 'right' : 'left';

        const verticalOffset = this.moveY - this.startY;

        if (Math.abs(verticalOffset) > Math.abs(this.offset)) return;

        console.log('Vertical offset', verticalOffset)

        this.translateSlides();

        if (Math.abs(this.offset) >= this.threshold) {
            this.thresholdReached = true;

            if (this.debug) {
                console.log('Threshold reached');
            }

            this.handleDragEnd();
        }
    };

    handleDragEnd = event => {
        if (event) {
            event.preventDefault();
        }

        if (!this.pointerDown) {
            return;
        }
        this.pointerDown = false;

        if (this.thresholdReached) {
            if (this.direction === 'left' && this.cards[this.activeIndex + 1]) {
                this.setActiveSlide(this.activeIndex + 1);
            } else if (this.direction === 'right' && this.cards[this.activeIndex - 1]) {
                this.setActiveSlide(this.activeIndex - 1);
            } else {
                this.translateToOriginalPositions();
            }
        } else {
            this.translateToOriginalPositions();
        }

        if (this.debug) {
            console.log('Drag ended', {
                direction: this.direction,
                offset: this.offset,
                eventType: event ? event.type : 'threshold reached'
            });
        }

        if (Math.abs(this.offset) > 10) {
            this.filterClicks = true;

            setTimeout(() => {
                this.filterClicks = false;
            }, 300);
        } else {
            if (this.debug) {
                console.log('Clicks not blocked', this.offset);
            }
        }

        this.offset = 0;
        this.direction = '';
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.thresholdReached = false;
    };

    bindListeners = () => {
        this.cardsWrapper.addEventListener('pointerdown', this.handleDragStart);
        this.cardsWrapper.addEventListener('pointermove', this.handleDragMove);
        this.cardsWrapper.addEventListener('pointerup', this.handleDragEnd);
        this.cardsWrapper.addEventListener('pointerleave', this.handleDragEnd);
        this.cardsWrapper.addEventListener('pointercancel', this.handleDragEnd);

        this.cardsWrapper.addEventListener('click', this.preventPhantomClicks);

        window.addEventListener(
            'resize',
            debounce(() => {
                this.resetSlider();
            }, 200)
        );

        if (this.slideToClickedSlides) {
            this.cardsWrapper.addEventListener('click', this.handleCardsClick);
        }
    };
}

export default CardSlider;
