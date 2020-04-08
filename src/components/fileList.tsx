import React from 'react';
import { Card, Checkbox, List } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import style from '../pages/cloud/components/file.module.css';
import { FileInfo } from '@/pages/cloud/components/file';
import { fileInfoUrl } from '@/_config/.api';
import { ListGridType } from 'antd/es/list';
import InfiniteScroll from 'react-infinite-scroller';
import { routerArgs } from '@/pages/cloud/components/fileAction';

const { Meta } = Card;

interface CardProps {
  file: FileInfo;
  onSelectChanged: any;
}

interface CardState {
  select: boolean;
}

const file2cover = (file: FileInfo) => {
  return (
    <FilePdfOutlined
      style={{
        marginTop: '4vh',
        marginBottom: '-2vh',
        fontSize: 'xx-large',
      }}
    />
  );
};

class FileCard extends React.Component<CardProps, CardState> {
  state = {
    select: false,
  };

  render() {
    return (
      <div>
        <Card
          hoverable={true}
          cover={file2cover(this.props.file)}
          className={this.state.select ? style.select : ''}
          style={{
            height: '8vw',
          }}
        >
          <div
            style={{
              paddingTop: '5%',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {this.props.file.Name}
          </div>
        </Card>
        <Checkbox
          className={style.checkBox}
          onChange={e => {
            let select = this.state.select;
            this.setState({
              select: !select,
            });
            this.props.onSelectChanged(this.props.file);
          }}
        />
      </div>
    );
  }
}

interface props {
  path: routerArgs;
  onSelectKeyChanged: any;
}

interface state {
  source: FileInfo[];
  loading: boolean;
}

class FileList extends React.Component<props, state> {
  source: FileInfo[] = [];
  state = {
    source: [],
    loading: true,
  };

  constructor(props: any) {
    super(props);
    this.initData().finally(() => {
      this.setState({
        loading: false,
      });
    });
  }

  limit = 24;
  offset = 0;
  hasMore = true;
  grid: ListGridType = {
    column: 12,
    gutter: 0,
    xs: 3,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 8,
    xxl: 8,
  };

  onSelectChanged = (file: FileInfo) => {
    let find = this.source.findIndex(e => {
      return e === file;
    });
    if (find === -1) {
      this.source.push(file);
    } else {
      this.source.splice(find, 1);
    }
    this.props.onSelectKeyChanged(this.source);
  };

  formatPageUrl = () => {
    return (
      fileInfoUrl +
      '?offset=' +
      this.offset.toString() +
      '&limit=' +
      this.limit.toString() +
      '&path=' +
      this.props.path.Key.toString()
    );
  };

  initData = async () => {
    try {
      let data = await fetch(this.formatPageUrl(), {
        mode: 'cors',
        method: 'GET',
      });
      let resp = await data.json();
      this.setState({
        source: resp.data,
      });
      this.offset += resp.data.length;
    } catch (e) {
      console.log(e);
    }
  };

  loadMore = () => {
    if (!this.hasMore) {
      return;
    }
    this.setState({
      loading: true,
    });
    fetch(this.formatPageUrl(), {
      mode: 'cors',
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.data.length === 0) {
          this.hasMore = false;
        }
        let data = this.state.source.concat(resp.data);
        this.setState({
          source: data,
        });
        this.offset += resp.data.length;
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={!this.state.loading && this.hasMore}
        useWindow={false}
      >
        <List
          rowKey={(item: FileInfo) => {
            return item.ID.toString();
          }}
          dataSource={this.state.source}
          grid={this.grid}
          loading={this.state.loading}
          renderItem={item => (
            <List.Item>
              <FileCard file={item} onSelectChanged={this.onSelectChanged} />
            </List.Item>
          )}
          style={{
            marginLeft: '1.5vw',
            marginRight: '1.5vw',
          }}
        />
      </InfiniteScroll>
    );
  }
}

export default FileList;
