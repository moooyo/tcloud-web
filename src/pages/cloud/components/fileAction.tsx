import React from 'react';
import { Breadcrumb, Button, Col, Input, notification, Row } from 'antd';
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  DownloadOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  SwapOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import style from './file.module.css';
import UploadList from '@/pages/cloud/components/uploadList';
import {
  directoryCreateUrl,
  fileChangeUrl,
  fileDownloadUrl,
  uploadFileUrl,
  shareFileBaseUrl,
} from '@/_config/.api';
import { FileInfo } from '@/pages/cloud/components/file';
import { ErrorCode } from '@/_config/error';
import { DeleteOutlined } from '@ant-design/icons/lib';
import ShareConfirm from './share';
import ReactDOM from 'react-dom';

const { Search } = Input;

interface UploadFileMeta {
  Name: string;
  Size: number;
  PathID: number; // directory ID
  Path: string; //virtual path name
  /*
   * uploader:
   * 1: uploader
   * 2: pause
   * 3: cancel
   * 4: finished
   */

  uploader: number;
  Process: number;
  Type: string;

  f: any;
  count: number;
}

interface props {
  path: routerArgs;
  selectRows: FileInfo[];
  onShowModeChanged: any;
  onChangedFileNameClicked: any;
  onCreateDirectory: any;
  uploadFileList: any;
  setUploadList: any;
  deleteFileFromList: (id: number[]) => void;
  setSelect: any;
  siderMenu: string;
}

interface state {
  downloadLoading: boolean;
  deleteLoading: boolean;
}

class FileAction extends React.Component<props, state> {
  state = {
    downloadLoading: false,
    deleteLoading: false,
  };

  onCreateDirectoryClick = async () => {
    try {
      let res = await fetch(directoryCreateUrl, {
        method: 'POST',
        body: JSON.stringify({
          path: this.props.path.Key,
          name: '新建文件夹',
        }),
      });
      if (res.status === 200) {
        let resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          this.props.onCreateDirectory(resp.data);
        } else {
          notification['error']({
            message: '新建文件夹错误',
            description: resp.message,
          });
        }
      } else {
        notification['error']({
          message: '服务器错误',
          description: '无法连接到服务器，请稍后重试',
        });
      }
    } catch (e) {
      console.log(e);
    }
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
  defaultButton = (
    <span>
      <Button icon={<CloudDownloadOutlined />} className={style.actionButton}>
        离线下载
      </Button>
      <Button
        icon={<SwapOutlined />}
        className={style.actionButton}
        onClick={this.onUploadListClick}
      >
        传输列表
      </Button>
    </span>
  );

  onUploadChange = (e: any) => {
    let files = e.nativeEvent.target.files;
    let data = this.props.uploadFileList.slice();
    for (let f of files) {
      let tmp: UploadFileMeta = {
        Name: f.name,
        Size: f.size,
        PathID: this.props.path.Key, // directory ID
        Path: this.props.path.Name, //virtual path name
        uploader: 1,
        Process: 0,
        Type: f.type,
        f: f,
        count: 0,
      };
      data.push(tmp);
      this.uploadFile(f, tmp.PathID);
    }
    this.props.setUploadList(data);
  };

  uploadFile = (file: any, pathID: number) => {
    const SliceSize = 1024 * 1024; //1M
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = async () => {
      if (reader.result === null) {
        console.log('error! loading file error!');
        return;
      }
      let uuid = '';
      let count = Math.ceil(file.size / SliceSize);
      // create remote file
      try {
        let ret = await fetch(uploadFileUrl, {
          method: 'POST',
          body: JSON.stringify({
            slice_id: 1,
            length: 1,
            uuid: 'CREATE_FILE_AND_SET_UUID',
            // @ts-ignore
            file: 'create',
            count: count,
            path_id: pathID,
            file_name: file.name,
          }),
        });
        let resp = await ret.json();
        if (ret.status === 200) {
          uuid = resp.data;
        }
      } catch (e) {
        //todo create file error.
        console.log(e);
        return;
      }

      let now = 0;
      while (now < count) {
        let start = now * SliceSize;
        let end = start + SliceSize;
        if (end > file.size) {
          end = file.size;
        }
        let tmp = reader.result.slice(now * SliceSize, (now + 1) * SliceSize);
        let len = 0;
        if (typeof tmp === 'string') {
          len = tmp.length;
        } else {
          alert('assume error!');
        }
        // todo resize to slice to upload. Using ACK to confirm slice upload success
        let retryCount = 0;
        try {
          let ret = await fetch(uploadFileUrl, {
            method: 'POST',
            body: JSON.stringify({
              slice_id: now + 1,
              length: len,
              // @ts-ignore
              file: window.btoa(tmp),
              uuid: uuid,
              count: count,
              path_id: pathID,
              file_name: file.name,
            }),
          });
          if (ret.status === 200) {
            let list = this.props.uploadFileList.slice();
            //update process
            for (let l of list) {
              if (l.f === file) {
                if (now !== count - 1) {
                  l.count += (1 / count) * 100;
                  l.Process = Math.floor(l.count);
                } else {
                  l.count = 100;
                  l.Process = 100;
                }
                break;
              }
            }
            this.props.setUploadList(list);
            now++;
            retryCount = 0;
          } else if (ret.status === 400) {
            if (retryCount === 3) {
              //todo pause process
              console.log('Retry max!');
              break;
            } else {
              retryCount++;
            }
          } else {
            //todo upload failed
            break;
          }
        } catch (e) {
          //todo upload failed
          console.log(e);
          break;
        }
      }
    };

    return;
  };

