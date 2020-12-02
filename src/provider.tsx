import React from 'react';
import { useFlashMessages } from './hooks';
import { flashMessageService } from './service';
import { FlashMessage } from './models';

export const FlashMessagesContext = React.createContext<
  FlashMessage<unknown>[]
>(flashMessageService.getFlashMessages());

export type Props = {
  children: React.ReactNode;
};

export function FlashMessagesProvider({ children }: Props): JSX.Element {
  const flashMessages = useFlashMessages();

  return (
    <FlashMessagesContext.Provider value={flashMessages}>
      {children}
    </FlashMessagesContext.Provider>
  );
}
