import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Table, Input, Button, notification } from 'antd';
import { FileInfo } from '@/pages/cloud/components/file';
import {
  CloudDownloadOutlined,
  FilePdfOutlined,
  FolderOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import style from '../pages/cloud/components/file.module.css';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { fileChangeUrl, fileInfoUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import FileView from '@/pages/cloud/components/fileView';
import { Number2FileType } from '@/components/utils';

interface props {
  enterDirectory: (file: FileInfo, limit: number) => void;
  path: routerArgs;
  onSelectRowKeyChanged: any;
  ChangedFileNameID: number;
  setSelectRowKeys: any;
  onChangedFileNameClicked: (id: number) => void;
  FileList: FileInfo[];
  Loading: boolean;
  changeFileName: (id: number, name: string) => void;
  showTableAction: boolean;
  formatFileUrl: (file: FileInfo) => string;
}

interface state {
  selectedRowKeys: number[];
  enterRowIndex: number | undefined;
  limit: number;
  offset: number;
  changeNameButtonLoading: boolean;
}

const fileImgStyle = {
  fontSize: '',
};

const file2img = (IsDirectory: boolean, Type: number) => {
  if (IsDirectory) {
    return <FolderOutlined style={fileImgStyle} />;
  } else {
    return <FilePdfOutlined style={fileImgStyle} />;
  }
};

const size2str = (size: number) => {
  // size: kb
  const K = 1024;
  let t = 0;
  let ret = size;
  while (size >= K && t < 4) {
    t++;
    size = size / K;
    ret = size;
  }
  let tmp = '';
  switch (t) {
    case 0:
      tmp = 'K';
      break;
    case 1:
      tmp = 'M';
      break;
    case 2:
      tmp = 'G';
      break;
    case 3:
      tmp = 'T';
      break;
    case 4:
      tmp = 'P';
      break;
  }
  return ret.toFixed(2).toString() + tmp;
};

class FileTable extends React.Component<props, state> {
  scrollRef: HTMLDivElement | null = null;
  hasMore = true;
  shouldLoad = true;

  // @ts-ignore
  changedFileNameRef = React.createRef<input>();
  onConfirmChangedName = (ID: number) => {
    return function(e: any) {
      // @ts-ignore
      const name = this.changedFileNameRef.current.state.value;
      const url = fileChangeUrl + '/' + ID.toString() + '/name';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then(res => res.json())
        .then(resp => {
          // @ts-ignore
          this.setState({
            changeNameButtonLoading: false,
          });
          if (resp.code === ErrorCode.OK) {
            // @ts-ignore
            this.props.onChangedFileNameClicked(-1);
            // @ts-ignore
            this.props.changeFileName(ID, name);
          } else {
            notification['error']({
              message: '修改文件名失败',
              description: resp.message,
            });
          }
        })
        .catch(e => {
          console.log(e);
          // @ts-ignore
          this.setState({
            changeNameButtonLoading: false,
          });
        });
      // @ts-ignore
    }.bind(this);
  };

  onCancelChangedName = (e: any) => {
    const { onChangedFileNameClicked } = this.props;
    onChangedFileNameClicked(-1);
  };

  formatFileUrl = (file: FileInfo) => {
    return this.props.formatFileUrl(file);
  };
  generateFileClick = (file: FileInfo) => {
    return function(e: any) {
      if (file.IsDirectory) {
        //@ts-ignore
        this.props.enterDirectory(file, 30);
        //@ts-ignore
        this.setState({
          offset: 30,
        });
      } else {
        if (Number2FileType(file.Type) !== 'other') {
          const maskElement = document.createElement('div');
          maskElement.setAttribute('id', '__mask_file_view__');
          document.body.appendChild(maskElement);
          //@ts-ignore
          const mask = (
            <FileView
              type={Number2FileType(file.Type)}
              //@ts-ignore
              path={this.formatFileUrl(file)}
            />
          );
          ReactDOM.render(mask, maskElement);
        } else {
          notification['error']({
            message: '无法预览此文件',
            description: '暂时无法预览此类文件，可能需要后期更新支持',
          });
        }
      }
    }.bind(this);
  };
  columns = [
    {
      title: '文件名',
      dataIndex: 'Name',
      width: '50%',
      sorter: (rowA: FileInfo, rowB: FileInfo) => {
        return rowA.Name > rowB.Name;
      },
      render: (fileName: string, record: FileInfo) => {
        if (record.ID === this.props.ChangedFileNameID) {
          return (
            <span>
              <Input
                prefix={file2img(record.IsDirectory, record.Type)}
                defaultValue={fileName}
                ref={this.changedFileNameRef}
                style={{ width: '60%' }}
                size={'small'}
              />
              <Button
                type={'primary'}
                size={'small'}
                style={{ marginLeft: '5px' }}
                onClick={this.onConfirmChangedName(record.ID)}
                loading={this.state.changeNameButtonLoading}
              >
                <CheckOutlined />
              </Button>
              <Button
                size={'small'}
                style={{ marginLeft: '5px' }}
                onClick={this.onCancelChangedName}
                loading={this.state.changeNameButtonLoading}
              >
                <CloseOutlined />
              </Button>
            </span>
          );
        } else {
          return (
            <span>
              <span style={{ marginRight: '10px' }}>
                {file2img(record.IsDirectory, record.Type)}
              </span>
              <a
                style={{ userSelect: 'none' }}
                onClick={this.generateFileClick(record)}
              >
                {fileName}
              </a>
            </span>
          );
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      width: '10%',
      render: (x: any, record: FileInfo) => {
        if (!this.props.showTableAction) {
          return <></>;
        }

        if (!record.IsDirectory) {
          return (
            <div className={'action' + ' ' + style.noDisplay}>
              <span className={style.tableItemAction}>
                <ShareAltOutlined style={fileImgStyle} />
              </span>
              <span className={style.tableItemAction}>
                <CloudDownloadOutlined style={fileImgStyle} />
              </span>
              <span className={style.tableItemAction}>
                <MoreOutlined style={fileImgStyle} />
              </span>
            </div>
          );
        }
      },
    },
    {
      title: '大小',
      dataIndex: 'Size',
      width: '15%',
      sorter: (rowA: FileInfo, rowB: FileInfo) => {
        return rowA.Size > rowB.Size;
      },
      render: (text: number, record: FileInfo) => {
        if (record.IsDirectory) {
          return <span style={{ userSelect: 'none' }}>-</span>;
        } else {
          return <span style={{ userSelect: 'none' }}>{size2str(text)}</span>;
        }
      },
    },
    {
      title: '修改时间',
      dataIndex: 'UpdateAt',
      sorter: (rowA: FileInfo, rowB: FileInfo) => {
        return rowA.UpdatedAt > rowB.UpdatedAt;
      },
      render: (time: number, record: FileInfo) => {
        if (record.IsDirectory) {
          return <span style={{ userSelect: 'none' }}>-</span>;
        } else {
          return (
            <span style={{ userSelect: 'none' }}>
              {moment(time).format('YYYY-MM-DD HH:mm')}
            </span>
          );
        }
      },
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      offset: 0,
      selectedRowKeys: [],
      enterRowIndex: undefined,
      limit: 20,
      changeNameButtonLoading: false,
    };
  }

  onScrollHandle() {
    if (!this.shouldLoad) {
      return;
    }
    // @ts-ignore
    const scrollTop = this.scrollRef.scrollTop;
    // @ts-ignore
    const clientHeight = this.scrollRef.clientHeight;
    // @ts-ignore
    const scrollHeight = this.scrollRef.scrollHeight;
    const loadingRate = 0.8;
    let loading = scrollTop + clientHeight > scrollHeight * loadingRate;
    if (loading) {
      console.log('here');
    }
  }

  onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
    this.props.setSelectRowKeys(selectedRowKeys);
    const rows = selectedRows.filter((e: any) => e !== undefined);
    this.props.onSelectRowKeyChanged(rows);
  };

  setRowClassName = (record: FileInfo, index: number) => {
    return this.state.enterRowIndex === index ? style.tableItemMouseEnter : '';
  };

  render() {
    return (
      <div
        className={style.noScrollBar}
        onScrollCapture={() => {
          this.onScrollHandle();
        }}
        ref={c => {
          this.scrollRef = c;
        }}
        style={{
          overflowY: 'scroll',
          height: '100%',
        }}
      >
        <Table
          scroll={{
            scrollToFirstRowOnChange: false,
          }}
          // @ts-ignore
          columns={this.columns}
          dataSource={this.props.FileList}
          size={'small'}
          rowSelection={{
            selectedRowKeys: this.state.selectedRowKeys,
            fixed: true,
            onChange: this.onSelectChange,
          }}
          loading={this.props.Loading}
          rowKey={(file: FileInfo) => file.ID}
          pagination={false}
          onRow={(record: FileInfo, index: number | undefined) => {
            return {
              onMouseEnter: event => {
                this.setState({
                  enterRowIndex: index,
                });
              },
              onMouseLeave: event => {
                this.setState({
                  enterRowIndex: undefined,
                });
              },
            };
          }}
          rowClassName={this.setRowClassName}
        />
      </div>
    );
  }
}
export { file2img, Number2FileType, size2str };

export default FileTable;
