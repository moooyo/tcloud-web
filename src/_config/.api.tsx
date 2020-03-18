let dev = false;
let yapi = false;
let baseUrl = '';
if (dev) {
  if (yapi) {
    baseUrl = 'http://localhost:3333/mock/9';
  } else {
    baseUrl = 'http://localhost:8080';
  }
} else {
  baseUrl = 'http://tcloud.lengyu.me/api';
}

let loginUrl = baseUrl + '/session';
let forgetPassword = baseUrl + '/forget';

let infoUrl = baseUrl + '/info';
let userInfoUrl = infoUrl + '/user';

let fileInfoUrl = baseUrl + '/files';

let UsersBaseUrl = baseUrl + '/users';
let RegisterUrl = UsersBaseUrl;
let RegisterConfirmUrl = UsersBaseUrl + '/confirm';
let RegisterCodeResend = UsersBaseUrl + '/code';

export {
  loginUrl,
  forgetPassword,
  userInfoUrl,
  fileInfoUrl,
  RegisterUrl,
  RegisterConfirmUrl,
  RegisterCodeResend,
};
