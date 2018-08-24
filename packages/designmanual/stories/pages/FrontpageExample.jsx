import React, { Fragment } from 'react';

import {
  FrontpageHeader,
  FrontpageSubjects,
  FrontpageHighlighted,
  ContentCard,
  OneColumn,
  FrontpageInfo,
  FrontpageSearchSection,
  FrontpageFilm,
  InfoWidget,
} from 'ndla-ui';
import { breakpoints } from 'ndla-util';

import { EmailOutline, Facebook, Twitter } from 'ndla-icons/common';

import { contentCards, subjectsFrontpage } from '../../dummydata/index';
import NdlaFilmIllustration from '../../images/film_illustrasjon.png';

const FrontpageExample = () => (
  <Fragment>
    <FrontpageHeader
      heading="Nasjonal digital læringsarena"
      searchFieldValue=""
      logoTo="#"
      onSearchFieldChange={() => {}}
      onSearch={() => {}}
      searchFieldPlaceholder="Søk etter f.eks emner, lærestoff, nøkkelord …"
      menuSubject={<FrontpageSubjects subjects={subjectsFrontpage} />}
      messages={{
        searchFieldTitle: 'Søk',
        menuButton: 'Meny',
      }}
      links={[
        {
          to: '#1',
          text: 'Om NDLA',
        },
        {
          to: '#2',
          text: 'Åpne digitale læremidler for videregående opplæring',
        },
        {
          to: '#3',
          text: 'Change language',
        },
      ]}
    />
    <main>
      <FrontpageSubjects subjects={subjectsFrontpage} />
      <OneColumn>
        <FrontpageSearchSection
          heading="Søk"
          searchFieldValue=""
          onSearch={() => {}}
          onSearchFieldChange={() => {}}
        />
        <FrontpageHighlighted heading="Aktuelt">
          {contentCards.slice(0, 4).map(card => (
            <div key={`slide-${card.id}`}>
              <ContentCard
                url={card.linkTo}
                heading={card.title}
                description={card.text}
                isFilm={card.isFilm}
                type={card.type}
                images={[
                  {
                    url: card.image,
                    types: Object.keys(breakpoints),
                  },
                ]}
              />
            </div>
          ))}
        </FrontpageHighlighted>
        <FrontpageFilm
          imageUrl={NdlaFilmIllustration}
          url="https://ndla.no/nb/film"
          messages={{
            header: 'NDLA film',
            linkLabel: 'Gå til NDLA film',
            text:
              'NDLA film er en tjeneste i samarbeid med Norgesfilm. Denne tjenesten lar deg se en rekke spillefilmer, kortfilmer, dokumentarer og serier. Du kan også se undervisningsfilm og filmklipp. Velkommen inn i filmens verden!',
          }}
        />
        <FrontpageInfo>
          <InfoWidget
            heading="Nyhetsbrev"
            description="Få tilgang til det som er nytt for undervisningen og aktuelt for tidspunktet"
            mainLink={{
              name: 'Meld deg på',
              url: '#1',
            }}
            iconLinks={[
              {
                name: 'Nyhetsbrev',
                icon: <EmailOutline />,
              },
            ]}
          />
          <InfoWidget
            heading="Følg oss"
            description="Ndla har mange Facebook og Twitter kontoer. Finn den som passer for deg og følg oss!"
            mainLink={{
              name: 'Følg oss',
              url: '#2',
            }}
            iconLinks={[
              {
                name: 'Facebook',
                url: '#3',
                icon: <Facebook />,
              },
              {
                name: 'Twitter',
                url: '#4',
                icon: <Twitter />,
              },
            ]}
          />
          <InfoWidget
            heading="Om NDLA"
            description="NDLAs visjon er å lage gode, åpne digitale læremidler for alle fag i videregående opplæring og støtte opp om elever og lærere i aktivt og deltakende læringsarbeid."
            mainLink={{
              name: 'Mer om Ndla',
              url: '#5',
            }}
          />
        </FrontpageInfo>
      </OneColumn>
    </main>
  </Fragment>
);

export default FrontpageExample;
