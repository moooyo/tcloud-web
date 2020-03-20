import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  FolderAddOutlined,
  SwapOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import style from './file.module.css';
import UploadList from '@/components/uploadList';

const { Search } = Input;

interface UploadFileMeta {
  Name: string;
  Size: number;
  PathID: number; // directory ID
  Path: string; //virtual path name
  uploader: boolean;
  Process: number;
  Type: string;
}

interface props {}

interface state {
  FileList: Array<UploadFileMeta>;
}

class FileAction extends React.Component<props, state> {
  state = {
    FileList: Array<UploadFileMeta>(),
  };
  onUploadListClick = () => {
    let upload = document.getElementById('upload_list_action');
    if (upload === null) {
      return;
    }
    upload.setAttribute('style', '');
  };

  onUploadButtonClick = () => {
    let input = document.getElementById('upload_file');
    if (input === null) {
      return;
    }
    input.click();
  };
  onUploadChange = (e: any) => {
    e.persist();
    let files = e.nativeEvent.target.files;
    let data = this.state.FileList;
    for (let f of files) {
      let tmp: UploadFileMeta = {
        Name: f.name,
        Size: f.size,
        PathID: 0, // directory ID
        Path: '我的文件', //virtual path name
        uploader: true,
        Process: 60,
        Type: f.type,
      };
      data.push(tmp);
      this.uploadFile(f);
    }
    this.setState({
      FileList: data,
    });
  };
  uploadFile = async (file: any) => {
    const SliceSize = 4 * 1024 * 1024; //4M
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      if (reader.result === null) {
        console.log('error! loading file error!');
        return;
      }
      let now = 0;
      let count = file.size / SliceSize;
      while (now < count) {
        let tmp = reader.result.slice(now * SliceSize, (now + 1) * SliceSize);
        //
        now++;
      }
    };
    return;
  };

  render() {
    return (
      <div
        style={{
          marginBottom: '0.5vh',
          marginTop: '1vh',
        }}
      >
        <UploadList
          className={style.uploaderList}
          id={'upload_list_action'}
          source={this.state.FileList}
        />
        <Row>
          <Col flex={2}>
            <Button
              type={'primary'}
              icon={<UploadOutlined />}
              className={style.actionButton}
              style={{ marginLeft: '22px' }}
              onClick={this.onUploadButtonClick}
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
            <Button
              icon={<SwapOutlined />}
              className={style.actionButton}
              onClick={this.onUploadListClick}
            >
              传输列表
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

export { FileAction, FileShowLoadData, UploadFileMeta };
