import React, { useState } from 'react';
import { Card, Divider, Row, Col } from 'antd';
import { tag, demoTags } from '@/pages/practice/components/problem';
import { FileInfo, demoList } from './file';
import style from './course.module.css';
import FileTable from '@/components/fileTable';
import { routerArgs } from './fileAction';
import moment from 'moment';

const demoPath: routerArgs = {
  Key: 1,
  Name: '第一节课',
};

const demoCourseList: course[] = [
  {
    Name: '程序设计入门',
    Tags: demoTags,
    StartTime: 0,
    EndTime: 0,
    Description:
      '在这一部分，我们将先和大家一起认识键盘，并且学习 C++ 的输出和基本运算。并利用这部分的知识解决一些简单的问题。',
    FileList: demoList,
    FilePath: demoPath,
  },
  {
    Name: '程序设计入门',
    Tags: demoTags,
    StartTime: 0,
    EndTime: 0,
    Description:
      '在这一部分，我们将先和大家一起认识键盘，并且学习 C++ 的输出和基本运算。并利用这部分的知识解决一些简单的问题。',
    FileList: demoList,
    FilePath: demoPath,
  },
];

interface courseBoxProps {
  course: course;
}

const CourseBox = (props: courseBoxProps) => {
  const [selectRowKeys, setSelectRowKeys] = useState([]);

  return (
    <Card className={style.courseBox} hoverable>
      <div className={style.courseTitle}>
        <p
          style={{
            fontSize: '18px',
            fontWeight: 400,
            marginBottom: '10px',
          }}
        >
          {props.course.Name}{' '}
          <span style={{ fontSize: '12px', fontWeight: 400 }}>
            2020 年 03 月 15 日 19:00 - 20:00
          </span>
        </p>
        <p
          style={{
            fontSize: '14px',
          }}
        >
          {props.course.Description}
        </p>
      </div>
      <Divider />
      <FileTable
        path={props.course.FilePath}
        ChangedFileNameID={-1}
        onChangedFileNameClicked={(id: number) => {}}
        FileList={props.course.FileList}
        Loading={false}
        changeFileName={(id: number, name: string) => {}}
        onSelectRowKeyChanged={(a: any) => {}}
        setSelectRowKeys={(rows: any) => {
          console.log(rows);
        }}
      />
    </Card>
  );
};

interface course {
  Name: string;
  Tags: tag[];
  StartTime: number;
  EndTime: number;
  Description: string;
  FileList: FileInfo[];
  FilePath: routerArgs;
}

interface courseNotice {
  Title: string;
  Description: string;
  Level: number;
  Time: number;
}

interface courseNoticeProps {
  notice: courseNotice[];
}

const demoCourseNotice = [
  {
    Title: '武汉理工倒闭了',
    Description:
      '武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了',
    Level: 0,
    Time: 1586695147,
  },
  {
    Title: '武汉理工倒闭了',
    Description:
      '武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了',
    Level: 1,
    Time: 1586695147,
  },
  {
    Title: '武汉理工倒闭了',
    Description:
      '武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了，武汉理工倒闭了',
    Level: 1,
    Time: 1586695147,
  },
];

const CourseNotice = (props: courseNoticeProps) => {
  const renderNotice = (item: courseNotice) => {
    return (
      <div
        style={{
          padding: '10px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 400,
            }}
          >
            {item.Title}
          </span>
        </div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 400,
            color: '#999',
          }}
        >
          {moment(item.Time).format()}
        </div>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          {item.Description}
        </div>
        <Divider
          style={{
            marginBottom: '5px',
          }}
        />
      </div>
    );
  };
  return (
    <Card
      style={{
        width: '100%',
        cursor: 'default',
      }}
      hoverable
    >
      <div
        style={{
          marginLeft: '10px',
          marginTop: '10px',
          fontSize: '18px',
          fontWeight: 500,
        }}
      >
        通知
        <Divider
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        />
      </div>
      {props.notice.map(e => {
        return renderNotice(e);
      })}
    </Card>
  );
};

const CourseContent = (props: any) => {
  return (
    <Row>
      <Col span={16}>
        <div className={style.wrapper}>
          {demoCourseList.map(e => {
            return <CourseBox course={e} />;
          })}
        </div>
      </Col>
      <Col span={8}>
        <div
          style={{
            marginTop: '20px',
            marginRight: '3vw',
          }}
        >
          <CourseNotice notice={demoCourseNotice} />
        </div>
      </Col>
    </Row>
  );
};
export default CourseContent;