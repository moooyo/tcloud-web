import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  FolderAddOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import style from './file.module.css';

const { Search } = Input;

interface props {}

interface state {}

class FileAction extends React.Component<props, state> {
  state = {};
  uploadButtonClick = () => {
    let input = document.getElementById('upload_file');
    if (input === null) {
      return;
    }
    input.click();
  };
  onUploadChange = (e: any) => {
    e.persist();
    let files = e.nativeEvent.target.files;
    console.log(files);
  };

  render() {
    return (
      <div
        style={{
          marginBottom: '0.5vh',
          marginTop: '1vh',
        }}
      >
        <Row>
          <Col flex={2}>
            <Button
              type={'primary'}
              icon={<UploadOutlined />}
              className={style.actionButton}
              style={{ marginLeft: '22px' }}
              onClick={this.uploadButtonClick}
            >
              上传
              <input
                type={'file'}
                multiple={true}
                id={'upload_file'}
                style={{ display: 'none' }}
                onChange={this.onUploadChange}
              />
            </Button>
            <Button icon={<FolderAddOutlined />} className={style.actionButton}>
              新建文件夹
            </Button>
            <Button
              icon={<CloudDownloadOutlined />}
              className={style.actionButton}
            >
              离线下载
            </Button>
          </Col>
          <Col flex={2}>
            <span></span>
          </Col>
          <Col flex={7} />
          <Col flex={1}>
            <div
              style={{
                paddingTop: '5px',
              }}
            >
              <Search
                placeholder={'搜索您的文件'}
                onSearch={value => {
                  console.log(value);
                }}
                className={style.actionSearch}
              />
            </div>
          </Col>
          <Col>
            <Button size={'large'} type={'link'} icon={<AppstoreOutlined />} />
          </Col>
        </Row>
      </div>
    );
  }
}

class FileShowLoadData extends React.Component<any, any> {
  render() {
    return (
      <div
        style={{
          marginBottom: '0.5vh',
          fontSize: '12px',
          userSelect: 'none',
        }}
      >
        <Row>
          <Col
            flex={1}
            style={{
              textAlign: 'center',
            }}
          >
            <span>全部文件</span>
          </Col>
          <Col flex={22} />
          <Col
            flex={1}
            style={{
              textAlign: 'center',
            }}
          >
            <span>已经全部加载，共38个</span>
          </Col>
        </Row>
      </div>
    );
  }
}

export { FileAction, FileShowLoadData };
