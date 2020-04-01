let dev = true;
let baseUrl = '';
if (dev) {
  baseUrl = '/api';
} else {
  baseUrl = 'http://tcloud.lengyu.me/api';
}

let loginUrl = baseUrl + '/session';
let forgetPassword = baseUrl + '/forget';

let infoUrl = baseUrl + '/info';
let userInfoUrl = infoUrl + '/user';

let fileInfoUrl = baseUrl + '/files';
let directoryCreateUrl = fileInfoUrl + "/directory";
let fileDownloadUrl = fileInfoUrl + '/download';

let uploadFileUrl = fileInfoUrl;

let UsersBaseUrl = baseUrl + '/users';
let RegisterUrl = UsersBaseUrl;
let RegisterConfirmUrl = UsersBaseUrl + '/confirm';
let RegisterCodeResend = UsersBaseUrl + '/code';

let IconFontCnUrl = '//at.alicdn.com/t/font_1704308_ro3tnm4hp89.js\n';

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
  directoryCreateUrl
};
