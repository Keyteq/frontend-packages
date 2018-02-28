import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  PageContainer,
  Content,
  constants,
  FeaturingMovieBanner,
} from 'ndla-ui';
import { breakpoints } from 'ndla-util';

import { FilmMasthead } from './molecules/mastheads';
import bannerUrl from './images/adjo-montebello.jpeg';

storiesOf('Film', module).add('Film forside', () => (
  <PageContainer background theme={constants.themes.FILM}>
    <FilmMasthead />
    <FeaturingMovieBanner
      images={[
        {
          url: bannerUrl,
          types: Object.keys(breakpoints).map(key => breakpoints[key]),
        },
      ]}
    />
    <Content />
  </PageContainer>
));
