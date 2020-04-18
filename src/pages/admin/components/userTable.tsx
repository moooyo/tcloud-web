import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { UsersBaseUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
interface userDBInfo {
  ID: number;
  CreatedAt: number;
  UpdatedAt: number;
  Nickname: string;
  Email: string;
  Class: number;
  Type: number;
  Status: number;
}
const mockList: userDBInfo[] = [
  {
    ID: 1,
    CreatedAt: 1587217563,
    UpdatedAt: 1587217563,
    Nickname: 'ccc',
    Email: 'ccc@qq.com',
    Class: 0,
    Type: 0,
    Status: 3,
  },
  {
    ID: 2,
    CreatedAt: 1587217563,
    UpdatedAt: 1587217563,
    Nickname: 'bbb',
    Email: 'bbb@qq.com',
    Class: 1,
    Type: 0,
    Status: 3,
  },
  {
    ID: 3,
    CreatedAt: 1587217563,
    UpdatedAt: 1587217563,
    Nickname: 'eee',
    Email: 'eee@qq.com',
    Class: 1,
    Type: 1,
    Status: 3,
  },
];
const columns = [
  {
    title: '序号',
    dataIndex: 'ID',
    key: 'ID',
    align: 'center',
  },
  {
    title: '昵称',
    dataIndex: 'Nickname',
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'Email',
    align: 'center',
  },
  {
    title: '班级',
    dataIndex: 'Class',
    render: (text: number) => {
      return <span>软件xs1604</span>;
    },
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedAt',
    render: (text: number) => {
      return <span>{moment(text).format()}</span>;
    },
    align: 'center',
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    render: (text: number) => {
      return <span>正常</span>;
    },
    align: 'center',
    filters: [
      {
        text: '注册未验证',
        value: 2,
      },
      {
        text: '正常',
        value: 3,
      },
      {
        text: '封停',
        value: 4,
      },
      {
        text: '删除',
        value: 5,
      },
    ],
    onFilter: (value: number, record: userDBInfo) => {
      if (value === 2) {
        return record.Status <= 2;
      } else {
        return record.Status === value;
      }
    },
  },
];

const defaultSource: userDBInfo[] = [];
const UserTable = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    limit: 30,
    offset: 0,
  });
  const [source, setSource] = useState(defaultSource);
  const formatUrl = (offset: number, limit: number) => {
    return (
      UsersBaseUrl +
      '?offset=' +
      offset.toString() +
      '&limit=' +
      limit.toString()
    );
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(formatUrl(status.offset, status.limit), {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          let next = source.slice();
          for (const e of resp.data) {
            next.push(e);
          }
          setSource(next);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [status]);
  return (
    <Table
      //@ts-ignore
      columns={columns}
      dataSource={source}
      size={'small'}
      pagination={false}
      loading={loading}
    />
  );
};

export default UserTable;
