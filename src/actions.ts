import { flashMessageService } from './service';

import { FlashMessage, FlashMessageConfig, FlashMessageCreatorConfig } from './models';

let nextFlashMessageId = 1;

// This function does not do anything.
const noop: VoidFunction = (): void => {};

/**
 * Adds a FlashMessage to the store and removes it after the
 * duration, if the duration is not false.
 *
 * @param flashMessage The flashMessage you want to add.
 */
export function addFlashMessage<Data>(flashMessageCreatorConfig: FlashMessageConfig<Data>): FlashMessage<Data> {
  const flashMessage = addIdAndOnClick(flashMessageCreatorConfig);

  flashMessageService.addFlashMessage(flashMessage);

  const duration = flashMessage.duration;

  if (duration !== false) {
    setTimeout(() => {
      flashMessageService.removeFlashMessage(flashMessage);
    }, duration);
  }

  return flashMessage;
}

export function removeFlashMessage<Data>(flashMessage: FlashMessage<Data>): void {
  flashMessageService.removeFlashMessage(flashMessage);
}

/**
 * Adds a flash message of the type 'ERROR' on the flash message queue.
 *
 * @param {FlashMessageCreatorConfig} { text, onClick, data }
 */
export function addError<Data>({ text, onClick, data }: FlashMessageCreatorConfig<Data>): FlashMessage<Data> {
  return addFlashMessage({ type: 'ERROR', duration: 10000, text, onClick, data });
}

/**
 * Adds a flash message of the type 'WARNING' on the flash message queue. 
 * After 7000 milliseconds it will automatically be removed
 * from the queue.
 *
 * @param {FlashMessageCreatorConfig} { text, onClick, data }
 */
export function addWarning<Data>({ text, onClick, data }: FlashMessageCreatorConfig<Data>): FlashMessage<Data> {
  return addFlashMessage({ type: 'WARNING', duration: 7000, text, onClick, data });
}

/**
 * Adds a flash message of the type 'SUCCESS' on the flash message queue. 
 * After 2000 milliseconds it will automatically be removed
 * from the queue.
 *
 * @param {FlashMessageCreatorConfig} { text, onClick, data }
 */
export function addSuccess<Data>({ text, onClick, data }: FlashMessageCreatorConfig<Data>): FlashMessage<Data> {
  return addFlashMessage({ type: 'SUCCESS', duration: 2000, text, onClick, data });
}

/**
 * Adds a flash message of the type 'INFO' on the flash message queue. 
 * After 5000 milliseconds it will automatically be removed
 * from the queue.
 *
 * @param {FlashMessageCreatorConfig} { text, onClick, data }
 */
export function addInfo<Data>({ text, onClick, data }: FlashMessageCreatorConfig<Data>): FlashMessage<Data> {
  return addFlashMessage({ type: 'INFO', duration: 5000, text, onClick, data });
}

/**
 * Adds a flash message of the type 'APOCALYPSE' on the flash message queue. 
 * This message is never removed from the queue automatically.
 *
 * @param {FlashMessageCreatorConfig} { text, onClick, data }
 */
export function addApocalypse<Data>({ text, onClick, data }: FlashMessageCreatorConfig<Data>): FlashMessage<Data> {
  return addFlashMessage({ type: 'APOCALYPSE', duration: false, text, onClick, data });
}

function addIdAndOnClick<Data>(flashMessage: FlashMessageConfig<Data>): FlashMessage<Data> {
  const onClick = flashMessage.onClick !== undefined ? flashMessage.onClick : noop;

  // By adding the onClick it is no longer optional, TypeScript
  // does not recognize this so the cast forces it to.
  let f = flashMessage as FlashMessage<Data>;

  // Assign a unique id to the flash message;
  f.id = nextFlashMessageId;
  nextFlashMessageId += 1;

  // The FlashMessageConfig's onClick requires a FlashMessage instance
  // but the FlashMessage's onClick does not. The reason for this we
  // do not want your user to have to manually provide the flashMessage
  // for the onClick. So we create an onClick which calls the provided
  // onClick from the config with the FlashMessage.
  f.onClick = () => {
    onClick(f);
  };

  return f;
}

// This export is purely for unit testing
export function resetNextFlashMessageId(): void {
  nextFlashMessageId = 1;
}
