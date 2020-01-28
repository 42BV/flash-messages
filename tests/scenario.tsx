import React from 'react';
import { render, cleanup, wait, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useFlashMessages } from '../src/hooks';
import { addInfo } from '../src/actions';
import { flashMessageService } from '../src/service';
import { FlashMessage } from '../src/models';

afterEach(cleanup);

describe('Scenario', () => {
  function Component() {
    const flashMessages = useFlashMessages();

    return (
      <ul>
        {flashMessages.map(({id, text, onClick}) => (
          <li data-testid="message" key={id} onClick={onClick}>
            {text}
          </li>
        ))}
      </ul>
    );
  }

  test('a basic complete scenario which shows flash messages which remove when clicked', async () => {
    const { getByTestId, queryByTestId } = render(<Component />);

    const onClick = (flashMessage: FlashMessage<any>) => {
      flashMessageService.removeFlashMessage(flashMessage);
    };

    act(() => {
      addInfo({ text: 'info', onClick });
    });

    await wait(() => {
      expect(getByTestId('message')).toHaveTextContent('info');
    });

    fireEvent.click(getByTestId('message'));

    await wait(() => {
      expect(queryByTestId('message')).toBe(null);
    });
  });
});
