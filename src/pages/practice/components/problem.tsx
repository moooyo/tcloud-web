import React, { useState } from 'react';
import { Card, Row, Col, Switch, Button, Menu, Dropdown, Tag } from 'antd';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons/es';
import { IconFontCnUrl } from '@/_config/.api';
import style from './practice.module.css';
import { List } from 'antd';
import { IconFont } from '@/components/utils';

const { Search } = Input;

interface problemListProps {
  loading: boolean;
  displayTag: boolean;
}

interface tag {
  ID: number;
  Name: string;
}

const demoTags: tag[] = [
  {
    ID: 1,
    Name: 'DP',
  },
  {
    ID: 2,
    Name: 'czdb',
  },
  {
    ID: 3,
    Name: '阿舔',
  },
  {
    ID: 4,
    Name: '暖暖',
  },
];

interface practice {
  ID: number;
  OJ: number;
  Title: string;
  URL: string;
  Total: number;
  AcRate: number;
  Tags: tag[];
  Solved: boolean;
}

const demoSource: practice[] = [
  {
    ID: 1,
    OJ: 1,
    Title: 'A+B',
    URL: 'https://www.baidu.com',
    Total: 500,
    AcRate: 47.9,
    Tags: demoTags,
    Solved: false,
  },
  {
    ID: 2,
    OJ: 1,
    Title: 'C+D',
    URL: 'https://www.baidu.com',
    Total: 500,
    AcRate: 47.9,
    Tags: demoTags,
    Solved: true,
  },
];

enum OnlineJudge {
  PKU,
  QDU,
  HDU,
}

const renderOj = (oj: number) => {
  let tmp = {
    height: '22px',
    fontSize: '12px',
    border: '1px solid #e9eaec',
    borderRadius: '3px',
  };
  return <Tag>PKU</Tag>;
};

const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const noTagsSpan = 5;
const displayTagsSpan = 3;

const ProblemList = (props: problemListProps) => {
  const nowSpan = props.displayTag ? displayTagsSpan : noTagsSpan;
  const listHeader = (
    <Row
      style={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
      }}
      className={style.listHeader}
    >
      <Col span={1}>ID</Col>
      <Col span={2}>OJ</Col>
      <Col span={9} style={{ textAlign: 'left' }}>
        Title
      </Col>
      <Col span={nowSpan}>Total</Col>
      <Col span={nowSpan}>AC Rate</Col>
      {props.displayTag ? <Col span={4}>Tags</Col> : ''}
      <Col span={1}>Solved</Col>
    </Row>
  );
  const renderTags = (tags: tag[]) => {
    return (
      <div>
        {tags.map(e => {
          return (
            <Tag color={colors[Math.floor(Math.random() * colors.length)]}>
              {e.Name}
            </Tag>
          );
        })}
      </div>
    );
  };

  const renderItem = (item: practice, index: number) => {
    return (
      <Row
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Col span={1}>{item.ID}</Col>
        <Col span={2}>{renderOj(item.OJ)}</Col>
        <Col
          span={9}
          style={{
            textAlign: 'left',
          }}
        >
          {item.Title}
        </Col>
        <Col span={nowSpan}>{item.Total}</Col>
        <Col span={nowSpan}>{item.AcRate}</Col>
        {props.displayTag ? <Col span={4}>{renderTags(item.Tags)}</Col> : ''}
        <Col span={1}>
          {item.Solved ? (
            <IconFont
              type={'icon-icon_success'}
              style={{
                fontSize: '24px',
              }}
            />
          ) : (
            ''
          )}
        </Col>
      </Row>
    );
  };
  return (
    <List
      header={listHeader}
      loading={props.loading}
      pagination={false}
      dataSource={demoSource}
      renderItem={renderItem}
      split={true}
    />
  );
};

const ProblemBox = (props: any) => {
  const [showTags, setShowTags] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span>显示所有练习</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>隐藏已完成的练习</span>
      </Menu.Item>
    </Menu>
  );
  const showUnsolved = (
    <div
      style={{
        userSelect: 'none',
      }}
    >
      <span style={{ marginRight: '5px', fontSize: '14px' }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <span>
            显示过滤
            <DownOutlined />
          </span>
        </Dropdown>
      </span>
      <Switch
        checkedChildren="Tags"
        unCheckedChildren="Tags"
        style={{
          marginLeft: '10px',
        }}
        onChange={(checked: boolean) => {
          setShowTags(checked);
        }}
      />
    </div>
  );
  const searchInput = (
    <div>
      <Search
        placeholder="搜索题号"
        onSearch={value => console.log(value)}
        className={style.searchBox}
      />
    </div>
  );

  return (
    <Card>
      <div
        style={{
          marginLeft: '15px',
          marginTop: '5px',
          fontSize: '21px',
          fontWeight: 500,
        }}
      >
        <Row>
          <Col
            span={13}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Practice List
          </Col>
          <Col
            span={4}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {showUnsolved}
          </Col>
          <Col span={4}>{searchInput}</Col>
          <Col
            style={{
              marginLeft: '20px',
            }}
          >
            <Button
              type={'primary'}
              icon={<IconFont type={'icon-reset'} />}
              className={style.searchBox}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </div>
      <ProblemList loading={false} displayTag={showTags} />
    </Card>
  );
};

export default ProblemBox;

export { tag, demoTags, colors };
