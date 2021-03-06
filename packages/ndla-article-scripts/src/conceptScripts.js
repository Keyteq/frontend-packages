/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import jump from 'jump.js';

import { forEachElement, inIframe, getElementOffset } from './domHelpers';

export const addShowConceptDefinitionClickListeners = () => {
  forEachElement('.c-concept__item', item => {
    const id = item.getAttribute('id');
    const popup = document.querySelector(`[data-concept-id='${id}']`);
    const openBtn = item.querySelector('.c-concept__link');
    const closeBtn = popup.querySelector('.c-concept__close');

    openBtn.onclick = () => {
      const wasHidden = !popup.classList.contains('c-concept__popup--visible');

      forEachElement('.c-concept__popup--visible', visibleItem => {
        visibleItem.classList.remove('c-concept__popup--visible');
      });

      if (wasHidden) {
        popup.classList.add('c-concept__popup--visible');
        const parentOffset = getElementOffset(popup.offsetParent).top;
        const openBtnBottom =
          openBtn.getBoundingClientRect().bottom +
          window.pageYOffset -
          parentOffset;
        popup.style.top = `${openBtnBottom + 10}px`;
        const viewportHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        );
        const popupHeight = popup.offsetHeight;
        const popupTop = getElementOffset(popup).top;
        let offset = 0;

        const { body } = document;
        const html = document.documentElement;
        const documentHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        );

        if (popupTop + popupHeight < documentHeight) {
          offset = -((viewportHeight - popupHeight) / 2);
        } else {
          offset = popupHeight;
        }
        if (inIframe() && window.parent) {
          window.parent.postMessage(
            {
              event: 'scrollTo',
              // In an iframe viewport just returns the iframe height. So just offset the popup height
              top: popupTop - popupHeight,
            },
            '*',
          );
        } else {
          jump(popup, {
            duration: 300,
            offset,
          });
        }
      }
      popup.setAttribute('aria-hidden', !wasHidden);
    };

    closeBtn.onclick = () => {
      popup.classList.remove('c-concept__popup--visible');
      popup.setAttribute('aria-hidden', true);
    };
  });
};
