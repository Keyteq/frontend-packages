import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  PageContainer,
  constants,
  FeaturingMovieBanner,
  Main,
  MovieSearch,
} from 'ndla-ui';
import { breakpoints } from 'ndla-util';

import { FilmMasthead } from './molecules/mastheads';
import bannerUrl from './images/adjo-montebello.jpeg';

storiesOf('Film', module).add('Film forside', () => (
  <PageContainer background theme={constants.themes.FILM}>
    <FilmMasthead />
    <Main>
      <FeaturingMovieBanner
        heading="Adjø Montebello"
        description="En kunstnerisk ambisiøs musikkfilm som blander sanger, skråblikk og samfunnskritikk i en original miks av fiksjon og konsertfilm."
        url="#1"
        images={[
          {
            url: bannerUrl,
            types: Object.keys(breakpoints).map(key => breakpoints[key]),
          },
        ]}
      />
      <MovieSearch
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Her kan du søke etter filmer, regissører, fag eller emner"
        messages={{
          searchFieldTitle: 'Søk',
        }}
      />
    </Main>
  </PageContainer>
));
