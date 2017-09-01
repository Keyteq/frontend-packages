/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'ndla-tabs';
import { getLicenseByAbbreviation } from 'ndla-licenses';

import {
  ToggleLicenseBox,
  LicenseByline,
  MediaList,
  MediaListItem,
  MediaListItemBody,
  MediaListItemActions,
  MediaListItemImage,
  MediaListItemMeta,
} from 'ndla-ui';
import { Document, Audio } from 'ndla-ui/icons';

const VideoContent = () =>
  <div>
    <div className="u-introduction">
      <h2>Slik bruker du videoer fra artikkelen</h2>
      <p>
        Husk å kopier teksten som skal
        legges ved videoen der du bruker den.
      </p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <iframe
            title="Youtube video"
            width="200"
            height="113"
            src="https://www.youtube.com/embed/f9VriNNRn0U?feature=oembed"
            frameBorder="0"
            allowFullScreen=""
          />
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          reuseLabel="Bruk bildet"
          title="Regler for bruk av videoen:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Bygg inn
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>;

const TextContent = () =>
  <div>
    <div className="u-introduction">
      <h2>Slik bruker du tekst fra artikkelen</h2>
      <p>
        Artikkelen kan være satt sammen av flere ulike tekster, som listes opp
        her.
      </p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <Document className="c-medialist__icon" />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-sa"
          title="Regler for bruk av teksten:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                  'Publiseringsdato: 12.05.13',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <Document className="c-medialist__icon" />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-sa"
          title="Regler for bruk av teksten:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                  'Publiseringsdato: 12.05.13',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>;

const AudioContent = () =>
  <div>
    <div className="u-introduction">
      <h2>Slik bruker du lydfiler</h2>
        <p>
          Husk å kopier teksten som skal legges ved lydfilen der du bruker den.
        </p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <Audio className="c-medialist__icon" />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-sa"
          title="Regler for bruk av lydfilen:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <Audio className="c-medialist__icon" />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-sa"
          title="Regler for bruk av lydfilen:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>;

const ImageContent = () =>
  <div>
    <div className="u-introduction">
      <h2>Slik bruker du bilder fra artikkelen</h2>
      <p className="article-introduction">
        Husk å kopier teksten som skal
        legges ved bildet der du bruker det.
      </p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <img
              width="260"
              alt="alt"
              src="https://images.unsplash.com/photo-1463432786691-8ec0615f2dfe?dpr=1&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="
            />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av bildet:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned bilde
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <img
              width="260"
              alt="alt"
              src="https://images.unsplash.com/photo-1463432786691-8ec0615f2dfe?dpr=1&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="
            />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av bildet:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned bilde
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <img
              width="260"
              alt="alt"
              src="https://images.unsplash.com/photo-1470138831303-3e77dd49163e?dpr=1&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="
            />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av bildet:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned bilde
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <img
              width="260"
              alt="alt"
              src="https://cdntest-c.ndla.no/sites/default/files/images/ku-collage_v2_3.fullbredde.jpg"
            />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av bildet:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned bilde
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Se del-elementer
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>;

const H5PContent = () =>
  <div>
    <div className="u-introduction">
      <h2>Slik bruker du H5P-innhold fra artikkelen</h2>
      <p>Klikk på «Se del-elementer» for å se lisens for hvert enkelt element.</p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <iframe
              title="H5P"
              src="http://ndla.no/nb/h5p/embed/146132?fag=127756"
              className="c-medialist__h5p"
              width="260"
              height="373"
              frameBorder="0"
              allowFullScreen="allowfullscreen"
            />
            <script
              src="http://ndla.no/sites/all/modules/h5p/library/js/h5p-resizer.js?fag=127756"
              charSet="UTF-8"
            />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av H5P-innholdet:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned bilde
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Bygg inn
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Se del-elementer
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <iframe
              title="H5P"
              src="http://ndla.no/nb/h5p/embed/146135?fag=127756"
              className="c-medialist__h5p"
              width="260"
              height="373"
              frameBorder="0"
              allowFullScreen="allowfullscreen"
            />
            <script
              src="http://ndla.no/sites/all/modules/h5p/library/js/h5p-resizer.js?fag=127756"
              charSet="UTF-8"
            />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av H5P-innholdet:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned bilde
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Bygg inn
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Se del-elementer
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>;

const Files = () =>
  <div>
    <div className="u-introduction">
      <h2>Slik bruker du filer fra artikkelen</h2>
      <p>Husk å kopier teksten som skal legges ved lydfilen der du bruker den.</p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <Document className="c-medialist__icon" />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av filen:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
      <MediaListItem>
        <MediaListItemImage>
          <a href="">
            <Document className="c-medialist__icon" />
          </a>
        </MediaListItemImage>
        <MediaListItemBody
          locale="nb"
          license="by-nc-nd"
          title="Regler for bruk av filen:">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  'Opphavsmann: Ola Nordmann',
                  'Rettighetshaver: Leverandør NTB scanpix',
                ]}
              />
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Kopier referanse
              </button>
              <button
                className="c-button c-button--outline c-licenseToggle__button"
                type="button">
                Last ned
              </button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>;

export const LicenseBox = () =>
  <div>
    <h1 className="license__heading">Slik gjenbruker du innhold</h1>

    <Tabs
      tabs={[
        { title: 'Bilder', content: <ImageContent /> },
        { title: 'Tekst', content: <TextContent /> },
        { title: 'Video', content: <VideoContent /> },
        { title: 'Lyd', content: <AudioContent /> },
        { title: 'H5P', content: <H5PContent /> },
        { title: 'Filer', content: <Files /> },
      ]}
    />
  </div>;

const LicenseExample = ({ showByline }) =>
  <ToggleLicenseBox
    openTitle="Bruk artikkel"
    closeTitle="Lukk boks"
    licenseBox={<LicenseBox />}>
    {showByline
      ? <LicenseByline license={getLicenseByAbbreviation('by-nc-nd')}>
          <span className="article_meta">
            Ola Nordmann, Leverandør NTB scanpix. Publisert: 10.10.2010.
          </span>
        </LicenseByline>
      : null}
  </ToggleLicenseBox>;

LicenseExample.propTypes = {
  showByline: PropTypes.bool,
};

export default LicenseExample;
