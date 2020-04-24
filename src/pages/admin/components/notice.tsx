import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { courseNoticeRecord } from '@/components/course';
import {
  Row,
  Col,
  Space,
  Button,
  Table,
  notification,
  Modal,
  Input,
  Form,
  Select,
  Tag,
} from 'antd';
import { noticeUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { ClassInfo } from '@/components/class';
import { StateContext } from '../_layout';

const defaultSource: courseNoticeRecord[] = [];
const defualtSelect: number[] = [];
const NoticeTable = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(defualtSelect);
  const [source, setSource] = useState(defaultSource);
  const [status, setStatus] = useState({
    limit: 30,
    offset: 0,
  });
  const layoutState = useContext(StateContext);
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
        return moment(t * 1000).format('LLL');
      },
    },
    {
      dataIndex: 'Class',
      title: '通知班级',
      align: 'center',
      render: (c: ClassInfo[]) => {
        if (c !== null) {
          return c.map(e => {
            return <Tag>{e.Name}</Tag>;
          });
        } else {
          return '';
        }
      },
    },
  ];
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
    const [modal, contextHolder] = Modal.useModal();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Option } = Select;
    const createConfig = {
      title: '添加通知',
      content: (
        <Form form={form}>
          <Form.Item name={'title'} label={'标题'}>
            <Input />
          </Form.Item>
          <Form.Item name={'description'} label={'内容'}>
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name={'level'} label={'级别'}>
            <Select>
              <Option value={1} key={1}>
                普通
              </Option>
              <Option value={2} key={2}>
                重要
              </Option>
              <Option value={3} key={3}>
                紧急
              </Option>
            </Select>
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        return new Promise((resolve, reject) => {
          const title = form.getFieldValue('title');
          const desc = form.getFieldValue('description');
          const level = form.getFieldValue('level');
          if (
            title === undefined ||
            desc === undefined ||
            level === undefined
          ) {
            reject();
            return;
          }
          (async () => {
            try {
              const res = await fetch(noticeUrl, {
                method: 'POST',
                body: JSON.stringify({
                  title: title,
                  description: desc,
                  level: level,
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
                throw new Error(resp.data);
              }
            } catch (e) {
              console.log(e);
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
    const classSelectConfig = {
      title: '绑定至班级',
      content: <ClassSelect />,
      onOk: () => {
        return new Promise((resolve, reject) => {
          (async () => {
            try {
              const url = noticeUrl + '/' + select[0].toString() + '?op=class';
              const val: number[] = [];
              uploadClass.forEach(e => {
                val.push(e.ID);
              });
              const res = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify({
                  class: val,
                }),
              });
              const resp = await res.json();
              if (resp.code === ErrorCode.OK) {
                notification['success']({
                  message: '绑定成功',
                  description: '刷新后查看',
                });
                resolve();
              } else {
                notification['error']({
                  message: '绑定失败',
                  description: resp.message,
                });
                throw new Error(resp.data);
              }
            } catch (e) {
              console.log(e);
              reject(e);
            }
          })();
        });
      },
    };
    return (
      <Row
        style={{
          marginTop: '1vh',
          marginBottom: '1vh',
          marginLeft: '1vw',
        }}
      >
        {contextHolder}
        <Col flex={3}>
          <Space>
            <Button
              type={'primary'}
              onClick={() => {
                modal.confirm(createConfig);
              }}
            >
              添加通知
            </Button>
            <Button
              onClick={() => {
                modal.confirm(classSelectConfig);
              }}
              disabled={select.length !== 1}
            >
              绑定至班级
            </Button>
            <Button danger>删除通知</Button>
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
      <NoticeAction />
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={source}
        size={'small'}
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
        rowKey={(e: courseNoticeRecord) => {
          return e.ID;
        }}
      />
    </>
  );
};

export default NoticeTable;
