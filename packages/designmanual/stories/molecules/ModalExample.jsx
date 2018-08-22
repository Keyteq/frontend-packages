import React, { Fragment } from 'react';

import { Modal, ModalHeader, ModalBody, ModalCloseButton, Styleguide, Button, Tooltip } from 'ndla-ui';
import { HelpCircle } from 'ndla-icons/common';

const ModalExample = () => (
  <Styleguide
    reactCode={`
      <Modal
        activateButton={<Button>Open modal</Button>}
      >
        {(onClose) => (
          <ModalHeader>
            <ModalCloseButton onClick={onClose}>
          </ModalHeader>
          <ModalBody>
            <h1>Simple modal example</h1>
            <p>Using standard props and modal wrapper for content.</p>
          </ModalBody>
        )}
      </Tooltip>
    `}
    usesPropTypes={[
      {
        name: 'children',
        type: 'Node',
        default: 'Required',
        description: '',
      },
      {
        name: 'align',
        type: 'String',
        default: 'top',
        description: `PropTypes.oneOf(['left', 'right', 'top', 'bottom'])`,
      },
      {
        name: 'delay',
        type: 'Number',
        default: 0,
        description: 'Tooltip er ikke tilgjengelig før X ms',
      },
    ]}
    status={2}
    messages="Sjekk Aria før lansering!">
    <p>
      Modal som håndterer åpne/lukke states og håndterer automatisk lås av pagescroll, scroll på content, focus-trap samt ESC-exit.
      Krever at minst ett child-element er focusable. Animasjon inn/ut, størrelser og bakgrunn kan enkelt endres ved behov.
      Tar også onOpen og onClose som functions via props.
    </p>
    <h3>Enkel versjon:</h3>
    <Modal activateButton={<Button>Åpne modal</Button>}>
      {onClose => (
        <Fragment>
          <ModalHeader>
            <ModalCloseButton title="lukk" onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <h1>Hva ønsker du å gjøre?</h1>
            <p>Lukk denne modal eller åpne en ny modal</p>
              <Button
                onClick={() => {
                  /* eslint no-alert: 0 */
                  /* eslint no-restricted-globals: 0 */
                  const confirmed = confirm('sikker på dette?');
                  if (confirmed) {
                    onClose();
                  }
                }}
              >Lukk Modal</Button>
              <Modal activateButton={<Button>Åpne modal</Button>}>
                {onClose2 => (
                  <Fragment>
                    <ModalHeader>
                      <ModalCloseButton title="lukk" onClick={onClose2} />
                    </ModalHeader>
                    <ModalBody>
                      <h1>En modal over modal!</h1>
                      <p>All logikk håndteres automagisk! Trykk lukk, trykk utenfor modal eller lukk med ESCAPE-knappen</p>
                    </ModalBody>
                  </Fragment>
                )}
              </Modal>
          </ModalBody>
        </Fragment>
      )}
    </Modal>
    <h3>Eksempel med wrapper</h3>
    <p>
      Noen ganger må vi wrappe modalen ved behov igjennom prop funksjonen wrapperFunctionForButton.
      Nyttig når man skal ha Modal på en komponent som feks {`<Tooltip />`}
    </p>
      <Modal
        wrapperFunctionForButton={activateButton => (
          <Tooltip tooltip="Trykk på meg!">
            {activateButton}
          </Tooltip>
        )}
        activateButton={
          <Button stripped tabIndex={-1}><HelpCircle /></Button>
        }>
        {onClose => (
          <Fragment>
            <ModalHeader>
              <ModalCloseButton title="lukk" onClick={onClose} />
            </ModalHeader>
            <ModalBody>
              <h1>
                Nice Modal!
              </h1>
              <p>
                Well done
              </p>
            </ModalBody>
          </Fragment>
        )}
      </Modal>
  </Styleguide>
);

export default ModalExample;
