import { takeLatest, put, call } from 'redux-saga/effects';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import {
  sendRequestToS3 as defaultSendRequestToS3,
  getContentTypeFromExtension as defaultGetContentType,
  asyncFileReader as defaultAsyncFileReader,
} from '@source4society/scepter-aws-s3-utilities';
import { request } from '@source4society/scepter-ui-utilities';
import { UPLOAD_TO_S3 } from './constants';
import { s3UploadFailed, s3UploadSucceeded } from './action';

export const defaultRequestHandler = (url, options, injectedRequestHandler) => {
  const requestHandler = valueOrDefault(injectedRequestHandler, request);
  requestHandler(url, options, false); // Disable standard JSON parsing
};

export function* uploadToS3Saga(action, injectedSendRequestToS3, injectedGetContentType, injectedRequestHandler, injectedFileReader) {
  try {
    const sendRequestToS3 = valueOrDefault(injectedSendRequestToS3, defaultSendRequestToS3);
    const getContentTypeFromExtension = valueOrDefault(injectedGetContentType, defaultGetContentType);
    const asyncFileReader = valueOrDefault(injectedFileReader, defaultAsyncFileReader);
    const file = action.fileInput.files[0];
    const signedUrl = action.signedUrl;
    const contentType = getContentTypeFromExtension(action.fileInput.value);
    const requestHandler = valueOrDefault(injectedRequestHandler, defaultRequestHandler);
    const fileData = yield call(asyncFileReader, file);
    yield call(sendRequestToS3, requestHandler, fileData.target.result, signedUrl, contentType);
    yield put(s3UploadSucceeded(signedUrl, file, contentType));
  } catch (exception) {
    yield put(s3UploadFailed(exception));
  }
}

export default function* s3UploadButtonSagaListener() {
  yield takeLatest(UPLOAD_TO_S3, uploadToS3Saga);
}
