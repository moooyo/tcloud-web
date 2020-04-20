import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

import React, { useReducer } from 'react';
import { Layout } from 'antd';
import AdminSider from './components/sider';

const { Sider, Content, Header } = Layout;
enum AdminSiderKey {
  User = 'user',
  Class = 'class',
  Course = 'course',
  Source = 'source',
  Practice = 'practice',
  Notice = 'notice',
}

const SiderMenuContext = React.createContext(AdminSiderKey.User);

export default function(props: any) {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_SIDER_KEY':
        return {
          key: action.payload,
        };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    key: AdminSiderKey.User,
  });

  return (
    <SiderMenuContext.Provider value={state.key}>
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
    </SiderMenuContext.Provider>
  );
}

export { AdminSiderKey, SiderMenuContext };
