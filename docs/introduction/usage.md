---
layout: default
title: Usage
description: 'Usage instructions for @42.nl/react-flash-messages.'
parent: Introduction
permalink: /usage
nav_order: 3
---

Optionally you can enable the `FlashMessagesProvider` in your application:

```js
import React from 'react';
import { render } from 'react-dom';

import {
  FlashMessagesProvider
} from '@42.nl/react-flash-messages';

import App from './App';

const rootElement = document.getElementById('root');

// Register the FlashMessagesProvider, not required when never 
// using the `FlashMessagesContext`.
if (rootElement) {
  render(
    <FlashMessagesProvider>
      <App/>
    </FlashMessagesProvider>,
    rootElement
  );
}
```

## Displaying messages via useFlashMessage

Next we need to render the flash messages from the store. 

The appearance of the flash messages is entirely up to you, but here is a small example:

```js
import React from 'react';

import { useFlashMessages, removeFlashMessage, FlashMessage } from '@42.nl/react-flash-messages';

import './FlashMessage.css';

function FlashMessage() {
  const flashMessages = useFlashMessages();

  return (
    <div>
      {flashMessages.map(flashMessage => (
        <div
          key={flashMessage.id}
          className={`flash-message ${flashMessage.type}`}
          onClick={() => {

            // Make sure you call the onClick action otherwise callbacks will not work.
            flashMessage.onClick();

            // This implementation deletes the flash message when it is clicked.
            removeFlashMessage(flashMessage);
          }}
        >
          {flashMessage.text}
        </div>
      ))}
    </div>
  );
}
```

Where the contents of 'FlashMessage.css' is:

```css
.flash-message {
  position: absolute;
  width: 100%;
  height: 50px;
  text-align: center;
  z-index: 9000;
  background-color: white;
  border: black solid 2px;
  padding: 12.5px 0;
}
```

## Displaying messages via FlashMessagesProvider

Alternatively you can use the `FlashMessagesProvider` instead, when
you really want to use plain old Components.

```js
import React, { Component } from 'react';

import { FlashMessagesContext, removeFlashMessage, FlashMessage } from '@42.nl/react-flash-messages';

import './FlashMessage.css';

class FlashMessage extends Component() {

  render() {
    return (
     <FlashMessagesContext.Consumer>
      {(flashMessages: FlashMessage<any>[]) => {
        return this.renderFlashMessages(flashMessages);
      }}
    </FlashMessagesContext.Consumer>
    );
  }

  renderFlashMessages(flashMessages: FlashMessages<any>[]) {
    return (
      <div>
        {flashMessages.map(flashMessage => (
          <div
            key={flashMessage.id}
            className={`flash-message ${flashMessage.type}`}
            onClick={() => {
              // Make sure you call the onClick action otherwise callbacks will not work.
              flashMessage.onClick();

              // This implementation deletes the flash message when it is clicked.
              removeFlashMessage(flashMessage);
            }}
          >
            {flashMessage.text}
          </div>
        ))}
      </div>
    );
  }
}
```

# Sending flash messages

Now that we can see the flash messages we can use the following convenience methods to send flash messages:

```js
import { addError, addWarning, addSuccess, addInfo, addApocalypse } from '@42.nl/react-flash-messages';

// Renders a message for 10000 milliseconds
addError({ 
  text: 'Epic error', 
  data: { age: 12 }, 
  onClick: (flashMessage) => {
    console.log('I was clicked', flashmessage);
  },
  onRemove(flashMessage, reason) => {
    console.log('I was removed', flashMessage, 'because', reason);
  })
});

// Renders a message for 7000 milliseconds
addWarning({ 
  text: 'Epic warning', 
  data: { tree: 'house' }, 
  onClick: (flashMessage) => {
    console.log('I was clicked', flashMessage);
  },
  onRemove(flashMessage, reason) => {
    console.log('I was removed', flashMessage, 'because', reason);
  })
});

// Renders a message for 2000 milliseconds
addSuccess({ 
  text: 'Epic success', 
  data: { win: true }, 
  onClick: (flashMessage) => {
    console.log('I was clicked', flashMessage);
  },
  onRemove(flashMessage, reason) => {
    console.log('I was removed', flashMessage, 'because', reason);
  })
});

// Renders a message for 5000 milliseconds
addInfo({ 
  text: 'Epic info', 
  data: { yo: 'man' }, 
  onClick: (flashMessage) => {
    console.log('I was clicked', flashMessage);
  },onRemove(flashMessage, reason) => {
    console.log('I was removed', flashMessage, 'because', reason);
  })
});

// Renders a message which is not automatically removed
addApocalypse({ 
  text: 'TOTAL ANNIHILATION', 
  data: { fail: true }, 
  onClick: (flashMessage) => {
    console.log('I was clicked', flashMessage);
  },onRemove(flashMessage, reason) => {
    console.log('I was removed', flashMessage, 'because', reason);
  })
});
```

The `onClick` and the `data` keys are optional. The `data`
key can be used to send whatever `data` you want to the
component which renders the flash message.

# Creating a custom flash message type.

If the default types are not enough you can always create your own flash message creator:

You do this by calling `addFlashMessage` manually.

```js
import { addFlashMessage } from '@42.nl/react-flash-messages';

export function addNotice(config: FlashMessageCreatorConfig<Data>): FlashMessage<Data> {
  return addFlashMessage(type: 'NOTICE', duration: 1000, ...config});
}
```
