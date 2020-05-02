import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { isBinary } from 'istextorbinary';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  dropzoneProps,
  colorActive,
  classNameIsActive,
}) => {
  const onDropRejected = useCallback((files) => {
    // console.error(files, event);
    const errors = files.map((file) => file.errors);
    const message = errors[0].map((error) => error.message).join('. ');
    onError(message);
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      // dropping of multiple files is already handled by onDropRejected()

      if (acceptedFiles.length === 0) {
        // note this callback is run even when no files are accepted / all rejected
        // do nothing in such case
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onerror = () => {
        onError('FileReader error');
        reader.abort();
      };

      if (customTextConverter) {
        // use alternate processor e.g processing binary files
        reader.onloadend = () => {
          const { result: resultAsArrayBuffer } = reader;
          if (
            customTextConverter &&
            typeof customTextConverter === 'function'
          ) {
            customTextConverter(resultAsArrayBuffer, { file }).then((text) => {
              onDropRead(text);
            });
          }
        };

        if (file) {
          reader.readAsArrayBuffer(file);
        }
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
    onDropRejected,
    noKeyboard: true,
    noClick: true,
    multiple: false,
    ...dropzoneProps,
  });

  //
  // configure 'onDropActive' styling
  // with classNameIsActive prop given, this will be set when onDropActive
  // otherwise we set the style with a backgroundColor
  // this is set on the target component
  //
  let style = {};
  let className = {};
  if (classNameIsActive !== '') {
    className = classNames({
      [classNameIsActive]: Boolean(isDragActive),
    });
  } else {
    style = { backgroundColor: isDragActive ? colorActive : 'inherit' };
  }

  const targetTextarea = React.createElement(component, {
    value,
    onChange,
    ...{ style },
    ...{ className },
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
  dropzoneProps: PropTypes.object,
  colorActive: PropTypes.string,
  classNameIsActive: PropTypes.string,
};

DropzoneTextArea.defaultProps = {
  onError: (msg) => {
    console.error(msg);
    window.alert(msg);
  },
  component: 'textarea',
  colorActive: 'lime',
  classNameIsActive: '',
};

export default DropzoneTextArea;
