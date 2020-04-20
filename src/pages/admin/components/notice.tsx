import React, { useState } from 'react';
import moment from 'moment';
import { courseNoticeRecord } from '@/components/course';
import { Row, Col, Space, Button, Table } from 'antd';

/*
interface courseNoticeRecord {
  ID: number;
  Title: string;
  Description: string;
  Level: number;
  Time: number;
  Class: number[];
}
*/
const columns = [
  {
    key: 'ID',
    dataIndex: 'ID',
    title: '序号',
    align: 'center',
  },
  {
    dataIndex: 'Title',
    title: '标题',
    align: 'center',
  },
  {
    dataIndex: 'Description',
    title: '通知内容',
  },
  {
    dataIndex: 'Level',
    title: '通知级别',
    align: 'center',
    render: (val: number) => {
      switch (val) {
        case 0:
          return '一般';
        case 1:
          return '重要';
        case 2:
          return '紧急';
      }
    },
  },
  {
    dataIndex: 'Time',
    title: '时间',
    align: 'center',
    render: (t: number) => {
      return moment(t).format();
    },
  },
  {
    dataIndex: 'Class',
    title: '通知班级',
    align: 'center',
    render: (c: number[]) => {
      return <span>软件1604班</span>;
    },
  },
];
const defaultSource: courseNoticeRecord[] = [];

const NoticeTable = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [source, setSource] = useState(defaultSource);
  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };
  const NoticeAction = (props: any) => {
    return (
      <Row
        style={{
          marginTop: '1vh',
          marginBottom: '1vh',
          marginLeft: '1vw',
        }}
      >
        <Col>
          <Space>
            <Button type={'primary'}>添加通知</Button>
            <Button>修改通知</Button>
            <Button>绑定至班级</Button>
            <Button danger>删除通知</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <NoticeAction />
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

export default NoticeTable;
