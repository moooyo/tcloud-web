import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Checkbox,
  Divider,
  Spin,
  notification,
} from 'antd';
import { FileInfo, demoList } from './file';
import { file2img } from '@/components/fileTable';
import moment from 'moment';
import { TableRowSelection } from 'antd/es/table/interface';
import { shareFileBaseUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { FieldNamesType } from 'antd/lib/cascader';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import style from './share.module.css';
import ReactDOM from 'react-dom';
import { CopyOutlined } from '@ant-design/icons';

interface ShareRecord {
  ID: number;
  ShareName: string;
  ShareFileType: number;
  ShareFileIsDirectory: boolean;
  CreateAt: number;
  InternalID: string;
  Secret: boolean;
  Password: string;
  Expired: number;
}
const onCopyToClipboardClick = (text: string) => {
  const str = text;
  const mask = document.createElement('input');
  mask.setAttribute('id', 'clipboard');
  document.body.appendChild(mask);
  mask.value = str;
  mask.focus();
  mask.select();
  document.execCommand('copy');
  mask.blur();
  document.body.removeChild(mask);
  notification['success']({
    message: '复制成功',
    description: str,
  });
};

interface shareActionProps {
  select: React.ReactText[];
  setSelect: any;
  selectAll: React.ReactText[];
}
const ShareAction = (props: shareActionProps) => {
  const display = props.select.length !== 0;
  const selectSet = new Set([...props.select]);
  const isSelectAll = (() => {
    let ret = true;
    props.selectAll.forEach(e => {
      if (!selectSet.has(e)) {
        ret = false;
        return ret;
      }
    });
    return ret;
  })();
  const onSelectAllClick = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if (checked) {
      props.setSelect(props.selectAll);
    } else {
      props.setSelect([]);
    }
  };
  return (
    <div>
      <Row
        style={{
          color: '#424e67',
          fontSize: '12px',
          marginTop: '10px',
          marginLeft: '10px',
        }}
      >
        <Col span={18}>
          <span>链接分享</span>
          <span
            style={{
              color: '#8e99b3',
              marginLeft: '5px',
            }}
          >
            (分享失败超过1年以上的链接记录将被自动清理)
          </span>
        </Col>
        <Col
          span={6}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <span style={{ marginRight: '10px' }}>已加载26个</span>
        </Col>
      </Row>
      <Row
        style={
          display
            ? {
                color: '#424e67',
                fontSize: '12px',
                marginTop: '10px',
                marginLeft: '10px',
              }
            : { display: 'none' }
        }
      >
        <Col
          style={{
            marginLeft: '60px',
          }}
        >
          <Checkbox checked={isSelectAll} onChange={onSelectAllClick} />
        </Col>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '15px',
          }}
        >
          已选中1个文件/文件夹
        </Col>
        <Col
          span={3}
          style={{
            marginLeft: '10px',
          }}
        >
          <Button type={'primary'} shape={'round'} size={'small'}>
            取消分享
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: '5px' }} />
    </div>
  );
};

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    width: '60%',
    sorter: (rowA: ShareRecord, rowB: ShareRecord) => {
      return rowA.ShareName > rowB.ShareName;
    },
    render: (fileName: string, record: ShareRecord) => {
      return (
        <span>
          <span style={{ marginRight: '10px' }}>
            {file2img(record.ShareFileIsDirectory, record.ShareFileType)}
          </span>
          <span>{record.ShareName}</span>
        </span>
      );
    },
  },
  {
    title: '分享时间',
    dataIndex: 'create_at',
    sorter: (rowA: ShareRecord, rowB: ShareRecord) => {
      return rowA.CreateAt > rowB.CreateAt;
    },
    render: (time: number, record: ShareRecord) => {
      return (
        <span style={{ userSelect: 'none' }}>
          {moment(time).format('YYYY-MM-DD HH:mm')}
        </span>
      );
    },
  },
];
// @ts-ignore
const defaultSelect: React.ReactText[] = [];
const defaultList: ShareRecord[] = [];

const ShareTable = (props: any) => {
  // @ts-ignore
  const [state, setState] = useState({
    select: defaultSelect,
    selectAll: defaultSelect,
    loading: true,
    limit: 30,
    offset: 0,
    shareList: defaultList,
  });
  const [init, setInit] = useState(false);
  const setSelect = (select: any) => {
    let nextState = {};
    Object.assign(nextState, state, {
      select: select,
    });
    //@ts-ignore
    setState(nextState);
  };
  useEffect(() => {
    if (!init) {
      setInit(true);
      (async () => {
        try {
          let ret = await fetch(
            shareFileBaseUrl +
              '?offset=' +
              state.offset +
              '&limit=' +
              state.limit,
          );
          let res = await ret.json();
          if (res.code !== ErrorCode.OK) {
            notification['error']({
              message: '数据加载错误',
              description: res.message,
            });
          } else {
            const recordList = res.data;
            let next: React.ReactText[] = [];
            recordList.forEach((e: any) => {
              next.push(e.InternalID);
            });
            let nextState = {};
            Object.assign(nextState, state, {
              shareList: recordList,
              selectAll: next,
              loading: false,
            });
            //@ts-ignore
            setState(nextState);
          }
        } catch (e) {
          let nextState = {};
          Object.assign(nextState, state, {
            loading: false,
          });
          // @ts-ignore
          setState(nextState);
        }
      })();
    }
  });
  const source = state.shareList;
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelect(selectedRowKeys);
  };
  const formatCopyText = (url: string, secret: boolean, code: string) => {
    let text = '分享链接: ' + url;
    if (secret) {
      text = text + ' 分享码: ' + code;
    }
    return text;
  };

  const generateCopyBar = (uuid: string, secret: boolean, code: string) => {
    const url = 'localhost/share/' + window.btoa(uuid);
    const onCopyButtonClicl = () => {
      const str = formatCopyText(url, secret, code);
      onCopyToClipboardClick(str);
    };
    return (
      <div className={style.copyBar}>
        <span>链接: </span>
        <a href={url} style={{ marginLeft: '5px' }}>
          {url}
        </a>
        {secret ? (
          <span>
            <span style={{ marginLeft: '5px' }}>提取码: </span>
            <span>{code}</span>
          </span>
        ) : (
          ''
        )}
        <Button
          icon={<CopyOutlined />}
          style={{ marginLeft: '5px' }}
          size={'small'}
          onClick={onCopyButtonClicl}
        >
          复制
        </Button>
      </div>
    );
  };

  const showHeader = state.select.length === 0;
  const expandable = {
    expandedRowRender: (record: ShareRecord) =>
      generateCopyBar(record.InternalID, record.Secret, record.Password),
    expandRowByClick: true,
  };
  return (
    <div>
      <Spin spinning={state.loading}>
        <ShareAction
          select={state.select}
          selectAll={state.selectAll}
          setSelect={setSelect}
        />
        <div
          style={{
            marginTop: '5px',
          }}
        >
          <Table
            expandable={expandable}
            rowKey={record => record.InternalID}
            rowSelection={{
              selectedRowKeys: state.select,
              fixed: true,
              onChange: onSelectChange,
            }}
            pagination={false}
            dataSource={source}
            // @ts-ignore
            columns={columns}
            size={'small'}
            showHeader={showHeader}
          />
        </div>
      </Spin>
    </div>
  );
};

export default ShareTable;
