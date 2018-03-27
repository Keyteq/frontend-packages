/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Time, User } from 'ndla-icons/common';
import {
  Concept, ConceptDialogContent, ConceptDialogText, ConceptDialogImage,
  OneColumn, LayoutItem, Image, ToggleLicenseBox } from 'ndla-ui';
import Tabs from 'ndla-tabs';
import { addShowConceptDefinitionClickListeners } from 'ndla-article-scripts';

import LicenseExample from '../article/LicenseExample';
import FigureWithLicense from '../article/FigureWithLicense';

const ConceptContent = ({
  content
}) =>
  <ConceptDialogContent>
    { content.text ?
      <ConceptDialogText small>{ content.text }</ConceptDialogText> : null }
    { content.image ?
      <ConceptDialogImage src={content.image.url} alt={content.image.altText} small /> : null}
  </ConceptDialogContent>

ConceptContent.propTypes = {
  content: PropTypes.shape(),
}

const ConceptDialog = ({
  content
}) => {
  let contentElements = null;
  if (content.tabs) {
    const tabContent = content.tabs.map((tab) => (
      {
        title: tab.title,
        content: <ConceptContent content={tab.content} />
      }))

    contentElements = (<Tabs tabs={tabContent} />)
  } else {
    contentElements = (
      <ConceptContent content={content} />
    )
  }
  return (
    <div>
      { contentElements }
    </div>
  )
}

ConceptDialog.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ])
}

const LicenseBox = () =>
  <ToggleLicenseBox
    openTitle="Bruk innhold"
    closeTitle="Lukk boks"
    expanded={false}>
    <p>Lisenseboks innhold</p>
  </ToggleLicenseBox>

class ConceptExample extends Component {
  componentDidMount() {
    addShowConceptDefinitionClickListeners();
  }

