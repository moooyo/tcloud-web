import React, { useContext } from 'react';
import UserTable from './components/user';
import { SiderMenuContext, AdminSiderKey } from './_layout';
import ClassTable from './components/class';
import CourseTable from './components/course';
import PracticeTable from './components/practice';
import NoticeTable from './components/notice';

const AdminIndex = (props: any) => {
  const siderKey = useContext(SiderMenuContext);
  const content = ((key: AdminSiderKey) => {
    switch (key) {
      case AdminSiderKey.User:
        return <UserTable />;
      case AdminSiderKey.Class:
        return <ClassTable />;
      case AdminSiderKey.Course:
        return <CourseTable />;
      case AdminSiderKey.Practice:
        return <PracticeTable />;
      case AdminSiderKey.Notice:
        return <NoticeTable />;
      default:
        return <>Error</>;
    }
  })(siderKey);
  return <div>{content}</div>;
};

export default AdminIndex;
