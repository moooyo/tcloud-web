import React from 'react';
import { Avatar, Col, List, Row } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';

let data = [
  {
    name: 'aaa.jpg',
    size: '389',
    location: '我的文件',
    status: '85',
  },
  {
    name: 'bbb.pdf',
    size: '584',
    location: '我的文件',
    status: '100',
  },
];

interface props {}

interface state {}

class UploadList extends React.Component<props, state> {
  render() {
    return (
      <div>
        <List
          itemLayout={'horizontal'}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Row style={{ width: '100%', userSelect: 'none' }}>
                <Col span={2}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={'small'}
                        shape={'square'}
                        icon={<FilePdfOutlined />}
                      />
                    }
                  />
                </Col>
                <Col span={8}>{item.name}</Col>
                <Col span={4}>{item.size + 'M'}</Col>
                <Col span={4}>{item.location}</Col>
                <Col span={4}>{item.status + '%'}</Col>
                <Col />
              </Row>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default UploadList;
