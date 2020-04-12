import React from 'react';
import { Input, Select, Row } from 'antd';
import { demoTags } from '@/pages/practice/components/problem';
import { renderTag } from '@/pages/practice/components/tags';
const { Option } = Select;
const { Search } = Input;
const TagSearch = (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '15%',
        }}
      >
        <img
          width="240px"
          height="200px"
          src={require('@/img/word_cloud.png')}
        />
      </div>
      <Input.Group
        compact
        style={{
          width: '400px',
        }}
      >
        <Select defaultValue="1" style={{ width: '30%' }}>
          <Option value="1">知识点</Option>
          <Option value="0">标签</Option>
        </Select>
        <Search style={{ width: '70%' }} />
      </Input.Group>
      <div
        style={{
          position: 'absolute',
          top: '55%',
          width: '30%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {demoTags.map(e => renderTag(e))}
      </div>
    </div>
  );
};
export default TagSearch;
