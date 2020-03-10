import mockjs from 'mockjs'
/*
interface FileInfo {
  key: number
  fileName: string
  editTime: number
  size: number
  isDirectory: boolean
}*/

export default {
  'GET /api/files': mockjs.mock({
    "code": 0,
    "message": "",
    "data|24": [{
      "fileName": "\w{6}",
      "key|+1": "0",
      "editTime|1520439978000-1583566557000": 1,
      "size|1-10000": 1,
      "isDirectory": false
    }]
  })
}
