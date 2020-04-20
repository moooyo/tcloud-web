import React, { useState, useEffect } from 'react';
import { colors, tag } from '@/pages/practice/components/problem';
import {
  Tag,
  Table,
  Row,
  Col,
  Space,
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  DatePicker,
} from 'antd';
import moment from 'moment';
import { FileInfo } from '@/pages/cloud/components/file';
import { course } from '@/components/course';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
/*
interface course {
  Name: string;
  Tags: tag[];
  StartTime: number;
  EndTime: number;
  Description: string;
  FileList: FileInfo[];
  FilePath: routerArgs;
}
*/
const renderTags = (tags: tag[]) => {
  return (
    <div>
      {tags.map(e => {
        return (
          <Tag color={colors[Math.floor(Math.random() * colors.length)]}>
            {e.Name}
          </Tag>
        );
      })}
    </div>
  );
};

const columns = [
  {
    key: 'ID',
    dataIndex: 'ID',
    title: '序号',
    align: 'center',
  },
  {
    dataIndex: 'Name',
    title: '课程名称',
    align: 'center',
  },
  {
    dataIndex: 'Tags',
    title: '课程标签',
    align: 'center',
    render: (data: any) => {
      renderTags(data);
    },
  },
  {
    dataIndex: 'StartTime',
    title: '开始时间',
    align: 'center',
    render: (text: any) => {
      return moment(text).format();
    },
  },
  {
    dataIndex: 'EndTime',
    title: '结束时间',
    align: 'center',
    render: (text: any) => {
      return moment(text).format();
    },
  },
  {
    dataIndex: 'Description',
    title: '课程描述',
    align: 'center',
    render: (text: string) => {
      const str = text.slice(0, 150);
      return str;
    },
  },
  {
    dataIndex: 'FileList',
    title: '课程文件',
    align: 'center',
    render: (files: FileInfo[]) => {
      if (files.length > 1) {
        return files[0].Name + '等';
      } else if (files.length === 1) {
        return files[0].Name;
      } else {
        return '';
      }
    },
  },
];
const defaultSource: course[] = [];

const CourseTable = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [source, setSource] = useState(defaultSource);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };

  /*
interface course {
  Name: string;
  Tags: tag[];
  StartTime: number;
  EndTime: number;
  Description: string;
  FileList: FileInfo[];
  FilePath: routerArgs;
}
*/

  const ModalFormContent = () => {
    const [form] = Form.useForm();
    return (
      <Form form={form}>
        <Form.Item name={'name'} label={'课程名'} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={'description'}
          label={'课程描述'}
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name={'time'} label={'时间'} rules={[{ required: true }]}>
          <RangePicker showTime={{ format: 'HH:mm' }} />
        </Form.Item>
        <Form.Item name={'tags'} label={'标签'}>
          Tags
        </Form.Item>
        <Form.Item name={'files'} label={'课程文件'}>
          Content
        </Form.Item>
      </Form>
    );
  };

  const CourseAction = (props: any) => {
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
            <Button
              type={'primary'}
              onClick={() => {
                Modal.confirm({
                  centered: true,
                  content: <ModalFormContent />,
                  title: '添加课程',
                });
              }}
            >
              添加课程
            </Button>
            <Button>修改课程</Button>
            <Button>绑定至班级</Button>
            <Button danger>删除课程</Button>
          </Space>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <CourseAction />
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={source}
        size={'small'}
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
      />
      {contextHolder}
    </>
  );
};

export default CourseTable;
