const dev = true;
let baseUrl = '';
if (dev) {
  baseUrl = '/api';
} else {
  baseUrl = 'http://tcloud.lengyu.me/api';
}

const classUrl = baseUrl + '/class';

const loginUrl = baseUrl + '/session';
const forgetPassword = baseUrl + '/forget';

const infoUrl = baseUrl + '/info';
const userInfoUrl = infoUrl + '/user';

const fileInfoUrl = baseUrl + '/files';
const trashListUrl = fileInfoUrl + '/trash';
const directoryCreateUrl = fileInfoUrl + '/directory';
const fileDownloadUrl = fileInfoUrl + '/download';

const fileChangeUrl = baseUrl + '/file';

const uploadFileUrl = fileInfoUrl;

const UsersBaseUrl = baseUrl + '/users';
const RegisterUrl = UsersBaseUrl;
const RegisterConfirmUrl = UsersBaseUrl + '/confirm';
const RegisterCodeResend = UsersBaseUrl + '/code';
const userUrl = baseUrl + '/user';

const shareFileBaseUrl = baseUrl + '/share';
const tagUrl = baseUrl + '/tag';
const courseUrl = baseUrl + '/course';
const courseDirectoryUrl = courseUrl + '/directory';
const practiceUrl = baseUrl + '/practice';
const noticeUrl = baseUrl + '/notice';

const IconFontCnUrl = '//at.alicdn.com/t/font_1704308_poggm1ik2gl.js';
const userIconUrl =
  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

export {
  courseDirectoryUrl,
  noticeUrl,
  practiceUrl,
  courseUrl,
  tagUrl,
  userUrl,
  classUrl,
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
  directoryCreateUrl,
  fileChangeUrl,
  shareFileBaseUrl,
  userIconUrl,
  trashListUrl,
  UsersBaseUrl,
};
