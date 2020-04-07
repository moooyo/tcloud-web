interface FileInfo {
  ID: number;
  Name: string;
  UpdatedAt: number;
  Size: number;
  MetaID: number;
  IsDirectory: boolean;
  Type: number;
}

const demoList:FileInfo[] = [{
 ID: 1,
 Name: "呀哈哈",
 UpdatedAt: 0,
 Size: 12443325,
 MetaID: 1,
 IsDirectory: false,
 Type: 1,
},{
  ID: 2,
  Name: "呀哈哈",
  UpdatedAt: 0,
  Size: 12443325,
  MetaID: 2,
  IsDirectory: false,
  Type: 1,
}]



export { FileInfo,demoList };
