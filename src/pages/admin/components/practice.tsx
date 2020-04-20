import React, { useState } from 'react';
import { renderTag } from '@/pages/practice/components/tags';
import { tag, practiceRecord } from '@/components/practice';
import { Row, Col, Space, Button, Table } from 'antd';

/*
interface tag {
  ID: number;
  Name: string;
}
interface practiceRecord {
  ID: number;
  OJ: number;
  Title: string;
  URL: string;
  Total: number;
  AcRate: number;
  Tags: tag[];
  Class: number[];
  Course: number[];
}
*/
const columns = [
  {
    key: 'ID',
    dataIndex: 'ID',
    align: 'center',
    title: '序号',
  },
  {
    dataIndex: 'OJ',
    align: 'center',
    render: (text: number) => {
      return <span>PKU</span>;
    },
    title: '练习平台',
  },
  {
    dataIndex: 'Title',
    title: '题目',
  },
  {
    dataIndex: 'Url',
    title: '练习地址',
  },
  {
    dataIndex: 'Total',
    align: 'center',
    title: '总计练习人数',
  },
  {
    dataIndex: 'AcRate',
    align: 'center',
    render: (text: number) => {
      return text.toFixed(2).toString() + '%';
    },
    title: '通过率',
  },
  {
    dataIndex: 'Tags',
    align: 'center',
    render: (val: tag[]) => {
      return val.map((e: tag) => {
        return renderTag(e);
      });
    },
    title: '标签',
  },
  {
    dataIndex: 'Class',
    align: 'center',
    render: (val: number[]) => {
      return <span>软件xs1604</span>;
    },
    title: '练习班级',
  },
  {
    dataIndex: 'Course',
    align: 'center',
    render: (val: number[]) => {
      return <span>程序设计基础</span>;
    },
    title: '对应课程',
  },
];

const defaultSource: practiceRecord[] = [];

const PracticeTable = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [source, setSource] = useState(defaultSource);
  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };
  const PracticeAction = (props: any) => {
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
            <Button type={'primary'}>添加练习</Button>
            <Button>修改练习</Button>
            <Button>绑定至班级</Button>
            <Button>绑定至课程</Button>
            <Button danger>删除练习</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <PracticeAction />
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

export default PracticeTable;
