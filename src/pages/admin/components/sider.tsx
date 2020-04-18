import React from 'react';
import { Menu } from 'antd';
import { IconFont } from '@/components/utils';

const AdminSider = (props: any) => {
  return (
    <div>
      <Menu mode={'inline'}>
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
        <Menu.Item key={'source'}>
          <IconFont type={'icon-source1'} />
          资源推送
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
