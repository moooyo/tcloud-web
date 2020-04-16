import React, { useState, useEffect } from 'react';
import { file2img, size2str } from '@/components/fileTable';
import moment from 'moment';
import { Table, Row, Col, Button, notification, Popconfirm } from 'antd';
import style from './trash.module.css';
import {
  DeleteOutlined,
  IeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { IconFont } from '@/components/utils';
import { fileChangeUrl, trashListUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
interface TrashInfo {
  ID: number;
  Name: string;
  Size: number;
  IsDirectory: boolean;
  DeletedAt: number;
  Type: number;
}

const columns = [
  {
    title: '文件名',
    dataIndex: 'Name',
    width: '50%',
    sorter: (rowA: TrashInfo, rowB: TrashInfo) => {
      return rowA.Name > rowB.Name;
    },
    render: (fileName: string, record: TrashInfo) => {
      return (
        <span>
          <span style={{ marginRight: '10px' }}>
            {file2img(record.IsDirectory, record.Type)}
          </span>
          <span>{fileName}</span>
        </span>
      );
    },
  },
  {
    title: '大小',
    dataIndex: 'Size',
    width: '15%',
    sorter: (rowA: TrashInfo, rowB: TrashInfo) => {
      return rowA.Size > rowB.Size;
    },
    render: (text: number, record: TrashInfo) => {
      if (record.IsDirectory) {
        return <span style={{ userSelect: 'none' }}>-</span>;
      } else {
        return <span style={{ userSelect: 'none' }}>{size2str(text)}</span>;
      }
    },
  },
  {
    title: '删除时间',
    dataIndex: 'DeleteAt',
    sorter: (rowA: TrashInfo, rowB: TrashInfo) => {
      return rowA.DeletedAt > rowB.DeletedAt;
    },
    render: (time: number, record: TrashInfo) => {
      return (
        <span style={{ userSelect: 'none' }}>
          {moment(time).format('YYYY-MM-DD HH:mm')}
        </span>
      );
    },
  },
  {
    title: '有效期',
    dataIndex: 'DeleteAt',
    sorter: (rowA: TrashInfo, rowB: TrashInfo) => {
      return rowA.DeletedAt > rowB.DeletedAt;
    },
    render: (time: number, record: TrashInfo) => {
      const now = moment(new Date().getTime());
      const deleteTime = moment(time);
      const diff = now.diff(deleteTime, 'days');
      return <span style={{ userSelect: 'none' }}>{diff + '天'}</span>;
    },
  },
];
const defaultSelect: React.ReactText[] = [];

interface trashActionProps {
  select: React.ReactText[];
  deleteTrashFromList: (id: number[]) => void;
}

const TrashAction = (props: trashActionProps) => {
  const [loading, setLoading] = useState(false);

  const deleteFileClick = () => {
    if (props.select.length <= 0) {
      return;
    }
    const idStr = props.select.join(',');
    const url = fileChangeUrl + '/' + idStr + '?completely=true';
    (async () => {
      setLoading(true);
      try {
        let res = await fetch(url, {
          method: 'DELETE',
        });
        let resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          let ids: number[] = [];
          let ids_str = idStr.split(',');
          for (const i of ids_str) {
            let num = parseInt(i);
            ids.push(num);
          }
          props.deleteTrashFromList(ids);
        } else {
          notification['error']({
            message: '彻底删除文件错误',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  };
  const restoreFile = () => {
    if (props.select.length <= 0) {
      return;
    }
    const idStr = props.select.join(',');
    const url = fileChangeUrl + '/' + idStr + '?op=restore';
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          method: 'PATCH',
        });
        const resp = await res.json();
        props.deleteTrashFromList(resp.data);
        if (resp.code !== ErrorCode.OK) {
          notification['error']({
            message: '服务器错误',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className={style.actionBar}>
      <Button
        type={'primary'}
        icon={<IconFont type={'icon-huanyuan'} />}
        loading={loading}
        onClick={restoreFile}
      >
        恢复
      </Button>
      <Popconfirm
        title="确定要彻底删除这些文件?"
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        onConfirm={deleteFileClick}
      >
        <Button
          loading={loading}
          danger
          style={{
            marginLeft: '10px',
          }}
          icon={<DeleteOutlined />}
        >
          彻底删除
        </Button>
      </Popconfirm>
    </div>
  );
};

interface loadInfoProps {
  count: number;
}

const defaultSource: TrashInfo[] = [];

const TrashLoadInfo = (props: loadInfoProps) => {
  return (
    <div
      style={{
        fontSize: '12px',
        marginBottom: '1vh',
        userSelect: 'none',
      }}
    >
      <Row>
        <Col flex={1}>
          <span
            style={{
              marginLeft: '15px',
            }}
          >
            送入回收站的文件会被保留14天
          </span>
        </Col>
        <Col
          flex={1}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <span
            style={{
              marginRight: '15px',
            }}
          >
            {'已加载' + props.count + '个'}
          </span>
        </Col>
      </Row>
    </div>
  );
};

interface trashTableProps {
  trashList: TrashInfo[];
  limit: number;
  offset: number;
  setTrashList: (list: TrashInfo[]) => void;
  setTrashStatus: (offset: number, limit: number) => void;
  trashInitLoad: boolean;
  setTrashInitLoad: (load: boolean) => void;
  deleteTrashFromList: (id: number[]) => void;
}

const TrashTable = (props: trashTableProps) => {
  const [select, setSelect] = useState(defaultSelect);
  const formatUrl = (offset: number, limit: number) => {
    return (
      trashListUrl +
      '?offset=' +
      offset.toString() +
      '&limit=' +
      limit.toString()
    );
  };
  useEffect(() => {
    if (props.trashInitLoad) {
      return;
    }
    props.setTrashInitLoad(true);
    (async () => {
      try {
        const res = await fetch(formatUrl(props.offset, props.limit), {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code !== ErrorCode.OK) {
          notification['error']({
            message: '获取数据源错误',
            description: resp.message,
          });
        } else {
          props.setTrashList(resp.data);
          props.setTrashStatus(props.limit, props.limit);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  });
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelect(selectedRowKeys);
  };
  return (
    <div>
      <TrashAction
        select={select}
        deleteTrashFromList={props.deleteTrashFromList}
      />
      <TrashLoadInfo count={14} />
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={props.trashList}
        pagination={false}
        size={'small'}
        loading={!props.trashInitLoad}
        rowSelection={{
          selectedRowKeys: select,
          fixed: true,
          onChange: onSelectChange,
        }}
        rowKey={(record: TrashInfo) => {
          return record.ID;
        }}
      />
    </div>
  );
};

export default TrashTable;

export { TrashInfo };
