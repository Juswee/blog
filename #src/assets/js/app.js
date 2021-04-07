window.onload = () => {
  randomArticleLink();
  currentPage();
  eventListener();
  randomTagColor();
}

function randomArticleLink() {
  let rand = Math.round(Math.random() * (document.querySelector('.content').childElementCount - 2));
  document.querySelectorAll('.nav__link[data-random-link]').forEach(link => {
    link.setAttribute('href', `/article/${rand}`);
  });
}

function randomTagColor() {
  const colors = ['black', 'grey', 'white', 'orange', 'blue', 'red', 'green', 'yellow', 'pink', 'purple'];
  document.querySelectorAll('.tag__item').forEach(el => {
    let color = Math.round(Math.random() * (colors.length - 1));
    el.classList.add(`li-${colors[color]}`);
  });
}

function eventListener() {
  document.querySelector('.header__menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.sidebar').classList.toggle('active');
  });
}

function currentPage() {
  let page = window.location.pathname;
  document.querySelectorAll(`.nav__link[href="${page}"]`).forEach(el => {
    el.classList.add('active');
  });
}