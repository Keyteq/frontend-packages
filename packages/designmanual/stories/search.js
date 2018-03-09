import React from 'react';
import { storiesOf } from '@storybook/react';

import { PageContainer, Content, OneColumn } from 'ndla-ui';

import { MastheadWithTopicMenu } from './molecules/mastheads';
import FooterExample from './molecules/footers';
import SearchPageExample from './pages/SearchPageExample';

storiesOf('Søk', module)
  .add('Søkefelt', () => (
    <PageContainer>
      <Content>
        <MastheadWithTopicMenu searchFieldExpanded />
      </Content>
    </PageContainer>
  ))
  .add('Søkeside', () => (
    <PageContainer background>
      <Content>
        <MastheadWithTopicMenu hideOnNarrowScreen hideSearchButton />
        <OneColumn cssModifier="clear-desktop" wide>
          <SearchPageExample />
        </OneColumn>
      </Content>
      <FooterExample />
    </PageContainer>
  ));
