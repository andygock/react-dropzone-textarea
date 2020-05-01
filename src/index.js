import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { isBinary } from 'istextorbinary';
import PropTypes from 'prop-types';

const colorActive = 'lightgreen';

const DropzoneTextArea = ({
  value,
  onChange,
  onDropRead,
  textareaProps,
  rootProps,
  customTextConverter,
  component,
  onError,

  // eslint-disable-next-line no-unused-vars
  children,

  ...otherProps
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        // only supports reading one file into a textarea
        onError('Dropping of more than one file not supported');
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      if (customTextConverter) {
        // use alternate processor e.g processing binary files
        reader.onloadend = () => {
          const { result: resultAsArrayBuffer } = reader;
          if (
            customTextConverter &&
            typeof customTextConverter === 'function'
          ) {
            customTextConverter(resultAsArrayBuffer).then((text) => {
              onDropRead(text);
            });
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        // read file as text file
        reader.onloadend = () => {
          const { result: resultAsText } = reader;

          // check if file contents appear to be binary
          if (isBinary(null, resultAsText)) {
            onError('Binary files not supported');
            return;
          }

          // make use defined callback with file contents as argument
          if (onDropRead && typeof onDropRead === 'function') {
            onDropRead(resultAsText);
          }
        };
        reader.readAsText(file);
      }
    },
    [onDropRead, customTextConverter, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    noClick: true,
    ...otherProps,
  });

  const targetTextarea = React.createElement(component, {
    value,
    onChange,
    style: { backgroundColor: isDragActive ? colorActive : 'inherit' },
    ...textareaProps,
  });

  return (
    <div {...getRootProps()} {...rootProps}>
      <input {...getInputProps()} />
      {targetTextarea}
    </div>
  );
};

DropzoneTextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDropRead: PropTypes.func,
  textareaProps: PropTypes.object,
  rootProps: PropTypes.object,
  customTextConverter: PropTypes.func,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  onError: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  otherProps: PropTypes.arrayOf(PropTypes.object),
};

DropzoneTextArea.defaultProps = {
  onError: (msg) => {
    console.error(msg);
    window.alert(msg);
  },
  component: 'textarea',
};

export default DropzoneTextArea;
