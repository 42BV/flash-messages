import {
  addError,
  addWarning,
  addSuccess,
  addInfo,
  addApocalypse,
  addFlashMessage,
  removeFlashMessage,
  resetNextFlashMessageId,
} from '../src/actions';

import { flashMessageService } from '../src/service';

jest.useFakeTimers();

describe('Flash message actions', () => {
  let onClick: jest.Mock;

  beforeEach(() => {
    onClick = jest.fn();

    jest.spyOn(flashMessageService, 'addFlashMessage');
    jest.spyOn(flashMessageService, 'removeFlashMessage');

    jest.clearAllMocks();
    jest.clearAllTimers();

    resetNextFlashMessageId();
  });

  describe('addFlashMessage', () => {
    test('that it adds an id and a alters the onClick so that it encloses the FlashMessage', () => {
      const flashMessage = addFlashMessage({
        type: 'BLAAT',
        text: 'TLAAB',
        onClick,
        duration: 5000,
        data: { age: 16 },
      });

      expect(flashMessage.id).toBe(1);

      expect(typeof flashMessage.onClick).toBe('function');
      
      flashMessage.onClick();

      expect(onClick).toBeCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(flashMessage);

    });

    test('when onClick is not defined it should assign a noop', () => {
      const flashMessage = addFlashMessage({
        type: 'BLAAT',
        text: 'TLAAB',
        duration: 5000,
        data: { age: 16 },
      });

      expect(typeof flashMessage.onClick).toBe('function');
      expect(flashMessage.onClick()).toBe(undefined);
    });

    test('custom type should work', () => {
      addFlashMessage({
        type: 'BLAAT',
        text: 'TLAAB',
        duration: false,
        onClick,
        data: { age: 16 },
      });

      expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        type: 'BLAAT',
        text: 'TLAAB',
        duration: false,
        data: { age: 16 },
      }));
    });
  });

  test('removeFlashMessage', () => {
    const flashMessage = addError({ text: 'Epic error', onClick, data: { age: 12 } });

    expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
    expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      type: 'ERROR',
      text: 'Epic error',
      duration: 10000,
      data: { age: 12 },
    }));

    removeFlashMessage(flashMessage);

    expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(1);
    expect(flashMessageService.removeFlashMessage).toHaveBeenCalledWith(flashMessage);
  });

  describe('default creators', () => {
    test('addError', () => {
      const flashMessage = addError({ text: 'Epic error', onClick, data: { age: 12 } });

      expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        type: 'ERROR',
        text: 'Epic error',
        duration: 10000,
        data: { age: 12 },
      }));

      jest.advanceTimersByTime(9999);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledWith(flashMessage);
    });

    test('addWarning', () => {
      const flashMessage = addWarning({ text: 'Epic warning', onClick, data: { age: 13 } });

      expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        type: 'WARNING',
        text: 'Epic warning',
        duration: 7000,
        data: { age: 13 },
      }));

      jest.advanceTimersByTime(6999);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledWith(flashMessage);
    });

    test('addSuccess', () => {
      const flashMessage = addSuccess({ text: 'Epic success', onClick, data: { age: 14 } });

      expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        type: 'SUCCESS',
        text: 'Epic success',
        duration: 2000,
        data: { age: 14 },
      }));

      jest.advanceTimersByTime(1999);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledWith(flashMessage);
    });

    test('addInfo', () => {
      const flashMessage = addInfo({ text: 'Epic info', onClick, data: { age: 15 } });

      expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        type: 'INFO',
        text: 'Epic info',
        duration: 5000,
        data: { age: 15 },
      }));

      jest.advanceTimersByTime(4999);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(1);

      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledWith(flashMessage);
    });

    test('addApocalypse', () => {
      addApocalypse({ text: 'TOTAL ANNIHILATION', onClick, data: { age: 16 } });

      expect(flashMessageService.addFlashMessage).toHaveBeenCalledTimes(1);
      expect(flashMessageService.addFlashMessage).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        type: 'APOCALYPSE',
        text: 'TOTAL ANNIHILATION',
        duration: false,
        data: { age: 16 },
      }));

      jest.advanceTimersByTime(600000000);

      expect(flashMessageService.removeFlashMessage).toHaveBeenCalledTimes(0);
    });
  });
});
