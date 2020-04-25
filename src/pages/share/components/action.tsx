import React from 'react';
import { Breadcrumb, Button, Col, Row } from 'antd';
import style from './share.module.css';
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { routerArgs } from '@/pages/cloud/components/fileAction';

interface actionProps {
  args: routerArgs[];
  onClick: any;
}

const ShareAction = function(props: actionProps) {
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
            <Button className={style.button} icon={<DownloadOutlined />}>
              下载
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShareAction;
