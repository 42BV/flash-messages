import React from 'react';
import { useFlashMessages } from './hooks';
import { flashMessageService } from './service';
import { FlashMessage } from './models';

export const FlashMessagesContext = React.createContext<FlashMessage<any>[]>(flashMessageService.getFlashMessages());

export interface Props {
  children: React.ReactNode;
}

export function FlashMessagesProvider({ children }: Props) {
  const flashMessages= useFlashMessages();

  return (
    <FlashMessagesContext.Provider value={flashMessages}>
      {children}
    </FlashMessagesContext.Provider>
  );
}