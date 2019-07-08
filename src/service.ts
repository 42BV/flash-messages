import { FlashMessage } from './models';

export type Subscriber = (flashMessages: FlashMessage<any>[]) => void;

export interface FlashMessageService {
  addFlashMessage(flashMessage: FlashMessage<any>): void;
  removeFlashMessage(flashMessage: FlashMessage<any>): void;
  clearFlashMessages(): void;
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  getFlashMessages: () => FlashMessage<any>[];
}

export function makeFlashMessageService(): FlashMessageService {
  let flashMessages: FlashMessage<any>[] = [];

  let subscribers: Subscriber[] = [];

  return {
    addFlashMessage,
    removeFlashMessage,
    clearFlashMessages,
    getFlashMessages,
    subscribe,
    unsubscribe,
  };

  function addFlashMessage(flashMessage: FlashMessage<any>) {
    flashMessages.push(flashMessage);

    informSubscribers();
  }

  function removeFlashMessage(flashMessage: FlashMessage<any>) {
    flashMessages = flashMessages.filter(f => f !== flashMessage);

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
    subscribers = subscribers.filter(s => s !== subscriber);
  }

  function informSubscribers() {
    subscribers.forEach(subscriber => subscriber([...flashMessages]));
  }
}

export const flashMessageService = makeFlashMessageService();
