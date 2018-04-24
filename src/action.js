import {
  UPLOAD_TO_S3,
  S3_UPLOAD_FAILED,
  S3_UPLOAD_SUCCEEDED,
} from './constants';

export function uploadToS3(signedUrl, fileInput) {
  return {
    type: UPLOAD_TO_S3,
    signedUrl,
    fileInput,
  };
}

export function s3UploadFailed(exception) {
  return {
    type: S3_UPLOAD_FAILED,
    exception,
  };
}

export function s3UploadSucceeded(signedUrl, file, contentType) {
  return {
    type: S3_UPLOAD_SUCCEEDED,
    signedUrl,
    file,
    contentType,
  };
}
