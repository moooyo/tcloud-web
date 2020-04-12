import React from 'react';
import { Row, Col } from 'antd';
import TagsBox from './components/tags';
import ProblemBox, { demoTags } from './components/problem';
import style from './components/practice.module.css';

const PracticeIndex = (props: any) => {
  return (
    <div className={style.mainBox}>
      <Row>
        <Col
          flex={3}
          style={{
            marginLeft: '2vw',
          }}
        >
          <ProblemBox />
        </Col>

        <Col
          flex={1}
          style={{
            marginLeft: '1vw',
            marginRight: '2vw',
          }}
        >
          <Row style={{ width: '100%' }}>
            <TagsBox tagTitle={'标签'} tags={demoTags} />
          </Row>
          <Row style={{ marginTop: '3vh', width: '100%' }}>
            <TagsBox tagTitle={'课程'} tags={demoTags} />
          </Row>
          <Row style={{ marginTop: '3vh', width: '100%' }}>
            <TagsBox tagTitle={'知识点'} tags={demoTags} />
          </Row>
        </Col>
        <Col />
      </Row>
    </div>
  );
};

export default PracticeIndex;
