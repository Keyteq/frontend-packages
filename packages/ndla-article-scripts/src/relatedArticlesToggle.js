import BEMHelper from 'react-bem-helper';
import { forEachElement } from './domHelpers';

const classes = new BEMHelper({
  name: 'related-articles',
  prefix: 'c-',
});

export const toggleRelatedArticles = () => {
  const hiddenItem = classes('item--hidden').className;
  const shownItem = classes('item--shown').className;

  forEachElement('.c-related-articles', el => {
    const button = el.querySelector(`.${classes('button').className}`);

    if (button) {
      button.addEventListener(
        'click',
        e => {
          e.stopPropagation();
          if (button.innerHTML === button.getAttribute('data-showless')) {
            button.innerHTML = button.getAttribute('data-showmore');

            const hiddenArticles = el.querySelectorAll(`.${shownItem}`);
            for (let i = 0; i < hiddenArticles.length; i += 1) {
              hiddenArticles[i].classList.replace(shownItem, hiddenItem);
            }
          } else {
            button.innerHTML = button.getAttribute('data-showless');

            const hiddenArticles = el.querySelectorAll(`.${hiddenItem}`);
            for (let i = 0; i < hiddenArticles.length; i += 1) {
              hiddenArticles[i].classList.replace(hiddenItem, shownItem);
            }
          }
        },
        false,
      );
    }
  });
};
