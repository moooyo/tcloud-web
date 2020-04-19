import React, { useState, useEffect } from 'react';
import { Table, notification, Row, Col, Space, Button } from 'antd';
import { ClassInfo } from '@/components/class';
import { classUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import moment from 'moment';

const columns = [
  {
    key: 'ID',
    dataIndex: 'ID',
    title: '序号',
    align: 'center',
  },
  {
    dataIndex: 'Name',
    title: '班级名称',
    align: 'center',
  },
  {
    dataIndex: 'Total',
    title: '总人数',
    align: 'center',
  },
  {
    dataIndex: 'Code',
    title: '邀请码',
    align: 'center',
  },
  {
    dataIndex: 'CreatedAt',
    title: '创建时间',
    align: 'center',
    render: (text: any) => {
      return moment(text).format();
    },
  },
];

const defaultSource: ClassInfo[] = [];

const ClassTable = (props: any) => {
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(defaultSource);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(classUrl, {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          setSource(resp.data);
        } else {
          notification['error']({
            message: '获取班级数据错误',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const ClassAction = (props: any) => {
    return (
      <Row
        style={{
          marginTop: '1vh',
          marginBottom: '1vh',
        }}
      >
        <Col
          style={{
            marginLeft: '1vw',
          }}
        >
          <Space>
            <Button type={'primary'}>添加班级</Button>
            <Button>重新生成邀请码</Button>
            <Button danger>删除班级</Button>
          </Space>
        </Col>
      </Row>
    );
  };

  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };
  return (
    <>
      <ClassAction />
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

export default ClassTable;
