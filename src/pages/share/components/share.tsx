import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Spin,
  Skeleton,
  Row,
  Col,
  Input,
  notification,
} from 'antd';
import style from './share.module.css';
import ShareAction from '@/pages/share/components/action';
import FileTable from '@/components/fileTable';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { demoList, FileInfo } from '@/pages/cloud/components/file';
import { userIconUrl, shareFileBaseUrl } from '@/_config/.api';
import { useParams, history } from 'umi';
import { ErrorCode } from '@/_config/error';
import moment from 'moment';

/*
interface FileInfo {
  ID: number;
  Name: string;
  UpdatedAt: number;
  Size: number;
  MetaID: number;
  IsDirectory: boolean;
  Type: number;
}
 */

const formatTimestamp = (timestamp: number) => {
  moment.locale('zh-CN');
  const t = moment(timestamp).format('LLL');
  return t;
};

const ShareBox = function(props: any) {
  const path: routerArgs = {
    Key: 0,
    Name: '分享',
  };
  const [resp, setResp] = useState({
    owner: false,
    nickname: 'Alice',
    id: 1,
    secret: true,
    fileList: demoList,
    expired: new Date().getTime(),
  });
  const [loading, setLoading] = useState(true);
  const [codeButtonLoading, setCodeButtonLoading] = useState(false);
  const params = useParams();
  // @ts-ignore
  const id = useParams().id;
  const infoUrl = shareFileBaseUrl + '/' + id;
  const loadState = async () => {
    const tmp = await fetch(infoUrl);
    const json = await tmp.json();
    try {
      if (tmp.status === 200 && json.code === ErrorCode.OK) {
        const data = json.data;
        setResp({
          owner: data.owner,
          nickname: data.nickname,
          id: data.id,
          secret: data.secret,
          fileList: data.fileList,
          expired: data.expired,
        });
      } else {
        notification['error']({
          message: '加载失败',
          description: '请稍后刷新重试',
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (loading) {
      loadState();
    }
  });

  const onGetShareInfoClick = () => {
    const input = document.getElementById('share_code');
    if (input === null) {
      notification['error']({
        message: '请刷新后重试',
        description: '未知错误，仿佛出现了一些问题',
      });
      return;
    }
    //@ts-ignore
    const code = input.value;
    setCodeButtonLoading(true);
    fetch(infoUrl + '?code=' + code)
      .then(res => res.json())
      .then(resp => {
        const data = resp.data;
        if (resp.code === ErrorCode.OK) {
          setResp({
            owner: data.owner,
            nickname: data.nickname,
            id: data.id,
            secret: false,
            fileList: data.fileList,
            expired: data.expired,
          });
        } else {
          notification['error']({
            message: '提取码错误',
            description: '提取码错误',
          });
        }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setCodeButtonLoading(false);
      });
  };

  const passwordInputBox = (
    <div className={style.passwordBox}>
      <Spin spinning={loading}>
        <div>
          <div className={style.passwordTitle}>
            <Row>
              <Col span={5}>
                <div
                  style={{
                    width: '85px',
                    height: '80px',
                    display: 'inline-flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Avatar src={userIconUrl} size={44} />
                </div>
              </Col>
              <Col span={13}>
                <div
                  style={{
                    marginTop: '20px',
                    color: 'white',
                  }}
                >
                  <span>
                    <strong style={{ fontSize: '14px' }}>
                      {resp.nickname}
                    </strong>
                    <span style={{ marginLeft: '5px' }}>
                      给您分享了加密文件
                    </span>
                  </span>
                </div>
              </Col>
              <Col span={5}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    color: '#06A7FF',
                  }}
                >
                  <Button type={'primary'} size={'small'} shape={'round'}>
                    加为好友
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div className={style.passwordContent}>
            <span
              style={{
                position: 'relative',
                left: '40px',
                top: '50px',
                userSelect: 'none',
              }}
            >
              请输入提取码:
            </span>
            <Input
              style={{
                position: 'relative',
                left: '-44px',
                top: '100px',
                width: '260px',
              }}
              id={'share_code'}
            />
            <Button
              type={'primary'}
              shape={'round'}
              onClick={onGetShareInfoClick}
              style={{
                position: 'relative',
                top: '100px',
              }}
              loading={codeButtonLoading}
            >
              提取文件
            </Button>
          </div>
        </div>
      </Spin>
    </div>
  );

  const shareContentBox = (
    <div>
      <div className={style.emptyBox} />
      <Card
        className={style.shareBox}
        bordered={true}
        loading={loading}
        hoverable={true}
      >
        <div className={style.avatar}>
          <Spin spinning={false}>
            <Avatar
              shape="square"
              className={style.img}
              size={64}
              src={
                'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
              }
            />
          </Spin>
        </div>
        {resp.owner ? (
          <Button type={'link'} danger={true} className={style.cancelShare}>
            取消分享
          </Button>
        ) : (
          ''
        )}
        <div className={style.information}>
          <span>{resp.nickname}</span>
        </div>
        <div className={style.information}>
          <span
            style={{
              color: '#999',
              fontSize: '12px',
            }}
          >
            失效时间:{formatTimestamp(resp.expired)}
          </span>
        </div>
        <Divider style={{ margin: '10px' }} />
        <ShareAction />
        <div className={style.fileTable}>
          <FileTable
            path={path}
            onSelectRowKeyChanged={(keys: any) => {
              console.log(keys);
            }}
            ChangedFileNameID={-1}
            setSelectRowKeys={(selected: any) => {
              console.log(selected);
            }}
            onChangedFileNameClicked={(id: number) => {}}
            FileList={resp.fileList}
            Loading={false}
            changeFileName={(id: number, name: string) => {}}
          />
        </div>
      </Card>
    </div>
  );

  return resp.secret ? passwordInputBox : shareContentBox;
};

export default ShareBox;
