import React, { useState } from 'react';
import { Breadcrumb, Button, Col, Row, notification } from 'antd';
import style from './share.module.css';
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { FileInfo } from '@/pages/cloud/components/file';
import { fileDownloadUrl } from '@/_config/.api';

interface actionProps {
  args: routerArgs[];
  onClick: any;
  select: FileInfo[];
}

const ShareAction = function(props: actionProps) {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Row>
        <Col
          span={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Breadcrumb separator=">" className={style.breadcrumb}>
            {props.args.map((item, index) => {
              let a = <a>{item.Name}</a>;
              let id = <span style={{ display: 'none' }}>{index}</span>;
              let k = <span style={{ display: 'none' }}> {item.Key}</span>;
              let click = true;
              if (index == props.args.length - 1) {
                a = <span>{item.Name}</span>;
                k = <span style={{ display: 'none' }}>-1</span>;
                click = false;
              }
              return (
                <Breadcrumb.Item
                  onClick={click ? props.onClick : () => {}}
                  key={item.Key}
                >
                  {k}
                  {id}
                  {a}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </Col>
        <Col span={12} />
        <Col span={8}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type={'primary'}
              className={style.button}
              icon={<SaveOutlined />}
            >
              保存
            </Button>
            <Button
              className={style.button}
              icon={<DownloadOutlined />}
              loading={loading}
              onClick={() => {
                const downloadList: number[] = [];
                props.select.forEach(e => {
                  downloadList.push(e.ID);
                });
                const url = fileDownloadUrl + '?op=share';
                (async () => {
                  setLoading(true);
                  try {
                    const res = await fetch(url, {
                      method: 'POST',
                      body: JSON.stringify({
                        files: downloadList,
                      }),
                    });
                    if (res.status === 200) {
                      const blob = await res.blob();
                      const disposition = res.headers.get(
                        'Content-Disposition',
                      );
                      let filename = 'init';
                      if (disposition !== null) {
                        filename = disposition.split('filename=')[1].trim();
                      }
                      const blobUrl = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = blobUrl;
                      a.download = filename;
                      a.click();
                      window.URL.revokeObjectURL(blobUrl);
                    } else {
                      const resp = await res.json();
                      notification['error']({
                        message: '下载失败',
                        description: resp.message,
                      });
                      console.log(resp);
                    }
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setLoading(false);
                  }
                })();
                console.log(props.select);
              }}
            >
              下载
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShareAction;
