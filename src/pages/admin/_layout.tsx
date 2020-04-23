import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

import React, { useReducer, useState, useEffect } from 'react';
import { Layout, notification } from 'antd';
import AdminSider from './components/sider';
import { ClassInfo } from '@/components/class';
import { classUrl, userInfoUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { errorUser } from '@/components/user';

const { Sider, Content, Header } = Layout;
enum AdminSiderKey {
  User = 'user',
  Class = 'class',
  Course = 'course',
  Source = 'source',
  Practice = 'practice',
  Notice = 'notice',
}
const defaultClassList: ClassInfo[] = [];
const defaultState = {
  key: AdminSiderKey.User,
  classList: defaultClassList,
  user: errorUser,
};

const StateContext = React.createContext(defaultState);

export default function(props: any) {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_SIDER_KEY':
        return Object.assign({}, state, {
          key: action.payload,
        });
      case 'SET_CLASS_LIST':
        return Object.assign({}, state, {
          classList: action.payload,
        });
      case 'SET_USER':
        return Object.assign({}, state, {
          user: action.payload,
        });
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    key: AdminSiderKey.User,
    classList: defaultClassList,
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(classUrl, {
          method: 'GET',
        });
        const resp = await res.json();
        if (resp.code === ErrorCode.OK) {
          dispatch({
            type: 'SET_CLASS_LIST',
            payload: resp.data,
          });
        } else {
          notification['error']({
            message: '获取班级列表失败，可能需要稍后刷新重试',
            description: resp.message,
          });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    fetch(userInfoUrl)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: 'SET_USER',
          payload: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <StateContext.Provider value={state}>
      <Layout>
        <Sider
          style={{
            position: 'fixed',
            left: '1vw',
            height: '88vh',
            backgroundColor: 'white',
            boxShadow: '2px -1px 6px 0 rgba(0, 0, 0, 0.05)',
            width: '10vw',
            top: '10vh',
            userSelect: 'none',
          }}
        >
          <AdminSider
            setMenuKey={(key: AdminSiderKey) =>
              dispatch({
                type: 'SET_SIDER_KEY',
                payload: key,
              })
            }
          />
        </Sider>
        <Content
          style={{
            backgroundColor: 'white',
            width: '84vw',
            height: '88vh',
            boxShadow: '-2px -1px 6px 0 rgba(0, 0, 0, 0.05)',
            position: 'fixed',
            top: '10vh',
            left: '15vw',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </StateContext.Provider>
  );
}

export { AdminSiderKey, StateContext };
