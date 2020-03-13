let dev = false;
let yapi = true;
let baseUrl = "";
if (dev) {
  if (yapi) {
    baseUrl = "http://localhost:3333/mock/9"
  } else {
    baseUrl = "/api";
  }
} else {
  baseUrl = "http://localhost:8080"
}

let loginUrl = baseUrl + "/session";
let forgetPassword = baseUrl + "/forget";
let userInfoUrl = baseUrl + '/session';

let fileInfoUrl = baseUrl + "/files";

let UsersBaseUrl = baseUrl + "/users";
let RegisterUrl = UsersBaseUrl;
let RegisterConfirmUrl = UsersBaseUrl + "/confirm";
let RegisterCodeResend = UsersBaseUrl + "/code";

export {loginUrl, forgetPassword, userInfoUrl, fileInfoUrl, RegisterUrl, RegisterConfirmUrl, RegisterCodeResend};
