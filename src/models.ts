export type OnFlashMessageClicked<Data> = (
  flashMessage: FlashMessage<Data>
) => void;

/**
 * The reason a flash message was removed.
 *
 * When it is 'duration-elapsed' it means that the flash message
 * was removed because the duration of the message expired. When
 * it is 'manually-removed' it was because the `removeFlashMessage`
 * action was called.
 */
export type FlashMessageRemovedReason = 'duration-elapsed' | 'manually-removed';

export type OnFlashMessageRemoved<Data> = (
  flashMessage: FlashMessage<Data>,
  reason: FlashMessageRemovedReason
) => void;

/**
 * Represents a FlashMessage as it will be represented in the
 * flashMessageService.
 */
export type FlashMessage<Data> = {
  /**
   * The id of the flashMessage must be unique for each flash message.
   */
  id: number;

  /**
   * The type of flash message, can be useful to distinguish
   * between types of messages. For example you might have a type
   * 'error', 'warning' or 'info'.
   */
  type: string;

  /**
   * The text message you want to show to the user.
   */
  text: string;

  /**
   * How long a flash message should be should to the user.
   *
   * When `false` it will never disappear.
   */
  duration: number | false;

  /**
   * The onClick handler for the flash message, used to perform
   * actions when the user clicks on the FlashMessage
   *
   * You must call onClick from inside your component representing
   * the flash message when it is clicked. Otherwise the onClick
   * callback will never be called.
   */
  onClick: () => void;

  /**
   * When the flash message is removed this callback is executed,
   * to let the user know the message was removed. The reason
   * for removal must be provided as the second argument it can either
   * be 'duration-elapsed' or 'manually-removed'.
   *
   * When it is 'duration-elapsed' it means that the flash message
   * was removed because the duration of the message expired. When
   * it is 'manually-removed' it was because the `removeFlashMessage`
   * action was called.
   */
  onRemove: (reason: FlashMessageRemovedReason) => void;

  /**
   * This 'data' object can be used to store any custom data you want
   * to associate with the Flash Message. The data 'key' will never
   * be used / manipulated now and in the future.
   */
  data?: Data;
};

/**
 * Represents an a configuration from which an actual FlashMessage
 * instance can be created. FlashMessageConfig is used by the
 * `addFlashMessage` action.
 *
 * The reason it exists is so we can hide complexity for the developer
 * when spawning flash messages vs consuming them to show them in the UI.
 * For example the FlashMessage onClick and onRemove does not have the
 * the instance of the flash message as the first argument, but the
 * FlashMessageConfig does.
 *
 * Behind the scenes the onClick and onRemove will be changed before
 * creating a the FlashMessage from the FlashMessageConfig and they
 * will be re-written.
 */
export type FlashMessageConfig<Data> = {
  /**
   * The type of flash message, can be useful to distinguish
   * between types of messages. For example you might have a type
   * 'error', 'warning' or 'info'.
   */
  type: string;

  /**
   * The text message you want to show to the user.
   */
  text: string;

  /**
   * How long a flash message should be should to the user.
   *
   * When `false` it will never disappear.
   */
  duration: number | false;

  /**
   * Optional callback for what needs to happen when the message is
   * clicked. Should receive the FlashMessage which is clicked.
   */
  onClick?: OnFlashMessageClicked<Data>;

  /**
   * Optional callback for what needs to happen when the message is
   * removed. Should receive the FlashMessage which is clicked, and
   * the reason for closure.
   */
  onRemove?: OnFlashMessageRemoved<Data>;

  /**
   * This 'data' object can be used to store any custom data you want
   * to associate with the Flash Message. The data 'key' will never
   * be used / manipulated now and in the future.
   */
  data?: Data;
};

/**
 * Represents an a configuration from which an actual FlashMessage
 * instance can be created. FlashMessageCreatorConfig is used by the
 * flash message creator actions such as: `addError` and `addWarning`
 * etc etc, so the developer can quickly spawn flash messages without
 * resorting to the more low level `addFlashMessage` action.
 */
export type FlashMessageCreatorConfig<Data> = {
  /**
   * The text message you want to show to the user.
   */
  text: string;

  /**
   * Optional callback for what needs to happen when the message is
   * clicked. Should receive the FlashMessage which is clicked.
   */
  onClick?: OnFlashMessageClicked<Data>;

  /**
   * Optional callback for what needs to happen when the message is
   * removed. Should receive the FlashMessage which is clicked, and
   * the reason for closure.
   */
  onRemove?: OnFlashMessageRemoved<Data>;

  /**
   * This 'data' object can be used to store any custom data you want
   * to associate with the Flash Message. The data 'key' will never
   * be used / manipulated now and in the future.
   */
  data?: Data;
};
