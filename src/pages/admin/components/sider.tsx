import React, { useEffect, useContext } from 'react';
import { Menu } from 'antd';
import { IconFont } from '@/components/utils';
import { useLocation } from 'umi';
import { StateContext, AdminSiderKey } from '../_layout';

interface siderProps {
  setMenuKey: (key: AdminSiderKey) => void;
}

const AdminSider = (props: siderProps) => {
  const selectKey = useContext(StateContext);
  const key = selectKey.key;
  const onKeyClick = (e: any) => {
    switch (e.key) {
      case 'user':
        props.setMenuKey(AdminSiderKey.User);
        return;
      case 'class':
        props.setMenuKey(AdminSiderKey.Class);
        return;
      case 'course':
        props.setMenuKey(AdminSiderKey.Course);
        return;
      case 'practice':
        props.setMenuKey(AdminSiderKey.Practice);
        return;
      case 'notice':
        props.setMenuKey(AdminSiderKey.Notice);
        return;
      default:
        return;
    }
  };
  return (
    <div>
      <Menu mode={'inline'} defaultSelectedKeys={[key]} onClick={onKeyClick}>
        <Menu.Item key={'user'}>
          <IconFont type={'icon-set'} />
          用户管理
        </Menu.Item>
        <Menu.Item key={'class'}>
          <IconFont type={'icon-class'} />
          班级管理
        </Menu.Item>
        <Menu.Item key={'course'}>
          <IconFont type={'icon-course'} />
          课程管理
        </Menu.Item>
        <Menu.Item key={'practice'}>
          <IconFont type={'icon-source'} />
          练习管理
        </Menu.Item>
        <Menu.Item key={'notice'}>
          <IconFont type={'icon-tonggaozhongxin'} />
          通知公告
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminSider;
