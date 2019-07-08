import { useEffect, useState } from 'react';

import { flashMessageService } from './service';
import { FlashMessage } from './models';

/**
 * Returns the flashMessages.
 */
export function useFlashMessages(): FlashMessage<any>[] {
  const [state, setState] = useState<FlashMessage<any>[]>(flashMessageService.getFlashMessages());

  useEffect(() => {
    const subscriber = (nextState: FlashMessage<any>[]) => {
      setState(nextState);
    };

    flashMessageService.subscribe(subscriber);

    return () => {
      flashMessageService.unsubscribe(subscriber);
    };
  }, []);

  return state;
}
