import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { sagaInjector } from '@source4society/scepter-ui-utilities';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import { uploadToS3 } from './action';
import saga from './saga';

const fileInputRef = { input: null };

const S3FileUploadButton = ({ children, name, id, fileInputVisible, fileSelectedHandler, className, signedUrl }) => {
  const changeHandler = makeChangeHandler(fileSelectedHandler, signedUrl);
  const refCallback = makeRefCallback(fileInputRef);
  const clickHandler = makeClickHandler(fileInputRef);
  return (
    <div className={className}>
      <input
        type="file"
        ref={refCallback}
        name={name}
        id={id}
        onChange={changeHandler}
        style={{ visibility: fileInputVisible }}
        className={className}
      />
      <label htmlFor={name}><button className={className} onClick={clickHandler}>{children}</button></label>
    </div>
  );
};

export const makeClickHandler = (superScopedObject) => () => superScopedObject.input.click();
export const makeChangeHandler = (fileSelectedHandler, signedUrl) => () => fileSelectedHandler(signedUrl);
export const makeRefCallback = (superScopedObject) => (input) => {
  const referenceObject = superScopedObject;
  referenceObject.input = input;
};

S3FileUploadButton.defaultProps = {
  fileInputVisible: 'hidden',
  className: '',
};

S3FileUploadButton.propTypes = {
  children: PropTypes.any,
  fileInputVisible: PropTypes.string,
  fileSelectedHandler: PropTypes.func,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  signedUrl: PropTypes.string.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  fileSelectedHandler: (signedUrl, injectedFileInput) => {
    const fileInput = valueOrDefault(injectedFileInput, fileInputRef.input);
    return dispatch(uploadToS3(signedUrl, fileInput));
  },
});

const withConnect = connect(null, mapDispatchToProps);
const withSaga = sagaInjector({ key: 'uploadToS3Button', saga });
export { S3FileUploadButton };
export default compose(
  withConnect,
  withSaga,
)(S3FileUploadButton);
