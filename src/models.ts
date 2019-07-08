export type OnFlashMessageClicked<Data> = (msg: FlashMessage<Data>) => void;

export interface FlashMessage<Data> {
  // The id of the flashMessage must be unique for each flash message.
  id: number;

  /*
    The type of flash message, can be useful to distinguish
    between types of messages. For example you might have a type
    'error', 'warning' or 'info'.
  */
  type: string;

  // The text message you want to show to the user.
  text: string;

  // How long a flash message should be should to the user.
  duration: number | false;

  // The onClick handler for the flash message, you are expected to
  // assign onClick to the onClick handler of your element.
  onClick: () => void;

  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data?: Data;
}

export interface FlashMessageConfig<Data> {
  /*
    The type of flash message, can be useful to distinguish
    between types of messages. For example you might have a type
    'error', 'warning' or 'info'.
  */
  type: string;

  // The text message you want to show to the user.
  text: string;

  // How long a flash message should be should to the user.
  duration: number | false;

  /*
    What needs to happen when the message is clicked. Should
    receive the FlashMessage which is clicked.
  */
  onClick?: OnFlashMessageClicked<Data>;

  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data?: Data;
}

export interface FlashMessageCreatorConfig<Data> {
  // The text message you want to show to the user.
  text: string;

  /*
    What needs to happen when the message is clicked. Should
    receive the FlashMessage which is clicked.
  */
  onClick?: OnFlashMessageClicked<Data>;

  /*
    This 'data' object can be used to store any custom data you want to
    associate with the Flash Message. The data 'key' will never
    be used / manipulated now and in the future.
  */
  data?: Data;
}