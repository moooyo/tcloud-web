import React, { useState, useEffect, useContext } from 'react';
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
  TreeSelect,
  Select,
} from 'antd';
import moment from 'moment';
import { FileInfo } from '@/pages/cloud/components/file';
import { course } from '@/components/course';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { tagUrl, fileInfoUrl, courseUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { StateContext } from '../_layout';
import { ClassInfo } from '@/components/class';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
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
      return renderTags(data);
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
  const layoutState = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [source, setSource] = useState(defaultSource);
  const [modal, contextHolder] = Modal.useModal();
  const [status, setStatus] = useState({
    limit: 30,
    offset: 0,
  });
  const [form] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const url =
          courseUrl +
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

  const rowSelection = {
    select,
    onChange: (selectKey: any) => {
      setSelect(selectKey);
    },
  };
  const CourseAction = (props: any) => {
    const ModalFormContent = (props: any) => {
      const defaultTags: tag[] = [];
      const [tags, setTags] = useState(defaultTags);
      const defaultTreeNodeSource = [
        {
          id: layoutState.user.DiskRoot,
          value: layoutState.user.DiskRoot.toString(),
          title: '我的文件',
          isLeaf: false,
          pid: 0,
        },
      ];
      const defaultClassSelect: ClassInfo[] = [];
      const ref = React.createRef<Input>();
      const [mockID, setMockID] = useState(-1);
      const [inputVisible, setInputVisible] = useState(false);
      const [select, setSelect] = useState(undefined);
      const [nodeSource, setNodeSoure] = useState(defaultTreeNodeSource);
      const [classSelect, setClassSelect] = useState(defaultClassSelect);
      const [classVisible, setClassVisible] = useState(false);

      const handleClose = (removedTag: any) => {
        const nextTags = tags.slice().filter((tag: any) => tag !== removedTag);
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
      const genTreeNode = (pid: number, file: FileInfo) => {
        return {
          id: file.ID,
          value: file.ID.toString(),
          title: file.Name,
          isLeaf: !file.IsDirectory,
          pid: pid,
        };
      };
      const { Option } = Select;
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
              console.log(v);
              const nextSource = classSelect.slice().filter(e => e.ID !== v);
              const index = layoutState.classList.findIndex(i => i.ID === v);
              if (index !== -1) {
                nextSource.push(layoutState.classList[index]);
              }
              setClassSelect(nextSource);
              setClassVisible(false);
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
      const onLoadData = (treeNode: any) => {
        return new Promise((resolve, reject) => {
          const pathID = treeNode.id;
          (async () => {
            const url =
              fileInfoUrl + '?path=' + pathID + '&offset=0&limit=1000';
            try {
              const res = await fetch(url, {
                method: 'GET',
              });
              const resp = await res.json();
              if (resp.code === ErrorCode.OK) {
                const source = nodeSource.slice();
                resp.data.map((e: FileInfo) => {
                  source.push(genTreeNode(pathID, e));
                }),
                  setNodeSoure(source);
                resolve();
              } else {
                notification['error']({
                  message: '获取数据失败',
                  description: resp.message,
                });
                reject();
              }
            } catch (e) {
              console.log(e);
              reject(e);
            }
          })();
        });
      };
      return (
        <Form
          form={form}
          onFinish={() => {
            (async () => {
              try {
                const name = form.getFieldValue('name');
                const desc = form.getFieldValue('description');
                const startTime = form.getFieldValue('time')[0].unix();
                const endTime = form.getFieldValue('time')[1].unix();
                const files: number[] = [];
                const classID: number[] = [];
                classSelect.forEach(e => {
                  classID.push(e.ID);
                });
                if (select !== undefined) {
                  //@ts-ignore
                  select.forEach(e => {
                    files.push(parseInt(e));
                  });
                }
                const res = await fetch(courseUrl, {
                  method: 'POST',
                  body: JSON.stringify({
                    name: name,
                    description: desc,
                    startTime: startTime,
                    endTime: endTime,
                    tags: tags,
                    files: files,
                    class: classID,
                  }),
                });
              } catch (e) {
                console.log(e);
              } finally {
                form.resetFields();
              }
            })();
          }}
        >
          <Form.Item name={'name'} label={'课程'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={'描述'}
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name={'time'} label={'时间'} rules={[{ required: true }]}>
            <RangePicker showTime={{ format: 'HH:mm' }} />
          </Form.Item>
          <Form.Item name={'tags'} style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item label={'标签'}>
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
                <PlusOutlined /> 添加标签
              </Tag>
            )}
          </Form.Item>
          <Form.Item name={'files'} label={'文件'}>
            <TreeSelect
              treeDataSimpleMode
              style={{ width: '100%' }}
              value={select}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              onChange={(v: any) => {
                setSelect(v);
              }}
              loadData={onLoadData}
              treeData={nodeSource}
              allowClear
              multiple
            />
          </Form.Item>
          <Form.Item label={'班级'}>
            {classSelect.map((e: ClassInfo) => {
              return (
                <Tag
                  closable
                  key={e.ID}
                  onClose={(v: ClassInfo) => {
                    const next = classSelect.slice().filter(e => e !== v);
                    setClassSelect(next);
                  }}
                >
                  {e.Name}
                </Tag>
              );
            })}
            {classVisible ? (
              classSelctContext
            ) : (
              <Tag
                onClick={() => {
                  setClassVisible(true);
                }}
              >
                <PlusOutlined /> 添加班级
              </Tag>
            )}
          </Form.Item>
        </Form>
      );
    };
    const onSubmit = () => {
      return new Promise((resolve, reject) => {
        const name = form.getFieldValue('name');
        const desc = form.getFieldValue('description');
        const time = form.getFieldValue('time');
        if (name === undefined || desc == undefined || time == undefined) {
          reject();
          return;
        } else {
          form.submit();
          resolve();
        }
      });
    };
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
                Modal.confirm({
                  centered: true,
                  content: <ModalFormContent />,
                  title: '添加课程',
                  onOk: onSubmit,
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
