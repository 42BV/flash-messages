import { useEffect, useState } from 'react';

import { flashMessageService } from './service';
import { FlashMessage } from './models';

/**
 * Provides the active flash messages which are currently in the
 * flash message store.
 */
export function useFlashMessages(): FlashMessage<unknown>[] {
  const [state, setState] = useState<FlashMessage<unknown>[]>(
    flashMessageService.getFlashMessages()
  );

  useEffect(() => {
    const subscriber = (nextState: FlashMessage<unknown>[]) => {
      setState(nextState);
    };

    flashMessageService.subscribe(subscriber);

    return () => {
      flashMessageService.unsubscribe(subscriber);
    };
  }, []);

  return state;
}
