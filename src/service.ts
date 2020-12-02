import { FlashMessage, FlashMessageRemovedReason } from './models';

export type Subscriber = (flashMessages: FlashMessage<unknown>[]) => void;

export type FlashMessageService = {
  addFlashMessage(flashMessage: FlashMessage<unknown>): void;
  removeFlashMessage(
    flashMessage: FlashMessage<unknown>,
    reason: FlashMessageRemovedReason
  ): void;
  clearFlashMessages(): void;
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  getFlashMessages: () => FlashMessage<unknown>[];
};

export function makeFlashMessageService(): FlashMessageService {
  let flashMessages: FlashMessage<unknown>[] = [];

  let subscribers: Subscriber[] = [];

  return {
    addFlashMessage,
    removeFlashMessage,
    clearFlashMessages,
    getFlashMessages,
    subscribe,
    unsubscribe
  };

  function addFlashMessage(flashMessage: FlashMessage<unknown>) {
    flashMessages.push(flashMessage);

    informSubscribers();
  }

  function removeFlashMessage(
    flashMessage: FlashMessage<unknown>,
    reason: FlashMessageRemovedReason
  ) {
    const remainingFlashMessages: FlashMessage<unknown>[] = [];

    flashMessages.forEach((f) => {
      if (f !== flashMessage) {
        remainingFlashMessages.push(f);
      } else {
        f.onRemove(reason);
      }
    });

    flashMessages = remainingFlashMessages;

    informSubscribers();
  }

  function clearFlashMessages() {
    flashMessages = [];

    informSubscribers();
  }

  function getFlashMessages() {
    return flashMessages;
  }

  function subscribe(subscriber: Subscriber): void {
    subscribers.push(subscriber);

    subscriber(flashMessages);
  }

  function unsubscribe(subscriber: Subscriber): void {
    subscribers = subscribers.filter((s) => s !== subscriber);
  }

  function informSubscribers() {
    subscribers.forEach((subscriber) => subscriber([...flashMessages]));
  }
}

export const flashMessageService = makeFlashMessageService();
