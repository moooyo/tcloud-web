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
  notification,
} from 'antd';
import moment from 'moment';
import { FileInfo } from '@/pages/cloud/components/file';
import { course } from '@/components/course';
import { PlusOutlined } from '@ant-design/icons';
import { tagUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
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
    const defaultTags: tag[] = [];
    const [tags, setTags] = useState(defaultTags);
    const [inputVisible, setInputVisible] = useState(false);
    const [mockID, setMockID] = useState(-1);
    const ref = React.createRef<Input>();
    const handleClose = (removedTag: any) => {
      const nextTags = tags.slice().filter(tag => tag !== removedTag);
      setTags(nextTags);
    };
    const handleConfirm = () => {
      if (!ref.current || ref.current.state.value == undefined) {
        setInputVisible(false);
      } else {
        //@ts-ignore
        const index = tags.findIndex(e => e.Name === ref.current.state.value);
        if (index === -1) {
          const nextTags = tags.slice();
          const mockTag: tag = {
            ID: mockID,
            Name: ref.current.state.value,
          };
          nextTags.push(mockTag);
          setTags(nextTags);
          setMockID(mockID - 1);
        }
        setInputVisible(false);
      }
    };

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
          {tags.map((e: tag) => {
            return (
              <Tag
                closable
                color={colors[Math.floor(Math.random() * colors.length)]}
                style={{
                  width: '50px',
                  height: '24px',
                  textAlign: 'center',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={e.ID}
                onClose={handleClose}
              >
                {e.Name}
              </Tag>
            );
          })}
          {inputVisible ? (
            <Input
              ref={ref}
              size={'small'}
              onBlur={handleConfirm}
              onPressEnter={handleConfirm}
            />
          ) : (
            <Tag
              className="site-tag-plus"
              onClick={() => {
                setInputVisible(true);
              }}
            >
              <PlusOutlined /> New Tag
            </Tag>
          )}
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
