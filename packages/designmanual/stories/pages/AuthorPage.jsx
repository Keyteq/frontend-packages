/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

import {
  OneColumn,
  LayoutItem,
  ArticleWrapper,
  AuthorInfo,
  Button,
} from 'ndla-ui';

export default () => (
  <OneColumn>
    <ArticleWrapper>
      <LayoutItem layout="center">
        <AuthorInfo
          authorName="Cecilie Isaksen Eftedal"
          authorRole="Stilling / rolle"
          image="https://placehold.it/300x300"
          email="cecilie@ndla.no"
          phone="+47 123 45 678"
        />
      </LayoutItem>
      <LayoutItem layout="center">
        <p>
          Du har en kjempegod idé til en kortfilm. Men det koster mange penger å
          produsere filmen. Derfor er du avhengig av at noen tenner på idéen din
          og bestemmer seg for å bruke ressurser på nettopp dette prosjektet.
        </p>
        <p>
          En pitch er en kortvarig framføring av en idé for en potensiell
          samarbeidspartner eller kunde. I løpet av noen få minutter skal du få
          andre til å <a href="#test">tenne på idéen din og se potensialet</a> i
          den.
        </p>
        <p>
          En pitch er en kortvarig framføring av en idé for en potensiell
          samarbeidspartner eller kunde. I løpet av noen få minutter skal du få
          andre til å tenne på idéen din og se potensialet i den.
        </p>
        <p>
          Pitching er også en god måte å bevisstgjøre seg selv på. Når du
          pitcher, blir idéen og historien i den filmen du planlegger å lage,
          tydeligere for både deg selv og dem du eventuelt jobber sammen med i
          klassen.
        </p>
        <p>
          Pitching er også en god måte å bevisstgjøre seg selv på. Når du
          pitcher, blir idéen og historien i den filmen du planlegger å lage,
          tydeligere for både deg selv og dem du eventuelt jobber sammen med i
          klassen.
        </p>
      </LayoutItem>
      <LayoutItem layout="center">
        <Button outline className="c-author-info__readmore">Se hva Cecilie har bidratt med</Button>
      </LayoutItem>
    </ArticleWrapper>
  </OneColumn>
);
