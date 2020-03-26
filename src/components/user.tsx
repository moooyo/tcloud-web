interface UserInfo {
  Nickname: string;
  Class: string;
  Type: number;
  Email: string;
  Status: number;
  DiskRoot: number;
}

interface Todo {
  Name: string;
  StartTime: number;
  EndTime: number;
  /*
   * level:
   * 0: normal
   * 1: Important
   * 2: Urgent
   */
  Level: number;
  /*
   * Circle:
   * 0: not repeat
   * 1: everyday
   * n: n-day
   */
  Circle: number;
  Finished: boolean;
}

interface UserDetailInfo {
  NickName: string;
  RealName: string;
  Slogan: string;
  Class: string;
  Type: number;
  Email: string;
  Status: number;
  Location: string;
  CommentApprove: number;
  ArticleCount: number;
  PracticeCount: number;
  TodoList: Todo[];
}

let errorUser = {
  Nickname: 'Alice',
  Class: 'xs1604',
  Type: 0,
  Email: 'register@lengyu.me',
  Status: 3,
  DiskRoot: 0,
};

let todoList: Todo[] = [
  {
    Name: '动物之森',
    StartTime: 1585233935000,
    EndTime: 1590417935000,
    Level: 0,
    Circle: 0,
    Finished: false,
  },
  {
    Name: '写毕设',
    StartTime: 1585233935000,
    EndTime: 1590417935000,
    Level: 1,
    Circle: 0,
    Finished: false,
  },
  {
    Name: '搬砖',
    StartTime: 1585233935000,
    EndTime: 1590417935000,
    Level: 2,
    Circle: 0,
    Finished: false,
  },
  {
    Name: '搬砖',
    StartTime: 1585233935000,
    EndTime: 1590417935000,
    Level: 2,
    Circle: 0,
    Finished: true,
  },
];

let initUserDetail: UserDetailInfo = {
  NickName: 'Alice',
  RealName: 'ccc',
  Slogan: 'Day Day Up',
  Class: 'xs1604',
  Type: 0,
  Email: 'aaa@qq.com',
  Status: 3,
  Location: '家里蹲',
  CommentApprove: 3,
  ArticleCount: 5,
  PracticeCount: 78,
  TodoList: todoList,
};

export { UserInfo, errorUser, UserDetailInfo, initUserDetail, Todo };
