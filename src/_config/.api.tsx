let dev = true;
let yapi = true;
let baseUrl = "";
if (dev) {
  if (yapi) {
    baseUrl = "http://localhost:3333/mock/9"
  } else {
    baseUrl = "/api";
  }
} else {
  baseUrl = "/"
}

let loginUrl = baseUrl + "/session";
let forgetPassword = baseUrl + "/forget";
let userInfoUrl = baseUrl + '/session';

let fileInfoUrl = baseUrl + "/files";

export {loginUrl, forgetPassword, userInfoUrl, fileInfoUrl};
