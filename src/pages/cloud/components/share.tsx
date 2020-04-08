import React, { useState } from 'react';
import style from './share.module.css';
import {
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Form,
  Select,
  DatePicker,
  notification,
  Input,
} from 'antd';
import { CloseOutlined, createFromIconfontCN } from '@ant-design/icons';
import { IconFontCnUrl, shareFileBaseUrl } from '@/_config/.api';
import moment from 'moment';
import { ErrorCode } from '@/_config/error';
const { TabPane } = Tabs;

const IconFont = createFromIconfontCN({
  scriptUrl: IconFontCnUrl,
});

const linkTab = (
  <div className={style.selectTabs}>
    <div className={style.selectTabBox}>
      <IconFont type={'icon-share_link'} />
    </div>
    <div
      style={{
        paddingTop: '10px',
      }}
    >
      链接分享
    </div>
  </div>
);

const userTab = (
  <div className={style.selectTabs}>
    <div className={style.selectTabBox}>
      <IconFont type={'icon-usergroup'} />
    </div>
    <div
      style={{
        paddingTop: '10px',
      }}
    >
      发给好友
    </div>
  </div>
);

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface shareProps {
  selectKeys: number[];
  name: string;
}

const onCancelClick = () => {
  const mask = document.getElementById('__mask_share__');
  if (mask !== null) {
    mask.remove();
  }
};

const disabledDate = (current: any) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

const uuid2shareLink = (uuid: string) => {
  const url = 'localhost' + '/share/' + window.btoa(uuid);
  return url;
};
const unixTime2str = (expired: number) => {
  const now = moment(new Date().getTime());
  const t = moment(expired);
  const diff = t.diff(now, 'days');
  return '链接' + diff.toString() + '天后失效';
};

const shareSuccessDisplay = (
  uuid: string,
  secret: boolean,
  code: string,
  expired: number,
) => {
  const formatShareInfoStr = () => {
    const url = uuid2shareLink(uuid);
    const str = '分享链接:' + url + (secret ? '\t分享码:' + code : '');
    return str;
  };
  const onCopyToClipboardClick = () => {
    const str = formatShareInfoStr();
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

  return (
    <div>
      <div
        style={{
          color: '#818796',
          fontSize: '14px',
          marginLeft: '10px',
        }}
      >
        <IconFont type={'icon-success'} style={{ marginRight: '5px' }} />
        {secret ? '成功创建私密链接' : '成功创建分享链接'}
      </div>
      <div style={{ width: '500px', marginLeft: '10px', marginTop: '20px' }}>
        <Input
          suffix={
            <span style={{ userSelect: 'none', display: 'inline' }}>
              {unixTime2str(expired)}
            </span>
          }
          defaultValue={uuid2shareLink(uuid)}
        />
        <Button
          style={{
            position: 'absolute',
            right: '60px',
          }}
          type={'primary'}
          onClick={onCopyToClipboardClick}
        >
          {secret ? '复制地址及分享码' : '复制地址'}
        </Button>
      </div>
      <div
        style={{
          marginTop: '20px',
          marginLeft: '10px',
        }}
      >
        <div
          style={
            secret
              ? {}
              : {
                  display: 'none',
                }
          }
        >
          <span
            style={{
              marginRight: '10px',
              fontSize: '12px',
            }}
          >
            提取码
          </span>
          <Input defaultValue={code} style={{ width: '140px' }} />
        </div>
      </div>
      <div
        style={{
          marginTop: '10px',
          marginLeft: '10px',
          fontSize: '12px',
        }}
      >
        可以将链接发送给你的QQ等好友
      </div>
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '10%',
        }}
      >
        <Button onClick={onCancelClick} shape={'round'}>
          关闭
        </Button>
      </div>
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          color: '#c0c4ce',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        配合净网行动，严厉打击色情低俗等不良信息的传播行为，如发现，将封禁账号。
      </div>
    </div>
  );
};
const ShareConfirm = function(props: shareProps) {
  const [loading, setLoading] = useState(false);
  const [linkShareSuccess, setLinkShareSuccess] = useState(false);
  const [shareInfo, setSahreInfo] = useState({
    uuid: '',
    code: '',
    secret: true,
    expired: new Date().getTime(),
  });
  const [form] = Form.useForm();

  const onSubmit = () => {
    const value = form.getFieldsValue();
    const secret = value.secret === 1;
    const expired = value.expired.valueOf();
    setLoading(true);
    fetch(shareFileBaseUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: props.selectKeys,
        secret: secret,
        name: props.name,
        expired: expired,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(resp => {
        if (resp.code === ErrorCode.OK) {
          setSahreInfo({
            uuid: resp.data.id,
            code: resp.data.password,
            secret: resp.data.secret,
            expired: resp.data.expired,
          });
          setLinkShareSuccess(true);
        } else {
          notification['error']({
            message: '分享失败',
            description: '分享失败，服务器遇到了一些问题，可能需要稍后再试。',
          });
        }
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const linkForm = (
    <div>
      <div style={{ marginTop: '20px' }}>
        <Form
          {...layout}
          form={form}
          name={'share-link'}
          initialValues={{
            secret: 1,
            expired: moment().add(7, 'days'),
          }}
        >
          <Form.Item name={'secret'} label={'分享形式'}>
            <Select style={{ width: '120px' }}>
              <Option value={1}>提取码</Option>
              <Option value={0}>所有人可见</Option>
            </Select>
          </Form.Item>
          <Form.Item name={'expired'} label={'失效时间'}>
            <DatePicker format={dateFormat} disabledDate={disabledDate} />
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignContent: 'center',
          marginTop: '80px',
        }}
      >
        <Button
          type={'primary'}
          shape={'round'}
          className={style.linkContentButton}
          onClick={onSubmit}
          loading={loading}
        >
          创建链接
        </Button>
        <Button
          shape={'round'}
          className={style.linkContentButton}
          onClick={onCancelClick}
        >
          取消
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: '20px',
          color: '#c0c4ce',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        配合净网行动，严厉打击色情低俗等不良信息的传播行为，如发现，将封禁账号。
      </div>
    </div>
  );

  return (
    <div className={style.wrapper}>
      <div className={style.confirm}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              color: 'rgb(102, 102, 102)',
              backgroundColor: '#f6f6f6',
              width: '100%',
              height: '10%',
            }}
          >
            <div className={style.title}>
              <Row>
                <Col span={20}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    {'分享文件: ' + props.name}
                  </div>
                </Col>
                <Col span={4}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      style={{
                        marginRight: '5px',
                      }}
                      type={'link'}
                      danger
                      icon={<CloseOutlined />}
                      onClick={onCancelClick}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={style.tab}>
            <Tabs
              defaultActiveKey={'1'}
              tabBarStyle={{
                color: 'rgb(102, 102, 102)',
                backgroundColor: '#f6f6f6',
                width: '100%',
              }}
            >
              <TabPane tab={linkTab} key={'1'}>
                {linkShareSuccess === true
                  ? shareSuccessDisplay(
                      shareInfo.uuid,
                      shareInfo.secret,
                      shareInfo.code,
                      shareInfo.expired,
                    )
                  : linkForm}
              </TabPane>
              <TabPane tab={userTab} key={'2'}>
                Content 2
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareConfirm;
