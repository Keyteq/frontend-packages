import React from 'react';
import PropTypes from 'prop-types';

import { CompentenceGoalsDialog, CompentenceGoals } from 'ndla-ui';

const CompentenceGoalsExample = ({ headingId, menu }) => {
  const topics = [
    {
      heading: 'Emne',
      items: [
        {
          text:
            'Planlegge, produsere og presentere tekst, lyd, stillbilder, levende bilder og kombinasjoner av disse i aktuelle formater og standarder til trykte og elektroniske medier',
          url: '#1',
        },
        {
          text:
            'bruke relevante metoder for kvalitetssikring av egen arbeidsprosess og eget produkt',
          url: '#2',
        },
        {
          text:
            'bruke tidsmessig verktøy, programvare og annet teknisk utstyr på en forsvarlig måte',
          url: '#3',
        },
      ],
    },
  ];

  let filterOptions = null;
  let filterValues = null;

  if (menu) {
    topics.push({
      heading: 'Emne 2',
      items: [
        {
          text: 'Lorum ipsum',
        },
        {
          text: 'Lorum ipsum 2',
        },
      ],
    });

    filterOptions = [
      {
        title: 'Medieuttrykk',
        value: 'Medieuttrykk',
      },
      {
        title: 'Mediesamfunnet',
        value: 'Mediesamfunnet',
      },
      {
        title: 'VG1',
        value: 'VG1',
      },
      {
        title: 'VG1',
        value: 'VG2',
      },
      {
        title: 'VG1',
        value: 'VG3',
      },
    ];

    filterValues = ['Medieuttrykk'];
  }

  return (
    <CompentenceGoals
      menu={menu}
      subjectName={menu ? 'Fag' : null}
      id={menu ? 'compentence-goals-menu' : 'compentence-goals'}
      headingId={headingId}
      filterOptions={filterOptions}
      filterValues={filterValues}
      description="Læreplan i medieuttrykk - felles programfag i utdanningsprogram for medier og kommunikasjon"
      messages={{
        heading: 'Kompetansemål og læreplan',
        listDescription: 'Mål for opplæring er at elevene skal kunne:',
      }}
      topics={topics}
    />
  );
};

CompentenceGoalsExample.propTypes = {
  headingId: PropTypes.string,
  menu: PropTypes.bool,
};

export default CompentenceGoalsExample;

export const CompentenceGoalsDialogExample = ({ narrow, wide }) => (
  <CompentenceGoalsDialog
    narrow={narrow}
    wide={wide}
    id="compentence-goals-dialog"
    messages={{
      buttonText: 'Kompetansemål',
      closeButtonText: 'Lukk',
    }}>
    {headingId => <CompentenceGoalsExample headingId={headingId} />}
  </CompentenceGoalsDialog>
);

CompentenceGoalsDialogExample.propTypes = {
  narrow: PropTypes.bool,
  wide: PropTypes.bool,
};
