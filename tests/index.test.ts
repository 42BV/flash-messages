import * as index from '../src';

describe('index', () => {
  test('exports', () => {
    expect(index).toMatchInlineSnapshot(`
      Object {
        "FlashMessagesContext": Object {
          "$$typeof": Symbol(react.context),
          "Consumer": Object {
            "$$typeof": Symbol(react.context),
            "_calculateChangedBits": null,
            "_context": [Circular],
          },
          "Provider": Object {
            "$$typeof": Symbol(react.provider),
            "_context": [Circular],
          },
          "_calculateChangedBits": null,
          "_currentRenderer": null,
          "_currentRenderer2": null,
          "_currentValue": Array [],
          "_currentValue2": Array [],
          "_threadCount": 0,
        },
        "FlashMessagesProvider": [Function],
        "addApocalypse": [Function],
        "addError": [Function],
        "addFlashMessage": [Function],
        "addInfo": [Function],
        "addSuccess": [Function],
        "addWarning": [Function],
        "flashMessageService": Object {
          "addFlashMessage": [Function],
          "clearFlashMessages": [Function],
          "getFlashMessages": [Function],
          "removeFlashMessage": [Function],
          "subscribe": [Function],
          "unsubscribe": [Function],
        },
        "removeFlashMessage": [Function],
        "useFlashMessages": [Function],
      }
    `);
  });
});
