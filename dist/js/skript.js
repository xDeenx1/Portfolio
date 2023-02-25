const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      closeOut = document.querySelector('.menu__overlay');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    hamburger.classList.add('not_active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    hamburger.classList.remove('not_active');
});

closeOut.addEventListener('click', () => {
    menu.classList.remove('active');
    hamburger.classList.remove('not_active');
});


 