# React Dropzone Textarea

A React component of a textarea element. Drop a text file onto the element and load file contents as textarea's value. Essentially, it's a textarea wrapper with [react-dropzone](https://github.com/react-dropzone/react-dropzone).

It can be used with the generic HTML5 `<textarea>` element, or with any other React textarea like component which supports a `value` and `onChange` prop. Tested with [BlueprintJS](https://blueprintjs.com/docs/#core/components/text-inputs.text-area) but should work with other libraries too.

## Install

- Yarn: `yarn add react-dropzone-textarea`
- NPM: `npm install react-dropzone-textarea`

## Usage with hooks

When a text file dropped onto the textarea component, `onDropRead` callback is fired which can be used to subsequently set the textarea's value.

Basic example

```js
import React from "react";
import Textarea from "react-dropzone-textarea";

export default function App() {
  const [value, setValue] = React.useState("");
  return (
    <div className="App">
      <Textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onDropRead={text => setValue(text)}
        textareaProps={{
          cols: 80,
          rows: 25,
          placeholder: "Drop one text file here..."
        }}
      />
    </div>
  );
}
```

You can still edit the textarea's content further after a drop operation.

CodeSandbox demos:

- [Use with generic HTML `<textarea>`](https://codesandbox.io/s/react-dropzone-textarea-simple-b84fu).
- [Use with BlueprintJS TextArea component](https://codesandbox.io/s/react-dropzone-textarea-blueprintjs-36oc7)
- [Use with Material-UI TextField component](https://codesandbox.io/s/react-dropzone-textarea-material-ui-ytduo)
- [Use with Ant Design TextArea component](https://codesandbox.io/s/react-dropzone-textarea-antd-knp32)
- [Drop spreadsheet and convert to CSV](https://codesandbox.io/s/react-dropzone-textarea-spreadsheet-ersgp)

Used on real sites:

- [diff-text](https://diff-text.netlify.app/) (demo of [diff-text](https://github.com/andygock/diff-text) web app)

## Building

Install dependencies

    yarn install

Build to `dist/index.js` using [rollup.js](https://rollupjs.org/guide/en/)

    yarn start

## Props

Documentation coming soon.
