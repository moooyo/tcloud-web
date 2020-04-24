import React, { useState, useEffect } from 'react';
import { Card, Divider, Row, Col, Button, Spin, notification } from 'antd';
import { tag, demoTags } from '@/pages/practice/components/problem';
import { FileInfo, demoList } from './file';
import style from './course.module.css';
import FileTable from '@/components/fileTable';
import { routerArgs } from './fileAction';
import moment from 'moment';
import { IconFont } from '@/components/utils';
import { DownloadOutlined } from '@ant-design/icons';
import { courseNotice, course } from '@/components/course';
import { courseUrl, noticeUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';

const demoPath: routerArgs = {
  Key: 1,
  Name: '第一节课',
};

interface courseDisplay {
  ID: number;
  Name: string;
  Tags: tag[];
  StartTime: number;
  EndTime: number;
  Description: string;
  FileList: FileInfo[];
  FilePath: routerArgs;
}

const demoCourseList: courseDisplay[] = [
  {
    ID: 1,
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
    ID: 2,
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
  course: courseDisplay;
}

interface courseActionProps {
  select: any;
}

const CourseAction = (props: courseActionProps) => {
  const [loading, setLoading] = useState(false);
  const onSaveClick = () => {
    if (props.select.length === 0) {
      return;
    }
    console.log(props.select);
  };
  const onDownloadClick = () => {
    if (props.select.length === 0) {
      return;
    }
  };

  return (
    <Row
      style={{
        marginBottom: '1vh',
        marginTop: '2vh',
      }}
    >
      <Col>
        <Button
          type={'primary'}
          icon={<IconFont type={'icon-save'} />}
          onClick={onSaveClick}
          loading={loading}
        >
          保存
        </Button>
        <Button
          icon={<DownloadOutlined />}
          style={{
            marginLeft: '5px',
          }}
          onClick={onDownloadClick}
          loading={loading}
        >
          下载
        </Button>
      </Col>
    </Row>
  );
};

const CourseBox = (props: courseBoxProps) => {
  const [selectRowKeys, setSelectRowKeys] = useState([]);
  const startTime = moment(props.course.StartTime * 1000).format(
    'YYYY-MM-DD HH:mm',
  );
  const endTime = moment(props.course.EndTime * 1000).format(
    'YYYY-MM-DD HH:mm',
  );
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
            {startTime + ' 至 ' + endTime}
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
      <Divider
        style={{
          marginTop: '5px',
          marginBottom: 0,
        }}
      />
      <CourseAction select={selectRowKeys} />
      <FileTable
        path={props.course.FilePath}
        ChangedFileNameID={-1}
        onChangedFileNameClicked={(id: number) => {}}
        FileList={props.course.FileList}
        Loading={false}
        changeFileName={(id: number, name: string) => {}}
        onSelectRowKeyChanged={(a: any) => {}}
        setSelectRowKeys={(rows: any) => {
          setSelectRowKeys(rows);
        }}
        showTableAction={false}
      />
    </Card>
  );
};

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
          {moment(item.Time * 1000).format('YYYY-MM-DD HH:mm')}
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
  const [course, setCourse] = useState(demoCourseList);
  const [notice, setNotice] = useState(demoCourseNotice);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const url = courseUrl + '?offset=0&limit=1000';
        const res = await fetch(url, {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          if (resp.data !== null) {
            setCourse(resp.data);
          }
        } else {
          notification['error']({
            message: '加载失败',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const url = noticeUrl + '?offset=0&limit=1000';
        const res = await fetch(url, {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          if (resp.data !== null) {
            setNotice(resp.data);
          }
        } else {
          notification['error']({
            message: '加载失败',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={16}>
          <div className={style.wrapper}>
            {course.map(e => {
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
            <CourseNotice notice={notice} />
          </div>
        </Col>
      </Row>
    </Spin>
  );
};
export default CourseContent;
