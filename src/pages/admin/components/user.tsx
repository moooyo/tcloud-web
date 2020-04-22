import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Table,
  Row,
  Col,
  Space,
  Button,
  Input,
  Select,
  Popconfirm,
  notification,
  Modal,
  Form,
} from 'antd';
import moment from 'moment';
import { UsersBaseUrl, userUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { StateContext } from '../_layout';
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

const defaultSource: userDBInfo[] = [];
const defaultSelect: number[] = [];
const UserTable = (props: any) => {
  const layoutState = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    limit: 30,
    offset: 0,
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [source, setSource] = useState(defaultSource);
  const [select, setSelect] = useState(defaultSelect);
  const [modal, contextHolder] = Modal.useModal();
  const classFilters = [
    {
      text: '暂未设置',
      value: 0,
    },
  ];
  layoutState.classList.forEach(e => {
    classFilters.push({
      text: e.Name,
      value: e.ID,
    });
  });
  let classSelectValue = 0;
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
        for (const e of layoutState.classList) {
          if (e.ID === text) {
            return e.Name;
          }
        }
        return '暂未设置';
      },
      align: 'center',
      filters: classFilters,
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
      dataIndex: 'Status',
      render: (text: number) => {
        switch (text) {
          case 4:
            return '封停';
          default:
            return '正常';
        }
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
  const classSelectConfig = {
    title: '选择班级',
    content: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Select
          placeholder={'选择班级'}
          onChange={(v: number) => {
            classSelectValue = v;
          }}
          defaultValue={0}
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
    ),
    onOk: () => {
      if (classSelectValue === 0) {
        return;
      }
      return new Promise(async function(resolve, reject) {
        (async () => {
          try {
            const ids = select.join(',');
            const url = userUrl + '/' + ids + '?op=class';
            const res = await fetch(url, {
              method: 'PATCH',
              body: JSON.stringify({
                class: classSelectValue,
              }),
            });
            const resp = await res.json();
            if (resp.code === ErrorCode.OK) {
              notification['success']({
                message: '修改成功',
              });
              resolve();
            } else {
              notification['error']({
                message: '修改班级失败',
                description: resp.message,
              });
              throw new Error('operation error');
            }
          } catch (e) {
            console.log(e);
            reject(e);
          }
        })();
      });
    },
    onCancle: () => {
      classSelectValue = 0;
    },
  };
  const [form] = Form.useForm();
  const ChangeUserInfoForm = (props: any) => {
    const index = source.findIndex(e => {
      return e.ID === select[0];
    });
    if (index === -1) {
      return <></>;
    }
    const user = source[index];

    return (
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <Form
          form={form}
          initialValues={{
            nickname: user.Nickname,
            email: user.Email,
            class: user.Class,
          }}
        >
          <Form.Item name={'nickname'} label={'昵称'}>
            <Input />
          </Form.Item>
          <Form.Item name={'email'} label={'邮箱'}>
            <Input type={'email'} />
          </Form.Item>
          <Form.Item name={'password'} label={'密码'}>
            <Input.Password autoComplete={'off'} />
          </Form.Item>
          <Form.Item name={'class'} label={'班级'}>
            <Select
              placeholder={'选择班级'}
              onChange={(v: number) => {
                classSelectValue = v;
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
          </Form.Item>
        </Form>
      </div>
    );
  };

  const changeUserInfoConfig = {
    title: '更改信息',
    content: <ChangeUserInfoForm />,
    onOk: (close: any) => {
      return new Promise(function(resolve, reject) {
        (async () => {
          try {
            const url = userUrl + '/' + select[0].toString() + '?op=full';
            const res = await fetch(url, {
              method: 'PATCH',
              body: JSON.stringify(form.getFieldsValue()),
            });
            const resp = await res.json();
            if (resp.code === ErrorCode.OK) {
              resolve();
              const nextSource = source.slice().filter(e => e.ID !== select[0]);
              nextSource.push(resp.data);
              setSource(resp.data);
            } else {
              notification['error']({
                message: '修改失败',
                description: resp.message,
              });
              throw new Error('operation error.');
            }
          } catch (e) {
            reject(e);
          }
        })();
      });
    },
  };

  const UserTableAction = (props: any) => {
    return (
      <Row
        style={{
          marginLeft: '1vw',
          marginTop: '1vh',
          marginBottom: '1vh',
        }}
      >
        {contextHolder}
        <Col flex={1}>
          <Space>
            <Button
              type={'primary'}
              disabled={select.length !== 1}
              onClick={() => {
                modal.confirm(changeUserInfoConfig);
              }}
            >
              更改信息
            </Button>
            <Popconfirm
              title="确定要封停选中用户？"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={(e: any) => {
                (async () => {
                  try {
                    setButtonLoading(true);
                    const ids = select.join(',');
                    const url = userUrl + '/' + ids + '?op=ban';
                    const res = await fetch(url, {
                      method: 'PATCH',
                    });
                    const resp = await res.json();
                    if (resp.code === ErrorCode.OK) {
                      notification['success']({
                        message: '封禁成功',
                        description: '对应的用户已被封禁',
                      });
                    } else {
                      notification['error']({
                        message: '封禁失败',
                        description: resp.message,
                      });
                    }
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setButtonLoading(false);
                  }
                })();
              }}
            >
              <Button danger loading={buttonLoading}>
                封停用户
              </Button>
            </Popconfirm>
            <Button
              onClick={() => {
                modal.confirm(classSelectConfig);
              }}
            >
              更改班级信息
            </Button>
            <Button
              onClick={() => {
                notification['success']({
                  message: '重置密码邮件已经发送至对应邮箱',
                  description: '请通知对应用户进入邮箱查收重置密码邮件',
                });
              }}
            >
              重置密码
            </Button>
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
        rowKey={(record: userDBInfo) => record.ID}
      />
    </>
  );
};

export default UserTable;
