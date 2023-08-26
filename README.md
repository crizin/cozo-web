# cozo-web

[![Website Up](https://img.shields.io/website.svg?url=https%3A%2F%2Fcozo.me)](https://cozo.me/)
[![Observatory](https://img.shields.io/mozilla-observatory/grade/cozo.me)](https://observatory.mozilla.org/analyze/cozo.me)
[![Build](https://github.com/crizin/cozo-web/actions/workflows/build.yml/badge.svg)](https://github.com/crizin/cozo-web/actions)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d4f2e52ae5c246f8aa60d3edb25ded52)](https://app.codacy.com/gh/crizin/cozo-web/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=crizin_cozo-web&metric=alert_status)](https://sonarcloud.io/summary/overall?id=crizin_cozo-web)
[![License: MIT](https://img.shields.io/github/license/crizin/cozo-web)](https://opensource.org/licenses/MIT)

https://cozo.me 사이트의 클라이언트 코드

## 로컬 개발

[라이브 API 서버](https://api.cozo.me/)를 바라보도록 .env 파일에 설정되어 있으므로 start만 시켜주면 된다

```shell
yarn dev
```

이후 [http://localhost:3000](http://localhost:3000) URL을 열어서 확인

## production에서 실행시 필요한 환경 변수

- `HOSTNAME`: 0.0.0.0 (Public 접근이 필요하다면 설정)
- `API_ENDPOINT`: API 서버 URL
- `GA_TRACKING_ID`: Google Analytics Tracking ID
- `RECAPTCHA_SITE_KEY`: Google reCAPTCHA site key

## 참고

- [cozo-api / 백엔드 서버](https://github.com/crizin/cozo-api)
