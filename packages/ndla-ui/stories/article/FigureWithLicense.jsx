/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 * FRI OG BEGRENSET
 */

import React, { Component, PropTypes } from 'react';
import {
  addCloseFigureDetailsClickListners,
  addShowFigureDetailsClickListners,
  makeFigureLicenseIconsClickable,
} from 'ndla-article-scripts';

import { Icon, Figure, FigureCaption, FigureDetails } from '../../src';


const caption = `I værmeldingene til NRK på 1980-tallet var symbolet for strålende
            solskinn en hvit sirkel. Ved skiftende vær var sirkelen delt i to
            med en hvit og en svart halvdel.`;
const authors = [
  { type: 'Opphavsmann', name: 'Gary Waters' },
  { type: 'Leverandør', name: 'Corbis' },
  { type: 'Leverandør', name: 'NTB scanpix' },
];

class FigureWithLicense extends Component {

  componentDidMount() {
    addShowFigureDetailsClickListners();
    addCloseFigureDetailsClickListners();
    makeFigureLicenseIconsClickable();
  }

  render() {
    return (
      <Figure>
        <div className="c-figure__img">
          {this.props.children}
        </div>
        <FigureDetails licenseAbbreviation="by-nc-nd" authors={authors}>
          <button className="c-button c-button--small c-button--transparent c-licenseToggle__button" type="button"><Icon.Copy /> Kopier referanse</button>
          <button className="c-button c-button--small c-button--transparent c-licenseToggle__button" type="button"><Icon.Link /> Gå til kilde</button>
          <button className="c-button c-licenseToggle__button" type="button"><Icon.OpenWindow /> Vis bilde</button>
        </FigureDetails>
        <FigureCaption caption={caption} reuseLabel="Gjenbruk" licenseAbbreviation="by-nc-nd" authors={authors} />
      </Figure>
    );
  }
}

FigureWithLicense.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FigureWithLicense;
