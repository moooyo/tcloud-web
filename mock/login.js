let users = [{
  "username": "abc@qq.com",
  "password": "abc",
  "type": "student"
}, {
  "username": "aaa@qq.com",
  "password": "ccc",
  "type": "teacher",
}];

let success = {
  "code": "0",
  "message": "login success",
  "data": "",
};
let faild = {
  "code": "1001",
  "message": "username or password incorrect",
  "data": ""
};
export default {
  'POST /api/session': (req, res) => {
    let ok = false;
    for (let x of users) {
      if (JSON.stringify(x) === JSON.stringify(req.body)) {
        ok = true;
        break;
      }
    }
    if (ok) {
      res.json(success);
    } else {
      res.json(faild);
    }
  },
  'GET /api/session': {
    'name': "冷瑜",
    "className": "软件xs1604",
    "type": "student",
  }
}