  downloadFiles = async () => {
    this.setState({
      downloadLoading: true,
    });
    let downloadFiles: number[] = [];
    this.props.selectRows.forEach(e => {
      downloadFiles.push(e.ID);
    });
    let ret = await fetch(fileDownloadUrl, {
      method: 'POST',
      body: JSON.stringify({
        files: downloadFiles,
      }),
    });
    if (ret.status === 200) {
      let blob = await ret.blob();
      let disposition = ret.headers.get('Content-Disposition');
      let filename = 'init';
      if (disposition !== null) {
        filename = disposition.split('filename=')[1].trim();
      }
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } else {
      let resp = await ret.json();
      console.log(resp);
    }
    this.setState({
      downloadLoading: false,
    });
  };

  deleteFile = () => {
    this.setState({
      deleteLoading: true,
    });
    let url = fileChangeUrl;
    let deleteFiles: number[] = [];
    this.props.selectRows.forEach(e => {
      deleteFiles.push(e.ID);
    });
    let x = deleteFiles.join(',');
    url = url + '/' + x;
    fetch(url, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(resp => {
        this.setState({
          deleteLoading: false,
        });
        if (resp.code === ErrorCode.OK) {
          this.props.deleteFileFromList(deleteFiles);
          this.props.setSelect([]);
        } else {
          notification['error']({
            message: '文件删除失败',
            description: resp.message,
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({
          deleteLoading: false,
        });
      });
  };

  shareFile = () => {
    let selectKeys: number[] = [];
    this.props.selectRows.forEach(e => {
      selectKeys.push(e.ID);
    });
    const fileName = this.props.selectRows[0].Name;
    const maskElement = document.createElement('div');
    maskElement.setAttribute('id', '__mask_share__');
    document.body.appendChild(maskElement);
    const mask = <ShareConfirm selectKeys={selectKeys} name={fileName} />;
    ReactDOM.render(mask, maskElement);
  };

  generateSelectedButton = (renameButtonDisabled: boolean) => {
    return (
      <span>
        <Button
          icon={<DownloadOutlined />}
          className={style.actionButton}
          onClick={this.downloadFiles}
        >
          下载
        </Button>
        <Button
          icon={<ShareAltOutlined />}
          className={style.actionButton}
          onClick={this.shareFile}
        >
          分享
        </Button>
        <Button
          className={style.actionButton}
          disabled={renameButtonDisabled}
          onClick={this.props.onChangedFileNameClicked}
        >
          重命名
        </Button>
        <Button
          className={style.actionButton}
          danger={true}
          icon={<DeleteOutlined />}
          type={'primary'}
          onClick={this.deleteFile}
          loading={this.state.deleteLoading}
        >
          删除
        </Button>
      </span>
    );
  };

  render() {
    let somethingSelected = this.props.selectRows.length > 0;
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
          source={this.props.uploadFileList}
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
            {this.props.siderMenu === 'all' ? (
              <Button
                icon={<FolderAddOutlined />}
                className={style.actionButton}
                onClick={this.onCreateDirectoryClick}
              >
                新建文件夹
              </Button>
            ) : (
              ''
            )}
            {somethingSelected
              ? this.generateSelectedButton(this.props.selectRows.length !== 1)
              : this.defaultButton}
          </Col>
          <Col flex={2}>
            <span />
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
            <Button
              size={'large'}
              type={'link'}
              icon={<AppstoreOutlined />}
              onClick={this.props.onShowModeChanged}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

interface routerArgs {
  Key: number;
  Name: string;
}

interface breadcrumbProps {
  args: routerArgs[];
  onClick: any;
  hasMore: boolean;
  count: number;
}

class FileShowLoadData extends React.Component<breadcrumbProps, any> {
  render() {
    let str = '已经全部加载，共' + this.props.count.toString() + '个';
    if (this.props.hasMore) {
      str = '已加载' + this.props.count.toString() + '个';
    }
    return (
      <div
        style={{
          marginBottom: '0.5vh',
          fontSize: '12px',
        }}
      >
        <Row>
          <Col
            flex={1}
            style={{
              textAlign: 'center',
            }}
          >
            <Breadcrumb separator=">">
              {this.props.args.map((item, index) => {
                let a = <a>{item.Name}</a>;
                let id = <span style={{ display: 'none' }}>{index}</span>;
                let k = <span style={{ display: 'none' }}> {item.Key}</span>;
                if (index == this.props.args.length - 1) {
                  a = <span>{item.Name}</span>;
                  k = <span style={{ display: 'none' }}>-1</span>;
                }
                return (
                  <Breadcrumb.Item onClick={this.props.onClick} key={item.Key}>
                    {k}
                    {id}
                    {a}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </Col>
          <Col flex={22} />
          <Col
            flex={1}
            style={{
              textAlign: 'center',
            }}
          >
            <span>{str}</span>
          </Col>
        </Row>
      </div>
    );
  }
}

export { FileAction, FileShowLoadData, UploadFileMeta, routerArgs };
