import React from 'react';
import { Button, Col, List, Progress, Row } from 'antd';

import {
  CloseCircleTwoTone,
  CloseOutlined,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  SyncOutlined,
} from '@ant-design/icons/lib';
import { createFromIconfontCN } from '@ant-design/icons';
import { UploadFileMeta } from './fileAction';

interface props {
  className: string;
  id: string;
  source: UploadFileMeta[];
}

interface state {
  display: boolean;
}

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1704308_8m32e6fj8jh.js',
});

const number2size = (size: number) => {
  let k = 0;
  while (size / 1024 >= 1 && k < 4) {
    size /= 1024;
    k++;
  }
  let t = '';
  switch (k) {
    case 0:
      t = 'B';
      break;
    case 1:
      t = 'K';
      break;
    case 2:
      t = 'M';
      break;
    case 3:
      t = 'G';
      break;
    default:
      t = '?';
  }
  return size.toFixed(2).toString() + t;
};

class UploadList extends React.Component<props, state> {
  onCloseClick = () => {
    let upload = document.getElementById(this.props.id);
    if (upload === null) {
      return;
    }
    upload.setAttribute('style', 'display:none');
  };

  render() {
    return (
      <div id={this.props.id} style={{ display: 'none' }}>
        <div
          style={{ userSelect: 'none', position: 'absolute' }}
          className={this.props.className}
        >
          <div style={{ height: '30px' }}>
            <span
              style={{
                color: '#666',
                fontSize: '14px',
                lineHeight: '30px',
                marginLeft: '10px',
              }}
            >
              成功上传0/1
            </span>
            <Button
              style={{ float: 'right' }}
              onClick={this.onCloseClick}
              type={'link'}
              icon={<CloseOutlined />}
            />
          </div>
          <List
            style={{ width: '100%' }}
            itemLayout={'horizontal'}
            dataSource={this.props.source}
            renderItem={item => (
              <List.Item style={{ width: '100%' }}>
                <Row style={{ width: '100%' }}>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    <IconFont
                      type={'icon-file'}
                      style={{
                        fontSize: '24px',
                      }}
                    />
                  </Col>
                  <Col span={10}>{item.Name}</Col>
                  <Col span={2}>{number2size(item.Size)}</Col>
                  <Col span={2}>{item.Path}</Col>
                  <Col span={5}>
                    <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={item.Process}
                    />
                  </Col>
                  <Col />
                  <Col span={4}>
                    <div
                      style={{
                        visibility: item.uploader ? 'visible' : 'hidden',
                      }}
                    >
                      <div style={{ bottom: '1%', position: 'absolute' }}>
                        <Row>
                          {item.uploader === 3 ? (
                            <Col flex={1}>
                              <Button type={'link'} icon={<SyncOutlined />} />
                            </Col>
                          ) : (
                            ''
                          )}
                          {item.uploader === 1 ? (
                            <Col flex={1}>
                              <Button
                                type={'link'}
                                icon={<PauseCircleTwoTone />}
                              />
                            </Col>
                          ) : (
                            ''
                          )}
                          {item.uploader === 2 ? (
                            <Col flex={1}>
                              <Button
                                type={'link'}
                                icon={<PlayCircleTwoTone />}
                              />
                            </Col>
                          ) : (
                            ''
                          )}
                          {item.uploader !== 4 ? (
                            <Col flex={1}>
                              <Button
                                type={'link'}
                                icon={<CloseCircleTwoTone />}
                              />
                            </Col>
                          ) : (
                            ''
                          )}
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default UploadList;
