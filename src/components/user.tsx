interface UserInfo {
  Nickname: string;
  Class: string;
  Type: number;
  Email: string;
  Status: number;
  DiskRoot: number;
}

let errorUser = {
  Nickname: 'Alice',
  Class: 'xs1604',
  Type: 0,
  Email: 'register@lengyu.me',
  Status: 3,
  DiskRoot: 0,
};
export { UserInfo, errorUser };
