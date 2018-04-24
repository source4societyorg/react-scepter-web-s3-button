import { takeLatest, put, call } from 'redux-saga/effects';
import { valueOrDefault } from '@source4society/scepter-utility-lib';
import { sendRequestToS3 as defaultSendRequestToS3, getContentTypeFromExtension as defaultGetContentType } from '@source4society/scepter-aws-s3-utilities';
import { request } from '@source4society/scepter-ui-utilities';
import { UPLOAD_TO_S3 } from './constants';
import { s3UploadFailed, s3UploadSucceeded } from './action';

export function* uploadToS3Saga(action, injectedSendRequestToS3, injectedGetContentType, injectedRequestHandler) {
  try {
    const sendRequestToS3 = valueOrDefault(injectedSendRequestToS3, defaultSendRequestToS3);
    const getContentTypeFromExtension = valueOrDefault(injectedGetContentType, defaultGetContentType);
    const file = action.fileInput.files[0];
    const signedUrl = action.signedUrl;
    const contentType = getContentTypeFromExtension(action.fileInput.value);
    const requestHandler = valueOrDefault(injectedRequestHandler, request);
    yield call(sendRequestToS3, [requestHandler, file, signedUrl, contentType]);
    yield put(s3UploadSucceeded(signedUrl, file, contentType));
  } catch (exception) {
    yield put(s3UploadFailed(exception));
  }
}

export default function* s3UploadButtonSagaListener() {
  yield takeLatest(UPLOAD_TO_S3, uploadToS3Saga);
}
