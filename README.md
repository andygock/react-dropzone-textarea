# React Dropzone Textarea

A React component of a textarea element. Drop text files onto the element and load file contents as textarea's value. Essentially, it's a textarea wrapper with [react-dropzone](https://github.com/react-dropzone/react-dropzone).

It can be used with the generic HTML5 `<textarea>` element, or with any other React textarea like component which supports a `value` and `onChange` prop. Tested with [BlueprintJS](https://blueprintjs.com/docs/#core/components/text-inputs.text-area) but should work with other libraries too.

## Install

- Yarn: `yarn add react-dropzone-textarea`
- NPM: `npm install react-dropzone-textarea`

## Usage with hooks

Basic example

```js
import React from 'react';
import DropTextarea from 'react-dropzone-textarea';

export default () => {
    const [value, setValue] = React.useState("");
    return (
        <DropTextarea value={value} onChange={(e)=>setValue(e.target.value)} />
    );
};
```

You can still edit the contents of the textarea's content further after a drop operation.

Live demo at [CodeSandbox](https://codesandbox.io/s/react-dropzone-textarea-b84fu).

## Building

Install dependencies

    yarn install

Build to `dist/index.js` using [rollup.js](https://rollupjs.org/guide/en/)

    yarn start

## Props

Documentation coming soon.
