import './styles/style.less';

const el = document.getElementById('scrollable');
const viewportOffset = el.getBoundingClientRect();

const startPosition = viewportOffset.top;
let lastScroll = document.body.scrollTop;
let wasScrollingDown = true;

let lockAbsolutePositioningDown = false;

let lockAbsolutePositioningUp = false;

function handleScroll() {
  const viewportOffset = el.getBoundingClientRect();
  const scrollBottom = document.body.scrollTop + window.innerHeight;

  const scrollingDown = lastScroll < document.body.scrollTop;

  if (scrollingDown) {
    // If bottom of the sidebar is below viewport make it absolute so it scrolls
    if ((viewportOffset.bottom >= window.innerHeight) && !lockAbsolutePositioningDown && !lockAbsolutePositioningUp) {
      el.style.position = 'absolute';
      el.style.top = document.body.scrollTop + 'px';
      el.style.bottom = 'auto';
      lockAbsolutePositioningDown = true;
    }
    // If bottom of the sidebar is in the viewport make it fixed
    if (viewportOffset.bottom <= window.innerHeight) {
      el.style.position = 'fixed';
      el.style.top = 'auto';
      el.style.bottom = 0;
      lockAbsolutePositioningDown = false;
    }
  } else {
    if ((viewportOffset.bottom <= window.innerHeight) && !lockAbsolutePositioningUp && !lockAbsolutePositioningDown) {
      console.log('should go up');
      el.style.position = 'absolute';
      el.style.top = (document.body.scrollTop + window.innerHeight - el.offsetHeight) + 'px';
      el.style.bottom = 'auto';
      lockAbsolutePositioningUp = true;
    }
    if (viewportOffset.top >= startPosition) {
      console.log(4);
      el.style.position = 'fixed';
      el.style.top = 'auto';
      lockAbsolutePositioningUp = false;
    }
  }

  lastScroll = document.body.scrollTop;
}

document.addEventListener('scroll', handleScroll);
