import React from 'react';
import { render, cleanup, wait, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FlashMessagesProvider, FlashMessagesContext } from '../src/provider';
import { FlashMessage } from '../src/models';
import { addInfo } from '../src/actions';

function Component() {
  return (
    <FlashMessagesContext.Consumer>
      {(flashMessages: FlashMessage<any>[]) => {
        return (
          <ul>
            {flashMessages.map(flashMessage => (
              <li data-testid="message" key={flashMessage.id}>
                {flashMessage.text}
              </li>
            ))}
          </ul>
        );
      }}
    </FlashMessagesContext.Consumer>
  );
}

afterEach(cleanup);

describe('FlashMessagesProvider', () => {
  test('that flashMessages are provided', async () => {
    const { getByTestId } = render(
      <FlashMessagesProvider>
        <Component />
      </FlashMessagesProvider>,
    );

    act(() => {
      addInfo({ text: 'info' });
    });

    await wait(() => {
      expect(getByTestId('message')).toHaveTextContent('info');
    });
  });
});
