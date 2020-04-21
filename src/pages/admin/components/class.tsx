import React, { useState, useEffect } from 'react';
import { Table, notification, Row, Col, Space, Button, Input } from 'antd';
import { ClassInfo } from '@/components/class';
import { classUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import moment from 'moment';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const defaultSource: ClassInfo[] = [];
const defaultSelect: number[] = [];
const ClassTable = (props: any) => {
  const [select, setSelect] = useState(defaultSelect);
  const [loading, setLoading] = useState(true);
  const [actionButtonLoading, setActionButtonLoading] = useState(false);
  const [source, setSource] = useState(defaultSource);
  const [changeNameID, setChangeNameID] = useState(0);
  const [changeNameButtonLoading, setChangeNameButtonLoading] = useState(false);
  const changeNameRef = React.createRef<Input>();

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
            <Button
              type={'primary'}
              onClick={() => {
                const nextSource = source.slice();
                nextSource.push({
                  ID: -1, // mockID
                  Name: 'init',
                  Code: '000',
                  Total: 0,
                  CreatedAt: new Date().getTime(),
                });
                setSource(nextSource);
              }}
            >
              添加班级
            </Button>
            <Button
              disabled={select.length !== 1}
              onClick={() => {
                if (select.length !== 1) {
                  return;
                }
                setChangeNameID(select[0]);
              }}
            >
              修改名称
            </Button>
            <Button
              disabled={select.length !== 1}
              onClick={() => {
                if (select.length === 0) {
                  return;
                }
                (async () => {
                  setActionButtonLoading(true);
                  try {
                    const url = classUrl + '/' + select[0] + '?op=code';
                    const res = await fetch(url, {
                      method: 'PATCH',
                    });
                    const resp = await res.json();
                    if (resp.code === ErrorCode.OK) {
                      const nextSource = source
                        .slice()
                        .filter(e => e.ID !== select[0]);
                      nextSource.push(resp.data);
                      setSource(nextSource);
                    }
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setActionButtonLoading(false);
                  }
                })();
              }}
              loading={actionButtonLoading}
            >
              重新生成邀请码
            </Button>
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
      render: (name: string, record: ClassInfo) => {
        if (record.ID === changeNameID || record.ID === -1) {
          return (
            <span>
              <Input
                defaultValue={name}
                ref={changeNameRef}
                style={{ width: '60%' }}
                size={'small'}
              />
              <Button
                type={'primary'}
                size={'small'}
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  if (record.ID === -1) {
                    (async () => {
                      setChangeNameButtonLoading(true);
                      try {
                        const res = await fetch(classUrl, {
                          method: 'POST',
                          body: JSON.stringify({
                            name: changeNameRef.current
                              ? changeNameRef.current.state.value
                              : 'init',
                          }),
                        });
                        const resp = await res.json();
                        if (resp.code === ErrorCode.OK) {
                          const nextSource = source
                            .slice()
                            .filter(e => e.ID !== -1);
                          nextSource.push(resp.data);
                          setSource(nextSource);
                        } else {
                          notification['error']({
                            message: '创建错误',
                            description: resp.message,
                          });
                        }
                      } catch (e) {
                        console.log(e);
                      } finally {
                        setChangeNameButtonLoading(false);
                      }
                    })();
                  } else {
                    (async () => {
                      if (changeNameRef.current === null) {
                        return;
                      }
                      setChangeNameButtonLoading(true);
                      try {
                        const url =
                          classUrl +
                          '/' +
                          select[0].toString() +
                          '?op=name&name=' +
                          changeNameRef.current.state.value;
                        const res = await fetch(url, {
                          method: 'PATCH',
                        });
                        const resp = await res.json();
                        if (resp.code === ErrorCode.OK) {
                          const nextSource = source
                            .slice()
                            .filter(e => e.ID !== select[0]);
                          nextSource.push(resp.data);
                          setSource(nextSource);
                          setChangeNameID(0);
                        } else {
                          notification['error']({
                            message: '修改错误',
                            description: resp.message,
                          });
                        }
                      } catch (e) {
                        console.log(e);
                      } finally {
                        setChangeNameButtonLoading(false);
                      }
                    })();
                  }
                }}
                loading={changeNameButtonLoading}
              >
                <CheckOutlined />
              </Button>
              <Button
                size={'small'}
                style={{ marginLeft: '5px' }}
                onClick={(e: any) => {
                  if (record.ID === -1) {
                    const nextSource = source.slice().filter(e => {
                      return e.ID !== -1;
                    });
                    setSource(nextSource);
                  } else {
                    setChangeNameID(0);
                  }
                }}
                loading={changeNameButtonLoading}
              >
                <CloseOutlined />
              </Button>
            </span>
          );
        } else {
          return <span>{name}</span>;
        }
      },
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
        rowKey={(record: ClassInfo) => {
          return record.ID;
        }}
      />
    </>
  );
};

export default ClassTable;
