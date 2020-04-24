import React, { useState, useContext, useEffect } from 'react';
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
  notification,
} from 'antd';
import { StateContext } from '../_layout';
import { ClassInfo } from '@/components/class';
import { PlusOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { practiceUrl, courseUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { destroyFns } from 'antd/lib/modal/Modal';
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
    render: (val: tag[] | null) => {
      if (val === null) {
        return '';
      } else {
        return val.map((e: tag) => {
          return renderTag(e);
        });
      }
    },
    title: '标签',
  },
  {
    dataIndex: 'Class',
    align: 'center',
    render: (val: ClassInfo[] | null) => {
      if (val !== null) {
        return val.map((e: ClassInfo) => {
          return <Tag>{e.Name}</Tag>;
        });
      } else {
        return '';
      }
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
  const [status, setStatus] = useState({
    offset: 0,
    limit: 30,
  });
  const [modal, contextHolder] = Modal.useModal();
  const layoutState = useContext(StateContext);
  const selectRef = React.createRef<Select>();
  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url =
          practiceUrl +
          '?limit=' +
          status.limit.toString() +
          '&offset=' +
          status.offset.toString();
        const res = await fetch(url, {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          setSource(resp.data);
        } else {
          notification['error']({
            message: '加载失败',
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
    onOk: () => {
      return new Promise((resolve, reject) => {
        const oj = form.getFieldValue('oj');
        const id = form.getFieldValue('problem_id');
        if (oj === undefined || id === undefined) {
          reject();
          return;
        }
        (async () => {
          try {
            const res = await fetch(practiceUrl, {
              method: 'POST',
              body: JSON.stringify({
                oj: oj,
                id: id,
              }),
            });
            const resp = await res.json();
            if (resp.code === ErrorCode.OK) {
              notification['success']({
                message: '创建成功',
                description: '刷新后查看',
              });
              resolve();
            } else {
              notification['error']({
                message: '创建失败',
                description: resp.message,
              });
              reject();
            }
          } catch (e) {
            reject(e);
          }
        })();
      });
    },
  };
  const defaultSelectSource: ClassInfo[] = [];
  let uploadClass = defaultSelectSource;
  const ClassSelect = () => {
    const [source, setSource] = useState(defaultSelectSource);
    const [selectVisible, setSelectVisible] = useState(false);
    useEffect(() => {
      uploadClass = source;
    }, [source]);
    const classSelctContext = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Select
          placeholder={'选择班级'}
          onChange={(v: number) => {
            if (v === 0) {
              setSelectVisible(false);
              return;
            }
            const nextSource = source.slice().filter(e => e.ID !== v);
            const index = layoutState.classList.findIndex(i => i.ID === v);
            if (index !== -1) {
              nextSource.push(layoutState.classList[index]);
            }
            setSource(nextSource);
            setSelectVisible(false);
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
  const generateOnOk = (v: ClassInfo[]) => {
    console.log(select);
    return new Promise((resolve, reject) => {
      if (v.length === 0) {
        reject();
        return;
      }
      (async () => {
        try {
          const url = practiceUrl + '/' + select[0] + '?op=class';
          const val: number[] = [];
          v.forEach(e => {
            val.push(e.ID);
          });
          const res = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
              class: val,
            }),
            headers: {
              'content-type': 'application/json',
            },
          });
          const resp = await res.json();
          if (resp.code === ErrorCode.OK) {
            notification['success']({
              message: '修改成功',
              description: '刷新后查看',
            });
            resolve();
          } else {
            notification['error']({
              message: '修改失败',
              description: resp.message,
            });
            throw new Error(resp.message);
          }
        } catch (e) {
          console.log(e);
          reject(e);
        }
      })();
    });
  };
  const classSelectConfig = {
    title: '选择班级',
    content: <ClassSelect />,
    onOk: () => generateOnOk(uploadClass),
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
        <Col flex={3}>
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
              disabled={select.length !== 1}
            >
              绑定至班级
            </Button>
            <Button>添加标签</Button>
            <Button danger>删除练习</Button>
          </Space>
        </Col>
        <Col
          flex={1}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            type={'link'}
            icon={<ReloadOutlined />}
            onClick={() => {
              setSource(defaultSource);
              setStatus({
                offset: 0,
                limit: 30,
              });
            }}
            style={{
              marginRight: '10px',
            }}
          ></Button>
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
        rowKey={(e: practiceRecord) => {
          return e.ID;
        }}
      />
    </>
  );
};

export default PracticeTable;
