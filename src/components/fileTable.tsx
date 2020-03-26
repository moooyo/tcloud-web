import React from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { FileInfo } from '@/components/file';
import {
  CloudDownloadOutlined,
  FilePdfOutlined,
  FolderOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import style from './file.module.css';
import { fileInfoUrl } from '@/_config/.api';
import { routerArgs } from '@/components/fileAction';

interface props {
  path: routerArgs;
  onSelectRowKeyChanged: any;
  onSourceChanged: any;
}

interface state {
  loading: boolean;
  selectedRowKeys: number[];
  enterRowIndex: number | undefined;
  data: FileInfo[];
  limit: number;
}

const fileImgStyle = {
  fontSize: '',
};

const file2img = (file: FileInfo) => {
  if (file.IsDirectory) {
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
  usedData: FileInfo[] = [];
  nextBuffer: FileInfo[] = [];
  preFetchedData: FileInfo[] = [];
  scrollRef: HTMLDivElement | null = null;
  isLoading = false; // loading used
  isRefresh = false; // refresh used
  hasMore = true;
  shouldLoad = true;
  offset = 0;
  columns = [
    {
      title: '文件名',
      dataIndex: 'Name',
      width: '50%',
      sorter: (rowA: FileInfo, rowB: FileInfo) => {
        return rowA.Name > rowB.Name;
      },
      render: (fileName: string, record: FileInfo) => {
        return (
          <span>
            <span style={{ marginRight: '10px' }}>{file2img(record)}</span>
            <a style={{ userSelect: 'none' }}>{fileName}</a>
          </span>
        );
      },
    },
    {
      title: '',
      dataIndex: 'action',
      width: '10%',
      render: (x: any, record: FileInfo) => {
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
      loading: true,
      selectedRowKeys: [],
      enterRowIndex: undefined,
      data: [],
      limit: 20,
    };
    this.initDataBuffer().finally(() => {
      this.setState({
        loading: false,
      });
      this.props.onSourceChanged(this.hasMore, this.usedData.length);
    });
  }

  formatPageUrl = () => {
    return (
      fileInfoUrl +
      '?offset=' +
      this.offset.toString() +
      '&limit=' +
      this.state.limit.toString() +
      '&path=' +
      this.props.path.Key.toString()
    );
  };

  refreshBuffer = async () => {
    if (!this.hasMore || this.isRefresh) {
      return;
    }

    this.isRefresh = true;
    if (this.preFetchedData !== null) {
      this.preFetchedData.map((e: any) => {
        this.nextBuffer.push(e);
      });
    }

    // fetch new data
    try {
      let data = await fetch(this.formatPageUrl(), {
        method: 'GET',
        mode: 'cors',
      });
      let json = await data.json();
      this.preFetchedData = json.data;
      if (this.preFetchedData !== null) {
        this.preFetchedData.map((e: any) => {
          this.nextBuffer.push(e);
        });
        this.offset = this.offset + this.preFetchedData.length;
      }
    } catch (e) {
      console.log(e);
    }

    // now next buffer is ready
    this.isRefresh = false;
    if (this.preFetchedData !== null) {
      if (this.preFetchedData.length === 0) {
        this.hasMore = false;
      }
    }
  };

  loadNewPage = async () => {
    if (!this.shouldLoad || this.isLoading) {
      return;
    }
    this.isLoading = true;
    // swap buffer;
    let c = this.usedData;
    this.usedData = this.nextBuffer;
    this.nextBuffer = c;
    // now render data is ready;
    this.setState({
      data: this.usedData,
    });
    // start to fetch new data
    if (this.hasMore) {
      await this.refreshBuffer();
    } else {
      this.shouldLoad = false;
    }
    this.isLoading = false;
  };

  initDataBuffer = async () => {
    try {
      await this.loadNewPage();
      await this.loadNewPage();
      await this.loadNewPage();
    } catch (e) {
      console.log(e);
    }
  };

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
      this.loadNewPage().finally(() => {
        this.props.onSourceChanged(this.hasMore, this.usedData.length);
      });
    }
  }

  onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
    this.props.onSelectRowKeyChanged(selectedRows);
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
          dataSource={this.state.data}
          size={'small'}
          rowSelection={{
            selectedRowKeys: this.state.selectedRowKeys,
            fixed: true,
            onChange: this.onSelectChange,
          }}
          loading={this.state.loading}
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

export default FileTable;
