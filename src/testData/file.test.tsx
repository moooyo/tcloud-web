import {FileInfo} from "@/pages/cloud/components/file";

let testFile: FileInfo = {
  key: 1,
  fileName: "test1",
  size: 123,
  editTime: 1583504174,
  isDirectory: false,
};
let fileData: FileInfo[] = [
  {
    key: 1,
    fileName: "test1",
    size: 123,
    editTime: 1583504173000,
    isDirectory: false,
  },
  {
    key: 2,
    fileName: "test2",
    size: 123,
    editTime: 1583504173000,
    isDirectory: true
  }, {
    key: 3,
    fileName: "test2",
    size: 123456,
    editTime: 1583504173000,
    isDirectory: false
  }
];
export {testFile, fileData}
