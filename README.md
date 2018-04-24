# react-scepter-web-s3-button

Web button component to select a file from your local computer and upload it to S3

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1519221119/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![redux-logo](https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png)](https://github.com/reactjs/redux)

[![react-boilerplate](https://github.com/react-boilerplate/brand/blob/master/assets/logo.png)](https://gihub.com/react-boilerplate)

[![airbnb-codestyle](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/airbnb/javascript)

[![Build Status](https://travis-ci.org/source4societyorg/react-scepter-web-s3-button.svg?branch=master)](https://travis-ci.org/source4societyorg/react-scepter-web-s3-button)

[![codecov](https://codecov.io/gh/source4societyorg/react-scepter-web-s3-button/branch/master/graph/badge.svg)](https://codecov.io/gh/source4societyorg/react-scepter-web-s3-button)

# Installation

Using npm

    npm install -S @source4society/react-scepter-web-s3-button

Using Yarn

    yarn add @source4society/react-scepter-web-s3-button

# Setup

  Import this container with `import S3FileUploadButton from '@source4society/react-scepter-web-s3-button/lib/index` then you can use it as follows:

    <S3FileUploadButton signedUrl={anS3SignedUrl} name={uniqueName} id={uniqueId}>Button Text</S3FileUploadButton>

  The signedUrl prop should be a signed url retrieved from the AWS S3 SDK. You can read more about it [here](https://aws.amazon.com/tools/) and there is a prebuild SCEPTER service that can also help [SCEPTER-S3PresignedURLService](https://github.com/source4societyorg/SCEPTER-S3PresignedURLService)