  render() {
    const socialisingContent = {
      text: "Sosialisering, betegnelse for de sosiale prosessene som fører til at individer tar opp i seg, eller internaliserer, samfunnets normer og atferdsmønstre med andre ord at de blir som de andre i samfunnet.",
      image: "",
    }
    const sanctionContent = {
      tabs: [
        {
          title: 'Begrep',
          content: {
            image: {
              url: 'https://studieweb.no/wp-content/uploads/2014/08/sanksjon.jpg',
              altText: '',
            },
            text: 'Sanksjon, en negativ eller positiv reaksjon på noens atferd. I dagligtalen er det vanlig å oppfatte sanksjoner først og fremst som negative reaksjoner rettet mot uønsket atferd eller avvik. Et eksempel er foreldrene som nekter ungen lørdagsgodteri (sanksjon) fordi han eller hun ikke spiser opp grønnsakene sine (uønsket atferd).',
          }
        },
        {
          title: 'Ordliste',
          content: {
            text: 'Ordliste goes here',
          },
        }
      ],
    }
    const socialisingDialog = <ConceptDialog content={socialisingContent} />
    const sanctionDialog = <ConceptDialog content={sanctionContent} />
    return (
      <OneColumn cssModifier="narrow">
        <article className="c-article c-article--clean">
          <LayoutItem layout="center">
            <h1 className="c-article__title">Sosialisering</h1>
            <p className="article_introduction">
              Vi blir født inn i et samfunn. På den ene siden kommer vi til en
              familie bestående av nære relasjoner. På den andre siden blir de
              fleste av oss født på en institusjon, et sykehus.
            </p>
            <div className="c-article-byline">
              <span className="c-article-byline__authors">
                <User /> Gro-Anita Mortensen.
              </span>{' '}
              <span className="c-article-byline__date">
                <Time /> Sist oppdatert 03.03.2017
              </span>
              <LicenseExample />
            </div>
          </LayoutItem>
          <LayoutItem layout="center">
            <section>
              <div>
                <p>
                  Gjennom{' '}
                  <Concept
                    content={ socialisingDialog }
                    authors={['Gary Waters']}
                    source="snl.no"
                    title="Sosialisering"
                    messages={{
                      ariaLabel: 'Vis begrep beskrivelse',
                      close: 'Lukk',
                    }}
                    license="by-nc-nd"
                    licenseBox={<LicenseBox />}
                    id={1}>
                    sosialisering
                  </Concept>{' '}
                  lærer menneskene å fungere i et samfunn og får kjennskap til
                  de regler og verdier som det forventes at man skal følge.
                  Sosialisering er dermed den prosessen som gjør at vi tar til
                  oss dette, fra vi blir født til vi dør.
                </p>
                <p>
                  Barn møtes med forventninger til hvordan de skal oppføre seg.
                  Disse forventningene gjentar seg, og slik lærer barnet hvilke
                  regler eller normer som gjelder. Hovedmålet med
                  sosialiseringen er at de enkelte menneskene skal kunne skille
                  mellom godt og ondt, og rett og galt.
                </p>
                <FigureWithLicense type="right" caption="" runScripts>
                  <Image
                    alt="liten jente holder sine foreldres hender. foto."
                    src="https://staging.api.ndla.no/image-api/raw/jente%2520mellom%2520foreldre_0.jpg"
                  />
                </FigureWithLicense>
                <h2>Normer og normsendere</h2>
                <p>
                  Normer er regler som forteller hvordan man skal oppføre seg og
                  handle i en gitt situasjon. normer kan være formelle eller
                  uformelle. Lover er formaliserte eller formelle normer. de
                  uformelle normene er uskrevne regler for skikk og bruk, som
                  hvordan man skal oppføre seg i ulike situasjoner. det kan være
                  forventninger om at du skal håndhilse når du kommer inn til et
                  jobbintervju, eller at det er uhøflig å svare på
                  telefonsamtaler mens intervjuet pågår.
                </p>
                <p>
                  For å forsterke innlæringen av normer følges de opp av
                  reaksjoner eller sanksjoner.{' '}
                  <Concept
                    content={ sanctionDialog }
                    authors={[]}
                    title="sanksjon"
                    messages={{
                      ariaLabel: 'Vis begrep beskrivelse',
                      close: 'Lukk',
                    }}
                    linkTo={{ href: "#", label: "Les artikkel om Sanksjon"}}
                    tags={['Test tag', 'Tag 2']}
                    license="by-nc-nd"
                    id={2}>
                    Sanksjonene
                  </Concept>{' '}
                  kan både være positive og negative. Ønsket adferd belønnes,
                  men uønsket adferd straffes. Når en person har gjort{' '}
                  <Concept
                    content="Norm, særskilt sosiale normer, er en sosiologisk betegnelse for intersubjektive, allment delte og ofte underforståtte regler og forventninger på oppførsel som gjelder for et mindre sosialt fellesskap og for samfunnet i sin helhet."
                    authors={[]}
                    title="Norm"
                    messages={{
                      ariaLabel: 'Vis begrep beskrivelse',
                      close: 'Lukk',
                    }}
                    license="by-nc-nd"
                    id={3}>
                    normene
                  </Concept>{' '}
                  til sine egne og følger dem, sier man at normene er
                  internalisert.
                </p>
                <p>
                  Alle man møter, er normsendere. I første omgang er det
                  foreldre, søsken og nær familie. Også venner og lekekamerater
                  er normsendere. Dette kalles primærsosialisering. Barn har
                  også normsendere utenfor de nære relasjonene. I barnehagen
                  møter de voksne som er tydelige rollemodeller, og som har en
                  klar oppgave i forhold til mer formell sosialisering. Det
                  kalles sekundærsosialisering og blir fulgt opp av andre
                  formelle utdanningsinstitusjoner, som skolen. Barn møter
                  uformell sosialisering når de ser på TV eller spiller
                  dataspill.
                </p>
                <h2>Normforvirring</h2>
                <p>
                  De signalene andre mennesker sender ut, kan for et individ
                  oppleves som forvirrende og i mange tilfeller også
                  motstridende. Det kalles normforvirring. Denne
                  normforvirringen er en naturlig del av
                  sosialiseringsprosessen, og noe vi må lære oss å forholde oss
                  til. En vanlig konflikt er at venner ønsker at du skal spille
                  internettspill eller bli med på kino, mens foreldrene ber deg
                  skru av PC-en for å gjøre husarbeid og lekser.
                </p>

                <p>
                  Selv om informasjonen om narkotika er entydig, fordi det er
                  forbudt gjennom norsk lov, kan enkeltpersoner bli utfordret
                  også på disse normene. I noen miljøer er det akseptert å bruke
                  narkotika, og de skadelige sidene av bruken bagatelliseres. I
                  slike situasjoner kan internaliserte normer hjelpe oss til å
                  føle oss trygge fordi vi har tatt stilling til spørsmålet på
                  forhånd. Det bidrar til at mange føler at de vet hva som er
                  riktige valg, og de føler seg trygge når de blir utfordret.
                </p>

                <p>
                  Motstridende signaler fra normsendere, som følges opp av
                  sanksjoner som enten er vilkårlige, eller som føles
                  urettferdige, skaper utrygghet. I verste fall kan utydelige
                  normer og uregelmessig belønning medføre psykiske lidelser
                  fordi de gjør personen utrygg og{' '}
                  <Concept
                    content="De signalene andre mennesker sender ut, kan for et individ oppleves som forvirrende og i mange tilfeller også motstridende. Det kalles normforvirring. Denne normforvirringen er en naturlig del av sosialiseringsprosessen, og noe vi må lære oss å forholde oss til. En vanlig konflikt er at venner ønsker at du skal spille internettspill eller bli med på kino, mens foreldrene ber deg skru av PC-en for å gjøre husarbeid og lekser."
                    authors={[]}
                    title="usikker"
                    messages={{
                      ariaLabel: 'Vis begrep beskrivelse',
                      close: 'Lukk',
                    }}
                    license="by-nc-nd"
                    id={4}>
                    usikker
                  </Concept>.
                </p>
              </div>
            </section>
          </LayoutItem>
        </article>
      </OneColumn>
    );
  }
}

export default ConceptExample;
