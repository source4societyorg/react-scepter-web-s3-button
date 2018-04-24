import { uploadToS3, s3UploadFailed, s3UploadSucceeded } from '../src/action';
import { UPLOAD_TO_S3, S3_UPLOAD_FAILED, S3_UPLOAD_SUCCEEDED } from '../src/constants';

test('uploadToS3 creates the correct action object', () => {
  const mockSignedUrl = 'mockSignedUrl';
  const mockFileInput = 'mockFileInput';
  expect(uploadToS3(mockSignedUrl, mockFileInput)).toEqual({
    type: UPLOAD_TO_S3,
    signedUrl: mockSignedUrl,
    fileInput: mockFileInput,
  });
});

test('s3UploadFailed', () => {
  const mockException = 'mockException';
  expect(s3UploadFailed(mockException)).toEqual({
    type: S3_UPLOAD_FAILED,
    exception: mockException,
  });
});

test('s3UploadSucceeded', () => {
  const mockSignedUrl = 'mockSignedUrl';
  const mockFile = 'mockFile';
  const mockContentType = 'mockContentType';
  expect(s3UploadSucceeded(mockSignedUrl, mockFile, mockContentType)).toEqual({
    type: S3_UPLOAD_SUCCEEDED,
    signedUrl: mockSignedUrl,
    file: mockFile,
    contentType: mockContentType,
  });
});

