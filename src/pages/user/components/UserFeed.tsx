import React from 'react';
import { Button, Card, Popconfirm } from 'antd';
import style from './user.module.css';

interface feedInfo {
  id: number;
  title: string;
  description: string;
  target: string;
}

interface state {
  feeds: feedInfo[];
}

let testFeeds: feedInfo[] = [
  {
    id: 1,
    title: '大头菜股市今日熔断，上千万岛民天台集合',
    description:
      '3月27日,大头菜股市暴跌90%, 大头菜创业板暴跌百分之80, 上千万无人岛岛民天台跳楼， 数百万家庭支离破碎',
    target: '',
  },
  {
    id: 2,
    title: '动物之森卡带暴涨150元，今日均价480元一张',
    description: '动物之森卡带暴涨150元，今日均价480元一张',
    target: '',
  },
  {
    id: 3,
    title: '大头菜股市今日熔断，上千万岛民天台集合',
    description:
      '3月27日,大头菜股市暴跌90%, 大头菜创业板暴跌百分之80, 上千万无人岛岛民天台跳楼， 数百万家庭支离破碎',
    target: '',
  },
  {
    id: 4,
    title: '动物之森卡带暴涨150元，今日均价480元一张',
    description: '动物之森卡带暴涨150元，今日均价480元一张',
    target: '',
  },
  {
    id: 5,
    title: '大头菜股市今日熔断，上千万岛民天台集合',
    description:
      '3月27日,大头菜股市暴跌90%, 大头菜创业板暴跌百分之80, 上千万无人岛岛民天台跳楼， 数百万家庭支离破碎',
    target: '',
  },
  {
    id: 6,
    title: '动物之森卡带暴涨150元，今日均价480元一张',
    description: '动物之森卡带暴涨150元，今日均价480元一张',
    target: '',
  },
];

class UserFeed extends React.Component<any, state> {
  state = {
    feeds: testFeeds,
  };

  bindConfirmHandle = (id: number) => {
    return function(e: any) {
      // @ts-ignore
      let feeds = this.state.feeds;
      let index = feeds.findIndex((item: { id: number }) => item.id === id);
      if (index !== -1) {
        feeds.splice(index, 1);
        // @ts-ignore
        this.setState({
          feeds: feeds,
        });
      }
    };
  };

  renderDeleteButton = (id: number) => {
    return (
      <Popconfirm
        title={'删除这条消息?'}
        okText={'确定'}
        cancelText={'取消'}
        onConfirm={this.bindConfirmHandle(id).bind(this)}
        okType={'danger'}
      >
        <Button danger type={'link'}>
          删除
        </Button>
      </Popconfirm>
    );
  };

  renderFeedItem = (item: feedInfo) => {
    return (
      <Card
        title={item.title}
        className={style.feedItemCard}
        hoverable={true}
        extra={this.renderDeleteButton(item.id)}
        key={item.id}
      >
        {item.description}
      </Card>
    );
  };

  render() {
    return <div>{this.state.feeds.map(e => this.renderFeedItem(e))}</div>;
  }
}

export default UserFeed;
