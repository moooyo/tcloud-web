import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Space, Button, Input, Select } from 'antd';
import moment from 'moment';
import { UsersBaseUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
const { Search } = Input;
const { Option } = Select;
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
  const [select, setSelect] = useState([]);
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
  const UserTableAction = (props: any) => {
    return (
      <Row
        style={{
          marginLeft: '1vw',
          marginTop: '1vh',
          marginBottom: '1vh',
        }}
      >
        <Col flex={1}>
          <Space>
            <Button type={'primary'} disabled={select.length !== 1}>
              更改信息
            </Button>
            <Button danger>封停用户</Button>
            <Button>更改班级信息</Button>
            <Button>重置密码</Button>
          </Space>
        </Col>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          flex={1}
        >
          <Input.Group
            compact
            style={{
              width: '50%',
              marginRight: '1vw',
            }}
          >
            <Select
              defaultValue="0"
              style={{
                width: '30%',
              }}
            >
              <Option value="0">ID</Option>
              <Option value="1">邮箱</Option>
              <Option value="2">昵称</Option>
            </Select>
            <Search style={{ width: '70%' }} />
          </Input.Group>
        </Col>
      </Row>
    );
  };
  const onSelectChange = (selectedRowKeys: any) => {
    setSelect(selectedRowKeys);
  };
  const rowSelection = {
    select,
    onChange: onSelectChange,
  };

  return (
    <>
      <UserTableAction />
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={source}
        size={'small'}
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
      />
    </>
  );
};

export default UserTable;
