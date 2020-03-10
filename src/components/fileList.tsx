import React from "react";
import {Card, Checkbox, List} from 'antd'
import {FilePdfOutlined} from '@ant-design/icons'
import style from './file.module.css'
import {FileInfo} from '@/components/file'
import {fileInfoUrl} from "@/_config/.api";
import {ListGridType} from "antd/es/list";
// @ts-ignore
import InfiniteScroll from 'react-infinite-scroller';

const {Meta} = Card;

interface CardProps {
  file: FileInfo
}

interface CardState {
  select: boolean
}

const file2cover = (file: FileInfo) => {
  return <FilePdfOutlined style={{
    marginTop: "3vh",
    fontSize: "xxx-large",
  }}/>
};

class FileCard extends React.Component<CardProps, CardState> {
  state = {
    select: false
  };

  render() {
    return (
      <div>
        <Card hoverable={true} cover={file2cover(this.props.file)} className={this.state.select ? style.select : ""}
              style={{
                height: "8vw",
              }}
        >
          <div style={{
            paddingTop: "5%",
            textAlign: "center",
            userSelect: "none",
          }}>{this.props.file.fileName}
          </div>
        </Card>
        <Checkbox className={style.checkBox} onChange={e => {
          console.log("select");
          let select = this.state.select;
          this.setState({
            select: !select
          });
        }}/>
      </div>
    )
  }
}

interface props {

}

interface state {
  source: FileInfo[]
  loading: boolean
}

class FileList extends React.Component<props, state> {
  state = {
    source: [],
    loading: true
  };

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

  constructor(props: any) {
    super(props);
    this.initData().finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  formatPageUrl = () => {
    return fileInfoUrl + "?offset=" + this.offset.toString() + "&limit=" + this.limit.toString();
  };

  initData = async () => {
    try {
      let data = await fetch(this.formatPageUrl());
      let resp = await data.json();
      this.setState({
        source: resp.data
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
      loading: true
    });
    fetch(this.formatPageUrl()).then(resp => resp.json()).then(resp => {
      if (resp.data.length === 0) {
        this.hasMore = false;
      }
      let data = this.state.source.concat(resp.data);
      this.setState({
        source: data
      });
      this.offset += resp.data.length;
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  };

  render() {
    return (
      <InfiniteScroll
        initalLoad={false}
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={!this.state.loading && this.hasMore}
        useWindow={false}
      >
        <List
          rowKey={(item: FileInfo) => {
            return item.key.toString()
          }}
          dataSource={this.state.source}
          grid={this.grid}
          loading={this.state.loading}
          renderItem={item => (
            <List.Item>
              <FileCard file={item}/>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    )
  }
}

export default FileList;
