import React, { useState, useContext } from 'react';
import { renderTag } from '@/pages/practice/components/tags';
import { tag, practiceRecord } from '@/components/practice';
import {
  Row,
  Col,
  Space,
  Button,
  Table,
  Modal,
  Form,
  Select,
  InputNumber,
  Input,
  Tag,
} from 'antd';
import { StateContext } from '../_layout';
import { ClassInfo } from '@/components/class';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
const { Option } = Select;

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
const PracticeTable = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [source, setSource] = useState(defaultSource);
  const [modal, contextHolder] = Modal.useModal();
  const layoutState = useContext(StateContext);
  const selectRef = React.createRef<Select>();
  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };
  const [form] = Form.useForm();
  const createPracticeConfig = {
    title: '添加练习',
    content: (
      <Form form={form}>
        <Form.Item name={'oj'} label={'平台'} rules={[{ required: true }]}>
          <Select>
            <Option value={1} key={1}>
              PKU
            </Option>
            <Option value={2} key={2}>
              HDU
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={'problem_id'}
          label={'题号'}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    ),
  };

  const ClassSelect = () => {
    const defaultSource: ClassInfo[] = [];
    const [source, setSource] = useState(defaultSource);
    const [selectVisible, setSelectVisible] = useState(false);
    const classSelctContext = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Select
          placeholder={'选择班级'}
          defaultValue={0}
          onChange={(v: number) => {
            const nextSource = source.slice().filter(e => e.ID !== v);
            const index = layoutState.classList.findIndex(i => i.ID === v);
            if (index !== -1) {
              nextSource.push(layoutState.classList[index]);
            }
            setSource(nextSource);
          }}
        >
          <Option value={0} key={0}>
            暂不选择
          </Option>
          {layoutState.classList.map(e => (
            <Option value={e.ID} key={e.ID}>
              {e.Name}
            </Option>
          ))}
        </Select>
      </div>
    );
    return (
      <>
        {source.map((e: ClassInfo) => {
          return (
            <Tag
              closable
              key={e.ID}
              onClose={(v: ClassInfo) => {
                const nextSource = source.slice().filter(e => e !== v);
                setSource(nextSource);
              }}
            >
              {e.Name}
            </Tag>
          );
        })}
        {selectVisible ? (
          classSelctContext
        ) : (
          <Tag
            onClick={() => {
              setSelectVisible(true);
            }}
          >
            <PlusOutlined /> 添加班级
          </Tag>
        )}
      </>
    );
  };

  const classSelectConfig = {
    title: '选择班级',
    content: <ClassSelect />,
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
            <Button
              type={'primary'}
              onClick={() => {
                modal.confirm(createPracticeConfig);
              }}
            >
              添加练习
            </Button>
            <Button
              onClick={() => {
                modal.confirm(classSelectConfig);
              }}
            >
              绑定至班级
            </Button>
            <Button>绑定至课程</Button>
            <Button danger>删除练习</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  return (
    <>
      {contextHolder}
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
