'use strict';

////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////

//Implimenting Smooth Scrolling( New schooling way)

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////

////_____Event Delegation:Implementing Page Navigation_____/////

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////

////_____Building a Tabbed Component_____/////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause (More Modern way)
  if (!clicked) return;

  //Remove the Active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content Area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//////////////////////////////////////////////////////////////////

////_____Passing Argument to event Handler_____/////

////_____Menu Fade Animation__(event delegation)_____/////

const nav = document.querySelector('.nav');

const handlehover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// (Bind Method Revision in Chap:10-Functions)
//Passing "argument" into handler
nav.addEventListener('mouseover', handlehover.bind(0.5));
nav.addEventListener('mouseout', handlehover.bind(1));
///////////////////////////////////////////////////////////////////////////////

////_____Implementing a sticky Navigation_The Scroll Event_____/////

////_____Sticky Navigation____(The Intersection observer API)_____/////____( Good Way )

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////////////////////////////////////////////////////////

////_____Revealing Elements on scroll____(The Intersection observer API)_____/////

//Reveal Section
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

////////////////////////////////////////////////////////////////////////////

////_____lazy loading Page____(The Intersection observer API)_____/////

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src

  entry.target.src = entry.target.dataset.src;
  // Here JS fine the new image that it should load and display(it does in behind the screen)
  //and once it's finished loading that image, It will Emit the LOAD EVENT(load event just like any other event)
  //so we can listen for it and do something

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '150px',
});

imgTarget.forEach(img => {
  imgObserver.observe(img);
});

////////////////////////////////////////////////////////////////////////////

////_____Building a slider Component____(The Intersection observer API)_____/////

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

const dotContainer = document.querySelector('.dots');

//__Creating Function__//
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide); //currenSlide=1 : (-100%,0%,100%,200%)
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};
//Create Dots
const createDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot " data-slide="${i}"></button> `
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  //Dots
  createDots();
  //ActivateDots
  activateDot(0);
  //beginning
  goToSlide(0); //(0%,100%,200%,300%)
};

//__Initiate__//
init();

//__Event Handler__//
//Next Slide
btnRight.addEventListener('click', nextSlide);
//Previous Slide
btnLeft.addEventListener('click', prevSlide);

//Implimenting Event for Key Button
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

//(Using Event Delegation)Implimenting Dots Slide

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot'));
  const { slide } = e.target.dataset; // Here We are destructuring ( we are reading from the object so we use{})

  goToSlide(slide);
  activateDot(slide);
});
//////////////////////////////////////////////////////////////////////////////////////////

/////////_____Lifecycle DOM Event_____////////

//DOMcontentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

//loadEvent
window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});
//beforeunload
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = 'message';
});
