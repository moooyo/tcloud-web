import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { courseNoticeRecord } from '@/components/course';
import { Row, Col, Space, Button, Table, notification } from 'antd';
import { noticeUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';

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
  const [status, setStatus] = useState({
    limit: 30,
    offset: 0,
  });
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url =
          noticeUrl +
          '?offset=' +
          status.offset.toString() +
          '&limit=' +
          status.limit.toString();
        const res = await fetch(url, {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          setSource(resp.data);
        } else {
          notification['error']({
            message: '获取数据失败',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [status]);
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
