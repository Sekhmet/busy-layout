import './styles/style.less';

const el = document.getElementById('scrollable');

let startPosition = 0;
let lastScroll = document.body.scrollTop;

let top = document.body.scrollTop;

function handleScroll() {
  const windowHeight = document.body.clientHeight;
  const scrollTop = document.body.scrollTop;
  const scrollDiff = scrollTop - lastScroll;
  const scrollingDown = lastScroll < document.body.scrollTop;

  const viewportOffset = el.getBoundingClientRect();

  if (scrollingDown && (viewportOffset.bottom < windowHeight)) {
    top += scrollDiff;
  }

  if (!scrollingDown && viewportOffset.top >= startPosition) {
    top += scrollDiff;
  }

  el.style.top = top + 'px';

  if (startPosition === 0) {
    startPosition = el.getBoundingClientRect().top;
    console.log('startpos', startPosition);
  }

  lastScroll = scrollTop;
}

handleScroll();

document.addEventListener('scroll', handleScroll);
