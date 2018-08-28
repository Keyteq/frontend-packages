export const isIosDevice =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.platform &&
  /iPad|iPhone|iPod|(iPad Simulator)|(iPhone Simulator)|(iPod Simulator)/.test(
    window.navigator.platform,
  );

const getBodyScrollTop = () => {
  const el = document.scrollingElement || document.documentElement;
  return el.scrollTop;
};

const setBodyScrollTop = top => {
  const el = document.scrollingElement || document.documentElement;
  el.scrollTop = top;
};

let currentScrollPosition;

const scrollTargets = [];

const noScroll = (enable, uuid) => {
  const htmlElement = document.querySelector('html');
  if (enable) {
    if (!scrollTargets.includes(uuid)) {
      scrollTargets.push(uuid);
      currentScrollPosition = getBodyScrollTop();
      htmlElement.style.overflow = 'hidden';
      htmlElement.style.position = isIosDevice ? 'fixed' : 'static'; // iOS scrolling fix
      htmlElement.style.left = 0;
      htmlElement.style.right = 0;
      if (isIosDevice) {
        htmlElement.classList.add('scrollFixIOS');
      }
    }
  } else {
    if (scrollTargets.indexOf(uuid) !== -1) {
      scrollTargets.splice(scrollTargets.indexOf(uuid), 1);
    }
    if (scrollTargets.length === 0) {
      htmlElement.style.overflow = null;
      htmlElement.style.position = 'static';
      htmlElement.style.left = 'auto';
      htmlElement.style.right = 'auto';
      if (isIosDevice) {
        htmlElement.classList.remove('scrollFixIOS');
        setBodyScrollTop(currentScrollPosition);
      }
    }
  }
};

export default noScroll;
