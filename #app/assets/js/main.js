window.onload = () => {
  currentPage();
  eventListener();
  randomTagColor();

  console.log(document.location.pathname)
  if (document.location.pathname == '/') index();
  else if (document.location.pathname.includes('article')) article();
}

function index() {
  console.log('index')
  document.querySelector('.options__item[name=type]').value = 'text';
}

function article() {

}

function randomTagColor() {
  const colors = ['black', 'grey', 'white', 'orange', 'blue', 'red', 'green', 'yellow', 'pink', 'purple'];
  document.querySelectorAll('.tag__item').forEach(el => {
    let color = Math.round(Math.random() * (colors.length - 1));
    el.classList.add(`li-${colors[color]}`);
  });
}

function eventListener() {
  document.querySelectorAll('textarea').forEach(el => {
    el.addEventListener('keyup', () => {
      el.style.height = el.scrollHeight + 'px';
    });
  });

  document.querySelector('.options__item[name=type]').addEventListener('change', function() {
    const title = document.querySelector('.post-new__title');
    const text = document.querySelector('.post-new__text');
    const link = document.querySelector('.post-new__link');
    const image = document.querySelector('.post-new__attachment');
    if (this.value == 'text') {
      image.hidden = true;
      link.hidden = true;
      title.hidden = true;
      return text.hidden = false;
    } 
    if (this.value == 'article') {
      image.hidden = false;
      link.hidden = true;
      title.hidden = false;
      return text.hidden = false;
    }
    if (this.value == 'video') {
      image.hidden = false;
      link.hidden = false;
      title.hidden = false;
      return text.hidden = true;
    }
  });

  document.querySelector('.header__menu').addEventListener('click', function() {
    e.classList.toggle('active');
    document.querySelector('.sidebar').classList.toggle('active');
  });

  document.querySelectorAll('.search').forEach(el => {
    el.addEventListener('keypress', e => {
      if (this.keyCode == 13) {
        document.location.pathname = `/filter/${el.value}`;
      }
    });
  });
}

function currentPage() {
  let page = window.location.pathname;
  document.querySelectorAll(`.nav__link[href="${page}"]`).forEach(el => {
    el.classList.add('active');
  });
}