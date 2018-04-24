import s3UploadButtonSagaListener, { uploadToS3Saga } from '../src/saga';
import { UPLOAD_TO_S3, S3_UPLOAD_FAILED, S3_UPLOAD_SUCCEEDED } from '../src/constants';

test('s3UploadButtonSagaListener listens for the correct event', () => {
  const generator = s3UploadButtonSagaListener();
  const fork = generator.next().value;
  expect(fork.FORK.fn.name).toEqual('takeLatest');
  expect(fork.FORK.args[0]).toEqual(UPLOAD_TO_S3);
  expect(fork.FORK.args[1].name).toEqual('uploadToS3Saga');
  expect(generator.next().done).toBeTruthy();
});

test('uploadToS3Saga to send request to S3 and dispatch the proper action', () => {
  const mockResponse = 'mockResponse';
  const mockContentType = 'mockContentType';
  const mockFile = { files: ['mockFile'], value: 'mockFileName' };
  const mockSignedUrl = 'mockSignedUrl';
  const mockRequestHandler = () => mockResponse;
  const mockAction = {
    fileInput: mockFile,
    signedUrl: mockSignedUrl,
    contentType: mockContentType,
  };
  const mockGetContentType = (file) => {
    expect(file).toEqual(mockFile.value);
    return mockContentType;
  };

  const mockSendRequestToS3 = (requestHandler, file, signedUrl, contentType) => {
    expect(requestHandler.name).toEqual(mockRequestHandler.name);
    expect(file).toEqual(mockFile.files[0]);
    expect(signedUrl).toEqual(mockSignedUrl);
    expect(contentType).toEqual(mockContentType);
    return mockResponse;
  };
  const generator = uploadToS3Saga(mockAction, mockSendRequestToS3, mockGetContentType, mockRequestHandler);
  const call = generator.next().value;
  expect(call.CALL.fn.name).toEqual(mockSendRequestToS3.name);
  expect(call.CALL.args).toEqual([[mockRequestHandler, mockFile.files[0], mockSignedUrl, mockContentType]]);
  const put = generator.next().value;
  expect(put.PUT.action.type).toEqual(S3_UPLOAD_SUCCEEDED);
  expect(put.PUT.action.signedUrl).toEqual(mockSignedUrl);
  expect(put.PUT.action.file).toEqual(mockFile.files[0]);
  expect(put.PUT.action.contentType).toEqual(mockContentType);
  expect(generator.next().done).toBeTruthy();
});

test('uploadToS3Saga dispatches the proper action on exception', () => {
  const mockFile = { files: ['mockFile'], value: 'mockFileName' };
  const mockContentType = 'mockContentType';
  const mockSignedUrl = 'mockSignedUrl';
  const mockException = new Error('test');
  const mockGetContentType = () => {
    throw mockException;
  };
  const mockAction = {
    fileInput: mockFile,
    signedUrl: mockSignedUrl,
    contentType: mockContentType,
  };
  const mockRequestHandler = () => null;
  const mockSendRequestToS3 = (requestHandler, file, signedUrl, contentType) => {
    expect(requestHandler.name).toEqual(mockRequestHandler.name);
    expect(file).toEqual(mockFile.files[0]);
    expect(signedUrl).toEqual(mockSignedUrl);
    expect(contentType).toEqual(mockContentType);
  };
  const generator = uploadToS3Saga(mockAction, mockSendRequestToS3, mockGetContentType, mockRequestHandler);
  const put = generator.next().value;
  expect(put.PUT.action.type).toEqual(S3_UPLOAD_FAILED);
  expect(put.PUT.action.exception).toEqual(mockException);
  expect(generator.next().done).toBeTruthy();
});
