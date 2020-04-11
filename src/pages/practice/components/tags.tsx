import React from 'react';
import { Card, Tag } from 'antd';
import style from './practice.module.css';
import { tag, colors } from './problem';

interface tagsProps {
  tagTitle: string;
  tags: tag[];
}

const renderTag = (item: tag) => {
  return (
    <Tag
      color={colors[Math.floor(Math.random() * colors.length)]}
      style={{
        width: '50px',
        height: '32px',
        textAlign: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>{item.Name}</span>
    </Tag>
  );
};

const TagsBox = (props: tagsProps) => {
  return (
    <Card
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          fontSize: '21px',
          fontWeight: 500,
          marginLeft: '5px',
        }}
      >
        {props.tagTitle}
      </div>
      <div
        style={{
          marginTop: '2vh',
        }}
      >
        {props.tags.map(e => renderTag(e))}
      </div>
    </Card>
  );
};

export default TagsBox;
