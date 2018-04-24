import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { S3FileUploadButton, mapDispatchToProps, makeChangeHandler, makeRefCallback, makeClickHandler } from '../src';
import { uploadToS3 } from '../src/action';

test('S3FileUploadButton renders without problems', () => {
  shallow(<S3FileUploadButton />);
});

test('S3FileUploadButton has defaultProps properly assigned', () => {
  expect(S3FileUploadButton.defaultProps).toEqual({
    fileInputVisible: 'hidden',
    className: '',
  });
});

test('S3FileUpload has propTypes properly assigned', () => {
  expect(S3FileUploadButton.propTypes).toEqual({
    children: PropTypes.any,
    fileInputVisible: PropTypes.string,
    fileSelectedHandler: PropTypes.func,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    signedUrl: PropTypes.string.isRequired,
  });
});

test('mapDispatchToProps assigns the correct dispatch to the props', () => {
  const mockDispatch = (action) => action;
  const mockSignedUrl = 'mockSignedUrl';
  const mockFileInput = 'mockFileInput';
  expect(mapDispatchToProps(mockDispatch)
    .fileSelectedHandler(mockSignedUrl, mockFileInput))
    .toEqual(uploadToS3(mockSignedUrl, mockFileInput));
});

test('makeChangeHandler will create a function that handles changes to the input and passes along a signedUrl', () => {
  const mockChangeHandlerResult = 'mockChangeHandlerResult';
  const mockSignedUrl = 'mockSignedUrl';
  const mockFileSelectedHandler = (signedUrl) => {
    expect(signedUrl).toEqual(mockSignedUrl);
    return mockChangeHandlerResult;
  };
  expect(makeChangeHandler(mockFileSelectedHandler, mockSignedUrl)()).toEqual(mockChangeHandlerResult);
});

test('refCallback takes a fileInputRef that has a higher scope and assigns its argument to that variable', () => {
  const mockFileInputRef = { input: null };
  const mockInput = 'mockInput';
  makeRefCallback(mockFileInputRef)(mockInput);
  expect(mockFileInputRef.input).toEqual(mockInput);
});

test('makeClickHandler takes a fileInputRef that has a higher scope and assigns its argument to that variable', (done) => {
  const mockFileInputRef = { input: { click: () => done() } };
  makeClickHandler(mockFileInputRef)();
});
