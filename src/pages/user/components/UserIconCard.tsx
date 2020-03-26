import React from 'react';
import { SlackOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { initUserDetail } from '@/components/user';
import style from './user.module.css';

class UserIconCard extends React.Component<any, any> {
  render() {
    let user = initUserDetail;
    return (
      <div style={{ textAlign: 'center' }}>
        <img
          className={style.icon}
          src={
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
          }
          alt={'avatar'}
        />
        <div style={{ paddingTop: '1vh' }}>
          <div className={style.nickname}>{user.NickName}</div>
          <div className={style.slogan}>{user.Slogan}</div>
        </div>
        <div className={style.detailInfo}>
          <p>
            <UserOutlined />
            <span className={style.detailInfoText}>{user.Class}</span>
          </p>
          <p>
            <TeamOutlined />
            <span className={style.detailInfoText}>{user.Email}</span>
          </p>
          <p>
            <SlackOutlined />
            <span className={style.detailInfoText}>{user.Location}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default UserIconCard;
