let dev = true;
let yapi = false;
let baseUrl = '';
if (dev) {
  if (yapi) {
    baseUrl = 'http://localhost:3333/mock/9';
  } else {
    baseUrl = 'http://localhost/api';
  }
} else {
  baseUrl = 'http://tcloud.lengyu.me/api';
}

let loginUrl = baseUrl + '/session';
let forgetPassword = baseUrl + '/forget';

let infoUrl = baseUrl + '/info';
let userInfoUrl = infoUrl + '/user';

let fileInfoUrl = baseUrl + '/files';
let fileDownloadUrl = fileInfoUrl + '/download';

let uploadFileUrl = fileInfoUrl;

let UsersBaseUrl = baseUrl + '/users';
let RegisterUrl = UsersBaseUrl;
let RegisterConfirmUrl = UsersBaseUrl + '/confirm';
let RegisterCodeResend = UsersBaseUrl + '/code';

let IconFontCnUrl = '//at.alicdn.com/t/font_1704308_m2wkww8mq2.js';

export {
  loginUrl,
  forgetPassword,
  userInfoUrl,
  fileInfoUrl,
  RegisterUrl,
  RegisterConfirmUrl,
  RegisterCodeResend,
  uploadFileUrl,
  fileDownloadUrl,
  IconFontCnUrl,
};
